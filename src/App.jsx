// import usePageTitle from "./hooks/usePageTitle";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { AnimatePresence, motion } from "framer-motion";

// import Login from "./pages/Login";
// import RegistrationPage from "./pages/RegistrationPage";
// import EmailVerification from "./pages/EmailVerification";
// import EmailVerificationSuccess from "./pages/EmailVerificationSuccess";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import InvalidEmail from "./pages/InvalidEmail";
// import SideBar from "./pages/admin-dashboard/sideBar";
// import AdminDashboard from "./pages/admin-dashboard/AdminDashboard";
// import TransferReviewList from "./pages/admin-dashboard/Transferreviewlist";
// import FamiliesReview from "./pages/admin-dashboard/Familiesreview";
// import AdminGuardianDocumentsReviewPage from "./pages/admin-dashboard/guardian-documents-review/Adminguardiandocumentsreview";
// import LandingPage from "./pages/LandingPage";
// import MainDashBoard from "./pages/sponsor-dashboard/Dashboard";
// import SponsorProfile from "./pages/sponsor-dashboard/profileDashboard";

// import GuardianProfile from "./pages/guardian-dashboard/GuardianProfile";
// import GuardianDocuments from "./pages/guardian-dashboard/GuardianDocuments";

// // 🔌 صفحات العائلات (الوصي) — بعد التوحيد، صار عندنا صفحة وحدة لكل حالة
// // بدل ملف منفصل لكل حالة (كانت جوّا Families/status/ وصارت محذوفة).
// import ManagingFamilyCards from "./pages/guardian-dashboard/Families/ManagingFamilyCards";
// import AddFamilyPage from "./pages/guardian-dashboard/Families/AddFamilyPage";
// import FamilyDetailsPage from "./pages/guardian-dashboard/Families/FamilyDetailsPage";
// import FamilyEditPage from "./pages/guardian-dashboard/Families/FamilyEditPage";

// import Error404 from "./pages/error404";
// import Error401 from "./pages/auth401";

// import ProtectedRoute from "./routes/ProtectedRoute";
// import PublicRoute from "./routes/PublicRoute";

// function PageWrapper({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.25 }}
//       style={{ height: "100%" }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function AnimatedRoutes() {
//   usePageTitle();
//   const location = useLocation();

//   return (
//     <AnimatePresence mode="wait">
//       <Routes
//         location={location}
//         key={`${location.pathname}${location.search}`}
//       >
//         {/* Auth */}
//         <Route
//           path="/"
//           element={
//             <PageWrapper>
//               <Login />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <PageWrapper>
//               <Login />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/register"
//           element={
//             <PageWrapper>
//               <RegistrationPage />
//             </PageWrapper>
//           }
//         />

//         {/* صفحة انتظار التحقق بعد التسجيل */}
//         <Route
//           path="/verify-email"
//           element={
//             <PageWrapper>
//               <EmailVerification />
//             </PageWrapper>
//           }
//         />

//         {/* رابط التحقق القادم من الإيميل */}
//         <Route
//           path="/email-verified"
//           element={
//             <PageWrapper>
//               <EmailVerification />
//             </PageWrapper>
//           }
//         />

//         {/* صفحة نجاح التحقق */}
//         <Route
//           path="/email-verified-success"
//           element={
//             <PageWrapper>
//               <EmailVerificationSuccess />
//             </PageWrapper>
//           }
//         />

//         {/* دعم الراوت القديم لو كان مستخدم */}
//         <Route
//           path="/email-verifiedSuccess"
//           element={<Navigate to="/email-verified-success" replace />}
//         />

//         <Route
//           path="/invalid-email"
//           element={
//             <PageWrapper>
//               <InvalidEmail />
//             </PageWrapper>
//           }
//         />

//         {/* دعم الراوت القديم بحرف E كبير */}
//         <Route
//           path="/invalid-Email"
//           element={<Navigate to="/invalid-email" replace />}
//         />

//         <Route
//           path="/forgot-password"
//           element={
//             <PageWrapper>
//               <ForgotPassword />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/reset-password"
//           element={
//             <PageWrapper>
//               <ResetPassword />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/Side-bar"
//           element={
//             <PageWrapper>
//               <SideBar />
//             </PageWrapper>
//           }
//         />

//         {/* Landing */}
//         <Route
//           path="/landing-page"
//           element={
//             <PageWrapper>
//               <div dir="rtl" className="min-h-screen bg-gray-50">
//                 <LandingPage />
//               </div>
//             </PageWrapper>
//           }
//         />

//         {/* Sponsor Dashboard */}
//         <Route
//           path="/main"
//           element={
//             <PageWrapper>
//               <div dir="rtl" className="min-h-screen bg-gray-50">
//                 <MainDashBoard />
//               </div>
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/sponsorProfile"
//           element={
//             <PageWrapper>
//               <div dir="rtl" className="min-h-screen bg-gray-50">
//                 <SponsorProfile />
//               </div>
//             </PageWrapper>
//           }
//         />

//         {/* ============================================================ */}
//         {/* Guardian Families Pages — موحّدة وديناميكية (بدل صفحة لكل حالة) */}
//         {/* ============================================================ */}

//         {/* قائمة العائلات — نفسها بتتصرف حسب الحالة (تحميل/خطأ/غير مؤهل/فاضية/فيها عائلات) */}
//         <Route
//           path="/families"
//           element={
//             <PageWrapper>
//               <ManagingFamilyCards />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/families/add"
//           element={
//             <PageWrapper>
//               <AddFamilyPage />
//             </PageWrapper>
//           }
//         />

//         {/* تفاصيل عائلة معينة — الحالة (نشطة/موقوفة/مخفية...) بتحدد شكل الصفحة تلقائيًا */}
//         <Route
//           path="/families/:familyId"
//           element={
//             <PageWrapper>
//               <FamilyDetailsPage />
//             </PageWrapper>
//           }
//         />

//         {/* تعديل بيانات عائلة معينة — نفس المبدأ */}
//         <Route
//           path="/families/:familyId/edit"
//           element={
//             <PageWrapper>
//               <FamilyEditPage />
//             </PageWrapper>
//           }
//         />

//         <Route path="/guardian-documents" element={<GuardianDocuments />} />

//         {/* Old routes redirects */}
//         <Route path="/Mange" element={<Navigate to="/families" replace />} />

//         <Route
//           path="/families/manage"
//           element={<Navigate to="/families" replace />}
//         />

//         <Route
//           path="/Add-Family-Page"
//           element={<Navigate to="/families/add" replace />}
//         />

//         <Route
//           path="/no-families"
//           element={<Navigate to="/families" replace />}
//         />

//         <Route
//           path="/familiesGuardian"
//           element={<Navigate to="/families" replace />}
//         />

//         <Route
//           path="/family-access-pending"
//           element={<Navigate to="/families" replace />}
//         />

//         {/* Dashboards */}
//         <Route
//           path="/sponsor-dashboard"
//           element={
//             <PageWrapper>
//               <h1>Sponsor Dashboard</h1>
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/guardian-dashboard"
//           element={
//             <PageWrapper>
//               <h1>Guardian Dashboard</h1>
//             </PageWrapper>
//           }
//         />

//         {/* ============================================================ */}
//         {/* Admin Dashboard Routes */}
//         {/* ============================================================ */}

//         <Route
//           path="/admin-dashboard"
//           element={
//             <PageWrapper>
//               <AdminDashboard />
//             </PageWrapper>
//           }
//         />

//         {/* ✅ صفحة مراجعة بيانات التحويل (الأدمن) */}
//         <Route
//           path="/admin-dashboard/transfer-review"
//           element={
//             <PageWrapper>
//               <TransferReviewList />
//             </PageWrapper>
//           }
//         />

//         {/* ✨ صفحة مراجعة العائلات (الأدمن) */}
//         <Route
//           path="/admin-dashboard/families"
//           element={
//             <PageWrapper>
//               <FamiliesReview />
//             </PageWrapper>
//           }
//         />

//         {/* ✨ صفحة مراجعة وثائق الأوصياء (الأدمن) — جديد! */}
//         <Route
//           path="/admin-dashboard/guardian-document-reviews"
//           element={
//             <PageWrapper>
//               <AdminGuardianDocumentsReviewPage />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/guardian-profile"
//           element={
//             <PageWrapper>
//               <GuardianProfile />
//             </PageWrapper>
//           }
//         />
//         <Route
//           path="/error-404"
//           element={
//             <PageWrapper>
//               <Error404 />
//             </PageWrapper>
//           }
//         />

//         <Route
//           path="/auth-401"
//           element={
//             <PageWrapper>
//               <Error401 />
//             </PageWrapper>
//           }
//         />

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/landing-page" replace />} />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// export default function App() {
//   return <AnimatedRoutes />;
// }
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
import TransferReviewList from "./pages/admin-dashboard/Transferreviewlist";
import FamiliesReview from "./pages/admin-dashboard/Familiesreview";
import AdminGuardianDocumentsReviewPage from "./pages/admin-dashboard/guardian-documents-review/Adminguardiandocumentsreview";
import LandingPage from "./pages/LandingPage";
import MainDashBoard from "./pages/sponsor-dashboard/Dashboard";
import SponsorProfile from "./pages/sponsor-dashboard/profileDashboard";
import SponsorFamiliesPage from "./pages/sponsor-dashboard/SponsorFamiliesPage";
import SponsorFamilyDetailsPage from "./pages/sponsor-dashboard/SponsorFamilyDetailsPage";
import SponsorSponsorshipsPage from "./pages/sponsor-dashboard/SponsorSponsorshipsPage";
import SponsorSponsorshipDetailsPage from "./pages/sponsor-dashboard/SponsorSponsorshipDetailsPage";
import SponsorOrphansPage from "./pages/sponsor-dashboard/SponsorOrphansPage";
import SponsorOrphanDetailsPage from "./pages/sponsor-dashboard/SponsorOrphanDetailsPage";

import GuardianProfile from "./pages/guardian-dashboard/GuardianProfile";
import GuardianDocuments from "./pages/guardian-dashboard/GuardianDocuments";
import GuardianDashboard from "./pages/guardian-dashboard/GuardianDashboard";
import GuardianOrphansPage from "./pages/guardian-dashboard/GuardianOrphansPage";
import GuardianOrphanDetailsPage from "./pages/guardian-dashboard/GuardianOrphanDetailsPage";
import GuardianOrphanFormPage from "./pages/guardian-dashboard/GuardianOrphanFormPage";
import GuardianPayoutsPage from "./pages/guardian-dashboard/GuardianPayoutsPage";
import AdminOrphansReviewPage from "./pages/admin-dashboard/AdminOrphansReviewPage";
import AdminGuardiansPage from "./pages/admin-dashboard/AdminGuardiansPage";
import AdminSponsorsPage from "./pages/admin-dashboard/AdminSponsorsPage";
import AdminPaymentsReviewPage from "./pages/admin-dashboard/AdminPaymentsReviewPage";
import AdminPayoutsPage from "./pages/admin-dashboard/AdminPayoutsPage";

// 🔌 صفحات العائلات (الوصي) — بعد التوحيد، صار عندنا صفحة وحدة لكل حالة
// بدل ملف منفصل لكل حالة (كانت جوّا Families/status/ وصارت محذوفة).
import ManagingFamilyCards from "./pages/guardian-dashboard/Families/ManagingFamilyCards";
import AddFamilyPage from "./pages/guardian-dashboard/Families/AddFamilyPage";
import FamilyDetailsPage from "./pages/guardian-dashboard/Families/FamilyDetailsPage";
import FamilyEditPage from "./pages/guardian-dashboard/Families/FamilyEditPage";

import Error404 from "./pages/error404";
import Error401 from "./pages/auth401";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/contact";

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
              <div dir="rtl" className="min-h-screen bg-gray-50">
                <LandingPage />
              </div>
            </PageWrapper>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <PageWrapper>
                <Login />
              </PageWrapper>
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <PageWrapper>
                <RegistrationPage />
              </PageWrapper>
            </PublicRoute>
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
            <PublicRoute>
              <PageWrapper>
                <ForgotPassword />
              </PageWrapper>
            </PublicRoute>
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
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <SideBar />
              </PageWrapper>
            </ProtectedRoute>
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

        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />

        <Route
          path="/how-it-works"
          element={
            <PageWrapper>
              <HowItWorks />
            </PageWrapper>
          }
        />

        <Route
          path="/contact"
          element={
            <PageWrapper>
              <Contact />
            </PageWrapper>
          }
        />

        {/* Sponsor Dashboard */}
        <Route
          path="/main"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <div dir="rtl" className="min-h-screen bg-gray-50">
                  <MainDashBoard />
                </div>
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsorProfile"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <div dir="rtl" className="min-h-screen bg-gray-50">
                  <SponsorProfile />
                </div>
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* ============================================================ */}
        {/* Guardian Families Pages — موحّدة وديناميكية (بدل صفحة لكل حالة) */}
        {/* ============================================================ */}

        {/* قائمة العائلات — نفسها بتتصرف حسب الحالة (تحميل/خطأ/غير مؤهل/فاضية/فيها عائلات) */}
        <Route
          path="/families"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <ManagingFamilyCards />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/families/add"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <AddFamilyPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* تفاصيل عائلة معينة — الحالة (نشطة/موقوفة/مخفية...) بتحدد شكل الصفحة تلقائيًا */}
        <Route
          path="/families/:familyId"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <FamilyDetailsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* تعديل بيانات عائلة معينة — نفس المبدأ */}
        <Route
          path="/families/:familyId/edit"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <FamilyEditPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/guardian-documents"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <GuardianDocuments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor/families"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <SponsorFamiliesPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor/families/:familyId"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <SponsorFamilyDetailsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor/sponsorships"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <SponsorSponsorshipsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor/sponsorships/:sponsorshipId"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <SponsorSponsorshipDetailsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sponsor/orphans"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <SponsorOrphansPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/sponsor/orphans/:orphanId"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <SponsorOrphanDetailsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/guardian/orphans"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <GuardianOrphansPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guardian/orphans/:orphanId"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <GuardianOrphanDetailsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guardian/orphans/:orphanId/edit"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <GuardianOrphanFormPage mode="edit" />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/families/:familyId/orphans/add"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <GuardianOrphanFormPage mode="create" />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/guardian/payouts"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <GuardianPayoutsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* Old routes redirects */}
        <Route path="/Mange" element={<Navigate to="/families" replace />} />

        <Route
          path="/families/manage"
          element={<Navigate to="/families" replace />}
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
          path="/familiesGuardian"
          element={<Navigate to="/families" replace />}
        />

        <Route
          path="/family-access-pending"
          element={<Navigate to="/families" replace />}
        />

        {/* Dashboards */}
        <Route
          path="/sponsor-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Sponsor"]}>
              <PageWrapper>
                <MainDashBoard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/guardian-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <GuardianDashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* ============================================================ */}
        {/* Admin Dashboard Routes */}
        {/* ============================================================ */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <AdminDashboard />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* ✅ صفحة مراجعة بيانات التحويل (الأدمن) */}
        <Route
          path="/admin-dashboard/transfer-review"
          element={
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <TransferReviewList />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* ✨ صفحة مراجعة العائلات (الأدمن) */}
        <Route
          path="/admin-dashboard/families"
          element={
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <FamiliesReview />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        {/* ✨ صفحة مراجعة وثائق الأوصياء (الأدمن) — جديد! */}
        <Route
          path="/admin-dashboard/guardian-document-reviews"
          element={
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <AdminGuardianDocumentsReviewPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/guardian-profile"
          element={
            <ProtectedRoute allowedRoles={["Guardian"]}>
              <PageWrapper>
                <GuardianProfile />
              </PageWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard/orphans"
          element={
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <AdminOrphansReviewPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/payments"
          element={
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <AdminPaymentsReviewPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard/payouts"
          element={
            <ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}>
              <PageWrapper>
                <AdminPayoutsPage />
              </PageWrapper>
            </ProtectedRoute>
          }
        />
        <Route path="/admin-dashboard/orphans" element={<ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}><PageWrapper><AdminOrphansReviewPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin-dashboard/guardians" element={<ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}><PageWrapper><AdminGuardiansPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin-dashboard/sponsors" element={<ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}><PageWrapper><AdminSponsorsPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin-dashboard/payments" element={<ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}><PageWrapper><AdminPaymentsReviewPage /></PageWrapper></ProtectedRoute>} />
        <Route path="/admin-dashboard/payouts" element={<ProtectedRoute allowedRoles={["Admin", "SuperAdmin"]}><PageWrapper><AdminPayoutsPage /></PageWrapper></ProtectedRoute>} />

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
        <Route
          path="*"
          element={
            <PageWrapper>
              <Error404 />
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
