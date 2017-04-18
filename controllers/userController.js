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
        let auctionsJoinedCount = _.uniqBy(user.Bids, 'auctionId')
        let AuctionsJoined = JSON.parse(JSON.stringify(user.Bids))
            AuctionsJoined = _.uniqBy(AuctionsJoined, 'auctionId')

        let newAuctionsJoined =  AuctionsJoined.map(data => {
          return Object.assign({}, data, {
            auctionId: data.Auction.id,
            title: data.Auction.title,
            running: new Date(data.Auction.end_date) > new Date() ? true : false,
            images: data.Auction.images
          })
        })

        for (var i = 0; i < newAuctionsJoined.length; i++) {
          // wonCount = isThisUserTheWinnerOfThisAuction(user.id, newAuctionsJoined[i].id)
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
        finalResult.user_detail.auctionsJoinedCount = auctionsJoinedCount.length
        finalResult.user_detail.id = user.id
        finalResult.user_detail.name = user.name
        finalResult.user_detail.wonAuctionsCount = 0
        finalResult.auctionsJoined = newAuctionsJoined

        res.json(finalResult)
      }).catch(err => {
        console.log('error when try get user by id : ', err);
        finalResult.message = `User with id ${req.params.id} not found`
      })
  }
}

function isThisUserTheWinnerOfThisAuction(userId, auctionId) {
  console.log('ja');
  models.Bid.findAll({
    where: {
      auctionId: auctionId
    }
  }).then(bids => {
    if (bids.length > 0) {
      let winner = _.maxBy(bids, 'current_bid')
      if (winner.userId == userId) {
        console.log('lan');
        return 1
      } else {
        return 0
      }
    } else {
      return 0
    }
  })
}
