var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()
let app = require('../app')
let _ = require('lodash')

var should = chai.should()
chai.use(chaiHttp)


let models = require('../models')

let serverHost = app

describe('Bid Test', () => {
  describe('Bidding', () => {
    it('Should be return status Success when trying to bid a auction', (done) => {
      models.Auction.findAll().then(auctions => {
        let convertedAuctions = JSON.parse(JSON.stringify(auctions))
        let auctionsLength = convertedAuctions.length
        if (auctionsLength > 0) {
          // find the highest bid for last auction
          let lastAuction = convertedAuctions[auctionsLength - 1]
          models.Bid.findAll({
            where: {
              auctionId: lastAuction.id
            }
          }).then(bids => {
            let highestBid = {}
            let nextBid = 0
            if (bids.length > 0) {
              highestBid = _.maxBy(JSON.parse(JSON.stringify(bids)), 'current_bid')
              nextBid = highestBid.current_bid + lastAuction.kelipatan_bid
            } else {
              nextBid = lastAuction.min_price + lastAuction.kelipatan_bid
            }
              // console.log('ambil auction terakhir : ', convertedAuctions);
              // console.log('id terakhir ? ', convertedAuctions[auctionsLength - 1].id);
              chai.request(serverHost).post('/bids/')
              .set('userid', process.env.USER_ID_IN_LOCAL)
              .set('token', process.env.BUKALAPAK_TOKEN)
              .send({
                auctionId: lastAuction.id,
                nextBid: nextBid
              }).end((err, res) => {
                if (err) {
                  done(err)
                } else {
                  // console.log('isi res di test : ', res.body);
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.success.should.to.equal(true)
                  // delete bid after test
                  models.Bid.findById(res.body.id).then(bid => {
                    if (bid) {
                      bid.destroy({
                        where: {
                          id : bid.id
                        }
                      }).then(() => {
                        console.log('delete bid after test success');
                        done()

                      })
                    }
                  })
                }
              });

          })

        } else {
          console.log('tidak ada auctions di DB');
        }
      })
    })
    it('Should be return all field / property when trying to bid a auction', (done) => {
      models.Auction.findAll().then(auctions => {
        let convertedAuctions = JSON.parse(JSON.stringify(auctions))
        let auctionsLength = convertedAuctions.length
        if (auctionsLength > 0) {
          // find the highest bid for last auction
          let lastAuction = convertedAuctions[auctionsLength - 1]
          models.Bid.findAll({
            where: {
              auctionId: lastAuction.id
            }
          }).then(bids => {
            let highestBid = {}
            let nextBid = 0
            if (bids.length > 0) {
              highestBid = _.maxBy(JSON.parse(JSON.stringify(bids)), 'current_bid')
              nextBid = highestBid.current_bid + lastAuction.kelipatan_bid
            } else {
              nextBid = lastAuction.min_price + lastAuction.kelipatan_bid
            }
              // console.log('ambil auction terakhir : ', convertedAuctions);
              // console.log('id terakhir ? ', convertedAuctions[auctionsLength - 1].id);
              chai.request(serverHost).post('/bids/')
              .set('userid', process.env.USER_ID_IN_LOCAL)
              .set('token', process.env.BUKALAPAK_TOKEN)
              .send({
                auctionId: lastAuction.id,
                nextBid: nextBid
              }).end((err, res) => {
                if (err) {
                  done(err)
                } else {
                  // console.log('isi res di test : ', res.body);
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.should.have.property('id')
                  res.body.should.have.property('auctionId')
                  res.body.should.have.property('username')
                  res.body.should.have.property('name')
                  res.body.should.have.property('bidding_time')
                  res.body.should.have.property('current_price')
                  res.body.should.have.property('minimum_next_bidding')
                  res.body.should.have.property('success')
                  res.body.should.have.property('message')
                  // delete bid after test
                  models.Bid.findById(res.body.id).then(bid => {
                    if (bid) {
                      bid.destroy({
                        where: {
                          id : bid.id
                        }
                      }).then(() => {
                        console.log('delete bid after test success');
                        done()

                      })
                    }
                  })
                }
              });

          })

        } else {
          console.log('tidak ada auctions di DB');
        }
      })
    })
    it('Should be return status false when trying to bid a auction with wrong parameter', (done) => {
      models.Auction.findAll().then(auctionsFour => {
        const auctionsLengthFour = auctionsFour.length
        if (auctionsLengthFour != 0) {
          // console.log('ambil auction terakhir : ', auctions);
          // console.log('id terakhir ? ', auctions[auctionsLength - 1].id);
          chai.request(serverHost).post('/bids/')
          .set('userid', 1)
          .set('token', process.env.BUKALAPAK_TOKEN)
          .send({
            auctionId: 2831983,
            nextBid: 140000
          }).end((err, hasil) => {
            if (err) {
              done(err)
            } else {
              hasil.should.have.status(200);
              hasil.should.be.json;
              hasil.body.success.should.to.equal(false)
              done()
            }
          });
        } else {
          console.log('tidak ada auctions di DB');
        }
      })
    })
    it('Should be return current_price = null when trying to bid a auction with wrong parameter', (done) => {
      models.Auction.findAll().then(auctions => {
        const auctionsLength = auctions.length
        if (auctionsLength != 0) {
          chai.request(serverHost).post('/bids/')
          .set('userid', 1)
          .set('token', process.env.BUKALAPAK_TOKEN)
          .send({
            auctionId: 28891331983,
            nextBid: 140000
          }).end((err, res) => {
            if (err) {
              done(err)
            } else {
              res.should.have.status(200);
              res.should.be.json;
              should.equal(res.body.current_price, null);
              done()
            }
          });
        } else {
          console.log('tidak ada auctions di DB');
        }
      })
    })
  })
})
