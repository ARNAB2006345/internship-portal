const pool = require("../db");

const registerCompany = async (req, res) => {
  try {
    const {
      companyName,
      email,
      password,
      industry,
      location
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO companies
      (company_name, email, password, industry, location)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [companyName, email, password, industry, location]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM companies
      WHERE email=$1 AND password=$2
      `,
      [email, password]
    );

    if (result.rows.length > 0) {
      res.json({
        success: true,
        company: result.rows[0]
      });
    } else {
      res.json({
        success: false
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM companies"
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

module.exports = {
  registerCompany,
  loginCompany,
  getCompanies
};