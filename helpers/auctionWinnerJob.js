'use strict'
const CronJob = require('cron').CronJob;

// module.exports = {
//   auctionWinnerJob: (auctionId, endDate) =>{
//     new CronJob('* * * * * *', function() {
//       console.log('You will see this message every second');
//     }, null, true, 'Asia/Jakarta');
//   }
// }

function test(){
  new CronJob('* * * * * *', function() {
    console.log('You will see this message every second');
  }, null, true, 'Asia/Jakarta');
}

test()
