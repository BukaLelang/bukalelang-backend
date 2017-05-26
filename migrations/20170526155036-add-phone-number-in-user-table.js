'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users','phone',{
        type:Sequelize.STRING
      })
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users', 'phone'),
    ]
  }
};
