var express = require('express');
var router = express.Router();

let categoryController = require('../controllers/categoryController')

/**
 * @api {get} /categories/ get all categories
 * @apiGroup Category

 * @apiSuccess {Boolean} success Success or not ?
 * @apiSuccess {String} message message from server
 * @apiSuccess {Array} categories list categories of auction
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "success": true,
 *      "message": 'login success',
        "categories": [{
            "id": 2266,
            "name": "Perawatan & Kecantikan",
            "url": "/c/perawatan-kecantikan",
            "children": [
                {
                    "id": 2650,
                    "name": "Softlens",
                    "url": "/c/perawatan-kecantikan/softlens"
                },..]
 *    }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "success": false,
 *      "message": 'email atau password salah',
        "categories": []
 *    }
 */
router.get('/', categoryController.index)

module.exports = router;
