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
    bl_token: DataTypes.STRING,
    bukalapakId:DataTypes.INTEGER,
    confirmed:DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // User.hasMany(models.Bid)
        // User.hasMany(models.Auction)
      }
    }
  });
  return User;
};
