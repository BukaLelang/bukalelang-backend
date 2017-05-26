var express = require('express');
var router = express.Router();

let authController = require('../controllers/authController')

/* GET Auth listing. */
/**
 * @api {post} /auth/register register
 * @apiGroup Auth
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "Diky Arga",
 *       "email": "dikyarga.id@gmail.com",
 *       "username": "dikyarga",
*        "password": "this_is_my_password!"
 *     }
 * @apiParam {String} name Name of user
 * @apiParam {String} email Email of user
 * @apiParam {String} username Username of user
 * @apiParam {String} password Password of user
 * @apiSuccess {Integer} id id of user
 * @apiSuccess {Integer} bukalapakId id of user in BukaLapak
 * @apiSuccess {String} name Full Name of user
 * @apiSuccess {String} username Username of user
 * @apiSuccess {String} email Email of user
 * @apiSuccess {String} saldo Balance of user
 * @apiSuccess {Boolean} success Success or not ?
 * @apiSuccess {String} status "OK or "ERROR"
 * @apiSuccess {Array} user_addresses array of addresses
 * @apiSuccess {String} token token for authorization
 * @apiSuccess {String} message message from server
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "bukalapakId": 123121,
 *      "name": "Diky Arga",
 *      "username": "dikyarga",
 *      "email": 'dikyarga.id@gmail.com',
 *      "saldo": 123000,
 *      "token": 'lalalalululululolololo',
 *      "user_addresses": [{
          "id": 345,
          "primary": false,
          "title": "bukan utama1",
          "name": "tetsdfsdf",
          "phone": "085645262611",
          "address_attributes": {
            "id": 499,
            "address": "Lalalalaa",
            "area": "Kaliwungu",
            "city": "Kendal",
            "province": "Jawa Tengah",
            "post_code": "51372"
          }
        }],
 *      "basic_token": 'Basic fjksafjkajkdsfsjfkdsafksafksa=',
 *      "success": true,
 *      "status": "OK",
 *      "message": 'login success',
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "id": null,
 *      "bukalapakId": null,
 *      "name": null,
 *      "username": null,
 *      "email": null,
 *      "saldo": null,
 *      "token": null,
        "user_addresses": [],
 *      "basic_token": null,
 *      "success": false,
 *      "status": "ERROR",
 *      "message": 'email atau password tidak valid',
 *    }
 */
router.post('/register', authController.register)

/* GET Auth listing. */
/**
 * @api {post} /auth/login login
 * @apiGroup Auth
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "dikyarga",
*        "password": "this_is_my_password!"
 *     }
 * @apiParam {String} username Username of user
 * @apiParam {String} password Password of user
 * @apiSuccess {Integer} id id of user
 * @apiSuccess {Integer} bukalapakId id of user in BukaLapak
 * @apiSuccess {String} name Full Name of user
 * @apiSuccess {String} username Username of user
 * @apiSuccess {String} email Email of user
 * @apiSuccess {String} saldo Balance of user
 * @apiSuccess {Boolean} success Success or not ?
 * @apiSuccess {String} status "OK or "ERROR"
 * @apiSuccess {String} token token for authorization
 * @apiSuccess {Array} user_addresses array of addresses
 * @apiSuccess {String} message message from server
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "bukalapakId": 123121,
 *      "name": "Diky Arga",
 *      "username": "dikyarga",
 *      "email": 'dikyarga.id@gmail.com',
 *      "saldo": 123000,
 *      "basic_token": 'Basic fjksafjkajkdsfsjfkdsafksafksa=',
 *      "token": 'lalalalululululolololo',
 *      "user_addresses": [{
          "id": 345,
          "primary": false,
          "title": "bukan utama1",
          "name": "tetsdfsdf",
          "phone": "085645262611",
          "address_attributes": {
            "id": 499,
            "address": "Lalalalaa",
            "area": "Kaliwungu",
            "city": "Kendal",
            "province": "Jawa Tengah",
            "post_code": "51372"
          }
        }],
 *      "success": true,
 *      "status": "OK",
 *      "message": 'login success',
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "id": null,
 *      "bukalapakId": null,
 *      "name": null,
 *      "username": null,
 *      "email": null,
 *      "saldo": null,
 *      "basic_token": null,
 *      "token": null,
        "user_addresses": [],
 *      "success": false,
 *      "status": "ERROR",
 *      "message": 'email atau password salah',
 *    }
 */
router.post('/login', authController.login)

module.exports = router;
