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
import GuardianProfile from "./pages/GuardianProfile";
import ProfilePage from "./pages/sponsor-dashboard/profileDashboard";
import ErrorPage from './pages/guardian-dashboard/Families/ErrorStates';
import FamilyAccessPendingPage from './pages/guardian-dashboard/Families/FamilyAccessPendingPage';
import NoFamiliesPage from './pages/guardian-dashboard/Families/NoFamiliesPage';

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
      {/*  الرئيسية  في لوحة الكفيل*/}
        <Route
          path="/main"
          element={
            <div dir="rtl" className="min-h-screen bg-gray-50">
              <MainDashBoard  />
            </div>
          }
        />

        {/* الملف الشخصي  في لوحة الكفيل*/}
        <Route
          path="/profile"
          element={
            <div dir="rtl" className="min-h-screen bg-gray-50">
              <ProfilePage />
            </div>
          }
        />
        <Route
          path="/landing-page"
          element={
            <div dir="rtl" className="min-h-screen bg-gray-50">
              <LandingPage />
            </div>
          }
        />

        <Route
          path="/"
          element={
            <PageWrapper>
              <Login />
            </PageWrapper>
          }
        />
        <Route
          path="/family-access-pending"
          element={
            <PageWrapper>
              <FamilyAccessPendingPage />
            </PageWrapper>
          }
        />
        <Route
          path="/no-families"
          element={
            <PageWrapper>
              <NoFamiliesPage />
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
          path="/error-Page"
          element={
            <PageWrapper>
              <ErrorPage />
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

        <Route
          path="/guardian-profile"
          element={
            <PageWrapper>
              <GuardianProfile />
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

        {/* أي رابط غلط يرجعه على الرئيسية */}
        <Route path="*" element={<Navigate to="/landing-page" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}