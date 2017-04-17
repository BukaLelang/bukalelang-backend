let axios = require('axios')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')
let bidChacker = require('../helpers/bidChecker')

let blEndPoint = 'https://api.bukalapak.com/v2/'

// init repsonse
var finalResult = {
  message: 'bidding fail',
  success: false,
  id: null,
  auctionId: null,
  categoryId: null,
  current_price: null,
  minimum_next_bidding: null,
}

module.exports = {
  bid: (req, res) => {
    console.log('isi request : ', req.body);
    // cek user nya ada ngak ?
    models.User.findById(req.body.userId).then(user => {
      // console.log('dapet user : ', user);
      if (user) {
        // cari dulu auctionId nya ada ngak
        models.Auction.findById(req.body.auctionId).then(auction => {
          if (auction) {
            // kalo ada, baru cek saldonya
            bidChacker.checkBalance(user.bukalapakId, user.bl_token).then(balance => {
              // console.log('isi saldo pengguna : ', balance);
              // cek saldonya lebih tinggi dari bid yang udah ada belum
              bidChacker.highestBidOfTheAuction(req.body.auctionId).then(highestBidOfTheAuction => {
                // console.log('highestBidOfTheAuction : ', highestBidOfTheAuction);
                bidChacker.isMoreThanHighestBid(highestBidOfTheAuction, req.body.nextBid).then(responseAfterIsMoreThanHighestBid => {
                  // console.log('responseAfterIsMoreThanHighestBid : ', responseAfterIsMoreThanHighestBid);
                  // ketika oke, lebih besar dari yang lain
                  if (responseAfterIsMoreThanHighestBid.status) {
                    models.Bid.create({
                      userId: req.body.userId,
                      auctionId: req.body.auctionId,
                      current_bid: req.body.nextBid
                    }).then(bid => {
                      console.log('bid sukses');
                      finalResult.message = 'sukses nge-bid'
                      finalResult.success = true
                      finalResult.id = bid.id
                      finalResult.auctionId = bid.auctionId
                      finalResult.categoryId = auction.categoryId
                      finalResult.current_price = bid.current_bid
                      finalResult.minimum_next_bidding = bid.current_bid + auction.kelipatan_bid

                      res.json(finalResult)
                    })
                  } else {
                    //  ketika sama dengan atau lebih kecil
                    finalResult.message = responseAfterIsMoreThanHighestBid.message
                    res.json(finalResult)
                  }
                }).catch(err => {
                  console.log('got error from bidChacker.isMoreThanHighestBid -----', err);
                })
              })
            }).catch((err) => {
              console.log('got error from bidChacker.checkBalance() --- ', err);
            })
          } else {
            finalResult.message = 'bid fail, auction dengan id : ' + req.body.auctionId + ' tidak ditemukan'
            res.json(finalResult)
          }
        }).catch(err => {
          console.log('error when trying to find auction in bidController : ', err);
        })
      } else {
        console.log('user doesnt exist');
        finalResult.message = 'bidding fail, user with id ' + req.body.userId +' not found'
        res.json(finalResult)
      }
    }).catch(err => {
      console.log('error when trying to get user in local db at bidController : ', err);
    })

  }
}
