'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Auctions','productId',{type:Sequelize.STRING})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Auctions','productId')
  }
};
