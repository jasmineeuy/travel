"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Trips",
      [
        {
          userId: 1,
          name: "ParisTrip!",
          location: "Paris,France",
          from: "1/10/2020",
          to: "1/20/2020",
          group: "10",
          cost: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          name: "NewYork!",
          location: "New York,Usa",
          from: "3/20/20",
          to: "3/30/20",
          group: "10",
          cost: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          name: "Mexico!",
          location: "Mexico,Mexico",
          from: "9/10/19",
          to: "9/21/19",
          group: "10",
          cost: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});

    */
    return queryInterface.bulkDelete("Trips", null, {});
  },
};
