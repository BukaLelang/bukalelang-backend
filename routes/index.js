var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @api {get} /ping Make sure server is runnig well
 * @apiGroup Status
 * @apiSuccess {String} status Status Server
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "status": "up",
 *    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/ping', function(req, res, next){
  res.json({
    status: "up"
  })
})

module.exports = router;
