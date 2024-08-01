"use strict";
module.exports = (sequelize, DataTypes) => {
  const College = sequelize.define(
    "College",
    {
      college_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      university_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      college_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      principal: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      librarian_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      librarian_email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      number_of_departments: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number_of_faculties: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      number_of_students: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      established_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      logo: {
        type: DataTypes.STRING,
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
      trash: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "College",
      tableName: "colleges",
      timestamps: false,
    }
  );
  return College;
};
