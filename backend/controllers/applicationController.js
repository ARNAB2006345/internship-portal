const pool = require("../db");

const applicationSelect = `
  SELECT
    id AS "_id",
    student_name AS "studentName",
    student_email AS "studentEmail",
    internship_id AS "internshipId",
    internship_title AS "internshipTitle",
    company_name AS "companyName",
    skills,
    resume,
    internship_skills AS "internshipSkills",
    interview_date AS "interviewDate",
    interview_time AS "interviewTime",
    interview_mode AS "interviewMode",
    status
  FROM applications
`;

const applyInternship = async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      internshipId,
      internshipTitle,
      companyName,
      skills,
      resume,
      internshipSkills,
      status
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO applications
      (
        student_name,
        student_email,
        internship_id,
        internship_title,
        company_name,
        skills,
        resume,
        internship_skills,
        status
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *
      `,
      [
        studentName,
        studentEmail,
        internshipId,
        internshipTitle,
        companyName,
        skills,
        resume,
        internshipSkills,
        status || "Applied"
      ]
    );

    res.json({
      success: true,
      application: result.rows[0]
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const getAllApplications = async (req, res) => {
  try {
    const result = await pool.query(`
      ${applicationSelect}
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

const getApplicants = async (req, res) => {
  try {
    const result = await pool.query(
      `
      ${applicationSelect}
      WHERE LOWER(company_name) = LOWER($1)
      ORDER BY id DESC
      `,
      [req.params.companyName]
    );

    console.log("Applicants:", result.rows);

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

const getStudentApplications = async (req, res) => {
  try {
    const result = await pool.query(
      `
      ${applicationSelect}
      WHERE student_email = $1
      ORDER BY id DESC
      `,
      [req.params.email]
    );

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE applications
      SET status=$1
      WHERE id=$2
      RETURNING
        id AS "_id",
        student_name AS "studentName",
        student_email AS "studentEmail",
        internship_id AS "internshipId",
        internship_title AS "internshipTitle",
        company_name AS "companyName",
        skills,
        resume,
        internship_skills AS "internshipSkills",
        interview_date AS "interviewDate",
        interview_time AS "interviewTime",
        interview_mode AS "interviewMode",
        status
      `,
      [status, req.params.id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message
    });
  }
};

const scheduleInterview = async (req, res) => {
  try {
    const {
      interviewDate,
      interviewTime,
      interviewMode,
      status
    } = req.body;

    const result = await pool.query(
      `
      UPDATE applications
      SET
        interview_date=$1,
        interview_time=$2,
        interview_mode=$3,
        status=$4
      WHERE id=$5
      RETURNING
        id AS "_id",
        student_name AS "studentName",
        student_email AS "studentEmail",
        internship_id AS "internshipId",
        internship_title AS "internshipTitle",
        company_name AS "companyName",
        skills,
        resume,
        internship_skills AS "internshipSkills",
        interview_date AS "interviewDate",
        interview_time AS "interviewTime",
        interview_mode AS "interviewMode",
        status
      `,
      [
        interviewDate,
        interviewTime,
        interviewMode,
        status || "Interview Scheduled",
        req.params.id
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

module.exports = {
  applyInternship,
  getAllApplications,
  getApplicants,
  getStudentApplications,
  updateApplicationStatus,
  scheduleInterview
};