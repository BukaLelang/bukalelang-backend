'use strict'
const CronJob = require('cron').CronJob;
let _ = require('lodash')

let models = require('../models')
let emailSender = require('./emailSender')

module.exports = {
  auctionWinnerJob: (auctionId, endDate) =>{
    new CronJob(endDate, function() {
      console.log('Node cron untuk cek pemenang = jalan');
      theWinnerIs(auctionId)
    }, null, true, 'Asia/Jakarta');
  },
  theWinnerIs: (auctionId) => {
    theWinnerIs(auctionId)
  }
}

function theWinnerIs(auctionId) {
  console.log('jalan sesuai waktu');
  models.Bid.findAll({
    where: {
      auctionId: auctionId
    }
  }).then(auctions => {
    let auctionsLength = auctions.length
    if (auctionsLength != 0) {
      // cari yang tertinggi
      let highestBidOfTheAuction = _.maxBy(auctions, 'current_bid')
      console.log('the winner of this auction is : ', highestBidOfTheAuction);
      // dapeting detail user nya
      models.User.findById(highestBidOfTheAuction.userId).then(user => {
        if (user) {
          // daepetin detail usernya
          models.Auction.findById(highestBidOfTheAuction.auctionId).then(auction => {
            if (auction) {
              emailSender.sendEmailToWinner(user, auction)
            } else {
              console.log('auction with id : ' + highestBidOfTheAuction.auctionId + ' not found');
            }
          }).catch(err => {
            console.log('error when try to get auction by id in theWinnerIs : ', err);
          })
        } else {
          console.log('user with id ' + highestBidOfTheAuction.userId + ' not found');
        }
      }).catch(err => {
        console.log('error when try to get user by id in theWinnerIs : ', err);
      })
    } else {
      console.log('tidak ada bid untuk lelang ini');
    }
  })
}
