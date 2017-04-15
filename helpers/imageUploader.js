let axios = require('axios')

let blEndPoint = 'https://api.bukalapak.com/v2/images.json'

module.exports = {
  uploadToBukaLapak: (req, res) => {
    console.log('isi request yang isi nya image : ', req.file);
    let formData = req.body;
    console.log('form data', formData);
    axios({
      method: 'post',
      auth: {
        username: req.body.bukalapakId,
        password: req.body.token
      }
    })
  }
}
