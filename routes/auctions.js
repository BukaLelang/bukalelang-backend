var express = require('express');
var router = express.Router();

let auctionController = require('../controllers/auctionController')

/* GET Auth listing. */
/**
 * @api {post} /auctions create auctions
 * @apiGroup Auction
 * @apiParamExample {json} Request-Example:
 *     {
 *       "title": "Lelang Gundam Langka & Istimewa",
 *       "categoryId": 145,
 *       "new": false,
 *       "weight": 5000,
 *       "description": "Gundam dapet dari pembuatnya langsung lho",
 *       "min_price": 50000,
 *       "max_price": 200000,
 *       "kelipatan_bid": 10000,
 *       "start_date": 2017-07-14T00:00:00Z,
 *       "end_date": 2017-09-14T00:00:00Z,
 *       "creator_id": 2,
 *     }
 * @apiParam {String} title Title of auction
 * @apiParam {Integer} categoryId category ID
 * @apiParam {Boolean} new product is new or second ?
 * @apiParam {Integer} weight weight of the product using gram
 * @apiParam {String} description description of product
 * @apiParam {Integer} min_price minimal / start price of auctions
 * @apiParam {Integer} max_price maximal / buy now price of auctions
 * @apiParam {Integer} kelipatan_bid nominal lipatan of next bidding
 * @apiParam {Date} start_date date of auction start, default is after published
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
 *      "start_date": 2017-07-14T00:00:00Z,
 *      "end_date": 2017-09-14T00:00:00Z,
 *      "creator_id": 2,
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
 *      "start_date": null,
 *      "end_date": null,
 *      "creator_id": null,
 *      "success": false,
 *      "message": 'Buat lelang gagal ):',
 *    }]
 */
router.post('/', auctionController.create)

module.exports = router;
