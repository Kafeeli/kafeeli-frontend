import { useCallback, useEffect, useState } from "react";
import { MdDescription, MdEdit } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { orphanApi } from "../../services/orphanApi";
import { apiErrorMessage, openProtectedBlob, unwrapResult } from "../../utils/apiUi";
import { ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import GuardianFlowLayout from "./GuardianFlowLayout";
import { localizeDisplayFields, localizeDocumentType } from "../../utils/localization";

const ORPHAN_DOCUMENT_TYPES = { BirthCertificate: 1, FatherDeathCertificate: 2, MotherDeathCertificate: 3, CaseReport: 4, RecentPhoto: 5, OrphanNationalId: 6, MedicalReport: 7, EducationProof: 8, Other: 9 };

export default function GuardianOrphanDetailsPage() {
  const { orphanId } = useParams();
  const [orphan, setOrphan] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [busy, setBusy] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const [orphanResult, documentsResult] = await Promise.all([orphanApi.getById(orphanId), orphanApi.getDocuments(orphanId)]);
      setOrphan(localizeDisplayFields(unwrapResult(orphanResult, "تعذر تحميل بيانات اليتيم."), ["orphanStatus", "gender", "educationalStatus"]));
      setDocuments((unwrapResult(documentsResult, "تعذر تحميل وثائق اليتيم.") || []).map((item) => ({ ...localizeDisplayFields(item, ["verificationStatus"]), arabicLabel: item.arabicLabel || localizeDocumentType(item.documentType) })));
    } catch (requestError) { setError(apiErrorMessage(requestError, "تعذر تحميل بيانات اليتيم.")); }
    finally { setLoading(false); }
  }, [orphanId]);
  useEffect(() => { const id = window.setTimeout(load, 0); return () => window.clearTimeout(id); }, [load]);
  useEffect(() => {
    if (!orphan?.hasProfileImage) return undefined;
    let objectUrl = "";
    let active = true;
    orphanApi.getProfileImage(orphanId).then((blob) => {
      objectUrl = URL.createObjectURL(blob);
      if (active) setImageUrl(objectUrl);
    }).catch(() => {});
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [orphan?.hasProfileImage, orphanId]);

  const viewFile = async (documentId) => { setBusy(documentId); setActionError(""); try { openProtectedBlob(await orphanApi.getDocumentFile(orphanId, documentId)); } catch (requestError) { setActionError(apiErrorMessage(requestError, "تعذر فتح الملف.")); } finally { setBusy(""); } };
  const upload = async (document, file) => {
    if (!file) return;
    const documentType = Number(document.documentType) || ORPHAN_DOCUMENT_TYPES[document.documentType];
    if (!documentType) { setActionError("نوع الوثيقة الذي أعاده الخادم غير قابل للإرسال وفق عقد OpenAPI."); return; }
    setBusy(document.documentType); setActionError("");
    try { unwrapResult(await orphanApi.reuploadDocument(orphanId, documentType, file), "تعذر رفع الوثيقة."); await load(); }
    catch (requestError) { setActionError(apiErrorMessage(requestError, "تعذر رفع الوثيقة.")); }
    finally { setBusy(""); }
  };
  const resubmit = async () => { setBusy("resubmit"); setActionError(""); try { unwrapResult(await orphanApi.resubmit(orphanId), "تعذر إعادة الإرسال."); await load(); } catch (requestError) { setActionError(apiErrorMessage(requestError, "تعذر إعادة الإرسال.")); } finally { setBusy(""); } };

  let content;
  if (loading) content = <LoadingState count={3} />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (orphan) content = <div className="space-y-6">
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div className="flex items-center gap-3">{imageUrl && <img src={imageUrl} alt={orphan.fullName || "صورة اليتيم"} className="h-16 w-16 rounded-full object-cover" />}<div><h2 className="text-xl font-extrabold text-[#003469]">{orphan.fullName || "—"}</h2><p className="mt-1 text-sm text-gray-500">{orphan.headOfHouseholdName || "—"}</p></div></div><span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-sm font-bold text-[#0D4B8E]">{orphan.orphanStatus || "—"}</span></div>{orphan.needsUpdateReason && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{orphan.needsUpdateReason}</p>}<dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="text-sm text-gray-500">رقم الهوية</dt><dd className="font-bold">{orphan.maskedNationalId || "—"}</dd></div><div><dt className="text-sm text-gray-500">العمر</dt><dd className="font-bold">{orphan.age}</dd></div><div><dt className="text-sm text-gray-500">الجنس</dt><dd className="font-bold">{orphan.gender || "—"}</dd></div><div><dt className="text-sm text-gray-500">التعليم</dt><dd className="font-bold">{orphan.educationalStatus || "—"}</dd></div></dl><div className="mt-5 flex flex-wrap gap-3">{orphan.canEdit && <Link to={`/guardian/orphans/${orphanId}/edit`} className="inline-flex items-center gap-2 rounded-lg bg-[#0D4B8E] px-4 py-2.5 text-sm font-bold text-white"><MdEdit />تعديل البيانات</Link>}{orphan.canResubmit && <button type="button" disabled={busy === "resubmit"} onClick={resubmit} className="rounded-lg bg-[#008C78] px-4 py-2.5 text-sm font-bold text-white">{busy === "resubmit" ? "جارٍ الإرسال..." : "إعادة الإرسال للمراجعة"}</button>}</div></section>
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="flex items-center gap-2 text-lg font-extrabold text-[#003469]"><MdDescription />وثائق اليتيم</h2><div className="mt-4 grid gap-4 md:grid-cols-2">{documents.map((document) => <article key={document.documentType} className="rounded-lg border border-gray-200 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-bold">{document.arabicLabel || document.documentType || "—"}</h3><p className="mt-1 text-xs text-gray-500">{document.verificationStatus || (document.hasCurrentDocument ? "مرفوعة" : "غير مرفوعة")}</p></div>{document.isRequired && <span className="text-xs font-bold text-red-600">مطلوبة</span>}</div>{document.needsUpdateReason && <p className="mt-3 rounded bg-amber-50 p-2 text-xs text-amber-800">{document.needsUpdateReason}</p>}<div className="mt-3 flex flex-wrap gap-2">{document.canView && document.documentId && <button type="button" disabled={busy === document.documentId} onClick={() => viewFile(document.documentId)} className="rounded bg-[#E8F1FA] px-3 py-2 text-xs font-bold text-[#0D4B8E]">عرض الملف</button>}{document.canReupload && <label className="cursor-pointer rounded bg-[#008C78] px-3 py-2 text-xs font-bold text-white">{busy === document.documentType ? "جارٍ الرفع..." : "إعادة رفع"}<input type="file" className="hidden" disabled={Boolean(busy)} onChange={(event) => upload(document, event.target.files?.[0])} /></label>}</div></article>)}</div>{!documents.length && <p className="mt-4 text-sm text-gray-500">لا توجد وثائق مطلوبة.</p>}{actionError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}</section>
  </div>;
  return <GuardianFlowLayout title="تفاصيل اليتيم">{content}</GuardianFlowLayout>;
}
