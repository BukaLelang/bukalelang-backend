'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users','gender',{
        type:Sequelize.STRING
      }),
      queryInterface.addColumn('Users','phone_confirmed',{
        type:Sequelize.BOOLEAN
      })
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users', 'gender'),
      queryInterface.removeColumn('Users', 'phone_confirmed'),
    ]
  }
};
