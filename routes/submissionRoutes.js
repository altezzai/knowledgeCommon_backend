const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const submissionController = require("../controllers/submissionController");

// Define storage for file uploads
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "file") {
      cb(null, "uploads/files/");
    } else if (file.fieldname === "cover_image") {
      cb(null, "uploads/cover_images/");
    }
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Create a single Multer instance for handling multiple file fields
const upload = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
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

// Routes
router.post("/", upload, submissionController.createSubmission);
router.get("/", submissionController.getSubmissions);
router.get("/:id", submissionController.getSubmissionById);
router.put("/:id", upload, submissionController.updateSubmissionById);
router.delete("/:id", submissionController.deleteSubmissionById);

module.exports = router;
