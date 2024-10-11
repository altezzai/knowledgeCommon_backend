// const { CollegeDepartment, Department } = require("../models"); // Make sure the correct path and models are used
const path = require("path");
const fs = require("fs");
const { Op } = require("sequelize");
const { Department } = require("../models");
const { CollegeDepartment } = require("../models");
const { UniversityDepartment } = require("../models");

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
exports.searchDepartmentsByCollegeId = async (req, res) => {
  try {
    const { collegeId } = req.params;

    if (!collegeId) {
      return res.status(400).json({ error: "College ID is required" });
    }
    const searchQuery = req.body.q;
    console.log(searchQuery);
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
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
        department_name: {
          [Op.like]: `%${searchQuery}%`,
        },
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
exports.searchDepartment = async (req, res) => {
  try {
    const searchQuery = req.body.q;
    console.log(searchQuery);
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const dept = await Department.findAll({
      where: {
        department_name: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
      attributes: ["department_id", "department_name", "icon"],
    });

    res.status(200).json(dept);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getDepartmentsByUniversityId = async (req, res) => {
  try {
    const { univId } = req.params;

    if (!univId) {
      return res.status(400).json({ error: "University ID is required" });
    }

    // Fetch the departments related to the college
    const universityDepartment = await UniversityDepartment.findAll({
      where: { universityId: univId },
      attributes: ["departmentId"], // Only select the departmentId field
    });
    // Check if any departments are found
    if (!universityDepartment || universityDepartment.length === 0) {
      return res
        .status(404)
        .json({ message: "No departments found for this university." });
    }

    // Extract the department IDs from the result
    const departmentIds = universityDepartment.map((cd) => cd.departmentId);
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
exports.searchDepartmentsByUniversityId = async (req, res) => {
  try {
    const { univId } = req.params;

    if (!univId) {
      return res.status(400).json({ error: "University ID is required" });
    }
    const searchQuery = req.body.q;
    console.log(searchQuery);
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }
    // Fetch the departments related to the college
    const universityDepartment = await UniversityDepartment.findAll({
      where: { universityId: univId },
      attributes: ["departmentId"], // Only select the departmentId field
    });
    // Check if any departments are found
    if (!universityDepartment || universityDepartment.length === 0) {
      return res
        .status(404)
        .json({ message: "No departments found for this university." });
    }

    // Extract the department IDs from the result
    const departmentIds = universityDepartment.map((cd) => cd.departmentId);
    // Fetch the department names from the Department table using the department IDs
    const departments = await Department.findAll({
      where: {
        department_id: departmentIds,
        department_name: {
          [Op.like]: `%${searchQuery}%`,
        },
        // Fetch departments where departmentId is in the array of departmentIds
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
