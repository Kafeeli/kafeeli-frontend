import { useState } from "react";
import {
  MdBlock,
  MdClose,
  MdOutlineEditNote,
  MdVisibilityOff,
  MdOutlineVerified,
} from "react-icons/md";

const DECISION_CONFIG = {
  approve: {
    icon: MdOutlineVerified,
    iconTone: "bg-[#DDFBFB] text-[#018B8F]",
    title: "تأكيد اعتماد العائلة",
    description:
      "هل أنت متأكد من اعتماد هذه العائلة؟ لن يتغير وضع الطلب قبل تأكيد العملية من الخادم.",
    confirmLabel: "تأكيد الاعتماد",
    confirmClass: "bg-[#003469] hover:bg-[#002850]",
    needsReason: false,
  },
  needsUpdate: {
    icon: MdOutlineEditNote,
    iconTone: "bg-amber-100 text-amber-700",
    title: "طلب تحديث بيانات العائلة",
    description:
      "اكتب سبب طلب التحديث بوضوح ليتمكن ولي الأمر من استكمال أو تصحيح البيانات المطلوبة.",
    confirmLabel: "إرسال طلب التحديث",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
    needsReason: true,
    reasonLabel: "سبب طلب التحديث",
    reasonPlaceholder: "اكتب البيانات أو المستندات التي تحتاج إلى تحديث.",
  },
  hide: {
    icon: MdVisibilityOff,
    iconTone: "bg-gray-100 text-gray-700",
    title: "تأكيد إخفاء العائلة",
    description:
      "هل أنت متأكد من إخفاء هذه العائلة؟ سيعرض النظام الحالة التي يعيدها الخادم بعد التأكيد.",
    confirmLabel: "تأكيد الإخفاء",
    confirmClass: "bg-gray-700 hover:bg-gray-800",
    needsReason: false,
  },
  suspend: {
    icon: MdBlock,
    iconTone: "bg-orange-100 text-orange-700",
    title: "تأكيد تعليق العائلة",
    description:
      "هل أنت متأكد من تعليق هذه العائلة؟ سيعرض النظام الحالة التي يعيدها الخادم بعد التأكيد.",
    confirmLabel: "تأكيد التعليق",
    confirmClass: "bg-orange-600 hover:bg-orange-700",
    needsReason: false,
  },
};

export default function FamilyDecisionModal({
  type,
  onCancel,
  onConfirm,
  loading = false,
  serverError = "",
}) {
  const config = DECISION_CONFIG[type];
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!config) return null;

  const handleSubmit = () => {
    if (loading) return;

    if (config.needsReason && !reason.trim()) {
      setError(`يرجى كتابة ${config.reasonLabel}`);
      return;
    }

    setError("");
    onConfirm(config.needsReason ? reason.trim() : undefined);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
      onClick={loading ? undefined : onCancel}
    >
      <div
        dir="rtl"
        className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div
            className={`grid h-12 w-12 place-items-center rounded-full ${config.iconTone}`}
          >
            <config.icon className="text-2xl" />
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-lg text-[#6B7280] transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="إغلاق"
          >
            <MdClose />
          </button>
        </div>

        <h3 className="mb-2 text-right text-lg font-extrabold text-[#111827]">
          {config.title}
        </h3>
        <p className="mb-4 text-right text-sm leading-6 text-[#6B7280]">
          {config.description}
        </p>

        {config.needsReason && (
          <>
            <label className="mb-2 block text-right text-sm font-bold text-[#111827]">
              {config.reasonLabel}
            </label>
            <textarea
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                if (error) setError("");
              }}
              rows={4}
              disabled={loading}
              placeholder={config.reasonPlaceholder}
              className={`mb-1 w-full resize-none rounded-lg border ${
                error ? "border-red-400" : "border-[#D0D5DD]"
              } bg-white p-3 text-right text-sm text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50`}
            />
            {error && (
              <p className="mb-3 text-right text-xs text-red-500">{error}</p>
            )}
          </>
        )}

        {serverError && (
          <div className="mt-3 rounded-xl border border-red-100 bg-red-50 p-3 text-right text-sm font-semibold text-red-700">
            {serverError}
          </div>
        )}

        <div
          className={`${config.needsReason ? "mt-5" : "mt-2"} flex flex-col-reverse gap-3 sm:flex-row`}
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="h-11 flex-1 cursor-pointer rounded-md border border-[#D0D5DD] bg-white text-sm font-bold text-[#111827] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${config.confirmClass}`}
          >
            {loading ? "جارٍ التنفيذ..." : config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
