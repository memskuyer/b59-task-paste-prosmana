"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    var profiles = [];
    for (let i = 0; i < 10; i++) {
      profiles.push({
        title: `title${i}`,
        content: `Dev${i}`,
        image: `facebook.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("Blogs", profiles);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Blogs", null, {});
  },
};
