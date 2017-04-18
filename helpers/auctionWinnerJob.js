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
      let highestBidOfTheAuction = _.maxBy(auctions, 'current_bid')
      console.log('the winner of this auction is : ', highestBidOfTheAuction);
    } else {
      console.log('tidak ada bid untuk lelang ini');
    }
  })
}
