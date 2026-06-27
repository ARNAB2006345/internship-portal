const express = require("express");

const router = express.Router();

const {
  registerCompany,
  loginCompany,
  getCompanies
} = require("../controllers/companyController");

router.post("/companies", registerCompany);

router.post("/company-login", loginCompany);

router.get("/companies", getCompanies);

module.exports = router;