'use strict'
const models = require('../models')

module.exports = {
  authentication: (req, res, next) => {
    let finalResult = {
      success: false,
      message: 'authentication failed'
    }

    models.User.findById(req.headers.userid)
      .then(user => {
        if (user) {
          if (user.bl_token == req.headers.token) {
            next()
          } else {
            finalResult.message += ' token is not valid'
            res.json(finalResult)
          }
        } else {
          finalResult.message += ' user not found'
          res.json(finalResult)
        }
      })
      .catch(err => {
        console.log('error when try findById in localdb', err);
        res.json(finalResult)
      })
  }
}
