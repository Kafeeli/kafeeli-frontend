import { useState } from "react";
import Sidebar from "./Sidebar";
import AuthenticatedHeader from "../../components/layout/AuthenticatedHeader";
import AuthenticatedFooter from "../../components/layout/AuthenticatedFooter";

export default function SponsorFlowLayout({
  title,
  description,
  backTo,
  children,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 font-[Cairo]">
      <Sidebar
        openSidebar={isSidebarOpen}
        setOpenSidebar={setIsSidebarOpen}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:mr-64">
        <AuthenticatedHeader
          title={title}
          description={description}
          backTo={backTo}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="mx-auto w-full max-w-6xl flex-1 p-4 md:p-6">
          {children}
        </main>

        <AuthenticatedFooter />
      </div>
    </div>
  );
}