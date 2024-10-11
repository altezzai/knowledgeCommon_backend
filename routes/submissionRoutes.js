const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const submissionController = require("../controllers/submissionController");
const adminController = require("../controllers/adminController");

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
router.post("/content/", upload, submissionController.createSubmission);
router.get("/content/", submissionController.getSubmissions);
router.get("/content/:id", submissionController.getSubmissionById);
router.put("/content/:id", upload, submissionController.updateSubmissionById);
router.delete("/content/:id", submissionController.deleteSubmissionById);

// router.get("/get/searchResult/", submissionController.searchSubmissions);
router.post("/search/", submissionController.search);

//manage librarian add feedback
router.post("/libfeedback/", submissionController.createlibfeedback);
router.get("/libfeedback/", submissionController.getlibfeedbacks);
router.get("/libfeedback/:id", submissionController.getlibfeedbackid);
router.put("/libfeedback/:id", submissionController.updatelibfeedback);
router.delete("/libfeedback/:id", submissionController.deletelibfeedback);
//submission accept or reject functions
router.patch("/:id/approve/", submissionController.submissionsApprove);
router.patch("/:id/reject/", submissionController.submissionsReject);

module.exports = router;
