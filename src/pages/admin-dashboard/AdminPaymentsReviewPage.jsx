import { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { MdPayments } from "react-icons/md";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, openProtectedBlob, unwrapResult } from "../../utils/apiUi";
import { emptyPagedData, normalizePagedData } from "../../utils/adminPagination";
import { localizeDisplayFields } from "../../utils/localization";
import { formatAmount, formatDate } from "../sponsor-dashboard/sponsorFlowUtils";
import AdminLayout from "./Adminlayout";
import AdminPagination from "./AdminPagination";
import { EmptyState, ErrorState, LoadingState } from "./Adminstates";

const initialFilters = { sponsorId: "", sponsorshipId: "", minAmount: "", maxAmount: "", dateFrom: "", dateTo: "" };

export default function AdminPaymentsReviewPage() {
  const [payments, setPayments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const search = useDebouncedValue(searchInput.trim());
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pagination, setPagination] = useState(emptyPagedData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const query = { page, pageSize, search, ...filters };
      const data = unwrapResult(await adminApi.getPendingPayments(query), "تعذر تحميل المدفوعات.");
      const normalized = normalizePagedData(data, query);
      setPayments(normalized.items.map((item) => localizeDisplayFields(item, ["paymentStatus"])));
      setPagination(normalized);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل المدفوعات."));
    } finally {
      setLoading(false);
    }
  }, [filters, page, pageSize, search]);

  useEffect(() => {
    const id = window.setTimeout(load, 0);
    return () => window.clearTimeout(id);
  }, [load]);

  const updateFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  const showDetails = async (paymentId) => {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setActionError("");
    try {
      setSelected(localizeDisplayFields(unwrapResult(await adminApi.getPaymentDetails(paymentId), "تعذر تحميل تفاصيل الدفعة."), ["paymentStatus"]));
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError));
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  const viewProof = async () => {
    if (busyRef.current || !selected) return;
    busyRef.current = true;
    setBusy(true);
    setActionError("");
    try {
      openProtectedBlob(await adminApi.getPaymentProof(selected.paymentId));
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر فتح إثبات الدفع."));
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  const review = async (action) => {
    if (busyRef.current || !selected || (action === "reject" && !reason.trim())) return;
    busyRef.current = true;
    setBusy(true);
    setActionError("");
    try {
      const result = action === "approve" ? await adminApi.approvePayment(selected.paymentId) : await adminApi.rejectPayment(selected.paymentId, reason.trim());
      unwrapResult(result, "تعذر مراجعة الدفعة.");
      setSelected(null);
      setReason("");
      await load();
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError));
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };

  const hasFilters = Boolean(searchInput.trim() || Object.values(filters).some(Boolean));

  return (
    <AdminLayout title="مراجعة المدفوعات">
      <div className="space-y-5" dir="rtl">
        <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
          <label className="relative sm:col-span-2"><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchInput} onChange={(event) => { setSearchInput(event.target.value); setPage(1); }} placeholder="ابحث باسم الكفيل أو الهدف أو المرجع" aria-label="البحث في المدفوعات" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm" /></label>
          <input value={filters.sponsorId} onChange={(event) => updateFilter("sponsorId", event.target.value)} placeholder="معرّف الكفيل" aria-label="معرّف الكفيل" dir="ltr" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
          <input value={filters.sponsorshipId} onChange={(event) => updateFilter("sponsorshipId", event.target.value)} placeholder="معرّف الكفالة" aria-label="معرّف الكفالة" dir="ltr" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
          <input type="number" min="0" value={filters.minAmount} onChange={(event) => updateFilter("minAmount", event.target.value)} placeholder="المبلغ الأدنى" aria-label="المبلغ الأدنى" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
          <input type="number" min="0" value={filters.maxAmount} onChange={(event) => updateFilter("maxAmount", event.target.value)} placeholder="المبلغ الأعلى" aria-label="المبلغ الأعلى" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
          <label className="text-xs font-bold text-gray-600">من تاريخ<input type="datetime-local" value={filters.dateFrom} onChange={(event) => updateFilter("dateFrom", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
          <label className="text-xs font-bold text-gray-600">إلى تاريخ<input type="datetime-local" value={filters.dateTo} onChange={(event) => updateFilter("dateTo", event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
          {hasFilters && <button type="button" onClick={() => { setSearchInput(""); setFilters(initialFilters); setPage(1); }} className="text-sm font-bold text-red-700">مسح الفلاتر</button>}
        </div>

        {loading ? <LoadingState /> : error ? <ErrorState onRetry={load} description={error} /> : !payments.length ? (
          <EmptyState icon={hasFilters ? FiSearch : MdPayments} title={hasFilters ? "لا توجد نتائج تطابق هذه الفلاتر" : "لا توجد مدفوعات معلقة"} description={hasFilters ? "جرّب تعديل البحث أو الفلاتر." : "لا توجد إثباتات دفع بانتظار المراجعة."} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-3">{payments.map((payment) => <button key={payment.paymentId} type="button" disabled={busy} onClick={() => showDetails(payment.paymentId)} className="w-full rounded-xl border border-gray-200 bg-white p-5 text-right shadow-sm hover:border-[#0D4B8E] disabled:opacity-60"><div className="flex justify-between gap-3"><strong>{payment.sponsorFullName || "—"}</strong><span className="rounded-full bg-[#FFF4D6] px-3 py-1 text-xs font-bold text-[#8A641A]">{payment.paymentStatus || "—"}</span></div><p className="mt-2 text-sm text-gray-500">{payment.targetDisplayName || "—"} · {formatAmount(payment.amount)} {payment.currency || ""}</p></button>)}</div>
            <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold text-[#003469]">تفاصيل مراجعة التحويل البنكي</h2>{selected ? <><dl className="mt-4 grid gap-3 text-sm"><div><dt className="text-gray-500">الكفيل</dt><dd className="font-bold">{selected.sponsor?.fullName || "—"}</dd></div><div><dt className="text-gray-500">الحالة</dt><dd className="font-bold">{selected.paymentStatus || "—"}</dd></div><div><dt className="text-gray-500">المبلغ</dt><dd className="font-bold">{formatAmount(selected.amount)} {selected.currency || ""}</dd></div><div><dt className="text-gray-500">مرجع التحويل</dt><dd className="font-bold">{selected.transferReference || "—"}</dd></div><div><dt className="text-gray-500">تاريخ الإرسال</dt><dd className="font-bold">{formatDate(selected.submittedAt)}</dd></div></dl>{selected.hasPaymentProof && <button type="button" disabled={busy} onClick={viewProof} className="mt-4 w-full rounded-lg bg-[#E8F1FA] px-4 py-2.5 text-sm font-bold text-[#0D4B8E] disabled:opacity-60">عرض إثبات الدفع</button>}<label className="mt-4 block text-sm font-bold">سبب الرفض<textarea value={reason} maxLength={500} disabled={busy} onChange={(event) => setReason(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-gray-300 p-3 disabled:bg-gray-100" /></label><div className="mt-4 grid grid-cols-2 gap-3"><button type="button" disabled={busy} onClick={() => review("approve")} className="rounded-lg bg-[#008C78] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">اعتماد</button><button type="button" disabled={busy || !reason.trim()} onClick={() => review("reject")} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:bg-gray-400">رفض</button></div></> : <p className="mt-4 text-sm text-gray-500">اختر دفعة لعرض تفاصيلها.</p>}{actionError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}</aside>
          </div>
        )}
        {!loading && !error && <AdminPagination pagination={pagination} onPageChange={setPage} onPageSizeChange={(value) => { setPageSize(value); setPage(1); }} />}
      </div>
    </AdminLayout>
  );
}
