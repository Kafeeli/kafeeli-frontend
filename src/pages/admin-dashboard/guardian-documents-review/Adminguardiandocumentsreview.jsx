import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiEye, FiRefreshCw, FiSearch } from "react-icons/fi";
import { MdDescription } from "react-icons/md";
import {
  DOCUMENT_STATUS_FILTERS,
  GUARDIAN_DOCUMENT_TYPE_FILTERS,
  adminDocumentStatusClasses,
  adminDocumentStatusLabel,
  adminDocumentTypeLabel,
} from "../../../config/adminDocumentReviewConfig";
import { adminApi } from "../../../services/adminApi";
import { apiErrorMessage, openProtectedBlob, unwrapResult } from "../../../utils/apiUi";
import { formatArabicDateTime } from "../../../utils/date";
import AdminLayout from "../Adminlayout";
import AdminBreadcrumbs from "../AdminBreadcrumbs";
import AdminDocumentStatusModal from "../AdminDocumentStatusModal";
import { AdminConfirmationDialog } from "../AdminManagementDialogs";
import { EmptyState, ErrorState, LoadingState } from "../Adminstates";
import AdminTableIconButton from "../AdminTableIconButton";

function documentFileErrorMessage(error) {
  if (error?.response?.status === 401) return "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
  if (error?.response?.status === 403) return "ليس لديك صلاحية لعرض هذه الوثيقة.";
  if (error?.response?.status === 404) return "الوثيقة غير موجودة.";
  return apiErrorMessage(error, "تعذر فتح الوثيقة. حاول مرة أخرى.");
}

export default function AdminGuardianDocumentsReviewPage() {
  const [documents, setDocuments] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [documentTypeFilter, setDocumentTypeFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");
  const [busy, setBusy] = useState("");
  const [guardianApproval, setGuardianApproval] = useState(null);
  const [statusChangeDocument, setStatusChangeDocument] = useState(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedSearch(searchInput.trim()), 400);
    return () => window.clearTimeout(timeoutId);
  }, [searchInput]);

  const loadDocuments = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError("");
    try {
      const result = await adminApi.getAllGuardianDocuments({
        search: debouncedSearch,
        status: statusFilter,
        documentType: documentTypeFilter,
      });
      setDocuments(unwrapResult(result, "تعذر تحميل وثائق الأوصياء.") || []);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل وثائق الأوصياء."));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [debouncedSearch, documentTypeFilter, statusFilter]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadDocuments, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadDocuments]);

  const hasActiveFilters = Boolean(searchInput.trim() || statusFilter || documentTypeFilter);

  const clearFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    setStatusFilter("");
    setDocumentTypeFilter("");
  };

  const viewDocument = async (document) => {
    if (busy || !document.hasFile) return;
    setBusy(`view-${document.documentId}`);
    setActionError("");
    try {
      openProtectedBlob(await adminApi.getDocumentFile(document.documentId));
    } catch (requestError) {
      setActionError(documentFileErrorMessage(requestError));
    } finally {
      setBusy("");
    }
  };

  const approveGuardian = async () => {
    if (!guardianApproval || busy) return;
    setBusy(`guardian-${guardianApproval.guardianId}`);
    setActionError("");
    try {
      unwrapResult(await adminApi.approveGuardian(guardianApproval.guardianId), "تعذر اعتماد حساب الوصي.");
      setGuardianApproval(null);
      await loadDocuments({ silent: true });
      setSuccessMessage("تم اعتماد حساب الوصي بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر اعتماد حساب الوصي."));
    } finally {
      setBusy("");
    }
  };

  const changeDocumentStatus = async (status, statusReason) => {
    if (!statusChangeDocument || busy) return;
    const document = statusChangeDocument;
    setBusy(`status-${document.documentId}`);
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(
        await adminApi.updateGuardianDocumentStatus(
          document.documentId,
          status,
          statusReason,
        ),
        "تعذر تغيير حالة الوثيقة.",
      );
      setStatusChangeDocument(null);
      await loadDocuments({ silent: true });
      setSuccessMessage("تم تحديث حالة الوثيقة بنجاح");
      if (status === 2 && document.guardianId) {
        try {
          const verification = unwrapResult(
            await adminApi.getGuardianVerification(document.guardianId),
            "تعذر التحقق من حالة اعتماد الوصي.",
          );
          if (verification?.isReadyForApproval && verification.verificationStatus !== "Approved") {
            setGuardianApproval(verification);
          }
        } catch {
          // The document update succeeded; Guardian readiness is a best-effort follow-up.
        }
      }
    } catch (requestError) {
      if (requestError?.response?.status === 409) await loadDocuments({ silent: true });
      setActionError(apiErrorMessage(requestError, "تعذر تغيير حالة الوثيقة."));
    } finally {
      setBusy("");
    }
  };

  return (
    <AdminLayout title="وثائق الأوصياء">
      <div className="space-y-6" dir="rtl">
        <AdminBreadcrumbs items={[{ label: "الأوصياء", to: "/admin-dashboard/guardians" }, { label: "مراجعة الأوراق" }]} />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><h1 className="text-2xl font-extrabold text-[#003469]">وثائق الأوصياء</h1><p className="mt-1 text-sm text-gray-500">عرض ومراجعة جميع وثائق الأوصياء ومتابعة حالاتها.</p></div>
          <button type="button" onClick={() => loadDocuments({ silent: true })} disabled={refreshing || loading} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-[#0D4B8E] disabled:opacity-50"><FiRefreshCw className={refreshing ? "animate-spin" : ""} aria-hidden="true" />تحديث</button>
        </div>

        <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 md:grid-cols-[minmax(260px,1fr)_210px_230px_auto]">
          <label className="relative"><span className="sr-only">البحث في وثائق الأوصياء</span><FiSearch className="absolute right-3 top-3 text-gray-400" aria-hidden="true" /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="ابحث باسم الوصي أو البريد أو الهاتف أو رقم الهوية..." className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value ? Number(event.target.value) : "")} aria-label="تصفية حسب حالة الوثيقة" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{DOCUMENT_STATUS_FILTERS.map((filter) => <option key={filter.label} value={filter.value}>{filter.label}</option>)}</select>
          <select value={documentTypeFilter} onChange={(event) => setDocumentTypeFilter(event.target.value ? Number(event.target.value) : "")} aria-label="تصفية حسب نوع الوثيقة" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{GUARDIAN_DOCUMENT_TYPE_FILTERS.map((filter) => <option key={filter.label} value={filter.value}>{filter.label}</option>)}</select>
          {hasActiveFilters && <button type="button" onClick={clearFilters} className="rounded-lg px-3 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50">مسح الفلاتر</button>}
        </div>

        {actionError && !statusChangeDocument && !guardianApproval && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}
        {successMessage && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{successMessage}</p>}
        <p className="text-sm font-bold text-gray-600">النتائج: {documents.length}</p>

        {loading ? <LoadingState /> : error ? <ErrorState onRetry={loadDocuments} description={error} /> : documents.length === 0 ? (
          <EmptyState icon={hasActiveFilters ? FiSearch : MdDescription} title={hasActiveFilters ? "لا توجد نتائج مطابقة." : "لا توجد وثائق أوصياء."} description={hasActiveFilters ? "جرّب تعديل البحث أو الفلاتر المحددة." : "لم يُرجع الخادم أي وثائق أوصياء حالية."} />
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-right text-xs">
            <thead className="bg-[#F5F7FA] text-[11px] text-[#374151]"><tr><th className="whitespace-nowrap px-3 py-3 font-extrabold">الوصي</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">البريد / الهاتف</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">نوع الوثيقة</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الحالة</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">تاريخ الرفع</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">تاريخ المراجعة</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الإجراءات</th></tr></thead>
            <tbody className="divide-y divide-gray-100">{documents.map((document) => (
              <tr key={document.documentId} className="hover:bg-gray-50/70">
                <td title={document.guardianFullName || undefined} className="max-w-[170px] truncate px-3 py-3 font-bold text-[#003469]">{document.guardianFullName || "—"}</td>
                <td className="max-w-[220px] px-3 py-3"><p title={document.guardianEmail || undefined} className="truncate">{document.guardianEmail || "—"}</p><p dir="ltr" className="mt-1 whitespace-nowrap text-right text-[11px] text-gray-500">{document.guardianPhone || "—"}</p></td>
                <td title={document.displayFileName || undefined} className="max-w-[180px] px-3 py-3"><p className="whitespace-nowrap font-bold">{adminDocumentTypeLabel(document.documentType)}</p><p className="mt-1 truncate text-[11px] text-gray-500">{document.displayFileName || "—"}</p></td>
                <td className="whitespace-nowrap px-3 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${adminDocumentStatusClasses(document.status)}`}>{adminDocumentStatusLabel(document.status)}</span></td>
                <td className="whitespace-nowrap px-3 py-3 text-[11px] text-gray-600">{formatArabicDateTime(document.uploadedAt)}</td><td className="whitespace-nowrap px-3 py-3 text-[11px] text-gray-600">{formatArabicDateTime(document.reviewedAt)}</td>
                <td className="px-3 py-3"><div className="flex items-center gap-1 whitespace-nowrap">{document.hasFile && <AdminTableIconButton label="عرض الوثيقة" tone="view" disabled={Boolean(busy)} onClick={() => viewDocument(document)}><FiEye aria-hidden="true" /></AdminTableIconButton>}<AdminTableIconButton label="تغيير الحالة" tone="edit" disabled={Boolean(busy)} onClick={() => { setActionError(""); setStatusChangeDocument(document); }}><FiEdit2 aria-hidden="true" /></AdminTableIconButton></div></td>
              </tr>
            ))}</tbody>
          </table></div></div>
        )}
      </div>

      {statusChangeDocument && <AdminDocumentStatusModal document={statusChangeDocument} currentStatus={statusChangeDocument.status} entityType="guardian" loading={busy === `status-${statusChangeDocument.documentId}`} error={actionError} onSubmit={changeDocumentStatus} onCancel={() => { if (!busy) { setStatusChangeDocument(null); setActionError(""); } }} />}
      {guardianApproval && <AdminConfirmationDialog title="اعتماد حساب الوصي" message={`اكتملت مراجعة جميع وثائق ${guardianApproval.fullName || "الوصي"}. هل تريد اعتماد حساب الوصي؟`} confirmLabel="اعتماد حساب الوصي" onConfirm={approveGuardian} onCancel={() => { if (!busy) setGuardianApproval(null); }} loading={busy === `guardian-${guardianApproval.guardianId}`} error={actionError} />}
    </AdminLayout>
  );
}
