import { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function SponsorFlowLayout({ title, description, backTo, children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 font-[Cairo]">
      <Sidebar openSidebar={isSidebarOpen} setOpenSidebar={setIsSidebarOpen} />
      <div className="min-w-0 flex-1 lg:mr-64">
        <header className="border-b border-gray-200 bg-white px-4 py-4 md:px-6">
          <div className="mx-auto flex max-w-6xl items-center gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="فتح القائمة"
              className="rounded-lg p-2 text-[#003469] hover:bg-gray-100 lg:hidden"
            >
              <FiAlignJustify className="text-xl" />
            </button>
            {backTo && (
              <button
                type="button"
                onClick={() => navigate(backTo)}
                aria-label="العودة"
                className="rounded-lg p-2 text-[#003469] hover:bg-gray-100"
              >
                <MdArrowForward className="text-xl" />
              </button>
            )}
            <div>
              <h1 className="text-xl font-extrabold text-[#003469] md:text-2xl">{title}</h1>
              {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
