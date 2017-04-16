let axios = require('axios')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')

let blEndPoint = 'https://api.bukalapak.com/v2/'

// init repsonse
var finalResult = {
  message: 'bidding fail',
  success: false,
  id: null,
  auctionId: null,
  categoryId: null,
  current_price: null,
  minimum_next_bidding: null,
}

module.exports = {
  bid: (req, res) => {
    console.log('isi request : ', req.body);

  }
}
