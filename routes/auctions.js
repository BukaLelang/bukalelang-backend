var express = require('express');
var multer  = require('multer')

var router = express.Router();

var upload = multer({ dest: 'uploads/' })

let auctionController = require('../controllers/auctionController')

/* GET Auth listing. */
/**
 * @api {post} /auctions create auctions
 * @apiGroup Auction
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": 2,
 *      "bukalapakId": 231232131,
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
 *      "bukalapakId": 231232131,
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
router.get('/', auctionController.getAllAuctions)

module.exports = router;
