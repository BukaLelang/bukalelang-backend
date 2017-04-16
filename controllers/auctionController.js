let axios = require('axios')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')

blEndPoint = 'https://api.bukalapak.com/v2/'

// init repsonse
var finalResult = {
  id: null,
  productId: null,
  title: null,
  categoryId: null,
  new: false,
  weight: 0,
  description: null,
  min_price: 0,
  max_price: 0,
  kelipatan_bid: 0,
  start_date: null,
  end_date: null,
  userId: null,
  success: false,
  message: 'Buat lelang gagal ):',
}

module.exports = {
  create: (req, res) => {
    console.log('isi request : ', req.body);
    // upload image first
    // imageUploader.uploadToBukaLapak(req, res)

    // creat product to BL
    axios({
      method: 'post',
      url: blEndPoint + 'products.json',
      auth: {
        username: req.body.bukalapakId,
        password: req.body.token
      },
      data: {
        product: {
          category_id: req.body.categoryId,
          name: req.body.title,
          new: req.body.new,
          price: req.body.max_price,
          negotiable: true,
          weight: req.body.weight,
          stock: 1,
          description_bb: req.body.description,
        },
        images: req.body.imagesId
      }
    }).then((responseAfterCreateProduct) => {
      switch (responseAfterCreateProduct.data.status) {
        case 'ERROR':
          if (responseAfterCreateProduct.data.message = 'No HP belum dikonfirmasi') {
            finalResult.message = responseAfterCreateProduct.data.message + ', silahkan lengkapi nomor HP Anda di BukaLapak.com'
          } else {
            finalResult.message = responseAfterCreateProduct.data.message
          }
          res.json(finalResult)
          break;
        case 'OK':
          // create auction in local
          models.Auction.create({
            productId: responseAfterCreateProduct.data.product_detail.id,
            title: req.body.title,
            categoryId: req.body.categoryId,
            min_price: req.body.min_price,
            max_price: req.body.max_price,
            description: req.body.description,
            new: req.body.new,
            weight: req.body.weight,
            kelipatan_bid: req.body.kelipatan_bid,
            location: responseAfterCreateProduct.data.product_detail.city,
            start_date: new Date(),
            end_date: req.body.end_date,
            userId: req.body.userId
          }).then((auction) => {
            finalResult.id = auction.id
            finalResult.productId = auction.productId
            finalResult.title = auction.title
            finalResult.categoryId = auction.categoryId
            finalResult.new = auction.new
            finalResult.weight = auction.weight
            finalResult.description = auction.description
            finalResult.min_price = auction.min_price
            finalResult.max_price = auction.max_price
            finalResult.kelipatan_bid = auction.kelipatan_bid
            finalResult.start_date = auction.start_date
            finalResult.end_date = auction.end_date
            finalResult.success = true
            finalResult.userId = auction.userId
            finalResult.message = 'Sukses buat lelang!'
            res.json(finalResult)
          }).catch(err => {
            console.log('error when try create auction in localdb', err);
            res.json(finalResult)
          })
          break;
        default:

      }
      console.log('isi repsonse : ', responseAfterCreateProduct.data);
    }).catch((err) => {
      console.log('error when trying to create product to BL : ', err);
      res.json(finalResult)
    })
  },

  getAllAuctions: (req, res) => {
    models.Auction.findAll({
      include:[{
        model: models.Category,
      },{
        model: models.User
      }]
    }).then(auction => {
      res.json(auction)
    }).catch(err => {
      console.log('error whe try list auction in localdb', err);
      res.json(finalResult.message = err)
    })
  },

  getOneAuction: (req, res) => {
    models.Auction.findOne({

    })
  }
}
