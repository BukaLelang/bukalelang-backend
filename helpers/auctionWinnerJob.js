'use strict'
const CronJob = require('cron').CronJob;
let _ = require('lodash')

let models = require('../models')
let emailSender = require('./emailSender')
let pushNotificationSender = require('./pushNotificationSender')

module.exports = {
  auctionWinnerJob: (auctionId, endDate) =>{
    new CronJob(endDate, function() {
      console.log('Node cron untuk cek pemenang jalan, cek auction dengan id : ', auctionId);
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
  }).then(bids => {
    if (bids.length > 0) {
      // cari yang tertinggi
      let highestBidOfTheAuction = _.maxBy(bids, 'current_bid')
      console.log('the winner of this auction is : ', highestBidOfTheAuction);
      // dapeting detail user nya
      models.User.findById(highestBidOfTheAuction.userId).then(user => {
        if (user) {
          // daepetin detail usernya
          models.Auction.findById(highestBidOfTheAuction.auctionId).then(auction => {
            if (auction) {
              models.Auction.update({
                running: false,
                doneAt: new Date()
              }, {
                where: {
                  id: auction.id
                }
              }).then(auction => {
                console.log('update running status and add doneAt : success');
              }).catch(err => {
                console.log('update running status and add doneAt : failed ');
                console.log('because : ---- ', err.message);
              })

              emailSender.sendEmailToWinner(user, auction)
              pushNotificationSender.sendPNToWinner(user, auction)
              // global.io.emit('auction-winner-' + auction.id, user);

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
