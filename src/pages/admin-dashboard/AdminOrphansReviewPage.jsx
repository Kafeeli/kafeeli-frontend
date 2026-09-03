import { useCallback, useEffect, useMemo, useState } from "react";
import { FiCheckCircle, FiEdit2, FiEye, FiEyeOff, FiSearch, FiTrash2 } from "react-icons/fi";
import { MdChildCare, MdDescription, MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import {
  apiErrorMessage,
  openProtectedBlob,
  unwrapResult,
} from "../../utils/apiUi";

import { formatArabicDateTime } from "../../utils/date";

import {
  localizeDocumentType,
  localizeStatus,
} from "../../utils/localization";

import AdminLayout from "./Adminlayout";
import { AdminConfirmationDialog, AdminDialog } from "./AdminManagementDialogs";
import { EmptyState, ErrorState, LoadingState, MiniStatCard } from "./Adminstates";
import AdminTableIconButton from "./AdminTableIconButton";

const ORPHAN_STATUS_FILTERS = [
  { value: "all", label: "كل الحالات" },
  { value: "PendingReview", label: "بانتظار المراجعة" },
  { value: "Active", label: "نشط" },
  { value: "Hidden", label: "مخفي" },
  { value: "Suspended", label: "معلّق" },
  { value: "NeedsUpdate", label: "يحتاج تعديل" },
  { value: "Rejected", label: "مرفوض" },
];

const ORPHAN_STATUS_LABELS = Object.fromEntries(
  ORPHAN_STATUS_FILTERS.filter((item) => item.value !== "all").map((item) => [item.value, item.label]),
);

const STATUS_TRANSITIONS = {
  Active: ["Hidden", "Suspended"],
  Hidden: ["Active", "Suspended"],
  Suspended: ["Active", "Hidden"],
};

function orphanStatusLabel(status) {
  return ORPHAN_STATUS_LABELS[status] || status || "—";
}

function orphanStatusClasses(status) {
  if (status === "Active") return "bg-emerald-50 text-emerald-700";
  if (status === "Hidden") return "bg-slate-100 text-slate-700";
  if (status === "Suspended") return "bg-amber-50 text-amber-700";
  if (status === "Rejected") return "bg-red-50 text-red-700";
  return "bg-[#E8F1FA] text-[#0D4B8E]";
}

function statusActionLabel(status) {
  if (status === "Active") return "إعادة تفعيل";
  if (status === "Hidden") return "إخفاء";
  return "تعليق";
}

function StatusActionIcon({ status }) {
  if (status === "Active") return <MdPlayCircleOutline aria-hidden="true" />;
  if (status === "Hidden") return <FiEyeOff aria-hidden="true" />;
  return <MdPauseCircleOutline aria-hidden="true" />;
}

function statusConfirmation(status) {
  if (status === "Active") return {
    title: "إعادة تفعيل اليتيم",
    message: "هل تريد إعادة تفعيل هذا اليتيم؟",
    warning: "سيتحقق الخادم من العائلة والوصي والوثائق المطلوبة قبل إعادة التفعيل.",
  };
  if (status === "Hidden") return {
    title: "إخفاء اليتيم",
    message: "هل تريد إخفاء هذا اليتيم من الظهور للكفلاء؟",
  };
  return {
    title: "تعليق اليتيم",
    message: "هل أنت متأكد من تعليق هذا اليتيم؟",
  };
}

function documentFileErrorMessage(error) {
  const status = error?.response?.status;

  if (status === 401) {
    return "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
  }

  if (status === 403) {
    return "ليس لديك صلاحية لعرض هذا المستند.";
  }

  if (status === 404) {
    return "المستند غير موجود.";
  }

  return apiErrorMessage(
    error,
    "تعذر فتح المستند. حاول مرة أخرى.",
  );
}


function toDateInputValue(value) {
  return value ? String(value).slice(0, 10) : "";
}

function orphanForm(details) {
  return {
    firstName: details.firstName || "",
    fatherName: details.fatherName || "",
    grandfatherName: details.grandfatherName || "",
    nationalId: details.nationalId || "",
    dateOfBirth: toDateInputValue(details.dateOfBirth),
    gender: details.gender === "Female" ? "2" : "1",
    educationalStatus: details.educationalStatus || "",
    caseDescription: details.caseDescription || "",
  };
}

function DetailItem({ label, value, dir }) {
  return <div><dt className="text-xs font-bold text-gray-500">{label}</dt><dd dir={dir} className="mt-1 break-words text-sm font-bold text-gray-900">{value ?? "—"}</dd></div>;
}

export default function AdminOrphansReviewPage() {
  const [allOrphans, setAllOrphans] = useState([]);
  const [pendingOrphans, setPendingOrphans] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [activeTab, setActiveTab] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selected, setSelected] = useState(null);
  const [selectedForReview, setSelectedForReview] = useState(false);
  const [dialogMode, setDialogMode] = useState("");
  const [editForm, setEditForm] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reason, setReason] = useState("");
  const [documentReason, setDocumentReason] = useState("");
  const [statusReason, setStatusReason] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError("");

    try {
      const [
        allResult,
        pendingResult,
        documentResult,
      ] = await Promise.all([
        adminApi.getAllOrphans(),
        adminApi.getPendingOrphans(),
        adminApi.getPendingOrphanDocuments(),
      ]);
      setAllOrphans(unwrapResult(allResult, "تعذر تحميل جميع الأيتام.") || []);
      setPendingOrphans(unwrapResult(pendingResult, "تعذر تحميل الأيتام المعلقين.") || []);
      setDocuments((unwrapResult(documentResult, "تعذر تحميل الوثائق المعلقة.") || []).map((item) => ({
        ...item,
        arabicLabel: item.arabicLabel || localizeDocumentType(item.documentType),
      })));
    } catch (requestError) {
      setError(
        apiErrorMessage(
          requestError,
          "تعذر تحميل بيانات الأيتام.",
        ),
      );
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);


  useEffect(() => {
    const timeoutId = window.setTimeout(
      load,
      0,
    );

    return () =>
      window.clearTimeout(timeoutId);
  }, [load]);

  const fetchDetails = useCallback(async (orphanId) => (
    unwrapResult(await adminApi.getOrphanDetails(orphanId), "تعذر تحميل تفاصيل اليتيم.")
  ), []);

  const showOrphan = async (orphanId, { forReview = false, mode = "details" } = {}) => {
    if (busy) return;
    setBusy(`detail-${orphanId}`);
    setActionError("");
    setSuccessMessage("");
    setReason("");
    setDocumentReason("");
    try {
      const details = await fetchDetails(orphanId);
      setSelected(details);
      setSelectedForReview(forReview || details.orphanStatus === "PendingReview");
      setEditForm(orphanForm(details));
      setDialogMode(mode);
    } catch (requestError) {
      setActionError(
        apiErrorMessage(
          requestError,
          "تعذر تحميل تفاصيل اليتيم.",
        ),
      );
    } finally {
      setBusy("");
    }
  };

  const viewBlob = async (key, request) => {
    if (busy) return;
    setBusy(key);
    setActionError("");

    try {
      openProtectedBlob(await request());
    } catch (requestError) {
      setActionError(documentFileErrorMessage(requestError));
    } finally {
      setBusy("");
    }
  };

  const refreshSelectedIfOpen = async (orphanId) => {
    if (selected?.orphanId !== orphanId) return;
    const details = await fetchDetails(orphanId);
    setSelected(details);
    setSelectedForReview(details.orphanStatus === "PendingReview");
    setEditForm(orphanForm(details));
  };

  const runReviewAction = async (key, request, successText) => {
    if (busy) return;
    setBusy(key);
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await request(), "تعذر تنفيذ الإجراء.");
      setSelected(null);
      setSelectedForReview(false);
      setDialogMode("");
      setReason("");
      setDocumentReason("");
      setConfirmation(null);
      await load({ silent: true });
      setSuccessMessage(successText);
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تنفيذ الإجراء."));
    } finally {
      setBusy("");
    }
  };

  const submitEdit = async (event) => {
    event.preventDefault();
    if (busy || !selected || !editForm) return;
    setBusy("edit-orphan");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.updateOrphan(selected.orphanId, {
        ...editForm,
        gender: Number(editForm.gender),
      }), "تعذر تحديث بيانات اليتيم.");
      await load({ silent: true });
      const details = await fetchDetails(selected.orphanId);
      setSelected(details);
      setEditForm(orphanForm(details));
      setSelectedForReview(details.orphanStatus === "PendingReview");
      setDialogMode("details");
      setSuccessMessage("تم تحديث بيانات اليتيم بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحديث بيانات اليتيم."));
    } finally {
      setBusy("");
    }
  };

  const confirmStatusChange = async () => {
    if (busy || confirmation?.type !== "status") return;
    const { orphan, status } = confirmation;
    setBusy("status-orphan");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.updateOrphanStatus(orphan.orphanId, status, statusReason), "تعذر تحديث حالة اليتيم.");
      setConfirmation(null);
      setStatusReason("");
      await load({ silent: true });
      await refreshSelectedIfOpen(orphan.orphanId);
      setSuccessMessage("تم تحديث حالة اليتيم بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحديث حالة اليتيم."));
    } finally {
      setBusy("");
    }
  };

  const confirmDelete = async () => {
    if (busy || confirmation?.type !== "delete") return;
    const orphanId = confirmation.orphan.orphanId;
    setBusy("delete-orphan");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.deleteOrphan(orphanId), "تعذر حذف ملف اليتيم.");
      setConfirmation(null);
      if (selected?.orphanId === orphanId) {
        setSelected(null);
        setDialogMode("");
      }
      await load({ silent: true });
      setSuccessMessage("تم حذف ملف اليتيم نهائيًا بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر حذف ملف اليتيم."));
    } finally {
      setBusy("");
    }
  };

  const filteredOrphans = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return allOrphans.filter((orphan) => {
      const matchesStatus = statusFilter === "all" || orphan.orphanStatus === statusFilter;
      const matchesSearch = !query || [orphan.fullName, orphan.nationalId]
        .some((value) => String(value || "").toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [allOrphans, searchTerm, statusFilter]);

  const selectTab = (tab) => {
    setActiveTab(tab);

    setSelected(null);
    setDialogMode("");
    setSelectedForReview(false);
    setActionError("");
    setSuccessMessage("");
  };

  const openStatusConfirmation = (orphan, status) => {
    setConfirmation({ type: "status", orphan, status });
    setStatusReason("");
    setActionError("");
    setSuccessMessage("");
  };

  const closeDetails = () => {
    if (busy) return;
    setSelected(null);
    setDialogMode("");
    setSelectedForReview(false);

    setActionError("");
  };


  /* =========================================================
     SELECTED DOCUMENTS
  ========================================================= */

  const birthCertificate =
    selected?.requiredDocuments?.find(
      (document) =>
        document.documentType ===
        "BirthCertificate",
    );

  const hasBirthCertificate =
    Boolean(
      birthCertificate?.documentId &&
        birthCertificate.hasCurrentDocument !==
          false &&
        birthCertificate.canView !==
          false,
    );

  const hasFatherDeathCertificate =
    Boolean(
      selected?.familyId &&
        selected.familyFatherDeathCertificateAccessEndpoint,
    );


  /* =========================================================
     TAB CONTENT
  ========================================================= */

  let tabContent;


  /* =========================================================
     ALL ORPHANS
  ========================================================= */

  if (activeTab === "all") {
    if (allOrphans.length === 0) tabContent = <EmptyState icon={MdChildCare} title="لا يوجد أيتام" description="لم يُرجع الخادم أي سجلات أيتام حتى الآن." />;
    else if (filteredOrphans.length === 0) tabContent = <EmptyState icon={FiSearch} title="لا توجد نتائج مطابقة" description="جرّب تعديل عبارة البحث أو حالة اليتيم." />;
    else tabContent = (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[1200px] text-right text-xs">
        <thead className="bg-[#F5F7FA] text-[11px] text-[#374151]"><tr><th className="whitespace-nowrap px-3 py-3 font-extrabold">الاسم الكامل</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">رقم الهوية</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">العمر</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الجنس</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">العائلة</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الوصي</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الحالة</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">آخر تحديث</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الإجراءات</th></tr></thead>
        <tbody className="divide-y divide-gray-100">{filteredOrphans.map((orphan) => <tr key={orphan.orphanId} className="hover:bg-gray-50/70"><td title={orphan.fullName || undefined} className="max-w-[170px] truncate px-3 py-3 font-bold text-[#003469]">{orphan.fullName || "—"}</td><td dir="ltr" className="whitespace-nowrap px-3 py-3 text-right text-[11px]">{orphan.nationalId || "—"}</td><td className="px-3 py-3">{orphan.age ?? "—"}</td><td className="px-3 py-3">{localizeStatus(orphan.gender)}</td><td title={orphan.familyHeadOfHouseholdName || undefined} className="max-w-[150px] truncate px-3 py-3">{orphan.familyHeadOfHouseholdName || "—"}</td><td title={orphan.guardianFullName || undefined} className="max-w-[150px] truncate px-3 py-3">{orphan.guardianFullName || "—"}</td><td className="whitespace-nowrap px-3 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${orphanStatusClasses(orphan.orphanStatus)}`}>{orphanStatusLabel(orphan.orphanStatus)}</span></td><td className="whitespace-nowrap px-3 py-3 text-[11px] text-gray-600">{formatArabicDateTime(orphan.updatedAt)}</td><td className="px-3 py-3"><div className="flex items-center gap-1 whitespace-nowrap"><AdminTableIconButton label="عرض التفاصيل" tone="view" disabled={Boolean(busy)} onClick={() => showOrphan(orphan.orphanId)}><FiEye aria-hidden="true" /></AdminTableIconButton><AdminTableIconButton label="تعديل" disabled={Boolean(busy)} onClick={() => showOrphan(orphan.orphanId, { mode: "edit" })}><FiEdit2 aria-hidden="true" /></AdminTableIconButton>{(STATUS_TRANSITIONS[orphan.orphanStatus] || []).map((status) => <AdminTableIconButton key={status} label={statusActionLabel(status)} tone={status === "Active" ? "reactivate" : status === "Hidden" ? "hide" : "suspend"} disabled={Boolean(busy)} onClick={() => openStatusConfirmation(orphan, status)}><StatusActionIcon status={status} /></AdminTableIconButton>)}{orphan.orphanStatus === "PendingReview" && <AdminTableIconButton label="مراجعة واعتماد" tone="approve" disabled={Boolean(busy)} onClick={() => showOrphan(orphan.orphanId, { forReview: true })}><FiCheckCircle aria-hidden="true" /></AdminTableIconButton>}<AdminTableIconButton label="حذف نهائي" tone="delete" disabled={Boolean(busy)} onClick={() => setConfirmation({ type: "delete", orphan })}><FiTrash2 aria-hidden="true" /></AdminTableIconButton></div></td></tr>)}</tbody>
      </table></div></div>
    );
  } else if (activeTab === "pending") {
    tabContent = pendingOrphans.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{pendingOrphans.map((orphan) => <article key={orphan.orphanId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex justify-between gap-3"><strong>{orphan.fullName || "—"}</strong><span className="text-xs font-bold text-[#0D4B8E]">{orphanStatusLabel(orphan.orphanStatus)}</span></div><p className="mt-2 text-sm text-gray-500">{orphan.familyHeadOfHouseholdName || "—"} · {orphan.guardianFullName || "—"}</p><button type="button" disabled={Boolean(busy)} onClick={() => showOrphan(orphan.orphanId, { forReview: true })} className="mt-4 w-full rounded-lg bg-[#0D4B8E] px-4 py-2 text-sm font-bold text-white disabled:opacity-60">عرض ومراجعة</button></article>)}</div> : <EmptyState icon={MdChildCare} title="لا توجد حالات معلقة" description="لا توجد حالات أيتام بانتظار المراجعة." />;
  } else {
    tabContent = documents.length ? <><label className="mb-4 block max-w-xl text-sm font-bold">سبب طلب تعديل الوثيقة<textarea value={documentReason} onChange={(event) => setDocumentReason(event.target.value)} maxLength={500} rows={2} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><div className="grid gap-4 md:grid-cols-2">{documents.map((document) => <article key={document.documentId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="font-bold">{document.arabicLabel || document.documentType || "—"}</h3><p className="mt-1 text-sm text-gray-500">{document.orphanFullName || "—"} · {document.displayFileName || "—"}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" disabled={Boolean(busy)} onClick={() => viewBlob(`doc-${document.documentId}`, () => adminApi.getOrphanDocumentFile(document.documentId))} className="rounded bg-[#E8F1FA] px-3 py-2 text-xs font-bold text-[#0D4B8E] disabled:opacity-60">{busy === `doc-${document.documentId}` ? "جارٍ فتح الملف..." : "عرض الوثيقة"}</button><button type="button" disabled={Boolean(busy) || !documentReason.trim()} onClick={() => runReviewAction(`update-${document.documentId}`, () => adminApi.requestOrphanDocumentUpdate(document.documentId, documentReason.trim()), "تم إرسال طلب تعديل الوثيقة بنجاح.")} className="rounded bg-amber-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-60">{busy === `update-${document.documentId}` ? "جارٍ إرسال الطلب..." : "طلب تعديل الوثيقة"}</button></div></article>)}</div></> : <EmptyState icon={MdDescription} title="لا توجد وثائق معلقة" description="لا توجد وثائق أيتام بانتظار المراجعة." />;
  }

  return (
    <AdminLayout title="إدارة الأيتام"><div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-[#003469]">إدارة الأيتام</h1><p className="mt-1 text-sm text-gray-500">إدارة جميع الأيتام مع إبقاء المراجعة الأولية ومسار تصحيح الوثائق منفصلين.</p></div>
      <div className="max-w-sm"><MiniStatCard label="إجمالي الأيتام" value={allOrphans.length} icon={MdChildCare} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">{[{ key: "all", label: `جميع الأيتام (${allOrphans.length})` }, { key: "pending", label: `بانتظار المراجعة (${pendingOrphans.length})` }, { key: "documents", label: `الوثائق المعلقة (${documents.length})` }].map((tab) => <button key={tab.key} type="button" onClick={() => selectTab(tab.key)} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${activeTab === tab.key ? "bg-[#0D4B8E] text-white" : "bg-white text-[#0D4B8E] hover:bg-[#E8F1FA]"}`}>{tab.label}</button>)}</div>
      {activeTab === "all" && <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-[1fr_220px]"><label className="relative"><span className="sr-only">البحث في الأيتام</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو رقم الهوية" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="تصفية حسب حالة اليتيم" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{ORPHAN_STATUS_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select></div>}
      {actionError && !selected && !confirmation && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}{successMessage && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{successMessage}</p>}
      {activeTab === "all" && <p className="text-sm font-bold text-gray-600">النتائج: {filteredOrphans.length}</p>}
      {loading ? <LoadingState /> : error ? <ErrorState onRetry={load} description={error} /> : tabContent}
    </div>

    {selected && dialogMode === "details" && <AdminDialog title={selectedForReview ? "مراجعة ملف اليتيم" : "تفاصيل اليتيم"} onClose={closeDetails} closeDisabled={Boolean(busy)} size="max-w-5xl" footer={!selectedForReview ? <><button type="button" onClick={() => setDialogMode("edit")} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white">تعديل</button>{(STATUS_TRANSITIONS[selected.orphanStatus] || []).map((status) => <button key={status} type="button" onClick={() => openStatusConfirmation(selected, status)} className={`rounded-lg px-5 py-2.5 text-sm font-bold text-white ${status === "Active" ? "bg-emerald-600" : status === "Hidden" ? "bg-slate-600" : "bg-amber-600"}`}>{statusActionLabel(status)}</button>)}<button type="button" onClick={() => { setActionError(""); setConfirmation({ type: "delete", orphan: selected }); }} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-700">حذف نهائي</button></> : undefined}>
      {actionError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}
      <section><h3 className="mb-3 text-base font-extrabold text-[#003469]">بيانات اليتيم</h3><dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><DetailItem label="الاسم الكامل" value={selected.fullName} /><DetailItem label="رقم الهوية" value={selected.nationalId} dir="ltr" /><DetailItem label="تاريخ الميلاد" value={toDateInputValue(selected.dateOfBirth)} /><DetailItem label="العمر" value={selected.age} /><DetailItem label="الجنس" value={localizeStatus(selected.gender)} /><DetailItem label="الحالة التعليمية" value={localizeStatus(selected.educationalStatus)} /><DetailItem label="الوالد المتوفى" value={selected.deceasedParent} /><DetailItem label="حالة اليتيم" value={orphanStatusLabel(selected.orphanStatus)} /><DetailItem label="تاريخ الإنشاء" value={formatArabicDateTime(selected.createdAt)} /><DetailItem label="تاريخ المراجعة" value={formatArabicDateTime(selected.reviewedAt)} /><DetailItem label="معرّف اليتيم" value={selected.orphanId} dir="ltr" /></dl><p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm leading-7">{selected.caseDescription || "—"}</p></section>
      <section className="mt-6"><h3 className="mb-3 text-base font-extrabold text-[#003469]">صورة اليتيم</h3>{selected.profileImageAccessEndpoint ? <button type="button" disabled={Boolean(busy)} onClick={() => viewBlob("image", () => adminApi.getOrphanProfileImage(selected.orphanId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:opacity-60">{busy === "image" ? "جارٍ فتح الصورة..." : "عرض الصورة"}</button> : <p className="text-sm text-gray-500">لا توجد صورة ملف شخصي.</p>}</section>
      <section className="mt-6 rounded-xl border border-[#D7E2EE] bg-[#F8FAFC] p-4"><h3 className="text-base font-extrabold text-[#003469]">شهادة الميلاد والوثائق</h3><div className="mt-3 flex flex-wrap gap-3"><div><button type="button" disabled={Boolean(busy) || !hasBirthCertificate} onClick={() => viewBlob("birth-certificate", () => adminApi.getOrphanDocumentFile(birthCertificate.documentId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60">{busy === "birth-certificate" ? "جارٍ فتح الوثيقة..." : "عرض الوثيقة"}</button>{!hasBirthCertificate && <p className="mt-1 text-xs text-red-600">شهادة ميلاد اليتيم غير متوفرة.</p>}</div><div><button type="button" disabled={Boolean(busy) || !hasFatherDeathCertificate} onClick={() => viewBlob("father-death-certificate", () => adminApi.getFamilyFatherDeathCertificate(selected.familyId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60">{busy === "father-death-certificate" ? "جارٍ فتح شهادة الوفاة..." : "عرض شهادة وفاة الأب"}</button>{!hasFatherDeathCertificate && <p className="mt-1 text-xs text-red-600">شهادة وفاة الأب غير متوفرة.</p>}</div></div>{selectedForReview && hasBirthCertificate && <><label className="mt-4 block max-w-xl text-sm font-bold">سبب طلب تعديل الوثيقة<textarea value={documentReason} onChange={(event) => setDocumentReason(event.target.value)} maxLength={500} rows={2} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><button type="button" disabled={Boolean(busy) || !documentReason.trim()} onClick={() => runReviewAction("update-birth-certificate", () => adminApi.requestOrphanDocumentUpdate(birthCertificate.documentId, documentReason.trim()), "تم إرسال طلب تعديل الوثيقة بنجاح.")} className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{busy === "update-birth-certificate" ? "جارٍ إرسال الطلب..." : "طلب تعديل الوثيقة"}</button></>}</section>
      <section className="mt-6"><h3 className="mb-3 text-base font-extrabold text-[#003469]">بيانات العائلة</h3><dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"><DetailItem label="رب الأسرة" value={selected.familyHeadOfHouseholdName} /><DetailItem label="حالة العائلة" value={localizeStatus(selected.familyStatus)} /><DetailItem label="مدينة العائلة" value={selected.familyCity} /><DetailItem label="الوصي" value={selected.guardianFullName} /><DetailItem label="بريد الوصي" value={selected.guardianEmail} /><DetailItem label="معرّف العائلة" value={selected.familyId} dir="ltr" /></dl></section>
      {selectedForReview && <section className="mt-6 border-t border-gray-200 pt-5"><label className="block max-w-xl text-sm font-bold">سبب طلب تعديل بيانات اليتيم<textarea value={reason} onChange={(event) => setReason(event.target.value)} maxLength={500} rows={3} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={Boolean(busy)} onClick={() => { setActionError(""); setConfirmation({ type: "approve", orphan: selected }); }} className="rounded-lg bg-[#008C78] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">اعتماد اليتيم</button><button type="button" disabled={Boolean(busy) || !reason.trim()} onClick={() => runReviewAction("update-orphan", () => adminApi.requestOrphanUpdate(selected.orphanId, reason.trim()), "تم إرسال طلب تعديل بيانات اليتيم بنجاح.")} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{busy === "update-orphan" ? "جارٍ إرسال الطلب..." : "طلب تعديل بيانات اليتيم"}</button></div></section>}
    </AdminDialog>}

    {selected && dialogMode === "edit" && editForm && <AdminDialog title="تعديل بيانات اليتيم" onClose={() => setDialogMode("details")} closeDisabled={busy === "edit-orphan"} footer={<><button type="button" onClick={() => setDialogMode("details")} disabled={busy === "edit-orphan"} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold">إلغاء</button><button type="submit" form="orphan-edit-form" disabled={busy === "edit-orphan"} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy === "edit-orphan" ? "جارٍ الحفظ..." : "حفظ التعديلات"}</button></>}>
      <form id="orphan-edit-form" onSubmit={submitEdit} className="grid gap-4 sm:grid-cols-2">{actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700 sm:col-span-2">{actionError}</p>}{[["firstName", "الاسم الأول"], ["fatherName", "اسم الأب"], ["grandfatherName", "اسم الجد"], ["nationalId", "رقم الهوية"], ["educationalStatus", "الحالة التعليمية"]].map(([name, label]) => <label key={name} className="text-sm font-bold text-gray-700">{label}<input value={editForm[name]} onChange={(event) => setEditForm({ ...editForm, [name]: event.target.value })} required maxLength={name === "educationalStatus" ? 100 : 150} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#0D4B8E]" /></label>)}<label className="text-sm font-bold text-gray-700">تاريخ الميلاد<input type="date" value={editForm.dateOfBirth} onChange={(event) => setEditForm({ ...editForm, dateOfBirth: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><label className="text-sm font-bold text-gray-700">الجنس<select value={editForm.gender} onChange={(event) => setEditForm({ ...editForm, gender: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5"><option value="1">ذكر</option><option value="2">أنثى</option></select></label><label className="text-sm font-bold text-gray-700 sm:col-span-2">وصف الحالة<textarea value={editForm.caseDescription} onChange={(event) => setEditForm({ ...editForm, caseDescription: event.target.value })} required maxLength={1000} rows={4} className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label></form>
    </AdminDialog>}

    {confirmation?.type === "approve" && <AdminConfirmationDialog title="اعتماد اليتيم" message="هل تريد اعتماد هذا اليتيم بعد مراجعة بياناته ووثائقه وسياق العائلة؟" warning="سيعتمد الخادم الوثائق المطلوبة الحالية ويُفعّل اليتيم ضمن عملية واحدة ذرّية." confirmLabel="اعتماد اليتيم" onConfirm={() => runReviewAction("approve-orphan", () => adminApi.approveOrphan(confirmation.orphan.orphanId), "تم اعتماد اليتيم بنجاح.")} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "approve-orphan"} error={actionError} />}
    {confirmation?.type === "status" && <AdminConfirmationDialog title={statusConfirmation(confirmation.status).title} message={statusConfirmation(confirmation.status).message} warning={statusConfirmation(confirmation.status).warning} confirmLabel={statusActionLabel(confirmation.status)} onConfirm={confirmStatusChange} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "status-orphan"} reason={statusReason} onReasonChange={setStatusReason} error={actionError} />}
    {confirmation?.type === "delete" && <AdminConfirmationDialog title="حذف اليتيم نهائيًا" message="هذا الإجراء نهائي ولا يمكن التراجع عنه." warning="إذا كان اليتيم مرتبطًا بسجل محمي فسيمنع الخادم الحذف. استخدم إخفاء اليتيم أو تعليقه بدلًا من محاولة حذف البيانات المرتبطة." confirmLabel="حذف نهائي" danger onConfirm={confirmDelete} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "delete-orphan"} error={actionError} />}
    </AdminLayout>
  );
}
