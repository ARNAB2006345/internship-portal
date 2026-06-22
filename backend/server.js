const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/internDB");

const Intern = mongoose.model("Intern", {
  name: String,
  email: String,
  role: String,
  department: String,
  joiningDate: String,
  status: String,
  photo: String
  
});
const Student = mongoose.model(
  "Student",
  {
    name: String,
    email: String,
    password: String,
    college: String,
    cgpa: String,
    skills: String,
    resume: String
  }
);
const Company = mongoose.model(
  "Company",
  {
    companyName: String,
    email: String,
    password: String,
    industry: String,
    location: String
  }
);
const Internship = mongoose.model("Internship", {
  title: String,
  companyName: String,
  skills: String,
  location: String,
  stipend: String,
  duration: String,
  openings: Number
});
const Application = mongoose.model(
  "Application",
  {
    studentName: String,
    studentEmail: String,

    internshipId: String,
    internshipTitle: String,
    companyName: String,

    skills: String,
    resume: String,
    internshipSkills: String,

    interviewDate: String,
    interviewTime: String,
    interviewMode: String,
    
    status: String,
    offerLetter: String
  }
);

// CREATE
app.post("/interns", async (req, res) => {
  const intern = await Intern.create(req.body);
  res.json(intern);
});

app.post("/students", async (req, res) => {

  try {

    const student = await Student.create(req.body);

    res.json(student);

  } catch (error) {

    res.status(500).json(error);

  }

});
app.post("/companies", async (req, res) => {

  try {

    const company = await Company.create(req.body);

    res.json(company);

  } catch (error) {

    res.status(500).json(error);

  }

});
app.post("/internships", async (req, res) => {

  try {

    const internship = await Internship.create(req.body);

    res.json(internship);

  } catch (error) {

    res.status(500).json(error);

  }

});

app.post("/student-login", async (req,res)=>{

  const { email, password } = req.body;

  const student = await Student.findOne({
    email,
    password
  });

  if(student){

    res.json({
      success:true,
      student
    });

  }else{

    res.json({
      success:false
    });

  }

});
app.post(
  "/company-login",
  async (req, res) => {

    const company =
      await Company.findOne({
        email: req.body.email,
        password: req.body.password
      });

    if (company) {

      res.json({
        success: true,
        company
      });

    } else {

      res.json({
        success: false
      });

    }

  }
);
app.post("/apply", async (req, res) => {

  console.log("Application Received");
  console.log(req.body);

  try {

    const application =
      new Application(req.body);

    const savedApplication =
      await application.save();

    console.log(
      "Saved:",
      savedApplication
    );

    res.json({
      success: true,
      application: savedApplication
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

// READ
app.get("/interns", async (req, res) => {
  const interns = await Intern.find();
  res.json(interns);
});
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});
app.get("/companies", async (req, res) => {

  const companies = await Company.find();

  res.json(companies);

});
app.get("/internships", async (req, res) => {

  const internships = await Internship.find();

  res.json(internships);

});
app.get("/applications", async (req, res) => {

  const applications = await Application.find();

  res.json(applications);

});

app.get("/applications/:companyName", async (req, res) => {

  const applications = await Application.find({
    companyName: {
      $regex: new RegExp(
        "^" + req.params.companyName + "$",
        "i"
      )
    }
  });

  res.json(applications);

});
app.get(
  "/student-applications/:email",
  async (req, res) => {

    try {

      const applications =
        await Application.find({
          studentEmail:
            req.params.email
        });

      res.json(applications);

    } catch (error) {

      res.status(500).json(error);

    }

  }
);
app.get(
  "/applications/student/:email",
  async (req, res) => {

    const applications =
      await Application.find({
        studentEmail:
          req.params.email
      });

    res.json(applications);

  }
);
app.get("/dashboard-stats", async (req, res) => {

  const totalStudents =
    await Student.countDocuments();

  const totalCompanies =
    await Company.countDocuments();

  const totalInternships =
    await Internship.countDocuments();

  const totalApplications =
    await Application.countDocuments();

  const selectedStudents =
    await Application.countDocuments({
      status: "Selected"
    });

  const interviewScheduled =
    await Application.countDocuments({
      status: "Interview Scheduled"
    });

  res.json({
    totalStudents,
    totalCompanies,
    totalInternships,
    totalApplications,
    selectedStudents,
    interviewScheduled
  });

});

// UPDATE
app.put("/interns/:id", async (req, res) => {
  const updatedIntern = await Intern.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedIntern);
});
app.put("/applications/:id", async (req, res) => {

  const application = await Application.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(application);

});
app.put("/schedule-interview/:id", async (req, res) => {

  console.log("Received:", req.body);

  const updatedApplication =
    await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

  console.log("Updated:", updatedApplication);

  res.json(updatedApplication);

});

// DELETE
app.delete("/delete-all", async (req, res) => {
  await Intern.deleteMany({});
  res.json({ message: "All interns deleted" });
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000");
});