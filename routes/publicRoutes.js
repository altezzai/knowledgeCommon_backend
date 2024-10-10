const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController"); // Adjust the path accordingly

// Route to get departments by college ID
router.get(
  "/college/:collegeId/departments/",
  publicController.getDepartmentsByCollegeId
);

module.exports = router;
