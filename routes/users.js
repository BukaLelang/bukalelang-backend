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
 * @api {get} /users/:id/auctions-won get auctions that this user won
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
router.get('/:id/auctions-won', userController.auctionsWon)

/**
 * @api {get} /users/:id/existing-products-from-lapak get list of product from existing lapak
 * @apiGroup Users
 * @apiSuccess {String} message message from server
 * @apiSuccess {Boolean} success is request success ?
 * @apiSuccess {String} status "OK" or "ERROR"
 * @apiSuccess {Array} products products from existing lapak without product that already pick in BukaLelang

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *       success: true,
 *       status: "OK",
 *       message: 'Success load product list of user lapak',
 *       products: [
           {
                 "id": "mab5",
                 "category": "Suspension",
                 "category_id": 78
                 "category_structure": ["Sepeda", "Fork & Suspension", "Suspension"],
                 "name": "Testing BL App",
                 "active": true,
                 "city": "Jakarta Selatan",
                 "province": "DKI Jakarta",
                 "price": 1250000,
                 "weight": "1000",
                 "courier": ["JNE REG"],
                 "force_insurance": false,
                 "image_ids": [2532736],
                 "images": [
                   "https://s1.bukalapak.com/system/images/2/5/3/2/7/3/6/large/IMG_0205.JPG?1371219033"
                 ],
                 "small_images": [
                   "https://s1.bukalapak.com/system/images/2/5/3/2/7/3/6/small/IMG_0205.JPG?1371219033"
                 ],
                 "url": "https://www.bukalapak.com/p/sepeda/fork-suspension/suspension/mab5_-testing-bl-app",
                 "desc": "Test upload from BL App, please ignore",
                 "condition": "new",
                 "nego": true,
                 "seller_username": "meow",
                 "seller_name": "Me Oww",
                 "seller_id": 15,
                 "seller_avatar": "https://www.bukalapak.com/system/avatars/055/f87/412/9cf/0ec/36837/medium/xkcd.png?1387424302",
                 "seller_level": "Pedagang",
                 "seller_level_badge_url": "https://www.bukalapak.com/images/badge/seller/xhdpi/level-5.png",
                 "seller_positive_feedback": 46,
                 "seller_negative_feedback": 31,
                 "seller_term_condition": "Barang yang di beli tidak dapat dikembalikan.",
                 "seller_alert": null,
                 "payment_ready": true,
                 "specs": {
                   "merk_shock": null,
                   "size_shock": null,
                   "spring": null
                 },
                 "state_description": [],
                 "minimum_negotiable": null,
                 "for_sale": true,
                 "favorited": false,
                 "free_shipping_coverage": [],
                 "deal_info": {
                   "original_price": 850000,
                   "discount_price": 765000,
                   "discount_percentage": 10,
                   "state": "pending"
                 },
                 "deal_request_state": "can edit",
                 "product_sin":  ["Deskripsi tidak tepat", "Spesifikasi tidak tepat"]
               }
            ]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *       success: false,
 *       status: "ERROR",
 *       message: 'User with id 3 not found',
 *       products: []
 *    }
 */
router.get('/:id/existing-products-from-lapak', userController.getExistingProductFromLapak)

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
