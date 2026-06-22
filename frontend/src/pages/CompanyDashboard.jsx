import { useState, useEffect } from "react";
import { Document, Packer, Paragraph } from "docx";
import { saveAs } from "file-saver";

function CompanyDashboard() {

  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [stipend, setStipend] = useState("");
  const [duration, setDuration] = useState("");
  const [openings, setOpenings] = useState("");

  const [applications, setApplications] = useState([]);
  const companySearch =
  localStorage.getItem("companyName");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewMode, setInterviewMode] = useState("");

  useEffect(() => {
  const loadData = async () => {
    await fetchApplications();
  };

  loadData();
}, []);

  const postInternship = async () => {

    const payload = {
      title,
      companyName,
      skills,
      location,
      stipend,
      duration,
      openings
    };

    try {

      await fetch(
        "http://localhost:5000/internships",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      alert("Internship Posted Successfully");

      setTitle("");
      setCompanyName("");
      setSkills("");
      setLocation("");
      setStipend("");
      setDuration("");
      setOpenings("");

    } catch (error) {

      console.log(error);

      alert("Failed To Post Internship");

    }
  };

  const fetchApplications = async () => {

  console.log(
    "Company Name:",
    companySearch
  );

  try {

    const res = await fetch(
      `http://localhost:5000/applications/${companySearch}`
    );

    const data = await res.json();

    console.log(
      "Applicants Data:",
      data
    );

    setApplications(data);

  } catch (error) {

    console.log(error);

  }
};

  const updateStatus = async (id, status) => {

    try {

      await fetch(
        `http://localhost:5000/applications/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            status
          })
        }
      );

      fetchApplications();

    } catch (error) {

      console.log(error);

    }
  };
  const scheduleInterview = async (id) => {

  try {

    await fetch(
      `http://localhost:5000/schedule-interview/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          interviewDate,
          interviewTime,
          interviewMode,
          status: "Interview Scheduled"
        })
      }
    );

    alert("Interview Scheduled");

    fetchApplications();

  } catch(error) {

    console.log(error);

  }
};
const generateOfferLetter = async (app) => {

  const doc = new Document({

    sections: [
      {
        children: [

          new Paragraph({
            text: "INTERNSHIP OFFER LETTER"
          }),

          new Paragraph(""),

          new Paragraph(
            `Date: ${new Date().toLocaleDateString()}`
          ),

          new Paragraph(""),

          new Paragraph(
            `Dear ${app.studentName},`
          ),

          new Paragraph(""),

          new Paragraph(

            `We are pleased to offer you the position of ${app.internshipTitle} at ${app.companyName}.`

          ),

          new Paragraph(""),

          new Paragraph(

            "Based on your profile and interview performance, you have been selected for this internship opportunity."

          ),

          new Paragraph(""),

          new Paragraph(
            "We look forward to your contribution and wish you success."
          ),

          new Paragraph(""),

          new Paragraph(
            `Regards,`
          ),

          new Paragraph(
            `${app.companyName}`
          )

        ]
      }
    ]

  });

  const blob =
    await Packer.toBlob(doc);

  saveAs(
    blob,
    `${app.studentName}_OfferLetter.docx`
  );

};

  return (

    <div style={{ padding: "30px" }}>

      <h1>🏢 Company Dashboard</h1>

      <hr />

      <h2>Post Internship</h2>

      <input
        placeholder="Internship Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Skills Required"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Stipend"
        value={stipend}
        onChange={(e) => setStipend(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Openings"
        value={openings}
        onChange={(e) => setOpenings(e.target.value)}
      />

      <br /><br />

      <button onClick={postInternship}>
        Post Internship
      </button>

      <hr />

      <h2>View Applicants</h2>

      

      <br /><br />
      <h3>Interview Details</h3>

<input
  type="date"
  value={interviewDate}
  onChange={(e)=>
    setInterviewDate(e.target.value)
  }
/>

<br /><br />

<input
  type="time"
  value={interviewTime}
  onChange={(e)=>
    setInterviewTime(e.target.value)
  }
/>

<br /><br />

<input
  placeholder="Google Meet / Offline"
  value={interviewMode}
  onChange={(e)=>
    setInterviewMode(e.target.value)
  }
/>

<br /><br />

 <table
  border="1"
  cellPadding="10"
  style={{
    width: "100%",
    borderCollapse: "collapse"
  }}
>

  <thead>

    <tr>
      <th>Student Name</th>
      <th>Email</th>
      <th>Internship</th>
      <th>Skills</th>
      <th>Resume</th>
      <th>Match Score</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>

  </thead>

  <tbody>

    {applications.map((app) => {

      const internshipSkills =
        app.internshipSkills?.toLowerCase() || "";

      const studentSkills =
        app.skills?.toLowerCase() || "";

      const matchedSkills =
        internshipSkills
          .split(",")
          .filter(skill =>
            studentSkills.includes(skill.trim())
          );

      const matchScore =
        internshipSkills.length > 0
          ? Math.round(
              (
                matchedSkills.length /
                internshipSkills.split(",").length
              ) * 100
            )
          : 0;

      return (

        <tr key={app._id}>

          <td>{app.studentName}</td>

          <td>{app.studentEmail}</td>

          <td>{app.internshipTitle}</td>

          <td>{app.skills}</td>

          <td>

  {app.resume ? (

    <a
      href={app.resume}
      target="_blank"
      rel="noreferrer"
    >
      View Resume
    </a>

  ) : (

    "No Resume"

  )}

</td>

          <td>
            <strong>
              {matchScore}%
            </strong>
          </td>

          <td>

  {app.status}

  <br /><br />

  {app.status === "Selected" && (

    <button
      onClick={() =>
        generateOfferLetter(app)
      }
    >
      Download Offer Letter
    </button>

  )}

</td>

          <td>

            <button
              onClick={() =>
                updateStatus(
                  app._id,
                  "Shortlisted"
                )
              }
            >
              Shortlist
            </button>

            {" "}

            <button
              onClick={() =>
                updateStatus(
                  app._id,
                  "Selected"
                )
              }
            >
              Select
            </button>

            {" "}

            <button
              onClick={() =>
                updateStatus(
                  app._id,
                  "Rejected"
                )
              }
            >
              Reject
            </button>
            <button
              onClick={() =>
                scheduleInterview(app._id)
              }
            >
              Schedule Interview
            </button>

          </td>

        </tr>

      );

    })}

  </tbody>

</table>

    </div>
  );
}

export default CompanyDashboard;