let axios = require('axios')
var request = require('request');
let fs = require('fs')

let blEndPoint = 'https://api.bukalapak.com/v2/images.json'

module.exports = {
  uploadToBukaLapak: (bukalapakId, token) => {
    // console.log('isi bukalapakId ', bukalapakId, token);
    return new Promise((resolve, reject) => {

      var username = bukalapakId,
      password = token,
      url = 'https://' + username + ':' + password + '@api.bukalapak.com/v2/images.json';
      var formData = {
        // Pass data via Streams
        //  with dummy data
        file: fs.createReadStream(__dirname + '/images/sample-image.jpg'),
      };
      request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
        // console.log('Upload successful!  Server responded with:', body);
        if (err) {
          reject('upload failed:' + err);
        }
        if (body.status == 'ERROR') {
          reject('Error saat upload image : ' + body.message)
        } else {
          resolve(JSON.parse(body))
        }
      });
    })
  }
}
