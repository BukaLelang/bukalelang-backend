'use strict'
const CronJob = require('cron').CronJob;

let models = require('../models')
let auctionWinnerJob = require('../helpers/auctionWinnerJob')

module.exports = () => {
  // init cron to check end date of auction
  new CronJob('* * * * *', function() {
    // hanya ambil auctions yang masih running
    models.Auction.findAll({
      where: {
        end_date: {
            $gte: new Date()
        }
      }
    }).then(auctions => {
      let auctionsLength = auctions.length
      if (auctionsLength != 0) {
        // loop sebanyak looping yang didepet
        for (var i = 0; i < auctionsLength; i++) {
          // console.log('kurang berapa menit dari sekarang : ', getMinutesBetweenDates(new Date(), auctions[i].end_date));
          if (getMinutesBetweenDates(new Date(), auctions[i].end_date) == 0) {
            // trigger dengan id auction nya
            auctionWinnerJob.theWinnerIs(auctions[i].id)
          }
        }
      }
    })
  }, null, true, 'Asia/Jakarta');
  // ngecek, dengan membandingkan selisih menitnya
  function getMinutesBetweenDates(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    return parseInt(diff / 60000);
  }
}
