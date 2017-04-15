var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()

var should = chai.should()
chai.use(chaiHttp)

let serverHost = 'http://localhost:3000'

describe('Auction Test', () => {
  describe('Create Auction', () => {
    it('Should be return status Success when trying to create new Auction', (done) => {
      chai.request(serverHost).post('/auctions').send({
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
    it('Should be return all field / property when trying to create new Auction', (done) => {
      chai.request(serverHost).post('/auctions').send({
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
          res.body.should.have.property('category')
          res.body.should.have.property('title')
          res.body.should.have.property('new')
          res.body.should.have.property('description')
          res.body.should.have.property('min_price')
          res.body.should.have.property('max_price')
          res.body.should.have.property('kelipatan_bid')
          res.body.should.have.property('city')
          res.body.should.have.property('province')
          res.body.should.have.property('start_date')
          res.body.should.have.property('end_date')
          res.body.should.have.property('creator_id')
          res.body.should.have.property('end_date')
          res.body.should.have.property('success')
          res.body.should.have.property('message')
          done()
        }
      });
    })
    it('Should be return status false when trying to create Auction with wrong paramater', (done) => {
      chai.request(serverHost).post('/auctions').send({
        username: process.env.BUKALAPAK_ACCOUNT_USERNAME_DEV,
        password: process.env.BUKALAPAK_ACCOUNT_PASSWORD_DEV
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
    it('Should be return min_price = null when trying to create Auction with wrong paramater', (done) => {
      chai.request(serverHost).post('/auctions').send({
        username: process.env.BUKALAPAK_ACCOUNT_USERNAME_DEV,
        password: process.env.BUKALAPAK_ACCOUNT_PASSWORD_DEV
      }).end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          should.equal(res.body.min_price, null);
          done()
        }
      });
    })
  })
})
