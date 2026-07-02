import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import EmailVerification from "./pages/EmailVerification";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InvalidEmail from "./pages/InvalidEmail";

import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
import LandingPage from "./pages/LandingPage";

import MainDashBoard from "./pages/sponsor-dashboard/Dashboard";
import ProfilePage from "./pages/sponsor-dashboard/profileDashboard";

import GuardianProfile from "./pages/GuardianProfile";

import ErrorPage from "./pages/guardian-dashboard/Families/ErrorStates";
import FamilyAccessPendingPage from "./pages/guardian-dashboard/Families/FamilyAccessPendingPage";
import NoFamiliesPage from "./pages/guardian-dashboard/Families/NoFamiliesPage";
import AddFamilyPage from "./pages/guardian-dashboard/Families/AddFamilyPage";

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
        {/* Auth */}
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

        {/* Landing */}
        <Route
          path="/landing-page"
          element={
            <div dir="rtl" className="min-h-screen bg-gray-50">
              <LandingPage />
            </div>
          }
        />

        {/* Sponsor Dashboard */}
        <Route
          path="/main"
          element={
            <div dir="rtl" className="min-h-screen bg-gray-50">
              <MainDashBoard />
            </div>
          }
        />

        <Route
          path="/profile"
          element={
            <div dir="rtl" className="min-h-screen bg-gray-50">
              <ProfilePage />
            </div>
          }
        />

        {/* Guardian Families Pages */}
        <Route
          path="/families"
          element={
            <PageWrapper>
              <NoFamiliesPage />
            </PageWrapper>
          }
        />

        <Route
          path="/families/add"
          element={
            <PageWrapper>
              <AddFamilyPage />
            </PageWrapper>
          }
        />

        <Route
          path="/families/access-pending"
          element={
            <PageWrapper>
              <FamilyAccessPendingPage />
            </PageWrapper>
          }
        />

        <Route
          path="/families/error"
          element={
            <PageWrapper>
              <ErrorPage />
            </PageWrapper>
          }
        />

        {/* Old routes redirects */}
        <Route path="/Add-Family-Page" element={<Navigate to="/families/add" replace />} />
        <Route path="/no-families" element={<Navigate to="/families" replace />} />
        <Route path="/family-access-pending" element={<Navigate to="/families/access-pending" replace />} />
        <Route path="/error-Page" element={<Navigate to="/families/error" replace />} />

        {/* Dashboards */}
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

        <Route
          path="/guardian-profile"
          element={
            <PageWrapper>
              <GuardianProfile />
            </PageWrapper>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/landing-page" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}