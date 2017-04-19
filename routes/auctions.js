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
 *       "category": 'Mainan',
 *       "new": false,
 *       "weight": 5000,
 *       "description": "Gundam dapet dari pembuatnya langsung lho",
 *       "min_price": 50000,
 *       "max_price": 200000,
 *       "kelipatan_bid": 10000,
 *       "imagesId": 11122121,
 *       "end_date": 2017-09-14T00:00:00Z,
 *     }
 * @apiParam {Integer} userId userId of user
 * @apiParam {Integer} bukalapakId bukalapakId of user
 * @apiParam {String} token token of logged in user
 * @apiParam {String} title Title of auction
 * @apiParam {Integer} categoryId category ID
 * @apiParam {String} category category name of the auction
 * @apiParam {Boolean} new product is new or second ?
 * @apiParam {Integer} weight weight of the product using gram
 * @apiParam {String} description description of product (minimal 30 char)
 * @apiParam {Integer} min_price minimal / start price of auctions
 * @apiParam {Integer} max_price maximal / buy now price of auctions
 * @apiParam {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiParam {Integer} imagesId image_id after upload image to BL
 * @apiParam {Date} end_date date end of auction, default is one week

 * @apiSuccess {Integer} id id of the auction
 * @apiSuccess {Integer} productId id of the product at BL
 * @apiSuccess {String} title Title of auction
 * @apiSuccess {String} images Url of image of auction
 * @apiSuccess {Integer} categoryId category ID
 * @apiSuccess {String} category category of the auction
 * @apiSuccess {Boolean} new product is new or second ?
 * @apiSuccess {Integer} weight weight of the product using gram
 * @apiSuccess {String} description description of product
 * @apiSuccess {Integer} min_price minimal / start price of auctions
 * @apiSuccess {Integer} max_price maximal / buy now price of auctions
 * @apiSuccess {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} start_date date of auction start, default is after published
 * @apiSuccess {Date} end_date date end of auction, default is one week


 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 23,
 *      "productId": '42dfs34',
 *      "title": "Lelang Gundam Langka & Istimewa",
 *      "images": "https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447",
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
 *      "message": 'buat lelang berhasil',
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    [{
*       "id": null,
*       "productId": null,
 *      "title": null,
 *      "images": null,
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
 *      "message": 'Buat lelang gagal ):',
 *    }]
 */
router.post('/', auctionController.create)

/**
 * @api {get} /auctions get all auctions
 * @apiGroup Auction

 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {Object[]} auctions       List of auctions.
 * @apiSuccess {Integer} auctions.id id of the auction
 * @apiSuccess {Integer} auctions.productId id of the product at BL
 * @apiSuccess {String} auctions.title Title of auction
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
 *    [{
 *      "success": true,
 *      "message": 'Success load list of auctions',
 *      "auctions": [
 *            {
 *             id: 23,
 *             productId: '31fsa21',
 *             title: 'Tamiya super cepat',
 *             images: 'https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447',
 *             category: 'Mainan',
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
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    [{
 *      "success": false,
 *      "message": 'Fail load list of auctions',
 *      "auctions": []
 *    }]
 */
router.get('/', auctionController.getAllAuctions)

/**
 * @api {get} /auctions/:id get auction
 * @apiGroup Auction
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "userid": 2,
 *       "token": "IniToken",
 *     }
 * @apiHeader {Integer} userid userId of user
 * @apiHeader {String} token token of logged in user

 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {Integer} id id of the auction
 * @apiSuccess {Integer} productId id of the product at BL
 * @apiSuccess {String} title Title of auction
 * @apiSuccess {String} images URL of image of auction
 * @apiSuccess {Integer} category category of auction
 * @apiSuccess {Boolean} new product is new or second ?
 * @apiSuccess {Integer} weight weight of the product using gram
 * @apiSuccess {String} description description of product
 * @apiSuccess {Integer} min_price minimal / start price of auction
 * @apiSuccess {Integer} current_price current price of the auction
 * @apiSuccess {Integer} max_price maximal / buy now price of auction
 * @apiSuccess {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiSuccess {Date} start_date date of auction start, default is after published
 * @apiSuccess {Date} end_date date end of auction, default is one week


 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *       success: true,
 *       message: 'Success load list of auctions',
*        id: 23,
*        productId: '31fsa21',
*        title: 'Tamiya super cepat',
*        images: 'https://s0.bukalapak.com/system/images/1/6/7/6/6/8/0/large/IMG00475-20121105-1431.jpg?1352105447',
*        category: 'Mainan',
*        new: false,
*        weight: 1000,
*        description: 'Tamiya ini di rakit oleh ahli fisika, dengan memperhatikan dengan seksama gaya gesek dan kelembaman sehigga mengurangi kaya gesek dengan lintasan membuanya super cepat.',
*        min_price: 200000,
*        max_price: 3000000,
*        current_price: 600000,
*        kelipatan_bid: 20000,
*        start_date: '2017-04-16T18:22:54.846+07:00',
*        end_date: '2017-05-16T18:22:54.846+07:00'
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    [{
 *       success: false,
 *       message: 'Auction with id 3 doesnt exist',
*        id: null,
*        productId: null,
*        title: null,
*        images: null,
*        category: null,
*        new: false,
*        weight: 0,
*        description: null,
*        min_price: 0,
*        max_price: 0,
*        current_price: 0,
*        kelipatan_bid: 0,
*        start_date: null,
*        end_date: null
 *    }]
 */
router.get('/:id', applyMidleware.authentication, auctionController.show)

/**
 * @api {get} /auctions/:id/bid-history get bid history
 * @apiGroup Auction
 * @apiHeaderExample {json} Header-Example:
 *     {
 *       "userid": 2,
 *       "token": "IniToken",
 *     }
 * @apiHeader {Integer} userid userId of user
 * @apiHeader {String} token token of logged in user

 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?



 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *       success: true,
 *       message: 'Success load list of bid history',
         auction_detail: {
           id: 3,
           title: 'Tamiya tanpa gaya gravitasi',
           bid_count: 2
         },
 *       bid_history: [
              {
                name_of_bidder: 'Diky Arga',
                bid_nominal: 70000,
                bidding_time: '2017-05-17T18:22:54.846+07:00'
              },
              {
                name_of_bidder: 'Eri Selalu',
                bid_nominal: 60000,s
                bidding_time: '2017-05-16T18:22:54.846+07:00'
              }
            ]
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    [{
 *       success: false,
 *       message: 'Auction with id 3 doesnt exist',
         auction_detail: {
           id: null,
           title: null,
           bid_count: 0
         },
 *       bid_history: []
 *    }]
 */
router.get('/:id/bid-history', applyMidleware.authentication, auctionController.bidHistory)

module.exports = router;
