module.exports = (sequelize, DataTypes) => {
  const UniversityDepartment = sequelize.define("UniversityDepartment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    universityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Universities",
        key: "university_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Departments",
        key: "department_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return UniversityDepartment;
};
