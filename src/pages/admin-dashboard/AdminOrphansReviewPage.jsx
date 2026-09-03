import { useCallback, useEffect, useMemo, useState } from "react";
import { FiCheckCircle, FiEdit2, FiEye, FiEyeOff, FiFileText, FiHome, FiSearch, FiTrash2, FiUser } from "react-icons/fi";
import { MdChildCare, MdOutlineSchool, MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import {
  apiErrorMessage,
  openProtectedBlob,
  unwrapResult,
} from "../../utils/apiUi";

import { formatArabicDateTime } from "../../utils/date";

import { localizeStatus } from "../../utils/localization";

import AdminLayout from "./Adminlayout";
import {
  AdminConfirmationDialog,
  AdminDetailItem,
  AdminDetailsHero,
  AdminDetailsSection,
  AdminDialog,
} from "./AdminManagementDialogs";
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

export default function AdminOrphansReviewPage() {
  const [allOrphans, setAllOrphans] = useState([]);
  const [pendingOrphans, setPendingOrphans] = useState([]);
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
  const [profileImage, setProfileImage] = useState({ orphanId: null, status: "idle", url: "", error: "" });

  const load = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError("");

    try {
      const [allResult, pendingResult] = await Promise.all([
        adminApi.getAllOrphans(),
        adminApi.getPendingOrphans(),
      ]);
      setAllOrphans(unwrapResult(allResult, "تعذر تحميل جميع الأيتام.") || []);
      setPendingOrphans(unwrapResult(pendingResult, "تعذر تحميل الأيتام المعلقين.") || []);
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

  useEffect(() => {
    let active = true;
    let objectUrl = "";

    if (dialogMode !== "details" || !selected?.profileImageAccessEndpoint) {
      return undefined;
    }

    adminApi.getOrphanProfileImage(selected.orphanId)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        if (active) setProfileImage({ orphanId: selected.orphanId, status: "loaded", url: objectUrl, error: "" });
        else URL.revokeObjectURL(objectUrl);
      })
      .catch((requestError) => {
        if (active) setProfileImage({ orphanId: selected.orphanId, status: "error", url: "", error: documentFileErrorMessage(requestError) });
      });

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [dialogMode, selected?.orphanId, selected?.profileImageAccessEndpoint]);

  const fetchDetails = useCallback(async (orphanId) => (
    unwrapResult(await adminApi.getOrphanDetails(orphanId), "تعذر تحميل تفاصيل اليتيم.")
  ), []);

  const showOrphan = async (orphanId, { forReview = false, mode = "details" } = {}) => {
    if (busy) return;
    setProfileImage({ orphanId: null, status: "idle", url: "", error: "" });
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
      setProfileImage({ orphanId: null, status: "idle", url: "", error: "" });
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
    setProfileImage({ orphanId: null, status: "idle", url: "", error: "" });

    setActionError("");
  };

  const returnToDetails = () => {
    setProfileImage({ orphanId: null, status: "idle", url: "", error: "" });
    setDialogMode("details");
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
  } else {
    tabContent = pendingOrphans.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{pendingOrphans.map((orphan) => <article key={orphan.orphanId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex justify-between gap-3"><strong>{orphan.fullName || "—"}</strong><span className="text-xs font-bold text-[#0D4B8E]">{orphanStatusLabel(orphan.orphanStatus)}</span></div><p className="mt-2 text-sm text-gray-500">{orphan.familyHeadOfHouseholdName || "—"} · {orphan.guardianFullName || "—"}</p><button type="button" disabled={Boolean(busy)} onClick={() => showOrphan(orphan.orphanId, { forReview: true })} className="mt-4 w-full rounded-lg bg-[#0D4B8E] px-4 py-2 text-sm font-bold text-white disabled:opacity-60">عرض ومراجعة</button></article>)}</div> : <EmptyState icon={MdChildCare} title="لا توجد حالات معلقة" description="لا توجد حالات أيتام بانتظار المراجعة." />;
  }

  return (
    <AdminLayout title="إدارة الأيتام"><div className="space-y-6">
      <div><h1 className="text-2xl font-extrabold text-[#003469]">إدارة الأيتام</h1><p className="mt-1 text-sm text-gray-500">إدارة جميع الأيتام مع إبقاء المراجعة الأولية ومسار تصحيح الوثائق منفصلين.</p></div>
      <div className="max-w-sm"><MiniStatCard label="إجمالي الأيتام" value={allOrphans.length} icon={MdChildCare} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
      <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">{[{ key: "all", label: `جميع الأيتام (${allOrphans.length})` }, { key: "pending", label: `بانتظار المراجعة (${pendingOrphans.length})` }].map((tab) => <button key={tab.key} type="button" onClick={() => selectTab(tab.key)} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${activeTab === tab.key ? "bg-[#0D4B8E] text-white" : "bg-white text-[#0D4B8E] hover:bg-[#E8F1FA]"}`}>{tab.label}</button>)}</div>
      {activeTab === "all" && <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-[1fr_220px]"><label className="relative"><span className="sr-only">البحث في الأيتام</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو رقم الهوية" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="تصفية حسب حالة اليتيم" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{ORPHAN_STATUS_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select></div>}
      {actionError && !selected && !confirmation && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}{successMessage && <p role="status" className="rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{successMessage}</p>}
      {activeTab === "all" && <p className="text-sm font-bold text-gray-600">النتائج: {filteredOrphans.length}</p>}
      {loading ? <LoadingState /> : error ? <ErrorState onRetry={load} description={error} /> : tabContent}
    </div>

    {selected && dialogMode === "details" && <AdminDialog title={selectedForReview ? "مراجعة ملف اليتيم" : "تفاصيل اليتيم"} onClose={closeDetails} closeDisabled={Boolean(busy)} size="max-w-5xl" footer={!selectedForReview ? <><button type="button" onClick={() => setDialogMode("edit")} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white">تعديل</button>{(STATUS_TRANSITIONS[selected.orphanStatus] || []).map((status) => <button key={status} type="button" onClick={() => openStatusConfirmation(selected, status)} className={`rounded-lg px-5 py-2.5 text-sm font-bold text-white ${status === "Active" ? "bg-emerald-600" : status === "Hidden" ? "bg-slate-600" : "bg-amber-600"}`}>{statusActionLabel(status)}</button>)}<button type="button" onClick={() => { setActionError(""); setConfirmation({ type: "delete", orphan: selected }); }} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-700">حذف نهائي</button></> : undefined}>
      <div className="space-y-5">
        {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}
        <AdminDetailsHero icon={MdChildCare} eyebrow={selectedForReview ? "ملف بانتظار المراجعة" : "ملف اليتيم"} title={selected.fullName} subtitle={selected.familyHeadOfHouseholdName ? `عائلة ${selected.familyHeadOfHouseholdName}` : "لا توجد بيانات للعائلة"} badges={[{ label: "الحالة", value: orphanStatusLabel(selected.orphanStatus) }, { label: "العمر", value: selected.age != null ? `${selected.age} سنة` : "—" }]}>
          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-4 border-white/25 bg-white/10 shadow-xl" aria-live="polite">
            {selected.profileImageAccessEndpoint && profileImage.orphanId === selected.orphanId && profileImage.status === "loaded" && <img src={profileImage.url} alt={`صورة ${selected.fullName || "اليتيم"}`} className="h-full w-full object-cover" />}
            {selected.profileImageAccessEndpoint && profileImage.orphanId !== selected.orphanId && <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-[#47DBE0]" aria-label="جارٍ تحميل صورة اليتيم" />}
            {(!selected.profileImageAccessEndpoint || (profileImage.orphanId === selected.orphanId && profileImage.status === "error")) && <div className="px-3 text-center"><MdChildCare className="mx-auto text-4xl text-white/60" aria-hidden="true" /><span className="mt-1 block text-[11px] text-white/70">{selected.profileImageAccessEndpoint ? "تعذر تحميل الصورة" : "لا توجد صورة"}</span></div>}
          </div>
        </AdminDetailsHero>
        {profileImage.orphanId === selected.orphanId && profileImage.error && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-bold text-amber-800">{profileImage.error}</p>}
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminDetailsSection title="البيانات الشخصية والتعليمية" icon={FiUser}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="رقم الهوية" value={selected.nationalId} dir="ltr" /><AdminDetailItem label="تاريخ الميلاد" value={toDateInputValue(selected.dateOfBirth)} /><AdminDetailItem label="العمر" value={selected.age} /><AdminDetailItem label="الجنس" value={localizeStatus(selected.gender)} /><AdminDetailItem label="الحالة التعليمية" value={localizeStatus(selected.educationalStatus)} /><AdminDetailItem label="الوالد المتوفى" value={selected.deceasedParent} /><AdminDetailItem label="تاريخ الإنشاء" value={formatArabicDateTime(selected.createdAt)} /><AdminDetailItem label="تاريخ المراجعة" value={formatArabicDateTime(selected.reviewedAt)} /></dl></AdminDetailsSection>
          <AdminDetailsSection title="بيانات العائلة والوصي" icon={FiHome}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="رب الأسرة" value={selected.familyHeadOfHouseholdName} /><AdminDetailItem label="حالة العائلة" value={localizeStatus(selected.familyStatus)} /><AdminDetailItem label="مدينة العائلة" value={selected.familyCity} /><AdminDetailItem label="الوصي" value={selected.guardianFullName} /><AdminDetailItem label="بريد الوصي" value={selected.guardianEmail} wide /><AdminDetailItem label="معرّف العائلة" value={selected.familyId} dir="ltr" /><AdminDetailItem label="معرّف اليتيم" value={selected.orphanId} dir="ltr" /></dl></AdminDetailsSection>
        </div>
        <AdminDetailsSection title="وصف الحالة" icon={MdOutlineSchool}><p className="whitespace-pre-wrap text-sm leading-8 text-slate-700">{selected.caseDescription || "لا يوجد وصف مسجل للحالة."}</p></AdminDetailsSection>
        <AdminDetailsSection title="شهادة الميلاد والوثائق" icon={FiFileText}><div className="flex flex-wrap gap-3"><div><button type="button" disabled={Boolean(busy) || !hasBirthCertificate} onClick={() => viewBlob("birth-certificate", () => adminApi.getOrphanDocumentFile(birthCertificate.documentId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60">{busy === "birth-certificate" ? "جارٍ فتح الوثيقة..." : "عرض شهادة الميلاد"}</button>{!hasBirthCertificate && <p className="mt-1 text-xs text-red-600">شهادة ميلاد اليتيم غير متوفرة.</p>}</div><div><button type="button" disabled={Boolean(busy) || !hasFatherDeathCertificate} onClick={() => viewBlob("father-death-certificate", () => adminApi.getFamilyFatherDeathCertificate(selected.familyId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60">{busy === "father-death-certificate" ? "جارٍ فتح شهادة الوفاة..." : "عرض شهادة وفاة الأب"}</button>{!hasFatherDeathCertificate && <p className="mt-1 text-xs text-red-600">شهادة وفاة الأب غير متوفرة.</p>}</div></div>{selectedForReview && hasBirthCertificate && <><label className="mt-4 block max-w-xl text-sm font-bold">سبب طلب تعديل الوثيقة<textarea value={documentReason} onChange={(event) => setDocumentReason(event.target.value)} maxLength={500} rows={2} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><button type="button" disabled={Boolean(busy) || !documentReason.trim()} onClick={() => runReviewAction("update-birth-certificate", () => adminApi.requestOrphanDocumentUpdate(birthCertificate.documentId, documentReason.trim()), "تم إرسال طلب تعديل الوثيقة بنجاح.")} className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{busy === "update-birth-certificate" ? "جارٍ إرسال الطلب..." : "طلب تعديل الوثيقة"}</button></>}</AdminDetailsSection>
      </div>
      {selectedForReview && <section className="mt-6 border-t border-gray-200 pt-5"><label className="block max-w-xl text-sm font-bold">سبب طلب تعديل بيانات اليتيم<textarea value={reason} onChange={(event) => setReason(event.target.value)} maxLength={500} rows={3} required className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><div className="mt-4 flex flex-wrap gap-3"><button type="button" disabled={Boolean(busy)} onClick={() => { setActionError(""); setConfirmation({ type: "approve", orphan: selected }); }} className="rounded-lg bg-[#008C78] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">اعتماد اليتيم</button><button type="button" disabled={Boolean(busy) || !reason.trim()} onClick={() => runReviewAction("update-orphan", () => adminApi.requestOrphanUpdate(selected.orphanId, reason.trim()), "تم إرسال طلب تعديل بيانات اليتيم بنجاح.")} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">{busy === "update-orphan" ? "جارٍ إرسال الطلب..." : "طلب تعديل بيانات اليتيم"}</button></div></section>}
    </AdminDialog>}

    {selected && dialogMode === "edit" && editForm && <AdminDialog title="تعديل بيانات اليتيم" onClose={returnToDetails} closeDisabled={busy === "edit-orphan"} footer={<><button type="button" onClick={returnToDetails} disabled={busy === "edit-orphan"} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold">إلغاء</button><button type="submit" form="orphan-edit-form" disabled={busy === "edit-orphan"} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy === "edit-orphan" ? "جارٍ الحفظ..." : "حفظ التعديلات"}</button></>}>
      <form id="orphan-edit-form" onSubmit={submitEdit} className="grid gap-4 sm:grid-cols-2">{actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700 sm:col-span-2">{actionError}</p>}{[["firstName", "الاسم الأول"], ["fatherName", "اسم الأب"], ["grandfatherName", "اسم الجد"], ["nationalId", "رقم الهوية"], ["educationalStatus", "الحالة التعليمية"]].map(([name, label]) => <label key={name} className="text-sm font-bold text-gray-700">{label}<input value={editForm[name]} onChange={(event) => setEditForm({ ...editForm, [name]: event.target.value })} required maxLength={name === "educationalStatus" ? 100 : 150} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#0D4B8E]" /></label>)}<label className="text-sm font-bold text-gray-700">تاريخ الميلاد<input type="date" value={editForm.dateOfBirth} onChange={(event) => setEditForm({ ...editForm, dateOfBirth: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><label className="text-sm font-bold text-gray-700">الجنس<select value={editForm.gender} onChange={(event) => setEditForm({ ...editForm, gender: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5"><option value="1">ذكر</option><option value="2">أنثى</option></select></label><label className="text-sm font-bold text-gray-700 sm:col-span-2">وصف الحالة<textarea value={editForm.caseDescription} onChange={(event) => setEditForm({ ...editForm, caseDescription: event.target.value })} required maxLength={1000} rows={4} className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label></form>
    </AdminDialog>}

    {confirmation?.type === "approve" && <AdminConfirmationDialog title="اعتماد اليتيم" message="هل تريد اعتماد هذا اليتيم بعد مراجعة بياناته ووثائقه وسياق العائلة؟" warning="سيعتمد الخادم الوثائق المطلوبة الحالية ويُفعّل اليتيم ضمن عملية واحدة ذرّية." confirmLabel="اعتماد اليتيم" onConfirm={() => runReviewAction("approve-orphan", () => adminApi.approveOrphan(confirmation.orphan.orphanId), "تم اعتماد اليتيم بنجاح.")} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "approve-orphan"} error={actionError} />}
    {confirmation?.type === "status" && <AdminConfirmationDialog title={statusConfirmation(confirmation.status).title} message={statusConfirmation(confirmation.status).message} warning={statusConfirmation(confirmation.status).warning} confirmLabel={statusActionLabel(confirmation.status)} onConfirm={confirmStatusChange} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "status-orphan"} reason={statusReason} onReasonChange={setStatusReason} error={actionError} />}
    {confirmation?.type === "delete" && <AdminConfirmationDialog title="حذف اليتيم نهائيًا" message="هذا الإجراء نهائي ولا يمكن التراجع عنه." warning="إذا كان اليتيم مرتبطًا بسجل محمي فسيمنع الخادم الحذف. استخدم إخفاء اليتيم أو تعليقه بدلًا من محاولة حذف البيانات المرتبطة." confirmLabel="حذف نهائي" danger onConfirm={confirmDelete} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "delete-orphan"} error={actionError} />}
    </AdminLayout>
  );
}
