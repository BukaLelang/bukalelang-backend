const chai = require('chai');
const models = require('../models')

describe('Category Test',() => {
  it('should be return length category equal 797',() => {
    models.Category.findAll().then((categories) => {
      let result = categories.length
      result.should.equal(797)
    })
  })
})
