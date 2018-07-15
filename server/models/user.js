'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
      unique: true,
    },
    password: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: user => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  });

  user.associate = models => {
    models.user.hasMany(models.score);
  };

  user.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  return user;
};
