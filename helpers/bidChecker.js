let _ = require('lodash')
let axios = require('axios')
let models = require('../models')

let blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  isMoreThanHighestBid: (auctionId, nextBid) => {
    return new Promise((resolve, reject) => {
      models.Bid.findAll({
        where: {
          auctionId: auctionId
        }
      }).then(bids => {
        console.log('bids dengan id sekian : ', bids );
        if (!bids) {
          let highestBid = _.maxBy(bids, 'current_bid')
          switch (true) {
            case (nextBid > highestBid.current_bid):
              resolve({
                status: true,
                message: 'Yap, tawaran lebih tinggi dari sebelumnya'
              })
              break;
            case (nextBid == highestBid.current_bid):
              reject('Anda bid sama dengan yang di bid orang lain')
              break;
            case (nextBid < highestBid.current_bid):
              reject('Jumlah bid anda lebih kecil ketimbang bid tertingg sekarang')
              break;
            default:
          }
        } else {
          reject('tidak auction dengan id ' + auctionId)
        }
      })
    })
  },
  checkBalance: (bukalapakId, token) => {
    return new Promise((resolve, reject) => {
      // cek saldo nya
      axios({
        method: 'get',
        url: blEndPoint + 'dompet/history.json',
        auth: {
          username: bukalapakId,
          password: token
        }
      }).then((responseGetBalance) => {
        console.log('isi setelah get balance : ', responseGetBalance.data.balance);
        resolve({
          status: true,
          balance: responseGetBalance.data.balance
          message: 'get balance success'
        })
      }).catch(err => {
        console.log('error when trying to get balance in bidChacker : ', err);
        reject({
          status: false,
          message: 'error when trying to get balance in bidChacker : ', err
        })
      })
    })
  }
}
