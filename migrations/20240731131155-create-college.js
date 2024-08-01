"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Colleges", {
      college_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      university_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      college_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      principal: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      librarian_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      librarian_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number_of_departments: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      number_of_faculties: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      number_of_students: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      established_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      trash: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Colleges");
  },
};
