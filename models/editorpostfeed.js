module.exports = (sequelize, DataTypes) => {
  const EditorPostfeed = sequelize.define(
    "EditorPostfeed",
    {
      editer_feed_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assigned_sciencecommunicater: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assigned_reviewer: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Reviewed", "Approved", "Rejected"),
        defaultValue: "Pending",
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      file: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mentionIds: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      hashTags: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      communityIds: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      trash: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "EditorPostFeed",
      tableName: "editorPostfeed",
      timestamps: true,
    }
  );

  return EditorPostfeed;
};
