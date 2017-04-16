'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.renameColumn('Auctions', 'CategoryId','categoryId'),
      queryInterface.renameColumn('Auctions', 'UserId','userId'),
      queryInterface.renameColumn('Bids', 'UserId','userId'),
      queryInterface.renameColumn('Bids', 'AuctionId','auctionId')
    ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Bids','userId'),
      queryInterface.removeColumn('Bids','auctionId'),
      queryInterface.removeColumn('Auctions','categoryId'),
      queryInterface.removeColumn('Auctions','userId')
    ]
  }
};
