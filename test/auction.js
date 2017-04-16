var chai = require('chai')
var chaiHttp = require('chai-http')
require('dotenv').config()
let moment = require('moment')
var should = chai.should()
var axios = require('axios')
var faker = require('faker');
chai.use(chaiHttp)

let models = require('../models')
let imageUploader = require('../helpers/imageUploader')

let serverHost = 'http://localhost:3000'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let min_price = 50000
let max_price = 2000000
let end_date = moment().add(5, 'days').format()
var randomName = faker.name.findName();

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
          title: 'Ini cuma testing ajsfsfaa  fsafs fsaasdjasdkjsadkadsdsaa sd saddfsdf sfafdfasf a ',
          categoryId: 2,
          new: false,
          weight: 4000,
          description: 'Ini cuma contoh deskripsi minimal 30 karakter lho, jika kurang akan error, maka nya saya banyak banyakain, masih kurang juga ?',
          min_price: min_price,
          max_price: max_price,
          kelipatan_bid: 10000,
          imagesId: responseAfterUpload.id,
          end_date: end_date
        }).end((err, res) => {
          if (err) {
            done(err)
          } else {
            console.log('isi res : ', res.body);
            res.should.have.status(200);
            res.should.be.json;
            res.body.success.should.to.equal(true)
            // after created we need to delete it
            if (res.body.success) {
              axios({
                method: 'patch',
                url: 'https://api.bukalapak.com/v2/products/' + res.body.productId + '/remove.json',
                auth: {
                  username: process.env.BUKALAPAK_ID,
                  password: process.env.BUKALAPAK_TOKEN
                }
              }).then((responseAfterRemoveProduct) => {
                // console.log('responseAfterRemoveProduct : ', responseAfterRemoveProduct.data);
                models.Auction.findById(res.body.id).then(auction => {
                  console.log('a auction : ', auction);
                  auction.destroy({
                    where: {
                      id: auction.id
                    }
                  }).then((afterDeleteProductInLocal) => {
                    // console.log('After delete product in local : ', afterDeleteProductInLocal);
                    done()

                  }).catch(err => {
                    console.log('error when trying to delete product in local : ', errr);
                  })
                })

              }).catch((err) => {
                console.log('error when trying to remove product : ', err);
              })
            }
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
