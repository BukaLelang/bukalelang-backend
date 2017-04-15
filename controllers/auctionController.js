let axios = require('axios')
const models = require('../models')

blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  create: (req, res) => {
    let finalResult = {
      id: null,
      title: null,
      categoryId: null,
      new: false,
      weight: 0,
      description: null,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      creator_id: null,
      success: false,
      message: 'Buat lelang gagal ):',
    }

    res.json(finalResult)
  }
}
