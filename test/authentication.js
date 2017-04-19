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
          .set('userid', fakeId)
          .set('token', process.env.BUKALAPAK_TOKEN)
          .send({
            auctionId: 20170420,
            nextBid: 20170420
          })
          .end((err, res) => {
            if (err) {
              done(err)
            } else {
              res.should.have.status(200);
              res.should.be.json;
              res.body.success.should.to.equal(false)
              res.body.message.should.to.equal('authentication failed user not found')
              done()
            }
          });
      })
    it('Should be return status false with error message when trying to access route that need authentication', (done) => {
      let fakeId = 1
      chai.request(serverHost).post('/bids/')
      .set('userid', fakeId)
      .set('token', 'initokensalah')
      .send({
        auctionId: 20170420,
        nextBid: 20170420
      })
      .end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.success.should.to.equal(false)
          res.body.message.should.to.equal('authentication failed token is not valid')
          done()
        }
      });
    })
  })
})
