import { useCallback, useEffect, useState } from "react";
import { FiInfo, FiRefreshCw, FiSearch } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { adminApi } from "../../services/adminApi";
import {
  getAuditTargetTypeLabel,
  normalizeAdminAuditLog,
} from "../../types/adminAuditLog";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { emptyPagedData, normalizePagedData } from "../../utils/adminPagination";
import { formatArabicDateTime } from "../../utils/date";
import AdminLayout from "./Adminlayout";
import { AdminDetailItem, AdminDetailsSection, AdminDialog } from "./AdminManagementDialogs";
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
  const [selectedLog, setSelectedLog] = useState(null);
  const [actionOptions, setActionOptions] = useState({});
  const [targetTypeOptions, setTargetTypeOptions] = useState({});

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
      const normalizedPage = normalizePagedData(data, query);
      const items = normalizedPage.items.map(normalizeAdminAuditLog);

      setPagination({ ...normalizedPage, items });
      setActionOptions((current) => ({
        ...current,
        ...Object.fromEntries(items
          .filter((log) => log.action.code)
          .map((log) => [log.action.code, log.action.label || log.action.code])),
      }));
      setTargetTypeOptions((current) => ({
        ...current,
        ...Object.fromEntries(items
          .filter((log) => log.target.type)
          .map((log) => [log.target.type, getAuditTargetTypeLabel(log.target.type)])),
      }));
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
          <label className="relative sm:col-span-2"><span className="sr-only">البحث في السجلات</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchInput} onChange={(event) => { setSearchInput(event.target.value); setPage(1); }} placeholder="ابحث باسم المنفذ أو المستهدف أو العملية" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm" /></label>
          <input value={filters.adminId} onChange={(event) => updateFilter("adminId", event.target.value)} placeholder="معرّف المشرف" aria-label="معرّف المشرف" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" dir="ltr" />
          <select value={filters.actionType} onChange={(event) => updateFilter("actionType", event.target.value)} aria-label="نوع العملية" className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">
            <option value="">كل العمليات</option>
            {Object.entries(actionOptions).map(([code, label]) => <option key={code} value={code}>{label}</option>)}
          </select>
          <select value={filters.targetType} onChange={(event) => updateFilter("targetType", event.target.value)} aria-label="نوع المستهدف" className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm">
            <option value="">كل أنواع المستهدف</option>
            {Object.entries(targetTypeOptions).map(([type, label]) => <option key={type} value={type}>{label}</option>)}
          </select>
          <input value={filters.targetId} onChange={(event) => updateFilter("targetId", event.target.value)} placeholder="معرّف الهدف" aria-label="معرّف الهدف" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" dir="ltr" />
          <label className="text-xs font-bold text-gray-600">من تاريخ<input type="datetime-local" value={filters.createdFrom} onChange={(event) => updateFilter("createdFrom", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
          <label className="text-xs font-bold text-gray-600">إلى تاريخ<input type="datetime-local" value={filters.createdTo} onChange={(event) => updateFilter("createdTo", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
          {hasActiveFilters && <button type="button" onClick={clearFilters} className="rounded-lg px-3 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50">مسح الفلاتر</button>}
        </div>

        {loading ? <LoadingState /> : error ? <ErrorState onRetry={load} description={error} /> : pagination.items.length === 0 ? (
          <EmptyState icon={hasActiveFilters ? FiSearch : TbReportAnalytics} title="لا توجد سجلات تحقق مطابقة" description={hasActiveFilters ? "جرّب تعديل البحث أو الفلاتر المحددة." : "لم يسجل الخادم أي إجراءات إدارية حتى الآن."} />
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-right text-xs">
                <thead className="bg-[#F5F7FA] text-[#374151]"><tr>{["المنفذ", "العملية", "المستهدف", "التفاصيل", "السبب", "التاريخ"].map((label) => <th key={label} className="whitespace-nowrap px-3 py-3 font-extrabold">{label}</th>)}</tr></thead>
                <tbody className="divide-y divide-gray-100">{pagination.items.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/70">
                    <td className="max-w-[210px] px-3 py-3">
                      <strong className="block truncate text-sm text-[#003469]">{log.actor.name || "غير معروف"}</strong>
                      <span className="mt-0.5 block truncate text-[11px] text-gray-500" dir="ltr">{log.actor.email || "—"}</span>
                    </td>
                    <td className="px-3 py-3"><span className="inline-flex max-w-[190px] rounded-full bg-[#E8F7F8] px-3 py-1 font-bold text-[#007F82]">{log.action.label || log.action.code || "غير معروف"}</span></td>
                    <td title={log.target.displayName || undefined} className="max-w-[190px] truncate px-3 py-3 font-bold text-gray-700">{log.target.displayName || "سجل محذوف"}</td>
                    <td className="max-w-[280px] px-3 py-3">
                      <p title={log.description || undefined} className="truncate text-gray-700">{log.description || "لا توجد تفاصيل"}</p>
                      <button type="button" onClick={() => setSelectedLog(log)} className="mt-1 inline-flex items-center gap-1 font-bold text-[#0D4B8E] hover:text-[#003469]"><FiInfo /> عرض التفاصيل</button>
                    </td>
                    <td title={log.reason || undefined} className="max-w-[180px] truncate px-3 py-3 text-gray-600">{log.reason || "—"}</td>
                    <td className="whitespace-nowrap px-3 py-3 text-gray-600">{formatArabicDateTime(log.createdAt)}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        )}

        {!loading && !error && <AdminPagination pagination={pagination} onPageChange={setPage} onPageSizeChange={(value) => { setPageSize(value); setPage(1); }} />}
      </div>

      {selectedLog && (
        <AdminDialog title="التفاصيل التقنية لسجل التدقيق" size="max-w-2xl" onClose={() => setSelectedLog(null)} footer={<button type="button" onClick={() => setSelectedLog(null)} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#003469]">إغلاق</button>}>
          <div className="space-y-4" dir="rtl">
            <p className="text-sm leading-6 text-gray-500">هذه البيانات مخصصة للتحقيق والتدقيق التقني.</p>
            <AdminDetailsSection title="المعرّفات والبيانات التقنية" icon={FiInfo}>
              <dl className="grid gap-3 sm:grid-cols-2">
                <AdminDetailItem label="معرف السجل" value={selectedLog.id} dir="ltr" wide />
                <AdminDetailItem label="Action Code" value={selectedLog.action.code} dir="ltr" />
                <AdminDetailItem label="Target Type" value={selectedLog.target.type} dir="ltr" />
                <AdminDetailItem label="Target ID" value={selectedLog.target.id} dir="ltr" wide />
                <AdminDetailItem label="Admin ID" value={selectedLog.actor.adminId} dir="ltr" wide />
                <AdminDetailItem label="Created At" value={selectedLog.createdAt} dir="ltr" wide />
                <AdminDetailItem label="Raw Details" value={selectedLog.details || "—"} dir="auto" wide />
              </dl>
            </AdminDetailsSection>
          </div>
        </AdminDialog>
      )}
    </AdminLayout>
  );
}
