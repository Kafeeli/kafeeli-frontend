import { useCallback, useEffect, useState } from "react";
import {
  MdChildCare,
  MdDescription,
  MdEdit,
  MdBadge,
  MdCake,
  MdWc,
  MdSchool,
  MdFamilyRestroom,
  MdKeyboardArrowLeft,
  MdCloudUpload,
  MdOutlineRemoveRedEye,
  MdCheckCircle,
  MdErrorOutline,
  MdWarning,
  MdInfoOutline,
  MdSend,
  MdAssignment,
} from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { orphanApi } from "../../services/orphanApi";
import {
  apiErrorMessage,
  openProtectedBlob,
  unwrapResult,
} from "../../utils/apiUi";
import { ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import GuardianFlowLayout from "./GuardianFlowLayout";
import {
  localizeDisplayFields,
  localizeDocumentType,
} from "../../utils/localization";

const ORPHAN_DOCUMENT_TYPES = {
  BirthCertificate: 1,
  FatherDeathCertificate: 2,
  MotherDeathCertificate: 3,
  CaseReport: 4,
  RecentPhoto: 5,
  OrphanNationalId: 6,
  MedicalReport: 7,
  EducationProof: 8,
  Other: 9,
};

function getStatusBadgeConfig(status) {
  const str = String(status || "").toLowerCase();
  if (
    str.includes("نشط") ||
    str.includes("مقبول") ||
    str.includes("active") ||
    str.includes("approved")
  ) {
    return {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: status || "نشط",
    };
  }
  if (
    str.includes("مراجعة") ||
    str.includes("في الانتظار") ||
    str.includes("pending")
  ) {
    return {
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      dot: "bg-amber-500 animate-pulse",
      label: status || "قيد المراجعة",
    };
  }
  if (
    str.includes("تحديث") ||
    str.includes("مرفوض") ||
    str.includes("needsupdate") ||
    str.includes("rejected")
  ) {
    return {
      bg: "bg-rose-50 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
      label: status || "يتطلب تحديث",
    };
  }
  return {
    bg: "bg-slate-50 text-slate-700 border-slate-200",
    dot: "bg-slate-400",
    label: status || "—",
  };
}

function getDocBadgeConfig(status, hasDoc) {
  const str = String(status || "").toLowerCase();
  if (
    str.includes("مقبول") ||
    str.includes("موافق") ||
    str.includes("verified") ||
    str.includes("approved")
  ) {
    return {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Icon: MdCheckCircle,
      label: status || "مقبولة",
    };
  }
  if (str.includes("مراجعة") || str.includes("pending")) {
    return {
      bg: "bg-amber-50 text-amber-800 border-amber-200",
      Icon: MdWarning,
      label: status || "قيد المراجعة",
    };
  }
  if (
    str.includes("تحديث") ||
    str.includes("مرفوض") ||
    str.includes("rejected") ||
    str.includes("needsupdate")
  ) {
    return {
      bg: "bg-rose-50 text-rose-700 border-rose-200",
      Icon: MdErrorOutline,
      label: status || "يتطلب تحديث",
    };
  }
  if (hasDoc || str.includes("مرفوع") || str.includes("uploaded")) {
    return {
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      Icon: MdCheckCircle,
      label: status || "مرفوعة",
    };
  }
  return {
    bg: "bg-gray-100 text-gray-600 border-gray-200",
    Icon: MdInfoOutline,
    label: status || "غير مرفوعة",
  };
}

function getDocIcon(documentType) {
  const str = String(documentType || "").toLowerCase();
  if (str.includes("birth") || str.includes("1")) return MdChildCare;
  if (str.includes("national") || str.includes("id") || str.includes("6"))
    return MdBadge;
  if (
    str.includes("death") ||
    str.includes("father") ||
    str.includes("mother") ||
    str.includes("2") ||
    str.includes("3")
  )
    return MdAssignment;
  if (str.includes("photo") || str.includes("5")) return MdChildCare;
  if (str.includes("education") || str.includes("8")) return MdSchool;
  return MdDescription;
}

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
    setLoading(true);
    setError("");
    try {
      const [orphanResult, documentsResult] = await Promise.all([
        orphanApi.getById(orphanId),
        orphanApi.getDocuments(orphanId),
      ]);
      setOrphan(
        localizeDisplayFields(
          unwrapResult(orphanResult, "تعذر تحميل بيانات اليتيم."),
          ["orphanStatus", "gender", "educationalStatus"],
        ),
      );
      setDocuments(
        (unwrapResult(documentsResult, "تعذر تحميل وثائق اليتيم.") || []).map(
          (item) => ({
            ...localizeDisplayFields(item, ["verificationStatus"]),
            arabicLabel:
              item.arabicLabel || localizeDocumentType(item.documentType),
          }),
        ),
      );
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل بيانات اليتيم."));
    } finally {
      setLoading(false);
    }
  }, [orphanId]);

  useEffect(() => {
    const id = window.setTimeout(load, 0);
    return () => window.clearTimeout(id);
  }, [load]);

  useEffect(() => {
    if (!orphan?.hasProfileImage) return undefined;
    let objectUrl = "";
    let active = true;
    orphanApi
      .getProfileImage(orphanId)
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        if (active) setImageUrl(objectUrl);
      })
      .catch(() => {});
    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [orphan?.hasProfileImage, orphanId]);

  const viewFile = async (documentId) => {
    setBusy(documentId);
    setActionError("");
    try {
      openProtectedBlob(await orphanApi.getDocumentFile(orphanId, documentId));
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر فتح الملف."));
    } finally {
      setBusy("");
    }
  };

  const upload = async (document, file) => {
    if (!file) return;
    const documentType =
      Number(document.documentType) ||
      ORPHAN_DOCUMENT_TYPES[document.documentType];
    if (!documentType) {
      setActionError(
        "نوع الوثيقة الذي أعاده الخادم غير قابل للإرسال وفق عقد OpenAPI.",
      );
      return;
    }
    setBusy(document.documentType);
    setActionError("");
    try {
      unwrapResult(
        await orphanApi.reuploadDocument(orphanId, documentType, file),
        "تعذر رفع الوثيقة.",
      );
      await load();
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر رفع الوثيقة."));
    } finally {
      setBusy("");
    }
  };

  const resubmit = async () => {
    setBusy("resubmit");
    setActionError("");
    try {
      unwrapResult(await orphanApi.resubmit(orphanId), "تعذر إعادة الإرسال.");
      await load();
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر إعادة الإرسال."));
    } finally {
      setBusy("");
    }
  };

  let content;
  if (loading) content = <LoadingState count={3} />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (orphan) {
    const statusCfg = getStatusBadgeConfig(orphan.orphanStatus);
    const uploadedDocsCount = documents.filter(
      (d) => d.hasCurrentDocument || d.documentId,
    ).length;

    content = (
      <div className="space-y-6">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <nav className="flex items-center gap-1.5 text-gray-500">
            <Link
              to="/guardian-dashboard"
              className="hover:text-[#003469] transition"
            >
              لوحة التحكم
            </Link>
            <MdKeyboardArrowLeft className="text-gray-400" />
            <Link
              to="/guardian/orphans"
              className="hover:text-[#003469] transition"
            >
              الأيتام
            </Link>
            <MdKeyboardArrowLeft className="text-gray-400" />
            <span className="font-bold text-[#003469]">
              {orphan.fullName || "تفاصيل اليتيم"}
            </span>
          </nav>

          <Link
            to="/guardian/orphans"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0D4B8E] hover:text-[#003469] transition bg-[#E8F1FA] px-3 py-1.5 rounded-lg"
          >
            <MdKeyboardArrowLeft className="rotate-180 text-base" />
            العودة لقائمة الأيتام
          </Link>
        </div>

        {/* Hero Card / Profile Header */}
        <section className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8 transition hover:shadow-md">
          <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-l from-[#003469] via-[#0D4B8E] to-[#008C78]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={orphan.fullName || "صورة اليتيم"}
                    className="h-20 w-20 rounded-2xl object-cover ring-4 ring-[#E8F1FA] shadow-md"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8F1FA] to-blue-100 text-[#0D4B8E] ring-4 ring-[#E8F1FA] shadow-md">
                    <MdChildCare className="text-4xl" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl lg:text-3xl font-extrabold text-[#003469]">
                    {orphan.fullName || "—"}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${statusCfg.bg}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${statusCfg.dot}`}
                    />
                    {statusCfg.label}
                  </span>
                </div>

                <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <MdFamilyRestroom className="text-gray-400 text-base" />
                  رب الأسرة:{" "}
                  <span className="font-semibold text-gray-700">
                    {orphan.headOfHouseholdName || "غير محدد"}
                  </span>
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t md:border-t-0 md:pt-0 border-gray-100">
              {orphan.canEdit && (
                <Link
                  to={`/guardian/orphans/${orphanId}/edit`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#003469] transition active:scale-[0.98]"
                >
                  <MdEdit className="text-lg" />
                  تعديل البيانات
                </Link>
              )}

              {orphan.canResubmit && (
                <button
                  type="button"
                  disabled={busy === "resubmit"}
                  onClick={resubmit}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#008C78] px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#006e5e] transition active:scale-[0.98] disabled:opacity-50"
                >
                  {busy === "resubmit" ? (
                    <>
                      <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      جارٍ الإرسال...
                    </>
                  ) : (
                    <>
                      <MdSend className="text-lg" />
                      إعادة الإرسال للمراجعة
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Needs Update Reason Alert */}
          {orphan.needsUpdateReason && (
            <div className="mt-6 rounded-xl border-r-4 border-amber-500 bg-amber-50 p-4 text-amber-900">
              <div className="flex items-start gap-3">
                <MdWarning className="mt-0.5 text-xl text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-amber-900">
                    تنبيه من فريق المراجعة
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-amber-800">
                    {orphan.needsUpdateReason}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Info Grid Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#0D4B8E]">
                <MdBadge className="text-2xl" />
              </div>
              <div>
                <dt className="text-xs font-semibold text-gray-500">
                  رقم الهوية الوطنية
                </dt>
                <dd className="mt-1 text-base font-extrabold text-[#003469]">
                  {orphan.maskedNationalId || "—"}
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <MdCake className="text-2xl" />
              </div>
              <div>
                <dt className="text-xs font-semibold text-gray-500">العمر</dt>
                <dd className="mt-1 text-base font-extrabold text-[#003469]">
                  {orphan.age ? `${orphan.age} سنة` : "—"}
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <MdWc className="text-2xl" />
              </div>
              <div>
                <dt className="text-xs font-semibold text-gray-500">الجنس</dt>
                <dd className="mt-1 text-base font-extrabold text-[#003469]">
                  {orphan.gender || "—"}
                </dd>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MdSchool className="text-2xl" />
              </div>
              <div>
                <dt className="text-xs font-semibold text-gray-500">
                  المستوى التعليمي
                </dt>
                <dd className="mt-1 text-base font-extrabold text-[#003469]">
                  {orphan.educationalStatus || "—"}
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-gray-100">
            <div>
              <h2 className="flex items-center gap-2.5 text-xl font-extrabold text-[#003469]">
                <MdDescription className="text-[#0D4B8E] text-2xl" />
                وثائق اليتيم والشهادات
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                قائمة الوثائق الرسمية المطلوبة لاثبات حالة كفالة اليتيم
              </p>
            </div>

            {documents.length > 0 && (
              <span className="rounded-full bg-[#E8F1FA] px-3.5 py-1.5 text-xs font-bold text-[#0D4B8E]">
                مرفوع {uploadedDocsCount} من إجمالي {documents.length} وثائق
              </span>
            )}
          </div>

          {actionError && (
            <div
              role="alert"
              className="mt-5 flex items-center gap-3 rounded-xl bg-rose-50 p-4 text-sm font-semibold text-rose-700 border border-rose-200"
            >
              <MdErrorOutline className="text-xl shrink-0" />
              <span>{actionError}</span>
            </div>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {documents.map((doc) => {
              const docBadge = getDocBadgeConfig(
                doc.verificationStatus,
                doc.hasCurrentDocument,
              );
              const DocIcon = getDocIcon(doc.documentType);

              return (
                <article
                  key={doc.documentType}
                  className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#0D4B8E]/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E8F1FA] text-[#0D4B8E]">
                          <DocIcon className="text-xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-base group-hover:text-[#003469] transition">
                            {doc.arabicLabel || doc.documentType || "—"}
                          </h3>
                          <div className="mt-1 flex items-center gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-semibold ${docBadge.bg}`}
                            >
                              <docBadge.Icon className="text-sm" />
                              {docBadge.label}
                            </span>
                            {doc.isRequired && (
                              <span className="rounded-md bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600 border border-rose-100">
                                مطلوبة
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {doc.needsUpdateReason && (
                      <div className="mt-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
                        <p className="font-bold mb-0.5">سبب التعديل المطلوب:</p>
                        <p>{doc.needsUpdateReason}</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100">
                    {doc.canView && doc.documentId && (
                      <button
                        type="button"
                        disabled={busy === doc.documentId}
                        onClick={() => viewFile(doc.documentId)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8F1FA] px-3.5 py-2 text-xs font-bold text-[#0D4B8E] hover:bg-[#d0e3f7] transition active:scale-[0.98] disabled:opacity-50"
                      >
                        {busy === doc.documentId ? (
                          <>
                            <span className="h-3.5 w-3.5 rounded-full border-2 border-[#0D4B8E] border-t-transparent animate-spin" />
                            جارٍ الفتح...
                          </>
                        ) : (
                          <>
                            <MdOutlineRemoveRedEye className="text-base" />
                            عرض الملف
                          </>
                        )}
                      </button>
                    )}

                    {doc.canReupload && (
                      <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#008C78] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#006e5e] transition active:scale-[0.98]">
                        {busy === doc.documentType ? (
                          <>
                            <span className="h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            جارٍ الرفع...
                          </>
                        ) : (
                          <>
                            <MdCloudUpload className="text-base" />
                            إعادة رفع الملف
                          </>
                        )}
                        <input
                          type="file"
                          className="hidden"
                          disabled={Boolean(busy)}
                          onChange={(event) =>
                            upload(doc, event.target.files?.[0])
                          }
                        />
                      </label>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {!documents.length && (
            <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
              <MdDescription className="mx-auto text-4xl text-gray-300" />
              <p className="mt-2 text-sm font-semibold">
                لا توجد وثائق مخصصة لهذا اليتيم حاليًا.
              </p>
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <GuardianFlowLayout title="تفاصيل اليتيم">{content}</GuardianFlowLayout>
  );
}

