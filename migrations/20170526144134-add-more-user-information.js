'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users','avatarUrl',{
        type:Sequelize.STRING
      }),
      queryInterface.addColumn('Users','avatarId',{
        type:Sequelize.INTEGER
      }),
      queryInterface.addColumn('Users','birthday',{
        type:Sequelize.STRING
      })
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users', 'avatarUrl'),
      queryInterface.removeColumn('Users', 'avatarId'),
      queryInterface.removeColumn('Users', 'birthday')
    ]
  }
};
