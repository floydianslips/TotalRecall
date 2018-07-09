'use strict';
module.exports = (sequelize, DataTypes) => {
  var score = sequelize.define('score', {
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {});
  score.associate = function(models) {
    // associations can be defined here
  };
  return score;
};