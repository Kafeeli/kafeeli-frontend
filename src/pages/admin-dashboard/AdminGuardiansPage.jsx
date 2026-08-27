import { useCallback, useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatArabicDateTime } from "../../utils/date";
import { localizeStatus, localizeVerificationStatus } from "../../utils/localization";
import AdminLayout from "./Adminlayout";
import { EmptyState, ErrorState, LoadingState, MiniStatCard } from "./Adminstates";

const VERIFICATION_FILTERS = [
  { value: "all", label: "كل حالات التحقق" },
  { value: "Pending", label: "قيد المراجعة" },
  { value: "Approved", label: "موثق" },
  { value: "Rejected", label: "مرفوض" },
  { value: "NeedsUpdate", label: "يحتاج تحديث" },
  { value: "Suspended", label: "معلق" },
];

export default function AdminGuardiansPage() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = unwrapResult(
        await adminApi.getAllGuardians(),
        "تعذر تحميل قائمة الأوصياء.",
      );
      setGuardians(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل قائمة الأوصياء."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const filteredGuardians = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return guardians.filter((guardian) => {
      const matchesStatus =
        verificationFilter === "all" ||
        guardian.verificationStatus === verificationFilter;
      const matchesSearch =
        !query ||
        [
          guardian.fullName,
          guardian.email,
          guardian.phoneNumber,
          guardian.city,
          guardian.guardianId,
        ].some((value) => String(value || "").toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [guardians, searchTerm, verificationFilter]);

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (guardians.length === 0) {
    content = <EmptyState icon={HiOutlineIdentification} title="لا يوجد أوصياء" description="لم يُرجع الخادم أي حسابات أوصياء حتى الآن." />;
  } else if (filteredGuardians.length === 0) {
    content = <EmptyState icon={FiSearch} title="لا توجد نتائج مطابقة" description="جرّب تعديل عبارة البحث أو حالة التحقق." />;
  } else {
    content = (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-right text-sm">
            <thead className="bg-[#F5F7FA] text-[#374151]">
              <tr>
                <th className="px-4 py-3 font-extrabold">الاسم</th>
                <th className="px-4 py-3 font-extrabold">البريد الإلكتروني</th>
                <th className="px-4 py-3 font-extrabold">رقم الهاتف</th>
                <th className="px-4 py-3 font-extrabold">المدينة</th>
                <th className="px-4 py-3 font-extrabold">الدولة</th>
                <th className="px-4 py-3 font-extrabold">حالة التحقق</th>
                <th className="px-4 py-3 font-extrabold">حالة العائلة</th>
                <th className="px-4 py-3 font-extrabold">تاريخ الانضمام</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuardians.map((guardian) => (
                <tr key={guardian.guardianId} className="hover:bg-gray-50/70">
                  <td className="px-4 py-4 font-bold text-[#003469]">{guardian.fullName || "—"}</td>
                  <td className="px-4 py-4 text-gray-600">{guardian.email || "—"}</td>
                  <td dir="ltr" className="px-4 py-4 text-right text-gray-600">{guardian.phoneNumber || "—"}</td>
                  <td className="px-4 py-4">{guardian.city || "—"}</td>
                  <td className="px-4 py-4">{guardian.country || "—"}</td>
                  <td className="px-4 py-4"><span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs font-bold text-[#0D4B8E]">{localizeVerificationStatus(guardian.verificationStatus)}</span></td>
                  <td className="px-4 py-4">{guardian.hasFamily ? localizeStatus(guardian.familyStatus) : "لا توجد عائلة"}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-gray-600">{formatArabicDateTime(guardian.joinedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="الأوصياء">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div><h1 className="text-2xl font-extrabold text-[#003469]">الأوصياء</h1><p className="mt-1 text-sm text-gray-500">عرض حسابات الأوصياء وحالة التحقق والعائلة المرتبطة.</p></div>
          <Link to="/admin-dashboard/guardian-document-reviews" className="inline-flex items-center gap-2 rounded-lg bg-[#0D4B8E] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#003469]"><MdDescription />مراجعة وثائق الأوصياء</Link>
        </div>

        <div className="mb-5 max-w-sm"><MiniStatCard label="إجمالي الأوصياء" value={guardians.length} icon={HiOutlineIdentification} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>

        <div className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-[1fr_220px]">
          <label className="relative"><span className="sr-only">البحث في الأوصياء</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو البريد أو الهاتف أو المدينة" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label>
          <select value={verificationFilter} onChange={(event) => setVerificationFilter(event.target.value)} aria-label="تصفية حسب حالة التحقق" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0D4B8E]">{VERIFICATION_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select>
        </div>

        <p className="mb-3 text-sm font-bold text-gray-600">النتائج: {filteredGuardians.length}</p>
        {content}
      </div>
    </AdminLayout>
  );
}
