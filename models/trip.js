"use strict";
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define(
    "Trip",
    {
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },

      name: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        unique: true,
      },
      location: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
      from: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
      group: {
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
      },
      cost: {
        type: DataTypes.DECIMAL,
        require: true,
        allowNull: false,
      },
    },
    {}
  );
  Trip.associate = function (models) {
    // associations can be defined here
    Trip.belongsTo(models.User, { foreignKey: "userId", targetKey: "id" });
  };
  return Trip;
};
