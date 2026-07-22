import { useState } from "react";
import {
  MdClose,
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineCalendarToday,
  MdOutlineFamilyRestroom,
  MdOutlineVerified,
  MdOutlineCancel,
  MdPauseCircleOutline,
  MdOutlineVisibilityOff,
  MdShieldMoon,
  MdOutlineWarningAmber,
} from "react-icons/md";
import FamilyDecisionModal from "./Familydecisionmodal";
import { STATUS_MAP } from "../Familystatus";

function InfoCard({ label, value, icon: Icon, mono = false }) {
  return (
    <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-right">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-[#6B7280]">{label}</span>
        {Icon && <Icon className="text-lg text-[#0D4B8E]" />}
      </div>
      <p
        dir={mono ? "ltr" : "rtl"}
        className={`break-words text-sm font-bold text-[#111827] ${mono ? "text-left font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <h3 dir="rtl" className="mb-3 flex items-center justify-start gap-2 text-[15px] font-extrabold text-[#003469]">
      <Icon className="text-lg" />
      {children}
    </h3>
  );
}

export default function FamilyDetailsModal({ family, onClose, onDecision }) {
  const [decisionType, setDecisionType] = useState(null);

  if (!family) return null;

  const statusInfo = STATUS_MAP[family.status];

  const handleConfirmed = (reason) => {
    setDecisionType(null);
    onDecision?.(family, decisionType, reason);
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

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${statusInfo.className}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {statusInfo.label}
            </span>
          </div>

          <h2
            dir="rtl"
            className="text-right text-2xl font-extrabold text-[#003469]"
          >
            تفاصيل طلب العائلة
          </h2>
          <p dir="rtl" className="mb-7 text-right text-sm text-[#9CA3AF]">
            {family.familyNumber}
          </p>

          <div dir="rtl">
            {/* معلومات ولي الأمر */}
            <SectionTitle icon={MdOutlinePerson}>
              معلومات ولي الأمر
            </SectionTitle>
            <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <InfoCard
                label="الاسم الكامل"
                value={family.headName}
                icon={MdOutlinePerson}
              />
              <InfoCard
                label="البريد الإلكتروني"
                value={family.email}
                icon={MdOutlineEmail}
                mono
              />
              <InfoCard
                label="رقم الهاتف"
                value={family.phone}
                icon={MdOutlinePhone}
                mono
              />
            </div>

            {/* بيانات العائلة */}
            <SectionTitle icon={MdOutlineFamilyRestroom}>
              بيانات العائلة
            </SectionTitle>
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <InfoCard
                label="عدد الأيتام"
                value={`${family.orphansCount} أيتام`}
                icon={MdOutlineFamilyRestroom}
              />
              <InfoCard
                label="المدينة"
                value={family.city}
                icon={MdOutlineLocationOn}
              />
              <InfoCard
                label="تاريخ الإضافة"
                value={family.addedDate}
                icon={MdOutlineCalendarToday}
              />
              <InfoCard
                label="حالة الوثائق"
                value={family.docsStatus}
                icon={MdOutlinePerson}
              />
            </div>

            {/* سبب الرفض (لو الحالة مرفوضة) */}
            {family.status === "rejected" && family.rejectionReason && (
              <div className="mb-7 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                <MdOutlineWarningAmber className="mt-0.5 shrink-0 text-lg text-red-600" />
                <div className="text-right">
                  <p className="text-sm font-bold text-red-700">سبب الرفض</p>
                  <p className="mt-1 text-[13px] leading-6 text-red-600">
                    {family.rejectionReason}
                  </p>
                </div>
              </div>
            )}

            {/* تنبيه */}
            <div className="mb-7 flex items-start gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
              <MdShieldMoon className="mt-0.5 shrink-0 text-lg text-[#6B7280]" />
              <p className="text-right text-[13px] leading-6 text-[#6B7280]">
                القرارات المتخذة هنا تؤثر مباشرة على ظهور العائلة للكفلاء، يرجى
                مراجعة البيانات بدقة قبل اتخاذ أي إجراء.
              </p>
            </div>

            {/* الأزرار — حسب حالة الطلب الحالية */}
            {family.status === "pending" && (
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setDecisionType("reject")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-red-200 bg-white px-6 text-sm font-bold text-red-600 transition hover:bg-red-50 cursor-pointer"
                >
                  <MdOutlineCancel className="text-lg" />
                  رفض الطلب
                </button>
                <button
                  onClick={() => setDecisionType("approve")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#003469] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#002850] cursor-pointer"
                >
                  <MdOutlineVerified className="text-lg" />
                  قبول الطلب
                </button>
              </div>
            )}

            {family.status === "active" && (
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setDecisionType("hide")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md border border-[#D0D5DD] bg-white px-6 text-sm font-bold text-[#111827] transition hover:bg-gray-50 cursor-pointer"
                >
                  <MdOutlineVisibilityOff className="text-lg" />
                  إخفاء العائلة
                </button>
                <button
                  onClick={() => setDecisionType("suspend")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md bg-amber-600 px-6 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700 cursor-pointer"
                >
                  <MdPauseCircleOutline className="text-lg" />
                  إيقاف مؤقت
                </button>
              </div>
            )}

            {(family.status === "suspended" ||
              family.status === "hidden" ||
              family.status === "rejected") && (
              <div className="flex justify-end">
                <button
                  onClick={() => setDecisionType("approve")}
                  className="flex h-11 items-center justify-center gap-2 rounded-md bg-[#003469] px-6 text-sm font-bold text-white shadow-sm transition hover:bg-[#002850] cursor-pointer"
                >
                  <MdOutlineVerified className="text-lg" />
                  إعادة التفعيل
                </button>
              </div>
            )}
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

      {decisionType && (
        <FamilyDecisionModal
          type={decisionType}
          onCancel={() => setDecisionType(null)}
          onConfirm={handleConfirmed}
        />
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .animate-fadeIn  { animation: fadeIn 0.2s ease-out both; }
        .animate-slideUp { animation: slideUp 0.3s ease-out both; }
      `}</style>
    </div>
  );
}
