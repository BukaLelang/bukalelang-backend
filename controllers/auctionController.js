let axios = require('axios')
let _ = require('lodash')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')

let blEndPoint = 'https://api.bukalapak.com/v2/'



module.exports = {
  create: (req, res) => {
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
    console.log('isi request : ', req.body);
    // upload image first
    // imageUploader.uploadToBukaLapak(req, res)

    // get brand first
    axios({
      method: 'get',
      url: blEndPoint + 'categories/'+ req.body.categoryId +'/attributes.json',
      auth: {
        username: req.body.bukalapakId,
        password: req.body.token
      }
    }).then((attributes) => {
      console.log('isi attributes : ', attributes.data);
      let productData = {
        product: {
          category_id: req.body.categoryId,
          name: req.body.title,
          new: req.body.new,
          price: req.body.max_price,
          negotiable: true,
          weight: req.body.weight,
          stock: 1,
          description_bb: req.body.description,
          product_detail_attributes: {
          }
        },
        images: req.body.imagesId,
      }
      // add attributes to product
      let attributesLength = attributes.data.attributes.length
      if (attributesLength != 0) {
        for (var i = 0; i < attributesLength; i++) {
          productData.product.product_detail_attributes[attributes.data.attributes[i].fieldName] = attributes.data.attributes[i].options[0] || 'null'
        }
      }

      // creat product to BL
      axios({
        method: 'post',
        url: blEndPoint + 'products.json',
        auth: {
          username: req.body.bukalapakId,
          password: req.body.token
        },
        data: productData
      }).then((responseAfterCreateProduct) => {
        console.log('response dari BL setelah coba create product : ', responseAfterCreateProduct.data);
        switch (responseAfterCreateProduct.data.status) {
          case 'ERROR':
            finalResult.message = responseAfterCreateProduct.data.message
            console.log('kesini pak');
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
      }).catch((err) => {
        console.log('error when trying to create product to BL : ', err);
        res.json(finalResult)
      })
    }).catch((err) => {
      console.log('error when try to get attributes : ', err);
    })


  },

  getAllAuctions: (req, res) => {
    let finalResult = {
      status: false,
      message: 'Fail get list of auctions',
      auctions: []
    }

    models.Auction.findAll({
      include:[{
        model: models.Category
      },{
        model: models.User
      },{
        model: models.Bid
      }]
    }).then(auctions => {
      auctionsArr = JSON.parse(JSON.stringify(auctions));

      console.log(auctionsArr);
      const newAuctions = auctionsArr.map(auction => {
        return Object.assign({}, auction, {
          categoryName: auction.Category.name,
          current_price: auction.Bids.length == 0 ? auction.min_price : _.maxBy(auction.Bids, 'current_bid').current_bid,
          name: auction.User.name
        })
      });

      for (var i = 0; i < newAuctions.length; i++) {
        delete newAuctions[i].Category
        delete newAuctions[i].User
        delete newAuctions[i].Bids
        delete newAuctions[i].categoryId
        delete newAuctions[i].userId
        delete newAuctions[i].createdAt
        delete newAuctions[i].updatedAt
      }

      finalResult.status = true
      finalResult.message = 'success load list of auctions'
      finalResult.auctions = newAuctions
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try list auction in localdb', err);
      res.json(finalResult)
    })
  },

  getOneAuction: (req, res) => {
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

    models.Auction.findById(req.params.id).then(auction => {
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
      finalResult.message = 'Sukses ngambil satu auction'
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      res.json(finalResult.message = err)
    })
  }
}
