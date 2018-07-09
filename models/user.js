'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
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
    // associations can be defined here
    models.user.hasMany(models.score);
  };

  // todo: lookup v4 instanceMethod. They changed the way it is done.
  // user.instanceMethods = {
  //   validPassword: password => {
  //     return bcrypt.compareSync(password, this.password);
  //   },
  // };

  return user;
};
