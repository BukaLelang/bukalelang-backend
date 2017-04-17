'use strict'
const models = require('../models')

module.exports = {
  authentication: (req, res, next) => {
    models.User.findById(req.params.id)
      .then(user => {
        if (req.headers.token !== user.bl_token && req.headers.id !== req.params.id ) {
          res.json({
            success:false,
            message:'user id and token is wrong!'
          })
        }else if (req.headers.id !== req.params.id) {
          res.json({
            success:false,
            message:'sorry, id is not defined!'
          })
        }else if (req.headers.token !== user.bl_token){
          res.json({
            success:false,
            message:'sorry, token is not valid!'
          })
        }else{
          next()
        }
      })
      .catch(err => {
        console.log('error when try findById in localdb', err);
        resultJson.message = 'User undefined'
        res.json(resultJson)
      })
  }
}
