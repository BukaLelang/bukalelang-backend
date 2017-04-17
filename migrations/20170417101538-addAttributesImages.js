'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Auctions', 'images',{type:Sequelize.STRING})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Auctions','images')
  }
};
