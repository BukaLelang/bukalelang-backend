var express = require('express');
var router = express.Router();

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
 * @apiSuccess {Integer} userId userId of user
 * @apiSuccess {String} name Full Name of user
 * @apiSuccess {String} username Username of user
 * @apiSuccess {String} email Email of user
 * @apiSuccess {String} saldo Balance of user
 * @apiSuccess {String} token token for authorization
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "userId": 1,
 *      "name": "Diky Arga",
 *      "username": "dikyarga",
 *      "email": 'dikyarga.id@gmail.com',
 *      "saldo": 123000,
 *      "token": 'lalalalululululolololo',
 *      "success": true,
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/login', function(req, res, next) {
  res.json({
    success: false
  })
});

module.exports = router;
