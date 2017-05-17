let axios = require('axios')
var request = require('request');
let fs = require('fs')

let blEndPoint = 'https://api.bukalapak.com/v2/images.json'

module.exports = {
  uploadToBukaLapak: (bukalapakId, token, imagesName) => {
    // console.log('imagesName : ', imagesName);
      let username = bukalapakId
      let password = token
      let url = 'https://' + username + ':' + password + '@api.bukalapak.com/v2/images.json';

      let fn = function uploadImageToBL(imageName) {
        return new Promise((resolve, reject) => {
              let formData = {
                file: fs.createReadStream(__dirname + '/images/' + imageName),
              };

              request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
                if (err) {
                  reject('upload failed:' + err);
                }
                if (body.status == 'ERROR') {
                  reject('Error saat upload image : ' + body.message)
                } else {
                  // console.log('lololo : ', JSON.parse(body).id);
                  resolve(JSON.parse(body).id)
                }
              });
        })
      }

      let actions = imagesName.map(fn)

      var results = Promise.all(actions);

      return results.then(data => {
          return data
        }
      );
  }
}
