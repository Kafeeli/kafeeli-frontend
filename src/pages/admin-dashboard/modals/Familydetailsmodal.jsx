import { useState } from "react";
import {
  MdCalendarToday,
  MdClose,
  MdEmail,
  MdFamilyRestroom,
  MdLocationOn,
  MdOutlineEditNote,
  MdPerson,
  MdPictureAsPdf,
} from "react-icons/md";
import { STATUS_MAP } from "../Familystatus";
import { mapFamilyStatus } from "../../../config/familyStatus";

const FAMILY_STATUS_OPTIONS = [
  { value: "PendingReview", label: "قيد المراجعة" },
  { value: "NeedsUpdate", label: "يحتاج تحديث" },
  { value: "Active", label: "نشطة" },
  { value: "Hidden", label: "مخفية" },
  { value: "Suspended", label: "معلّقة" },
];

const BACKEND_STATUS_BY_NORMALIZED_STATUS = {
  pending: "PendingReview",
  needsEdit: "NeedsUpdate",
  active: "Active",
  hidden: "Hidden",
  stopped: "Suspended",
};

const formatDate = (value) => {
  if (!value) return "غير متوفر";

  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
};

const formatAmount = (value) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return "غير متوفر";

  return `${new Intl.NumberFormat("ar-EG").format(amount)} ₪`;
};

function SectionTitle({ icon: Icon, children }) {
  return (
    <div className="mb-4 flex items-center gap-2 text-[#0D4B8E]">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2DBCC3]/10">
        <Icon className="text-xl text-[#159C8C]" />
      </div>

      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition duration-200 hover:border-[#2DBCC3]/30 hover:shadow-md">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2DBCC3]/10">
          <Icon className="text-base text-[#159C8C]" />
        </div>

        <span>{label}</span>
      </div>

      <p className="break-words font-semibold leading-7 text-[#183B56]">
        {value || "غير متوفر"}
      </p>
    </div>
  );
}

export default function FamilyDetailsModal({
  family,
  onClose,
  onDecision,
  actionLoading = false,
  actionError = "",
  actionSuccess = "",
  onViewCertificate,
  certificateLoading = false,
}) {
  const normalizedStatus = mapFamilyStatus(family?.status);
  const statusInfo = STATUS_MAP[normalizedStatus] || STATUS_MAP.pending;

  const [targetStatus, setTargetStatus] = useState(
    () =>
      BACKEND_STATUS_BY_NORMALIZED_STATUS[normalizedStatus] || "PendingReview",
  );

  const [reason, setReason] = useState("");
  const [validationError, setValidationError] = useState("");

  if (!family) return null;

  const handleStatusSubmit = async (event) => {
    event.preventDefault();

    if (actionLoading) return;

    const trimmedReason = reason.trim();

    if (targetStatus === "NeedsUpdate" && !trimmedReason) {
      setValidationError("يرجى كتابة سبب طلب التحديث.");
      return;
    }

    setValidationError("");

    const succeeded = await onDecision?.(
      family,
      targetStatus,
      targetStatus === "NeedsUpdate" ? trimmedReason : null,
    );

    if (succeeded && targetStatus !== "NeedsUpdate") {
      setReason("");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#071A2B]/70 p-4 backdrop-blur-sm"
        dir="rtl"
      >
        {/* Modal */}
        <div className="relative flex max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/20 bg-white shadow-[0_25px_70px_rgba(13,75,142,0.25)]">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            disabled={actionLoading}
            className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-md ring-1 ring-slate-100 transition-all duration-200 hover:scale-105 hover:bg-slate-50 hover:text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="إغلاق"
          >
            <MdClose className="text-2xl" />
          </button>

          {/* =========================
              Right Side - Family Info
          ========================== */}
          <aside className="hidden w-72 shrink-0 bg-gradient-to-b from-[#0D4B8E] via-[#0D4B8E] to-[#159C8C] p-7 text-white lg:flex lg:flex-col lg:items-center lg:justify-center lg:text-center">
            {/* Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 ring-1 ring-white/20 shadow-lg">
              <MdFamilyRestroom className="text-5xl text-white" />
            </div>

            {/* Family Name */}
            <h2 className="mt-6 text-2xl font-bold leading-relaxed">
              {family.headOfHouseholdName || "طلب عائلة"}
            </h2>

            <p className="mt-2 text-sm leading-7 text-white/75">
              تفاصيل بيانات العائلة
            </p>

            {/* Status */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#D9A441]/20 px-4 py-2 text-sm font-bold text-[#F5D98B] ring-1 ring-[#D9A441]/20">
              <span className={`h-2.5 w-2.5 rounded-full ${statusInfo.dot}`} />

              {statusInfo.label}
            </div>

            {/* Info Box */}
            <div className="mt-8 max-w-[220px] rounded-2xl border border-white/10 bg-white/10 p-4 text-center text-sm leading-7 text-white/75 shadow-lg backdrop-blur-sm">
              اختر حالة العائلة المطلوبة، وسيعرض النظام الحالة التي يعيدها
              الخادم بعد الحفظ.
            </div>
          </aside>

          {/* =========================
              Main Content
          ========================== */}
          <main className="flex-1 overflow-y-auto bg-[#F8F9FA] p-6 pt-16 sm:p-8 sm:pt-16">
            {/* Mobile Header */}
            <div className="mb-7 lg:hidden">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0D4B8E] text-white shadow-sm">
                <MdFamilyRestroom className="text-2xl" />
              </div>

              <h2 className="text-2xl font-bold text-[#183B56]">
                {family.headOfHouseholdName || "طلب عائلة"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                تفاصيل بيانات العائلة
              </p>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#D9A441]/10 px-3 py-1.5 text-sm font-bold text-[#9A751F]">
                <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`} />

                {statusInfo.label}
              </div>
            </div>

            {/* =========================
                Guardian Information
            ========================== */}
            <section className="mb-8">
              <SectionTitle icon={MdPerson}>بيانات ولي الأمر</SectionTitle>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={MdPerson}
                  label="اسم ولي الأمر"
                  value={family.guardianFullName}
                />

                <InfoCard
                  icon={MdEmail}
                  label="البريد الإلكتروني"
                  value={family.guardianEmail}
                />
              </div>
            </section>

            {/* =========================
                Family Information
            ========================== */}
            <section className="mb-8">
              <SectionTitle icon={MdFamilyRestroom}>
                بيانات العائلة
              </SectionTitle>

              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={MdPerson}
                  label="رب الأسرة"
                  value={family.headOfHouseholdName}
                />

                <InfoCard
                  icon={MdLocationOn}
                  label="المدينة"
                  value={family.city}
                />

                <InfoCard
                  icon={MdLocationOn}
                  label="العنوان"
                  value={family.address}
                />

                <InfoCard
                  icon={MdFamilyRestroom}
                  label="الاحتياج الشهري"
                  value={formatAmount(family.monthlyNeedAmount)}
                />

                <InfoCard
                  icon={MdCalendarToday}
                  label="تاريخ تقديم الطلب"
                  value={formatDate(family.createdAt)}
                />
              </div>
            </section>

            {/* =========================
                Description
            ========================== */}
            <section className="mb-8">
              <SectionTitle icon={MdOutlineEditNote}>وصف الحالة</SectionTitle>

              <div className="rounded-2xl border border-slate-100 bg-white p-5 leading-8 text-slate-700 shadow-sm">
                {family.description || "لا يوجد وصف للحالة."}
              </div>
            </section>

            {/* =========================
                Death Certificate
            ========================== */}
            <section className="mb-8">
              <SectionTitle icon={MdPictureAsPdf}>شهادة وفاة الأب</SectionTitle>

              {family.hasFatherDeathCertificate ? (
                <div className="flex flex-col gap-4 rounded-2xl border border-[#2DBCC3]/20 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2DBCC3]/10 text-2xl text-[#159C8C]">
                      <MdPictureAsPdf />
                    </div>

                    <div className="min-w-0">
                      <p className="break-words font-bold text-[#183B56]">
                        {family.fatherDeathCertificateFileName ||
                          "شهادة وفاة الأب"}
                      </p>

                      <p className="mt-1 text-xs leading-6 text-slate-500">
                        يتم فتح الملف عبر جلسة المستخدم الموثقة.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewCertificate?.(family)}
                    disabled={certificateLoading}
                    className="shrink-0 rounded-xl bg-[#159C8C] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#128577] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {certificateLoading
                      ? "جارٍ تحميل الشهادة..."
                      : "عرض الشهادة"}
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-5 text-sm text-slate-500 shadow-sm">
                  لا توجد شهادة وفاة مرفوعة لهذا الطلب.
                </div>
              )}
            </section>

            {/* =========================
                Error Message
            ========================== */}
            {actionError && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold leading-7 text-red-700">
                {actionError}
              </div>
            )}

            {/* =========================
                Success Message
            ========================== */}
            {actionSuccess && (
              <div className="mb-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold leading-7 text-emerald-700">
                {actionSuccess}
              </div>
            )}

            {/* =========================
                Status Management
            ========================== */}
            <section className="border-t border-slate-200 pt-6">
              <div className="mb-4">
                <h3 className="font-bold text-[#0D4B8E]">إدارة حالة العائلة</h3>

                <p className="mt-1 text-xs text-slate-500">
                  اختر الحالة المناسبة ثم احفظ التغيير.
                </p>
              </div>

              <form
                onSubmit={handleStatusSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                {/* Status Select */}
                <label
                  htmlFor="family-status"
                  className="mb-2 block text-sm font-bold text-[#183B56]"
                >
                  الحالة المطلوبة
                </label>

                <select
                  id="family-status"
                  value={targetStatus}
                  onChange={(event) => {
                    setTargetStatus(event.target.value);
                    setValidationError("");
                  }}
                  disabled={actionLoading}
                  className="w-full cursor-pointer rounded-xl border border-slate-200 bg-[#F8F9FA] px-4 py-3 text-sm font-bold text-[#183B56] outline-none transition-all focus:border-[#2DBCC3] focus:bg-white focus:ring-2 focus:ring-[#2DBCC3]/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {FAMILY_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Update Reason */}
                {targetStatus === "NeedsUpdate" && (
                  <div className="mt-4">
                    <label
                      htmlFor="family-status-reason"
                      className="mb-2 block text-sm font-bold text-[#183B56]"
                    >
                      سبب طلب التحديث
                    </label>

                    <textarea
                      id="family-status-reason"
                      value={reason}
                      onChange={(event) => {
                        setReason(event.target.value);
                        setValidationError("");
                      }}
                      maxLength={500}
                      rows={4}
                      disabled={actionLoading}
                      placeholder="اكتب البيانات أو المستندات التي تحتاج إلى تحديث."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-[#F8F9FA] p-3 text-sm leading-7 text-[#183B56] outline-none transition-all placeholder:text-slate-400 focus:border-[#2DBCC3] focus:bg-white focus:ring-2 focus:ring-[#2DBCC3]/20 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <p className="mt-1 text-left text-xs text-slate-500">
                      {reason.length}/٥٠٠
                    </p>
                  </div>
                )}

                {/* Validation Error */}
                {validationError && (
                  <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold leading-6 text-red-600">
                    {validationError}
                  </p>
                )}

                {/* Submit */}
                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl bg-[#0D4B8E] px-6 py-3 font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0A3D75] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <MdOutlineEditNote className="text-xl" />

                    {actionLoading ? "جارٍ حفظ الحالة..." : "حفظ الحالة"}
                  </button>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
