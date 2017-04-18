var express = require('express');

var router = express.Router();

let bidController = require('../controllers/bidController')

/**
 * @api {post} /bids bid the auction
 * @apiGroup Bids
 * @apiParamExample {json} Request-Example:
 *     {
 *       "userId": 2,
 *       "token": "AngapAjaIniToken",
 *       "auctionId": 101,
 *       "nextBid": 120000,
 *     }
 * @apiParam {Integer} userId userId of user
 * @apiParam {String} token token of logged in user
 * @apiParam {Integer} auctionId id of the auction
 * @apiParam {Integer} nextBid nominal of bidding offered

 * @apiSuccess {Integer} id id of the bid
 * @apiSuccess {Integer} auctionId id of the auction bided
 * @apiSuccess {String} username username of user
 * @apiSuccess {String} name name of user
 * @apiSuccess {String} message message from server
 * @apiSuccess {Date} bidding_time time of bidding
 * @apiSuccess {Boolean} success is bidding process success ?
 * @apiSuccess {Integer} current_price currently highest bid
 * @apiSuccess {Integer} minimum_next_bidding minimum nominal for the next bidding

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "message": 'bidding success',
 *      "success": true,
 *      "id": 2345,
 *      "auctionId": 101,
 *      "username": 'dikyarga',
 *      "name": 'Diky Arga',
 *      "bidding_time": '2017-04-16 17:12:40.126+08',
 *      "current_price": 40000,
 *      "minimum_next_bidding": 50000,
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    [{
 *      "message": 'bidding fail',
 *      "success": false,
 *      "id": null,
 *      "username": null,
 *      "name": null,
 *      "id": null,
 *      "bidding_time": null,
 *      "current_price": null,
 *      "minimum_next_bidding": null,
 *    }]
 */
router.post('/', bidController.bid)

module.exports = router;
