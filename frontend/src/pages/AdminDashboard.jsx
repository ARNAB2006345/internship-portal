import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import "./Dashboard.css";


function AdminDashboard() {

  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [interns, setInterns] = useState([]);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState("Active");
  const [stats, setStats] = useState({});
  


  const fetchInterns = async () => {
    try {
      const res = await fetch("http://localhost:5000/interns");
      const data = await res.json();

console.log(JSON.stringify(data, null, 2));

setInterns(data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(() => {

  const role =
  localStorage.getItem("userRole");

if (role !== "admin") {
  navigate("/");
  return;
}

  fetchInterns();

}, [navigate]);
useEffect(() => {
  fetchInterns();
}, []);

  const saveIntern = async () => {

    const payload = {
      name,
      email,
      role,
      department,
      joiningDate,
      status,
      photo
    };
    console.log({
      name,
      email,
      role,
      department,
      joiningDate,
      status,
      photo
    });

    try {

      if (editId) {

        await fetch(
          `http://localhost:5000/interns/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );

        setEditId(null);

      } else {

        await fetch(
          "http://localhost:5000/interns",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );
      }
      setPhoto("");
      setName("");
      setEmail("");
      setRole("");
      setDepartment("");
      setJoiningDate("");
      setStatus("Active");

      fetchInterns();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteIntern = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this intern?"
    );

    if (!confirmDelete) return;

    try {

      await fetch(
        `http://localhost:5000/interns/${id}`,
        {
          method: "DELETE"
        }
      );

      fetchInterns();

    } catch (error) {
      console.log(error);
    }
  };

  const editIntern = (intern) => {
    setPhoto(intern.photo || "");
    setEditId(intern._id);

    setName(intern.name || "");
    setEmail(intern.email || "");
    setRole(intern.role || "");
    setDepartment(intern.department || "");
    setJoiningDate(intern.joiningDate || "");
    setStatus(intern.status || "");
  };

  const logout = () => {

    localStorage.removeItem("loggedIn");
    navigate("/");
  };
  useEffect(() => {
  fetchStudents();
  fetchCompanies();
  fetchInternships();
  fetchApplications();
  fetchStats();
}, []);

const fetchStudents = async () => {
  const res = await fetch("http://localhost:5000/students");
  const data = await res.json();
  setStudents(data);
};

const fetchCompanies = async () => {
  const res = await fetch("http://localhost:5000/companies");
  const data = await res.json();
  setCompanies(data);
};

const fetchInternships = async () => {
  const res = await fetch("http://localhost:5000/internships");
  const data = await res.json();
  setInternships(data);
};

const fetchApplications = async () => {
  const res = await fetch("http://localhost:5000/applications");
  const data = await res.json();
  setApplications(data);
};
const fetchStats = async () => {

  const res = await fetch(
    "http://localhost:5000/dashboard-stats"
  );

  const data = await res.json();

  setStats(data);

};

  const filteredInterns = interns.filter((intern) => {

    const keyword = search.toLowerCase();

    const matchesSearch =
      intern.name?.toLowerCase().includes(keyword) ||
      intern.email?.toLowerCase().includes(keyword) ||
      intern.role?.toLowerCase().includes(keyword) ||
      intern.department?.toLowerCase().includes(keyword);

    const matchesRole =
      roleFilter === "" ||
      intern.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className={darkMode ? "dashboard dark" : "dashboard"}>
      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "15px",
    marginBottom: "30px"
  }}
>

  

      <div className="topbar">

        <h1> Intern Management System</h1>
      </div>
      <br></br>
      
      <div className="welcome-card">
        <h2>Welcome Admin 👋</h2>
        <p>
           Manage interns, monitor progress,
           track status and generate reports.
        </p>
      </div>
      <br></br>
      <div>
         <CSVLink
           data={interns}
           filename={"interns-data.csv"}
           className="export-btn"
         >
           Export CSV
         </CSVLink>
        <button
          className="dark-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>
      <br></br>

      <div className="card">
    <h2>{stats.totalStudents}</h2>
    <p>Students</p>
  </div>

  <div className="card">
    <h2>{stats.totalCompanies}</h2>
    <p>Companies</p>
  </div>

  <div className="card">
    <h2>{stats.totalInternships}</h2>
    <p>Internships</p>
  </div>

  <div className="card">
    <h2>{stats.totalApplications}</h2>
    <p>Applications</p>
  </div>

  <div className="card">
    <h2>{stats.interviewScheduled}</h2>
    <p>Interviews Scheduled</p>
  </div>

  <div className="card">
    <h2>{stats.selectedStudents}</h2>
    <p>Selected Students</p>
  </div>

</div>
      <div className="stats-grid">

  <div className="stat-card">
    <h2>{students.length}</h2>
    <p>Total Students</p>
  </div>

  <div className="stat-card">
    <h2>{companies.length}</h2>
    <p>Total Companies</p>
  </div>

  <div className="stat-card">
    <h2>{internships.length}</h2>
    <p>Total Internships</p>
  </div>

  <div className="stat-card">
    <h2>{applications.length}</h2>
    <p>Total Applications</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        applications.filter(
          app => app.status === "Selected"
        ).length
      }
    </h2>
    <p>Selected Students</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        applications.filter(
          app => app.status === "Shortlisted"
        ).length
      }
    </h2>
    <p>Shortlisted</p>
  </div>

</div>

      <div className="stats">

  <div className="stat-card">
    <h2>{interns.length}</h2>
    <p>Total Interns</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        interns.filter(
          i => i.role === "Developer"
        ).length
      }
    </h2>
    <p>Developers</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        interns.filter(
          i => i.role === "Designer"
        ).length
      }
    </h2>
    <p>Designers</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        interns.filter(
          i => i.role === "Tester"
        ).length
      }
    </h2>
    <p>Testers</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        interns.filter(
          i => i.status === "Active"
        ).length
      }
    </h2>
    <p>Active Interns</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        interns.filter(
          i => i.status === "Completed"
        ).length
      }
    </h2>
    <p>Completed Interns</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        interns.filter(
          i => i.status === "On Leave"
        ).length
      }
    </h2>
    <p>On Leave</p>
  </div>

  <div className="stat-card">
    <h2>
      {
        interns.filter(
          i =>
            i.joiningDate &&
            new Date(i.joiningDate).getMonth() ===
            new Date().getMonth()
        ).length
      }
    </h2>
    <p>Joined This Month</p>
  </div>

</div>

      <div className="form-card">

        <h2>
          {editId
            ? "Update Intern"
            : "Add New Intern"}
        </h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
        />

        <input
          placeholder="Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
        />

        <input
          type="date"
          value={joiningDate}
          onChange={(e) =>
            setJoiningDate(e.target.value)
          }
        />
        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>Completed</option>
          <option>On Leave</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {

            const file = e.target.files[0];

            if (!file) return;

            const reader = new FileReader();

            reader.onloadend = () => {
              setPhoto(reader.result);
            };

            reader.readAsDataURL(file);
          }}
        />
        {
          photo && (
            <img
              src={photo}
              alt="preview"
              width="100"
              height="100"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "10px"
              }}
            />
           )
        }

        <button
          className="save-btn"
          onClick={saveIntern}
        >
          {editId
            ? "Update Intern"
            : "Add Intern"}
        </button>

      </div>

      <div className="search-box">

        <input
          placeholder="Search by Name, Email, Role..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={roleFilter}
          onChange={(e) =>
            setRoleFilter(e.target.value)
          }
        >
          <option value="">
            All Roles
          </option>

          <option value="Developer">
            Developer
          </option>

          <option value="Designer">
            Designer
          </option>

          <option value="Tester">
            Tester
          </option>

        </select>

      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredInterns.map((intern) => (

              <tr key={intern._id}>

                <td>
                  <img
                    src={intern.photo || "https://via.placeholder.com/50"}
                    alt="profile"
                    width="50"
                    height="50"
                    style={{
                      borderRadius: "50%",
                      objectFit: "cover"
                    }}
                  />
                </td>

                <td>{intern.name}</td>
                <td>{intern.email}</td>
                <td>{intern.role}</td>
                <td>{intern.department}</td>
                <td>{intern.joiningDate}</td>
                <td>{intern.status}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editIntern(intern)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteIntern(intern._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <h2 style={{marginTop:"40px"}}>
  Registered Students
</h2>

<table>

  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>

  <tbody>

    {students.map((student) => (

      <tr key={student._id}>
        <td>{student.name}</td>
        <td>{student.email}</td>
      </tr>

    ))}

  </tbody>

</table>
<h2 style={{marginTop:"40px"}}>
  Registered Companies
</h2>

<table>

  <thead>
    <tr>
      <th>Company Name</th>
      <th>Email</th>
    </tr>
  </thead>

  <tbody>

    {companies.map((company) => (

      <tr key={company._id}>
        <td>{company.companyName}</td>
        <td>{company.email}</td>
      </tr>

    ))}

  </tbody>

</table>
<h2 style={{marginTop:"40px"}}>
  Recent Applications
</h2>

<table>

  <thead>
    <tr>
      <th>Student</th>
      <th>Company</th>
      <th>Internship</th>
      <th>Status</th>
    </tr>
  </thead>

  <tbody>

    {applications.map((app) => (

      <tr key={app._id}>

        <td>{app.studentName}</td>
        <td>{app.companyName}</td>
        <td>{app.internshipTitle}</td>
        <td>{app.status}</td>

      </tr>

    ))}

  </tbody>

</table>
      <footer
  style={{
    marginTop: "30px",
    textAlign: "center",
    color: "#777"
  }}
>
  Intern Management System © 2026
</footer>

    </div>
  );
}

export default AdminDashboard;