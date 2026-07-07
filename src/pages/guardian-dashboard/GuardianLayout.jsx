// src/components/GuardianLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/guardian-dashboard/Sidebar";
import { useState } from "react";
import { motion } from "framer-motion"; // استيراد motion
import ChangePasswordModal from "../pages/guardian-dashboard/ChangePasswordModal";

export default function GuardianLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <Sidebar openSidebar={sidebarOpen} setOpenSidebar={setSidebarOpen} />

      <div className="flex-1 lg:mr-64 flex flex-col">
        {/* الأنيميشن بيبدأ هون لكل الصفحات اللي بتيجي من الـ Outlet */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}
