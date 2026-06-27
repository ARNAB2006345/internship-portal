import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompanyLogin() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    const res = await fetch(
      "http://localhost:5000/company-login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      }
    );

    const result = await res.json();

    if(result.success){

      localStorage.setItem(
        "companyEmail",
        result.company.email
      );

      localStorage.setItem(
        "companyName",
        result.company.company_name
      );

      navigate("/company");

    }else{

      alert("Invalid Credentials");

    }

  };

  return(

    <div style={{padding:"40px"}}>

      <h1>🏢 Company Login</h1>

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

      <button onClick={login}>
        Login
      </button>

    </div>

  );

}

export default CompanyLogin;