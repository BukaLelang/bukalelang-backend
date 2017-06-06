'use strict';
module.exports = function(sequelize, DataTypes) {
  var Checkout = sequelize.define('Checkout', {
    auctionId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    addressId: DataTypes.INTEGER,
    finalPrice: DataTypes.INTEGER,
    courierName: DataTypes.STRING,
    courierFee: DataTypes.INTEGER,
    cardId: DataTypes.INTEGER,
    itemIdInCart: DataTypes.INTEGER,
    sent: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Checkout.belongsTo(models.Auction, {foreignKey: 'auctionId'})
        Checkout.belongsTo(models.User, {foreignKey: 'userId'})
      }
    }
  });
  return Checkout;
};
