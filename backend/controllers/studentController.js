const pool = require("../db");

// Register Student
const registerStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      college,
      cgpa,
      skills,
      resume
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO students
      (name,email,password,college,cgpa,skills,resume)
      VALUES($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        name,
        email,
        password,
        college,
        cgpa,
        skills,
        resume
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

// Student Login
const loginStudent = async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await pool.query(
      `
      SELECT *
      FROM students
      WHERE email=$1
      AND password=$2
      `,
      [email, password]
    );

    if(result.rows.length>0){

      res.json({
        success:true,
        student:result.rows[0]
      });

    }else{

      res.json({
        success:false
      });

    }

  } catch(err){

    console.log(err);

    res.status(500).json({
      message:err.message
    });

  }

};

// Get Students
const getStudents = async(req,res)=>{

  try{

    const result =
      await pool.query(
        "SELECT * FROM students"
      );

    res.json(result.rows);

  }catch(err){

    console.log(err);

    res.status(500).json(err);

  }

};

module.exports = {
  registerStudent,
  loginStudent,
  getStudents
};