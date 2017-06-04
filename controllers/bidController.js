let axios = require('axios')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')
let bidChecker = require('../helpers/bidChecker')

let emailSender = require('../helpers/emailSender')
let pushNotificationSender = require('../helpers/pushNotificationSender')

let blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  bid: (req, res) => {
    // init repsonse
    var finalResult = {
      message: 'bidding fail',
      success: false,
      status: "ERROR",
      id: null,
      auctionId: null,
      username: null,
      avatarUrl: null,
      name: null,
      bidding_time: null,
      categoryId: null,
      current_price: null,
      minimum_next_bidding: null,
    }
    // console.log('isi request : ', req.body, req.headers);
    // cari dulu auctionId nya ada ngak
    models.Auction.findById(req.body.auctionId).then(auction => {
      if (auction) {
        // cek apakah yang di bid punya dia sendiri
        if (auction.userId == req.headers.userid) {
          finalResult.message = 'Anda tidak dapat nge-bid auction anda sendiri.'
          res.json(finalResult)
        } else {
          // console.log('masuk sini kan dengan auction : ', auction);
          // cek auction nya masih running ngak
          if (auction.running == true) {
            // kalo ada dan masih running, baru cek saldonya
            models.User.findById(req.headers.userid).then(user => {
              if (user) {
                bidChecker.checkBalance(user.bukalapakId, user.bl_token).then(checkBalance => {
                  // console.log('isi saldo pengguna : ', checkBalance.balance);
                  // cek saldonya lebih tinggi dari bid yang udah ada belum
                  bidChecker.highestBidOfTheAuction(req.body.auctionId).then(highestBidOfTheAuction => {
                    // cek saldonya cukup ngak ya
                    if (checkBalance.balance > highestBidOfTheAuction) {
                      // console.log('highestBidOfTheAuction : ', highestBidOfTheAuction);
                      bidChecker.isMoreThanHighestBid(highestBidOfTheAuction, req.body.nextBid).then(responseAfterIsMoreThanHighestBid => {
                        // console.log('responseAfterIsMoreThanHighestBid : ', responseAfterIsMoreThanHighestBid);

                        // ketika oke, lebih besar dari yang lain

                        // cek apakah dia bin
                        let isBin = req.body.nextBid >= auction.max_price ? true : false
                        if (isBin) {
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
                        }

                        if (responseAfterIsMoreThanHighestBid.status) {
                          models.Bid.create({
                            userId: req.headers.userid,
                            auctionId: req.body.auctionId,
                            current_bid: req.body.nextBid
                          }).then(bid => {
                            console.log('bid sukses');
                            finalResult.message = 'Sukses nge-BID'
                            finalResult.success = true
                            finalResult.status = "OK"
                            finalResult.id = bid.id
                            finalResult.auctionId = bid.auctionId
                            finalResult.username = user.username
                            finalResult.avatarUrl = user.avatarUrl || 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg'
                            finalResult.name = user.name
                            finalResult.bidding_time = bid.createdAt
                            finalResult.categoryId = auction.categoryId
                            finalResult.current_price = bid.current_bid
                            finalResult.minimum_next_bidding = bid.current_bid + auction.kelipatan_bid

                            global.io.emit('auction-' + req.body.auctionId, finalResult);
                            global.io.emit('auctions', finalResult);

                            // notify other auction participant
                            if (!isBin) {
                              bidChecker.notifyOtherAuctionParticipant(req.body.auctionId, req.headers.userid)
                            } else {
                              finalResult.message = 'sukses nge-BIN'
                            }

                            res.json(finalResult)
                          })
                        } else {
                          //  ketika sama dengan atau lebih kecil
                          finalResult.message = responseAfterIsMoreThanHighestBid.message
                          res.json(finalResult)
                        }
                      }).catch(err => {
                        console.log('got error from bidChecker.isMoreThanHighestBid -----', err);
                        finalResult.message = 'error when trying to get highest bid'
                      })
                    } else {
                      finalResult.message = 'Saldo tidak cukup untuk nge-bid auction ini, isi saldo Rp. ' + checkBalance.balance + ' bid tertinggi kali ini : Rp. ' + highestBidOfTheAuction
                      res.json(finalResult)
                    }
                  })
                }).catch((err) => {
                  console.log('got error from bidChecker.checkBalance() --- ', err);
                  finalResult.message = 'got error when check balance'
                  res.json(finalResult)
                })
              } else {
                console.log('user with id ' + req.headers.userid + ' not found');
                finalResult.message('user with id ' + req.headers.userid + ' not found')
                res.json(finalResult)
              }
            })
          } else {
            finalResult.message = 'lelang telah berakhir'
            res.json(finalResult)
          }
        }
      } else {
        finalResult.message = 'bid fail, auction dengan id : ' + req.body.auctionId + ' tidak ditemukan'
        res.json(finalResult)
      }
    }).catch(err => {
      console.log('error when trying to find auction in bidController : ', err);
      finalResult.message = 'error when trying to find auction'
      res.json(finalResult)
    })
  }
}
