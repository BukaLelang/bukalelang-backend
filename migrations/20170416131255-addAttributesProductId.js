'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Auctions','productId',{type:Sequelize.INTEGER})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Auctions','productId')
  }
};
