import {
  MdCheckCircle,
  MdOutlineAccountBalance,
  MdAccessTime,
  MdWarningAmber,
  MdVerified,
} from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { isWallet } from "./TransferDataModal";

export const DEFAULT_TRANSFER_DATA = {
  bankName: "محفظة PALPAY",
  accountName: "أحمد العلي",
  accountNumber: "059 **** 456",
  iban: "SA60 ***** ***** ***** 4592",
  branch: "الفرع الرئيسي",
};

export const APPROVED_TRANSFER_DATA = {
  bankName: "البنك الإسلامي العربي",
  accountName: "أحمد العلي",
  accountNumber: "**** **** **** 2040",
  iban: "SA60 ***** ***** **** 8892",
  branch: "فرع غزة - الرمال",
};

const TransferDataSection = ({
  status = "empty",
  onAdd,
  onEdit,
  compact = false,
}) => {
  const statusConfig = {
    empty: {
      badge: {
        label: "غير مضافة",
        className: "bg-gray-100 text-gray-600",
        icon: <MdWarningAmber className="text-[14px]" />,
      },
      title: "تفاصيل التحويل",
      desc: "لم يتم إضافة بيانات التحويل بعد",
      showAddButton: true,
      showEditButton: false,
    },
    pendingReview: {
      badge: {
        label: "قيد المراجعة",
        className: "bg-[#FFE7B8] text-[#9A6700]",
        icon: <MdAccessTime className="text-[14px]" />,
      },
      title: "تفاصيل التحويل",
      desc: "تم إرسال بيانات التحويل وهي بانتظار مراجعة الإدارة",
      showAddButton: false,
      showEditButton: false,
    },
    needsUpdate: {
      badge: {
        label: "يحتاج تعديل",
        className: "bg-red-100 text-red-700",
        icon: <MdWarningAmber className="text-[14px]" />,
      },
      title: "تفاصيل التحويل",
      desc: "تحتاج بيانات التحويل إلى تعديل من قبل المستخدم",
      showAddButton: false,
      showEditButton: true,
    },
    approved: {
      badge: {
        label: "معتمد",
        className: "bg-[#DDFBFB] text-[#018B8F]",
        icon: <MdVerified className="text-[14px]" />,
      },
      title: "تفاصيل التحويل",
      desc: "تم اعتماد بيانات التحويل من قبل الإدارة",
      showAddButton: false,
      showEditButton: true,
    },
  };

  const current = statusConfig[status];

  // Compact Mobile Mode
  if (compact) {
    return (
      <section
        dir="rtl"
        className="w-full rounded-[8px] border border-[#D8DEE8] bg-white shadow-sm overflow-hidden text-right"
      >
        <div className="w-full bg-[#F3F4F5] border-b border-[#D8DEE8] px-3 py-3 flex items-center justify-between gap-3">
          <div className="text-right">
            <h3 className="text-[12px] font-bold text-[#003469] leading-5">
              {current.title}
            </h3>
            <p className="text-[10px] text-[#6B7280] mt-0.5 leading-4">
              {current.desc}
            </p>
          </div>

          <span
            className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold shrink-0 ${current.badge.className}`}
          >
            {current.badge.icon}
            {current.badge.label}
          </span>
        </div>

        <div className="p-3 space-y-2">
          {status === "empty" ? (
            <button
              onClick={onAdd}
              className="w-full h-[36px] rounded-[6px] border-2 border-dashed border-[#D0D5DD] bg-white text-[#003469] text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-[#F5F8FB] hover:border-[#003469] transition cursor-pointer"
            >
              <span className="text-[14px]">+</span>
              إضافة بيانات التحويل
            </button>
          ) : (
            <>
              <MobileRow
                label={
                  isWallet(DEFAULT_TRANSFER_DATA.bankName) ? "المحفظة" : "البنك"
                }
                value={DEFAULT_TRANSFER_DATA.bankName}
              />
              <MobileRow
                label="صاحب الحساب"
                value={DEFAULT_TRANSFER_DATA.accountName}
              />
              <MobileRow
                label={
                  isWallet(DEFAULT_TRANSFER_DATA.bankName)
                    ? "رقم المحفظة"
                    : "رقم الحساب"
                }
                value={DEFAULT_TRANSFER_DATA.accountNumber}
              />
              <MobileRow
                label="رقم الآيبان (IBAN)"
                value={DEFAULT_TRANSFER_DATA.iban}
                mono
              />

              {current.showEditButton && (
                <button
                  onClick={onEdit}
                  className="w-full h-[36px] mt-2 rounded-[6px] bg-[#003469] text-white text-[11px] font-bold flex items-center justify-center gap-2 hover:bg-[#002b57] transition cursor-pointer"
                >
                  <LuPencil className="text-[12px]" />
                  تعديل بيانات التحويل
                </button>
              )}
            </>
          )}
        </div>
      </section>
    );
  }

  // Full Desktop Mode
  return (
    <section
      dir="rtl"
      className="w-full bg-white rounded-xl border border-[#D8DEE8] overflow-hidden text-right"
    >
      <div className="w-full bg-[#F3F4F5] border-b border-[#D8DEE8] px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="text-right flex-1">
          <h3 className="text-[16px] font-bold text-[#003469] leading-6">
            بيانات التحويل
          </h3>
          <p className="text-[12px] text-[#6B7280] mt-0.5 leading-5">
            {status === "pendingReview"
              ? "تفاصيل الحساب البنكي المستخدم للتحويلات"
              : status === "approved"
                ? "معلومات الحساب البنكي المعتمدة"
                : "إدارة معلومات الحساب البنكي والمحفظة الإلكترونية"}
          </p>
        </div>

        <span
          className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-bold shrink-0 ${current.badge.className}`}
        >
          {current.badge.icon}
          {current.badge.label}
        </span>
      </div>

      <div className="p-4 sm:p-6">
        {status === "empty" && <EmptyState onAdd={onAdd} />}
        {status === "needsUpdate" && <NeedsUpdateState onEdit={onEdit} />}
        {status === "pendingReview" && <PendingReviewState />}
        {status === "approved" && <ApprovedState onEdit={onEdit} />}
      </div>
    </section>
  );
};

const MobileRow = ({ label, value, mono = false }) => (
  <div className="flex items-center justify-between gap-3 py-1.5 border-b border-gray-50 last:border-0">
    <span className="text-[10px] text-[#6B7280] font-medium shrink-0">
      {label}
    </span>
    <span
      dir={mono ? "ltr" : "rtl"}
      className={`text-[11px] text-[#003469] text-left ${
        mono ? "font-mono tracking-wide" : "font-bold"
      }`}
    >
      {value}
    </span>
  </div>
);

const EmptyState = ({ onAdd }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-8">
    <div className="w-16 h-16 rounded-full bg-[#F3F4F5] flex items-center justify-center">
      <MdOutlineAccountBalance className="text-[32px] text-[#003469]" />
    </div>

    <div className="text-center max-w-md">
      <h4 className="font-bold text-[15px] text-[#003469] leading-6">
        لم تتم إضافة بيانات التحويل بعد
      </h4>
      <p className="text-[12px] text-[#6B7280] mt-2 leading-5">
        يرجى إضافة بيانات الحساب البنكي أو المحفظة الإلكترونية لتلقي المدفوعات
        المالية الخاصة بك.
      </p>
    </div>

    <button
      onClick={onAdd}
      className="h-[40px] px-6 rounded-md bg-[#003469] text-white text-[14px] font-bold flex items-center gap-2 shadow-sm hover:bg-[#002b57] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer"
    >
      <span className="text-[16px]">+</span>
      إضافة بيانات التحويل
    </button>
  </div>
);

const NeedsUpdateState = ({ onEdit }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
      <FieldRow
        label={isWallet(DEFAULT_TRANSFER_DATA.bankName) ? "المحفظة" : "البنك"}
        value={DEFAULT_TRANSFER_DATA.bankName}
      />
      <FieldRow label="صاحب الحساب" value={DEFAULT_TRANSFER_DATA.accountName} />
      <FieldRow
        label={
          isWallet(DEFAULT_TRANSFER_DATA.bankName)
            ? "رقم المحفظة"
            : "رقم الحساب"
        }
        value={DEFAULT_TRANSFER_DATA.accountNumber}
      />
      <FieldRow
        label="رقم الآيبان (IBAN)"
        value={DEFAULT_TRANSFER_DATA.iban}
        mono
      />
      <FieldRow label="الفرع" value={DEFAULT_TRANSFER_DATA.branch} />
    </div>

    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 flex items-start gap-3">
      <MdWarningAmber className="text-[20px] text-red-600 shrink-0 mt-0.5" />
      <div className="text-right flex-1">
        <h4 className="font-bold text-[14px] leading-[20px] text-red-800">
          ملاحظة الإدارة
        </h4>
        <p className="mt-1 text-[13px] leading-[22px] text-red-700">
          يرجى التأكد من رقم الهاتف المرتبط بالمحفظة أو تعديل الحساب لتصحيح
          التضارب.
        </p>
      </div>
    </div>

    <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <p className="text-[11px] text-[#6B7280] leading-5">
        بعد التعديل، ستعود البيانات تلقائياً إلى مرحلة المراجعة والتدقيق.
      </p>
      <button
        onClick={onEdit}
        className="h-[40px] px-5 rounded-md bg-[#003469] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002b57] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        <LuPencil className="text-[14px]" />
        تعديل بيانات التحويل
      </button>
    </div>
  </div>
);

const PendingReviewState = () => (
  <div className="space-y-6">
    {/* Grid محسّن وموزع بشكل متناسق ومحاذى لليمين بنسبة 100% */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
      <FieldRow
        label={isWallet(DEFAULT_TRANSFER_DATA.bankName) ? "المحفظة" : "البنك"}
        value={DEFAULT_TRANSFER_DATA.bankName}
      />
      <FieldRow label="صاحب الحساب" value={DEFAULT_TRANSFER_DATA.accountName} />
      <FieldRow
        label={
          isWallet(DEFAULT_TRANSFER_DATA.bankName)
            ? "رقم المحفظة"
            : "رقم الحساب"
        }
        value={DEFAULT_TRANSFER_DATA.accountNumber}
      />
      <FieldRow
        label="رقم الآيبان (IBAN)"
        value={DEFAULT_TRANSFER_DATA.iban}
        mono
      />
      <FieldRow label="الفرع" value={DEFAULT_TRANSFER_DATA.branch} />
    </div>

    <div className="rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 flex items-start gap-3">
      <MdAccessTime className="text-[20px] text-[#018B8F] shrink-0 mt-0.5" />
      <div className="text-right flex-1">
        <h4 className="font-bold text-[14px] leading-[20px] text-[#006B70]">
          بانتظار المراجعة
        </h4>
        <p className="mt-1 text-[13px] leading-[22px] text-[#006B70]">
          تم إرسال بيانات التحويل بنجاح، وهي حالياً قيد المراجعة والتدقيق من قبل
          إدارة المنصة.
        </p>
      </div>
    </div>
  </div>
);

const ApprovedState = ({ onEdit }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
      <FieldRow
        label={isWallet(APPROVED_TRANSFER_DATA.bankName) ? "المحفظة" : "البنك"}
        value={APPROVED_TRANSFER_DATA.bankName}
      />
      <FieldRow
        label="صاحب الحساب"
        value={APPROVED_TRANSFER_DATA.accountName}
      />
      <FieldRow
        label={
          isWallet(APPROVED_TRANSFER_DATA.bankName)
            ? "رقم المحفظة"
            : "رقم الحساب"
        }
        value={APPROVED_TRANSFER_DATA.accountNumber}
      />
      <FieldRow
        label="رقم الآيبان (IBAN)"
        value={APPROVED_TRANSFER_DATA.iban}
        mono
      />
      <FieldRow label="الفرع" value={APPROVED_TRANSFER_DATA.branch} />
    </div>

    <div className="rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 flex items-start gap-3">
      <MdVerified className="text-[20px] text-[#018B8F] shrink-0 mt-0.5" />
      <div className="text-right flex-1">
        <h4 className="font-bold text-[14px] leading-[20px] text-[#006B70]">
          بيانات معتمدة
        </h4>
        <p className="mt-1 text-[13px] leading-[22px] text-[#006B70]">
          تم اعتماد بيانات التحويل الخاصة بك بنجاح، وسيتم استخدامها في إرسال
          كافة مستحقاتك القادمة.
        </p>
      </div>
    </div>

    <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
      <p className="text-[11px] text-[#6B7280] leading-5">
        تنبيه: في حال قمت بتعديل البيانات المعتمدة، ستدخل الحسابات في طور
        المراجعة مرة أخرى.
      </p>
      <button
        onClick={onEdit}
        className="h-[40px] px-5 rounded-md bg-[#003469] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002b57] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer"
      >
        <LuPencil className="text-[14px]" />
        تعديل البيانات المعتمدة
      </button>
    </div>
  </div>
);

/* 
  هنا يكمن السحر! تم تحويل التوزيع ليصبح رأسي (العنوان فوق والقيمة تحت)
  لتحقيق تماسك بصري كامل مريح ومحاذى لليمين تماماً كما يظهر في لوحات التحكم الاحترافية.
*/
const FieldRow = ({ label, value, mono = false, className = "" }) => (
  <div className={`flex flex-col items-start gap-1.5 text-right ${className}`}>
    <span className="text-[12px] text-[#9CA3AF] font-medium leading-none">
      {label}
    </span>
    <span
      dir={mono ? "ltr" : "rtl"}
      className={`text-[15px] font-bold text-[#003469] leading-tight ${
        mono ? "font-mono tracking-wide" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

export default TransferDataSection;