import { useCallback, useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdOutlineVolunteerActivism } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatArabicDateTime } from "../../utils/date";
import AdminLayout from "./Adminlayout";
import { EmptyState, ErrorState, LoadingState, MiniStatCard } from "./Adminstates";

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = unwrapResult(
        await adminApi.getAllSponsors(),
        "تعذر تحميل قائمة الكفلاء.",
      );
      setSponsors(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل قائمة الكفلاء."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const filteredSponsors = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return sponsors;
    return sponsors.filter((sponsor) =>
      [sponsor.fullName, sponsor.email, sponsor.phoneNumber, sponsor.city, sponsor.sponsorId]
        .some((value) => String(value || "").toLowerCase().includes(query)),
    );
  }, [searchTerm, sponsors]);

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (sponsors.length === 0) {
    content = <EmptyState icon={MdOutlineVolunteerActivism} title="لا يوجد كفلاء" description="لم يُرجع الخادم أي حسابات كفلاء حتى الآن." />;
  } else if (filteredSponsors.length === 0) {
    content = <EmptyState icon={FiSearch} title="لا توجد نتائج مطابقة" description="جرّب تعديل عبارة البحث." />;
  } else {
    content = (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right text-sm">
            <thead className="bg-[#F5F7FA] text-[#374151]"><tr><th className="px-4 py-3 font-extrabold">الاسم</th><th className="px-4 py-3 font-extrabold">البريد الإلكتروني</th><th className="px-4 py-3 font-extrabold">رقم الهاتف</th><th className="px-4 py-3 font-extrabold">المدينة</th><th className="px-4 py-3 font-extrabold">الدولة</th><th className="px-4 py-3 font-extrabold">تاريخ الانضمام</th><th className="px-4 py-3 font-extrabold">عدد الكفالات</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSponsors.map((sponsor) => (
                <tr key={sponsor.sponsorId} className="hover:bg-gray-50/70"><td className="px-4 py-4 font-bold text-[#003469]">{sponsor.fullName || "—"}</td><td className="px-4 py-4 text-gray-600">{sponsor.email || "—"}</td><td dir="ltr" className="px-4 py-4 text-right text-gray-600">{sponsor.phoneNumber || "—"}</td><td className="px-4 py-4">{sponsor.city || "—"}</td><td className="px-4 py-4">{sponsor.country || "—"}</td><td className="whitespace-nowrap px-4 py-4 text-gray-600">{formatArabicDateTime(sponsor.joinedAt)}</td><td className="px-4 py-4 font-extrabold text-[#0D4B8E]">{sponsor.totalSponsorships ?? 0}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="الكفلاء">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6"><h1 className="text-2xl font-extrabold text-[#003469]">الكفلاء</h1><p className="mt-1 text-sm text-gray-500">عرض حسابات الكفلاء وعدد الكفالات المسجل من الخادم.</p></div>
        <div className="mb-5 max-w-sm"><MiniStatCard label="إجمالي الكفلاء" value={sponsors.length} icon={MdOutlineVolunteerActivism} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4"><label className="relative block"><span className="sr-only">البحث في الكفلاء</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو البريد أو الهاتف أو المدينة" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label></div>
        <p className="mb-3 text-sm font-bold text-gray-600">النتائج: {filteredSponsors.length}</p>
        {content}
      </div>
    </AdminLayout>
  );
}
