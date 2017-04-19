'use strict'
const chai = require('chai').should()
require('dotenv').config()

let bidChecker = require('../helpers/bidChecker')
let models = require('../models')

describe('Bid Checker Funtions',() => {
  describe('isMoreThanHighestBid()', () => {

    it('Should be return status true when highestBidOfTheAuction less than nextBid', (done) => {
      bidChecker.isMoreThanHighestBid(7000, 9000).then(result => {
        result.status.should.to.equal(true)
        done()
      })
    })
    it('Should be return status false when highestBidOfTheAuction more than nextBid', (done) => {
      bidChecker.isMoreThanHighestBid(9000, 7000).then(result => {
        result.status.should.to.equal(false);
        done()
      })
    })
    it('Should be return Success message with string type data when highestBidOfTheAuction less than nextBid', (done) => {
      bidChecker.isMoreThanHighestBid(7000, 9000).then(result => {
        result.message.should.to.be.a('string')
        result.message.should.to.equal('Yap, tawaran lebih tinggi dari sebelumnya')
        done()
      })
    })
    it('Should be return fail message with string type data  when highestBidOfTheAuction more than nextBid', (done) => {
      bidChecker.isMoreThanHighestBid(9000, 7000).then(result => {
        result.message.should.to.be.a('string')
        result.message.should.to.equal('Jumlah bid anda lebih kecil ketimbang bid tertingg sekarang')
        done()
      })
    })
    it('Should be return status false when highestBidOfTheAuction same with nextBid', (done) => {
      bidChecker.isMoreThanHighestBid(9000, 9000).then(result => {
        result.status.should.to.equal(false)
        done()
      })
    })
    it('Should be return fail message with string type data  when highestBidOfTheAuction same with nextBid', (done) => {
      bidChecker.isMoreThanHighestBid(9000, 9000).then(result => {
        result.message.should.to.be.a('string')
        result.message.should.to.equal('Anda bid sama dengan yang di bid orang lain')
        done()
      })
    })
  })

  describe('checkBalance() function', () => {
    it('Should be return status = true with string type data when success to get balance', (done) => {
      bidChecker.checkBalance(process.env.BUKALAPAK_ID, process.env.BUKALAPAK_TOKEN).then(result => {
        result.status.should.to.equal(true)
        done()
      })
    })
    it('Should be return message "get balance success" with string type data when success to get balance', (done) => {
      bidChecker.checkBalance(process.env.BUKALAPAK_ID, process.env.BUKALAPAK_TOKEN).then(result => {
        result.status.should.to.equal(true)
        result.message.should.to.be.a('string')
        result.message.should.to.equal('get balance success')
        done()
      })
    })
    it('Should be return the balance (integer) of the user when success to get balance', (done) => {
      bidChecker.checkBalance(process.env.BUKALAPAK_ID, process.env.BUKALAPAK_TOKEN).then(result => {
        result.status.should.to.equal(true)
        result.balance.should.to.be.a('number')
        done()
      })
    })
  })

  describe('highestBidOfTheAuction() function', () => {
    it('Should be return amount of highestBidOfTheAuction', (done) => {
      models.Auction.findAll().then(auctions => {
        let convertedAuctions = JSON.parse(JSON.stringify(auctions))
        let auctionsLength = convertedAuctions.length
        if (auctionsLength > 0) {
          // find the highest bid for last auction
          let lastAuction = convertedAuctions[auctionsLength - 1]
          bidChecker.highestBidOfTheAuction(lastAuction.id).then(result => {
            result.should.to.be.a('number')
            done()
          })
        } else {
          console.log('no auctions yet, so i cant check anything');
          done()
        }
      })
    })
  })
})
