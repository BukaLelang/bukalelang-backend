'use strict'
const _ = require('lodash')
let axios = require('axios')

const models = require('../models');

let blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  auctionsJoined : (req, res) => {
    console.log('isi req', req.params);
    let finalResult = {
      success: false,
      status: "ERROR",
      message: "User with id not found",
      user_detail:{
        id: null,
        name: null,
        avatarUrl: null,
        auctionsJoinedCount: 0,
        wonAuctionsCount: 0
      },
      auctionsJoined:[]
    }
    models.User.findById(req.params.id, {
      include:[{
        model: models.Bid,
        include:{
          model:models.Auction,
          include: [{
            model:models.Category
          }, {
            model: models.ProductImage
          }]
        }
      }]
    }).then(user => {
      // console.log('isi user ', user.Bids[0].Auction.ProductImages);
        let auctionsJoinedCount = _.uniqBy(user.Bids, 'auctionId')
        let AuctionsJoined = JSON.parse(JSON.stringify(user.Bids))
            AuctionsJoined = _.uniqBy(AuctionsJoined, 'auctionId')

        let newAuctionsJoined =  AuctionsJoined.map(data => {
          return Object.assign({}, data, {
            auctionId: data.Auction.id,
            title: data.Auction.title,
            description: data.Auction.description,
            slug: data.Auction.slug,
            categoryId: data.Auction.Category.id,
            categoryName: data.Auction.Category.name,
            new: data.Auction.new,
            weight: data.Auction.weight,
            productId: data.Auction.productId,
            min_price: data.Auction.min_price,
            max_price: data.Auction.max_price,
            kelipatan_bid: data.Auction.kelipatan_bid,
            location: data.Auction.location,
            running: new Date(data.Auction.end_date) > new Date() ? true : false,
            isRunning: new Date(data.Auction.end_date) > new Date() ? 1 : 0,
            images: convertArrayOfObjectIntoArray(data.Auction.ProductImages, 'imageUrl'),
            small_images: convertArrayOfObjectIntoArray(data.Auction.ProductImages, 'smallImageUrl'),
            description: data.Auction.description,
            start_date: data.Auction.start_date,
            end_date: data.Auction.end_date,
            time_left:  getMinutesBetweenDates(new Date(), new Date(data.Auction.end_date))
          })
        })

        for (var i = 0; i < newAuctionsJoined.length; i++) {
          // wonCount = isThisUserTheWinnerOfThisAuction(user.id, newAuctionsJoined[i].id)
          delete newAuctionsJoined[i].updatedAt
          delete newAuctionsJoined[i].createdAt
          delete newAuctionsJoined[i].Auction
        }

        finalResult.success = true
        finalResult.status = "OK"
        finalResult.message = 'Success load list of auction joined'
        finalResult.user_detail.auctionsJoinedCount = auctionsJoinedCount.length
        finalResult.user_detail.id = user.id
        finalResult.user_detail.name = user.name
        finalResult.user_detail.avatarUrl = user.avatarUrl || 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg'
        finalResult.user_detail.wonAuctionsCount = 0
        finalResult.auctionsJoined = newAuctionsJoined

        res.json(finalResult)
      }).catch(err => {
        console.log('error when try get user by id : ', err);
        finalResult.message = `User with id ${req.params.id} not found`
        res.json(finalResult)
      })
  },
  auctionsWon : (req, res) => {
    console.log('isi req', req.params);
    let finalResult = {
      success: false,
      status: "ERROR",
      message: "User with id not found",
      user_detail:{
        id: null,
        name: null,
        avatarUrl: null,
        auctionsJoinedCount: 0,
        wonAuctionsCount: 0
      },
      auctionsJoined:[]
    }
    models.User.findById(req.params.id, {
      include:[{
        model: models.Bid,
        include:{
          model:models.Auction,
          include: [{
            model:models.Category
          }, {
            model: models.ProductImage
          }, {
            model: models.Bid
          }]
        }
      }]
    }).then(user => {
      // console.log('isi user ', user.Bids[0].Auction.ProductImages);
        let auctionsJoinedCount = _.uniqBy(user.Bids, 'auctionId')
        let AuctionsJoined = JSON.parse(JSON.stringify(user.Bids))
            AuctionsJoined = _.uniqBy(AuctionsJoined, 'auctionId')

        let newAuctionsJoined =  AuctionsJoined.map(data => {
          // console.log('isi data :', data);
          let auctionWinner = _.maxBy(data.Auction.Bids, 'current_bid')
          // console.log('auctionWinner', auctionWinner);
          if (auctionWinner.userId == req.params.id) {
            return Object.assign({}, data, {
              auctionId: data.Auction.id,
              title: data.Auction.title,
              description: data.Auction.description,
              slug: data.Auction.slug,
              categoryId: data.Auction.Category.id,
              categoryName: data.Auction.Category.name,
              new: data.Auction.new,
              weight: data.Auction.weight,
              productId: data.Auction.productId,
              min_price: data.Auction.min_price,
              max_price: data.Auction.max_price,
              kelipatan_bid: data.Auction.kelipatan_bid,
              location: data.Auction.location,
              running: new Date(data.Auction.end_date) > new Date() ? true : false,
              isRunning: new Date(data.Auction.end_date) > new Date() ? 1 : 0,
              images: convertArrayOfObjectIntoArray(data.Auction.ProductImages, 'imageUrl'),
              small_images: convertArrayOfObjectIntoArray(data.Auction.ProductImages, 'smallImageUrl'),
              description: data.Auction.description,
              start_date: data.Auction.start_date,
              end_date: data.Auction.end_date,
              isWon: 1,
              time_left:  getMinutesBetweenDates(new Date(), new Date(data.Auction.end_date))
            })
          } else {
            return false
          }
        })

        for (var i = 0; i < newAuctionsJoined.length; i++) {
          // wonCount = isThisUserTheWinnerOfThisAuction(user.id, newAuctionsJoined[i].id)
            if (!newAuctionsJoined[i]) {
                newAuctionsJoined.splice(i, 1)
            } else {
              delete newAuctionsJoined[i].updatedAt
              delete newAuctionsJoined[i].createdAt
              delete newAuctionsJoined[i].Auction
            }
        }

        finalResult.success = true
        finalResult.status = "OK"
        finalResult.message = 'Success load list of auction joined'
        finalResult.user_detail.auctionsJoinedCount = auctionsJoinedCount.length
        finalResult.user_detail.id = user.id
        finalResult.user_detail.name = user.name
        finalResult.user_detail.avatarUrl = user.avatarUrl || 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg'
        finalResult.user_detail.wonAuctionsCount = 0
        finalResult.auctionsJoined = newAuctionsJoined

        res.json(finalResult)
      }).catch(err => {
        console.log('error when try get user by id : ', err);
        finalResult.message = `User with id ${req.params.id} not found`
        res.json(finalResult)
      })
  },
  getExistingProductFromLapak : (req, res) => {
    console.log('isi req', req.params);
    let finalResult = {
      success: false,
      status: "ERROR",
      message: "User with id not found",
      products:[]
    }

    models.User.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.Auction
      }]
    }).then(user => {
      if (!user) {
        finalResult.message = 'user with Id : ' + req.params.id + ' is not found'
        res.json(finalResult)
      }

      console.log('isi list of auction nya : ', user.Auctions);
      let userAuctions = []
      for (var i = 0; i < user.Auctions.length; i++) {
        userAuctions.push(user.Auctions[i].productId)
      }

      axios({
        method: 'get',
        url: blEndPoint + 'products/mylapak.json',
        auth: {
          username: user.bukalapakId,
          password: user.bl_token
        }
      }).then(responseGetLapak => {
        console.log('dapat product apa aja : ', responseGetLapak.data.products);
        let products = responseGetLapak.data.products
        let productsWithoutAlreadyJoinedAuction = products.filter(function(product) {
          return userAuctions.indexOf(product.id) == -1
        })

        console.log('lalu apa jadi nya : ', productsWithoutAlreadyJoinedAuction);

        // cleaning
        for (var i = 0; i < productsWithoutAlreadyJoinedAuction.length; i++) {
          delete productsWithoutAlreadyJoinedAuction[i].installment
          delete productsWithoutAlreadyJoinedAuction[i].min_installment_price
          delete productsWithoutAlreadyJoinedAuction[i].deal_info
          delete productsWithoutAlreadyJoinedAuction[i].deal_request_state
          delete productsWithoutAlreadyJoinedAuction[i].seller_level_badge_url
          delete productsWithoutAlreadyJoinedAuction[i].seller_delivery_time
          delete productsWithoutAlreadyJoinedAuction[i].seller_positive_feedback
          delete productsWithoutAlreadyJoinedAuction[i].seller_negative_feedback
          delete productsWithoutAlreadyJoinedAuction[i].seller_term_condition
          delete productsWithoutAlreadyJoinedAuction[i].seller_alert
          delete productsWithoutAlreadyJoinedAuction[i].last_order_schedule
          delete productsWithoutAlreadyJoinedAuction[i].top_merchant
          delete productsWithoutAlreadyJoinedAuction[i].premium_account
          delete productsWithoutAlreadyJoinedAuction[i].state_description
        }

        finalResult.status = "OK"
        finalResult.success = true
        finalResult.message = 'success get products from lapak'
        finalResult.products = productsWithoutAlreadyJoinedAuction
        res.json(finalResult)

      }).catch(err => {
        console.log('Error when trying to get product from my lapak', err.message);
        finalResult.message = 'Error when trying to get product from my lapak'
        res.json(finalResult)
      })

    })
  },
  userDetail : (req, res) => {
    let finalResult = {
      success: false,
      message: "User with id not found",
      user_detail:{
        id: null,
        name: null,
      }
    }
    models.User.findById(req.params.id).then(user => {
        finalResult.success = true
        finalResult.message = 'Success get user detail informations'
        finalResult.user_detail.id = user.id
        finalResult.user_detail.name = user.name
        res.json(finalResult)
      }).catch(err => {
        console.log('error when try get user by id : ', err);
        finalResult.message = `User with id ${req.params.id} not found`
        res.json(finalResult)
      })
  },
  fcmRegistrationToken : (req, res) => {
    let finalResult = {
      success: false,
      status: "ERROR",
      message: "User with bukalapakId not found",
    }
    console.log('adfjsafjas ', req.body.fcmRegistrationToken, req.body.bukalapakId);

    models.User.update(
    { fcmRegistrationToken: req.body.fcmRegistrationToken },
    { where: {
        bukalapakId: req.body.bukalapakId
      }
    }).then(user => {
      console.log('user : ', user);
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.message = "'Success store FCM registration token of the user"
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try to update FCM registration token : ', err);
      finalResult.message = "error when try to update FCM registration token : " + err.message
      res.json(finalResult)
    })
  }
}

function isThisUserTheWinnerOfThisAuction(userId, auctionId) {
  console.log('ja');
  models.Bid.findAll({
    where: {
      auctionId: auctionId
    }
  }).then(bids => {
    if (bids.length > 0) {
      let winner = _.maxBy(bids, 'current_bid')
      if (winner.userId == userId) {
        console.log('lan');
        return 1
      } else {
        return 0
      }
    } else {
      return 0
    }
  })
}

function getMinutesBetweenDates(startDate, endDate) {
  var diff = endDate.getTime() - startDate.getTime();
  // jika kurang dari nol, ya sudah buat nol aja
  if (diff <= 0) {
    diff = 0
  }
  return diff;
}

function convertArrayOfObjectIntoArray(arrayOfImages, propertyName) {
  let images = []
  for (var i = 0; i < arrayOfImages.length; i++) {
    images.push(arrayOfImages[i][propertyName])
  }
  return images
}
