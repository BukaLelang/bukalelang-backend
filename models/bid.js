'use strict';
module.exports = function(sequelize, DataTypes) {
  var Bid = sequelize.define('Bid', {
    userId: DataTypes.INTEGER,
    auctionId: DataTypes.INTEGER,
    current_bid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Bid.belongsTo(models.User, {foreignKey: 'userId'})
        Bid.belongsTo(models.Auction, {foreignKey: 'auctionId'})
      }
    }
  });
  return Bid;
};
