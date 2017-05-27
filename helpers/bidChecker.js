let _ = require('lodash')
let axios = require('axios')
require('dotenv').config()

let emailSender = require('./emailSender')
let models = require('../models')

let blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  isMoreThanHighestBid: (highestBidOfTheAuction, nextBid) => {
    return new Promise((resolve, reject) => {
      switch (true) {
        case (nextBid > highestBidOfTheAuction):
          resolve({
            status: true,
            message: 'Yap, tawaran lebih tinggi dari sebelumnya'
          })
        break;
        case (nextBid == highestBidOfTheAuction):
          resolve({
            status: false,
            message: 'Anda bid sama dengan yang di bid orang lain'
          })
        break;
        case (nextBid < highestBidOfTheAuction):
          resolve({
            status: false,
            message: 'Jumlah bid anda lebih kecil ketimbang bid tertingg sekarang'
          })
        break;
        default:
      }
    })
  },
  checkBalance: (bukalapakId, token) => {
    return new Promise((resolve, reject) => {
      let finalResult = {
        status: false,
        balance: 0,
        message: 'error when trying to get balance in bidChacker :'
      }
      // cek saldo nya
      let urlGetBalance = blEndPoint + 'dompet/history.json'
      axios({
        method: 'get',
        url: urlGetBalance,
        auth: {
          username: bukalapakId,
          password: token
        }
      }).then((responseGetBalance) => {
        if (responseGetBalance.data.status == 'OK') {

          // for development purposed only, biar saldonya ngak kosong
          if (process.env.NODE_ENV != 'development') {
            finalResult.balance = responseGetBalance.data.balance
            // for demo only, i'll disable after the demo
            finalResult.balance = 1000000
          } else {
            // development
            finalResult.balance = 1500000
          }

          finalResult.message = 'get balance success'
          finalResult.status = true
          resolve(finalResult)
        } else {
          finalResult.message = responseGetBalance.data.message
          resolve(finalResult)
        }

      }).catch(err => {
        console.log('error when trying to get balance in bidChacker : ', err);
        finalResult.message = 'error when trying to get balance in bidChacker :'
        reject(finalResult)
      })
    })
  },
  highestBidOfTheAuction: (auctionId) => {
    return new Promise((resolve, reject) => {
      models.Bid.findAll({
        where: {
          auctionId: auctionId
        }
      }).then(bids => {
        // console.log(' isi bids : ', bids);
        let bidsLength = bids.length
        if (bidsLength == 0) {
          models.Auction.findById(auctionId).then(auction => {
            if (auction) {
              resolve(auction.min_price)
            } else {
              reject('auction dengan id ' + auctionId + ' tidak ditemukan, posisi bidChacker.js')
            }
          }).catch(err => {
            reject('error ketika ambil data auction di highestBidOfTheAuction')
          })
        } else {
          let highestBid = _.maxBy(bids, 'current_bid')
          resolve(highestBid.current_bid)
        }
      })
    })
  },
  isAuctionRunning: (auctionId) => {
    return new Promise((resolve, reject) => {
      models.Auction.findById(auctionId).then(auction => {
        let isStillRunning = new Date(auction.end_date) > new Date() ? true : false
        resolve(isStillRunning)
      }).catch(err => {
        console.log('error when try to check isAuctionRunning ? ', err);
        reject('error when try to check isAuctionRunning ? '+ err)
      })
    })
  },
  notifyOtherAuctionParticipant: (auctionId, bidderId) => {
    models.Bid.findAll({
      where: {
        auctionId: auctionId
      },
      include: [{
        model: models.User
      }, {
        model: models.Auction
      }]
    }).then(bids => {
      console.log('isi bids ', bids);
      let bidsLength = bids.length
      if (bidsLength > 0) {
        let sortedBidsByHighestPrice = _.orderBy(JSON.parse(JSON.stringify(bids)), ['current_bid'], ['desc'])
        let theWinnerDetail = sortedBidsByHighestPrice[0]
        console.log('ini bener pemenangnya ? ', theWinnerDetail);
        // remove highest bids from list
        // remove same user with that bidder, supaya ngak kasih notif ke diri sendiri
        let removedThatBidder = _.remove(sortedBidsByHighestPrice, function(bid){
          return bid.userId != bidderId
        })
        // make sure bidder uniq
        let uniqBidder = _.uniqBy(removedThatBidder, 'userId')

        // gak perlu kirim email kalo ngak ada
        if (uniqBidder.length > 0) {
          emailSender.sendEmailToUserAfterBidLose(uniqBidder, theWinnerDetail)
        }
      } else {
        console.log('no bids with id ' + auctionId + ' and do nothing');
      }
    })
  }
}
