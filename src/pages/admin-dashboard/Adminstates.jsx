import { MdWarningAmber, MdRefresh } from "react-icons/md";

const cardShadow = "shadow-[0_2px_10px_rgba(31,41,55,0.06)]";

/* ==================== بطاقة إحصائية مصغرة ==================== */
export function MiniStatCard({ label, value, icon: Icon, tone }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 ${cardShadow}`}
    >
      <div className="text-right">
        <p className="mb-1 text-sm text-[#6B7280]">{label}</p>
        <strong className="text-lg font-extrabold text-[#1F2937]">
          {value}
        </strong>
      </div>
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tone}`}
      >
        <Icon className="text-2xl" />
      </div>
    </div>
  );
}

/* ==================== حالة التحميل (Skeleton) ==================== */
function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-[#E5E7EB] bg-white p-5">
      <div className="mb-4 h-32 rounded-lg bg-gray-200" />
      <div className="mb-2 h-3 w-3/4 rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/2 rounded bg-gray-200" />
      <div className="flex gap-2">
        <div className="h-8 flex-1 rounded-md bg-gray-200" />
        <div className="h-8 flex-1 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function LoadingState({
  count = 6,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
}) {
  return (
    <div className={`grid grid-cols-1 gap-4 ${columns}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ==================== حالة الفراغ ==================== */
export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 bg-white/40 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#F3F4F5] text-[#9CA3AF]">
        <Icon className="text-3xl" />
      </div>
      <div>
        <h4 className="text-lg font-extrabold text-[#1F2937]">{title}</h4>
        <p className="mt-2 max-w-md text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

/* ==================== حالة الخطأ ==================== */
export function ErrorState({
  onRetry,
  title = "حدث خطأ في جلب البيانات",
  description,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-100 bg-red-50/40 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-100 text-red-500">
        <MdWarningAmber className="text-3xl" />
      </div>
      <div>
        <h4 className="text-lg font-extrabold text-red-600">{title}</h4>
        <p className="mt-2 max-w-md text-sm text-[#6B7280]">
          {description ||
            "نواجه صعوبات تقنية في الاتصال بالخادم الرئيسي حاليًا. قد يكون ذلك بسبب ضعف شبكة الإنترنت أو صيانة دورية للنظام."}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="mt-2 flex items-center gap-2 rounded-md bg-[#003469] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#002850] cursor-pointer"
      >
        <MdRefresh className="text-lg" />
        إعادة المحاولة
      </button>
    </div>
  );
}
