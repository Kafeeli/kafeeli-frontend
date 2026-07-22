import { motion } from "framer-motion";
import { useState } from "react";
import { MdClose, MdOutlineEditNote } from "react-icons/md";

export default function NeedsUpdateDocumentModal({
  onCancel,
  onConfirm,
  loading = false,
}) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!reason.trim()) {
      setError("يرجى كتابة سبب طلب التحديث");
      return;
    }
    setError("");
    onConfirm?.(reason.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        dir="rtl"
        className="relative w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[#FDE7E7] text-[#C0392B]">
            <MdOutlineEditNote className="text-2xl" />
          </div>
          <button
            onClick={onCancel}
            className="grid h-8 w-8 place-items-center rounded-lg text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"
            aria-label="إغلاق"
          >
            <MdClose />
          </button>
        </div>

        <h3 className="mb-4 text-right text-lg font-extrabold text-[#111827]">
          طلب تحديث الوثيقة
        </h3>

        <label className="mb-2 block text-right text-sm font-bold text-[#111827]">
          سبب طلب التحديث
        </label>
        <textarea
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            if (error) setError("");
          }}
          rows={4}
          placeholder="مثال: الصورة غير واضحة، يرجى رفع نسخة أوضح من الوثيقة."
          className={`mb-1 w-full resize-none rounded-lg border ${
            error ? "border-red-400" : "border-[#D0D5DD]"
          } bg-white p-3 text-right text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition`}
        />
        {error && (
          <p className="mb-3 text-right text-xs text-red-500">{error}</p>
        )}

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={onCancel}
            className="h-11 flex-1 rounded-md border border-[#D0D5DD] bg-white text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#003469] text-sm font-bold text-white transition hover:bg-[#002850] disabled:opacity-60 cursor-pointer"
          >
            {loading ? "جارٍ الإرسال..." : "إرسال طلب التحديث"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
