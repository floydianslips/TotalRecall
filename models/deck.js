'use strict';
module.exports = (sequelize, DataTypes) => {
  var deck = sequelize.define('deck', {
    name: DataTypes.STRING
  }, {});
  deck.associate = function(models) {
    // associations can be defined here
  };
  return deck;
};