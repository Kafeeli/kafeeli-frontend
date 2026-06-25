import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import EmailVerification from "./pages/EmailVerification";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InvalidEmail from "./pages/InvalidEmail";
import AdminDashboard from "./pages/AdminDashboard";

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      style={{ height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />

        <Route
          path="/register"
          element={
            <PageWrapper>
              <RegistrationPage />
            </PageWrapper>
          }
        />

        <Route
          path="/verify-email"
          element={
            <PageWrapper>
              <EmailVerification />
            </PageWrapper>
          }
        />

        <Route
          path="/email-verified"
          element={
            <PageWrapper>
              <EmailVerificationSuccess />
            </PageWrapper>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PageWrapper>
              <ForgotPassword />
            </PageWrapper>
          }
        />

        <Route
          path="/reset-password"
          element={
            <PageWrapper>
              <ResetPassword />
            </PageWrapper>
          }
        />

        <Route
          path="/invalid-Email"
          element={
            <PageWrapper>
              <InvalidEmail />
            </PageWrapper>
          }
        />

        <Route
          path="/sponsor-dashboard"
          element={
            <PageWrapper>
              <h1>Sponsor Dashboard</h1>
            </PageWrapper>
          }
        />

        <Route
          path="/guardian-dashboard"
          element={
            <PageWrapper>
              <h1>Guardian Dashboard</h1>
            </PageWrapper>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PageWrapper>
              <AdminDashboard />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
