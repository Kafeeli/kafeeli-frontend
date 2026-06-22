import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import EmailVerification from "./pages/EmailVerification";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InvalidEmail from "./pages/InvalidEmail";

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/email-verified" element={<EmailVerificationSuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/invalid-Email" element={<InvalidEmail />} />
        <Route path="/sponsor-dashboard" element={<h1>Sponsor Dashboard</h1>} />
        <Route path="/guardian-dashboard" element={<h1>Guardian Dashboard</h1>} />
        <Route path="/admin-dashboard" element={<h1>Admin Dashboard</h1>} />
      </Routes>
   
  );
}

export default App;