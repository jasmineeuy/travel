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
      "Users",
      [
        {
          name: "John Doe",
          email: "john@gmail.com",
          password: "JO@123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jo",
          email: "jo@gmail.com",
          password: "JO@123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ab",
          email: "Ab@gmail.com",
          password: "Ab@123",
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
    return queryInterface.bulkDelete("Users", null, {});
  },
};
