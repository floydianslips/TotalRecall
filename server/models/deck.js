'use strict';
module.exports = (sequelize, DataTypes) => {
  const deck = sequelize.define('deck', {
    name: DataTypes.STRING,
  }, {});
  deck.associate = models => {
    // associations can be defined here
    models.deck.hasMany(models.score);
  };
  return deck;
};
