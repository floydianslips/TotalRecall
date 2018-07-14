'use strict';
module.exports = (sequelize, DataTypes) => {
  const score = sequelize.define('score', {
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER,
  }, {});
  score.associate = models => {
    // associations can be defined here
    models.score.belongsTo(models.user);
    models.score.belongsTo(models.deck);
  };
  return score;
};
