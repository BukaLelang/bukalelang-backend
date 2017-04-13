'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    fbId: DataTypes.STRING,
    google_token: DataTypes.STRING,
    fb_token: DataTypes.STRING,
    bl_token: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};