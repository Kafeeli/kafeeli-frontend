import { useState } from "react";
import { FiUser, FiMenu } from "react-icons/fi";
import Sidebar from "./sideBar";
export default function AdminLayout({
  children,
  title = "اهلاً بك Admin في لوحة التحكم",
  fullName,
  role,
  profileImageUrl,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]" dir="rtl">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-4 sm:h-20 sm:px-6">
          <button
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full hover:bg-gray-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="فتح القائمة"
          >
            <FiMenu className="text-xl text-[#0D4B8E]" />
          </button>

          <h2 className="truncate text-[12px] font-bold text-[#0D4B8E] sm:text-lg">
            {title}
          </h2>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">{fullName || "لوحة الإدارة"}</p>
              {role && <p className="text-xs text-gray-500">{role}</p>}
            </div>
            {profileImageUrl ? <img src={profileImageUrl} alt="الصورة الشخصية" className="h-9 w-9 rounded-full border border-[#0D4B8E] object-cover" /> : <div className="grid h-8 w-8 place-items-center rounded-full border border-[#0D4B8E] sm:h-9 sm:w-9"><FiUser /></div>}
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
