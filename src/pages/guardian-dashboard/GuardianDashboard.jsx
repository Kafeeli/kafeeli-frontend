import { useState } from "react";
import { FiAlertCircle, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { MdDescription, MdFamilyRestroom, MdVerifiedUser } from "react-icons/md";
import Sidebar from "./Sidebar";
import useDashboard from "../../hooks/useDashboard";
import AuthenticatedHeader from "../../components/layout/AuthenticatedHeader";
import AuthenticatedFooter from "../../components/layout/AuthenticatedFooter";
import { localizeStatus } from "../../utils/localization";

function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-xl border border-[#C2C6D2] bg-white p-5">
      <div className="mb-4 text-2xl text-[#0D4B8E]">{icon}</div>
      <p className="text-2xl font-extrabold text-[#003469]">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{label}</p>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });
}

export default function GuardianDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, loading, error, retry } = useDashboard();

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <Sidebar openSidebar={sidebarOpen} setOpenSidebar={setSidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col lg:mr-64">
        <AuthenticatedHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6">
          <h1 className="text-2xl font-extrabold text-[#003469]">نظرة عامة</h1>
          {loading && <div className="mt-6 rounded-xl border bg-white p-10 text-center text-gray-500">جارٍ تحميل لوحة التحكم...</div>}
          {!loading && error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700"><FiAlertCircle className="mx-auto mb-3 text-3xl" /><p>{error}</p><button type="button" onClick={retry} className="mt-4 rounded-lg bg-[#003469] px-5 py-2 font-bold text-white">إعادة المحاولة</button></div>}
          {!loading && !error && data && (
            <>
              {data.nextRequiredActionMessage && <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><p className="font-bold">الإجراء التالي</p><p className="mt-1 text-sm">{data.nextRequiredActionMessage}</p></div>}
              <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {data.verificationStatus && <StatCard icon={<MdVerifiedUser />} label="حالة التحقق" value={localizeStatus(data.verificationStatus)} />}
                {data.documentsUploadedCount != null && <StatCard icon={<MdDescription />} label="الوثائق المرفوعة" value={data.documentsUploadedCount} />}
                {data.pendingDocumentsCount != null && <StatCard icon={<FiCalendar />} label="الوثائق قيد المراجعة" value={data.pendingDocumentsCount} />}
                {data.approvedDocumentsCount != null && <StatCard icon={<FiCheckCircle />} label="الوثائق المقبولة" value={data.approvedDocumentsCount} />}
                {data.rejectedDocumentsCount != null && <StatCard icon={<FiAlertCircle />} label="الوثائق المرفوضة" value={data.rejectedDocumentsCount} />}
                {data.familiesCount != null && <StatCard icon={<MdFamilyRestroom />} label="العائلات" value={data.familiesCount} />}
              </section>
              <section className="mt-6 rounded-xl border border-[#C2C6D2] bg-white p-5">
                <h2 className="font-bold text-[#003469]">حالة الحساب</h2>
                <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div><dt className="text-gray-500">البريد الإلكتروني</dt><dd className="mt-1 font-bold">{data.emailConfirmed ? "مؤكد" : "غير مؤكد"}</dd></div>
                  <div><dt className="text-gray-500">الحساب</dt><dd className="mt-1 font-bold">{data.isActive ? "نشط" : "غير نشط"}</dd></div>
                  <div><dt className="text-gray-500">اكتمال الملف الشخصي</dt><dd className="mt-1 font-bold">{data.profileCompletionPercentage}%</dd></div>
                  <div><dt className="text-gray-500">تاريخ الانضمام</dt><dd className="mt-1 font-bold">{formatDate(data.joinedAt)}</dd></div>
                  {data.canManageFamilies != null && <div><dt className="text-gray-500">إدارة العائلات</dt><dd className="mt-1 font-bold">{data.canManageFamilies ? "متاحة" : "غير متاحة حالياً"}</dd></div>}
                </dl>
              </section>
            </>
          )}
        </main>
        <AuthenticatedFooter />
      </div>
    </div>
  );
}
