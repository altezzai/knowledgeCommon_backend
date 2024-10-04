const path = require("path");
const fs = require("fs");
const { College } = require("../models");
const { Department } = require("../models");
const { University } = require("../models");
const { Submission } = require("../models");
const { Staff } = require("../models");
const { EditorPostfeed } = require("../models");
const { Feedback } = require("../models");

const { Op } = require("sequelize");
// const feedback = require("../models/feedback");

// router.post("/", upload.single("logo"), async (req, res) => {

exports.createCollege = async (req, res) => {
  try {
    const collegeData = {
      ...req.body,
      logo: req.file ? req.file.filename : null,
    };

    const college = await College.create(collegeData);
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getColleges = async (req, res) => {
  try {
    const colleges = await College.findAll();
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
    const { department_name } = req.body;
    const existingDepartment = await Department.findOne({
      where: { department_name },
    });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department name already exists" });
    }
    const departmentdata = {
      ...req.body,
      icon: req.file ? req.file.filename : null,
    };
    const department = await Department.create(departmentdata);
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
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
    const { department_name } = req.body;
    const existingDepartment = await Department.findOne({
      where: { department_name },
    });
    if (existingDepartment) {
      return res.status(400).json({ error: "Department name already exists" });
    }

    const department = await Department.findByPk(req.params.id);
    if (req.file && department.icon) {
      fs.unlinkSync(path.join("uploads/department_icons/", department.icon));
    }
    const updatedDepartmentData = {
      ...req.body,
      icon: req.file ? req.file.filename : department.icon,
    };

    await department.update(updatedDepartmentData);
    res.json(department);
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
    res.status(201).json(university);
  } catch (error) {
    res.status(400).json({ error: "create error" });
  }
};
// Get all universities
exports.getUniversities = async (req, res) => {
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
    if (university.logo) {
      fs.unlinkSync(path.join("uploads/university_logos/", university.logo));
    }
    await university.destroy();
    res.json({ message: "University deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Create a new staff member
exports.createStaff = async (req, res) => {
  try {
    const { email } = req.body;
    const existingemail = await Staff.findOne({
      where: { email },
    });
    if (existingemail) {
      return res.status(400).json({ error: "Email name already exists" });
    }
    const data = {
      ...req.body,
      profile_picture: req.file ? req.file.filename : null,
    };
    const staff = await Staff.create(data);
    res.status(201).json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all staff members
exports.getStaffs = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single staff member by ID
exports.getStaffId = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (staff) {
      res.json(staff);
    } else {
      res.status(404).json({ error: "Staff member not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a staff member
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }
    // Check if email is being updated and is unique
    if (req.body.email && req.body.email !== staff.email) {
      const emailExists = await Staff.findOne({
        where: { email: req.body.email },
      });
      if (emailExists) {
        return res.status(400).json({ error: "Email is already in use" });
      }
    }
    // Delete the old profile picture if a new one is uploaded
    if (req.file && staff.profile_picture) {
      fs.unlinkSync(path.join("uploads/staff_photo/", staff.profile_picture));
    }
    const updatedData = {
      ...req.body,
      profile_picture: req.file ? req.file.filename : staff.profile_picture,
    };
    await staff.update(updatedData);
    res.json(staff);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a staff member
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    // Delete the old profile picture
    if (staff.profile_picture) {
      fs.unlinkSync(path.join("uploads/staff_photo/", staff.profile_picture));
    }
    await staff.destroy();
    res.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Create a new post in editorPostfeed
exports.createEfeed = async (req, res) => {
  try {
    const { submission_id } = req.body;
    const existingsubmission_id = await EditorPostfeed.findOne({
      where: { submission_id },
    });
    if (existingsubmission_id) {
      return res.status(400).json({ error: "submission id already exists" });
    }
    const data = { ...req.body, file: req.file ? req.file.filename : null };
    const post = await EditorPostfeed.create(data);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all posts
exports.getEfeed = async (req, res) => {
  try {
    const posts = await EditorPostfeed.findAll();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single post by ID
exports.getEfeedbyid = async (req, res) => {
  try {
    const post = await EditorPostfeed.findByPk(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a post
exports.updateEfeed = async (req, res) => {
  try {
    const post = await EditorPostfeed.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Delete the old file if a new one is uploaded
    if (req.file && post.file) {
      fs.unlinkSync(path.join("uploads/feed_file/", post.file));
    }

    const updatedData = {
      ...req.body,
      file: req.file ? req.file.filename : post.file,
    };
    await post.update(updatedData);
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a post
exports.deleteEfeed = async (req, res) => {
  try {
    const post = await EditorPostfeed.findByPk(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Delete the file if it exists
    if (post.file) {
      fs.unlinkSync(path.join("uploads/feed_file/", post.file));
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Create a new feedback entry
exports.createfeedback = async (req, res) => {
  console.log(req.body);
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all feedback entries
exports.getfeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll();
    res.json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single feedback entry by ID
exports.getfeedbackid = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (feedback) {
      res.json(feedback);
    } else {
      res.status(404).json({ error: "Feedback not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a feedback entry
exports.updatefeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    await feedback.update(req.body);
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a feedback entry (soft delete)
exports.deletefeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByPk(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }

    feedback.trash = true; // Soft delete
    await feedback.save();
    res.json({ message: "Feedback marked as trashed" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
