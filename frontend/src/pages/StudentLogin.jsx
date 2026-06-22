import { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentLogin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/student-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await res.json();

      console.log("Login Response:", data);

      if (data.success) {

        // Store complete student object
        localStorage.setItem(
          "studentData",
          JSON.stringify(data.student)
        );

        // Store name & email separately
        localStorage.setItem(
          "studentName",
          data.student.name
        );

        localStorage.setItem(
          "studentEmail",
          data.student.email
        );

        console.log(
          "Stored Name:",
          data.student.name
        );

        console.log(
          "Stored Email:",
          data.student.email
        );

        navigate("/student");

      } else {

        alert("Invalid Credentials");

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>Student Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />
      <br />

      <button
        onClick={handleLogin}
      >
        Login
      </button>

    </div>

  );
}

export default StudentLogin;