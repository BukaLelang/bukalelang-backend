'use strict'
const chai = require('chai').should()
const decryptor = require('../helpers/decryptor')
require('dotenv').config()

let password = process.env.ENCRYPTED_PASSWORD_IN_LOCAL

describe('Decrypt Test',() => {
  it('Should be return hash password', (done) => {
    let result = decryptor.decryptor(password)
    result.should.to.equal(process.env.BUKALAPAK_ACCOUNT_PASSWORD_DEV)
    done()
  })
})
