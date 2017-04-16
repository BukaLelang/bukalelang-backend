var express = require('express');
var multer  = require('multer')

var router = express.Router();

var upload = multer({ dest: 'uploads/' })

let auctionController = require('../controllers/auctionController')

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
 *       "imagesId": 11122121,
 *       "end_date": 2017-09-14T00:00:00Z,
 *     }
 * @apiParam {Integer} userId userId of user
 * @apiParam {Integer} bukalapakId bukalapakId of user
 * @apiParam {String} token token of logged in user
 * @apiParam {String} title Title of auction
 * @apiParam {Integer} categoryId category ID
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
 * @apiSuccess {Integer} categoryId category ID
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
 *      "categoryId": 145,
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
*      "productId": null,
 *      "title": null,
 *      "categoryId": null,
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
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": 2,
 *       "token": "IniToken",
 *     }
 * @apiParam {Integer} userId userId of user
 * @apiParam {String} token token of logged in user

 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {Object[]} auctions       List of auctions.
 * @apiSuccess {Integer} auctions.id id of the auction
 * @apiSuccess {Integer} auctions.productId id of the product at BL
 * @apiSuccess {String} auctions.title Title of auction
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

module.exports = router;
