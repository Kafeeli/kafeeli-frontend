import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import EmailVerification from "./pages/EmailVerification";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/email-verified" element={<EmailVerificationSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sponsor-dashboard" element={<h1>Sponsor Dashboard</h1>} />
        <Route path="/guardian-dashboard" element={<h1>Guardian Dashboard</h1>} />
        <Route path="/admin-dashboard" element={<h1>Admin Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;