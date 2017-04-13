'use strict';
const model = require('../models')
const fs = require('fs')

let readFile = fs.readFileSync('dummy-data/categories.json').toString()
let categoriesJson = JSON.parse(readFile)

module.exports = {
  up: function (queryInterface, Sequelize) {
    return new Promise(function(res, rej){
      let seedCategories = []

      for (let i = 0; i < categoriesJson.categories.length; i++) {
        delete categoriesJson.categories[i].children //delete property children on categories

        seedCategories.push(
          new Promise(function(resolve, reject){
            model.Category.create({
                bl_categoryId:categoriesJson.categories[i].id,
                name:categoriesJson.categories[i].name,
                url:categoriesJson.categories[i].url,
                createdAt:new Date(),
                updatedAt: new Date()
              })


              if (seedCategories.length !== 0) {
                resolve('success')
              }else {
                reject()
              }
          })
        )
      }

      Promise.all(seedCategories)
        .then(function(){
          console.log("seed success");
          res()
        })
        .catch(function(){
          rej()
        })
    })
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
