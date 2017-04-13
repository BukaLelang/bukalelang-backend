'use strict';
module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    bl_categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Category.hasMany(models.Auction)
      }
    }
  });
  return Category;
};
