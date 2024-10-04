const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const adminController = require("../controllers/adminController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/college_logos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const depstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/department_icons/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const depUpload = multer({ storage: depstorage });

const unistorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/university_logos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uniupload = multer({ storage: unistorage });

const stfstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/staff_photo/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const stfupload = multer({ storage: stfstorage });

const efstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/feed_file/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const efupload = multer({ storage: efstorage });
//Manage college
router.post(
  "/createCollege/",
  upload.single("logo"),
  adminController.createCollege
);
router.get("/getColleges/", adminController.getColleges);
router.get("/getCollege/:id", adminController.getCollegeId);
router.put(
  "/updateCollege/:id",
  upload.single("logo"),
  adminController.updateCollegeById
);
router.delete("/deleteCollege/:id", adminController.deleteCollegeById);

// Manage Department
router.post(
  "/createDepartment/",
  depUpload.single("icon"),
  adminController.createDepartment
);
router.get("/getDepartments/", adminController.getDepartments);
router.get("/getDepartment/:id", adminController.getDepartmentId);
router.put(
  "/updateDepartment/:id",
  depUpload.single("icon"),
  adminController.updateDepartmentById
);
router.delete("/deleteDepartment/:id", adminController.deleteDepartmentById);
//search
// router.post("/search/", adminController.search);

//Manage university
router.post(
  "/createUniversity/",
  uniupload.single("logo"),
  adminController.createUniversity
);
router.get("/getUniversities/", adminController.getUniversities);
router.get("/getUniversity/:id", adminController.getUniversityId);
router.put(
  "/updateUniversity/:id",
  uniupload.single("logo"),
  adminController.updateUniversityById
);
router.delete("/deleteUniversity/:id", adminController.deleteUniversityById);

//manage Staff
router.post(
  "/createStaff/",
  stfupload.single("profile_picture"),
  adminController.createStaff
);

router.get("/getStaffs/", adminController.getStaffs);
router.get("/getStaffId/:id", adminController.getStaffId);
router.put(
  "/updateStaff/:id",
  stfupload.single("profile_picture"),
  adminController.updateStaff
);
router.delete("/deleteStaff/:id", adminController.deleteStaff);

//manage EditorPostFeed
router.post(
  "/editorPostfeed/",
  efupload.single("file"),
  adminController.createEfeed
);

router.get("/editorPostfeed/", adminController.getEfeed);
router.get("/editorPostfeed/:id", adminController.getEfeedbyid);
router.put(
  "/editorPostfeed/:id",
  efupload.single("file"),
  adminController.updateEfeed
);
router.delete("/editorPostfeed/:id", adminController.deleteEfeed);

//manage Feedback from Editorial bord
router.post("/feedback/", adminController.createfeedback);
// // Get all feedback
router.get("/feedback/", adminController.getfeedbacks);
// Get feedback by ID
router.get("/feedback/:id", adminController.getfeedbackid);
// Update feedback
router.put("/feedback/:id", adminController.updatefeedback);
// Delete feedback
router.delete("/feedback/:id", adminController.deletefeedback);

module.exports = router;
