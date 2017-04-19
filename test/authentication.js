var chai = require('chai')
var chaiHttp = require('chai-http')
let app = require('../app')

var should = chai.should()
chai.use(chaiHttp)

let models = require('../models')
let serverHost = app
require('dotenv').config()

describe('Authentication Test', () => {
  describe('Authentication', () => {
    it('Should be return status false with error message when trying to access route that need authentication', (done) => {
          let fakeId = 2312312
          chai.request(serverHost).post('/bids/')
          .send({
            userId: fakeId,
            token: process.env.BUKALAPAK_TOKEN,
            auctionId: 20170420,
            nextBid: 20170420
          })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              res.should.have.status(200);
              res.should.be.json;
              res.headers.success.should.to.equal(false)
              res.body.message.should.to.equal('bidding fail, user with id '+ fakeId +' not found')
              done()
            }
          });
      })
    it('Should be return status false with error message when trying to access route that need authentication', (done) => {
      let fakeToken = 'sdadasdasdwrwr'
      let fakeId = process.env.BUKALAPAK_ID
      chai.request(serverHost).post('/bids/')
      .send({
        userId : fakeId,
        token : fakeToken,
        auctionId : 20170420,
        nextBid : 20170420
      })
      .end((err, res) => {
        if (err) {
          done(err)
        }else {
          res.should.have.status(200)
          res.should.be.json
          res.body.success.should.to.equal(false)
          res.body.message.should.to.equal('token is not valid')
          done()
        }
      })
    })
  })
})
