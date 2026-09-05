import { useRef, useState } from "react";
import {
  DOCUMENT_STATUS_OPTIONS,
  adminDocumentStatusClasses,
  adminDocumentStatusLabel,
  adminDocumentStatusRequiresReason,
} from "../../config/adminDocumentReviewConfig";
import { AdminDialog } from "./AdminManagementDialogs";

export default function AdminDocumentStatusModal({
  document,
  currentStatus,
  entityType,
  loading,
  error,
  onSubmit,
  onCancel,
}) {
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");
  const submittingRef = useRef(false);
  const selectedStatus = DOCUMENT_STATUS_OPTIONS.find((option) => option.value === Number(status));
  const currentStatusOption = DOCUMENT_STATUS_OPTIONS.find(
    (option) => option.key === currentStatus || option.value === Number(currentStatus),
  );
  const reasonRequired = adminDocumentStatusRequiresReason(status);
  const sameStatus = Boolean(status) && selectedStatus?.value === currentStatusOption?.value;
  const confirmDisabled = !status || sameStatus || (reasonRequired && !reason.trim());
  const subjectName = entityType === "orphan" ? document?.orphanFullName : document?.guardianFullName;
  const entityLabel = entityType === "orphan" ? "اليتيم" : "الوصي";
  const reasonLabel = selectedStatus?.key === "Rejected"
    ? "سبب الرفض"
    : selectedStatus?.key === "NeedsUpdate"
      ? "سبب طلب التحديث"
      : "ملاحظات (اختياري)";
  const reasonPlaceholder = selectedStatus?.key === "Rejected"
    ? "اكتب سبب رفض الوثيقة..."
    : selectedStatus?.key === "NeedsUpdate"
      ? "وضح ما الذي يجب تحديثه في الوثيقة..."
      : "أضف ملاحظة توضيحية إن وجدت...";

  const submit = async () => {
    if (loading || confirmDisabled || submittingRef.current) return;
    submittingRef.current = true;
    try {
      await onSubmit(Number(status), reason.trim());
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <AdminDialog
      title={`تغيير حالة وثيقة ${entityLabel}`}
      onClose={onCancel}
      closeDisabled={loading}
      size="max-w-lg"
      footer={(
        <>
          <button type="button" onClick={onCancel} disabled={loading} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 disabled:opacity-50">
            إلغاء
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading || confirmDisabled}
            className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#003469] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "جارٍ الحفظ..." : "حفظ الحالة"}
          </button>
        </>
      )}
    >
      <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4">
        <div>
          <span className="text-sm font-bold text-gray-600">الحالة الحالية:</span>
          {subjectName && <p className="mt-1 text-xs text-gray-500">{entityLabel}: {subjectName}</p>}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${adminDocumentStatusClasses(currentStatus)}`}>
          {adminDocumentStatusLabel(currentStatus)}
        </span>
      </div>

      <label className="mt-5 block text-sm font-bold text-gray-700">
        الحالة الجديدة:
        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          disabled={loading}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-[#0D4B8E] disabled:bg-gray-100"
        >
          <option value="">اختر الحالة</option>
          {DOCUMENT_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      {sameStatus && <p role="status" className="mt-3 text-sm font-bold text-amber-700">الوثيقة بالفعل بهذه الحالة</p>}

      {selectedStatus && (
        <label className={`mt-5 block text-sm font-bold text-gray-700 ${reasonRequired ? "rounded-xl border border-amber-200 bg-amber-50 p-4" : ""}`}>
          {reasonLabel}{reasonRequired && " *"}
          <textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            maxLength={500}
            rows={3}
            disabled={loading}
            required={reasonRequired}
            placeholder={reasonPlaceholder}
            className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-3 outline-none focus:border-[#0D4B8E] disabled:bg-gray-100"
          />
        </label>
      )}

      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold leading-6 text-red-700">{error}</p>}
    </AdminDialog>
  );
}
