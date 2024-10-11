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
router.get("/contentsearch/", publicController.contentsearch);
router.get(
  "/getcontent/university/:univId/department/:deptId",
  publicController.getcontentUniversityIdDepartementId
);
router.get(
  "/getcontent/university/:univId/college/:clgId/department/:deptId",
  publicController.getcontentUniversityIdCollegeIdDepartementId
);
router.get(
  "/university/:univId/colleges",
  publicController.getCollegesByUniversityId
);
module.exports = router;
