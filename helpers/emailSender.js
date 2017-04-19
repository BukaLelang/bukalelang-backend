var ses = require('node-ses')
require('dotenv').config()

var client = ses.createClient({
  key: process.env.AWS_SECRET_KEY,
  secret: process.env.AWS_CLIENT_KEY,
  amazon: process.env.AWS_SES_ENDPOINT
});

module.exports = {
    sendEmailToWinner: (detailWinner, auction) => {
      console.log('send email jalan, detail user : ', detailWinner);
      // Give SES the details and let it construct the message for you.
      client.sendEmail({
         to: detailWinner.email
       , from: 'bukalelang@gmail.com'
       , subject: 'Selamat ' + detailWinner.name + ', kamu memenangkan lelang!'
       , message: 'Kamu berhasil memenangkan lelang : ' + auction.title + '! Pelelang langsung membukuskan barang lelang mu, klik disini untuk berkomunikasi dengan Pelelang'
       , altText: 'plain text'
      }, function (err, data, res) {
        // console.log('ada err ? -=', err.Message);
        // console.log('ngak tau isi datanya apa ? ', data.Message);
        // console.log('res nya isinya apa ya kalo berhasil ', res.Message);
      });
    },
    sendEmailToUserAfterBidLose: (listOfBidder, highestBidDetail) => {
      // listOfBidder isi nya musti nya array
      console.log('kasih tau yang lain kalo ada yang nge-bid dengan nominal yang lebih tinggi : ', highestBidDetail.User.name);
      let listOfBidderLength = listOfBidder.length
      for (var i = 0; i < listOfBidderLength; i++) {
            client.sendEmail({
              to: listOfBidder[i].email
            , from: 'bukalelang@gmail.com'
            , subject: 'Gawat nih ' + listOfBidder[i].name + '! Ada yang nge-bid lebih tinggi dari kamu!'
            , message: 'Gawat! ' + highestBidDetail.User.name + ' menawar lebih tinggi dari kamu, yaitu : ' + highestBidDetail.current_bid + ', jangan biarkan dia memenangkan barang yang kamu incar, Ayo bid lebih tinggi lagi!'
            , altText: 'plain text'
           }, function (err, data, res) {
            //  console.log('ada err ? -=', err);
            //  console.log('ngak tau isi datanya apa ? ', data);
            //  console.log('res nya isinya apa ya kalo berhasil ', res);
           });
        }
      }

    }
