import { FiX, FiSettings, FiLogOut } from "react-icons/fi";
import { FiClock } from "react-icons/fi";
import {
  HiOutlineIdentification,
} from "react-icons/hi2";
import {
  MdDashboard,
  MdOutlineFamilyRestroom,
  MdOutlineVolunteerActivism,
} from "react-icons/md";
import { PiBaby, PiMoneyWavy } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";

const sidebarItems = [
  { label: "لوحة المراجعة", icon: MdDashboard, active: true },
  { label: "الأوصياء", icon: HiOutlineIdentification },
  { label: "الكفلاء", icon: MdOutlineVolunteerActivism },
  { label: "العائلات", icon: MdOutlineFamilyRestroom },
  { label: "الأيتام", icon: PiBaby },
  { label: "المدفوعات", icon: PiMoneyWavy },
  { label: "التحديثات الدورية", icon: FiClock },
  { label: "سجلات المدير", icon: TbReportAnalytics },
];

function Sidebar({ onClose }) {
  return (
    <aside className="w-64 h-screen flex flex-col bg-[#F9FAFB] border-l border-[#E5E7EB]">
      
      {/* Logo */}
      <div className="flex flex-col items-center justify-center py-6 border-b border-[#E5E7EB] shrink-0 relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 left-3 grid h-8 w-8 place-items-center rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500 transition"
          >
            <FiX className="text-xl" />
          </button>
        )}
        <img
          src="/src/assets/mainLogo.png"
          className="h-24 sm:h-32 object-contain"
        />
        <p className="text-xs text-gray-500 mt-2 text-center">
          لوحة الإدارة الذكية
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-hidden">
        {sidebarItems.map(function(item) {
          return (
            <button
              key={item.label}
              onClick={onClose}
              className={item.active
                ? 'flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-bold transition cursor-pointer bg-[#7DDCE0] text-[#08386B]'
                : 'flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-bold transition cursor-pointer text-gray-600 hover:bg-white hover:text-[#0D4B8E]'
              }
            >
              <item.icon className="text-xl shrink-0" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[#E5E7EB] p-3 shrink-0">
        <button className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-600 hover:text-[#0D4B8E] hover:bg-white rounded-md transition cursor-pointer">
          <span>الإعدادات</span>
          <FiSettings />
        </button>
        <button className="flex items-center justify-between w-full px-4 py-2.5 mt-1 text-sm font-bold text-red-500 hover:bg-red-50 rounded-md transition cursor-pointer">
          <span>تسجيل الخروج</span>
          <FiLogOut className="text-base" />
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;