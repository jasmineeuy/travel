"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Trips", {
      id: {
        allowNull: false,
        autoIncrement: true,
        //primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false,
        unique: true,
      },
      location: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false,
      },
      from: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false,
      },
      to: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false,
      },
      group: {
        type: Sequelize.STRING,
        require: true,
        allowNull: false,
      },
      cost: {
        type: Sequelize.DECIMAL,
        require: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Trips");
  },
};
