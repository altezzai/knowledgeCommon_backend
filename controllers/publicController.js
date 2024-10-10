// const { CollegeDepartment, Department } = require("../models"); // Make sure the correct path and models are used
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const { Department } = require("../models");
const { CollegeDepartment } = require("../models");

exports.getDepartmentsByCollegeId = async (req, res) => {
  try {
    const { collegeId } = req.params;

    if (!collegeId) {
      return res.status(400).json({ error: "College ID is required" });
    }

    // Fetch the departments related to the college
    const collegeDepartments = await CollegeDepartment.findAll({
      where: { collegeId: collegeId },
      attributes: ["departmentId"], // Only select the departmentId field
    });
    // Check if any departments are found
    if (!collegeDepartments || collegeDepartments.length === 0) {
      return res
        .status(404)
        .json({ message: "No departments found for this college." });
    }

    // Extract the department IDs from the result
    const departmentIds = collegeDepartments.map((cd) => cd.departmentId);
    // Fetch the department names from the Department table using the department IDs
    const departments = await Department.findAll({
      where: {
        department_id: departmentIds, // Fetch departments where departmentId is in the array of departmentIds
      },
      attributes: ["department_id", "department_name", "icon"], // Select the fields you need
    });

    // Check if any departments are found
    if (!departments || departments.length === 0) {
      return res
        .status(404)
        .json({ message: "No departments found with the given IDs." });
    }
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
