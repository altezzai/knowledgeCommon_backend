const express = require("express");
const multer = require("multer");
const path = require("path");
const { Submission } = require("../models");
const fs = require("fs");
const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    if (file.fieldname === "file") {
      folder = "uploads/files/";
    } else if (file.fieldname === "cover_image") {
      folder = "uploads/cover_images/";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
    // console.log(fileName);
  },
});

// Create a single Multer instance for handling multiple file fields
const upload = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    // Accept files for 'file' and 'cover_image' fields only
    if (file.fieldname === "file" || file.fieldname === "cover_image") {
      cb(null, true);
    } else {
      cb(new Error("Unexpected field"), false);
    }
  },
}).fields([
  { name: "file", maxCount: 1 },
  { name: "cover_image", maxCount: 1 },
]);

// Create a new submission
router.post("/", upload, async (req, res) => {
  try {
    // console.log(req.files); // Check uploaded files
    // if (req.files) {
    //   if (req.files.file) {
    //     req.fileName = path.basename(req.files.file[0].path);
    //   }
    //   if (req.files.cover_image) {
    //     req.coverImageName = path.basename(req.files.cover_image[0].path);
    //   }
    // }
    const submissionData = {
      ...req.body,
      file_path: req.files.file ? req.files.file[0].path : null,

      cover_image: req.files.cover_image ? req.files.cover_image[0].path : null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const submission = await Submission.create(submissionData);
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.findAll();
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a submission by ID
router.get("/:id", async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update a submission by ID
router.put("/:id", upload, async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    // Check and delete old files if new ones are uploaded
    if (req.files) {
      if (req.files.file) {
        // Delete old file if exists
        if (submission.file_path) {
          fs.unlinkSync(submission.file_path);
        }
      }
      if (req.files.cover_image) {
        // Delete old cover image if exists
        if (submission.cover_image) {
          fs.unlinkSync(submission.cover_image);
        }
      }
    }
    const updatesubmissionData = {
      ...req.body,
      file_path: req.files.file ? req.files.file[0].path : submission.file_path,

      cover_image: req.files.cover_image
        ? req.files.cover_image[0].path
        : submission.cover_image,

      updated_at: new Date(),
    };

    await submission.update(updatesubmissionData);
    res.json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a submission by ID
router.delete("/:id", async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found" });
    }

    if (submission.file_path) {
      fs.unlinkSync(submission.file_path);
    }
    if (submission.cover_image) {
      fs.unlinkSync(submission.cover_image);
    }
    await submission.destroy();
    res.status(200).json({ message: "Successfully Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
