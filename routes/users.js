var express = require('express');
var router = express.Router();

const applyMidleware = require('../helpers/authentication')
let userController = require('../controllers/userController')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * @api {get} /users/:id/auctions-joined get list of auctions joined
 * @apiGroup Users
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Object[]} user_detail user detail information
 * @apiSuccess {Integer} user_detail.id id of the user
 * @apiSuccess {String} user_detail.name name of the user
 * @apiSuccess {String} user_detail.username username of the user
 * @apiSuccess {String} user_detail.avatarUrl url of avatar of the user
 * @apiSuccess {Integer} user_detail.auctionsJoinedCount counter of auction that joined by user
 * @apiSuccess {Integer} user_detail.wonAuctionsCount counter of how many user won the auction joined
 * @apiSuccess {Array} user_detail.auctionsJoined counter of how many user won the auction joined

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       message: 'Success load list of auction joined',
         user_detail: {
           id: 3,
           name: 'Diky Arga',
           username: 'dikyarga',
           avatarUrl: 'https://www.bukalapak.com/images/default_avatar/medium/default.jpg',
           auctionsJoinedCount: 5,
           wonAuctionsCount: 2
         },
 *       auctionsJoined: [
              {
                auctionId: 2,
                running: true,
                isRunning: 1,
                time_left: 109090998,
                title: 'Gundam ukuran asli'
              },
              {
                auctionId: 3,
                running: false,
                isRunning: 0,
                time_left: 0,
                title: 'Tamiya tanpa gravitasi'
              },
            ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       message: 'User with id 3 not found',
         user_detail: {
           id: null,
           username: null,
           name: null,
           avatarUrl: null,
           auctionsJoinedCount: 0,
           wonAuctionsCount: 0
         },
 *       auctionsJoined: []
 *    }
 */
router.get('/:id/auctions-joined', userController.auctionsJoined)

/**
 * @api {get} /users/:id get user detail informations
 * @apiGroup Users
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       message: 'Success load detail of user',
         user_detail: {
           id: 3,
           name: 'Diky Arga',
         }
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       message: 'User with id 3 not found',
         user_detail: {
           id: null,
           name: null,
         }
 *    }
 */
router.get('/:id', userController.userDetail)

/**
 * @api {post} /users/fcm-registration-token store FCM registration token
 * @apiGroup Users
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiParamExample {json} Request-Example:
 *     {
 *       "bukalapakId": 38233231,
*        "fcmRegistrationToken": "3Sad:DAdAD:ASLDA:DADA"
 *     }
 * @apiParam {String} bukalapakId bukalapakId of user
 * @apiParam {String} fcmRegistrationToken FCM registration token of user

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       message: 'Success store FCM registration token of the user',
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       message: 'User with bukalapakId 3 not found',
 *    }
 */
router.post('/fcm-registration-token', userController.fcmRegistrationToken)

module.exports = router;
