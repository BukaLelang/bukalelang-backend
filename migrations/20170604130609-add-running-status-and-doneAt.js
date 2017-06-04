'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Auctions','running',{
        type:Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Auctions','doneAt',{
        type: Sequelize.DATE
      })
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Auctions', 'running'),
      queryInterface.removeColumn('Auctions', 'doneAt'),
    ]
  }
};
