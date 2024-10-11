const express = require("express");
const router = express.Router();
const publicController = require("../controllers/publicController"); // Adjust the path accordingly

// Route to get departments by college ID
router.get(
  "/searchcollege/:collegeId/departments/",
  publicController.getDepartmentsByCollegeId
);
router.get(
  "/college/:collegeId/searchDepartments/",
  publicController.searchDepartmentsByCollegeId
);
router.get(
  "/university/:univId/departments/",
  publicController.getDepartmentsByUniversityId
);
router.get("/searchDepartments/", publicController.searchDepartment);
router.get(
  "/university/:univId/searchDepartments/",
  publicController.searchDepartmentsByUniversityId
);

module.exports = router;
