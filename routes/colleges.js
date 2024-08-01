const express = require("express");
const router = express.Router();
const { College } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/college_logos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new college with logo upload
router.post("/", upload.single("logo"), async (req, res) => {
  try {
    const collegeData = {
      ...req.body,
      logo: req.file ? req.file.path : null,
    };
    // try {
    //   req.fileName = path.basename(req.file.path);
    //   const collegeData = {
    //     ...req.body,
    //     logo: req.fileName || null,
    //   };
    const college = await College.create(collegeData);
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.findAll();
    res.json(colleges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single college by ID
router.get("/:id", async (req, res) => {
  try {
    const college = await College.findByPk(req.params.id);
    if (college) {
      res.json(college);
    } else {
      res.status(404).json({ error: "College not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a college with logo upload
router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const college = await College.findByPk(req.params.id);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    // If a new logo is uploaded, delete the old one
    if (req.file && college.logo) {
      fs.unlinkSync(college.logo);
    }

    const updatedCollegeData = {
      ...req.body,
      logo: req.file ? req.file.path : college.logo,
    };

    await college.update(updatedCollegeData);
    res.json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a college
router.delete("/:id", async (req, res) => {
  try {
    const college = await College.findByPk(req.params.id);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    // Delete the logo if it exists
    if (college.logo) {
      fs.unlinkSync(college.logo);
    }

    await college.destroy();
    res.json({ message: "College deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
