const path = require("path");
const fs = require("fs");
const { Submission } = require("../models");

exports.createSubmission = async (req, res) => {
  try {
    const submissionData = {
      ...req.body,
      file_path: req.files.file ? req.files.file[0].filename : null,
      cover_image: req.files.cover_image
        ? req.files.cover_image[0].filename
        : null,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const submission = await Submission.create(submissionData);
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const submissions = await Submission.findAll({
      offset,
      limit,
      order: [["created_at", "DESC"]],
      // include: User,
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    if (req.files.file && submission.file_path) {
      fs.unlinkSync(path.join("uploads/files/", submission.file_path));
    }
    if (req.files.cover_image && submission.cover_image) {
      fs.unlinkSync(path.join("uploads/cover_images/", submission.cover_image));
    }

    const updatedData = {
      ...req.body,
      file_path: req.files.file
        ? req.files.file[0].filename
        : submission.file_path,
      cover_image: req.files.cover_image
        ? req.files.cover_image[0].filename
        : submission.cover_image,
      updated_at: new Date(),
    };

    await submission.update(updatedData);
    res.status(200).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    await submission.destroy();
    res.status(200).send("Successfully Deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
