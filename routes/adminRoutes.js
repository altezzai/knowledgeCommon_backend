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

const unistorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/university_logos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const uniupload = multer({ storage: unistorage });

router.post("/", upload.single("logo"), adminController.createCollege);
router.get("/", adminController.getColleges);
router.get("/:id", adminController.getCollegeId);
router.put("/:id", upload.single("logo"), adminController.updateCollegeById);
router.delete("/:id", adminController.deleteCollegeById);

//Department
router.post("/createDepartment/", adminController.createDepartment);
router.get("/getAll/Departments/", adminController.getDepartments);
router.get("/getDepartmentId/:id", adminController.getDepartmentId);
router.put("/updateDepartmentById/:id", adminController.updateDepartmentById);
router.delete(
  "/deleteDepartmentById/:id",
  adminController.deleteDepartmentById
);
//search
// router.post("/search/", adminController.search);
//university
router.post(
  "/createUniversity/",
  uniupload.single("logo"),
  adminController.createUniversity
);
router.get("/getAll/Universitys/", adminController.getUniversitys);
router.get("/getUniversityId/:id", adminController.getUniversityId);
router.put(
  "/updateUniversityById/:id",
  uniupload.single("logo"),
  adminController.updateUniversityById
);
router.delete(
  "/deleteUniversityById/:id",
  adminController.deleteUniversityById
);

module.exports = router;
