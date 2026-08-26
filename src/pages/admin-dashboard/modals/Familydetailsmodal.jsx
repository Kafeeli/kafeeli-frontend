import { useState } from "react";
import {
  MdCalendarToday,
  MdBlock,
  MdClose,
  MdEmail,
  MdFamilyRestroom,
  MdLocationOn,
  MdOutlineEditNote,
  MdOutlineVerified,
  MdPerson,
  MdPictureAsPdf,
  MdVisibilityOff,
} from "react-icons/md";
import FamilyDecisionModal from "./Familydecisionmodal";
import { FAMILY_STATUS_ACTIONS, STATUS_MAP } from "../Familystatus";
import { mapFamilyStatus } from "../../../config/familyStatus";

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
    <div className="mb-4 flex items-center gap-2 text-[#183b56]">
      <Icon className="text-xl text-[#159c8c]" />
      <h3 className="font-bold">{children}</h3>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Icon className="text-base text-[#159c8c]" />
        <span>{label}</span>
      </div>
      <p className="break-words font-semibold text-[#183b56]">
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
  const [decisionType, setDecisionType] = useState(null);
  const normalizedStatus = mapFamilyStatus(family?.status);
  const statusInfo = STATUS_MAP[normalizedStatus] || STATUS_MAP.pending;
  const availableActions = FAMILY_STATUS_ACTIONS[normalizedStatus] || [];
  const canReview = availableActions.includes("approve");
  const canHide = availableActions.includes("hide");
  const canSuspend = availableActions.includes("suspend");

  if (!family) return null;

  const handleConfirmedDecision = async (reason) => {
    const succeeded = await onDecision?.(family, decisionType, reason);
    if (succeeded) setDecisionType(null);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
        dir="rtl"
      >
        <div className="relative flex max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <button
            type="button"
            onClick={onClose}
            disabled={actionLoading}
            className="absolute left-4 top-4 z-20 rounded-full bg-white/90 p-2 text-slate-500 shadow transition hover:bg-white hover:text-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            aria-label="إغلاق"
          >
            <MdClose className="text-2xl" />
          </button>

          <aside className="hidden w-72 shrink-0 bg-gradient-to-b from-[#123c69] to-[#0d6f71] p-7 text-white lg:flex lg:flex-col">
            <div className="mt-12 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15">
              <MdFamilyRestroom className="text-5xl" />
            </div>
            <h2 className="mt-6 text-2xl font-bold">
              {family.headOfHouseholdName || "طلب عائلة"}
            </h2>
            <p className="mt-2 text-sm text-white/75">تفاصيل بيانات العائلة</p>

            <div className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-amber-400/20 px-3 py-2 text-sm font-semibold text-amber-100">
              <span className={`h-2 w-2 rounded-full ${statusInfo.dot}`} />
              {statusInfo.label}
            </div>

            <div className="mt-auto rounded-2xl bg-white/10 p-4 text-sm leading-7 text-white/80">
              {canReview
                ? "راجع بيانات العائلة والشهادة المرفقة قبل اتخاذ القرار."
                : "تعرض هذه الصفحة بيانات العائلة وحالتها الحالية كما أعادها الخادم."}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-6 pt-16 sm:p-8 sm:pt-16">
            <div className="mb-7 lg:hidden">
              <h2 className="text-2xl font-bold text-[#183b56]">
                {family.headOfHouseholdName || "طلب عائلة"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">تفاصيل بيانات العائلة</p>
            </div>

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

            <section className="mb-8">
              <SectionTitle icon={MdFamilyRestroom}>بيانات العائلة</SectionTitle>
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoCard
                  icon={MdPerson}
                  label="رب الأسرة"
                  value={family.headOfHouseholdName}
                />
                <InfoCard icon={MdLocationOn} label="المدينة" value={family.city} />
                <InfoCard icon={MdLocationOn} label="العنوان" value={family.address} />
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

            <section className="mb-8">
              <SectionTitle icon={MdOutlineEditNote}>وصف الحالة</SectionTitle>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 leading-8 text-slate-700">
                {family.description || "لا يوجد وصف للحالة."}
              </div>
            </section>

            <section className="mb-8">
              <SectionTitle icon={MdPictureAsPdf}>شهادة وفاة الأب</SectionTitle>
              {family.hasFatherDeathCertificate ? (
                <div className="flex flex-col gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-white p-3 text-2xl text-[#159c8c] shadow-sm">
                      <MdPictureAsPdf />
                    </div>
                    <div>
                      <p className="font-bold text-[#183b56]">
                        {family.fatherDeathCertificateFileName || "شهادة وفاة الأب"}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        يتم فتح الملف عبر جلسة المستخدم الموثقة.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onViewCertificate?.(family)}
                    disabled={certificateLoading}
                    className="rounded-xl bg-[#159c8c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#128577] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {certificateLoading ? "جارٍ تحميل الشهادة..." : "عرض الشهادة"}
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                  لا توجد شهادة وفاة مرفوعة لهذا الطلب.
                </div>
              )}
            </section>

            {actionError && (
              <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {actionError}
              </div>
            )}

            {actionSuccess && (
              <div className="mb-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                {actionSuccess}
              </div>
            )}

            {availableActions.length > 0 && (
              <section className="border-t border-slate-100 pt-6">
                <h3 className="mb-4 font-bold text-[#183b56]">إجراءات الحالة</h3>
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  {canReview && (
                    <>
                      <button
                        type="button"
                        onClick={() => setDecisionType("needsUpdate")}
                        disabled={actionLoading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-6 py-3 font-bold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <MdOutlineEditNote className="text-xl" />
                        طلب تحديث البيانات
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecisionType("approve")}
                        disabled={actionLoading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#159c8c] px-7 py-3 font-bold text-white transition hover:bg-[#128577] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <MdOutlineVerified className="text-xl" />
                        اعتماد العائلة
                      </button>
                    </>
                  )}
                  {canSuspend && (
                    <button
                      type="button"
                      onClick={() => setDecisionType("suspend")}
                      disabled={actionLoading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <MdBlock className="text-xl" />
                      تعليق العائلة
                    </button>
                  )}
                  {canHide && (
                    <button
                      type="button"
                      onClick={() => setDecisionType("hide")}
                      disabled={actionLoading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <MdVisibilityOff className="text-xl" />
                      إخفاء العائلة
                    </button>
                  )}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {decisionType && (
        <FamilyDecisionModal
          type={decisionType}
          family={family}
          onCancel={() => setDecisionType(null)}
          onConfirm={handleConfirmedDecision}
          loading={actionLoading}
          serverError={actionError}
        />
      )}
    </>
  );
}
