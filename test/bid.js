var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()

var should = chai.should()
chai.use(chaiHttp)

let serverHost = 'http://localhost:3000'

describe('Bid Test', () => {
  describe('Bidding', () => {
    it('Should be return status Success when trying to bid a auction', (done) => {
      chai.request(serverHost).post('/bids/').send({
        username: process.env.BUKALAPAK_ACCOUNT_USERNAME_DEV,
        password: process.env.BUKALAPAK_ACCOUNT_PASSWORD_DEV
      }).end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.success.should.to.equal(true)
          done()
        }
      });
    })
    it('Should be return all field / property when trying to bid a auction', (done) => {
      chai.request(serverHost).post('/bids/').send({
        username: process.env.BUKALAPAK_ACCOUNT_USERNAME_DEV,
        password: process.env.BUKALAPAK_ACCOUNT_PASSWORD_DEV
      }).end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.success.should.to.equal(true)
          res.body.should.have.property('id')
          res.body.should.have.property('auctionId')
          res.body.should.have.property('current_price')
          res.body.should.have.property('minimum_next_bidding')
          res.body.should.have.property('success')
          res.body.should.have.property('message')
          done()
        }
      });
    })
    it('Should be return status false when trying to bid a auction with wrong username or password', (done) => {
      chai.request(serverHost).post('/bids/').send({
        username: process.env.BUKALAPAK_ACCOUNT_USERNAME_DEV,
        password: 'passwordAsalAsalan'
      }).end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          res.body.success.should.to.equal(false)
          done()
        }
      });
    })
    it('Should be return current_price = null when trying to bid a auction with wrong username or password', (done) => {
      chai.request(serverHost).post('/bids/').send({
        username: process.env.BUKALAPAK_ACCOUNT_USERNAME_DEV,
        password: 'passwordAsalAsalan'
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
    })
  })
})
