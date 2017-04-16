var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()
let moment = require('moment')
var should = chai.should()
var axios = require('axios')
chai.use(chaiHttp)

let imageUploader = require('../helpers/imageUploader')

let serverHost = 'http://localhost:3000'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe('Auction Test', () => {
  describe('Create Auction', () => {
    it('Should be return status Success when trying to create new Auction', (done) => {
      imageUploader.uploadToBukaLapak(
        process.env.BUKALAPAK_ID,
        process.env.BUKALAPAK_TOKEN).then((responseAfterUpload) => {
        // console.log('responseAfterUpload : ', responseAfterUpload.id);
        chai.request(serverHost).post('/auctions').send({
          userId: '1',
          bukalapakId: process.env.BUKALAPAK_ID,
          token: process.env.BUKALAPAK_TOKEN,
          title: 'Ini cuma testing aja asdjasdkjsadka',
          categoryId: 241,
          new: false,
          weight: 4000,
          description: 'Ini cuma contoh deskripsi minimal 30 karakter lho, jika kurang akan error, maka nya saya banyak banyakain, masih kurang juga ?',
          min_price: 500000,
          max_price: 2000000,
          kelipatan_bid: 10000,
          imagesId: responseAfterUpload.id,
          end_date: '2017-04-21T18:33:07+08:00'
        }).end((err, res) => {
          if (err) {
            done(err)
          } else {
            console.log('isi res : ', res.body);
            res.should.have.status(200);
            res.should.be.json;
            res.body.success.should.to.equal(true)
            done()
          }
        });
      }).catch((err) => {
        console.log('error di image uploader : ', err);
      })
    })
    xit('Should be return all field / property when trying to create new Auction', (done) => {
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
          res.body.should.have.property('location')
          res.body.should.have.property('start_date')
          res.body.should.have.property('end_date')
          res.body.should.have.property('userId')
          res.body.should.have.property('end_date')
          res.body.should.have.property('success')
          res.body.should.have.property('message')
          done()
        }
      });
    })
    xit('Should be return status false when trying to create Auction with wrong paramater', (done) => {
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
    xit('Should be return min_price = null when trying to create Auction with wrong paramater', (done) => {
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
