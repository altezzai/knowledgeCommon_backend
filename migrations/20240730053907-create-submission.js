"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Submissions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      submission_type: {
        type: Sequelize.ENUM(
          "Article",
          "Book",
          "Thesis",
          "Dissertation",
          "Conference Proceedings",
          "Presentation",
          "Question Paper",
          "Other"
        ),
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authors: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      abstract: {
        type: Sequelize.TEXT,
      },
      keywords: {
        type: Sequelize.TEXT,
      },
      upload_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      journal_name: {
        type: Sequelize.STRING,
      },
      volume_issue_number: {
        type: Sequelize.STRING,
      },
      publication_date: {
        type: Sequelize.DATE,
      },
      doi: {
        type: Sequelize.STRING,
      },
      publisher: {
        type: Sequelize.STRING,
      },
      book_publication_date: {
        type: Sequelize.DATE,
      },
      isbn: {
        type: Sequelize.STRING,
      },
      edition: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      chapters: {
        type: Sequelize.TEXT,
      },
      degree: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.STRING,
      },
      institution: {
        type: Sequelize.STRING,
      },
      advisors: {
        type: Sequelize.TEXT,
      },
      defense_date: {
        type: Sequelize.DATE,
      },
      conference_name: {
        type: Sequelize.STRING,
      },
      conference_date: {
        type: Sequelize.DATE,
      },
      conference_location: {
        type: Sequelize.STRING,
      },
      pages: {
        type: Sequelize.STRING,
      },
      presentation_type: {
        type: Sequelize.STRING,
      },
      event_name: {
        type: Sequelize.STRING,
      },
      event_date: {
        type: Sequelize.DATE,
      },
      question_paper_type: {
        type: Sequelize.STRING,
      },
      academic_year: {
        type: Sequelize.STRING,
      },
      course_name: {
        type: Sequelize.STRING,
      },
      semester: {
        type: Sequelize.STRING,
      },
      section: {
        type: Sequelize.STRING,
      },
      subject: {
        type: Sequelize.STRING,
      },
      exam_date: {
        type: Sequelize.DATE,
      },
      file_path: {
        type: Sequelize.STRING,
      },
      cover_image: {
        type: Sequelize.STRING,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.STRING,
      },
      views: {
        type: Sequelize.INTEGER,
      },
      downloads: {
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
      },
      url: {
        type: Sequelize.STRING,
      },
      reviewer_name: {
        type: Sequelize.STRING,
      },
      trash: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Submissions");
  },
};
