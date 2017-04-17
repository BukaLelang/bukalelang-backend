let axios = require('axios')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')
let bidChacker = require('../helpers/bidChacker')

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
    // cek user nya ada ngak ?
    models.User.findById(req.body.userId).then(user => {
      console.log('dapet user : ', user);
      if (!user) {
        // kalo ada, baru cek saldonya
        bidChacker.checkBalance(user.bukalapakId, user.bl_token).then(balance => {
          console.log('isi saldo pengguna : ', balance);
          // cek saldonya lebih tinggi dari bid yang udah ada belum
          bidChacker.isMoreThanHighestBid(req.body.auctionId, req.body.nextBid).then(responseAfterIsMoreThanHighestBid => {
            
          })
        })
      } else {
        console.log('user doesnt exist');
        finalResult.message: 'bidding fail'
        res.json(finalResult)
      }
    }).catch(err => {
      console.log('error when trying to get user in local db at bidController : ', err);
    })

  }
}
