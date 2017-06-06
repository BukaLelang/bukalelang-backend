let axios = require('axios')
let _ = require('lodash')
let moment = require('moment')
var slug = require('slug')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')
let auctionWinnerJob = require('../helpers/auctionWinnerJob')
let bidChecker = require('../helpers/bidChecker')
let decryptorHelper = require('../helpers/decryptor')

let blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  create: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      name: null,
      avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
      title: null,
      slug: null,
      images: [],
      small_images: [],
      categoryId: null,
      categoryName: null,
      new: false,
      weight: 0,
      description: null,
      location: null,
      current_price: null,
      bidderCount: 0,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      time_left: null,
      isRunning: 0,
      running: false,
      userId: null,
      success: false,
      status: "ERROR",
      message: 'Buat lelang gagal ):',
    }
    // console.log('isi request : ', req.body);
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
      // console.log('isi attributes : ', attributes.data);
      let productData = {
        product: {
          category_id: req.body.categoryId,
          name: req.body.title,
          new: req.body.new,
          price: req.body.max_price,
          negotiable: true,
          weight: req.body.weight,
          stock: 1,
          description_bb: req.body.title + ' ini sedang di lelang di BukaLelang App, silahkan unduh aplikasi BukaLelang untuk mengikuti lelang sekarang! Deskripsi barang : ' + req.body.description,
          product_detail_attributes: {}
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
            res.json(finalResult)
            break;
          case 'OK':
            // create auction in local
            // console.log('isi endDateFromAndroid', req.body.endDateFromAndroid);
            let endDate = null
            if (req.body.endDateFromAndroid != '') {
              endDate = moment(req.body.endDateFromAndroid,"DD-MM-YYYYHH:mm").utcOffset(420).format()
            } else {
              if (req.body.end_date != '') {
                endDate = req.body.end_date
              }
            }

            if (endDate == null) {
              endDate = moment().add(2, 'days').format()
            }

            console.log('endDate : ', endDate);
            models.Auction.create({
              productId: responseAfterCreateProduct.data.product_detail.id,
              title: req.body.title,
              slug: slug(req.body.title + ' ' +responseAfterCreateProduct.data.product_detail.id, {lower: true}) ,
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
              end_date: endDate,
              userId: req.body.userId,
              running: true,
            }).then((auction) => {
              // save all images one by one
              let images = []
              for (var i = 0; i < responseAfterCreateProduct.data.product_detail.images.length; i++) {
                images.push({
                  imageUrl: responseAfterCreateProduct.data.product_detail.images[i],
                  smallImageUrl: responseAfterCreateProduct.data.product_detail.small_images[i],
                  auctionId: auction.id
                })
              }
              models.ProductImage.bulkCreate(images).then(() => {
                console.log('YEAH! all images inserted');
              })

              // ambil nama category nya
              models.Category.findById(auction.categoryId).then(category => {
                if (category) {
                  finalResult.id = auction.id
                  finalResult.productId = auction.productId
                  finalResult.name = responseAfterCreateProduct.data.product_detail.seller_name
                  finalResult.avatarUrl = responseAfterCreateProduct.data.product_detail.seller_avatar
                  finalResult.title = auction.title
                  finalResult.slug = auction.slug
                  finalResult.images = responseAfterCreateProduct.data.product_detail.images
                  finalResult.small_images = responseAfterCreateProduct.data.product_detail.small_images
                  finalResult.categoryId = auction.categoryId
                  finalResult.categoryName = category.name
                  finalResult.new = auction.new
                  finalResult.weight = auction.weight
                  finalResult.description = auction.description
                  finalResult.location = responseAfterCreateProduct.data.product_detail.city
                  finalResult.current_price = auction.min_price
                  finalResult.bidderCount = 0
                  finalResult.min_price = auction.min_price
                  finalResult.max_price = auction.max_price
                  finalResult.kelipatan_bid = auction.kelipatan_bid
                  finalResult.start_date = auction.start_date
                  finalResult.end_date = auction.end_date
                  finalResult.time_left = getMinutesBetweenDates(new Date(), new Date(auction.end_date))
                  finalResult.running = true
                  finalResult.isRunning = 1
                  finalResult.success = true
                  finalResult.status = "OK"
                  finalResult.userId = auction.userId
                  finalResult.message = 'Sukses buat lelang!'

                  auctionWinnerJob.auctionWinnerJob(auction.id, auction.end_date) //Check winner every auction

                  global.io.emit('new-auction', finalResult);

                  res.json(finalResult)

                } else {
                  console.log('tidak ada category dengan id : ', auction.categoryId);
                }
              })
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
        finalResult.message = 'error when trying to create product to BL'
        res.json(finalResult)
      })
    }).catch((err) => {
      console.log('error when try to get attributes : ', err);
      finalResult.message = 'error when try to get attributes '
      res.json(finalResult)
    })
  },
  createAuctionFromExistingProduct: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      name: null,
      avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
      title: null,
      slug: null,
      images: [],
      small_images: [],
      categoryId: null,
      categoryName: null,
      new: false,
      weight: 0,
      description: null,
      location: null,
      current_price: null,
      bidderCount: 0,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      time_left: null,
      isRunning: 0,
      running: false,
      userId: null,
      success: false,
      status: "ERROR",
      message: 'Buat lelang gagal ):',
    }
    // Check usernya ada ngak, sekalian ngecheck tokenya
    models.User.findOne({
      where: {
        bukalapakId: req.body.bukalapakId
      }
    }).then(user => {
      if (!user) {
        finalResult.message = 'user not found'
        res.json(finalResult)
      }

      axios({
        method: 'get',
        url: blEndPoint + 'products/' + req.body.productId + '.json',
        auth: {
          username: req.body.bukalapakId,
          password: req.body.token
        }
      }).then(responseGetDetailProduct => {
        console.log('responseGetDetailProduct : ', responseGetDetailProduct.data);
        if (responseGetDetailProduct.data.status == 'OK') {
          // set endDate
          let endDate = null
          if (req.body.endDateFromAndroid != '') {
            endDate = moment(req.body.endDateFromAndroid,"DD-MM-YYYYHH:mm").utcOffset(420).format()
          } else {
            if (req.body.end_date != '') {
              endDate = req.body.end_date
            }
          }

          if (endDate == null) {
            endDate = moment().add(2, 'days').format()
          }
          console.log('endDate : ', endDate);

          models.Auction.create({
            productId: responseGetDetailProduct.data.product.id,
            title: responseGetDetailProduct.data.product.name,
            slug: slug(responseGetDetailProduct.data.product.name + ' ' + responseGetDetailProduct.data.product.id, {lower: true}),
            categoryId: responseGetDetailProduct.data.product.category_id,
            min_price: req.body.min_price,
            max_price: responseGetDetailProduct.data.product.price,
            kelipatan_bid: req.body.kelipatan_bid,
            description: responseGetDetailProduct.data.product.desc,
            new: responseGetDetailProduct.data.product.condition == 'used' ? false : true,
            weight: responseGetDetailProduct.data.product.weight,
            location:  responseGetDetailProduct.data.product.city,
            start_date: new Date(),
            end_date: endDate,
            userId: user.id,
            running: true
          }).then(auction => {
            // save all images bulk insert
            let images = []
            for (var i = 0; i < responseGetDetailProduct.data.product.images.length; i++) {
              images.push({
                imageUrl: responseGetDetailProduct.data.product.images[i],
                smallImageUrl: responseGetDetailProduct.data.product.small_images[i],
                auctionId: auction.id
              })
            }
            models.ProductImage.bulkCreate(images).then(() => {
              console.log('YEAH! all images inserted');
            })


            finalResult.id = auction.id
            finalResult.productId = responseGetDetailProduct.data.product.id
            finalResult.name = user.name
            finalResult.avatarUrl = responseGetDetailProduct.data.product.seller_avatar
            finalResult.title = auction.title
            finalResult.slug = auction.slug
            finalResult.images = responseGetDetailProduct.data.product.images
            finalResult.small_images = responseGetDetailProduct.data.product.small_images
            finalResult.categoryId = auction.categoryId
            finalResult.categoryName =  responseGetDetailProduct.data.product.category
            finalResult.new = auction.new
            finalResult.weight = auction.weight
            finalResult.description = auction.description
            finalResult.location = auction.location
            finalResult.current_price = auction.min_price
            finalResult.bidderCount = 0
            finalResult.min_price = auction.min_price
            finalResult.max_price = auction.max_price
            finalResult.kelipatan_bid = auction.kelipatan_bid
            finalResult.start_date = auction.start_date
            finalResult.end_date = auction.end_date
            finalResult.time_left = getMinutesBetweenDates(new Date(), new Date(auction.end_date))
            finalResult.running = true
            finalResult.isRunning = 1
            finalResult.success = true
            finalResult.status = "OK"
            finalResult.userId = auction.userId
            finalResult.message = 'Sukses buat lelang!'
            res.json(finalResult)
          })
        } else {
          finalResult.message = responseGetDetailProduct.data.message
          res.json(finalResult)
        }
      }).catch(err => {
        console.log('error when trying to get detail product : ', err.message);
        finalResult.message = 'error when trying to get detail product'
        res.json(finalResult)
      })

    }).catch(err => {
      console.log('error when trying to get user detail in table : ', err.message);
      finalResult.message = 'error when trying to get user detail in table '
      res.json(finalResult)
    })
  },
  checkout: (req, res) => {
    // init repsonse
    var finalResult = {
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findOne({
      where: {
        id: req.body.auctionId
      },
      include: [{
        model: models.User
      }, {
        model: models.Bid,
        include: [{
          model: models.User
        }]
      }]
    }).then(auction => {
      if (!auction) {
        finalResult.message = 'Lelang dengan id ' + req.body.auctionId + ' tidak ditemukan'
        res.json(finalResult)
      }
      let auctionWinner = _.maxBy(auction.Bids, 'current_bid')
      // masukin ke cart
      axios({
        method: 'post',
        url: blEndPoint + 'carts/add_product/' + auction.productId + '.json',
        auth: {
          username: auctionWinner.User.bukalapakId,
          password: auctionWinner.User.bl_token
        }
      }).then(responseAfterAddToCart => {
        // console.log('isi nya responseAfterAddToCart', responseAfterAddToCart.data.cart);
        if (responseAfterAddToCart.data.status == 'OK') {
          let selectedCart = {}
          for (var i = 0; i < responseAfterAddToCart.data.cart.length; i++) {
            if (responseAfterAddToCart.data.cart[i].seller.id == auction.User.bukalapakId) {
              selectedCart = responseAfterAddToCart.data.cart[i]
              break
            }
          }
          console.log('selectedCart : ', selectedCart);
          // get user addresses
          axios({
            method: 'get',
            url: blEndPoint + 'user_addresses.json',
            auth: {
              username: auctionWinner.User.bukalapakId,
              password: auctionWinner.User.bl_token
            }
          }).then((responseAfterGetAddresses) => {
            let shippingAddress = {}
            for (var i = 0; i < responseAfterGetAddresses.data.user_addresses.length; i++) {
              if (responseAfterGetAddresses.data.user_addresses[i].id == req.body.addressId) {
                shippingAddress = responseAfterGetAddresses.data.user_addresses[i]
                break
              }
            }
            // check shipping courier and fee
            let invoiceData = {
              payment_invoice: {
                shipping_name: shippingAddress.name,
                phone: shippingAddress.phone,
                address: {
                  province: shippingAddress.address_attributes.province,
                  city: shippingAddress.address_attributes.city,
                  area: shippingAddress.address_attributes.area,
                  address: shippingAddress.address_attributes.address,
                  post_code: shippingAddress.address_attributes.post_code
                },
                transactions_attributes: [{
                  seller_id: auction.User.bukalapakId,
                  courier: req.body.courierName,
                  buyer_notes: 'Transaksi melalui BukaLelang (:',
                  item_ids: [selectedCart.items[0].id]
                }]
              },
              payment_method: "deposit",
              deposit_password: decryptorHelper.decryptor(auctionWinner.User.password),
              cart_id: responseAfterAddToCart.data.cart_id
            }

            axios({
              method: 'post',
              url: blEndPoint + 'invoices.json',
              auth: {
                username: auctionWinner.User.bukalapakId,
                password: auctionWinner.User.bl_token
              },
              data: invoiceData
            }).then(responseAfterCreateInvoice => {
              // sementara only
              // save it to checkout table
              models.Checkout.create({
                auctionId: auction.id,
                userId: req.body.userId,
                addressId: req.body.addressId,
                finalPrice: auctionWinner.current_bid,
                courierFee: req.body.courierFee,
                courierName: req.body.courierService,
                cardId: responseAfterAddToCart.data.cart_id,
                itemIdInCart: selectedCart.items[0].id,
                sent: false
              }).then(checkout => {
                console.log('sukses simpan data checkout di table')
              }).catch(err => {
                console.log('gagal simpan data checkout di tabel : ', err)
              })

              if(responseAfterCreateInvoice.data.status == 'OK'){


                finalResult.message = 'Sukses checkout produk di Bukalapak'
                finalResult.success = true
                finalResult.status = "OK"
                res.json(finalResult)
              } else {
                finalResult.message = responseAfterCreateInvoice.data.message
                res.json(finalResult)
              }
            }).catch(err => {
              console.log('error saat create invoce', err);
              finalResult.message = 'error saat create invoce : ' + err.message
              res.json(finalResult)
            })
          }).catch(err => {
            console.log('error saat ambil alamat di BL', err);
            finalResult.message = 'error saat ambil alamat di BL'
            res.json(finalResult)
          })
        } else {
          finalResult.message = responseAfterAddToCart.data.message
          res.json(finalResult)
        }
      }).catch(err => {
        console.log('error when try add product to cart', err);
        finalResult.message = 'error when try add product to cart'
        res.json(finalResult)
      })
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      finalResult.message = 'error when try get one auction in localdb'
      res.json(finalResult)
    })
  },
  checkoutStatus: (req, res) => {
    console.log('isi params : ', req.params);
    let finalResult = {
      success: false,
      status: "ERROR",
      message: 'Fail load checkout status',
      isWin: 0,
      isCheckedOut: 0,
    }

    models.Auction.findOne({
      where: {
        id: req.params.auctionid
      },
      include: [{
        model: models.User
      }, {
        model: models.Bid,
        include: [{
          model: models.User
        }]
      }, {
        model: models.Checkout
      }]
    }).then(auction => {
      if (!auction) {
        finalResult.message = 'Lelang dengan id ' + req.params.auctionid + ' tidak ditemukan'
        res.json(finalResult)
      }
      if (auction.running == true) {
        finalResult.message = 'Lelang masih berjalan'
        res.json(finalResult)
      }

      let auctionWinner = _.maxBy(auction.Bids, 'current_bid')
      // cek dulu yang menang sama dengan userid yang di maksud ngak
      if (auctionWinner.User.id == req.params.userid) {
        if (auction.Checkout) {
            finalResult.isCheckedOut = 1
        }

        finalResult.isWin = 1
        finalResult.message = 'Success load checkout status'
        finalResult.status = "OK"
        finalResult.success = true
        res.json(finalResult)

      } else {
        finalResult.message = 'yang menang auction ini bukan user dengan id : ' + req.params.userid
        res.json(finalResult)
      }
    }).catch(err => {
      console.log('error when try to get auction by id', err);
      finalResult.message = 'error when try to get auction by id'
      res.json(finalResult)
    })
  },
  getAllAuctions: (req, res) => {
    let limitPerPage = req.query.limit || 10
    let page = req.query.page || 1
    let offset = (page - 1) * limitPerPage

    let finalResult = {
      success: false,
      status: "ERROR",
      message: 'Fail get list of auctions',
      limit: null,
      page: null,
      auctions: []
    }

    models.Auction.findAll({
      include:[{
        model: models.Category
      },{
        model: models.User
      },{
        model: models.Bid
      },{
        model: models.ProductImage
      }],
      limit: limitPerPage,
      offset: offset,
      order: [['id', 'DESC']]
    }).then(auctions => {
      // res.json(auctions)
      let auctionsArr = JSON.parse(JSON.stringify(auctions));
      auctionsArr = _.orderBy(auctionsArr, ['id'], ['desc'])
      let takeLatestAuction = _.take(auctionsArr, 10)
      const newAuctions = takeLatestAuction.map(auction => {
        return Object.assign({}, auction, {
          isRunning: auction.running == true ? 1 : 0,
          running: auction.running,
          images: convertArrayOfObjectIntoArray(_.orderBy(auction.ProductImages, ['id'], ['asc']), 'imageUrl'),
          small_images: convertArrayOfObjectIntoArray(_.orderBy(auction.ProductImages, ['id'], ['asc']), 'smallImageUrl'),
          categoryName: auction.Category.name,
          current_price: auction.Bids.length == 0 ? auction.min_price : _.maxBy(auction.Bids, 'current_bid').current_bid,
          bidderCount: auction.Bids.length == 0 ? 0 : auction.Bids.length,
          name: auction.User.name,
          avatarUrl: auction.User.avatarUrl || 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
          time_left: getMinutesBetweenDates(new Date(), new Date(auction.end_date))
        })
      });
      // cleaning unnecessary data
      for (var i = 0; i < newAuctions.length; i++) {
        delete newAuctions[i].Category
        delete newAuctions[i].User
        delete newAuctions[i].Bids
        delete newAuctions[i].ProductImages
        delete newAuctions[i].categoryId
        delete newAuctions[i].createdAt
        delete newAuctions[i].updatedAt
      }

      finalResult.success = true
      finalResult.status = "OK"
      finalResult.limit = limitPerPage
      finalResult.page = page
      finalResult.message = 'success load list of auctions'
      finalResult.auctions = newAuctions
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try list auction in localdb', err);
      res.json(finalResult)
    })
  },
  searchByTitle: (req, res) => {
    console.log('--------------', req.query.query);
    let finalResult = {
      success: false,
      status: "ERROR",
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
      },{
        model: models.ProductImage
      }],
      where: {
        title:{
          $ilike:`%${req.query.query}%`
        }
      }
    }).then(auctions => {
      if (auctions.length == 0) {
        finalResult.message = 'auction with title : ' + req.query.query + ' : not found'
        res.json(finalResult)
      }
      let auctionsArr = JSON.parse(JSON.stringify(auctions));
      auctionsArr = _.orderBy(auctionsArr, ['id'], ['desc'])
      let takeLatestAuction = _.take(auctionsArr, 15)
      const newAuctions = takeLatestAuction.map(auction => {
        return Object.assign({}, auction, {
          isRunning: auction.running == true ? 1 : 0,
          running: auction.running,
          images: convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl'),
          small_images: convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl'),
          categoryName: auction.Category.name,
          current_price: auction.Bids.length == 0 ? auction.min_price : _.maxBy(auction.Bids, 'current_bid').current_bid,
          bidderCount: auction.Bids.length == 0 ? 0 : auction.Bids.length,
          name: auction.User.name,
          avatarUrl: auction.User.avatarUrl || 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
          time_left: getMinutesBetweenDates(new Date(), new Date(auction.end_date))
        })
      });

      for (var i = 0; i < newAuctions.length; i++) {
        delete newAuctions[i].Category
        delete newAuctions[i].User
        delete newAuctions[i].Bids
        delete newAuctions[i].ProductImages
        delete newAuctions[i].categoryId
        delete newAuctions[i].createdAt
        delete newAuctions[i].updatedAt
      }

      finalResult.success = true
      finalResult.status = "OK"
      finalResult.message = 'success load list of auctions with title : ' + req.query.query + ' : found ' + auctions.length + ' auctions'
      finalResult.auctions = newAuctions
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try list auction in localdb', err);
      res.json(finalResult)
    })
  },

  timeLeft: (req, res) => {
    // init repsonse
    var finalResult = {
      time_left: null,
      end_date: null,
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findById(req.params.id).then(auction => {
      if (!auction) {
        finalResult.message = 'Lelang dengan id ' + req.params.id + ' tidak ditemukan'
        res.json(finalResult)
      }
      var endDate = new Date(auction.end_date);
      finalResult.time_left = getMinutesBetweenDates(new Date(), endDate)

      finalResult.end_date = auction.end_date
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.message = 'Sukses ngambil time left auction'
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      res.json(finalResult)
    })
  },
  currentPrice: (req, res) => {
    console.log('ini jalan');
    // init repsonse
    var finalResult = {
      currentPrice: null,
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }
    bidChecker.highestBidOfTheAuction(req.params.id).then(highestBidOfTheAuction => {
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.currentPrice = highestBidOfTheAuction
      finalResult.message = 'Sukses ngambil current price of auction : ' + req.params.id
      res.json(finalResult)
    }).catch(err => {
      console.log('error saat ambil current price : ', err);
      finalResult.message = 'error saat ambil current price'
      res.json(finalResult)
    })
  },
  show: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      title: null,
      slug: null,
      avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
      images: [],
      small_images: [],
      categoryId: null,
      categoryName: null,
      new: false,
      weight: 0,
      description: null,
      current_price: 0,
      bidderCount: 0,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      time_left: 0,
      isRunning: false,
      userId: null,
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.ProductImage
      }, {
        model: models.Category
      }, {
        model: models.User
      }, {
        model: models.Bid
      }]
    }).then(auction => {
      console.log('isi auciton L --------', auction.User);
      if (!auction) {
        finalResult.message = 'Lelang dengan id ' + req.params.id + ' tidak ditemukan'
        res.json(finalResult)
      }
      finalResult.id = auction.id
      finalResult.productId = auction.productId
      finalResult.title = auction.title
      finalResult.avatarUrl =auction.User.avatarUrl
      finalResult.slug = auction.slug
      finalResult.images = convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl')
      finalResult.small_images = convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl')
      finalResult.categoryId = auction.categoryId
      finalResult.categoryName = auction.Category.name
      finalResult.new = auction.new
      finalResult.weight = auction.weight
      finalResult.description = auction.description
      finalResult.current_price = auction.Bids.length == 0 ? auction.min_price : _.maxBy(auction.Bids, 'current_bid').current_bid
      finalResult.bidderCount = auction.Bids.length == 0 ? 0 : auction.Bids.length
      finalResult.min_price = auction.min_price
      finalResult.max_price = auction.max_price
      finalResult.kelipatan_bid = auction.kelipatan_bid
      finalResult.start_date = auction.start_date
      finalResult.end_date = auction.end_date
      finalResult.time_left = getMinutesBetweenDates(new Date(), new Date(auction.end_date))
      finalResult.running = auction.running
      finalResult.isRunning = auction.running == true ? 1 : 0
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.userId = auction.userId
      finalResult.message = 'Sukses ngambil satu auction'
      res.json(finalResult)
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      res.json(finalResult)
    })
  },
  checkoutInformation: (req, res) => {
    // init repsonse
    var finalResult = {
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
      auction: {},
      finalPrice: null,
      winnerName: null,
      addresses: [],
      shipping: []
    }

    models.Auction.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: models.ProductImage
      }, {
        model: models.Category
      }, {
        model: models.User
      }, {
        model: models.Bid,
        include: [{
          model: models.User
        }]
      }]
    }).then(auction => {
      // console.log('isi auciton L --------', auction.User);
      if (!auction) {
        finalResult.message = 'Lelang dengan id ' + req.params.id + ' tidak ditemukan'
        res.json(finalResult)
      }
      let auctionWinner = _.maxBy(auction.Bids, 'current_bid')
      // get user addresses
      axios({
        method: 'get',
        url: blEndPoint + 'user_addresses.json',
        auth: {
          username: auctionWinner.User.bukalapakId,
          password: auctionWinner.User.bl_token
        }
      }).then((responseAfterGetAddresses) => {
        // check shipping courier and fee
        axios({
          method: 'get',
          url: blEndPoint + 'products/' + auction.productId + '/shipping_list.json?to=' + responseAfterGetAddresses.data.user_addresses[0].address_attributes.city + '&to_area=' + responseAfterGetAddresses.data.user_addresses[0].address_attributes.area
        }).then(responseGetDetailProduct => {

          finalResult.auction.id = auction.id
          finalResult.auction.productId = auction.productId
          finalResult.auction.title = auction.title
          finalResult.auction.avatarUrl =auction.User.avatarUrl
          finalResult.auction.slug = auction.slug
          finalResult.auction.images = convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl')
          finalResult.auction.small_images = convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl')
          finalResult.auction.categoryId = auction.categoryId
          finalResult.auction.categoryName = auction.Category.name
          finalResult.auction.new = auction.new
          finalResult.auction.weight = auction.weight
          finalResult.auction.description = auction.description
          finalResult.auction.current_price = auction.Bids.length == 0 ? auction.min_price : auctionWinner.current_bid
          finalResult.auction.bidderCount = auction.Bids.length == 0 ? 0 : auction.Bids.length
          finalResult.auction.min_price = auction.min_price
          finalResult.auction.max_price = auction.max_price
          finalResult.auction.kelipatan_bid = auction.kelipatan_bid
          finalResult.auction.start_date = auction.start_date
          finalResult.auction.end_date = auction.end_date
          finalResult.auction.time_left = getMinutesBetweenDates(new Date(), new Date(auction.end_date))
          finalResult.auction.running = auction.running
          finalResult.auction.isRunning = auction.running == true ? 1 : 0
          finalResult.auction.success = true
          finalResult.auction.status = "OK"
          finalResult.auction.userId = auction.userId

          finalResult.finalPrice = auctionWinner.current_bid
          finalResult.winnerName = auctionWinner.User.name

          let userAddressesArr = responseAfterGetAddresses.data.user_addresses.map(address => {
            return Object.assign({}, address, {
              isPrimary: address.primary == true ? 1 : 0,
            })
          });

          finalResult.addresses = userAddressesArr

          finalResult.shipping = responseGetDetailProduct.data.fee_list

          finalResult.message = 'Sukses ambil data checkout'
          finalResult.success = true
          finalResult.status = "OK"
          res.json(finalResult)
        }).catch(err => {
          console.log('error when trying to get detail product : ', err.message);
          finalResult.message = 'error when trying to get detail product'
          res.json(finalResult)
        })

      }).catch(err => {
        console.log('error saat ambil alamat di BL', err);
        finalResult.message = 'error saat ambil alamat di BL'
        res.json(finalResult)
      })
    }).catch(err => {
      console.log('error when try get one auction in localdb', err);
      finalResult.message = 'error when try get one auction in localdb'
      res.json(finalResult)
    })
  },
  findAuctionBySlug: (req, res) => {
    // init repsonse
    var finalResult = {
      id: null,
      productId: null,
      title: null,
      avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
      slug: null,
      images: [],
      small_images: [],
      categoryId: null,
      categoryName: null,
      new: false,
      weight: 0,
      description: null,
      current_price: 0,
      bidderCount: 0,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      time_left: null,
      isRunning: false,
      userId: null,
      success: false,
      status: "ERROR",
      message: 'Ambil satu auction gagal ):',
    }

    models.Auction.findOne({
      where: {
        slug: req.params.slug
      },
      include: [{
        model: models.ProductImage
      }, {
        model: models.Category
      }, {
        model: models.User
      }, {
        model: models.Bid
      }]
    }).then(auction => {
      if (!auction) {
        finalResult.message = 'Lelang dengan slug ' + req.params.slug + ' tidak ditemukan'
        res.json(finalResult)
      }
      finalResult.id = auction.id
      finalResult.productId = auction.productId
      finalResult.title = auction.title
      finalResult.slug = auction.slug
      finalResult.avatarUrl = auction.User.avatarUrl
      finalResult.images = convertArrayOfObjectIntoArray(auction.ProductImages, 'imageUrl')
      finalResult.small_images = convertArrayOfObjectIntoArray(auction.ProductImages, 'smallImageUrl')
      finalResult.categoryId = auction.categoryId
      finalResult.categoryName = auction.Category.name
      finalResult.new = auction.new
      finalResult.weight = auction.weight
      finalResult.description = auction.description
      finalResult.current_price = auction.Bids.length == 0 ? auction.min_price : _.maxBy(auction.Bids, 'current_bid').current_bid
      finalResult.bidderCount = auction.Bids.length == 0 ? 0 : auction.Bids.length
      finalResult.min_price = auction.min_price
      finalResult.max_price = auction.max_price
      finalResult.kelipatan_bid = auction.kelipatan_bid
      finalResult.start_date = auction.start_date
      finalResult.end_date = auction.end_date
      finalResult.time_left = getMinutesBetweenDates(new Date(), new Date(auction.end_date))
      finalResult.running = auction.running
      finalResult.isRunning = auction.running == true ? 1 : 0
      finalResult.success = true
      finalResult.status = "OK"
      finalResult.userId = auction.userId
      finalResult.message = 'Sukses ngambil satu auction berdasarkan slug'
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
      status: "ERROR",
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
            let sortedBids = _.orderBy(bids, ['id'], ['desc'])
            let lastestTenBids = _.take(sortedBids, 10)
            let bidHistoryArr = JSON.parse(JSON.stringify(lastestTenBids))
            const newBidHistory = bidHistoryArr.map(bid => {
              return Object.assign({}, bid, {
                name_of_bidder: bid.User.name,
                avatarUrl: bid.User.avatarUrl,
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
            finalResult.status = "OK"
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

// to get milisecond of time left
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
