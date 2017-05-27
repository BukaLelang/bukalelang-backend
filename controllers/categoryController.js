'use strict'
let fs = require('fs')
const _ = require('lodash')

const models = require('../models');

module.exports = {
  index : (req, res) => {
    let finalResult = {
      success: false,
      status: "ERROR",
      message: "Fail load categories of auction",
      categories: []
    }

    let readFile = fs.readFileSync('dummy-data/categories.json').toString()
    let categoriesJson = JSON.parse(readFile)

    finalResult.success = true
    finalResult.status = "OK"
    finalResult.message = 'Sukses load all categories'
    finalResult.categories = categoriesJson.categories
    res.json(finalResult)
  }
}
