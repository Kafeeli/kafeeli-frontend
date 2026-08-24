import { useCallback, useEffect, useState } from "react";
import { MdChildCare, MdDescription } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, openProtectedBlob, unwrapResult } from "../../utils/apiUi";
import AdminLayout from "./Adminlayout";
import { EmptyState, ErrorState, LoadingState } from "./Adminstates";

export default function AdminOrphansReviewPage() {
  const [orphans, setOrphans] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [reason, setReason] = useState("");
  const [documentReason, setDocumentReason] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [orphanResult, documentResult] = await Promise.all([adminApi.getPendingOrphans(), adminApi.getPendingOrphanDocuments()]);
      setOrphans(unwrapResult(orphanResult, "تعذر تحميل الأيتام المعلقين.") || []);
      setDocuments(unwrapResult(documentResult, "تعذر تحميل الوثائق المعلقة.") || []);
    } catch (requestError) { setError(apiErrorMessage(requestError, "تعذر تحميل مراجعات الأيتام.")); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { const id = window.setTimeout(load, 0); return () => window.clearTimeout(id); }, [load]);

  const showOrphan = async (orphanId) => { setBusy(`detail-${orphanId}`); setActionError(""); try { setSelected(unwrapResult(await adminApi.getOrphanDetails(orphanId), "تعذر تحميل التفاصيل.")); } catch (requestError) { setActionError(apiErrorMessage(requestError)); } finally { setBusy(""); } };
  const act = async (key, request) => { setBusy(key); setActionError(""); try { unwrapResult(await request(), "تعذر تنفيذ الإجراء."); setSelected(null); setReason(""); await load(); } catch (requestError) { setActionError(apiErrorMessage(requestError)); } finally { setBusy(""); } };
  const viewBlob = async (key, request) => { setBusy(key); setActionError(""); try { openProtectedBlob(await request()); } catch (requestError) { setActionError(apiErrorMessage(requestError, "تعذر فتح الملف.")); } finally { setBusy(""); } };

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else content = <div className="space-y-8">
    <section><h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-[#003469]"><MdChildCare />الأيتام بانتظار المراجعة ({orphans.length})</h2>{orphans.length ? <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{orphans.map((orphan) => <article key={orphan.orphanId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex justify-between gap-3"><strong>{orphan.fullName || "—"}</strong><span className="text-xs font-bold text-[#0D4B8E]">{orphan.orphanStatus || "—"}</span></div><p className="mt-2 text-sm text-gray-500">{orphan.familyHeadOfHouseholdName || "—"} · {orphan.guardianFullName || "—"}</p><button type="button" disabled={busy === `detail-${orphan.orphanId}`} onClick={() => showOrphan(orphan.orphanId)} className="mt-4 w-full rounded-lg bg-[#0D4B8E] px-4 py-2 text-sm font-bold text-white">عرض ومراجعة</button></article>)}</div> : <EmptyState icon={MdChildCare} title="لا توجد حالات معلقة" description="لا توجد حالات أيتام بانتظار المراجعة." />}</section>
    {selected && <section className="rounded-xl border border-[#B8CCE0] bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-3"><div><h2 className="text-xl font-extrabold text-[#003469]">{selected.fullName || "—"}</h2><p className="text-sm text-gray-500">{selected.familyHeadOfHouseholdName || "—"}</p></div><button type="button" onClick={() => setSelected(null)} className="text-sm font-bold text-gray-500">إغلاق</button></div><dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="text-sm text-gray-500">الهوية</dt><dd className="font-bold">{selected.nationalId || "—"}</dd></div><div><dt className="text-sm text-gray-500">العمر</dt><dd className="font-bold">{selected.age}</dd></div><div><dt className="text-sm text-gray-500">الجنس</dt><dd className="font-bold">{selected.gender || "—"}</dd></div><div><dt className="text-sm text-gray-500">التعليم</dt><dd className="font-bold">{selected.educationalStatus || "—"}</dd></div></dl><p className="mt-4 rounded-lg bg-gray-50 p-4 text-sm">{selected.caseDescription || "—"}</p><div className="mt-4 flex flex-wrap gap-2">{selected.profileImageAccessEndpoint && <button type="button" onClick={() => viewBlob("image", () => adminApi.getOrphanProfileImage(selected.orphanId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E]">عرض الصورة</button>}{selected.familyFatherDeathCertificateAccessEndpoint && <button type="button" onClick={() => viewBlob("certificate", () => adminApi.getFamilyFatherDeathCertificate(selected.familyId))} className="rounded-lg bg-[#E8F1FA] px-4 py-2 text-sm font-bold text-[#0D4B8E]">شهادة وفاة الأب</button>}</div><label className="mt-5 block text-sm font-bold">سبب طلب التحديث<textarea value={reason} onChange={(event) => setReason(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><div className="mt-4 flex gap-3"><button type="button" disabled={Boolean(busy)} onClick={() => act("approve-orphan", () => adminApi.approveOrphan(selected.orphanId))} className="rounded-lg bg-[#008C78] px-5 py-2.5 text-sm font-bold text-white">اعتماد اليتيم</button><button type="button" disabled={Boolean(busy)} onClick={() => act("update-orphan", () => adminApi.requestOrphanUpdate(selected.orphanId, reason))} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white">طلب تحديث</button></div></section>}
    <section><h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-[#003469]"><MdDescription />وثائق الأيتام المعلقة ({documents.length})</h2>{documents.length ? <><label className="mb-4 block max-w-xl text-sm font-bold">سبب طلب تحديث الوثيقة<textarea value={documentReason} onChange={(event) => setDocumentReason(event.target.value)} maxLength={500} rows={2} className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label><div className="grid gap-4 md:grid-cols-2">{documents.map((document) => <article key={document.documentId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><h3 className="font-bold">{document.arabicLabel || document.documentType || "—"}</h3><p className="mt-1 text-sm text-gray-500">{document.orphanFullName || "—"} · {document.displayFileName || "—"}</p><div className="mt-4 flex flex-wrap gap-2"><button type="button" onClick={() => viewBlob(`doc-${document.documentId}`, () => adminApi.getOrphanDocumentFile(document.documentId))} className="rounded bg-[#E8F1FA] px-3 py-2 text-xs font-bold text-[#0D4B8E]">عرض الملف</button><button type="button" onClick={() => act(`approve-${document.documentId}`, () => adminApi.approveOrphanDocument(document.documentId))} className="rounded bg-[#008C78] px-3 py-2 text-xs font-bold text-white">اعتماد</button><button type="button" onClick={() => act(`update-${document.documentId}`, () => adminApi.requestOrphanDocumentUpdate(document.documentId, documentReason))} className="rounded bg-amber-600 px-3 py-2 text-xs font-bold text-white">طلب تحديث</button></div></article>)}</div></> : <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">لا توجد وثائق معلقة.</p>}</section>
    {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
  </div>;
  return <AdminLayout title="مراجعة الأيتام">{content}</AdminLayout>;
}
