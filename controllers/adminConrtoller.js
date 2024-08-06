const path = require("path");
const fs = require("fs");
const { College } = require("../models");
const { Department } = require("../models");
const { University } = require("../models");
const { CollegeDepartment } = require("../models");
const { UniversityDepartment } = require("../models");
// const universityDepartment} = require("../models/universityDepartment");

// router.post("/", upload.single("logo"), async (req, res) => {
exports.createCollege = async (req, res) => {
  try {
    const collegeData = {
      ...req.body,
      logo: req.file ? req.file.filename : null,
    };
    const number_of_departments = {
      ...req.body,
      number_of_departments: req.number_of_departments,
    };

    // console.log(collegeData.departmentIds);
    const college = await College.create(collegeData);
    if (collegeData.departmentIds && collegeData.departmentIds.length > 0) {
      await CollegeDepartment.bulkCreate(
        collegeData.departmentIds.map((department_id) => ({
          collegeId: college.college_id, // assuming 'id' is the primary key field of College
          departmentId: department_id,
        }))
      );
    }

    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getColleges = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const colleges = await College.findAll({
      offset,
      limit,
      order: [["created_at", "DESC"]],
      // include: User,
    });
    res.json(colleges);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single college by ID
// router.get("/:id", async (req, res) => {
exports.getCollegeId = async (req, res) => {
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
};

// Update a college with logo upload
// router.put("/:id", upload.single("logo"), async (req, res) => {
exports.updateCollegeById = async (req, res) => {
  try {
    const college = await College.findByPk(req.params.id);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    // If a new logo is uploaded, delete the old one
    if (req.file && college.logo) {
      fs.unlinkSync(path.join("uploads/college_logos/", college.logo));
    }

    const updatedCollegeData = {
      ...req.body,
      logo: req.file ? req.file.filename : college.logo,
    };
    if (
      updatedCollegeData.departmentIds &&
      updatedCollegeData.departmentIds.length > 0
    ) {
      await CollegeDepartment.bulkCreate(
        updatedCollegeData.departmentIds.map((department_id) => ({
          collegeId: college.college_id, // assuming 'id' is the primary key field of College
          departmentId: department_id,
        }))
      );
    }
    await college.update(updatedCollegeData);
    res.json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a college
// router.delete("/:id", async (req, res) => {
exports.deleteCollegeById = async (req, res) => {
  try {
    const college = await College.findByPk(req.params.id);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    // Delete the logo if it exists
    if (college.logo) {
      fs.unlinkSync(path.join("uploads/college_logos/", college.logo));
    }

    await college.destroy();
    res.json({ message: "College Successfully Deleted " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new department
// router.post("/", async (req, res) => {
exports.createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    const addDepartmentUniversity = {
      universityId: department.university_id,
      departmentId: department.department_id,
    };
    // console.log(req.body.university_id);
    await UniversityDepartment.create(addDepartmentUniversity);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const departments = await Department.findAll({
      offset,
      limit,
      order: [["created_at", "DESC"]],
      // include: User,
    });
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single department by ID
// router.get("/:id", async (req, res) => {
exports.getDepartmentId = async (req, res) => {
  try {
    const department = await Department.findByPk();
    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a department by ID
// router.put("/:id", async (req, res) => {
exports.updateDepartmentById = async (req, res) => {
  try {
    const [updated] = await Department.update(req.body, {
      where: { department_id: req.params.id },
    });
    if (updated) {
      const updatedDepartment = await Department.findByPk(req.params.id);
      res.status(200).json(updatedDepartment);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a department by ID
// router.delete("/:id", async (req, res) => {
exports.deleteDepartmentById = async (req, res) => {
  try {
    const deleted = await Department.destroy({
      where: { department_id: req.params.id },
    });
    if (deleted) {
      res.status(200).send({ message: "Department Successfully Deleted" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Create a new university

exports.createUniversity = async (req, res) => {
  try {
    const universityData = {
      ...req.body,
      logo: req.file ? req.file.filename : null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const university = await University.create(universityData);
    if (
      universityData.departmentIds &&
      universityData.departmentIds.length > 0
    ) {
      await UniversityDepartment.bulkCreate(
        universityData.departmentIds.map((department_id) => ({
          universityId: university.university_id, // assuming 'id' is the primary key field of College
          departmentId: department_id,
        }))
      );
    }
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ error: "create error" });
  }
};
// Get all universities
exports.getUniversitys = async (req, res) => {
  try {
    const universities = await University.findAll();
    res.json(universities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single university by ID
exports.getUniversityId = async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id);
    if (university) {
      res.json(university);
    } else {
      res.status(404).json({ error: "University not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a university
exports.updateUniversityById = async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id);
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }

    // If a new logo is uploaded, delete the old one
    if (req.file && university.logo) {
      fs.unlinkSync(path.join("uploads/university_logos/", university.logo));
    }

    const updatedUniversityData = {
      ...req.body,
      logo: req.file ? req.file.filename : university.logo,
      updated_at: new Date(),
    };
    if (
      updatedUniversityData.departmentIds &&
      updatedUniversityData.departmentIds.length > 0
    ) {
      await UniversityDepartment.bulkCreate(
        updatedUniversityData.departmentIds.map((department_id) => ({
          universityId: university.university_id, // assuming 'id' is the primary key field of College
          departmentId: department_id,
        }))
      );
    }

    await university.update(updatedUniversityData);
    res.json(university);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a university
//   router.delete("/:id", async (req, res) => {
exports.deleteUniversityById = async (req, res) => {
  try {
    const university = await University.findByPk(req.params.id);
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }
    if (req.file && university.logo) {
      fs.unlinkSync(path.join("uploads/university_logos/", university.logo));
    }
    await university.destroy();
    res.json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
