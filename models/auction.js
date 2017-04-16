'use strict';
module.exports = function(sequelize, DataTypes) {
  var Auction = sequelize.define('Auction', {
    title: DataTypes.STRING,
    min_price: DataTypes.INTEGER,
    max_price: DataTypes.INTEGER,
    kelipatan_bid: DataTypes.INTEGER,
    location: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    categoryId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    new:DataTypes.BOOLEAN,
    description:DataTypes.STRING,
    weight:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Auction.hasMany(models.Bid)
        Auction.belongsTo(models.Category, {foreignKey: 'categoryId'})
        Auction.belongsTo(models.User, {foreignKey: 'userId'})
      }
    }
  });
  return Auction;
};
