'use strict';
const model = require('../models')
const fs = require('fs')

let readFile = fs.readFileSync('dummy-data/categories-converted.json').toString()
let categoriesJson = JSON.parse(readFile)

module.exports = {
  up: function (queryInterface, Sequelize) {
    return model.Category.find({}).then((categories) => {
      if (categories == null) {
        return queryInterface.bulkInsert('Categories', categoriesJson)
      }else {
        queryInterface.bulkDelete('Categories', null, {});
        return queryInterface.bulkInsert('Categories', categoriesJson)
      }
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
