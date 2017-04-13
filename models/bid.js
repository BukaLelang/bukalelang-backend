'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define('Bid', {
    UserId: DataTypes.INTEGER,
    AuctionId: DataTypes.INTEGER,
    current_bid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // Bid.belongsTo(models.User)
        // Bid.belongsTo(models.Auction)
      }
    }
  });
  return Bid;
};
