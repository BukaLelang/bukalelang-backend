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
 * @apiSuccess {Integer} userId userId of user
 * @apiSuccess {String} name Full Name of user
 * @apiSuccess {String} username Username of user
 * @apiSuccess {String} email Email of user
 * @apiSuccess {String} saldo Balance of user
 * @apiSuccess {String} token token for authorization
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      id: 1,
 *      bukalapakId: 23113,
 *      name: "Diky Arga",
 *      username: "dikyarga",
 *      email: 'dikyarga.id@gmail.com',
 *      saldo: 123000,
 *      token: 'lalalalululululolololo',
 *      success: true,
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
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
 * @apiSuccess {String} token token for authorization
 * @apiSuccess {String} message message from server
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "bukalapakId": 123121,
 *      "name": "Diky Arga",
 *      "username": "dikyarga",
 *      "email": 'dikyarga.id@gmail.com',
 *      "saldo": 123000,
 *      "token": 'lalalalululululolololo',
 *      "success": true,
 *      "message": 'login success',
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', authController.login)

module.exports = router;
