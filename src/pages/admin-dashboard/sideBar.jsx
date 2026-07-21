import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FiX, FiSettings, FiLogOut, FiMenu } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import {
  HiOutlineBuildingLibrary,
  HiOutlineIdentification,
} from "react-icons/hi2";
import {
  MdDashboard,
  MdOutlineFamilyRestroom,
  MdOutlineVolunteerActivism,
} from "react-icons/md";
import { PiBaby, PiMoneyWavy } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { authApi } from "../../services/authApi";

/*
  ✅ كل عنصر إله "path" صار مرتبط فعليًا براوت حقيقي بالتطبيق.
  العناصر اللي لسا ما إلها صفحة جاهزة (path غير موجود) بتضل
  تظهر بالقائمة بس بدون تنقل فعلي لحد ما نبني صفحتها.
*/
const sidebarItems = [
  { label: "لوحة المراجعة", icon: MdDashboard, active: true },
  { label: "الأوصياء", icon: HiOutlineIdentification },
  { label: "الكفلاء", icon: MdOutlineVolunteerActivism },
  {
    label: "العائلات",
    icon: MdOutlineFamilyRestroom,
    path: "/admin-dashboard/families",
  },
  { label: "الأيتام", icon: PiBaby },
  { label: "المدفوعات", icon: PiMoneyWavy },
  { label: "التحديثات الدورية", icon: FiClock },
  { label: "سجلات المدير", icon: TbReportAnalytics },
];

function SidebarContent({ onItemClick }) {
  return (
    <>
      {/* Logo */}
      <div className="flex flex-col items-center justify-center px-4 py-3 shrink-0">
        <div className="text-center mb-2">
          <div className="w-[100px] h-[100px] bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
            <img
              src="/src/assets/title.png"
              alt="كفيلي"
              className="w[140px] h-[140px] object-contain mt-2"
            />
          </div>
        </div>

        <h2 className="font-[Cairo] font-bold text-[18px] sm:text-[20px] lg:text-[22px] tracking-[0px] text-center text-[#FFDEAA] mb-2">
          كفيلي
        </h2>

        <p className="font-[Cairo] font-normal text-[11px] sm:text-[12px] lg:text-[13px] leading-[16px] tracking-[0px] text-center text-[#e6ecf7] whitespace-nowrap">
          لوحة الإدارة الذكية
        </p>
      </div>

      <hr className="border-white/25 mx-4 my-2 shrink-0" />

      {/* Menu */}
      <nav
        className="
          flex-1
          overflow-y-auto
          px-4
          py-3
          space-y-2
          scrollbar-thin
          scrollbar-thumb-white/20
          scrollbar-track-transparent
          hover:scrollbar-thumb-white/40
        "
      >
        {sidebarItems.map(function (item) {
          const isActive = item.path && location.pathname === item.path;

          return (
            <button
              key={item.label}
              onClick={() => handleItemClick(item)}
              className={
                isActive
                  ? "w-full min-h-[48px] py-3 flex items-center gap-3 px-4 rounded-xl font-[Cairo] text-[14px] leading-6 transition-all duration-200 cursor-pointer shrink-0 bg-[#47DBE0] text-[#003469] font-bold shadow-md"
                  : "w-full min-h-[48px] py-3 flex items-center gap-3 px-4 rounded-xl font-[Cairo] text-[14px] leading-6 transition-all duration-200 cursor-pointer shrink-0 text-white/90 hover:bg-white/10 hover:text-white"
              }
            >
              <span
                className={`text-[18px] flex items-center shrink-0 ${
                  isActive ? "text-[#003469]" : "text-white/85"
                }`}
              >
                <item.icon />
              </span>
              <span className="flex-1 text-right">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto px-3 sm:px-4 pb-2 shrink-0">
        <div className="border-t border-white/20 pt-3">
          <button
            onClick={onItemClick}
            className="w-full min-h-[48px] py-3 flex items-center gap-3 px-4 rounded-xl font-[Cairo] text-[14px] leading-6 transition-all duration-200 cursor-pointer shrink-0 text-white/90 hover:bg-white/10 hover:text-white"
          >
            <span className="text-[18px] flex items-center text-white/85 shrink-0">
              <FiSettings />
            </span>
            <span className="flex-1 text-right">الإعدادات</span>
          </button>
        </div>

        <div className="border-t border-white/20 mt-2 pt-2">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="
              w-full h-5
              flex items-center gap-2.5 sm:gap-3
              px-2.5 sm:px-3 rounded-[8px]
              font-[Cairo] text-[11px] sm:text-[12px] lg:text-[13px] leading-[18px]
              text-white/85 font-normal text-right
              hover:bg-red-500/10 hover:text-red-400
              transition cursor-pointer shrink-0
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <span className="text-[15px] sm:text-[16px] lg:text-[18px] flex items-center shrink-0">
              <FiLogOut />
            </span>
            <span>{loggingOut ? "جارٍ الخروج..." : "تسجيل الخروج"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

function Sidebar({ isOpen, onClose, onOpen }) {
  return (
    <>
      {/* ===== نسخة الديسكتوب ===== */}
      <aside className="hidden lg:flex lg:flex-col w-64 h-screen sticky top-0 bg-[#003469] border-l border-[#C2C6D2] shrink-0 py-4">
        <SidebarContent />
      </aside>

      {/* ===== نسخة الموبايل ===== */}

      {/* Hamburger - يظهر بس لما السايدبار مسكر */}
      {!isOpen && onOpen && (
        <button
          onClick={onOpen}
          className="
            lg:hidden fixed top-4 right-4 z-50
            w-10 h-10 rounded-lg
            bg-[#003469] border border-white/30
            flex items-center justify-center
            text-white shadow-md cursor-pointer
          "
          aria-label="فتح القائمة"
        >
          <FiMenu className="text-xl" />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          lg:hidden
          fixed top-0 right-0 z-50
          w-[85vw] max-w-[256px] sm:w-[240px]
          h-screen h-[100dvh]
          bg-[#003469]
          border-l border-[#C2C6D2]
          flex flex-col
          py-3 sm:py-4
          overflow-hidden
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-start px-3 sm:px-4 mb-1 shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center text-white cursor-pointer"
            aria-label="إغلاق القائمة"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <SidebarContent onItemClick={onClose} />
      </aside>
    </>
  );
}

export default Sidebar;