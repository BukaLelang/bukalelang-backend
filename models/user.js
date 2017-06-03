'use strict';
const crypto = require('crypto');
require('dotenv').config()

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
    confirmed:DataTypes.BOOLEAN,
    omnikey:DataTypes.STRING,
    gender:DataTypes.STRING,
    birthday:DataTypes.STRING,
    avatarUrl:DataTypes.STRING,
    avatarId:DataTypes.INTEGER,
    phone:DataTypes.STRING,
    phone_confirmed:DataTypes.BOOLEAN,
    fcmRegistrationToken:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Bid, {foreignKey: 'userId'})
        User.hasMany(models.Auction, {foreignKey: 'userId'})
      }
    },
    hooks:{
      beforeCreate:function(value, option){
        let cipher = crypto.createCipher('aes-256-ctr', process.env.SECRET_KEY)
        let crypted = cipher.update(value.password,'utf8','hex')
        crypted += cipher.final('hex');
        value.password = crypted
      }
    }
  });
  return User;
};
