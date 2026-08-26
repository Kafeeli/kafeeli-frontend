import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import {
  MdClose,
  MdOutlineSearch,
  MdOutlineDescription,
  MdShieldMoon,
  MdChevronRight,
  MdChevronLeft,
  MdVerifiedUser,
  MdOutlineEditNote,
  MdRefresh,
  MdErrorOutline,
  MdOutlineCancel,
} from "react-icons/md";
import ApproveDocumentConfirmationModal from "./Approvedocumentconfirmationmodal";
import NeedsUpdateDocumentModal from "./Needsupdatedocumentmodal";
import AdminLayout from "../Adminlayout";
import { adminApi } from "../../../services/adminApi";

/* ==================== دوال مساعدة ==================== */

const DOC_TYPE_ARABIC = {
  NationalId: "الهوية الشخصية",        // 👈 ضيفي هاد السطر
  NationalIdImage: "الهوية الشخصية",
  GuardianshipDeed: "وثيقة الوصاية",
  CustodyDocument: "إقرار الحضانة",
  SelfieVideoWithId: "فيديو سيلفي مع الهوية",
  1: "الهوية الشخصية",
  3: "وثيقة الوصاية",
  4: "فيديو سيلفي مع الهوية",
  5: "إقرار الحضانة",
};

const NORMALIZED_DOC_TYPES = {
  1: "NationalIdImage",
  NationalId: "NationalIdImage",
  NationalIdImage: "NationalIdImage",
  3: "GuardianshipDeed",
  GuardianshipDeed: "GuardianshipDeed",
  GuardianshipProof: "GuardianshipDeed",
  4: "SelfieVideoWithId",
  SelfieVideoWithId: "SelfieVideoWithId",
  5: "CustodyDocument",
  CustodyDocument: "CustodyDocument",
};

const normalizeDocumentType = (type) => NORMALIZED_DOC_TYPES[String(type)] || type;

// خانة "رقم الهوية" تظهر فقط لوثيقة الهوية الشخصية (documentType أو slotKey)
const isNationalIdDocument = (document) => {
  return (
    normalizeDocumentType(document?.documentType) === "NationalIdImage" ||
    normalizeDocumentType(document?.slotKey) === "NationalIdImage"
  );
};

// الحقل الأساسي الفعلي لحالة الوثيقة هو "status" (وليس "verificationStatus")
const getDocStatus = (document) => document?.status || document?.verificationStatus;

const getDocumentTypeLabel = (type) => {
  if (!type) return "وثيقة";
  const normalizedType = normalizeDocumentType(type);
  return DOC_TYPE_ARABIC[normalizedType] || String(type);
};

const STATUS_STYLES = {
  Pending: { bg: "bg-amber-50", text: "text-amber-700", label: "قيد المراجعة" },
  Approved: { bg: "bg-green-50", text: "text-green-700", label: "معتمدة" },
  NeedsUpdate: { bg: "bg-blue-50", text: "text-blue-700", label: "تحتاج تحديث" },
};

const getStatusBadgeStyle = (status) => STATUS_STYLES[status] || STATUS_STYLES.Pending;

/* ==================== مكونات فرعية ==================== */

function HeaderSection({ pendingCount, onRefresh }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex-1">
        <h1 dir="rtl" className="text-right text-3xl font-extrabold text-[#003469] mb-2">مراجعة وثائق الأوصياء</h1>
        <p dir="rtl" className="text-right text-[#6B7280] text-sm">إدارة والتحقق من الوثائق الرسمية المقدمة من قبل الأوصياء الجدد لضمان أمان وسلامة المستفيدين في منصة كفيلي.</p>
      </div>
      <div className="flex items-center gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-4 rounded-xl bg-gradient-to-r from-[#003469] to-[#0D4B8E] p-6 text-white shadow-lg whitespace-nowrap">
          <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-white/20"><MdOutlineDescription className="text-3xl text-white" /></div>
          <div dir="rtl" className="text-right">
            <p className="text-sm font-medium text-white/80">وثائق في الانتظار</p>
            <p className="text-3xl font-extrabold text-white">{pendingCount}</p>
          </div>
        </motion.div>
        <button onClick={onRefresh} className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-[#003469] hover:bg-slate-50 transition shadow-sm" title="تحديث"><MdRefresh className="text-[20px]" /></button>
      </div>
    </div>
  );
}

function Filters({ searchTerm, onSearchChange, selectedDocType, onDocTypeChange }) {
  return (
    <div dir="rtl" className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <MdOutlineSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xl pointer-events-none" />
          <input type="text" placeholder="البحث عن وصي..." value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="w-full pl-4 pr-12 py-3 rounded-lg border border-[#E2E8F0] bg-white text-right placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4B8E]/50 focus:border-transparent transition" />
        </div>
        <div className="relative">
          <select value={selectedDocType} onChange={(e) => onDocTypeChange(e.target.value)} className="w-full px-4 pr-12 py-3 rounded-lg border border-[#E2E8F0] bg-white text-right text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0D4B8E]/50 focus:border-transparent transition appearance-none cursor-pointer">
            <option value="">كل أنواع الوثائق</option>
            <option value="NationalIdImage">الهوية الشخصية</option>
            <option value="GuardianshipDeed">وثيقة الوصاية</option>
            <option value="CustodyDocument">إقرار الحضانة</option>
            <option value="SelfieVideoWithId">فيديو سيلفي مع الهوية</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><MdChevronLeft className="text-[#9CA3AF] text-xl" /></div>
        </div>
      </div>
    </div>
  );
}

function DocumentPreview({ document, onViewFile, viewingFile }) {
  if (!document) return null;
  const isVideo = document.contentType?.includes("video");
  const isPdf = document.contentType?.includes("pdf");
  return (
    <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden min-h-[400px] flex flex-col items-center justify-center gap-4 p-6">
      <div className="text-6xl">{isVideo ? "🎥" : isPdf ? "📄" : "🖼️"}</div>
      <div className="text-center">
        <p className="font-bold text-[#111827] mb-1">{isVideo ? "فيديو" : isPdf ? "ملف PDF" : "صورة"}</p>
        <p className="text-sm text-[#6B7280]">{document.displayFileName || document.originalFileName || "ملف مرفق"}</p>
      </div>
      <button onClick={() => onViewFile?.(document)} disabled={viewingFile} className="px-6 py-2 bg-[#003469] text-white rounded-lg text-sm font-bold hover:bg-[#002850] transition disabled:opacity-50 cursor-pointer">
        {viewingFile ? "جارٍ الفتح..." : "فتح الملف"}
      </button>
    </div>
  );
}

function InfoCard({ label, value, mono = false }) {
  return (
    <div dir="rtl" className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-right">
      <p className="text-xs font-medium text-[#6B7280] mb-2">{label}</p>
      <p className={`text-sm font-bold text-[#111827] break-words ${mono ? "font-mono" : ""}`}>{value || "—"}</p>
    </div>
  );
}

function DocumentTableRow({ document, onReview }) {
  const statusStyle = getStatusBadgeStyle(document.verificationStatus || document.status);
  const docTypeLabel = getDocumentTypeLabel(document.documentType);
  const uploadDate = document.uploadedAt ? new Date(document.uploadedAt).toLocaleDateString("ar-SA") : "—";

  return (
    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, height: 0 }} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition">
      <td dir="rtl" className="px-6 py-4 text-right">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#003469] to-[#0066cc] flex items-center justify-center text-white font-bold text-sm shrink-0">{document.guardianFullName?.charAt(0) || "?"}</div>
          <div className="text-right">
            <p className="font-bold text-[#111827] text-sm">{document.guardianFullName}</p>
            <p className="text-xs text-[#6B7280]">{document.guardianEmail}</p>
          </div>
        </div>
      </td>
      <td dir="rtl" className="px-6 py-4 text-right">
        <div className="flex items-center gap-2">
          <MdOutlineDescription className="text-lg text-[#0D4B8E]" />
          <span className="text-sm text-[#111827]">{docTypeLabel}</span>
        </div>
      </td>
      <td dir="rtl" className="px-6 py-4 text-right"><p className="text-sm text-[#6B7280]">{uploadDate}</p></td>
      <td dir="rtl" className="px-6 py-4 text-right">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>{statusStyle.label}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <button onClick={() => onReview(document)} className="px-4 py-2 bg-[#003469] text-white rounded-lg text-sm font-bold hover:bg-[#002850] transition cursor-pointer">مراجعة الوثيقة</button>
      </td>
    </motion.tr>
  );
}

function DocumentTable({ documents, isLoading, onReview, currentPage, onPageChange, itemsPerPage = 10 }) {
  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const displayedDocs = documents.slice(startIdx, endIdx);

  if (isLoading) return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-20 bg-[#F0F0F0] rounded-lg animate-pulse" />)}</div>;

  if (!documents?.length) {
    return (
      <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-12 text-center">
        <p className="text-lg font-bold text-[#111827] mb-2">لا توجد وثائق معلقة</p>
        <p className="text-[#6B7280]">جميع الوثائق تمت مراجعتها بنجاح</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-[#E2E8F0] bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <th dir="rtl" className="px-6 py-4 text-right text-sm font-bold text-[#111827]">الوصي</th>
              <th dir="rtl" className="px-6 py-4 text-right text-sm font-bold text-[#111827]">نوع الوثيقة</th>
              <th dir="rtl" className="px-6 py-4 text-right text-sm font-bold text-[#111827]">تاريخ الرفع</th>
              <th dir="rtl" className="px-6 py-4 text-right text-sm font-bold text-[#111827]">الحالة</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[#111827]">الإجراء</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>{displayedDocs.map((doc) => <DocumentTableRow key={doc.documentId} document={doc} onReview={onReview} />)}</tbody>
          </AnimatePresence>
        </table>
      </div>
      {totalPages > 1 && (
        <div dir="rtl" className="flex items-center justify-center gap-2">
          <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="h-10 w-10 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] disabled:opacity-50 transition cursor-pointer"><MdChevronRight className="text-lg" /></button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => { let p; if (totalPages <= 5) p = i + 1; else if (currentPage <= 3) p = i + 1; else if (currentPage >= totalPages - 2) p = totalPages - 4 + i; else p = currentPage - 2 + i; return p; }).map((p) => (
            <button key={p} onClick={() => onPageChange(p)} className={`h-10 w-10 rounded-lg font-bold transition cursor-pointer ${currentPage === p ? "bg-[#003469] text-white" : "border border-[#E2E8F0] text-[#111827] hover:bg-[#F8FAFC]"}`}>{p}</button>
          ))}
          <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="h-10 w-10 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] disabled:opacity-50 transition cursor-pointer"><MdChevronLeft className="text-lg" /></button>
        </div>
      )}
      <p dir="rtl" className="text-right text-sm text-[#6B7280]">عرض {startIdx + 1} إلى {Math.min(endIdx, documents.length)} من {documents.length}</p>
    </div>
  );
}

function ReviewModal({ document, onClose, onApprove, onNeedsUpdate, onViewFile, viewingFile, actionLoading }) {
  const [actionModal, setActionModal] = useState(null);
  if (!document) return null;
  const statusStyle = getStatusBadgeStyle(getDocStatus(document));

  // خانة "رقم الهوية" تظهر فقط لوثيقة الهوية الشخصية
  const showNationalId = isNationalIdDocument(document);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={onClose}>
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} dir="ltr" className="relative w-full max-w-[1000px] max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex" onClick={(e) => e.stopPropagation()}>
          <div dir="rtl" className="flex-1 overflow-y-auto p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"><MdClose className="text-lg" /></button>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>{statusStyle.label}</span>
            </div>
            <div dir="rtl">
              <h2 className="text-right text-2xl font-extrabold text-[#003469] mb-7">مراجعة وثيقة</h2>
              <div className="mb-7">
                <p className="text-right text-sm font-medium text-[#6B7280] mb-3">معاينة الوثيقة</p>
                <DocumentPreview document={document} onViewFile={onViewFile} viewingFile={viewingFile} />
              </div>

              <div className="mb-7">
                <h3 className="mb-4 text-right text-[15px] font-extrabold text-[#003469]">معلومات الوصي</h3>
                {/* عرض شرطي: خانة رقم الهوية تظهر فقط عند وثيقة "الهوية الشخصية" */}
                <div className={`grid grid-cols-1 gap-4 ${showNationalId ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                  <InfoCard label="الاسم الكامل" value={document.guardianFullName} />
                  <InfoCard label="البريد الإلكتروني" value={document.guardianEmail} />
                  {showNationalId && (
                    <InfoCard label="رقم الهوية" value={document.submittedNationalId} mono />
                  )}
                </div>
              </div>

              {/* تحذير عند وجود مشكلة برقم الهوية (مستخدم مسبقًا من وصي آخر) */}
              {showNationalId && document.nationalIdValidation?.isInUseByAnotherGuardian && (
                <div className="mb-7 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                  <MdErrorOutline className="mt-0.5 shrink-0 text-lg text-red-500" />
                  <p className="text-right text-[13px] leading-6 text-red-700">
                    تنبيه: رقم الهوية هذا مستخدم من قبل وصي آخر مسجّل بالمنصة.
                  </p>
                </div>
              )}

              <div className="mb-7">
                <h3 className="mb-4 text-right text-[15px] font-extrabold text-[#003469]">معلومات الوثيقة</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoCard label="نوع الوثيقة" value={getDocumentTypeLabel(document.documentType)} />
                  <InfoCard label="اسم الملف" value={document.displayFileName || document.originalFileName} />
                  <InfoCard label="تاريخ الرفع" value={document.uploadedAt ? new Date(document.uploadedAt).toLocaleDateString("ar-SA") : "—"} />
                  <InfoCard label="نوع الملف" value={document.contentType} />
                </div>
              </div>
              <div className="mb-7 flex items-start gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                <MdShieldMoon className="mt-0.5 shrink-0 text-lg text-[#6B7280]" />
                <p className="text-right text-[13px] leading-6 text-[#6B7280]">قراراتك هنا ستؤثر مباشرة على الموافقة النهائية للوصي، يرجى مراجعة البيانات بدقة قبل اتخاذ أي إجراء.</p>
              </div>
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button onClick={() => setActionModal("needs-update")} disabled={actionLoading} className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#D0D5DD] bg-white px-6 text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer disabled:opacity-50">
                  <MdOutlineEditNote className="text-lg" /> طلب تحديث
                </button>
                <button onClick={() => setActionModal("approve")} disabled={actionLoading} className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#003469] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#002850] cursor-pointer disabled:opacity-50">
                  <MdVerifiedUser className="text-lg" /> اعتماد الوثيقة
                </button>
              </div>
            </div>
          </div>
          <div dir="rtl" className="hidden w-[300px] shrink-0 flex-col items-center justify-center bg-[#003469] p-8 text-center text-white md:flex">
            <div className="mb-[100px] flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <img src="/src/assets/title.png" alt="كفيلي" className="h-22 w-22 scale-125 translate-y-[2px] object-contain object-center" />
            </div>
            <h3 className="mb-2 text-xl font-extrabold">كفيلي</h3>
            <p className="text-sm leading-6 text-white/70">نظام إدارة الأيتام المتكامل لضمان الشفافية والاحترافية.</p>
            <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/80"><MdShieldMoon className="text-sm" /> بيانات مشفرة وآمنة</div>
          </div>
        </motion.div>
        {actionModal === "approve" && <ApproveDocumentConfirmationModal onCancel={() => setActionModal(null)} onConfirm={() => { setActionModal(null); onApprove?.(document); }} loading={actionLoading} />}
        {actionModal === "needs-update" && <NeedsUpdateDocumentModal onCancel={() => setActionModal(null)} onConfirm={(reason) => { setActionModal(null); onNeedsUpdate?.(document, reason); }} loading={actionLoading} />}
      </motion.div>
    </AnimatePresence>
  );
}

/* ==================== المكون الرئيسي ==================== */

export default function AdminGuardianDocumentsReviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [viewingFile, setViewingFile] = useState(false);
  const [toast, setToast] = useState(null);
  const [guardianStatusModal, setGuardianStatusModal] = useState(null);
  const [showGuardianReject, setShowGuardianReject] = useState(false);
  const [guardianRejectReason, setGuardianRejectReason] = useState("");

  const fetchDocuments = async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await adminApi.getPendingDocuments();
      setDocuments(res?.data || []);
    } catch {
      setLoadError("تعذر تحميل الوثائق المعلقة.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function loadInitialDocuments() {
      try {
        const res = await adminApi.getPendingDocuments();
        if (!cancelled) setDocuments(res?.data || []);
      } catch {
        if (!cancelled) setLoadError("تعذر تحميل الوثائق المعلقة.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadInitialDocuments();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = !searchTerm || doc.guardianFullName?.includes(searchTerm) || doc.guardianEmail?.includes(searchTerm) || doc.nationalId?.includes(searchTerm);
      const matchesDocType = !selectedDocType || normalizeDocumentType(doc.documentType) === selectedDocType;
      return matchesSearch && matchesDocType;
    });
  }, [documents, searchTerm, selectedDocType]);

  const handleFilterChange = (setter, value) => { setter(value); setCurrentPage(1); };
  const showToast = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 3000); };

  const handleViewFile = async (doc) => {
    if (viewingFile) return;
    setViewingFile(true);
    try {
      const blob = await adminApi.getDocumentFile(doc.documentId);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 30000);
    } catch {
      showToast("تعذر فتح الملف.", "error");
    } finally {
      setViewingFile(false);
    }
  };

  const checkIfGuardianDone = async (doc, updatedDocs) => {
    if (!doc.guardianId) return;
    const stillPending = updatedDocs.filter((d) => d.guardianId === doc.guardianId);
    if (stillPending.length > 0) return;

    try {
      await adminApi.recalculateGuardianStatus(doc.guardianId);
      const verRes = await adminApi.getGuardianVerification(doc.guardianId);
      const verData = verRes?.data;
      if (!verData) return;

      setGuardianStatusModal({
        guardianId: doc.guardianId,
        fullName: verData.fullName || doc.guardianFullName,
        email: verData.email || doc.guardianEmail,
        canApprove: verData.isReadyForApproval === true,
        guardianStatusText: verData.isReadyForApproval ? "جاهز للاعتماد" : "قيد المراجعة",
        guardianStatusColor: verData.isReadyForApproval ? "green" : "amber",
        requiredDocuments: verData.requiredDocuments || [],
      });
    } catch { /* مش مشكلة */ }
  };

  const checkPageReset = (updatedDocs) => {
    if (updatedDocs.length === 0) return;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(updatedDocs.length / itemsPerPage);
    if (currentPage > totalPages) setCurrentPage(Math.max(1, totalPages));
  };

  const handleApprove = async (document) => {
    setActionLoading(true);
    try {
      await adminApi.approveDocument(document.documentId);
      const updatedDocs = documents.filter((d) => d.documentId !== document.documentId);
      setDocuments(updatedDocs);
      setSelectedDocument(null);
      showToast("تم اعتماد الوثيقة بنجاح ✅", "success");
      await checkIfGuardianDone(document, updatedDocs);
      checkPageReset(updatedDocs);
    } catch (err) {
      if (err?.response?.status === 409) {
        await fetchDocuments();
        showToast("الوثيقة تغيرت، تم تحديث القائمة.", "info");
      } else {
        showToast(err?.response?.data?.message || err?.response?.data?.errors?.[0] || "تعذر اعتماد الوثيقة.", "error");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleNeedsUpdate = async (document, reason) => {
    setActionLoading(true);
    try {
      await adminApi.requestDocumentUpdate(document.documentId, reason);
      const updatedDocs = documents.filter((d) => d.documentId !== document.documentId);
      setDocuments(updatedDocs);
      setSelectedDocument(null);
      showToast("تم إرسال طلب التحديث بنجاح", "info");
      await checkIfGuardianDone(document, updatedDocs);
      checkPageReset(updatedDocs);
    } catch (err) {
      if (err?.response?.status === 409) {
        await fetchDocuments();
        showToast("الوثيقة تغيرت، تم تحديث القائمة.", "info");
      } else {
        showToast(err?.response?.data?.message || err?.response?.data?.errors?.[0] || "تعذر إرسال طلب التحديث.", "error");
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleApproveGuardian = async () => {
    if (!guardianStatusModal) return;
    setActionLoading(true);
    try {
      await adminApi.approveGuardian(guardianStatusModal.guardianId);
      showToast(`تم اعتماد حساب الوصي "${guardianStatusModal.fullName}" ✅`, "success");
      setGuardianStatusModal(null);
    } catch (err) {
      showToast(err?.response?.data?.message || "تعذر اعتماد حساب الوصي.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectGuardian = async () => {
    if (!guardianStatusModal || !guardianRejectReason.trim()) return;
    setActionLoading(true);
    try {
      await adminApi.rejectGuardian(guardianStatusModal.guardianId, guardianRejectReason.trim());
      showToast(`تم رفض حساب الوصي "${guardianStatusModal.fullName}"`, "error");
      setGuardianStatusModal(null);
      setShowGuardianReject(false);
      setGuardianRejectReason("");
    } catch (err) {
      showToast(err?.response?.data?.message || "تعذر رفض حساب الوصي.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  if (loadError) {
    return (
      <AdminLayout title="مراجعة وثائق الأوصياء">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <MdErrorOutline className="text-red-500 text-5xl mx-auto" />
            <p className="text-red-600 font-bold">{loadError}</p>
            <button onClick={fetchDocuments} className="h-10 px-6 rounded-lg bg-[#003469] text-white font-bold text-[13px] flex items-center gap-2 mx-auto hover:bg-[#002b57] transition">
              <MdRefresh className="text-[18px]" /> إعادة المحاولة
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="مراجعة وثائق الأوصياء">
      <div className="w-full max-w-7xl mx-auto">
        <div className="space-y-8">
          <HeaderSection pendingCount={documents.length} onRefresh={fetchDocuments} />

          <Filters searchTerm={searchTerm} onSearchChange={(v) => handleFilterChange(setSearchTerm, v)} selectedDocType={selectedDocType} onDocTypeChange={(v) => handleFilterChange(setSelectedDocType, v)} />

          <div>
            <h2 dir="rtl" className="text-right text-lg font-bold text-[#111827] mb-4">الوثائق ({filteredDocuments.length})</h2>
            <DocumentTable documents={filteredDocuments} isLoading={isLoading} onReview={setSelectedDocument} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>
        </div>

        {selectedDocument && (
          <ReviewModal document={selectedDocument} onClose={() => setSelectedDocument(null)} onApprove={handleApprove} onNeedsUpdate={handleNeedsUpdate} onViewFile={handleViewFile} viewingFile={viewingFile} actionLoading={actionLoading} />
        )}

        {guardianStatusModal && !showGuardianReject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4" onClick={() => setGuardianStatusModal(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} dir="rtl" className="relative w-full max-w-[480px] rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-5 flex items-start justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-full ${guardianStatusModal.canApprove ? "bg-[#DDFBFB] text-[#018B8F]" : "bg-amber-50 text-amber-600"}`}><MdVerifiedUser className="text-2xl" /></div>
                <button onClick={() => setGuardianStatusModal(null)} className="grid h-8 w-8 place-items-center rounded-lg text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"><MdClose className="text-lg" /></button>
              </div>

              <h3 className="mb-2 text-right text-lg font-extrabold text-[#111827]">حالة الوصي: {guardianStatusModal.fullName}</h3>

              <div className="mb-4 flex justify-end">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${guardianStatusModal.guardianStatusColor === "green" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
                  حالة الحساب: {guardianStatusModal.guardianStatusText}
                </span>
              </div>

              {guardianStatusModal.requiredDocuments?.length > 0 && (
                <div className="mb-5 space-y-2">
                  {guardianStatusModal.requiredDocuments.map((rd, idx) => {
                    const docSt = rd.isApproved ? "approved" : rd.isUploaded ? "pending" : "missing";
                    return (
                      <div key={idx} className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2.5">
                        <span className="text-sm text-[#374151] font-bold">{getDocumentTypeLabel(rd.documentType)}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${docSt === "approved" ? "bg-green-50 text-green-700" : docSt === "pending" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>
                          {docSt === "approved" ? "✅ معتمدة" : docSt === "pending" ? "⏳ قيد المراجعة" : "— لم ترفع"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {guardianStatusModal.canApprove ? (
                <>
                  <div className="mb-5 rounded-xl bg-[#DDFBFB] border border-[#9EE8E8] px-4 py-4 text-center">
                    <p className="text-lg font-extrabold text-[#018B8F]">🎉 جميع الوثائق معتمدة!</p>
                    <p className="text-sm text-[#006B70] mt-1">اختر إجراء لحساب الوصي</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={handleApproveGuardian} disabled={actionLoading} className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#003469] text-sm font-bold text-white transition hover:bg-[#002850] disabled:opacity-60 cursor-pointer w-full">
                      <MdVerifiedUser className="text-lg" /> {actionLoading ? "جارٍ الاعتماد..." : "اعتماد حساب الوصي ✅"}
                    </button>
                    <button onClick={() => setShowGuardianReject(true)} className="flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 bg-white text-sm font-bold text-red-600 transition hover:bg-red-50 cursor-pointer w-full">
                      <MdOutlineCancel className="text-lg" /> رفض حساب الوصي
                    </button>
                    <button onClick={() => setGuardianStatusModal(null)} className="h-11 rounded-md border border-[#D0D5DD] bg-white text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer w-full">لاحقًا</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-5 rounded-xl bg-amber-50 border border-amber-200 px-4 py-4 text-center">
                    <p className="text-sm font-bold text-amber-700">⏳ بعض الوثائق لم تُعتمد بعد</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => setShowGuardianReject(true)} className="flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 bg-white text-sm font-bold text-red-600 transition hover:bg-red-50 cursor-pointer w-full">
                      <MdOutlineCancel className="text-lg" /> رفض حساب الوصي
                    </button>
                    <button onClick={() => setGuardianStatusModal(null)} className="w-full h-11 rounded-md bg-[#003469] text-sm font-bold text-white transition hover:bg-[#002850] cursor-pointer">متابعة المراجعة</button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {showGuardianReject && guardianStatusModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[65] flex items-center justify-center bg-black/50 px-4" onClick={() => { setShowGuardianReject(false); setGuardianRejectReason(""); }}>
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} dir="rtl" className="relative w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-5 flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-red-100 text-red-600"><MdOutlineCancel className="text-2xl" /></div>
                <button onClick={() => { setShowGuardianReject(false); setGuardianRejectReason(""); }} className="grid h-8 w-8 place-items-center rounded-lg text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"><MdClose className="text-lg" /></button>
              </div>
              <h3 className="mb-2 text-right text-lg font-extrabold text-[#111827]">رفض حساب الوصي</h3>
              <p className="mb-4 text-right text-sm leading-6 text-[#6B7280]">رفض حساب <span className="font-bold text-[#003469]">{guardianStatusModal.fullName}</span>. يرجى كتابة سبب الرفض.</p>
              <textarea value={guardianRejectReason} onChange={(e) => setGuardianRejectReason(e.target.value)} placeholder="سبب رفض حساب الوصي..." rows={4} className="mb-5 w-full resize-none rounded-lg border border-[#D0D5DD] bg-white p-3 text-right text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition" />
              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button onClick={() => { setShowGuardianReject(false); setGuardianRejectReason(""); }} className="h-11 flex-1 rounded-md border border-[#D0D5DD] bg-white text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer">إلغاء</button>
                <button onClick={handleRejectGuardian} disabled={actionLoading || !guardianRejectReason.trim()} className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-red-600 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60 cursor-pointer">
                  {actionLoading ? "جارٍ الإرسال..." : "تأكيد الرفض"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg text-white font-bold shadow-lg z-[70] ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-blue-600"}`}>
            {toast.message}
          </motion.div>
        )}
      </div>

      <footer className="mt-20 py-2 border-t border-[#E5E7EB] text-center">
        <p className="text-sm text-[#6B7280] mt-4">© 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة</p>
      </footer>
    </AdminLayout>
  );
}
