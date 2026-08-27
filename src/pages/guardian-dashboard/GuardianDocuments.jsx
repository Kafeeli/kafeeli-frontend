import { useState, useEffect } from "react";
import {
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
import { guardianDocumentsApi } from "../../services/guardianDocumentsApi";
import { openProtectedBlob, unwrapResult } from "../../utils/apiUi";
import AuthenticatedHeader from "../../components/layout/AuthenticatedHeader";
import AuthenticatedFooter from "../../components/layout/AuthenticatedFooter";
import useCurrentUser from "../../hooks/useCurrentUser";
import {
  DOCUMENT_TYPE_NAME_TO_KEY,
  mapDocumentStatus,
} from "../../config/documentTypeConfig";

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
    description: "المستند القانوني الذي يثبت حق الوصاية أو الولاية مثل حجة الوصاية أو الولاية.",
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

const DISPLAY_ORDER = ["nationalId", "guardianshipDeed", "selfieVideo", "custodyDeclaration"];

const STATUS_CONFIG = {
  notUploaded: { label: "لم يتم الرفع", badgeClass: "bg-gray-100 text-gray-500", icon: MdWarningAmber },
  pendingReview: { label: "قيد المراجعة", badgeClass: "bg-teal-50 text-teal-700", icon: MdCheckCircle },
  approved: { label: "تم الاعتماد", badgeClass: "bg-teal-50 text-teal-700", icon: MdCheckCircle },
  needsUpdate: { label: "تحتاج تعديل", badgeClass: "bg-red-100 text-red-700", icon: MdWarningAmber },
};

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
      status: apiDoc ? mapDocumentStatus(apiDoc.hasCurrentDocument, apiDoc.verificationStatus) : "notUploaded",
      rejectionReason: apiDoc?.needsUpdateReason || "",
      documentId: apiDoc?.documentId || null,
      canReupload: apiDoc?.canReupload ?? false,
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
  const currentUser = useCurrentUser();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [activeUploadDoc, setActiveUploadDoc] = useState(null);
  const [viewingDocId, setViewingDocId] = useState(null);
  const guardianVerification = currentUser?.verificationStatus || "Pending";

  useEffect(() => {
    let cancelled = false;

    async function loadInitialDocuments() {
      try {
        const data = unwrapResult(await guardianDocumentsApi.getDocuments(), "تعذر تحميل بيانات الوثائق.");
        if (!cancelled) {
          setDocuments(buildDocumentsFromApi(data?.documents));
        }
      } catch {
        if (!cancelled) {
          setLoadError("تعذر تحميل بيانات الوثائق، حاول مجددًا.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInitialDocuments();
    return () => {
      cancelled = true;
    };
  }, []);

  const isRejected = guardianVerification === "Rejected";
  const overallStatus = getOverallStatus(documents);
  const overallConfig = STATUS_CONFIG[overallStatus];

  const counts = {
    needsUpdate: documents.filter((d) => d.status === "needsUpdate").length,
    approved: documents.filter((d) => d.status === "approved").length,
    pendingReview: documents.filter((d) => d.status === "pendingReview").length,
    total: documents.length,
  };

  const handleUploadSubmit = async ({ file, idNumber }) => {
    const res = await guardianDocumentsApi.uploadDocument({
      documentTypeKey: activeUploadDoc.key,
      file,
      nationalId: idNumber,
    });
    const apiDoc = unwrapResult(res, "تعذر رفع الوثيقة.");
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.key === activeUploadDoc.key
          ? {
              ...doc,
              status: mapDocumentStatus(apiDoc?.hasCurrentDocument ?? true, apiDoc?.verificationStatus),
              rejectionReason: apiDoc?.needsUpdateReason || "",
              documentId: apiDoc?.documentId || doc.documentId,
              canReupload: apiDoc?.canReupload ?? doc.canReupload,
            }
          : doc
      )
    );
    setActiveUploadDoc(null);
  };

  const handleViewDocument = async (doc) => {
    if (!doc.documentId || viewingDocId) return;
    setViewingDocId(doc.key);
    try {
      openProtectedBlob(await guardianDocumentsApi.getDocumentFile(doc.documentId));
    } catch {
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
          <button type="button" onClick={() => window.location.reload()} className="rounded-lg bg-[#003469] px-4 py-2 text-sm font-bold text-white">إعادة المحاولة</button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#f8fafc] flex overflow-x-hidden font-[Cairo,sans-serif] text-right">
      <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />

      <div className="flex-1 min-w-0 w-full lg:mr-[255px] flex flex-col justify-between">
        <AuthenticatedHeader onMenuClick={() => setOpenSidebar(true)} />

        <main className="p-4 sm:p-6 flex-1">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-[18px] sm:text-[20px] font-bold text-[#003469]">إدارة الوثائق</h2>
                <p className="text-[13px] text-[#6B7280] mt-1">يرجى رفع المستندات الثبوتية المطلوبة لتتمكن من تفعيل كامل ميزات حسابك.</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold shrink-0 ${overallConfig.badgeClass}`}>
                <overallConfig.icon className="text-[14px]" /> {overallConfig.label}
              </span>
            </div>

            {/* تنبيه الرفض */}
            {isRejected && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 flex items-start gap-3">
                <MdErrorOutline className="text-red-500 text-xl shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-red-700">تم رفض حسابك</h4>
                  <p className="text-[12px] text-red-600 mt-1 leading-5">لا يمكنك رفع أو تعديل الوثائق حالياً. يرجى التواصل مع الإدارة للمزيد من التفاصيل.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <SummaryCard label="إجمالي الوثائق" value={counts.total} icon={MdArchive} accentClass="text-[#003469]" />
              <SummaryCard label="قيد المراجعة" value={counts.pendingReview} icon={MdDescription} accentClass="text-[#003469]" />
              <SummaryCard label="تم الاعتماد" value={counts.approved} icon={MdCheckCircle} accentClass="text-teal-600" />
              <SummaryCard label="تحتاج تعديل" value={counts.needsUpdate} icon={MdWarningAmber} accentClass="text-red-600" />
            </div>

            <div className="rounded-lg bg-white border border-[#E2E8F0] px-4 py-3.5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#F3F4F5] flex items-center justify-center shrink-0">
                <MdLockOutline className="text-[#003469] text-[18px]" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#111827]">حماية البيانات والخصوصية</h4>
                <p className="text-[12px] text-[#6B7280] mt-0.5 leading-5">الوثائق المرفوعة يتم تخزينها بشكل مشفر وآمن، ولا تظهر لأي ملف شخصي عام.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <DocumentCard
                  key={doc.key}
                  doc={doc}
                  guardianRejected={isRejected}
                  onUploadClick={() => setActiveUploadDoc(doc)}
                  onViewClick={() => handleViewDocument(doc)}
                  viewing={viewingDocId === doc.key}
                />
              ))}
            </div>
          </div>
        </main>

        <AuthenticatedFooter />
      </div>

      {activeUploadDoc && (
        <DocumentUploadModal doc={activeUploadDoc} onClose={() => setActiveUploadDoc(null)} onSubmit={handleUploadSubmit} />
      )}
    </div>
  );
}

const SummaryCard = ({ label, value, icon: Icon, accentClass }) => (
  <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 flex flex-col items-center justify-center text-center gap-1.5">
    <Icon className={`text-[22px] ${accentClass}`} />
    <span className={`text-[20px] font-bold ${accentClass}`}>{value}</span>
    <span className="text-[11px] text-[#6B7280] font-medium leading-tight">{label}</span>
  </div>
);

const DocumentCard = ({ doc, onUploadClick, onViewClick, viewing, guardianRejected }) => {
  const Icon = doc.icon;
  const config = STATUS_CONFIG[doc.status];
  const StatusIcon = config.icon;

  const showUploadButton = !guardianRejected && (
    doc.status === "notUploaded" ||
    doc.status === "needsUpdate" ||
    (doc.status !== "notUploaded" && doc.canReupload && doc.status !== "approved")
  );

  return (
    <div className="bg-white rounded-xl border border-[#D8DEE8] p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#F0FBFB] flex items-center justify-center shrink-0">
          <Icon className="text-[#018B8F] text-[20px]" />
        </div>
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${config.badgeClass}`}>
          <StatusIcon className="text-[12px]" /> {config.label}
        </span>
      </div>

      <div>
        <h4 className="font-bold text-[14px] text-[#111827] leading-6">{doc.title} <span className="text-red-500">*</span></h4>
        <p className="text-[12px] text-[#6B7280] mt-1 leading-5">{doc.description}</p>
        <p className="text-[11px] text-[#9CA3AF] mt-1.5">الصيغ المقبولة: {doc.acceptedFormats} — حتى {doc.maxSizeMB}MB</p>
      </div>

      {doc.status === "needsUpdate" && doc.rejectionReason && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2">
          <p className="text-[11px] text-red-700 leading-5">{doc.rejectionReason}</p>
        </div>
      )}

      {guardianRejected && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-3 text-center">
          <p className="text-[12px] text-red-700 font-bold">تم رفض حسابك — لا يمكن رفع وثائق حالياً</p>
        </div>
      )}

      {showUploadButton && (
        <button onClick={onUploadClick} className="mt-auto h-10 rounded-md bg-[#003469] text-white text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#002b57] transition cursor-pointer">
          <MdCloudUpload className="text-[16px]" />
          {doc.status === "notUploaded" ? "إضافة الآن" : "إعادة الإضافة"}
        </button>
      )}

      {!showUploadButton && !guardianRejected && (doc.status === "pendingReview" || doc.status === "approved") && (
        <button onClick={onViewClick} disabled={viewing} className="mt-auto h-10 rounded-md border border-[#D0D5DD] bg-white text-[#003469] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#F5F8FB] transition cursor-pointer disabled:opacity-60">
          {viewing ? "جارٍ الفتح..." : doc.isVideo ? "عرض الفيديو" : "عرض الوثيقة"}
        </button>
      )}
    </div>
  );
};

export default GuardianDocuments;
