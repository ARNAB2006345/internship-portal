import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import StudentRegister from "./pages/StudentRegister";
import CompanyRegister from "./pages/CompanyRegister";
import StudentLogin from "./pages/StudentLogin";
import CompanyLogin from "./pages/CompanyLogin";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/student" element={<StudentDashboard />} />

        <Route path="/company" element={<CompanyDashboard />} />

        <Route path="/student-register" element={<StudentRegister />} />

        <Route path="/company-register" element={<CompanyRegister />} />

        <Route path="/student-login" element={<StudentLogin />} />

        <Route path="/company-login" element={<CompanyLogin />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;