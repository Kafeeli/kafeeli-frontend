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

import kafeeliLogo from "../assets/kafeeli-removebg-preview1.png";

function Sidebar({ openSidebar, setOpenSidebar, activeItem = "ملفي الشخصي" }) {
  const menuItems = [
    {
      title: "لوحة التحكم",
      icon: <MdDashboard />,
    },
    {
      title: "ملفي الشخصي",
      icon: <MdPerson />,
    },
    {
      title: "وثائقي",
      icon: <MdDescription />,
    },
    {
      title: "العائلات",
      icon: <MdFamilyRestroom />,
    },
    {
      title: "الأيتام",
      icon: <MdPerson />,
    },
    {
      title: "المحفظة",
      icon: <MdAccountBalanceWallet />,
    },
    {
      title: "المدفوعات",
      icon: <MdPayments />,
    },
    {
      title: "التحديثات الدورية",
      icon: <MdPublishedWithChanges />,
    },
    {
      title: "التنبيهات",
      icon: <MdNotificationsNone />,
    },
    {
      title: "الإعدادات",
      icon: <MdSettings />,
    },
  ];

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
          w-[256px] h-screen
          bg-[#003469]
          border-l border-[#C2C6D2]
          flex flex-col
          pt-4 pb-5
           overflow-y-hidden overflow-x-hidden
          transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Close button - Mobile */}
        <div className="lg:hidden flex justify-start px-4 mb-4">
          <button
            onClick={() => setOpenSidebar(false)}
            className="w-9 h-9 rounded-lg border border-white/30 flex items-center justify-center text-white cursor-pointer"
          >
            <MdClose className="text-xl" />
          </button>
        </div>

        {/* Top Content */}
        <div className="flex flex-col gap-0">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center px-4 -mt-2">
            <div className="w-[72px] h-[72px] rounded-full bg-white/15 flex items-center justify-center mb-5">
              <img
                src={kafeeliLogo}
                alt="Kafeeli Logo"
                className="w-[90px] h-[90px] object-contain"
              />
            </div>

            <div className="w-fit h-auto flex flex-col items-center justify-center gap-5 text-center">
              <h2 className="font-[Cairo] font-bold text-[23px] leading-[3px] tracking-[0px] text-center text-[#FFDEAA]">
                كفيلي
              </h2>

              <p className="font-[Cairo] font-normal text-[14px] leading-[16px] tracking-[0px] text-center text-[#e6ecf7] whitespace-nowrap">
                لوحة الإدارة الذكية
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="px-4 flex-1 mt-2">
            <hr className="border-white/25 mb-2" />

            <div className="space-y-[0px]">
              {menuItems.map((item) => {
                const isActive = activeItem === item.title;

                return (
                  <button
                    key={item.title}
                    onClick={() => setOpenSidebar(false)}
                    className={`
                      w-full h-[27px]
                      flex items-center gap-3
                      px-3 rounded-[6px]
                      font-[Cairo] text-[12px] leading-[20px]
                      text-right transition cursor-pointer
                      ${
                        isActive
                          ? "bg-[#47DBE0] text-[#003469] font-bold"
                          : "text-white/85 font-normal hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-[16px] flex items-center shrink-0
                        ${isActive ? "text-[#003469]" : "text-white/85"}
                      `}
                    >
                      {item.icon}
                    </span>

                    <span className="truncate">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Logout */}
        <div className="mt-2 border-t border-white/25 px-4 pt-4">
          <button className="w-full h-[25px] flex items-center gap-3 px-3 rounded-[6px] font-[Cairo] text-[12px] leading-[20px] text-white/90 hover:bg-white/10 transition cursor-pointer">
            <MdLogout className="text-[15px]" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
