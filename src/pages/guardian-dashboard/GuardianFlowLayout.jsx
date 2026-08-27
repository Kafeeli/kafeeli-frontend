import { useState } from "react";
import Sidebar from "./Sidebar";
import AuthenticatedHeader from "../../components/layout/AuthenticatedHeader";
import AuthenticatedFooter from "../../components/layout/AuthenticatedFooter";

export default function GuardianFlowLayout({ title, description, actions, children }) {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 font-[Cairo]">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="min-h-screen lg:mr-64">
        <AuthenticatedHeader title={title} description={description} actions={actions} onMenuClick={() => setOpenSidebar(true)} />
        <main className="mx-auto max-w-6xl p-4 md:p-6">{children}</main>
        <AuthenticatedFooter />
      </div>
    </div>
  );
}
