var express = require('express');

var router = express.Router();

let bidController = require('../../controllers/bidController')

let fakeURLEndpoint = 'http://localhost:3000/fake/'

router.get('/get-fake-balance', function(req, res, next){
  let finalResult = { status: 'OK',
      balance: 1000000,
      topup_history: [],
      withdrawal_history: [],
      mutation_history: [],
      message: null
    }

  // console.log('masuk fake request : ', req.body);
  res.json(finalResult)
})

module.exports = router;
