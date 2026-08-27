import { useState } from "react";
import Sidebar from "./sideBar";
import AuthenticatedHeader from "../../components/layout/AuthenticatedHeader";
import AuthenticatedFooter from "../../components/layout/AuthenticatedFooter";
export default function AdminLayout({
  children,
  title,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA]" dir="rtl">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-0 flex-1 flex-col min-w-0">
        <AuthenticatedHeader title={title} onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
        <AuthenticatedFooter />
      </div>
    </div>
  );
}
