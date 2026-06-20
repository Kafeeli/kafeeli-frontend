// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import Registration from "./pages/RegistrationPage"
import EmailVerification from "./pages/EmailVerification"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import RegistrationPage from "./pages/RegistrationPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/" element={<Login />} />
        <Route path="/sponsor-dashboard" element={<h1>Sponsor Dashboard</h1>} />
        <Route path="/guardian-dashboard" element={<h1>Guardian Dashboard</h1>} />
        <Route path="/admin-dashboard" element={<h1>Admin Dashboard</h1>} />
        <Route path="/email-verified" element={<EmailVerificationSuccess />} />
        <Route path="/register" element={<RegistrationPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;