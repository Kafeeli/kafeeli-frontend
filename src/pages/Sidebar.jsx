import React, { useState, useEffect } from 'react';
import { FiX, FiSettings, FiLogOut } from 'react-icons/fi';

const sidebarItems = [
  { icon: 'fa-th-large', label: 'لوحة المراجعة', active: true },
  { icon: 'fa-id-card', label: 'الأوصياء', active: false },
  { icon: 'fa-hand-holding-heart', label: 'الكفلاء', active: false },
  { icon: 'fa-users', label: 'العائلات', active: false },
  { icon: 'fa-smile', label: 'الأيتام', active: false },
  { icon: 'fa-layer-group', label: 'المجموعات', active: false },
  { icon: 'fa-clock', label: 'التحديثات الدورية', active: false },
  { icon: 'fa-calendar-check', label: 'سجلات المدير', active: false },
];

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* OVERLAY - للموبايل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* HAMBURGER BUTTON - على اليمين */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 p-2 bg-white shadow-md rounded-lg lg:hidden"
      >
        <i className="fas fa-bars text-xl text-[#1e3a5f]"></i>
      </button>

      {/* DESKTOP SIDEBAR - ثابت على اليمين */}
      <aside className="hidden lg:flex w-64 h-screen flex-col bg-[#F9FAFB] border-l border-[#E5E7EB] flex-shrink-0">
        <SidebarContent onClose={null} />
      </aside>

      {/* MOBILE DRAWER - يجي من اليمين */}
      <aside className={`
        fixed top-0 right-0 h-full w-80 bg-[#F9FAFB] z-50 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <SidebarContent onClose={closeSidebar} />
      </aside>
    </>
  );
}

// ===== محتوى السايد بار (مشترك) =====
function SidebarContent({ onClose }) {
  return (
    <>
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

        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
          <i className="fas fa-hand-holding-heart text-3xl text-[#1e3a5f]"></i>
        </div>
        <h2 className="text-xl font-bold text-[#1e3a5f]">Kafeeli</h2>
        <p className="text-xs text-gray-500 mt-1 text-center">كفيلي</p>
        <p className="text-sm text-gray-600 mt-1">لوحة الإدارة الذكية</p>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-hidden">
        {sidebarItems.map((item, index) => (
          <a
            key={index}
            href="#"
            onClick={onClose}
            className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-md text-sm font-bold transition cursor-pointer ${
              item.active
                ? "bg-[#7DDCE0] text-[#08386B]"
                : "text-gray-600 hover:bg-white hover:text-[#0D4B8E]"
            }`}
          >
            <i className={`fas ${item.icon} text-xl shrink-0`}></i>
            <span>{item.label}</span>
          </a>
        ))}
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
    </>
  );
}

export default Sidebar;