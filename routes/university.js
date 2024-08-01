const express = require("express");
const router = express.Router();
const { University } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/university_logos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Create a new university
router.post("/", upload.single("logo"), async (req, res) => {
  //   try {
  //     const university = await University.create(req.body);
  //     res.status(201).json(university);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // });
  try {
    const universityData = {
      ...req.body,
      logo: req.file ? req.file.path : null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const university = await University.create(universityData);
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get all universities
router.get("/", async (req, res) => {
  try {
    const universities = await University.findAll();
    res.json(universities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single university by ID
router.get("/:id", async (req, res) => {
  try {
    const university = await models.University.findByPk(req.params.id);
    if (university) {
      res.json(university);
    } else {
      res.status(404).json({ error: "University not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a university
// router.put("/:id", async (req, res) => {
//   try {
//     const university = await University.findByPk(req.params.id);
//     if (!university) {
//       return res.status(404).json({ error: "University not found" });
//     }
router.put("/:id", upload.single("logo"), async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id);
    if (!university) {
      return res.status(404).json({ error: "College not found" });
    }

    // If a new logo is uploaded, delete the old one
    if (req.file && university.logo) {
      fs.unlinkSync(university.logo);
    }

    const updatedUniversityData = {
      ...req.body,
      logo: req.file ? req.file.path : university.logo,
      updated_at: new Date(),
    };

    await university.update(updatedUniversityData);
    res.json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a university
router.delete("/:id", async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id);
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }
    await university.destroy();
    res.json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
