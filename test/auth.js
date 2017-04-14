var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()

var should = chai.should()
chai.use(chaiHttp)

let serverHost = 'http://localhost:3000'

describe('Auth Test', () => {
  describe('Login', () => {
    it('Should be return status Success when trying to login', (done) => {
      chai.request(serverHost).post('/auth/login').send({
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
    it('Should be return all field / property when trying to login', (done) => {
      chai.request(serverHost).post('/auth/login').send({
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
          res.body.should.have.property('bukalapakId')
          res.body.should.have.property('name')
          res.body.should.have.property('email')
          res.body.should.have.property('username')
          res.body.should.have.property('saldo')
          res.body.should.have.property('token')
          done()
        }
      });
    })
    it('Should be return status false when trying to login with wrong username or password', (done) => {
      chai.request(serverHost).post('/auth/login').send({
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
    it('Should be return token null when trying to login with wrong username or password', (done) => {
      chai.request(serverHost).post('/auth/login').send({
        username: process.env.BUKALAPAK_ACCOUNT_USERNAME_DEV,
        password: 'passwordAsalAsalan'
      }).end((err, res) => {
        if (err) {
          done(err)
        } else {
          res.should.have.status(200);
          res.should.be.json;
          should.equal(res.body.token, null);
          done()
        }
      });
    })

  })
})
