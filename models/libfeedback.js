// models/librarianfeedback.js
module.exports = (sequelize, DataTypes) => {
  const Libfeedback = sequelize.define(
    "Libfeedback",
    {
      libfeedback_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      trash: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      modelName: "Libfeedback",
      tableName: "libfeedback",
      timestamps: false, // If you're not using Sequelize's automatic timestamps
    }
  );

  return Libfeedback;
};
