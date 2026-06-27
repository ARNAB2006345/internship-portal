const express = require("express");

const router = express.Router();

const {
  registerStudent,
  loginStudent,
  getStudents
} = require("../controllers/studentController");

router.post("/students", registerStudent);

router.post("/student-login", loginStudent);

router.get("/students", getStudents);

module.exports = router;