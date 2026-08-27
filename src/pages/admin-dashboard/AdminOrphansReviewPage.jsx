import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";
import { MdChildCare, MdDescription } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, openProtectedBlob, unwrapResult } from "../../utils/apiUi";
import { formatArabicDateTime } from "../../utils/date";
import { localizeDocumentType, localizeStatus } from "../../utils/localization";
import AdminLayout from "./Adminlayout";
import { EmptyState, ErrorState, LoadingState, MiniStatCard } from "./Adminstates";

const ORPHAN_STATUS_FILTERS = [
  { value: "all", label: "كل الحالات" },
  { value: "PendingReview", label: "قيد المراجعة" },
  { value: "NeedsUpdate", label: "يحتاج تحديث" },
  { value: "Active", label: "نشط" },
  { value: "Hidden", label: "مخفي" },
  { value: "Suspended", label: "معلق" },
];

function documentFileErrorMessage(error) {
  const status = error?.response?.status;
  if (status === 401) return "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
  if (status === 403) return "ليس لديك صلاحية لعرض هذا المستند.";
  if (status === 404) return "المستند غير موجود.";
  return apiErrorMessage(error, "تعذر فتح المستند. حاول مرة أخرى.");
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [reason, setReason] = useState("");
  const [documentReason, setDocumentReason] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [allResult, pendingResult, documentResult] = await Promise.all([
        adminApi.getAllOrphans(),
        adminApi.getPendingOrphans(),
        adminApi.getPendingOrphanDocuments(),
      ]);
      setAllOrphans(unwrapResult(allResult, "تعذر تحميل جميع الأيتام.") || []);
      setPendingOrphans(unwrapResult(pendingResult, "تعذر تحميل الأيتام المعلقين.") || []);
      setDocuments(
        (unwrapResult(documentResult, "تعذر تحميل الوثائق المعلقة.") || []).map((item) => ({
          ...item,
          arabicLabel: item.arabicLabel || localizeDocumentType(item.documentType),
        })),
      );
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل بيانات الأيتام."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const filteredOrphans = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return allOrphans.filter((orphan) => {
      const matchesStatus = statusFilter === "all" || orphan.orphanStatus === statusFilter;
      const matchesSearch =
        !query ||
        [orphan.fullName, orphan.nationalId, orphan.familyHeadOfHouseholdName, orphan.guardianFullName, orphan.orphanId]
          .some((value) => String(value || "").toLowerCase().includes(query));
      return matchesStatus && matchesSearch;
    });
  }, [allOrphans, searchTerm, statusFilter]);

  const showOrphan = async (orphanId, forReview = false) => {
    setBusy(`detail-${orphanId}`);
    setActionError("");
    try {
      setSelected(unwrapResult(await adminApi.getOrphanDetails(orphanId), "تعذر تحميل تفاصيل اليتيم."));
      setSelectedForReview(forReview);
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحميل تفاصيل اليتيم."));
    } finally {
      setBusy("");
    }
  };

  const act = async (key, request) => {
    setBusy(key);
    setActionError("");
    try {
      unwrapResult(await request(), "تعذر تنفيذ الإجراء.");
      setSelected(null);
      setSelectedForReview(false);
      setReason("");
      await load();
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError));
    } finally {
      setBusy("");
    }
  };

  const viewBlob = async (key, request) => {
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

  const birthCertificate = selected?.requiredDocuments?.find(
    (document) => document.documentType === "BirthCertificate",
  );
  const hasBirthCertificate = Boolean(
    birthCertificate?.documentId && birthCertificate.hasCurrentDocument !== false && birthCertificate.canView !== false,
  );
  const hasFatherDeathCertificate = Boolean(
    selected?.familyId && selected.familyFatherDeathCertificateAccessEndpoint,
  );

  const selectTab = (tab) => {
    setActiveTab(tab);
    setSelected(null);
    setSelectedForReview(false);
    setActionError("");
  };

  let tabContent;
  if (activeTab === "all") {
    if (allOrphans.length === 0) {
      tabContent = <EmptyState icon={MdChildCare} title="لا يوجد أيتام" description="لم يُرجع الخادم أي سجلات أيتام حتى الآن." />;
    } else if (filteredOrphans.length === 0) {
      tabContent = <EmptyState icon={FiSearch} title="لا توجد نتائج مطابقة" description="جرّب تعديل عبارة البحث أو حالة اليتيم." />;
    } else {
      tabContent = (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[1300px] text-right text-sm">
          <thead className="bg-[#F5F7FA] text-[#374151]"><tr><th className="px-4 py-3 font-extrabold">الاسم الكامل</th><th className="px-4 py-3 font-extrabold">رقم الهوية</th><th className="px-4 py-3 font-extrabold">العمر</th><th className="px-4 py-3 font-extrabold">الجنس</th><th className="px-4 py-3 font-extrabold">العائلة</th><th className="px-4 py-3 font-extrabold">الوصي</th><th className="px-4 py-3 font-extrabold">حالة اليتيم</th><th className="px-4 py-3 font-extrabold">حالة العائلة</th><th className="px-4 py-3 font-extrabold">تاريخ الإنشاء</th><th className="px-4 py-3 font-extrabold">آخر تحديث</th><th className="px-4 py-3 font-extrabold">الإجراء</th></tr></thead>
          <tbody className="divide-y divide-gray-100">{filteredOrphans.map((orphan) => <tr key={orphan.orphanId} className="hover:bg-gray-50/70"><td className="px-4 py-4 font-bold text-[#003469]">{orphan.fullName || "—"}</td><td dir="ltr" className="px-4 py-4 text-right">{orphan.nationalId || "—"}</td><td className="px-4 py-4">{orphan.age ?? "—"}</td><td className="px-4 py-4">{localizeStatus(orphan.gender)}</td><td className="px-4 py-4">{orphan.familyHeadOfHouseholdName || "—"}</td><td className="px-4 py-4">{orphan.guardianFullName || "—"}</td><td className="px-4 py-4"><span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs font-bold text-[#0D4B8E]">{localizeStatus(orphan.orphanStatus)}</span></td><td className="px-4 py-4">{localizeStatus(orphan.familyStatus)}</td><td className="whitespace-nowrap px-4 py-4 text-gray-600">{formatArabicDateTime(orphan.createdAt)}</td><td className="whitespace-nowrap px-4 py-4 text-gray-600">{formatArabicDateTime(orphan.updatedAt)}</td><td className="px-4 py-4"><button type="button" disabled={busy === `detail-${orphan.orphanId}`} onClick={() => showOrphan(orphan.orphanId)} className="inline-flex items-center gap-2 rounded-lg bg-[#0D4B8E] px-3 py-2 text-xs font-bold text-white disabled:opacity-60"><FiEye />عرض التفاصيل</button></td></tr>)}</tbody>
        </table></div></div>
      );
    }
  } else if (activeTab === "pending") {
    tabContent = pendingOrphans.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{pendingOrphans.map((orphan) => <article key={orphan.orphanId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex justify-between gap-3"><strong>{orphan.fullName || "—"}</strong><span className="text-xs font-bold text-[#0D4B8E]">{localizeStatus(orphan.orphanStatus)}</span></div><p className="mt-2 text-sm text-gray-500">{orphan.familyHeadOfHouseholdName || "—"} · {orphan.guardianFullName || "—"}</p><button type="button" disabled={busy === `detail-${orphan.orphanId}`} onClick={() => showOrphan(orphan.orphanId, true)} className="mt-4 w-full rounded-lg bg-[#0D4B8E] px-4 py-2 text-sm font-bold text-white disabled:opacity-60">عرض ومراجعة</button></article>)}</div> : <EmptyState icon={MdChildCare} title="لا توجد حالات معلقة" description="لا توجد حالات أيتام بانتظار المراجعة." />;
  } else {
    tabContent = documents.length ? <><label className="mb-4 block max-w-xl text-sm font-bold">سبب طلب تحديث الوثيقة<textarea value={documentReason} onChange={(event) => setDocumentReason(event.target.value)} maxLength={500} rows={2} className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><div className="grid gap-4 md:grid-cols-2">{documents.map((document) => <article key={document.documentId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="font-bold">{document.arabicLabel || document.documentType || "—"}</h3><p className="mt-1 text-sm text-gray-500">{document.orphanFullName || "—"} · {document.displayFileName || "—"}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" disabled={Boolean(busy)} onClick={() => viewBlob(`doc-${document.documentId}`, () => adminApi.getOrphanDocumentFile(document.documentId))} className="rounded bg-[#E8F1FA] px-3 py-2 text-xs font-bold text-[#0D4B8E] disabled:opacity-60">{busy === `doc-${document.documentId}` ? "جارٍ فتح الملف..." : "عرض الملف"}</button><button type="button" disabled={Boolean(busy)} onClick={() => act(`approve-${document.documentId}`, () => adminApi.approveOrphanDocument(document.documentId))} className="rounded bg-[#008C78] px-3 py-2 text-xs font-bold text-white disabled:opacity-60">اعتماد</button><button type="button" disabled={Boolean(busy)} onClick={() => act(`update-${document.documentId}`, () => adminApi.requestOrphanDocumentUpdate(document.documentId, documentReason))} className="rounded bg-amber-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-60">طلب تحديث</button></div></article>)}</div></> : <EmptyState icon={MdDescription} title="لا توجد وثائق معلقة" description="لا توجد وثائق أيتام بانتظار المراجعة." />;
  }

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else content = <div className="space-y-6">
    <div><h1 className="text-2xl font-extrabold text-[#003469]">إدارة الأيتام</h1><p className="mt-1 text-sm text-gray-500">عرض جميع الأيتام مع الإبقاء على مسارات مراجعة الطلبات والوثائق.</p></div>
    <div className="max-w-sm"><MiniStatCard label="إجمالي الأيتام" value={allOrphans.length} icon={MdChildCare} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">{[{ key: "all", label: `جميع الأيتام (${allOrphans.length})` }, { key: "pending", label: `بانتظار المراجعة (${pendingOrphans.length})` }, { key: "documents", label: `الوثائق المعلقة (${documents.length})` }].map((tab) => <button key={tab.key} type="button" onClick={() => selectTab(tab.key)} className={`rounded-lg px-4 py-2.5 text-sm font-bold transition ${activeTab === tab.key ? "bg-[#0D4B8E] text-white" : "bg-white text-[#0D4B8E] hover:bg-[#E8F1FA]"}`}>{tab.label}</button>)}</div>
    {activeTab === "all" && <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-[1fr_220px]"><label className="relative"><span className="sr-only">البحث في الأيتام</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو الهوية أو العائلة أو الوصي" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="تصفية حسب حالة اليتيم" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-[#0D4B8E]">{ORPHAN_STATUS_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select></div>}
    {activeTab === "all" && <p className="text-sm font-bold text-gray-600">النتائج: {filteredOrphans.length}</p>}
    {tabContent}
    {selected && <section className="rounded-xl border border-[#B8CCE0] bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-extrabold text-[#003469]">{selected.fullName || "—"}</h2><p className="text-sm text-gray-500">{selected.familyHeadOfHouseholdName || "—"}</p></div><button type="button" onClick={() => setSelected(null)} className="text-sm font-bold text-gray-500">إغلاق</button></div><dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="text-sm text-gray-500">الهوية</dt><dd className="font-bold">{selected.nationalId || "—"}</dd></div><div><dt className="text-sm text-gray-500">العمر</dt><dd className="font-bold">{selected.age ?? "—"}</dd></div><div><dt className="text-sm text-gray-500">الجنس</dt><dd className="font-bold">{localizeStatus(selected.gender)}</dd></div><div><dt className="text-sm text-gray-500">التعليم</dt><dd className="font-bold">{localizeStatus(selected.educationalStatus)}</dd></div></dl><p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">{selected.caseDescription || "—"}</p><div className="mt-4 flex flex-wrap gap-2">{selected.profileImageAccessEndpoint && <button type="button" disabled={Boolean(busy)} onClick={() => viewBlob("image", () => adminApi.getOrphanProfileImage(selected.orphanId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:opacity-60">{busy === "image" ? "جارٍ فتح الصورة..." : "عرض الصورة"}</button>}</div><div className="mt-4 rounded-lg border border-[#D7E2EE] bg-[#F8FAFC] p-4"><h3 className="text-sm font-extrabold text-[#003469]">مستندات المراجعة</h3><div className="mt-3 flex flex-wrap gap-3"><div><button type="button" disabled={Boolean(busy) || !hasBirthCertificate} onClick={() => viewBlob("birth-certificate", () => adminApi.getOrphanDocumentFile(birthCertificate.documentId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60">{busy === "birth-certificate" ? "جارٍ فتح شهادة الميلاد..." : "عرض شهادة ميلاد اليتيم"}</button>{!hasBirthCertificate && <p className="mt-1 text-xs text-red-600">شهادة ميلاد اليتيم غير متوفرة.</p>}</div><div><button type="button" disabled={Boolean(busy) || !hasFatherDeathCertificate} onClick={() => viewBlob("father-death-certificate", () => adminApi.getFamilyFatherDeathCertificate(selected.familyId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60">{busy === "father-death-certificate" ? "جارٍ فتح شهادة الوفاة..." : "عرض شهادة وفاة الأب"}</button>{!hasFatherDeathCertificate && <p className="mt-1 text-xs text-red-600">شهادة وفاة الأب غير متوفرة.</p>}</div></div></div>{selectedForReview && <><label className="mt-5 block text-sm font-bold">سبب طلب التحديث<textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><div className="mt-4 flex gap-3"><button type="button" disabled={Boolean(busy)} onClick={() => act("approve-orphan", () => adminApi.approveOrphan(selected.orphanId))} className="rounded-lg bg-[#008C78] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">اعتماد اليتيم</button><button type="button" disabled={Boolean(busy)} onClick={() => act("update-orphan", () => adminApi.requestOrphanUpdate(selected.orphanId, reason))} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">طلب تحديث</button></div></>}</section>}
    {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
  </div>;

  return <AdminLayout title="إدارة الأيتام">{content}</AdminLayout>;
}
