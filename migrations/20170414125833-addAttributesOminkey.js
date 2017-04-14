'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users','omnikey',{type:Sequelize.STRING})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users','omnikey')
  }
};
