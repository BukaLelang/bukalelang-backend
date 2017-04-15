'use strict';
const crypto = require('crypto');
require('dotenv').config()

module.exports = {
  decryptor: (value) => {
    var decipher = crypto.createDecipher('aes-256-ctr',process.env.SECRET_KEY)
    var dec = decipher.update(value,'hex','utf8')
    dec += decipher.final('utf8');

    return dec
  }
}
