let axios = require('axios')
const models = require('../models')

blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  register: (req, res) => {
    let finalResult = {
      id: null,
      bukalapakId: null,
      name: null,
      username: null,
      email: null,
      saldo: null,
      token: null,
      success: false,
      message: ''
    }

    // register to BL
    axios.post(blEndPoint + '/users.json', {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password,
      username: req.body.username,
      policy: '1'
    }).then((responseAfterRegisterToBukaLapak) => {
      console.log('berhasil kah : ', responseAfterRegisterToBukaLapak.data);
      // cek respon dari BL
      switch (responseAfterRegisterToBukaLapak.data.status) {
        // teruskan pesan error dari BL
        case 'ERROR':
              finalResult.message = responseAfterRegisterToBukaLapak.data.message
              res.json(finalResult)
          break;
        case 'OK':
          // buat user baru di DB
          axios({
            method:'post',
            url: blEndPoint + 'authenticate.json',
            auth: {
              username: req.body.username,
              password: req.body.password
            }
          }).then((responseAfterLogin) => {
            models.User.create({
              name: req.body.name,
              username: req.body.username,
              password: req.body.password,
              bukalapakId: responseAfterRegisterToBukaLapak.data.user_id,
              confirmed: false,
              email: req.body.email,
              omnikey: responseAfterLogin.data.omnikey,
              bl_token: responseAfterRegisterToBukaLapak.data.token
            }).then(newRegisteredUser => {
              // dari data register kita cek dompetnya
              axios({
                method: 'get',
                url: blEndPoint + 'dompet/history.json',
                auth: {
                  username: responseAfterLogin.data.user_id,
                  password: responseAfterLogin.data.token
                }
              }).then((responseGetBalance) => {
                // console.log('isi responseGetBalance : ', responseGetBalance.data);
                  finalResult.id = newRegisteredUser.id,
                  finalResult.bukalapakId = responseAfterLogin.data.user_id,
                  finalResult.name = responseAfterLogin.data.user_name,
                  finalResult.username = req.body.username,
                  finalResult.email = responseAfterLogin.data.email,
                  finalResult.saldo = responseGetBalance.data.balance,
                  finalResult.token = responseAfterLogin.data.token,
                  finalResult.success = true,
                  finalResult.message = 'login success'
                  res.json(finalResult)
              }).catch((err) => {
                console.log('isi error saat ambil saldo : ', err);
                finalResult.message = 'Error saat ambil saldo di Buka Dompet'
                res.json(finalResult)

              })
            }).catch(err => {
              console.log('error when trying to create a new user : ', err);
              // jika saat query error
              finalResult.message = 'Register new user at local DB fail'
              res.json(finalResult)
            })
          }).catch((err) => {
            console.log('Error when trying to login to BukaLapak', err);
            finalResult.message = 'Error when trying to login to BukaLapak'
            res.json(finalResult)
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
    let finalResult = {
      id: null,
      bukalapakId: null,
      name: null,
      username: null,
      email: null,
      saldo: null,
      token: null,
      success: false,
      message: ''
    }
    // cari dulu user nya udah ada di tempat kita belum
    models.User.findOne({
      where:{
        username:req.body.username
      }
    }).then(user => {
      // kalo ngak ada, coba cek di BL
      if (user == null) {
        axios({
          method:'post',
          url: blEndPoint + 'authenticate.json',
          auth: {
            username: req.body.username,
            password: req.body.password
          }
        }).then((responseAfterLogin) => {
          // console.log('isi responseAfterLogin authenticate : ', responseAfterLogin.data);
          // jika ternyata di BL belum ada juga
          if (responseAfterLogin.data.user_id == null) {
            finalResult.message = 'Anda belum memiliki akun, silahkan register terlebih dahulu';
            res.json(finalResult)

          } else {
            // di BL udah ada ternyata, jadi kita bikin di local
            models.User.create({
              name: responseAfterLogin.data.user_name,
              username: req.body.username,
              password: req.body.password,
              bukalapakId: responseAfterLogin.data.user_id,
              confirmed: responseAfterLogin.data.confirmed,
              email: responseAfterLogin.data.email,
              omnikey: responseAfterLogin.data.omnikey,
              bl_token: responseAfterLogin.data.token
            }).then((newRegisteredUser) => {
              // dari data register kita cek dompetnya
              axios({
                method: 'get',
                url: blEndPoint + 'dompet/history.json',
                auth: {
                  username: responseAfterLogin.data.user_id,
                  password: responseAfterLogin.data.token
                }
              }).then((responseGetBalance) => {
                // console.log('isi responseGetBalance : ', responseGetBalance.data);
                  finalResult.id = newRegisteredUser.id,
                  finalResult.bukalapakId = responseAfterLogin.data.user_id,
                  finalResult.name = responseAfterLogin.data.user_name,
                  finalResult.username = req.body.username,
                  finalResult.email = responseAfterLogin.data.email,
                  finalResult.saldo = responseGetBalance.data.balance,
                  finalResult.token = responseAfterLogin.data.token,
                  finalResult.success = true,
                  finalResult.message = 'login success'
                  res.json(finalResult)

              }).catch((err) => {
                console.log('isi error saat ambil saldo : ', err);
                finalResult.message = 'Error saat ambil saldo di Buka Dompet'
                res.json(finalResult)

              })
            })
          }
        }).catch((err) => {
          console.log('isi error saat authenticate : ', err);
          finalResult.message = 'Error saat otentikasi'
          res.json(finalResult)

        })
      } else {
        // di tempat kita udah ada
        console.log('udah ada cuy!');
        axios({
          method:'post',
          url: blEndPoint + 'authenticate.json',
          auth: {
            username: req.body.username,
            password: req.body.password
          }
        }).then((responseAfterLogin) => {
          axios({
            method: 'get',
            url: blEndPoint + 'dompet/history.json',
            auth: {
              username: responseAfterLogin.data.user_id,
              password: responseAfterLogin.data.token
            }
          }).then((responseGetBalance) => {
            // console.log('isi responseGetBalance : ', responseGetBalance.data);
              finalResult.id = user.id,
              finalResult.bukalapakId = responseAfterLogin.data.user_id,
              finalResult.name = user.name,
              finalResult.username = user.username,
              finalResult.email = user.email,
              finalResult.saldo = responseGetBalance.data.balance,
              finalResult.token = responseAfterLogin.data.token,
              finalResult.success = true,
              finalResult.message = 'login success'
              res.json(finalResult)

          }).catch((err) => {
            console.log('isi error saat ambil saldo : ', err);
            finalResult.message = 'Error saat ambil saldo di Buka Dompet'
            res.json(finalResult)

          })
        }).catch((err) => {
          console.log('isi error saat authenticate : ', err);
          finalResult.message = 'Error saat otentikasi'
          res.json(finalResult)

        })
      }
    })
  }
}