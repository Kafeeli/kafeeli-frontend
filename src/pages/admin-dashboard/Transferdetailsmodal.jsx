// import { useState } from "react";
// import {
//   MdClose,
//   MdOutlinePhone,
//   MdOutlineEmail,
//   MdOutlinePerson,
//   MdOutlineAccountBalance,
//   MdOutlineLocationOn,
//   MdOutlineCalendarToday,
//   MdOutlineContentCopy,
//   MdCheck,
//   MdOutlineAssignmentLate,
//   MdVerifiedUser,
//   MdShieldMoon,
//   MdOutlineEditNote,
// } from "react-icons/md";
// import ApproveConfirmModal from "./ApproveConfirmModal";
// import RequestEditModal from "./RequestEditModal";

// function InfoCard({ label, value, icon: Icon, mono = false }) {
//   return (
//     <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-right">
//       <div className="mb-2 flex items-center justify-between">
//         <span className="text-xs font-medium text-[#6B7280]">{label}</span>
//         {Icon && <Icon className="text-lg text-[#0D4B8E]" />}
//       </div>
//       <p
//         dir={mono ? "ltr" : "rtl"}
//         className={`break-words text-sm font-bold text-[#111827] ${
//           mono ? "text-left font-mono" : ""
//         }`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// function SectionTitle({ icon: Icon, children }) {
//   return (
//     <h3 className="mb-3 flex items-center justify-start gap-2 text-[15px] font-extrabold text-[#003469]">
//       {children}
//       <Icon className="text-lg" />
//     </h3>
//   );
// }

// export default function TransferDetailsModal({
//   data,
//   onClose,
//   onApprove,
//   onRequestEdit,
// }) {
//   const [copied, setCopied] = useState(false);
//   const [actionModal, setActionModal] = useState(null); // null | "approve" | "edit"

//   if (!data) return null;

//   const handleCopyIban = async () => {
//     try {
//       await navigator.clipboard.writeText(data.iban);
//       setCopied(true);
//       setTimeout(() => setCopied(false), 1500);
//     } catch {
//       // تجاهل بصمت لو فشل النسخ (متصفح لا يدعمه)
//     }
//   };

//   const handleApproveConfirmed = () => {
//     setActionModal(null);
//     onApprove?.(data);
//   };

//   const handleEditConfirmed = (reason) => {
//     setActionModal(null);
//     onRequestEdit?.(data, reason);
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 animate-fadeIn"
//       onClick={onClose}
//     >
//       <div
//         dir="ltr"
//         className="relative flex w-full max-w-[900px] max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-slideUp"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* ===== المحتوى الرئيسي (يظهر يسار) ===== */}
//         <div className="flex-1 overflow-y-auto p-6 sm:p-8">
//           <div className="mb-6 flex items-center justify-between">
//             <button
//               onClick={onClose}
//               className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"
//               aria-label="إغلاق"
//             >
//               <MdClose className="text-lg" />
//             </button>

//             <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE7B8] px-3 py-1 text-xs font-bold text-[#9A6700]">
//               <span className="h-1.5 w-1.5 rounded-full bg-[#9A6700]" />
//               {data.status}
//             </span>
//           </div>

//           <h2
//             dir="rtl"
//             className="mb-7 text-right text-2xl font-extrabold text-[#003469]"
//           >
//             تفاصيل التحويل
//           </h2>

//           <div dir="rtl">
//             {/* معلومات ولي الأمر */}
//             <SectionTitle icon={MdOutlinePerson}>
//               معلومات ولي الأمر
//             </SectionTitle>
//             <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
//               <InfoCard
//                 label="الاسم الكامل"
//                 value={data.name}
//                 icon={MdOutlinePerson}
//               />
//               <InfoCard
//                 label="البريد الإلكتروني"
//                 value={data.email}
//                 icon={MdOutlineEmail}
//                 mono
//               />
//               <InfoCard
//                 label="رقم الهاتف"
//                 value={data.guardianPhone}
//                 icon={MdOutlinePhone}
//                 mono
//               />
//             </div>

//             {/* تفاصيل الحساب البنكي / المحفظة */}
//             <SectionTitle icon={MdOutlineAccountBalance}>
//               تفاصيل الحساب البنكي / المحفظة
//             </SectionTitle>

//             <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-right">
//                 <span className="mb-2 block text-xs font-medium text-[#6B7280]">
//                   الحالة
//                 </span>
//                 <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE7B8] px-3 py-1 text-xs font-bold text-[#9A6700]">
//                   <MdOutlineAssignmentLate className="text-sm" />
//                   بانتظار الاعتماد
//                 </span>
//               </div>
//               <InfoCard
//                 label="اسم البنك / المحفظة"
//                 value={data.bankName}
//                 icon={MdOutlineAccountBalance}
//               />
//               <InfoCard
//                 label="الفرع"
//                 value={data.branch}
//                 icon={MdOutlineLocationOn}
//               />
//               <InfoCard
//                 label="اسم صاحب الحساب"
//                 value={data.accountOwner}
//                 icon={MdOutlinePerson}
//               />
//             </div>

//             {/* IBAN مميز */}
//             <div className="mb-3 flex items-center justify-between gap-4 rounded-lg border-2 border-[#0D4B8E]/15 bg-[#F0F6FF] px-4 py-4 sm:px-5">
//               <div className="text-right">
//                 <p className="mb-1 text-xs text-[#6B7280]">
//                   رقم الآيبان (Full IBAN)
//                 </p>
//                 <p
//                   dir="ltr"
//                   className="text-left font-mono text-base font-extrabold text-[#003469] sm:text-lg"
//                 >
//                   {data.iban}
//                 </p>
//               </div>
//               <button
//                 onClick={handleCopyIban}
//                 className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#D0D5DD] bg-white text-[#0D4B8E] transition hover:bg-gray-50 cursor-pointer"
//                 aria-label="نسخ رقم الآيبان"
//               >
//                 {copied ? (
//                   <MdCheck className="text-lg text-green-600" />
//                 ) : (
//                   <MdOutlineContentCopy />
//                 )}
//               </button>
//             </div>

//             <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <InfoCard
//                 label="تاريخ الإضافة"
//                 value={data.date}
//                 icon={MdOutlineCalendarToday}
//               />
//               <InfoCard
//                 label="رقم الحساب / الجوال"
//                 value={data.accountOrPhone}
//                 icon={MdOutlinePhone}
//                 mono
//               />
//             </div>

//             {/* تنبيه */}
//             <div className="mb-7 flex items-start gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
//               <MdShieldMoon className="mt-0.5 shrink-0 text-lg text-[#6B7280]" />
//               <p className="text-right text-[13px] leading-6 text-[#6B7280]">
//                 هذه البيانات حساسة ويجب استخدامها فقط ضمن إجراءات مراجعة الدفعات
//                 داخل المنصة، يمنع مشاركة هذه المعلومات خارج النظام.
//               </p>
//             </div>

//             {/* الأزرار — بتفتح نافذة تأكيد قبل تنفيذ القرار الفعلي */}
//             <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
//               <button
//                 onClick={() => setActionModal("edit")}
//                 className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#D0D5DD] bg-white px-6 text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer"
//               >
//                 <MdOutlineEditNote className="text-lg" />
//                 طلب تعديل
//               </button>
//               <button
//                 onClick={() => setActionModal("approve")}
//                 className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#003469] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#002850] cursor-pointer"
//               >
//                 <MdVerifiedUser className="text-lg" />
//                 اعتماد بيانات التحويل
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ===== اللوحة الجانبية (تظهر يمين) ===== */}
//         <div className="hidden w-[300px] shrink-0 flex-col items-center justify-center bg-[#003469] p-8 text-center text-white md:flex">
//           <div className="mb-[100px] flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/10">
//             <img
//               src="/src/assets/title.png"
//               alt="كفيلي"
//               className="h-22 w-22 scale-125 translate-y-[2px] object-contain object-center"
//             />
//           </div>
//           <h3 className="mb-2 text-xl font-extrabold">كفيلي</h3>
//           <p className="text-sm leading-6 text-white/70">
//             نظام إدارة الأيتام المتكامل لضمان الشفافية والاحترافية في رعاية
//             الحالات.
//           </p>

//           <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/80">
//             <MdShieldMoon className="text-sm" />
//             بيانات مشفرة وآمنة
//           </div>
//         </div>
//       </div>

//       {/* ===== نوافذ اتخاذ القرار (تظهر فوق هذا المودال) ===== */}
//       {actionModal === "approve" && (
//         <ApproveConfirmModal
//           onCancel={() => setActionModal(null)}
//           onConfirm={handleApproveConfirmed}
//         />
//       )}

//       {actionModal === "edit" && (
//         <RequestEditModal
//           onCancel={() => setActionModal(null)}
//           onConfirm={handleEditConfirmed}
//         />
//       )}

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(20px) scale(0.96); }
//           to   { opacity: 1; transform: translateY(0) scale(1); }
//         }
//         .animate-fadeIn  { animation: fadeIn 0.2s ease-out both; }
//         .animate-slideUp { animation: slideUp 0.3s ease-out both; }
//       `}</style>
//     </div>
//   );
// }
import { useState } from "react";
import {
  MdClose,
  MdOutlineEmail,
  MdOutlinePerson,
  MdOutlineAccountBalance,
  MdOutlineLocationOn,
  MdOutlineCalendarToday,
  MdOutlineContentCopy,
  MdCheck,
  MdOutlineAssignmentLate,
  MdVerifiedUser,
  MdShieldMoon,
  MdOutlineEditNote,
} from "react-icons/md";
import ApproveConfirmModal from "./ApproveConfirmModal";
import RequestEditModal from "./Requesteditmodal";

/* ==================== ترجمة حالة التحقق لعرض عربي مناسب ==================== */
const STATUS_LABELS = {
  Pending: "بانتظار المراجعة",
  PendingReview: "بانتظار المراجعة",
  Approved: "معتمد",
  NeedsUpdate: "بحاجة لتحديث",
  Rejected: "مرفوض",
};

function statusLabel(status) {
  return STATUS_LABELS[status] || status || "—";
}

function InfoCard({ label, value, icon: Icon, mono = false }) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-right">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-[#6B7280]">{label}</span>
        {Icon && <Icon className="text-lg text-[#0D4B8E]" />}
      </div>
      <p
        dir={mono ? "ltr" : "rtl"}
        className={`break-words text-sm font-bold text-[#111827] ${
          mono ? "text-left font-mono" : ""
        }`}
      >
        {value || "—"}
      </p>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <h3 className="mb-3 flex items-center justify-start gap-2 text-[15px] font-extrabold text-[#003469]">
      {children}
      <Icon className="text-lg" />
    </h3>
  );
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function TransferDetailsModal({
  data,
  onClose,
  onApprove,
  onRequestEdit,
  actionLoading = false,
  actionError = null,
}) {
  const [copied, setCopied] = useState(false);
  const [actionModal, setActionModal] = useState(null); // null | "approve" | "edit"

  if (!data) return null;

  // القيمة الكاملة إذا وصلت من endpoint التفاصيل، وإلا القيمة المقنّعة من القائمة
  const ibanValue = data.iban || data.ibanMasked;
  const accountNumberValue = data.accountNumber || data.accountNumberMasked;

  const handleCopyIban = async () => {
    if (!ibanValue) return;
    try {
      await navigator.clipboard.writeText(ibanValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // تجاهل بصمت لو فشل النسخ (متصفح لا يدعمه)
    }
  };

  const handleApproveConfirmed = () => {
    setActionModal(null);
    onApprove?.(data);
  };

  const handleEditConfirmed = (reason) => {
    setActionModal(null);
    onRequestEdit?.(data, reason);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        dir="ltr"
        className="relative flex w-full max-w-[900px] max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ===== المحتوى الرئيسي (يظهر يسار) ===== */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] text-[#6B7280] transition hover:bg-gray-100 cursor-pointer"
              aria-label="إغلاق"
            >
              <MdClose className="text-lg" />
            </button>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE7B8] px-3 py-1 text-xs font-bold text-[#9A6700]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#9A6700]" />
              {statusLabel(data.verificationStatus)}
            </span>
          </div>

          <h2
            dir="rtl"
            className="mb-7 text-right text-2xl font-extrabold text-[#003469]"
          >
            تفاصيل التحويل
          </h2>

          {actionError && (
            <div
              dir="rtl"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-right text-sm text-red-700"
            >
              {actionError}
            </div>
          )}

          <div dir="rtl">
            {/* معلومات ولي الأمر */}
            <SectionTitle icon={MdOutlinePerson}>
              معلومات ولي الأمر
            </SectionTitle>
            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoCard
                label="الاسم الكامل"
                value={data.guardianFullName || data.name}
                icon={MdOutlinePerson}
              />
              <InfoCard
                label="البريد الإلكتروني"
                value={data.guardianEmail || data.email}
                icon={MdOutlineEmail}
                mono
              />
            </div>

            {/* تفاصيل الحساب البنكي / المحفظة */}
            <SectionTitle icon={MdOutlineAccountBalance}>
              تفاصيل الحساب البنكي / المحفظة
            </SectionTitle>

            <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-right">
                <span className="mb-2 block text-xs font-medium text-[#6B7280]">
                  الحالة
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE7B8] px-3 py-1 text-xs font-bold text-[#9A6700]">
                  <MdOutlineAssignmentLate className="text-sm" />
                  {statusLabel(data.verificationStatus)}
                </span>
              </div>
              <InfoCard
                label="اسم البنك / المحفظة"
                value={data.bankName}
                icon={MdOutlineAccountBalance}
              />
              <InfoCard
                label="الفرع"
                value={data.branchName}
                icon={MdOutlineLocationOn}
              />
              <InfoCard
                label="اسم صاحب الحساب"
                value={data.accountHolderName}
                icon={MdOutlinePerson}
              />
            </div>

            {/* IBAN مميز */}
            <div className="mb-3 flex items-center justify-between gap-4 rounded-lg border-2 border-[#0D4B8E]/15 bg-[#F0F6FF] px-4 py-4 sm:px-5">
              <div className="text-right">
                <p className="mb-1 text-xs text-[#6B7280]">
                  رقم الآيبان (IBAN)
                </p>
                <p
                  dir="ltr"
                  className="text-left font-mono text-base font-extrabold text-[#003469] sm:text-lg"
                >
                  {ibanValue || "—"}
                </p>
              </div>
              <button
                onClick={handleCopyIban}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-[#D0D5DD] bg-white text-[#0D4B8E] transition hover:bg-gray-50 cursor-pointer"
                aria-label="نسخ رقم الآيبان"
              >
                {copied ? (
                  <MdCheck className="text-lg text-green-600" />
                ) : (
                  <MdOutlineContentCopy />
                )}
              </button>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoCard
                label="تاريخ الإضافة"
                value={formatDate(data.createdAt)}
                icon={MdOutlineCalendarToday}
              />
              <InfoCard
                label="رقم الحساب"
                value={accountNumberValue}
                mono
              />
            </div>

            {(data.rejectionReason || data.needsUpdateReason) && (
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-right">
                <p className="text-xs font-bold text-amber-700 mb-1">
                  آخر ملاحظة إدارية
                </p>
                <p className="text-sm text-amber-800">
                  {data.needsUpdateReason || data.rejectionReason}
                </p>
              </div>
            )}

            {/* تنبيه */}
            <div className="mb-7 flex items-start gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
              <MdShieldMoon className="mt-0.5 shrink-0 text-lg text-[#6B7280]" />
              <p className="text-right text-[13px] leading-6 text-[#6B7280]">
                هذه البيانات حساسة ويجب استخدامها فقط ضمن إجراءات مراجعة الدفعات
                داخل المنصة، يمنع مشاركة هذه المعلومات خارج النظام.
              </p>
            </div>

            {/* الأزرار — بتفتح نافذة تأكيد قبل تنفيذ القرار الفعلي */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setActionModal("edit")}
                disabled={actionLoading}
                className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#D0D5DD] bg-white px-6 text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MdOutlineEditNote className="text-lg" />
                طلب تعديل
              </button>
              <button
                onClick={() => setActionModal("approve")}
                disabled={actionLoading}
                className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#003469] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#002850] cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              >
                <MdVerifiedUser className="text-lg" />
                {actionLoading ? "جاري التنفيذ..." : "اعتماد بيانات التحويل"}
              </button>
            </div>
          </div>
        </div>

        {/* ===== اللوحة الجانبية (تظهر يمين) ===== */}
        <div className="hidden w-[300px] shrink-0 flex-col items-center justify-center bg-[#003469] p-8 text-center text-white md:flex">
          <div className="mb-[100px] flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white/10">
            <img
              src="/src/assets/title.png"
              alt="كفيلي"
              className="h-22 w-22 scale-125 translate-y-[2px] object-contain object-center"
            />
          </div>
          <h3 className="mb-2 text-xl font-extrabold">كفيلي</h3>
          <p className="text-sm leading-6 text-white/70">
            نظام إدارة الأيتام المتكامل لضمان الشفافية والاحترافية في رعاية
            الحالات.
          </p>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/80">
            <MdShieldMoon className="text-sm" />
            بيانات مشفرة وآمنة
          </div>
        </div>
      </div>

      {/* ===== نوافذ اتخاذ القرار (تظهر فوق هذا المودال) ===== */}
      {actionModal === "approve" && (
        <ApproveConfirmModal
          onCancel={() => setActionModal(null)}
          onConfirm={handleApproveConfirmed}
        />
      )}

      {actionModal === "edit" && (
        <RequestEditModal
          onCancel={() => setActionModal(null)}
          onConfirm={handleEditConfirmed}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn  { animation: fadeIn 0.2s ease-out both; }
        .animate-slideUp { animation: slideUp 0.3s ease-out both; }
      `}</style>
    </div>
  );
}

