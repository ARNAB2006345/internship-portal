import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin");

  const navigate = useNavigate();

  const handleLogin = () => {

    console.log("Login button clicked");

    // Student
    if (userType === "student") {
      navigate("/student-login");
      return;
    }

    // Company
    if (userType === "company") {
      navigate("/company-login");
      return;
    }

    // Admin
    if (
  username === "admin" &&
  password === "admin123"
) {

  localStorage.setItem(
    "loggedIn",
    "true"
  );

  localStorage.setItem(
    "userRole",
    "admin"
  );

  navigate("/admin");
  return;
}

    alert("Invalid Admin Credentials");
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          width: "420px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px"
          }}
        >
          🚀 Internship Portal
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: "25px"
          }}
        >
          Connect Students & Companies
        </p>

        <select
          value={userType}
          onChange={(e) =>
            setUserType(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px"
          }}
        >
          <option value="admin">
            Admin
          </option>

          <option value="student">
            Student
          </option>

          <option value="company">
            Company
          </option>
        </select>

        {/* Only Admin sees username/password */}

        {userType === "admin" && (
          <>
            <input
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px"
              }}
            />

            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px"
              }}
            />
          </>
        )}

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          {userType === "admin"
            ? "Admin Login"
            : userType === "student"
            ? "Go To Student Login"
            : "Go To Company Login"}
        </button>

        <br />
        <br />

        <button
          onClick={() =>
            navigate("/student-register")
          }
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          Student Registration
        </button>

        <button
          onClick={() =>
            navigate("/company-register")
          }
          style={{
            width: "100%",
            padding: "10px"
          }}
        >
          Company Registration
        </button>

      </div>

    </div>
  );
}

export default Login;