'use strict'
const models = require('../models');

module.exports = {
  auctionsJoined : (req, res) => {
    let finalResult = {
      success: false,
      message: "User with id not found",
      user_detail:{
        id: null,
        name: null,
        auctionsJoinedCount: 0,
        wonAuctionsCount: 0
      },
      auctionsJoined:[]
    }
    models.User.findById(req.params.id, {
      include:[{
        model: models.Bid,
        include:{
          model:models.Auction
        }
      }]
    }).then(user => {
      let counTemp = []
      let count = []
      for (var i = 0; i < user.Bids.length; i++) {
        if (user.Bids[i].Auction.id === user.Bids[i].Auction.id) {
          counTemp.push(user.Bids[i].Auction.id)
        }else {
          count.push(user.Bids[i].Auction.id)
        }
      }
        console.log('list of acution Temp :', counTemp)
        console.log('list of acution :', count)
        finalResult.success = true
        finalResult.message = 'Success load list of auction joined'
        // finalResult.user_detail.auctionsJoinedCount = user.Bids.Auction.length
        finalResult.user_detail.id = user.id
        finalResult.user_detail.name = user.name
        finalResult.user_detail.wonAuctionsCount = 2
        finalResult.auctionsJoined =
        console.log('user_detail : ', finalResult);
        res.json(user)
      })
      .catch(err => {
        console.log('error when try get user by id : ', err);
        finalResult.message = `User with id ${req.params.id} not found`
      })
  }
}
