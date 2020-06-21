"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
    },
    {}
  );
  User.associate = function (models) {
    User.hasMany(models.Trip, { foreignKey: "userId", sourceKey: "id" });
    // associations can be defined here
  };
  return User;
};
