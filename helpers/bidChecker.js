let _ = require('lodash')
let models = require('../models')

module.exports = {
  isMoreThanHighestBid: (auctionId, nextBid) => {
    return new Promise((resolve, reject) => {
      models.Bid.findAll({
        where: {
          auctionId: auctionId
        }
      }).then(bids => {
        console.log('bids dengan id sekian : ', bids );
        if (!bids) {
          let highestBid = _.maxBy(bids, 'current_bid')
          switch (true) {
            case (nextBid > highestBid.current_bid):
              resolve(true)
              break;
            case (nextBid == highestBid.current_bid):
              reject('Anda bid sama dengan yang di bid orang lain')
              break;
            case (nextBid < highestBid.current_bid):
              reject('Jumlah bid anda lebih kecil ketimbang bid tertingg sekarang')
              break;
            default:
          }
        } else {
          reject('tidak auction dengan id ' + auctionId)
        }
      })
    })
  }
}
