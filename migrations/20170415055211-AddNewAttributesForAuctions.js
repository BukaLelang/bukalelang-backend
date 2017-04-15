'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Auctions','new',{
        type:Sequelize.BOOLEAN
      }),
      queryInterface.addColumn('Auctions','description',{
        type:Sequelize.STRING
      }),
      queryInterface.addColumn('Auctions','weight',{
        type:Sequelize.INTEGER
      })
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Auctions', 'new'),
      queryInterface.removeColumn('Auctions', 'description'),
      queryInterface.removeColumn('Auctions', 'weight')
    ]
  }
};
