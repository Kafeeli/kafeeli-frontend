import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { emptyPagedData, normalizePagedData } from "../../utils/adminPagination";
import { formatArabicDateTime } from "../../utils/date";
import AdminLayout from "./Adminlayout";
import AdminPagination from "./AdminPagination";
import { EmptyState, ErrorState, LoadingState } from "./Adminstates";

const initialFilters = {
  adminId: "",
  actionType: "",
  targetType: "",
  targetId: "",
  createdFrom: "",
  createdTo: "",
};

export default function AdminAuditLogsPage() {
  const [searchInput, setSearchInput] = useState("");
  const search = useDebouncedValue(searchInput.trim());
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pagination, setPagination] = useState(emptyPagedData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async ({ silent = false } = {}) => {
    if (silent) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const query = { page, pageSize, search, ...filters };
      const data = unwrapResult(
        await adminApi.getAuditLogs(query),
        "تعذر تحميل سجلات التدقيق.",
      );
      setPagination(normalizePagedData(data, query));
    } catch (requestError) {
      if (requestError?.response?.status === 403) {
        setError("هذه الصفحة متاحة للمشرف العام فقط.");
      } else {
        setError(apiErrorMessage(requestError, "تعذر تحميل سجلات التدقيق."));
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, page, pageSize, search]);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const updateFilter = (name, value) => {
    setPage(1);
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const hasActiveFilters = Boolean(searchInput.trim() || Object.values(filters).some(Boolean));
  const clearFilters = () => {
    setSearchInput("");
    setFilters(initialFilters);
    setPage(1);
  };

  return (
    <AdminLayout title="سجلات التدقيق">
      <div className="space-y-5" dir="rtl">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#003469]">سجلات التدقيق</h1>
            <p className="mt-1 text-sm text-gray-500">سجل للقراءة فقط يعرض أحدث إجراءات المشرفين أولاً.</p>
          </div>
          <button type="button" onClick={() => load({ silent: true })} disabled={loading || refreshing} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-[#0D4B8E] disabled:opacity-50">
            <FiRefreshCw className={refreshing ? "animate-spin" : ""} /> تحديث
          </button>
        </div>

        <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="relative sm:col-span-2"><span className="sr-only">البحث في السجلات</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchInput} onChange={(event) => { setSearchInput(event.target.value); setPage(1); }} placeholder="ابحث في الاسم أو البريد أو التفاصيل" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm" /></label>
          <input value={filters.adminId} onChange={(event) => updateFilter("adminId", event.target.value)} placeholder="معرّف المشرف" aria-label="معرّف المشرف" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" dir="ltr" />
          <input value={filters.actionType} onChange={(event) => updateFilter("actionType", event.target.value)} placeholder="نوع العملية" aria-label="نوع العملية" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
          <input value={filters.targetType} onChange={(event) => updateFilter("targetType", event.target.value)} placeholder="نوع الهدف" aria-label="نوع الهدف" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
          <input value={filters.targetId} onChange={(event) => updateFilter("targetId", event.target.value)} placeholder="معرّف الهدف" aria-label="معرّف الهدف" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" dir="ltr" />
          <label className="text-xs font-bold text-gray-600">من تاريخ<input type="datetime-local" value={filters.createdFrom} onChange={(event) => updateFilter("createdFrom", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
          <label className="text-xs font-bold text-gray-600">إلى تاريخ<input type="datetime-local" value={filters.createdTo} onChange={(event) => updateFilter("createdTo", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
          {hasActiveFilters && <button type="button" onClick={clearFilters} className="rounded-lg px-3 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50">مسح الفلاتر</button>}
        </div>

        {loading ? <LoadingState /> : error ? <ErrorState onRetry={load} description={error} /> : pagination.items.length === 0 ? (
          <EmptyState icon={hasActiveFilters ? FiSearch : TbReportAnalytics} title={hasActiveFilters ? "لا توجد نتائج تطابق هذه الفلاتر" : "لا توجد سجلات تدقيق"} description={hasActiveFilters ? "جرّب تعديل البحث أو الفلاتر المحددة." : "لم يسجل الخادم أي إجراءات إدارية حتى الآن."} />
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-right text-xs">
                <thead className="bg-[#F5F7FA] text-[#374151]"><tr>{["المشرف", "البريد الإلكتروني", "العملية", "نوع الهدف", "معرّف الهدف", "التفاصيل", "التاريخ"].map((label) => <th key={label} className="whitespace-nowrap px-3 py-3 font-extrabold">{label}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-100">{pagination.items.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/70">
                    <td className="max-w-[150px] truncate px-3 py-3 font-bold text-[#003469]">{log.adminName || "—"}</td>
                    <td className="max-w-[210px] truncate px-3 py-3" dir="ltr">{log.adminEmail || "—"}</td>
                    <td className="whitespace-nowrap px-3 py-3">{log.actionType || "—"}</td>
                    <td className="whitespace-nowrap px-3 py-3">{log.targetType || "—"}</td>
                    <td className="max-w-[190px] break-all px-3 py-3 font-mono text-[11px]" dir="ltr">{log.targetId || "—"}</td>
                    <td title={log.description || undefined} className="max-w-[280px] truncate px-3 py-3">{log.description || "—"}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-600">{formatArabicDateTime(log.createdAt)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && <AdminPagination pagination={pagination} onPageChange={setPage} onPageSizeChange={(value) => { setPageSize(value); setPage(1); }} />}
      </div>
    </AdminLayout>
  );
}
