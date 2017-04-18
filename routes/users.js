var express = require('express');
var router = express.Router();

const applyMidleware = require('../helpers/authentication')
let userController = require('../controllers/userController')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * @api {get} /:id/auctions-joined get list of auctions joined
 * @apiGroup Users
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
 *       message: 'Success load list of auction joined',
         user_detail: {
           id: 3,
           name: 'Diky Arga',
           auctionsJoinedCount: 5,
           wonAuctionsCount: 2
         },
 *       auctionsJoined: [
              {
                auctionId: 2,
                running: true,
                title: 'Gundam ukuran asli'
              },
              {
                auctionId: 3,
                running: false,
                title: 'Tamiya tanp gravitasi'
              },
            ]
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    [{
 *       success: false,
 *       message: 'User with id 3 not found',
         user_detail: {
           id: null,
           name: null,
           auctionsJoinedCount: 0,
           wonAuctionsCount: 0
         },
 *       auctionsJoined: []
 *    }]
 */
router.get('/:id/auctions-joined', applyMidleware.authentication, userController.auctionsJoined)


module.exports = router;
