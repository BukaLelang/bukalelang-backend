let _ = require('lodash')
let axios = require('axios')
require('dotenv').config()


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
      // cek saldo nya
      let urlGetBalance = blEndPoint + 'dompet/history.json'
      // for development purposed only, biar saldonya ngak kosong
      if (process.env.NODE_ENV == 'development') {
        // urlGetBalance = 'http://localhost:3000/fake/get-fake-balance'
      }

      axios({
        method: 'get',
        url: urlGetBalance,
        auth: {
          username: bukalapakId,
          password: token
        }
      }).then((responseGetBalance) => {
        // console.log('isi setelah get balance : ', responseGetBalance.data);

        let balance = ''
        if (process.env.NODE_ENV == 'development') {
          balance = { status: 'OK',
              balance: 1500000,
              topup_history: [],
              withdrawal_history: [],
              mutation_history: [],
              message: null
            }
        } else {
          balance = responseGetBalance.data.balance
        }
        resolve({
          status: true,
          balance: balance,
          message: 'get balance success'
        })
      }).catch(err => {
        // console.log('error when trying to get balance in bidChacker : ', err);
        resolve({
          status: false,
          balance: 0,
          message: 'error when trying to get balance in bidChacker :'
        })
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
        if (auction) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(err => {
        console.log('error when try to check isAuctionRunning ? ', err);
        reject('error when try to check isAuctionRunning ? '+ err)
      })
    })
  }
}
