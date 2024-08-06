"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("universityDepartments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      universityId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Universitys",
          key: "university_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      departmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Departments",
          key: "department_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("collegeDepartments");
  },
};
