'use strict'
const chai = require('chai').should()
const decryptor = require('../helpers/decryptor')
require('dotenv').config()

let password = '89b8e54a0bd2304acc19f0b6a995ae7ffb8f00'

describe('Decrypt Test',() => {
  it('Should be return hash password', (done) => {
    let result = decryptor.decryptor(password)
    result.should.to.equal(process.env.BUKALAPAK_ACCOUNT_PASSWORD_DEV)
    done()
  })
})
