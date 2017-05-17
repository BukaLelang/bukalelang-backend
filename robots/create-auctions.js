require('dotenv').config()
let fs = require("fs");
let moment = require('moment')
let faker = require('faker');
let chai = require('chai')
let chaiHttp = require('chai-http')
chai.use(chaiHttp)

let app = require('../app')
let models = require('../models')
let imageUploader = require('../helpers/imageUploader')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function roundHundred(value){
   return Math.round(value/100)*100
}

let end_date

let auctions = JSON.parse(require('fs').readFileSync(require('path').resolve(__dirname, 'dummy-auctions.json'), 'utf8'));

for (var i = 0; i < auctions.length; i++) {
  // console.log(auctions[i].title);
  auctions[i].end_date = moment().add(getRandomInt(1, 7), 'days').format();

   (function(auction){

       setTimeout(function() { createAuction(auction) }, 600000);

   })(auctions[i]);

}

function createAuction(auction) {
  imageUploader.uploadToBukaLapak(
    process.env.BUKALAPAK_ID,
    process.env.BUKALAPAK_TOKEN,
    auction.images).then((responseAfterUpload) => {
    // console.log('responseAfterUpload : ', responseAfterUpload.id);
    chai.request(app).post('/auctions').send({
      userId: '1',
      bukalapakId: process.env.BUKALAPAK_ID,
      token: process.env.BUKALAPAK_TOKEN,
      title: auction.title,
      categoryId: auction.categoryId,
      new: auction.new,
      weight: auction.weight,
      description: auction.description,
      min_price: auction.minPrice,
      max_price: auction.maxPrice,
      kelipatan_bid: auction.kelipatanBid,
      imagesId: responseAfterUpload,
      end_date: auction.end_date
    }).end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        // console.log('isi res : ', res.body);
        if (res.body.success) {

          console.log('Sukses buat lelang ----------------------------------');
        } else {

          console.log('gagal buat lelang  ----------------------------------');
          console.log(res.body.message);
        }
      }
    });
  }).catch((err) => {
    console.log('error di image uploader : ', err);
  })
}


// imageUploader.uploadToBukaLapak(
//   process.env.BUKALAPAK_ID,
//   process.env.BUKALAPAK_TOKEN).then((responseAfterUpload) => {
//   // console.log('responseAfterUpload : ', responseAfterUpload.id);
//   chai.request(serverHost).post('/auctions').send({
//     userId: '1',
//     bukalapakId: process.env.BUKALAPAK_ID,
//     token: process.env.BUKALAPAK_TOKEN,
//     title: randomName,
//     categoryId: 2,
//     new: false,
//     weight: 1000,
//     description: 'Ini cuma contoh deskripsi minimal 30 karakter lho, jika kurang akan error, maka nya saya banyak banyakain, masih kurang juga ?',
//     min_price: min_price,
//     max_price: max_price,
//     kelipatan_bid: 10000,
//     imagesId: responseAfterUpload.id,
//     end_date: end_date
//   }).end((err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       // console.log('isi res : ', res.body);
//       console.log('Sukses buat lelang ----------------------------------');
//     }
//   });
// }).catch((err) => {
//   console.log('error di image uploader : ', err);
// })
