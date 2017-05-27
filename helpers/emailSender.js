var EmailTemplate = require('email-templates').EmailTemplate
var path = require('path')
var ses = require('node-ses')
require('dotenv').config()

var templateDir = path.join(__dirname, 'email-templates', 'lose-bid')
var loseBid = new EmailTemplate(templateDir)

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
      console.log('kasih tau yang lain kalo ada yang nge-bid dengan nominal yang lebih tinggi : ', highestBidDetail.User.name);
      let listOfBidderLength = listOfBidder.length
      for (var i = 0; i < listOfBidderLength; i++) {
        let infoForEmail = {
          self: listOfBidder[i],
          highestBidder: highestBidDetail
        }

        loseBid.render(infoForEmail, function (err, result) {
          if (err) {
            console.log('EROOOR : ', err);
          }
          module.exports.sendEmailClean(infoForEmail, result.html)
        })

      }
      // listOfBidder isi nya musti nya array

      },
      sendEmailClean: (infoForEmail, content) => {
        client.sendEmail({
          to: infoForEmail.self.User.email
        , from: 'bukalelang@gmail.com'
        , subject: 'Gawat nih ' + infoForEmail.self.User.name + '! Ada yang nge-bid lebih tinggi dari kamu!'
        , message: content
        , altText: 'Gawat! ' + infoForEmail.highestBidder.User.name + ' menawar lebih tinggi dari kamu, yaitu : ' + infoForEmail.highestBidder.current_bid + ', jangan biarkan dia memenangkan barang yang kamu incar, Ayo bid lebih tinggi lagi!'
       }, function (err, data, res) {
         console.log('ada err ? -=', err);
        //  console.log('ngak tau isi datanya apa ? ', data);
        //  console.log('res nya isinya apa ya kalo berhasil ', res);
       });
     },
    testEmail: (name, emailTo, content) => {
      // listOfBidder isi nya musti nya array
        console.log('test email jalan : ', name + 'to ', emailTo);
        client.sendEmail({
          to: emailTo
        , from: 'bukalelang@gmail.com'
        , subject: 'Hanya mencoba ' + name + '!'
        , message: content
        , altText: 'plain text'
       }, function (err, data, res) {
        //  console.log('ada err ? -=', err);
        //  console.log('ngak tau isi datanya apa ? ', data);
        //  console.log('res nya isinya apa ya kalo berhasil ', res);
       });

      }

  }
