"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("universities", {
      university_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      established_year: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM("Public", "Private", "Others"),
        allowNull: false,
      },
      contact_phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contact_website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      number_of_students: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      number_of_faculties: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      affiliations: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ranking: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      courses_offered: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      campus_size: {
        type: Sequelize.STRING,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("universities");
  },
};
