// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import Login from "./pages/Login";

// // function App() {
// //   return (
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/" element={<Login />} />
// //         <Route path="/sponsor-dashboard" element={<h1>Sponsor Dashboard</h1>} />
// //         <Route path="/guardian-dashboard" element={<h1>Guardian Dashboard</h1>} />
// //         <Route path="/admin-dashboard" element={<h1>Admin Dashboard</h1>} />
// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// // import { Routes, Route } from "react-router-dom";
// // import ResetPassword from "./pages/ResetPassword";
// // import Login from "./pages/Login";

// // function App() {
// //   return (
// //     <Routes>
// //         <Route path="/reset-password" element={<ResetPassword />} />
        
// //      </Routes>
     
// //   );
// // }

// // export default App;
// import { Routes, Route, Navigate } from "react-router-dom";
// import ResetPassword from "./pages/ResetPassword";
// // import Login from "./pages/Login";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/reset-password" />} />
//       <Route path="/reset-password" element={<ResetPassword />} />
//        <Route path="/login" element={<Login />} /> 
//     </Routes>
//   );
// }

// export default App;
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/reset-password" />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/login" element={<Login />} />
    </Routes>
import RegistrationPage from "./pages/RegistrationPage";
import EmailVerification from "./pages/EmailVerification";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InvalidEmail from "./pages/InvalidEmail";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
    </BrowserRouter>
  );
}

export default App;