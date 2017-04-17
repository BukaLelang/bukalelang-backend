let axios = require('axios')
let _ = require('lodash')
let moment = require('moment')

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
      images: null,
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
            // console.log('kesini pak');
            res.json(finalResult)
            break;
          case 'OK':
            // create auction in local
            models.Auction.create({
              productId: responseAfterCreateProduct.data.product_detail.id,
              title: req.body.title,
              images: responseAfterCreateProduct.data.product_detail.images[0],
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
              finalResult.images = auction.images
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
          res.json(finalResult)
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
      let auctionsArr = JSON.parse(JSON.stringify(auctions));
          auctionsArr = _.sortBy(auctionsArr, ['createdAt'])
      const newAuctions = auctionsArr.map(auction => {
        return Object.assign({}, auction, {
          running: moment(auction.end_date).format() >= moment().format() ? true : false,
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

  show: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      title: null,
      images: null,
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
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findById(req.params.id).then(auction => {
      finalResult.id = auction.id
      finalResult.productId = auction.productId
      finalResult.title = auction.title
      finalResult.images = auction.images
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
      res.json(finalResult)
    })
  },

  bidHistory: (req, res) => {
    console.log('isi request params', req.params);
    let finalResult = {
      success: false,
      message: 'Fail to get list of bid history',
      auction_detail: {
        id: null,
        title: null,
        bid_count: 0
      },
      bid_history: []
    }

    models.Auction.findById(req.params.id).then(auction => {
      if (auction) {
        models.Bid.findAll({
          where: {
            auctionId: req.params.id
          },
          include: [{
            model: models.User
          }]
        }).then(bids => {
          let bidsLength = bids.length
          if (bidsLength != 0) {
            let sortedBids = _.sortBy(bids, ['current_bid'])
            let bidHistoryArr = JSON.parse(JSON.stringify(bids))
            const newBidHistory = bidHistoryArr.map(bid => {
              return Object.assign({}, bid, {
                name_of_bidder: bid.User.name,
                bid_nominal: bid.current_bid,
                bidding_time: bid.createdAt
              })
            })

            for (var i = 0; i < newBidHistory.length; i++) {
              delete newBidHistory[i].User
              delete newBidHistory[i].id
              delete newBidHistory[i].userId
              delete newBidHistory[i].auctionId
              delete newBidHistory[i].updatedAt
              delete newBidHistory[i].createdAt
              delete newBidHistory[i].current_bid
              delete newBidHistory[i].User
            }

            finalResult.message = 'success get bid history'
            finalResult.success = true
            finalResult.auction_detail.id = auction.id
            finalResult.auction_detail.bid_count = bidsLength
            finalResult.auction_detail.title = auction.title
            finalResult.bid_history = newBidHistory

            res.json(finalResult)
          } else {
            finalResult.success = true
            finalResult.message = 'No bid history for this auction yet'
            res.json(finalResult)
          }
        })
      } else {
        finalResult.message = 'auction dengan id ' + req.params.id + ' tidak di temukan'
        res.json(finalResult)
      }
    }).catch(err => {
      console.log('Error when try to get auction by id : ', err);
    })
  }
}
