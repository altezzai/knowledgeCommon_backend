const express = require("express");
const router = express.Router();
const { Department } = require("../models");

// Create a new department
router.post("/", async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all departments
router.get("/", async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single department by ID
router.get("/:id", async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (department) {
      res.status(200).json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a department by ID
router.put("/:id", async (req, res) => {
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
});

// Delete a department by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Department.destroy({
      where: { department_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
