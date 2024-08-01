"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Submissions", "cover_image", {
      type: Sequelize.STRING, // Adjust type and length as needed
      allowNull: true, // or false, depending on your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Submissions", "cover_image");
  },
};
