import { useState } from "react";
import {
  MdClose,
  MdOutlineVerified,
  MdOutlineCancel,
  MdPauseCircleOutline,
  MdOutlineVisibilityOff,
} from "react-icons/md";

/*
  ✅ بدل ما نبني 4 ملفات منفصلة (نافذة اعتماد، نافذة رفض، نافذة إيقاف،
  نافذة إخفاء) وهم شبه متطابقين ببنيتهم، بنيناهم كمكوّن واحد مُهيّأ
  عبر خاصية "type". إضافة نوع قرار جديد مستقبلاً = سطر واحد هون بس.
*/
const DECISION_CONFIG = {
  approve: {
    icon: MdOutlineVerified,
    iconTone: "bg-[#DDFBFB] text-[#018B8F]",
    title: "تأكيد اعتماد العائلة",
    description:
      "هل أنت متأكد من اعتماد هذه العائلة؟ ستصبح نشطة ومصدر اعتماد لعرض تفاصيلها للكفلاء.",
    confirmLabel: "تأكيد الاعتماد",
    confirmClass: "bg-[#003469] hover:bg-[#002850]",
    needsReason: false,
  },
  reject: {
    icon: MdOutlineCancel,
    iconTone: "bg-red-100 text-red-600",
    title: "تأكيد رفض العائلة",
    description:
      "يرجى كتابة سبب رفض هذا الطلب ليتم إعلام صاحب الطلب بالتفاصيل.",
    confirmLabel: "تأكيد الرفض",
    confirmClass: "bg-red-600 hover:bg-red-700",
    needsReason: true,
    reasonLabel: "سبب الرفض",
    reasonPlaceholder: "مثال: بيانات الهوية غير مكتملة أو غير واضحة.",
  },
  suspend: {
    icon: MdPauseCircleOutline,
    iconTone: "bg-amber-100 text-amber-700",
    title: "تأكيد إيقاف العائلة مؤقتًا",
    description:
      "سيتم إيقاف عرض هذه العائلة مؤقتًا ومنع استقبال أي كفالات جديدة لها لحين المراجعة.",
    confirmLabel: "إيقاف مؤقت",
    confirmClass: "bg-amber-600 hover:bg-amber-700",
    needsReason: false,
  },
  hide: {
    icon: MdOutlineVisibilityOff,
    iconTone: "bg-gray-200 text-gray-600",
    title: "تأكيد إخفاء العائلة",
    description:
      "سيتم إخفاء هذه العائلة بالكامل من النظام ولن تظهر للكفلاء في أي عمليات بحث.",
    confirmLabel: "إخفاء الآن",
    confirmClass: "bg-[#374151] hover:bg-[#1F2937]",
    needsReason: false,
  },
};

export default function FamilyDecisionModal({
  type,
  onCancel,
  onConfirm,
  loading = false,
}) {
  const config = DECISION_CONFIG[type];
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  if (!config) return null;

  const handleSubmit = () => {
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
      onClick={onCancel}
    >
      <div
        dir="rtl"
        className="w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div
            className={`grid h-12 w-12 place-items-center rounded-full ${config.iconTone}`}
          >
            <config.icon className="text-2xl" />
          </div>
          <button
            onClick={onCancel}
            className="grid h-8 w-8 place-items-center rounded-lg text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"
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
              onChange={(e) => {
                setReason(e.target.value);
                if (error) setError("");
              }}
              rows={4}
              placeholder={config.reasonPlaceholder}
              className={`mb-1 w-full resize-none rounded-lg border ${
                error ? "border-red-400" : "border-[#D0D5DD]"
              } bg-white p-3 text-right text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition`}
            />
            {error && (
              <p className="mb-3 text-right text-xs text-red-500">{error}</p>
            )}
          </>
        )}

        <div
          className={`${config.needsReason ? "mt-5" : "mt-2"} flex flex-col-reverse gap-3 sm:flex-row`}
        >
          <button
            onClick={onCancel}
            className="h-11 flex-1 rounded-md border border-[#D0D5DD] bg-white text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-md text-sm font-bold text-white transition disabled:opacity-60 cursor-pointer ${config.confirmClass}`}
          >
            {loading ? "جارٍ التنفيذ..." : config.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}