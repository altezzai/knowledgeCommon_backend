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
          model: "universities",
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
    await queryInterface.addConstraint("universityDepartments", {
      fields: ["universityId", "departmentId"],
      name: "unique_universityDepartments",
      type: "unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      "universityDepartments",
      "unique_universityDepartments"
    );
    await queryInterface.dropTable("universityDepartments");
  },
};
