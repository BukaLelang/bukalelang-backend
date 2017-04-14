let axios = require('axios')
const models = require('../models')

blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  register: (req, res) => {
    // register to BL
    axios.post(blEndPoint + '/users.json', {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password,
      username: req.body.username,
      policy: '1'
    }).then((response) => {
      console.log('berhasil kah : ', response.data);
      // cek respon dari BL
      switch (response.data.status) {
        // teruskan pesan error dari BL
        case 'ERROR':
          res.json({
              userId: null,
              name: null,
              username: null,
              email: null,
              saldo: null,
              token: null,
              success: false,
              message: response.data.message
            })
          break;
        case 'OK':
          // buat user baru di DB
          models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            bukalapakId: response.data.user_id,
            bl_token: response.data.token,
            confirmed: false,
          }).then(user => {
            // get saldo
            let saldo = 1230000
            // teruskan info user dari BL
            res.json({
              userId: user.id,
              name: user.name,
              username: user.username,
              email: user.email,
              saldo: saldo,
              token: response.data.token,
              success: true,
              message: response.data.message
            })
          }).catch(err => {
            console.log('error when trying to register : ', err);
            // jika saat query error
            res.json({
              userId: null,
              name: null,
              username: null,
              email: null,
              saldo: null,
              token: null,
              success: false,
              message: 'error when trying to register : ' + err

            })
          })
          break;
        default:

      }
      //
    }).catch((err) => {
      console.log('error when trying to register to bukalapak :', err);
      // jika error saat register ke BL
      res.json({
        userId: null,
        name: null,
        username: null,
        email: null,
        saldo: null,
        token: null,
        success: false,
        message: 'error when trying to register to bukalapak :' + err

      })
    })

  },

  login: (req, res) => {
    console.log('user paramaters basic auth : ', req.body);
    models.User.findOne({
      where:{
        username:req.body.username
      }
    }).then(user => {
      console.log('isi user : ', user);
      if (user == null) {
        axios({
          method:'post',
          url: blEndPoint + 'authenticate.json',
          auth: {
            username: req.body.username,
            password: req.body.password
          }
        }).then((response) => {
          console.log('isi response authenticate : ', response.data);
          if (response.data.user_id == null) {
            res.json({
              userId: null,
              name: null,
              username: null,
              email: null,
              saldo: null,
              token: null,
              success: false,
              message: 'Anda belum memiliki akun, silahkan register terlebih dahulu '
            })
          } else {

            models.User.create({
              name: response.data.user_name,
              userId: response.data.user_id,
              confirmed: response.data.confirmed,
              email: response.data.email,
              bl_token: response.data.token
            })
            res.json({
              userId: response.data.user_id,
              name: response.data.user_name,
              username: req.body.username,
              email: response.data.email,
              saldo: null,
              token: response.data.token,
              success: true,
              message: 'login success'
            })
          }
        }).catch((err) => {
          console.log('isi error saay authenticate : ', err);
          res.json({
            data: err
          })
        })
      }
    })
  }
}
