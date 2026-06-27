const express = require("express");
const router = express.Router();

const {
  applyInternship,
  getApplicants,
  getStudentApplications,
  getAllApplications,
  updateApplicationStatus,
  scheduleInterview
} = require("../controllers/applicationController");

router.post("/apply", applyInternship);

router.get("/applications", getAllApplications);

router.get("/applications/:companyName", getApplicants);

router.get("/applications/student/:email", getStudentApplications);

router.put("/applications/:id", updateApplicationStatus);

router.put("/schedule-interview/:id", scheduleInterview);

module.exports = router;