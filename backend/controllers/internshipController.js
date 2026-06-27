const pool = require("../db");

const postInternship = async (req, res) => {
  try {
    const {
      title,
      companyName,
      skills,
      location,
      stipend,
      duration,
      openings
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO internships
      (title, company_name, skills, location, stipend, duration, openings)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [
        title,
        companyName,
        skills,
        location,
        stipend,
        duration,
        openings
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

const getInternships = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id AS "_id",
        title,
        company_name AS "companyName",
        skills,
        location,
        stipend,
        duration,
        openings
      FROM internships
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  postInternship,
  getInternships
};