var express = require('express');
var router = express.Router();

const applyMidleware = require('../helpers/authentication')
let dompetController = require('../controllers/dompetController')

router.post('/top-up', dompetController.topUp)

module.exports = router;
