import { useState } from "react";

function StudentRegister() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  const [college, setCollege] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState("");
  const [resume, setResume] = useState("");
  const [password, setPassword] = useState("");

  const registerStudent = async () => {

    const payload = {
  name,
  email,
  college,
  cgpa,
  skills,
  resume,
  password
};

    try {

      const res = await fetch(
        "http://localhost:5000/students",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      alert("Student Registered Successfully");

      console.log(data);

      setName("");
      setEmail("");
      
      setCollege("");
      setCgpa("");
      setSkills("");
      setResume("");
      setPassword("");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }

  };

  return (

    <div style={{padding:"30px"}}>

      <h1>🎓 Student Registration</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="College"
        value={college}
        onChange={(e)=>setCollege(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="CGPA"
        value={cgpa}
        onChange={(e)=>setCgpa(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Skills (React, Node, Java)"
        value={skills}
        onChange={(e)=>setSkills(e.target.value)}
      />

      <br /><br />
      <input
  type="file"
  accept=".pdf"
  onChange={(e) =>
    setResume(e.target.files[0].name)
  }
/>

      

      <button onClick={registerStudent}>
        Register
      </button>

    </div>

  );
}

export default StudentRegister;