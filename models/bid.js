'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define('Bid', {
    UserId: DataTypes.INTEGER,
    AuctionId: DataTypes.INTEGER,
    current_bid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Bid;
};