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

  const [showReasonBox, setShowReasonBox] = useState(false);
  const [reason, setReason] = useState("");
  const [validationError, setValidationError] = useState("");

  if (!family) return null;

  const updateReasonText =
    family.needsUpdateReason ||
    family.reason ||
    family.rejectionReason ||
    family.reviewReason ||
    "";

  const handleActionClick = async (targetStatus, needReason = false) => {
    if (actionLoading) return;

    if (needReason) {
      if (!showReasonBox) {
        setShowReasonBox(true);
        setValidationError("");
        return;
      }

      const trimmedReason = reason.trim();
      if (!trimmedReason) {
        setValidationError("يرجى كتابة سبب طلب التحديث.");
        return;
      }
      setValidationError("");

      const succeeded = await onDecision?.(family, targetStatus, trimmedReason);
      if (succeeded) {
        setReason("");
        setShowReasonBox(false);
      }
      return;
    }

    setValidationError("");
    await onDecision?.(family, targetStatus, null);
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
              راجع بيانات العائلة وشهادة الوفاة، ثم اتخذ القرار المناسب.
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
                Status Management Section
            ========================== */}
            <section className="border-t border-slate-200 pt-6">
              <div className="mb-4">
                <h3 className="font-bold text-[#0D4B8E]">إجراء الإدارة على العائلة</h3>
                <p className="mt-1 text-xs text-slate-500">
                  اتخذ الإجراء المناسب بناءً على حالة الطلب الحالية.
                </p>
              </div>

              {/* Status: NeedsUpdate (تحتاج تعديل) */}
              {normalizedStatus === "needsEdit" && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-5 shadow-sm">
                  <h4 className="font-bold text-amber-900">سبب طلب التعديل الحالي:</h4>
                  <p className="mt-2 rounded-xl bg-white p-3 text-sm text-amber-950 border border-amber-200">
                    {updateReasonText || "تم طلب تعديل بيانات العائلة من قبل الإدارة."}
                  </p>
                  <p className="mt-3 text-xs leading-6 text-amber-800 font-medium">
                    ⚠️ هذه العائلة بانتظار تعديل الوصي للبيانات أو الشهادة وإعادة الإرسال. ستعود تلقائيًا إلى حالة <strong>"قيد المراجعة"</strong> بعد الإرسال لتتمكن الإدارة من اعتمادها أو طلب تعديل مجددًا.
                  </p>
                </div>
              )}

              {/* Status: PendingReview (قيد المراجعة) */}
              {normalizedStatus === "pending" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleActionClick("Active", false)}
                      className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
                    >
                      {actionLoading ? "جارٍ الاعتماد..." : "اعتماد العائلة"}
                    </button>

                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => setShowReasonBox(!showReasonBox)}
                      className="rounded-xl bg-amber-600 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-amber-700 disabled:opacity-60 cursor-pointer"
                    >
                      طلب تعديل
                    </button>
                  </div>

                  {showReasonBox && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <label htmlFor="reason-input" className="block text-sm font-bold text-[#183B56] mb-2">
                        سبب طلب التعديل (إجباري):
                      </label>
                      <textarea
                        id="reason-input"
                        value={reason}
                        onChange={(e) => {
                          setReason(e.target.value);
                          setValidationError("");
                        }}
                        rows={3}
                        placeholder="اكتب سبب طلب التعديل ليظهر للوصي..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-[#F8F9FA] p-3 text-sm outline-none focus:border-[#2DBCC3]"
                      />
                      {validationError && (
                        <p className="mt-2 text-xs font-bold text-red-600">{validationError}</p>
                      )}
                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => handleActionClick("NeedsUpdate", true)}
                          className="rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-800 disabled:opacity-60 cursor-pointer"
                        >
                          إرسال طلب التعديل
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Status: Active (نشطة ومعتمدة) */}
              {normalizedStatus === "active" && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleActionClick("Hidden", false)}
                      className="rounded-xl bg-slate-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-slate-700 disabled:opacity-60 cursor-pointer"
                    >
                      إخفاء العائلة
                    </button>

                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleActionClick("Suspended", false)}
                      className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-red-700 disabled:opacity-60 cursor-pointer"
                    >
                      تعليق العائلة
                    </button>

                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => setShowReasonBox(!showReasonBox)}
                      className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-700 disabled:opacity-60 cursor-pointer"
                    >
                      طلب تعديل
                    </button>
                  </div>

                  {showReasonBox && (
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <label htmlFor="reason-input-active" className="block text-sm font-bold text-[#183B56] mb-2">
                        سبب طلب التعديل (إجباري):
                      </label>
                      <textarea
                        id="reason-input-active"
                        value={reason}
                        onChange={(e) => {
                          setReason(e.target.value);
                          setValidationError("");
                        }}
                        rows={3}
                        placeholder="اكتب سبب طلب التعديل ليظهر للوصي..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-[#F8F9FA] p-3 text-sm outline-none focus:border-[#2DBCC3]"
                      />
                      {validationError && (
                        <p className="mt-2 text-xs font-bold text-red-600">{validationError}</p>
                      )}
                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          disabled={actionLoading}
                          onClick={() => handleActionClick("NeedsUpdate", true)}
                          className="rounded-xl bg-amber-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-800 disabled:opacity-60 cursor-pointer"
                        >
                          إرسال طلب التعديل
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Status: Hidden (مخفية) or Suspended (معلقة / موقوفة) */}
              {(normalizedStatus === "hidden" || normalizedStatus === "stopped") && (
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-600">
                      هذه العائلة {normalizedStatus === "hidden" ? "مخفية حاليًا" : "معلقة حاليًا"}.
                    </p>
                    <button
                      type="button"
                      disabled={actionLoading}
                      onClick={() => handleActionClick("Active", false)}
                      className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60 cursor-pointer"
                    >
                      {actionLoading ? "جارٍ التفعيل..." : "إعادة التفعيل"}
                    </button>
                  </div>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
