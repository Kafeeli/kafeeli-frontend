import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sponsor-dashboard" element={<h1>Sponsor Dashboard</h1>} />
        <Route path="/guardian-dashboard" element={<h1>Guardian Dashboard</h1>} />
        <Route path="/admin-dashboard" element={<h1>Admin Dashboard</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;