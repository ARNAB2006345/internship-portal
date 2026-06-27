const express = require("express");

const router = express.Router();

const {
  postInternship,
  getInternships
} = require("../controllers/internshipController");

router.post("/internships", postInternship);

router.get("/internships", getInternships);

module.exports = router;