var express = require('express');
var router = express.Router();

/* GET users listing. */
/**
 * @api {get} /users List all users
 * @apiGroup Users
 * @apiSuccess {Object[]} User's list
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "id": 1,
 *      "username": "Diky Arga",
 *      "email": 'dikyarga.id@gmail.com',
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z"
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
