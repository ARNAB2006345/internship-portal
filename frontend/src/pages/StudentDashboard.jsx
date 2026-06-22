import { useEffect, useState } from "react";

function StudentDashboard() {

  const [students, setStudents] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");

const studentEmail =
  localStorage.getItem("studentEmail");

const currentStudent =
  students.find(
    (s) =>
      s.email?.toLowerCase() ===
      studentEmail?.toLowerCase()
  );
  

  const fetchStudents = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/students"
      );

      const data = await res.json();

      setStudents(data);

    } catch(error) {
      console.log(error);
    }
  };
  const fetchInternships = async () => {

  const res = await fetch(
    "http://localhost:5000/internships"
  );

  const data = await res.json();

  setInternships(data);
};
const fetchApplications = async () => {

  try {

    const studentEmail =
      localStorage.getItem("studentEmail");

    const res = await fetch(
      `http://localhost:5000/applications/student/${studentEmail}`
    );

    const data = await res.json();

    console.log("Applications:", data);

    setApplications(data);

  } catch (error) {

    console.log(error);

  }

};

const applyInternship = async (internship) => {
  console.log("Apply Button Clicked");

  try {

    const studentName =
      localStorage.getItem("studentName");

    const studentEmail =
      localStorage.getItem("studentEmail");

    if (!studentName || !studentEmail) {
      alert("Student not logged in");
      return;
    }

    const student = students.find(
      (s) =>
        s.email?.toLowerCase() ===
        studentEmail?.toLowerCase()
    );

    const payload = {
      studentName,
      studentEmail,

      internshipId: internship._id,
      internshipTitle: internship.title,
      companyName: internship.companyName,

      skills: student?.skills || "",
      resume: student?.resume || "",

      internshipSkills:
        internship.skills,

      status: "Applied"
    };

    console.log("Sending Application:");
    console.log(payload);

    const res = await fetch(
      "http://localhost:5000/apply",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    const data = await res.json();

    console.log(
      "Apply Response:",
      data
    );

    if (data.success) {

      alert(
        "Application Submitted Successfully"
      );

      fetchApplications();

    } else {

      alert(
        data.message ||
        "Application Failed"
      );

    }

  } catch (error) {

    console.log(error);

    alert(
      "Server Error While Applying"
    );

  }

};


  useEffect(() => {

  fetchStudents();
  fetchInternships();
  fetchApplications();

  const interval = setInterval(() => {

    fetchApplications();

  }, 5000);

  return () => clearInterval(interval);

  // eslint-disable-next-line react-hooks/exhaustive-deps

}, []);
  return (

    <div style={{padding:"30px"}}>

      <h1>🎓 Student Dashboard</h1>
      <h2>My Profile</h2>

<div
  style={{
    border: "1px solid #ddd",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px"
  }}
>

  <p>
    <strong>Name:</strong>{" "}
    {currentStudent?.name}
  </p>

  <p>
    <strong>Email:</strong>{" "}
    {currentStudent?.email}
  </p>

  <p>
    <strong>College:</strong>{" "}
    {currentStudent?.college}
  </p>

  <p>
    <strong>CGPA:</strong>{" "}
    {currentStudent?.cgpa}
  </p>

  <p>
    <strong>Skills:</strong>{" "}
    {currentStudent?.skills}
  </p>

  <p>
    <strong>Resume:</strong>{" "}

    {currentStudent?.resume ? (

      <a
        href={currentStudent.resume}
        target="_blank"
        rel="noreferrer"
      >
        View Resume
      </a>

    ) : (
      "No Resume"
    )}

  </p>

</div>

      <div className="stats">

        <div className="stat-card">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>

      </div>

      <h2>Registered Students</h2>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>College</th>
            <th>CGPA</th>
            <th>Skills</th>
            <th>Resume</th>
          </tr>
        </thead>

        <tbody>

          {students.map((student) => (

            <tr key={student._id}>

              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.college}</td>
              <td>{student.cgpa}</td>
              <td>{student.skills}</td>
              <td>

  {student.resume ? (

    <a
      href={student.resume}
      target="_blank"
      rel="noreferrer"
    >
      Resume
    </a>

  ) : (

    "No Resume"

  )}

</td>

            </tr>

          ))}

        </tbody>

      </table>
      <input
  placeholder="Search Internship / Company / Skill"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px"
  }}
/>
  <h2>Available Internships</h2>

<div>

{
  [...internships]

    .filter((internship) => {

      const text = search.toLowerCase();

      return (
        internship.title
          ?.toLowerCase()
          .includes(text) ||

        internship.companyName
          ?.toLowerCase()
          .includes(text) ||

        internship.skills
          ?.toLowerCase()
          .includes(text) ||

        internship.location
          ?.toLowerCase()
          .includes(text)
      );

    })

    .sort((a, b) => {

      const studentSkills =
        currentStudent?.skills?.toLowerCase() || "";

      const aMatch =
        (a.skills || "")
          .toLowerCase()
          .split(",")
          .filter(skill =>
            studentSkills.includes(
              skill.trim()
            )
          ).length;

      const bMatch =
        (b.skills || "")
          .toLowerCase()
          .split(",")
          .filter(skill =>
            studentSkills.includes(
              skill.trim()
            )
          ).length;

      return bMatch - aMatch;

    })

    .map((internship) => {

      const studentSkills =
        currentStudent?.skills?.toLowerCase() || "";

      const requiredSkills =
        internship.skills?.toLowerCase() || "";

      const matchedSkills =
        requiredSkills
          .split(",")
          .filter(skill =>
            studentSkills.includes(
              skill.trim()
            )
          );

      const matchScore =
        requiredSkills.length > 0
          ? Math.round(
              (
                matchedSkills.length /
                requiredSkills.split(",").length
              ) * 100
            )
          : 0;

      return (

        <div
          key={internship._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "15px",
            borderRadius: "10px"
          }}
        >

          <h3>{internship.title}</h3>

          {matchScore >= 70 && (

            <span
              style={{
                background: "green",
                color: "white",
                padding: "5px 10px",
                borderRadius: "10px"
              }}
            >
              ⭐ Recommended
            </span>

          )}

          <p>
            <strong>Company:</strong>{" "}
            {internship.companyName}
          </p>

          <p>
            <strong>Skills Required:</strong>{" "}
            {internship.skills}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {internship.location}
          </p>

          <p>
            <strong>Stipend:</strong> ₹
            {internship.stipend}
          </p>

          <p>
            <strong>Duration:</strong>{" "}
            {internship.duration}
          </p>

          <h4>
            🎯 Match Score: {matchScore}%
          </h4>

          <button
            onClick={() =>
              applyInternship(internship)
            }
          >
            Apply
          </button>

        </div>

      );

    })
}




</div>
<h2>My Applications</h2>

<table>

  <thead>

    <tr>
      <th>Company</th>
      <th>Internship</th>
      <th>Interview Date</th>
      <th>Interview Time</th>
      <th>Mode</th>
      <th>Status</th>
    </tr>

  </thead>

  <tbody>

    {applications.map((app)=>(
      <tr key={app._id}>

        <td>{app.companyName}</td>
        <td>{app.internshipTitle}</td>
  <td>{app.interviewDate || "-"}</td>
<td>{app.interviewTime || "-"}</td>
<td>{app.interviewMode || "-"}</td>
<td>{app.status}</td>
{app.offerLetter && (
  <a
    href={app.offerLetter}
    target="_blank"
    rel="noreferrer"
  >
    Download Offer Letter
  </a>
)}

      </tr>
    ))}

  </tbody>

</table>

    </div>
  );
}

export default StudentDashboard;