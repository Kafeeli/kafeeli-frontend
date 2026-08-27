import { FiAlertCircle, FiCheckCircle, FiClock, FiFileText, FiUsers } from "react-icons/fi";
import AdminLayout from "./Adminlayout";
import useDashboard from "../../hooks/useDashboard";
import { localizeRole } from "../../utils/localization";

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-xl border border-[#C2C6D2] bg-white p-5 shadow-sm">
      <div className="mb-4 text-2xl text-[#0D4B8E]">{icon}</div>
      <p className="text-3xl font-extrabold text-[#003469]">{value}</p>
      <p className="mt-1 text-sm text-gray-500">{title}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const { data, loading, error, retry } = useDashboard();

  return (
    <AdminLayout>
      <h1 className="text-xl font-extrabold text-[#0D4B8E] sm:text-2xl">نظرة عامة على النظام</h1>
      {loading && <div className="mt-6 rounded-xl border bg-white p-10 text-center text-gray-500">جارٍ تحميل لوحة التحكم...</div>}
      {!loading && error && <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700"><FiAlertCircle className="mx-auto mb-3 text-3xl" /><p>{error}</p><button type="button" onClick={retry} className="mt-4 rounded-lg bg-[#0D4B8E] px-5 py-2 font-bold text-white">إعادة المحاولة</button></div>}
      {!loading && !error && data && (
        <>
          {data.nextRequiredActionMessage && <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><p className="font-bold">الإجراء التالي</p><p className="mt-1 text-sm">{data.nextRequiredActionMessage}</p></div>}
          <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data.pendingGuardianDocumentsCount != null && <StatCard icon={<FiFileText />} title="وثائق الأوصياء قيد المراجعة" value={data.pendingGuardianDocumentsCount} />}
            {data.pendingGuardianVerificationCount != null && <StatCard icon={<FiUsers />} title="ملفات الأوصياء قيد التحقق" value={data.pendingGuardianVerificationCount} />}
            {data.pendingFamiliesCount != null && <StatCard icon={<FiClock />} title="العائلات قيد المراجعة" value={data.pendingFamiliesCount} />}
          </section>
          <section className="mt-6 rounded-xl border border-[#C2C6D2] bg-white p-5">
            <h2 className="font-bold text-[#0D4B8E]">حالة الحساب الإداري</h2>
            <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
              <div><dt className="text-gray-500">نوع الحساب</dt><dd className="mt-1 font-bold">{localizeRole(data.role) || "—"}</dd></div>
              <div><dt className="text-gray-500">حالة الحساب</dt><dd className="mt-1 flex items-center gap-2 font-bold"><FiCheckCircle className={data.isActive ? "text-green-600" : "text-gray-400"} />{data.isActive ? "نشط" : "غير نشط"}</dd></div>
              <div><dt className="text-gray-500">اكتمال الملف الشخصي</dt><dd className="mt-1 font-bold">{data.profileCompletionPercentage}%</dd></div>
            </dl>
          </section>
        </>
      )}
    </AdminLayout>
  );
}
