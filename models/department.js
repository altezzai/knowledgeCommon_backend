"use strict";

module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define(
    "Department",
    {
      department_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      university_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      department_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "departments",
      timestamps: false, // If your table has timestamps columns, set this to true and remove last_updated from the model
    }
  );
  Department.associate = (models) => {
    Department.belongsToMany(models.College, {
      through: "CollegeDepartment",
      foreignKey: "departmentId",
      otherKey: "collegeId",
    });
  };
  return Department;
};
