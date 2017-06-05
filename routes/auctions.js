const express = require('express');
const router = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const auctionController = require('../controllers/auctionController')
const applyMidleware = require('../helpers/authentication')

/**
 * @api {post} /auctions create auctions
 * @apiGroup Auction
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": 2,
 *       "bukalapakId": 231232131,
 *       "token": "IniToken",
 *       "title": "Lelang Gundam Langka & Istimewa",
 *       "categoryId": 145,
 *       "new": false,
 *       "weight": 5000,
 *       "description": "Gundam dapet dari pembuatnya langsung lho",
 *       "min_price": 50000,
 *       "max_price": 200000,
 *       "kelipatan_bid": 10000,
 *       "imagesId": "11122121, 11122333",
 *       "end_date": 2017-09-14T00:00:00Z,
 *       "endDateFromAndroid": '25/05/2017 23:50',
 *     }
 * @apiParam {Integer} userId userId of user
 * @apiParam {Integer} bukalapakId bukalapakId of user
 * @apiParam {String} token token of logged in user
 * @apiParam {String} title Title of auction, note : Nama barang hanya boleh berupa huruf, angka, spasi dan simbol & . -,
 * @apiParam {Integer} categoryId category ID
 * @apiParam {Boolean} new product is new or second ?
 * @apiParam {Integer} weight weight of the product using gram
 * @apiParam {String} description description of product (minimal 30 char)
 * @apiParam {Integer} min_price minimal / start price of auctions
 * @apiParam {Integer} max_price maximal / buy now price of auctions
 * @apiParam {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiParam {Array} imagesId image_id after upload image to BL (array of ids)
 * @apiParam {Date} end_date date end of auction, default is two day
 * @apiParam {String} endDateFromAndroid date end of auction, default is two day

 * @apiSuccess {Integer} id id of the auction
 * @apiSuccess {Integer} productId id of the product at BL
 * @apiSuccess {String} title Title of auction
 * @apiSuccess {Array} images array of URL of images of auction (full resolution)
 * @apiSuccess {Array} small_images array of URL of images of auction (small resolution)
 * @apiSuccess {Integer} categoryId category ID
 * @apiSuccess {String} category category of the auction
 * @apiSuccess {Boolean} new product is new or second ?
 * @apiSuccess {Integer} weight weight of the product using gram
 * @apiSuccess {String} description description of product
 * @apiSuccess {Integer} min_price minimal / start price of auctions
 * @apiSuccess {Integer} max_price maximal / buy now price of auctions
 * @apiSuccess {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} start_date date of auction start, default is after published
 * @apiSuccess {Date} end_date date end of auction, default is two days after published
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {String} message message from server

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 23,
 *      "productId": '42dfs34',
 *      "title": "Lelang Gundam Langka & Istimewa",
 *      "images": ["https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447", "https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/lalalala.jpg?1352105447"],
 *      "small_images: ["https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/IMG00475-20121105-1431.jpg", "https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/lalalala.jpg?1352105447"],
 *      "categoryId": 145,
 *      "category": 'Mainan',
 *      "new": false,
 *      "weight": 5000,
 *      "description": "Gundam dapet dari pembuatnya langsung lho",
 *      "min_price": 50000,
 *      "max_price": 200000,
 *      "kelipatan_bid": 10000,
 *      "end_date": 2017-09-14T00:00:00Z,
 *      "userId": 2,
 *      "success": true,
 *      "status": "OK",
 *      "message": 'buat lelang berhasil',
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
*       "id": null,
*       "productId": null,
 *      "title": null,
 *      "images": [],
        "small_images": [],
 *      "categoryId": null,
 *      "category": null,
 *      "new": false,
 *      "weight": 0,
 *      "description": null,
 *      "min_price": 0,
 *      "max_price": 0,
 *      "kelipatan_bid": 0,
 *      "end_date": null,
 *      "userId": null,
 *      "success": false,
 *      "status": "ERROR",
 *      "message": 'Buat lelang gagal ):',
 *    }
 */
router.post('/', auctionController.create)

/**
 * @api {post} /auctions/from-existing-product create auctions from existing product
 * @apiGroup Auction
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": 2,
 *       "bukalapakId": 231232131,
 *       "token": "IniToken",
 *       "productId": "8rew31",
 *       "min_price": 50000,
 *       "kelipatan_bid": 10000,
 *       "end_date": 2017-09-14T00:00:00Z,
 *       "endDateFromAndroid": '25/05/2017 23:50',
 *     }
 * @apiParam {Integer} userId userId of user
 * @apiParam {Integer} bukalapakId bukalapakId of user
 * @apiParam {String} token token of logged in user
 * @apiParam {String} productId id of product in lapak
 * @apiParam {Integer} min_price minimal / start price of auctions
 * @apiParam {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiParam {Date} end_date date end of auction, default is two day
 * @apiParam {String} endDateFromAndroid date end of auction, default is two day

 * @apiSuccess {Integer} id id of the auction
 * @apiSuccess {Integer} productId id of the product at BL
 * @apiSuccess {String} title Title of auction
 * @apiSuccess {Array} images array of URL of images of auction (full resolution)
 * @apiSuccess {Array} small_images array of URL of images of auction (small resolution)
 * @apiSuccess {Integer} categoryId category ID
 * @apiSuccess {String} category category of the auction
 * @apiSuccess {Boolean} new product is new or second ?
 * @apiSuccess {Integer} weight weight of the product using gram
 * @apiSuccess {String} description description of product
 * @apiSuccess {Integer} min_price minimal / start price of auctions
 * @apiSuccess {Integer} max_price maximal / buy now price of auctions
 * @apiSuccess {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} start_date date of auction start, default is after published
 * @apiSuccess {Date} end_date date end of auction, default is two days after published
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {String} message message from server

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 23,
 *      "productId": '42dfs34',
 *      "title": "Lelang Gundam Langka & Istimewa",
 *      "images": ["https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447", "https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/lalalala.jpg?1352105447"],
 *      "small_images: ["https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/IMG00475-20121105-1431.jpg", "https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/small/lalalala.jpg?1352105447"],
 *      "categoryId": 145,
 *      "category": 'Mainan',
 *      "new": false,
 *      "weight": 5000,
 *      "description": "Gundam dapet dari pembuatnya langsung lho",
 *      "min_price": 50000,
 *      "max_price": 200000,
 *      "kelipatan_bid": 10000,
 *      "end_date": 2017-09-14T00:00:00Z,
 *      "userId": 2,
 *      "success": true,
 *      "status": "OK",
 *      "message": 'buat lelang berhasil',
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
*       "id": null,
*       "productId": null,
 *      "title": null,
 *      "images": [],
        "small_images": [],
 *      "categoryId": null,
 *      "category": null,
 *      "new": false,
 *      "weight": 0,
 *      "description": null,
 *      "min_price": 0,
 *      "max_price": 0,
 *      "kelipatan_bid": 0,
 *      "end_date": null,
 *      "userId": null,
 *      "success": false,
 *      "status": "ERROR",
 *      "message": 'Buat lelang gagal ):',
 *    }
 */
router.post('/from-existing-product', auctionController.createAuctionFromExistingProduct)

/**
 * @api {get} /auctions?limit=5&&page=2 get all auctions
 * @apiGroup Auction

 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Integer} page page of pagination
 * @apiSuccess {Integer} limit limit per page
 * @apiSuccess {Object[]} auctions List of auctions.
 * @apiSuccess {Integer} auctions.id id of the auction
 * @apiSuccess {Integer} auctions.productId id of the product at BL
 * @apiSuccess {String} auctions.title Title of auction
 * @apiSuccess {Array} auctions.images array of URL of images of auction (full resolution)
 * @apiSuccess {Array} auctions.small_images array of URL of images of auction (small resolution)
 * @apiSuccess {Integer} auctions.categorynNme category of auction
 * @apiSuccess {Integer} auctions.time_left time left of the auction
 * @apiSuccess {Boolean} auctions.new product is new or second ?
 * @apiSuccess {Integer} auctions.weight weight of the product using gram
 * @apiSuccess {String} auctions.name name of auction maker
 * @apiSuccess {String} auctions.slug slug of the auction
 * @apiSuccess {String} auctions.description description of product
 * @apiSuccess {Integer} auctions.min_price minimal / start price of auction
 * @apiSuccess {Integer} auctions.current_price current price of the auction
 * @apiSuccess {Integer} auctions.max_price maximal / buy now price of auction
 * @apiSuccess {Integer} auctions.kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} auctions.start_date date of auction start, default is after published
 * @apiSuccess {Date} auctions.end_date date end of auction, default is one week


 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "status": "OK",
 *      "message": 'Success load list of auctions',
 *      "page": 2,
        "limit": 5,
 *      "auctions": [
 *            {
 *             id: 23,
 *             productId: '31fsa21',
 *             title: 'Tamiya sto 100 cepat',
               images: [
                  "https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg",
                  "https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg",
                  "https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg",
                  "https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg",
                  "https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg"
               ],
               running: true,
               small_images: [
                    "https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg",
                    "https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg",
                    "https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg",
                    "https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg",
                    "https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg"
               ],
 *             categoryName: 'Mainan',
               time_left: 423913828,
               name: 'Diky Arga',
               slug: 'tamiya-sto-100-8hdpi0'
 *             new: false,
 *             weight: 1000,
 *             description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',
 *             min_price: 200000,
 *             max_price: 3000000,
 *             current_price: 600000,
 *             kelipatan_bid: 20000,
 *             start_date: '2017-04-16T18:22:54.846+07:00',
 *             end_date: '2017-05-16T18:22:54.846+07:00'
 *           }
 *         ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "success": false,
 *      "status": "ERROR",
 *      "message": 'Fail load list of auctions',
        "page": null,
        "limit": null,
 *      "auctions": []
 *    }
 */
router.get('/', auctionController.getAllAuctions)

/**
 * @api {get} /auctions/:id/checkout-information get information detail for checkout the auction
 * @apiGroup Auction
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Object[]} auction List of auctions.
 * @apiSuccess {Integer} auction.id id of the auction
 * @apiSuccess {Integer} auction.productId id of the product at BL
 * @apiSuccess {String} auction.title Title of auction
 * @apiSuccess {Array} auction.images array of URL of images of auction (full resolution)
 * @apiSuccess {Array} auction.small_images array of URL of images of auction (small resolution)
 * @apiSuccess {Integer} auction.categorynNme category of auction
 * @apiSuccess {Integer} auction.time_left time left of the auction
 * @apiSuccess {Boolean} auction.new product is new or second ?
 * @apiSuccess {Integer} auction.weight weight of the product using gram
 * @apiSuccess {String} auction.name name of auction maker
 * @apiSuccess {String} auction.slug slug of the auction
 * @apiSuccess {String} auction.description description of product
 * @apiSuccess {Integer} auction.min_price minimal / start price of auction
 * @apiSuccess {Integer} auction.current_price current price of the auction
 * @apiSuccess {Integer} auction.max_price maximal / buy now price of auction
 * @apiSuccess {Integer} auction.kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} auction.start_date date of auction start, default is after published
 * @apiSuccess {Date} auction.end_date date end of auction, default is one week
 * @apiSuccess {Integer} finalPrice is the final price of the auction
 * @apiSuccess {String} winnerName winner name of the auction
 * @apiSuccess {Object[]} addresses List of addresses of user, select as first / default when primary true
 * @apiSuccess {Object[]} shipping shipping available for this auction
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "status": "OK",
 *      "message": 'Success load checkout information detail',
 *      "auction": {
 *             id: 23,
 *             productId: '31fsa21',
 *             title: 'Tamiya sto 100 cepat',
               images: [
                  "https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg",
                  "https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg",
                  "https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg",
                  "https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg",
                  "https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg"
               ],
               running: true,
               small_images: [
                    "https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg",
                    "https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg",
                    "https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg",
                    "https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg",
                    "https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg"
               ],
 *             categoryName: 'Mainan',
               time_left: 423913828,
               name: 'Diky Arga',
               slug: 'tamiya-sto-100-8hdpi0'
 *             new: false,
 *             weight: 1000,
 *             description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',
 *             min_price: 200000,
 *             max_price: 3000000,
 *             current_price: 600000,
 *             kelipatan_bid: 20000,
 *             start_date: '2017-04-16T18:22:54.846+07:00',
 *             end_date: '2017-05-16T18:22:54.846+07:00'
 *           },
          "finalPrice": 600000,
          "winnerName": 'Lalala',
          "addresses": [
            {
              "id": 345,
              "primary": false,
              "title": "bukan utama1",
              "name": "tetsdfsdf",
              "phone": "085645262611",
              "address_attributes": {
                "id": 499,
                "address": "bukan utama bali",
                "area": "Abiansemal",
                "city": "Badung",
                "province": "Bali",
                "post_code": "80352"
              }
            },
            {
              "id": 346,
              "primary": true,
              "title": "utama",
              "name": "yunus",
              "phone": "085645272715",
              "address_attributes": {
                "id": 500,
                "address": "alamat utama",
                "area": "Babakan Madang",
                "city": "Kab. Bogor",
                "province": "Jawa Barat",
                "post_code": "16810"
              }
            }
          ],
          "shipping": [
                  {
                      "courier_name": "jne",
                      "couriers": [
                          {
                              "service": "JNE REG",
                              "price": 36000,
                              "eta": "2"
                          }
                      ]
                  }
          ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "success": false,
 *      "status": "ERROR",
 *      "message": 'Fail load checkout information detail',
 *      "auction": {},
         "finalPrice": null,
         "winnerName": null,
         "addresses": [],
         "shipping": []
 *    }
 */
router.get('/:id/checkout-information', auctionController.checkoutInformation)

/**
 * @api {get} /auctions/search?query=tamiya search auctions by title
 * @apiGroup Auction

 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Object[]} auctions List of auctions.
 * @apiSuccess {Integer} auctions.id id of the auction
 * @apiSuccess {Integer} auctions.productId id of the product at BL
 * @apiSuccess {String} auctions.title Title of auction
 * @apiSuccess {String} auctions.name name of auction maker
 * @apiSuccess {String} auctions.images URL of images of auction
 * @apiSuccess {Integer} auctions.category category of auction
 * @apiSuccess {Boolean} auctions.new product is new or second ?
 * @apiSuccess {Integer} auctions.weight weight of the product using gram
 * @apiSuccess {String} auctions.description description of product
 * @apiSuccess {Integer} auctions.min_price minimal / start price of auction
 * @apiSuccess {Integer} auctions.current_price current price of the auction
 * @apiSuccess {Integer} auctions.max_price maximal / buy now price of auction
 * @apiSuccess {Integer} auctions.kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} auctions.start_date date of auction start, default is after published
 * @apiSuccess {Date} auctions.end_date date end of auction, default is one week


 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "status": "OK",
 *      "message": 'Success load list of auctions by title Tamiya',
 *      "auctions": [
 *            {
 *             id: 23,
 *             productId: '31fsa21',
 *             title: 'Tamiya super cepat',
 *             name: 'Diky Arga',
               images: [
                  "https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg",
                  "https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg",
                  "https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg",
                  "https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg",
                  "https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg"
               ],
               running: true,
               small_images: [
                    "https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg",
                    "https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg",
                    "https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg",
                    "https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg",
                    "https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg"
               ]
 *             category: 'Mainan',
               time_left: 423913828,
 *             new: false,
 *             weight: 1000,
 *             description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',
 *             min_price: 200000,
 *             max_price: 3000000,
 *             current_price: 600000,
 *             kelipatan_bid: 20000,
 *             start_date: '2017-04-16T18:22:54.846+07:00',
 *             end_date: '2017-05-16T18:22:54.846+07:00'
 *           }
 *         ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "success": false,
 *      "status": "ERROR",
 *      "message": 'Fail load list of auctions',
 *      "auctions": []
 *    }
 */
router.get('/search', auctionController.searchByTitle)

/**
 * @api {get} /auctions/:id get auction by id
 * @apiGroup Auction
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Integer} id id of the auction
 * @apiSuccess {Integer} productId id of the product at BL
 * @apiSuccess {String} title Title of auction
 * @apiSuccess {String} name name of auction maker
 * @apiSuccess {Array} images array of URL of images of auction (full resolution)
 * @apiSuccess {Array} auctions.small_images array of URL of images of auction (small resolution)
 * @apiSuccess {Integer} category category of auction
 * @apiSuccess {Boolean} new product is new or second ?
 * @apiSuccess {Integer} weight weight of the product using gram
 * @apiSuccess {String} slug slug of the auction
 * @apiSuccess {String} description description of product
 * @apiSuccess {Integer} min_price minimal / start price of auction
 * @apiSuccess {Integer} current_price current price of the auction
 * @apiSuccess {Integer} max_price maximal / buy now price of auction
 * @apiSuccess {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} start_date date of auction start, default is after published
 * @apiSuccess {Date} end_date date end of auction, default is one week
 * @apiSuccess {Integer} time_left time left of the auction

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       message: 'Success load list of auctions',
*        id: 23,
*        productId: '31fsa21',
*        title: 'Tamiya super cepat',
          images: [
             "https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg",
             "https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg",
             "https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg",
             "https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg",
             "https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg"
          ],
          running: true,
          small_images: [
               "https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg",
               "https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg",
               "https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg",
               "https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg",
               "https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg"
          ]
*        category: 'Mainan',
         slug: 'tamiya-sto-100-8hdpi0',
         name: 'Diky Arga',
*        new: false,
*        weight: 1000,
*        description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',
*        min_price: 200000,
*        max_price: 3000000,
*        current_price: 600000,
*        kelipatan_bid: 20000,
*        start_date: '2017-04-16T18:22:54.846+07:00',
*        end_date: '2017-05-16T18:22:54.846+07:00',
         time_left: 423913828,
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       message: 'Auction with id 3 doesnt exist',
*        id: null,
*        productId: null,
*        title: null,
         images: [],
         running: false,
         small_images: [],
*        category: null,
         slug: null,
         name: null,
*        new: false,
*        weight: 0,
*        description: null,
*        min_price: 0,
*        max_price: 0,
*        current_price: 0,
*        kelipatan_bid: 0,
*        start_date: null,
*        end_date: null,
         time_left: 0
 *    }
 */
router.get('/:id', auctionController.show)

/**
 * @api {get} /auctions/:id/time-left get time left of the auction by id
 * @apiGroup Auction
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Integer} time_left time left of the auction
 * @apiSuccess {Date} end_date date end of auction, default is one week

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       message: 'Success load time left of auction',
         time_left: 111000,
*        end_date: '2017-05-16T18:22:54.846+07:00'
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       message: 'Auction with id 3 doesnt exist',
         time_left: null,
*        end_date: null
 *    }
 */
router.get('/:id/time-left', auctionController.timeLeft)

/**
 * @api {get} /auctions/:id/current-price get current price of the auction by id
 * @apiGroup Auction
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Integer} currentPrice the lastest updated current price of auction

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       currentPrice: 150000,
 *       message: 'Success load current price of auction',
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       currentPrice: null,
 *       message: 'Auction with id 3 doesnt exist',
 *    }
 */
router.get('/:id/current-price', auctionController.currentPrice)

/**
 * @api {get} /auctions/slug/:slug get auction by slug
 * @apiGroup Auction
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Integer} id id of the auction
 * @apiSuccess {Integer} productId id of the product at BL
 * @apiSuccess {String} title Title of auction
 * @apiSuccess {String} name name of auction maker
 * @apiSuccess {String} slug Slug URL of auction
 * @apiSuccess {Array} images array of URL of images of auction (full resolution)
 * @apiSuccess {Array} small_images array of URL of images of auction (small resolution)
 * @apiSuccess {String} category category of auction
 * @apiSuccess {Boolean} new product is new or second ?
 * @apiSuccess {Integer} weight weight of the product using gram
 * @apiSuccess {String} slug slug of the auction
 * @apiSuccess {String} description description of product
 * @apiSuccess {Integer} min_price minimal / start price of auction
 * @apiSuccess {Integer} current_price current price of the auction
 * @apiSuccess {Integer} max_price maximal / buy now price of auction
 * @apiSuccess {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} start_date date of auction start, default is after published
 * @apiSuccess {Date} end_date date end of auction, default is one week
 * @apiSuccess {Integer} time_left time left of the auction
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       message: 'Success load list of auctions',
*        id: 23,
*        productId: '31fsa21',
*        title: 'Tamiya super cepat',
*        slug: 'kamera-antik-jaman-belanda-8853e3',
        images: [
           "https://s1.bukalapak.com/img/6399443521/large/18559011_1080537988757036_3501975879389272155_o.jpg",
           "https://s1.bukalapak.com/img/1759443521/large/18588800_1080537985423703_2582422248365286934_o.jpg",
           "https://s1.bukalapak.com/img/1568443521/large/18489849_1080537978757037_3560457130178166935_o.jpg",
           "https://s1.bukalapak.com/img/6118443521/large/18556862_1080537982090370_2725080892910667932_o.jpg",
           "https://s1.bukalapak.com/img/6995143521/large/18595351_1080537975423704_1599301220619307539_o.jpg"
        ],
        running: true,
        small_images: [
             "https://s1.bukalapak.com/img/6399443521/small/18559011_1080537988757036_3501975879389272155_o.jpg",
             "https://s1.bukalapak.com/img/1759443521/small/18588800_1080537985423703_2582422248365286934_o.jpg",
             "https://s1.bukalapak.com/img/1568443521/small/18489849_1080537978757037_3560457130178166935_o.jpg",
             "https://s1.bukalapak.com/img/6118443521/small/18556862_1080537982090370_2725080892910667932_o.jpg",
             "https://s1.bukalapak.com/img/6995143521/small/18595351_1080537975423704_1599301220619307539_o.jpg"
        ],
         categoryName: 'Mainan',
         time_left: 423913828,
         name: 'Diky Arga',
*        new: false,
*        weight: 1000,
*        description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',
*        min_price: 200000,
*        max_price: 3000000,
*        current_price: 600000,
*        kelipatan_bid: 20000,
*        start_date: '2017-04-16T18:22:54.846+07:00',
*        end_date: '2017-05-16T18:22:54.846+07:00'
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       message: 'Auction with id 3 doesnt exist',
*        id: null,
*        productId: null,
*        title: null,
*        slug: null,
*        running: false,
*        images: [],
*        small_images: [],
*        categoryName: null,
         time_left: 0,
         name: null,
*        new: false,
*        weight: 0,
*        description: null,
*        min_price: 0,
*        max_price: 0,
*        current_price: 0,
*        kelipatan_bid: 0,
*        start_date: null,
*        end_date: null
 *    }
 */
router.get('/slug/:slug', auctionController.findAuctionBySlug)

/**
 * @api {get} /auctions/:id/bid-history get bid history
 * @apiGroup Auction
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       message: 'Success load list of bid history',
         auction_detail: {
           id: 3,
           title: 'Tamiya tanpa gaya gravitasi',
           bid_count: 2
         },
 *       bid_history: [
              {
                name_of_bidder: 'Diky Arga',
                avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
                name_of_bidder: 'Diky Arga',
                bid_nominal: 70000,
                bidding_time: '2017-05-17T18:22:54.846+07:00'
              },
              {
                name_of_bidder: 'Eri Selalu',
                avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
                bid_nominal: 60000,
                bidding_time: '2017-05-16T18:22:54.846+07:00'
              }
            ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       message: 'Auction with id 3 doesnt exist',
         auction_detail: {
           id: null,
           title: null,
           bid_count: 0
         },
 *       bid_history: []
 *    }
 */
router.get('/:id/bid-history', auctionController.bidHistory)

module.exports = router;
