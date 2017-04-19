'use strict'
const chai = require('chai').should()
require('dotenv').config()

let bidChecker = require('../../helpers/bidChecker')

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
})
