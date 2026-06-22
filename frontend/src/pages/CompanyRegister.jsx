import { useState } from "react";

function CompanyRegister() {

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  const registerCompany = async () => {

    const payload = {
      companyName,
      email,
      password,
      industry,
      location
    };

    try {

      const res = await fetch(
        "http://localhost:5000/companies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await res.json();

      console.log(data);

      alert("Company Registered Successfully");

      setCompanyName("");
      setEmail("");
      setPassword("");
      setIndustry("");
      setLocation("");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");

    }
  };

  return (

    <div
      style={{
        padding: "30px",
        maxWidth: "500px",
        margin: "auto"
      }}
    >

      <h1>🏢 Company Registration</h1>

      <input
        placeholder="Company Name"
        value={companyName}
        onChange={(e) =>
          setCompanyName(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <input
        placeholder="Industry"
        value={industry}
        onChange={(e) =>
          setIndustry(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) =>
          setLocation(e.target.value)
        }
        style={{
          width: "100%",
          padding: "10px"
        }}
      />

      <br /><br />

      <button
        onClick={registerCompany}
        style={{
          width: "100%",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Register Company
      </button>

    </div>
  );
}

export default CompanyRegister;