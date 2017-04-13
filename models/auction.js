'use strict';
module.exports = function(sequelize, DataTypes) {
  var Auction = sequelize.define('Auction', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    max_price: DataTypes.INTEGER,
    min_price: DataTypes.INTEGER,
    kelipatan_bid: DataTypes.INTEGER,
    location: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Auction;
};