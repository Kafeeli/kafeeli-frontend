import { useState, useEffect } from "react";
import {
  MdMenu,
  MdNotificationsNone,
  MdGavel,
  MdBadge,
  MdFamilyRestroom,
  MdVideocam,
  MdWarningAmber,
  MdCheckCircle,
  MdDescription,
  MdArchive,
  MdLockOutline,
  MdCloudUpload,
  MdErrorOutline,
} from "react-icons/md";

import Sidebar from "./Sidebar";
import DocumentUploadModal from "./DocumentUploadModal";
import personalImage from "../../assets/personal.jpg";
import { guardianDocumentsApi } from "../../services/guardianDocumentsApi";
import {
  DOCUMENT_TYPE_NAME_TO_KEY,
  mapDocumentStatus,
} from "../../config/documentTypeConfig"

/* ========================================================================== */
/* ⚙️ البيانات الثابتة لكل خانة وثيقة (عنوان، وصف، أيقونة، حدود الملف)      */
/* ========================================================================== */
/**
 * هاد ميتاداتا العرض بس (مش من الـ API — الـ API بيرجع بس حالة/معرّف/اسم ملف).
 * الحدود (الصيغ والحجم) مأخوذة حرفيًا من وصف POST endpoint:
 * - الهوية/حجة الوصاية/إقرار الحضانة: PDF, JPG, JPEG, PNG حتى 5MB
 * - فيديو السيلفي: MP4, MOV, WEBM حتى 15MB ومدة أقصاها 5 ثوان
 */
const DOCUMENT_META = {
  nationalId: {
    title: "الهوية الشخصية ورقمها",
    description: "بطاقة الهوية الفلسطينية كاملة ورقمها.",
    icon: MdBadge,
    isVideo: false,
    acceptedFormats: "JPG, JPEG, PNG, PDF",
    maxSizeMB: 5,
  },
  guardianshipDeed: {
    title: "وثيقة حجة الوصاية أو الولاية",
    description:
      "المستند القانوني الذي يثبت حق الوصاية أو الولاية مثل حجة الوصاية أو الولاية.",
    icon: MdGavel,
    isVideo: false,
    acceptedFormats: "JPG, JPEG, PNG, PDF",
    maxSizeMB: 5,
  },
  selfieVideo: {
    title: "فيديو سيلفي مع الهوية",
    description: "مدة الفيديو: لا تتجاوز 5 ثوان.",
    icon: MdVideocam,
    isVideo: true,
    acceptedFormats: "MP4, MOV, WEBM",
    maxSizeMB: 15,
  },
  custodyDeclaration: {
    title: "وثيقة إقرار الحضانة",
    description: "المستند القانوني الذي يثبت حقك في رعاية الأيتام.",
    icon: MdFamilyRestroom,
    isVideo: false,
    acceptedFormats: "JPG, JPEG, PNG, PDF",
    maxSizeMB: 5,
  },
};

// نفس ترتيب العرض المتفق عليه (RTL: الهوية أعلى يمين، حجة الوصاية أعلى يسار،
// فيديو سيلفي تحت يمين، إقرار الحضانة تحت يسار)
const DISPLAY_ORDER = [
  "nationalId",
  "guardianshipDeed",
  "selfieVideo",
  "custodyDeclaration",
];

const STATUS_CONFIG = {
  notUploaded: {
    label: "لم يتم الرفع",
    badgeClass: "bg-gray-100 text-gray-500",
    icon: MdWarningAmber,
  },
  pendingReview: {
    label: "قيد المراجعة",
    badgeClass: "bg-teal-50 text-teal-700",
    icon: MdCheckCircle,
  },
  approved: {
    label: "تم الاعتماد",
    badgeClass: "bg-teal-50 text-teal-700",
    icon: MdCheckCircle,
  },
  needsUpdate: {
    label: "تحتاج تعديل",
    badgeClass: "bg-red-100 text-red-700",
    icon: MdWarningAmber,
  },
};

// يبني شكل الصفحة الداخلي (key, status, rejectionReason, documentId, canReupload)
// من استجابة GET الحقيقية + ميتاداتا العرض الثابتة
function buildDocumentsFromApi(apiDocuments) {
  const byKey = {};
  (apiDocuments || []).forEach((d) => {
    const key = DOCUMENT_TYPE_NAME_TO_KEY[d.documentType];
    if (key) byKey[key] = d;
  });

  return DISPLAY_ORDER.map((key) => {
    const apiDoc = byKey[key];
    return {
      key,
      ...DOCUMENT_META[key],
      status: apiDoc
        ? mapDocumentStatus(apiDoc.hasCurrentDocument, apiDoc.verificationStatus)
        : "notUploaded",
      rejectionReason: apiDoc?.rejectionReason || "",
      documentId: apiDoc?.documentId || null,
      canReupload: apiDoc?.canReupload ?? true,
    };
  });
}

function getOverallStatus(documents) {
  if (documents.some((d) => d.status === "needsUpdate")) return "needsUpdate";
  if (documents.some((d) => d.status === "pendingReview")) return "pendingReview";
  if (documents.every((d) => d.status === "approved")) return "approved";
  return "notUploaded";
}

function GuardianDocuments() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [activeUploadDoc, setActiveUploadDoc] = useState(null);
  const [viewingDocId, setViewingDocId] = useState(null);

  const fetchDocuments = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await guardianDocumentsApi.getDocuments();
      setDocuments(buildDocumentsFromApi(res?.data?.documents));
    } catch (err) {
      setLoadError("تعذر تحميل بيانات الوثائق، حاول مجددًا.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const overallStatus = getOverallStatus(documents);
  const overallConfig = STATUS_CONFIG[overallStatus];

  const counts = {
    needsUpdate: documents.filter((d) => d.status === "needsUpdate").length,
    approved: documents.filter((d) => d.status === "approved").length,
    pendingReview: documents.filter((d) => d.status === "pendingReview").length,
    total: documents.length,
  };

  const handleOpenUpload = (doc) => {
    setActiveUploadDoc(doc);
  };

  // POST /api/v1/guardians/me/documents الفعلي
  const handleUploadSubmit = async ({ file, idNumber }) => {
    const res = await guardianDocumentsApi.uploadDocument({
      documentTypeKey: activeUploadDoc.key,
      file,
      nationalId: idNumber,
    });

    const apiDoc = res?.data;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.key === activeUploadDoc.key
          ? {
              ...doc,
              status: mapDocumentStatus(apiDoc?.hasCurrentDocument ?? true, apiDoc?.verificationStatus),
              rejectionReason: "",
              documentId: apiDoc?.documentId || doc.documentId,
              canReupload: apiDoc?.canReupload ?? doc.canReupload,
            }
          : doc
      )
    );
    setActiveUploadDoc(null);
  };

  // GET /api/v1/guardians/me/documents/{documentId}/file — بيفتح الملف كـ blob بتبويب جديد
  const handleViewDocument = async (doc) => {
    if (!doc.documentId || viewingDocId) return;
    setViewingDocId(doc.key);
    try {
      const blob = await guardianDocumentsApi.getDocumentFile(doc.documentId);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      // نأخر تحرير الرابط شوي لإعطاء المتصفح فرصة يفتح التبويب قبل ما ينلغى
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch (err) {
      alert("تعذر فتح الملف، حاول مجددًا.");
    } finally {
      setViewingDocId(null);
    }
  };

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-[Cairo,sans-serif]">
        <p className="text-[#003469] font-bold text-sm animate-pulse">جارٍ تحميل بيانات الوثائق...</p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-[Cairo,sans-serif] p-4">
        <div className="bg-white border border-red-200 rounded-xl p-6 max-w-md text-center space-y-3">
          <MdErrorOutline className="text-red-500 text-4xl mx-auto" />
          <p className="text-[#111827] font-bold text-sm">{loadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8fafc] flex overflow-x-hidden font-[Cairo,sans-serif] text-right"
    >
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div className="flex-1 min-w-0 w-full lg:mr-[255px] flex flex-col justify-between">
        {/* ---------------------------- Top Navbar ---------------------------- */}
        <header className="w-full h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#424750] hover:bg-gray-50 transition shrink-0 cursor-pointer"
            >
              <MdMenu className="text-2xl" />
            </button>
            <h1 className="font-bold text-[16px] text-[#003469] truncate">
              وثائق الوصي
            </h1>
          </div>

          <div dir="ltr" className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src={personalImage}
                alt="صورة المستخدم"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div dir="rtl" className="text-right hidden sm:block">
                <h3 className="font-bold text-[13px] text-[#111827] leading-tight">
                  أحمد العلي
                </h3>
                <p className="text-[11px] text-gray-500">الوصي المعتمد</p>
              </div>
            </div>
            <div className="w-px h-6 bg-[#D8DEE8]" />
            <button className="relative w-8 h-8 flex items-center justify-center text-[#111827] hover:bg-gray-50 rounded-lg transition cursor-pointer">
              <MdNotificationsNone className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
          </div>
        </header>

        {/* ============================== Main ============================== */}
        <main className="p-4 sm:p-6 flex-1">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* عنوان الصفحة + بادج الحالة الإجمالية */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-[18px] sm:text-[20px] font-bold text-[#003469]">
                  إدارة الوثائق
                </h2>
                <p className="text-[13px] text-[#6B7280] mt-1">
                  يرجى رفع المستندات الثبوتية المطلوبة لتتمكن من تفعيل كامل ميزات حسابك.
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold shrink-0 ${overallConfig.badgeClass}`}
              >
                <overallConfig.icon className="text-[14px]" />
                {overallConfig.label}
              </span>
            </div>

            {/* بطاقات الملخص */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <SummaryCard
                label="إجمالي الوثائق"
                value={counts.total}
                icon={MdArchive}
                accentClass="text-[#003469]"
              />
              <SummaryCard
                label="قيد المراجعة"
                value={counts.pendingReview}
                icon={MdDescription}
                accentClass="text-[#003469]"
              />
              <SummaryCard
                label="تم الاعتماد"
                value={counts.approved}
                icon={MdCheckCircle}
                accentClass="text-teal-600"
              />
              <SummaryCard
                label="تحتاج تعديل"
                value={counts.needsUpdate}
                icon={MdWarningAmber}
                accentClass="text-red-600"
              />
            </div>

            {/* إشعار الخصوصية */}
            <div className="rounded-lg bg-white border border-[#E2E8F0] px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F3F4F5] flex items-center justify-center shrink-0">
                <MdLockOutline className="text-[#003469] text-[18px]" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#111827]">
                  حماية البيانات والخصوصية
                </h4>
                <p className="text-[12px] text-[#6B7280] mt-0.5 leading-5">
                  الوثائق المرفوعة يتم تخزينها بشكل مشفر وآمن، ولا تظهر لأي ملف شخصي عام.
                </p>
              </div>
            </div>

            {/* شبكة بطاقات الوثائق */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.key}
                  doc={doc}
                  onUploadClick={() => handleOpenUpload(doc)}
                  onViewClick={() => handleViewDocument(doc)}
                  viewing={viewingDocId === doc.key}
                />
              ))}
            </div>
          </div>
        </main>

        <footer className="w-full h-[54px] bg-white border-t border-[#E5E7EB] flex items-center justify-center px-4 shrink-0 z-10">
          <p className="text-[12px] text-center text-gray-400">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>

      {activeUploadDoc && (
        <DocumentUploadModal
          doc={activeUploadDoc}
          onClose={() => setActiveUploadDoc(null)}
          onSubmit={handleUploadSubmit}
        />
      )}
    </div>
  );
}

/* ========================================================================== */
/* 🧩 بطاقة ملخص رقمية (إجمالي / قيد المراجعة / تم الاعتماد / تحتاج تعديل)   */
/* ========================================================================== */
const SummaryCard = ({ label, value, icon: Icon, accentClass }) => (
  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col items-center justify-center text-center gap-1.5">
    <Icon className={`text-[22px] ${accentClass}`} />
    <span className={`text-[20px] font-bold ${accentClass}`}>{value}</span>
    <span className="text-[11px] text-[#6B7280] font-medium leading-tight">
      {label}
    </span>
  </div>
);

/* ========================================================================== */
/* 🧩 بطاقة وثيقة واحدة، شكلها بيتغير حسب الحالة                              */
/* ========================================================================== */
const DocumentCard = ({ doc, onUploadClick, onViewClick, viewing }) => {
  const Icon = doc.icon;
  const config = STATUS_CONFIG[doc.status];
  const StatusIcon = config.icon;

  // بالحالتين notUploaded و needsUpdate، الرفع مسموح دايمًا. لباقي الحالات
  // (Pending/Approved) الرفع مقفول إلا لو الـ API صراحة رجّع canReupload=true
  const showUploadButton =
    doc.status === "notUploaded" ||
    doc.status === "needsUpdate" ||
    (doc.status !== "notUploaded" && doc.canReupload && doc.status !== "approved");

  return (
    <div className="bg-white rounded-xl border border-[#D8DEE8] p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F0FBFB] flex items-center justify-center shrink-0">
          <Icon className="text-[#018B8F] text-[20px]" />
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${config.badgeClass}`}
        >
          <StatusIcon className="text-[12px]" />
          {config.label}
        </span>
      </div>

      <div>
        <h4 className="font-bold text-[14px] text-[#111827] leading-6">
          {doc.title} <span className="text-red-500">*</span>
        </h4>
        <p className="text-[12px] text-[#6B7280] mt-1 leading-5">
          {doc.description}
        </p>
        <p className="text-[11px] text-[#9CA3AF] mt-1.5">
          الصيغ المقبولة: {doc.acceptedFormats} — حتى {doc.maxSizeMB}MB
        </p>
      </div>

      {doc.status === "needsUpdate" && doc.rejectionReason && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-[11px] text-red-700 leading-5">
            {doc.rejectionReason}
          </p>
        </div>
      )}

      {showUploadButton && (
        <button
          onClick={onUploadClick}
          className="mt-auto h-10 rounded-md bg-[#003469] text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#002b57] transition cursor-pointer"
        >
          <MdCloudUpload className="text-[16px]" />
          {doc.status === "notUploaded" ? "إضافة الآن" : "إعادة الإضافة"}
        </button>
      )}

      {!showUploadButton && (doc.status === "pendingReview" || doc.status === "approved") && (
        <button
          onClick={onViewClick}
          disabled={viewing}
          className="mt-auto h-10 rounded-md border border-[#D0D5DD] bg-white text-[#003469] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#F5F8FB] transition cursor-pointer disabled:opacity-60"
        >
          {viewing ? "جارٍ الفتح..." : doc.isVideo ? "عرض الفيديو" : "عرض الوثيقة"}
        </button>
      )}
    </div>
  );
};

export default GuardianDocuments;
