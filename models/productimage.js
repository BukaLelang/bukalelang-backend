'use strict';
module.exports = function(sequelize, DataTypes) {
  var ProductImage = sequelize.define('ProductImage', {
    imageUrl: DataTypes.STRING,
    smallImageUrl: DataTypes.STRING,
    auctionId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        ProductImage.belongsTo(models.Auction, {foreignKey: 'auctionId'})
      }
    }
  });
  return ProductImage;
};
