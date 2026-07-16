import { MdClose, MdOutlineVerified } from "react-icons/md";

export default function ApproveConfirmModal({
  onCancel,
  onConfirm,
  loading = false,
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
      onClick={onCancel}
    >
      <div
        dir="rtl"
        className="w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-[#DDFBFB] text-[#018B8F]">
            <MdOutlineVerified className="text-2xl" />
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
          تأكيد اعتماد بيانات التحويل
        </h3>
        <p className="mb-6 text-right text-sm leading-6 text-[#6B7280]">
          هل أنت متأكد من اعتماد بيانات التحويل؟ ستصبح جاهزة للاستخدام في
          الدفعات المستقبلية.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <button
            onClick={onCancel}
            className="h-11 flex-1 rounded-md border border-[#D0D5DD] bg-white text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-md bg-[#003469] text-sm font-bold text-white transition hover:bg-[#002850] disabled:opacity-60 cursor-pointer"
          >
            {loading ? "جارٍ الاعتماد..." : "اعتماد البيانات"}
          </button>
        </div>
      </div>
    </div>
  );
}
