import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Sidebar from "./Sidebar";

export default function GuardianFlowLayout({ title, description, actions, children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-[Cairo]">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="min-h-screen lg:mr-64">
        <header className="border-b border-gray-200 bg-white px-4 py-4 md:px-6">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <div className="flex items-center gap-3"><button type="button" onClick={() => setOpenSidebar(true)} aria-label="فتح القائمة" className="rounded-lg p-2 text-[#003469] lg:hidden"><MdMenu className="text-2xl" /></button><div><h1 className="text-xl font-extrabold text-[#003469] md:text-2xl">{title}</h1>{description && <p className="mt-1 text-sm text-gray-500">{description}</p>}</div></div>
            {actions}
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
