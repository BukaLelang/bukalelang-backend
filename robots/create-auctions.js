require('dotenv').config()
let moment = require('moment')
var faker = require('faker');
var chai = require('chai')
var chaiHttp = require('chai-http')

let app = require('../app')
let models = require('../models')
let imageUploader = require('../helpers/imageUploader')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function roundHundred(value){
   return Math.round(value/100)*100
}

let min_price = roundHundred(getRandomInt(10000, 900000))
let max_price = roundHundred(getRandomInt(1000000, 5000000))
let end_date = moment().add(getRandomInt(1, 7), 'days').format()
var randomName = faker.commerce.productName();

imageUploader.uploadToBukaLapak(
  process.env.BUKALAPAK_ID,
  process.env.BUKALAPAK_TOKEN).then((responseAfterUpload) => {
  // console.log('responseAfterUpload : ', responseAfterUpload.id);
  chai.request(serverHost).post('/auctions').send({
    userId: '1',
    bukalapakId: process.env.BUKALAPAK_ID,
    token: process.env.BUKALAPAK_TOKEN,
    title: randomName,
    categoryId: 2,
    new: false,
    weight: 1000,
    description: 'Ini cuma contoh deskripsi minimal 30 karakter lho, jika kurang akan error, maka nya saya banyak banyakain, masih kurang juga ?',
    min_price: min_price,
    max_price: max_price,
    kelipatan_bid: 10000,
    imagesId: responseAfterUpload.id,
    end_date: end_date
  }).end((err, res) => {
    if (err) {
      console.log(err);
    } else {
      // console.log('isi res : ', res.body);
      console.log('Sukses buat lelang ----------------------------------');
    }
  });
}).catch((err) => {
  console.log('error di image uploader : ', err);
})
