let axios = require('axios')

const models = require('../models')
let imageUploader = require('../helpers/imageUploader')

blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  create: (req, res) => {
    console.log('isi request : ', req.body);

    // init repsonse
    let finalResult = {
      id: null,
      title: null,
      categoryId: null,
      new: false,
      weight: 0,
      description: null,
      min_price: 0,
      max_price: 0,
      kelipatan_bid: 0,
      start_date: null,
      end_date: null,
      creator_id: null,
      success: false,
      message: 'Buat lelang gagal ):',
    }

    // upload image first
    // imageUploader.uploadToBukaLapak(req, res)

    // creat product to BL
    axios({
      method: 'post',
      url: blEndPoint + 'products.json',
      auth: {
        username: req.body.bukalapakId,
        password: req.body.token
      },
      data: {
        product: {
          category_id: req.body.categoryId,
          name: req.body.title,
          new: req.body.new,
          price: req.body.max_price,
          negotiable: true,
          weight: req.body.weight,
          stock: 1,
          description_bb: req.body.description,
        },
        imagesId: '1172556276'
      }
    }).then((responseAfterCreateProduct) => {
      switch (responseAfterCreateProduct.data.status) {
        case 'ERROR':
          if (responseAfterCreateProduct.data.message = 'No HP belum dikonfirmasi') {
            finalResult.message = responseAfterCreateProduct.data.message + ', silahkan lengkapi nomor HP Anda di BukaLapak.com'
          } else {
            finalResult.message = responseAfterCreateProduct.data.message
          }
          res.json(finalResult)
          break;
        default:

      }
      console.log('isi repsonse : ', responseAfterCreateProduct.data);
    }).catch((err) => {
      console.log('error when trying to create product to BL : ', err);
      res.json(finalResult)
    })
  }
}
