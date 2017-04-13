let axios = require('axios')
const models = require('../models')

blEndPoint = 'https://api.bukalapak.com/v2/'

module.exports = {
  register: (req, res) => {
    axios.post(blEndPoint + '/users.json', {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password_confirmation: req.body.password,
      username: req.body.username,
      policy: '1'
    }).then((response) => {
      console.log('berhasil kah : ', response.data);
      switch (response.data.status) {
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
          models.User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            bukalapakId: response.data.user_id,
            bl_token: response.data.token,
            confirmed: false,
          }).then(user => {
            let saldo = 1230000

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
          })
          break;
        default:

      }
      //
    }).catch((err) => {
      console.log('error when trying to register to bukalapak :', err);
    })

  },

  login: (req, res) => {
    models.User.findOne({
      where:{
        username:req.body.username
      }
    }).then(user => {
      if(!user){
        res.json({
          userNotFound:true
        })
      }else {

        res.json({
          token:token
        })
      }
    })
  }
}
