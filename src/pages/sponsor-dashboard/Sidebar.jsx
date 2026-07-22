import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  MdClose,
  MdLogout,
  MdDashboard,
  MdPerson,
  MdDescription,
  MdFamilyRestroom,
  MdAccountBalanceWallet,
  MdPayments,
  MdPublishedWithChanges,
  MdNotificationsNone,
  MdSettings,
} from "react-icons/md";

import { authApi } from "../../services/authApi";
import kafeeliLogo from "../../assets/kafeeli-logo.png";

function Sidebar({ openSidebar, setOpenSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const menuItems = [
    {
      title: "نظرة عامة",
      icon: <MdDashboard />,
      path: "/main",
    },
    {
      title: "الملف الشخصي",
      icon: <MdPerson />,
      path: "/sponsorProfile",
    },
    {
      title: "الوثائق",
      icon: <MdDescription />,
      path: "/documents",
    },
    {
      title: "العائلات",
      icon: <MdFamilyRestroom />,
      path: "/familiesSponsor",
    },
    {
      title: "الأيتام",
      icon: <MdPublishedWithChanges />,
      path: "/orphans",
    },
    {
      title: "المحفظة",
      icon: <MdAccountBalanceWallet />,
      path: "/wallet",
    },
    {
      title: "المدفوعات",
      icon: <MdPayments />,
      path: "/payments",
    },
    {
      title: "التحديثات الدورية",
      icon: <MdNotificationsNone />,
      path: "/updates",
    },
    {
      title: "التنبيهات",
      icon: <MdNotificationsNone />,
      path: "/notifications",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const itemClasses = (active) => `
    w-full min-h-[48px] py-3
    flex items-center gap-3
    px-4
    rounded-xl
    font-[Cairo]
    text-[14px]
    leading-6
    transition-all duration-200
    cursor-pointer
    shrink-0
    ${
      active
        ? "bg-[#47DBE0] text-[#003469] font-bold shadow-md"
        : "text-white/90 hover:bg-white/10 hover:text-white"
    }
  `;

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const refreshToken = localStorage.getItem("refreshToken");

    try {
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch (error) {
      console.error(
        "Logout API call failed, clearing session locally anyway:",
        error
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      setOpenSidebar(false);
      setLoggingOut(false);

      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 right-0 z-50
          w-[85vw] max-w-[256px]
          sm:w-[240px] lg:w-[256px]
          h-screen h-[100dvh]
          bg-[#003469]
          border-l border-[#C2C6D2]
          flex flex-col
          py-3 sm:py-4
          overflow-hidden
          transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="lg:hidden flex justify-start px-3 sm:px-4 mb-1 shrink-0">
          <button
            type="button"
            onClick={() => setOpenSidebar(false)}
            className="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center text-white"
          >
            <MdClose />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-3 shrink-0">
          <div className="text-center mb-2">
            <div className="w-[100px] h-[100px] bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center ">
              <img
                src={kafeeliLogo}
                alt="كفيلي"
                className="w-[140px] h-[140px] object-contain mt-2 scale-[1.4]"
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

        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/40">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              onClick={() => setOpenSidebar(false)}
              className={itemClasses(isActive(item.path))}
            >
              <span
                className={`text-[18px] flex items-center ${
                  isActive(item.path)
                    ? "text-[#003469]"
                    : "text-white/85"
                }`}
              >
                {item.icon}
              </span>

              <span className="flex-1 text-right">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-3 sm:px-4 pb-2 shrink-0">
          <div className="border-t border-white/20 pt-3">
            <Link
              to="/sponsor-settings"
              onClick={() => setOpenSidebar(false)}
              className={itemClasses(isActive("/sponsor-settings"))}
            >
              <span className="text-[18px] flex items-center text-white/85">
                <MdSettings />
              </span>

              <span className="flex-1 text-right">الإعدادات</span>
            </Link>
          </div>

          <div className="border-t border-white/20 mt-2 pt-2">
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full h-6 flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 rounded-[8px] font-[Cairo] text-[11px] sm:text-[12px] lg:text-[13px] leading-[18px] text-white/85 font-normal text-right hover:bg-red-500/10 hover:text-red-400 transition cursor-pointer shrink-0 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="text-[15px] sm:text-[16px] lg:text-[18px] flex items-center shrink-0">
                <MdLogout />
              </span>

              <span>
                {loggingOut ? "جارٍ تسجيل الخروج..." : "تسجيل الخروج"}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;