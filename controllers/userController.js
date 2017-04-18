'use strict'
const models = require('../models');
const _ = require('lodash')

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
        let count = _.uniqBy(user.Bids, 'auctionId')
        let wonCount = _.uniqBy(user.Bids, 'current_bid')
            wonCount = _.maxBy(wonCount, 'current_bid')
        let arrWonCount = []
            arrWonCount.push(wonCount.current_bid)

        let AuctionsJoined = JSON.parse(JSON.stringify(user.Bids))
            AuctionsJoined = _.uniqBy(AuctionsJoined, 'auctionId')

        let newAuctionsJoined =  AuctionsJoined.map(data => {
          return Object.assign({}, data, {
            auctionId: data.Auction.id,
            title: data.Auction.title,
            running: 19 < 18 ? true : false
          })
        })

        for (var i = 0; i < newAuctionsJoined.length; i++) {
          delete newAuctionsJoined[i].id
          delete newAuctionsJoined[i].userId
          delete newAuctionsJoined[i].current_bid
          delete newAuctionsJoined[i].updatedAt
          delete newAuctionsJoined[i].createdAt
          delete newAuctionsJoined[i].current_bid
          delete newAuctionsJoined[i].Auction
        }

        finalResult.success = true
        finalResult.message = 'Success load list of auction joined'
        finalResult.user_detail.auctionsJoinedCount = count.length
        finalResult.user_detail.id = user.id
        finalResult.user_detail.name = user.name
        finalResult.user_detail.wonAuctionsCount = arrWonCount.length
        finalResult.auctionsJoined = newAuctionsJoined

        res.json(finalResult)
      }).catch(err => {
        console.log('error when try get user by id : ', err);
        finalResult.message = `User with id ${req.params.id} not found`
      })
  }
}

function isThisUserTheWinnerOfThisAuction(userId) {

}
