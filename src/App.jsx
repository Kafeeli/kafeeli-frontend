import usePageTitle from "./hooks/usePageTitle";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Login from "./pages/Login";
import RegistrationPage from "./pages/RegistrationPage";
import EmailVerification from "./pages/EmailVerification";
import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import InvalidEmail from "./pages/InvalidEmail";
import SideBar from "./pages/admin-dashboard/sideBar";
import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";

import LandingPage from "./pages/LandingPage";

import MainDashBoard from "./pages/sponsor-dashboard/Dashboard";
import SponsorProfile  from "./pages/sponsor-dashboard/profileDashboard";

import GuardianProfile from "./pages/guardian-dashboard/GuardianProfile";
import ErrorPage from "./pages/guardian-dashboard/Families/ErrorStates";
import FamilyAccessPendingPage from "./pages/guardian-dashboard/Families/FamilyAccessPendingPage";
import NoFamiliesPage from "./pages/guardian-dashboard/Families/NoFamiliesPage";
import AddFamilyPage from "./pages/guardian-dashboard/Families/AddFamilyPage";
import ManagingFamilyCards from "./pages/guardian-dashboard/Families/ManagingFamilyCards";
import FamilyDetailsPage from "./pages/guardian-dashboard/Families/FamilyDetailsPage";

import ActiveFamilyDetailsPage from "./pages/guardian-dashboard/Families/status/ActiveFamilyDetailsPage";
import HiddenFamilyDetailsPage from "./pages/guardian-dashboard/Families/status/HiddenFamilyDetailsPage";
import PendingFamilyDetailsPage from "./pages/guardian-dashboard/Families/status/PendingFamilyDetailsPage";
import StoppedFamilyDetailsPage from "./pages/guardian-dashboard/Families/status/StoppedFamilyDetailsPage";
import NeedsEditFamilyDetailsPage from "./pages/guardian-dashboard/Families/status/NeedsEditFamilyDetailsPage";
import FamilyEditPage from "./pages/guardian-dashboard/Families/status/FamilyEditPage";
import NeedsEditFamilyEditPage from "./pages/guardian-dashboard/Families/status/NeedsEditFamilyEditPage";
import Error404 from "./pages/error404";
import Error401 from "./pages/auth401";

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
  usePageTitle();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={`${location.pathname}${location.search}`}
      >
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

        {/* صفحة انتظار التحقق بعد التسجيل */}
        <Route
          path="/verify-email"
          element={
            <PageWrapper>
              <EmailVerification />
            </PageWrapper>
          }
        />

        {/* رابط التحقق القادم من الإيميل */}
        <Route
          path="/email-verified"
          element={
            <PageWrapper>
              <EmailVerification />
            </PageWrapper>
          }
        />

        {/* صفحة نجاح التحقق */}
        <Route
          path="/email-verified-success"
          element={
            <PageWrapper>
              <EmailVerificationSuccess />
            </PageWrapper>
          }
        />

        {/* دعم الراوت القديم لو كان مستخدم */}
        <Route
          path="/email-verifiedSuccess"
          element={<Navigate to="/email-verified-success" replace />}
        />

        <Route
          path="/invalid-email"
          element={
            <PageWrapper>
              <InvalidEmail />
            </PageWrapper>
          }
        />

        {/* دعم الراوت القديم بحرف E كبير */}
        <Route
          path="/invalid-Email"
          element={<Navigate to="/invalid-email" replace />}
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
          path="/Side-bar"
          element={
            <PageWrapper>
              <SideBar />
            </PageWrapper>
          }
        />

        {/* Landing */}
        <Route
          path="/landing-page"
          element={
            <PageWrapper>
              <div dir="rtl" className="min-h-screen bg-gray-50">
                <LandingPage />
              </div>
            </PageWrapper>
          }
        />

        {/* Sponsor Dashboard */}
        <Route
          path="/main"
          element={
            <PageWrapper>
              <div dir="rtl" className="min-h-screen bg-gray-50">
                <MainDashBoard />
              </div>
            </PageWrapper>
          }
        />

        <Route
          path="/sponsorProfile"
          element={
            <PageWrapper>
              <div dir="rtl" className="min-h-screen bg-gray-50">
              <SponsorProfile />
              </div>
            </PageWrapper>
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
          path="/families/manage"
          element={
            <PageWrapper>
              <ManagingFamilyCards />
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
        {/* الحالاات */}
        {/* حالة العائلة نشطة  */}
        <Route
          path="/families/active-details"
          element={
            <PageWrapper>
              <ActiveFamilyDetailsPage />
            </PageWrapper>
          }
        />

        {/* تعديل بيانات نشطة */}
        <Route
          path="/families/edit"
          element={
            <PageWrapper>
              <FamilyEditPage />
            </PageWrapper>
          }
        />
        {/* تعديل ايرور */}
        <Route
          path="/families/needs-edit/edit"
          element={
            <PageWrapper>
              <NeedsEditFamilyEditPage />
            </PageWrapper>
          }
        />
        {/* حالة موقوفة */}
        <Route
          path="/families/stopped-details"
          element={
            <PageWrapper>
              <StoppedFamilyDetailsPage />
            </PageWrapper>
          }
        />
        {/* قيد المراجعة */}
        <Route
          path="/families/pending-details"
          element={
            <PageWrapper>
              <PendingFamilyDetailsPage />
            </PageWrapper>
          }
        />
        {/* حالة مخفية */}
        <Route
          path="/families/hidden-details"
          element={
            <PageWrapper>
              <HiddenFamilyDetailsPage />
            </PageWrapper>
          }
        />
        {/* تحتاج تعديل */}
        <Route
          path="/families/needs-edit-details"
          element={
            <PageWrapper>
              <NeedsEditFamilyDetailsPage />
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

        <Route
          path="/families/details"
          element={
            <PageWrapper>
              <FamilyDetailsPage />
            </PageWrapper>
          }
        />

        {/* Old routes redirects */}
        <Route
          path="/Mange"
          element={<Navigate to="/families/manage" replace />}
        />

        <Route
          path="/Add-Family-Page"
          element={<Navigate to="/families/add" replace />}
        />

        <Route
          path="/no-families"
          element={<Navigate to="/families" replace />}
        />

        <Route
          path="/family-access-pending"
          element={<Navigate to="/families/access-pending" replace />}
        />

        <Route
          path="/error-Page"
          element={<Navigate to="/families/error" replace />}
        />

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
        <Route
          path="/error-404"
          element={
            <PageWrapper>
              <Error404 />
            </PageWrapper>
          }
        />

        <Route
          path="/auth-401"
          element={
            <PageWrapper>
              <Error401 />
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
