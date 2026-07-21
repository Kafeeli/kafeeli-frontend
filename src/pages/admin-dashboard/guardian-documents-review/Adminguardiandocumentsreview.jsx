import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  MdClose,
  MdOutlineSearch,
  MdOutlineDescription,
  MdShieldMoon,
  MdChevronRight,
  MdChevronLeft,
  MdVerifiedUser,
  MdOutlineEditNote,
  MdOutlineCancel,
} from "react-icons/md";
import ApproveDocumentConfirmationModal from "./ApprovedocumentconfirmationModal";
import NeedsUpdateDocumentModal from "./NeedsupdatedocumentModal";
import RejectDocumentModal from "./RejectdocumentModal";
import AdminLayout from "../Adminlayout";

// ===== MOCK DATA =====
const mockDocuments = [
  {
    documentId: "DOC-001",
    guardianId: "GUARD-001",
    guardianFullName: "مريم العتيبي",
    guardianEmail: "m.otaibi@email.com",
    guardianPhone: "+966 54 111 8899",
    guardianImageUrl: "https://via.placeholder.com/40?text=MO",
    documentType: "NationalId",
    originalFileName: "national_id.jpg",
    uploadedAt: "2024-01-15T10:30:00Z",
    verificationStatus: "Pending",
    guardianVerificationStatus: "Pending",
    fileType: "image",
    previewUrl: "https://via.placeholder.com/400x300?text=National+ID",
    documentPreviewType: "image",
    city: "غزة",
  },
  {
    documentId: "DOC-002",
    guardianId: "GUARD-001",
    guardianFullName: "مريم العتيبي",
    guardianEmail: "m.otaibi@email.com",
    guardianPhone: "+966 54 111 8899",
    guardianImageUrl: "https://via.placeholder.com/40?text=MO",
    documentType: "GuardianshipProof",
    originalFileName: "guardianship_proof.pdf",
    uploadedAt: "2024-01-15T10:35:00Z",
    verificationStatus: "NeedsUpdate",
    guardianVerificationStatus: "Pending",
    fileType: "pdf",
    previewUrl: "https://via.placeholder.com/400x300?text=PDF+Preview",
    documentPreviewType: "pdf",
    city: "غزة",
  },
  {
    documentId: "DOC-003",
    guardianId: "GUARD-002",
    guardianFullName: "أحمد الشمري",
    guardianEmail: "a.shammari@email.com",
    guardianPhone: "+966 59 000 1234",
    guardianImageUrl: "https://via.placeholder.com/40?text=AS",
    documentType: "SelfieVideoWithId",
    originalFileName: "selfie_video.mp4",
    uploadedAt: "2024-01-14T14:20:00Z",
    verificationStatus: "Approved",
    guardianVerificationStatus: "Verified",
    fileType: "video",
    previewUrl: "https://via.placeholder.com/400x300?text=Video+Thumbnail",
    documentPreviewType: "video",
    city: "خان يونس",
  },
  {
    documentId: "DOC-004",
    guardianId: "GUARD-003",
    guardianFullName: "سارة الفقيني",
    guardianEmail: "sara.q@email.com",
    guardianPhone: "+966 55 222 3344",
    guardianImageUrl: "https://via.placeholder.com/40?text=SF",
    documentType: "NationalId",
    originalFileName: "sara_national_id.jpg",
    uploadedAt: "2024-01-14T09:45:00Z",
    verificationStatus: "Rejected",
    guardianVerificationStatus: "Rejected",
    fileType: "image",
    previewUrl: "https://via.placeholder.com/400x300?text=National+ID",
    documentPreviewType: "image",
    city: "رفح",
  },
  {
    documentId: "DOC-005",
    guardianId: "GUARD-004",
    guardianFullName: "هناء عبد الرحمن",
    guardianEmail: "h.abdulrahman@email.com",
    guardianPhone: "+966 56 555 6677",
    guardianImageUrl: "https://via.placeholder.com/40?text=HA",
    documentType: "GuardianshipProof",
    originalFileName: "hana_guardianship.pdf",
    uploadedAt: "2024-01-13T16:10:00Z",
    verificationStatus: "Pending",
    guardianVerificationStatus: "Pending",
    fileType: "pdf",
    previewUrl: "https://via.placeholder.com/400x300?text=PDF+Preview",
    documentPreviewType: "pdf",
    city: "دير البلح",
  },
  {
    documentId: "DOC-006",
    guardianId: "GUARD-005",
    guardianFullName: "عبدالله الفارس",
    guardianEmail: "a.alfaris@email.com",
    guardianPhone: "+966 50 888 9999",
    guardianImageUrl: "https://via.placeholder.com/40?text=AAF",
    documentType: "SelfieVideoWithId",
    originalFileName: "ali_selfie.mp4",
    uploadedAt: "2024-01-13T11:00:00Z",
    verificationStatus: "NeedsUpdate",
    guardianVerificationStatus: "Pending",
    fileType: "video",
    previewUrl: "https://via.placeholder.com/400x300?text=Video+Thumbnail",
    documentPreviewType: "video",
    city: "بيت لاهيا",
  },
  // إضافة 8 وثائق أخرى للتوضيح
  ...Array.from({ length: 8 }, (_, i) => ({
    documentId: `DOC-00${7 + i}`,
    guardianId: `GUARD-00${6 + i}`,
    guardianFullName: `وصي ${7 + i}`,
    guardianEmail: `guardian${7 + i}@email.com`,
    guardianPhone: `+966 5${Math.floor(Math.random() * 10)} ${Math.floor(Math.random() * 1000)} ${Math.floor(Math.random() * 10000)}`,
    guardianImageUrl: `https://via.placeholder.com/40?text=G${7 + i}`,
    documentType: ["NationalId", "GuardianshipProof", "SelfieVideoWithId"][
      Math.floor(Math.random() * 3)
    ],
    originalFileName: `document_${7 + i}.jpg`,
    uploadedAt: new Date(
      2024,
      0,
      Math.floor(Math.random() * 28) + 1,
    ).toISOString(),
    verificationStatus: ["Pending", "Approved", "NeedsUpdate", "Rejected"][
      Math.floor(Math.random() * 4)
    ],
    guardianVerificationStatus: ["Verified", "Pending", "Rejected"][
      Math.floor(Math.random() * 3)
    ],
    fileType: "image",
    previewUrl: "https://via.placeholder.com/400x300?text=Document",
    documentPreviewType: "image",
    city: "غزة",
  })),
];

// ===== HELPER FUNCTIONS =====
const getDocumentTypeLabel = (type) => {
  const labels = {
    NationalId: "الهوية الشخصية",
    GuardianshipProof: "وثيقة الوصاية",
    SelfieVideoWithId: "فيديو سيلفي مع الهوية",
  };
  return labels[type];
};

const getStatusBadgeStyle = (status) => {
  const styles = {
    Pending: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      label: "قيد المراجعة",
    },
    Approved: {
      bg: "bg-green-50",
      text: "text-green-700",
      label: "موافق عليه",
    },
    NeedsUpdate: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      label: "يحتاج تعديل",
    },
    Rejected: { bg: "bg-red-50", text: "text-red-700", label: "مرفوض" },
  };
  return styles[status] || styles.Pending;
};

// ===== SUB-COMPONENTS =====

function HeaderSection({ pendingCount }) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      <div className="flex-1">
        <h1
          dir="rtl"
          className="text-right text-3xl font-extrabold text-[#003469] mb-2"
        >
          مراجعة وثائق الأوصياء
        </h1>
        <p dir="rtl" className="text-right text-[#6B7280] text-sm">
          إدارة والتحقق من الوثائق الرسمية المقدمة من قبل الأوصياء الجدد لضمان
          أمان وسلامة المستفيدين في منصة كفيلي.
        </p>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-4 rounded-xl bg-gradient-to-r from-[#003469] to-[#0D4B8E] p-6 text-white shadow-lg whitespace-nowrap"
      >
        <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-white/20">
          <MdOutlineDescription className="text-3xl text-white" />
        </div>
        <div dir="rtl" className="text-right">
          <p className="text-sm font-medium text-white/80">وثائق في الانتظار</p>
          <p className="text-3xl font-extrabold text-white">{pendingCount}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Filters({
  searchTerm,
  onSearchChange,
  selectedDocType,
  onDocTypeChange,
  selectedStatus,
  onStatusChange,
}) {
  return (
    <div dir="rtl" className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Search Input */}
        <div className="relative">
          <MdOutlineSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xl pointer-events-none" />
          <input
            type="text"
            placeholder="البحث عن وصي..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-12 py-3 rounded-lg border border-[#E2E8F0] bg-white text-right placeholder-[#9CA3AF] text-sm focus:outline-none focus:ring-2 focus:ring-[#0D4B8E]/50 focus:border-transparent transition"
          />
        </div>

        {/* Document Type Filter */}
        <div className="relative">
          <select
            value={selectedDocType}
            onChange={(e) => onDocTypeChange(e.target.value)}
            className="w-full px-4 pr-12 py-3 rounded-lg border border-[#E2E8F0] bg-white text-right text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0D4B8E]/50 focus:border-transparent transition appearance-none cursor-pointer"
          >
            <option value="">الكل</option>
            <option value="NationalId">الهوية الشخصية</option>
            <option value="GuardianshipProof">إثبات الوصاية</option>
            <option value="SelfieVideoWithId">فيديو سيلفي مع الهوية</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <MdChevronLeft className="text-[#9CA3AF] text-xl" />
          </div>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-4 pr-12 py-3 rounded-lg border border-[#E2E8F0] bg-white text-right text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0D4B8E]/50 focus:border-transparent transition appearance-none cursor-pointer"
          >
            <option value="">جميع الحالات</option>
            <option value="Pending">قيد المراجعة</option>
            <option value="Approved">موافق عليه</option>
            <option value="NeedsUpdate">يحتاج تعديل</option>
            <option value="Rejected">مرفوض</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <MdChevronLeft className="text-[#9CA3AF] text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentPreview({ document }) {
  if (!document) return null;

  return (
    <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden min-h-[400px] flex items-center justify-center">
      {document.documentPreviewType === "image" && (
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={document.previewUrl}
            alt={document.originalFileName}
            className="max-w-full max-h-[400px] object-contain rounded"
          />
        </div>
      )}

      {document.documentPreviewType === "pdf" && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="text-6xl text-[#D9A441]">📄</div>
          <div className="text-center">
            <p className="font-bold text-[#111827] mb-1">ملف PDF</p>
            <p className="text-sm text-[#6B7280]">
              {document.originalFileName}
            </p>
          </div>
        </div>
      )}

      {document.documentPreviewType === "video" && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="text-6xl">🎥</div>
          <div className="text-center">
            <p className="font-bold text-[#111827] mb-1">فيديو</p>
            <p className="text-sm text-[#6B7280]">
              {document.originalFileName}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({ label, value, mono = false }) {
  return (
    <div
      dir="rtl"
      className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-right"
    >
      <p className="text-xs font-medium text-[#6B7280] mb-2">{label}</p>
      <p
        className={`text-sm font-bold text-[#111827] break-words ${
          mono ? "font-mono text-right" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function DocumentTableRow({ document, onReview }) {
  const statusStyle = getStatusBadgeStyle(document.verificationStatus);
  const docTypeLabel = getDocumentTypeLabel(document.documentType);
  const uploadDate = new Date(document.uploadedAt).toLocaleDateString("ar-SA");

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition"
    >
      {/* الوصي */}
      <td dir="rtl" className="px-6 py-4 text-right">
        <div className="flex items-center gap-3">
          <img
            src={document.guardianImageUrl}
            alt={document.guardianFullName}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="text-right">
            <p className="font-bold text-[#111827] text-sm">
              {document.guardianFullName}
            </p>
            <p className="text-xs text-[#6B7280]">{document.guardianEmail}</p>
            <p className="text-xs text-[#6B7280]">{document.guardianPhone}</p>
          </div>
        </div>
      </td>

      {/* نوع الوثيقة */}
      <td dir="rtl" className="px-6 py-4 text-right">
        <div className="flex items-center gap-2">
          <MdOutlineDescription className="text-lg text-[#0D4B8E]" />
          <span className="text-sm text-[#111827]">{docTypeLabel}</span>
        </div>
      </td>

      {/* التاريخ */}
      <td dir="rtl" className="px-6 py-4 text-right">
        <p className="text-sm text-[#6B7280]">{uploadDate}</p>
      </td>

      {/* الحالة */}
      <td dir="rtl" className="px-6 py-4 text-right">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}
        >
          {statusStyle.label}
        </span>
      </td>

      {/* الإجراء */}
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => onReview(document)}
          className="px-4 py-2 bg-[#003469] text-white rounded-lg text-sm font-bold hover:bg-[#002850] transition cursor-pointer"
        >
          مراجعة الوثيقة
        </button>
      </td>
    </motion.tr>
  );
}

function DocumentTable({
  documents,
  isLoading,
  onReview,
  currentPage,
  onPageChange,
  itemsPerPage = 10,
}) {
  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const displayedDocs = documents.slice(startIdx, endIdx);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-[#F0F0F0] rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-12 text-center">
        <p className="text-lg font-bold text-[#111827] mb-2">لا توجد وثائق</p>
        <p className="text-[#6B7280]">جميع الوثائق تمت مراجعتها بنجاح</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[#E2E8F0] bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC]">
              <th
                dir="rtl"
                className="px-6 py-4 text-right text-sm font-bold text-[#111827]"
              >
                الوصي
              </th>
              <th
                dir="rtl"
                className="px-6 py-4 text-right text-sm font-bold text-[#111827]"
              >
                نوع الوثيقة
              </th>
              <th
                dir="rtl"
                className="px-6 py-4 text-right text-sm font-bold text-[#111827]"
              >
                تاريخ الرفع
              </th>
              <th
                dir="rtl"
                className="px-6 py-4 text-right text-sm font-bold text-[#111827]"
              >
                الحالة
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[#111827]">
                الإجراء
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedDocs.map((doc) => (
              <DocumentTableRow
                key={doc.documentId}
                document={doc}
                onReview={onReview}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div dir="rtl" className="flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="h-10 w-10 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <MdChevronRight className="text-lg" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            return pageNum;
          }).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`h-10 w-10 rounded-lg font-bold transition cursor-pointer ${
                currentPage === pageNum
                  ? "bg-[#003469] text-white"
                  : "border border-[#E2E8F0] text-[#111827] hover:bg-[#F8FAFC]"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="h-10 w-10 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <MdChevronLeft className="text-lg" />
          </button>
        </div>
      )}

      {/* Results Info */}
      <p dir="rtl" className="text-right text-sm text-[#6B7280]">
        عرض {startIdx + 1} إلى {Math.min(endIdx, documents.length)} من{" "}
        {documents.length}
      </p>
    </div>
  );
}

function ReviewModal({
  document,
  onClose,
  onApprove,
  onNeedsUpdate,
  onReject,
}) {
  const [actionModal, setActionModal] = useState(null);

  if (!document) return null;

  const statusStyle = getStatusBadgeStyle(document.verificationStatus);

  const handleApproveConfirmed = () => {
    setActionModal(null);
    onApprove?.(document);
  };

  const handleNeedsUpdateConfirmed = (reason) => {
    setActionModal(null);
    onNeedsUpdate?.(document, reason);
  };

  const handleRejectConfirmed = (reason) => {
    setActionModal(null);
    onReject?.(document, reason);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          dir="ltr"
          className="relative w-full max-w-[1000px] max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Main Content (يظهر يسار) */}
          <div dir="rtl" className="flex-1 overflow-y-auto p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"
                aria-label="إغلاق"
              >
                <MdClose className="text-lg" />
              </button>

              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}
              >
                {statusStyle.label}
              </span>
            </div>

            <div dir="rtl">
              <h2 className="text-right text-2xl font-extrabold text-[#003469] mb-7">
                مراجعة وثيقة
              </h2>

              {/* Document Preview */}
              <div className="mb-7">
                <p className="text-right text-sm font-medium text-[#6B7280] mb-3">
                  معاينة الوثيقة
                </p>
                <DocumentPreview document={document} />
              </div>

              {/* Guardian Info */}
              <div className="mb-7">
                <h3 className="mb-4 text-right text-[15px] font-extrabold text-[#003469]">
                  معلومات الوصي
                </h3>
                <div
                  dir="rtl"
                  className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                  <InfoCard
                    label="الاسم الكامل"
                    value={document.guardianFullName}
                  />
                  <InfoCard
                    label="البريد الإلكتروني"
                    value={document.guardianEmail}
                  />
                  <InfoCard label="رقم الهاتف" value={document.guardianPhone} />
                </div>
              </div>

              {/* Document Info */}
              <div className="mb-7">
                <h3 className="mb-4 text-right text-[15px] font-extrabold text-[#003469]">
                  معلومات الوثيقة
                </h3>
                <div
                  dir="rtl"
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <InfoCard
                    label="نوع الوثيقة"
                    value={getDocumentTypeLabel(document.documentType)}
                  />
                  <InfoCard
                    label="اسم الملف"
                    value={document.originalFileName}
                  />
                  <InfoCard
                    label="تاريخ الرفع"
                    value={new Date(document.uploadedAt).toLocaleDateString(
                      "ar-SA",
                    )}
                  />
                  <InfoCard
                    label="المدينة"
                    value={document.city || "غير محدد"}
                  />
                </div>
              </div>

              {/* Alert */}
              <div className="mb-7 flex items-start gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                <MdShieldMoon className="mt-0.5 shrink-0 text-lg text-[#6B7280]" />
                <p className="text-right text-[13px] leading-6 text-[#6B7280]">
                  قراراتك هنا ستؤثر مباشرة على الموافقة النهائية للوصي، يرجى
                  مراجعة البيانات بدقة قبل اتخاذ أي إجراء.
                </p>
              </div>

              {/* Action Buttons */}
              <div
                dir="rtl"
                className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
              >
                <button
                  onClick={() => setActionModal("needs-update")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#D0D5DD] bg-white px-6 text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer"
                >
                  <MdOutlineEditNote className="text-lg" />
                  طلب تحديث
                </button>
                <button
                  onClick={() => setActionModal("reject")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-6 text-sm font-bold text-red-600 transition hover:bg-red-50 cursor-pointer"
                >
                  <MdOutlineCancel className="text-lg" />
                  رفض
                </button>
                <button
                  onClick={() => setActionModal("approve")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#003469] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#002850] cursor-pointer"
                >
                  <MdVerifiedUser className="text-lg" />
                  اعتماد الوثيقة
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar (يظهر يمين) */}
          <div
            dir="rtl"
            className="hidden w-[300px] shrink-0 flex-col items-center justify-center bg-[#003469] p-8 text-center text-white md:flex"
          >
            <div className="mb-[100px] flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <img
                src="/src/assets/title.png"
                alt="كفيلي"
                className="h-22 w-22 scale-125 translate-y-[2px] object-contain object-center"
              />
            </div>
            <h3 className="mb-2 text-xl font-extrabold">كفيلي</h3>
            <p className="text-sm leading-6 text-white/70">
              نظام إدارة الأيتام المتكامل لضمان الشفافية والاحترافية.
            </p>

            <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/80">
              <MdShieldMoon className="text-sm" />
              بيانات مشفرة وآمنة
            </div>
          </div>
        </motion.div>

        {/* Action Modals */}
        {actionModal === "approve" && (
          <ApproveDocumentConfirmationModal
            onCancel={() => setActionModal(null)}
            onConfirm={handleApproveConfirmed}
          />
        )}

        {actionModal === "needs-update" && (
          <NeedsUpdateDocumentModal
            onCancel={() => setActionModal(null)}
            onConfirm={handleNeedsUpdateConfirmed}
          />
        )}

        {actionModal === "reject" && (
          <RejectDocumentModal
            onCancel={() => setActionModal(null)}
            onConfirm={handleRejectConfirmed}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// ===== MAIN COMPONENT =====

export default function AdminGuardianDocumentsReviewPage() {
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocType, setSelectedDocType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Modal and data states
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState(mockDocuments);
  const [isLoading] = useState(false);

  // Toast state
  const [toast, setToast] = useState(null);

  // Filter documents
  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.guardianFullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.guardianEmail.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDocType =
        !selectedDocType || doc.documentType === selectedDocType;

      const matchesStatus =
        !selectedStatus || doc.verificationStatus === selectedStatus;

      return matchesSearch && matchesDocType && matchesStatus;
    });
  }, [documents, searchTerm, selectedDocType, selectedStatus]);

  // Reset to page 1 when filters change
  const handleFilterChange = (filterSetter, value) => {
    filterSetter(value);
    setCurrentPage(1);
  };

  // Show toast
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle approve
  const handleApprove = (document) => {
    const updatedDocs = documents.map((doc) =>
      doc.documentId === document.documentId
        ? { ...doc, verificationStatus: "Approved" }
        : doc,
    );
    setDocuments(updatedDocs);
    setSelectedDocument(null);
    showToast("تم اعتماد الوثيقة بنجاح ✅", "success");
  };

  // Handle needs update
  const handleNeedsUpdate = (document, reason) => {
    const updatedDocs = documents.map((doc) =>
      doc.documentId === document.documentId
        ? { ...doc, verificationStatus: "NeedsUpdate" }
        : doc,
    );
    setDocuments(updatedDocs);
    setSelectedDocument(null);
    showToast(`تم طلب التحديث: ${reason.substring(0, 30)}...`, "info");
  };

  // Handle reject
  const handleReject = (document, reason) => {
    const updatedDocs = documents.map((doc) =>
      doc.documentId === document.documentId
        ? { ...doc, verificationStatus: "Rejected" }
        : doc,
    );
    setDocuments(updatedDocs);
    setSelectedDocument(null);
    showToast(`تم رفض الوثيقة: ${reason.substring(0, 30)}...`, "error");
  };

  const pendingCount = documents.filter(
    (doc) => doc.verificationStatus === "Pending",
  ).length;

  return (
    <AdminLayout title="مراجعة وثائق الأوصياء">
      <div className="w-full max-w-7xl mx-auto">
        {/* Page Content */}
        <div className="space-y-8">
          <HeaderSection pendingCount={pendingCount} />

          <Filters
            searchTerm={searchTerm}
            onSearchChange={(val) => handleFilterChange(setSearchTerm, val)}
            selectedDocType={selectedDocType}
            onDocTypeChange={(val) =>
              handleFilterChange(setSelectedDocType, val)
            }
            selectedStatus={selectedStatus}
            onStatusChange={(val) => handleFilterChange(setSelectedStatus, val)}
          />

          {/* Document Table */}
          <div>
            <h2
              dir="rtl"
              className="text-right text-lg font-bold text-[#111827] mb-4"
            >
              قائمة الانتظار
            </h2>
            <DocumentTable
              documents={filteredDocuments}
              isLoading={isLoading}
              onReview={setSelectedDocument}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Review Modal */}
        {selectedDocument && (
          <ReviewModal
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
            onApprove={handleApprove}
            onNeedsUpdate={handleNeedsUpdate}
            onReject={handleReject}
          />
        )}

        {/* Toast */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 px-6 py-4 rounded-lg text-white font-bold shadow-lg z-40 ${
              toast.type === "success"
                ? "bg-green-600"
                : toast.type === "error"
                  ? "bg-red-600"
                  : "bg-blue-600"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </div>
      <footer className="mt-20 py-2 border-t border-[#E5E7EB] text-center">
        <p className="text-sm text-[#6B7280] mt-4">
          © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
        </p>
      </footer>
    </AdminLayout>
  );
}
