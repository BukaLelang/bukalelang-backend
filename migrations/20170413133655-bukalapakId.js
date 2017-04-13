'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return  [
      queryInterface.addColumn('Users', 'bukalapakId', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Users', 'confirmed', {
          type: Sequelize.BOOLEAN
        })
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users','bukalapakId'),
      queryInterface.removeColumn('Users','confirmed')
    ]
  }
};
