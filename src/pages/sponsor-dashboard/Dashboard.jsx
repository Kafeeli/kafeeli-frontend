import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaHandHoldingHeart, FaShieldAlt, FaUserTie } from "react-icons/fa";
import { FiAlertCircle, FiEye } from "react-icons/fi";
import Sidebar from "./Sidebar";
import { sponsorshipApi } from "../../services/sponsorshipApi";
import useDashboard from "../../hooks/useDashboard";
import { formatAmount, formatDate, getApiErrorMessage, getResultData } from "./sponsorFlowUtils";
import AuthenticatedHeader from "../../components/layout/AuthenticatedHeader";
import AuthenticatedFooter from "../../components/layout/AuthenticatedFooter";
import { localizeStatus } from "../../utils/localization";

function AccountCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-5">
      <div className="grid h-12 w-12 place-items-center rounded-full bg-blue-50 text-xl text-[#0D4B8E]">{icon}</div>
      <div><p className="text-sm text-gray-500">{label}</p><p className="mt-1 font-bold text-[#003469]">{value}</p></div>
    </div>
  );
}

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sponsorships, setSponsorships] = useState([]);
  const [sponsorshipsLoading, setSponsorshipsLoading] = useState(true);
  const [sponsorshipsError, setSponsorshipsError] = useState("");
  const { data, loading, error, retry } = useDashboard();

  const loadSponsorships = useCallback(async () => {
    setSponsorshipsLoading(true);
    setSponsorshipsError("");
    try {
      const result = await sponsorshipApi.getMine();
      const sponsorshipData = getResultData(result, "تعذر تحميل الكفالات.");
      setSponsorships(Array.isArray(sponsorshipData?.sponsorships) ? sponsorshipData.sponsorships : []);
    } catch (requestError) {
      setSponsorshipsError(getApiErrorMessage(requestError, "تعذر تحميل الكفالات."));
    } finally {
      setSponsorshipsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadSponsorships, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadSponsorships]);

  return (
    <div className="flex min-h-screen bg-gray-50" dir="rtl">
      <Sidebar activeItem="نظرة عامة" openSidebar={isSidebarOpen} setOpenSidebar={setIsSidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col lg:mr-64">
        <AuthenticatedHeader onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 space-y-6 p-4 sm:p-6">
          <h1 className="text-2xl font-extrabold text-[#003469]">نظرة عامة</h1>
          {loading && <div className="rounded-xl border bg-white p-10 text-center text-gray-500">جارٍ تحميل لوحة التحكم...</div>}
          {!loading && error && <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700"><FiAlertCircle className="mx-auto mb-3 text-3xl" /><p>{error}</p><button type="button" onClick={retry} className="mt-4 rounded-lg bg-[#003469] px-5 py-2 font-bold text-white">إعادة المحاولة</button></div>}
          {!loading && !error && data && (
            <>
              {data.nextRequiredActionMessage && <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><p className="font-bold">الإجراء التالي</p><p className="mt-1 text-sm">{data.nextRequiredActionMessage}</p></div>}
              <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <AccountCard icon={<FaEnvelope />} label="حالة البريد" value={data.emailConfirmed ? "مؤكد" : "غير مؤكد"} />
                <AccountCard icon={<FaShieldAlt />} label="حالة الحساب" value={data.isActive ? "نشط" : "غير نشط"} />
                <AccountCard icon={<FaUserTie />} label="اكتمال الملف الشخصي" value={`${data.profileCompletionPercentage}%`} />
              </section>
              {data.activeFamiliesAvailableCount != null && (
                <section className="rounded-xl border border-[#C2C6D2] bg-white p-5">
                  <FaHandHoldingHeart className="mb-3 text-2xl text-[#0D4B8E]" />
                  <p className="text-3xl font-extrabold text-[#003469]">{data.activeFamiliesAvailableCount}</p>
                  <p className="mt-1 text-sm text-gray-500">العائلات النشطة المتاحة</p>
                  <Link to="/sponsor/families" className="mt-4 inline-block font-bold text-[#0F7F8C] hover:underline">تصفح العائلات</Link>
                </section>
              )}
            </>
          )}

          <section className="overflow-hidden rounded-xl border border-[#C2C6D2] bg-white">
            <div className="flex items-center justify-between px-4 py-3"><h2 className="font-bold text-gray-800">أحدث كفالاتي</h2><Link to="/sponsor/sponsorships" className="text-sm font-bold text-[#0F7F8C] hover:underline">عرض الكل</Link></div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead><tr className="bg-[#F5F6F8] text-xs text-gray-600"><th className="px-4 py-3 text-right">المستفيد</th><th className="px-4 py-3 text-right">نوع الكفالة</th><th className="px-4 py-3 text-right">الحالة</th><th className="px-4 py-3 text-right">الإجمالي</th><th className="px-4 py-3 text-right">تاريخ الإنشاء</th><th className="px-4 py-3 text-right">الإجراء</th></tr></thead>
                <tbody>
                  {sponsorships.slice(0, 5).map((row) => (
                    <tr key={row.sponsorshipId} className="border-b border-gray-200 last:border-0">
                      <td className="whitespace-nowrap px-4 py-3 font-bold text-gray-800">{row.targetDisplayName || "—"}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{row.targetType || "—"}</td>
                      <td className="whitespace-nowrap px-4 py-3"><span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs text-[#0D4B8E]">{localizeStatus(row.statusLabel || row.status)}</span></td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatAmount(row.totalAmount)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">{formatDate(row.createdAt)}</td>
                      <td className="whitespace-nowrap px-4 py-3"><Link to={`/sponsor/sponsorships/${row.sponsorshipId}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#0F7F8C] hover:underline">التفاصيل <FiEye /></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {sponsorshipsLoading && <p className="p-6 text-center text-sm text-gray-500">جارٍ تحميل الكفالات...</p>}
              {!sponsorshipsLoading && sponsorshipsError && <div className="p-6 text-center text-sm text-red-600"><p>{sponsorshipsError}</p><button type="button" onClick={loadSponsorships} className="mt-2 font-bold text-[#0F7F8C] hover:underline">إعادة المحاولة</button></div>}
              {!sponsorshipsLoading && !sponsorshipsError && sponsorships.length === 0 && <p className="p-6 text-center text-sm text-gray-500">لا توجد كفالات حتى الآن.</p>}
            </div>
          </section>
        </main>
        <AuthenticatedFooter />
      </div>
    </div>
  );
}
