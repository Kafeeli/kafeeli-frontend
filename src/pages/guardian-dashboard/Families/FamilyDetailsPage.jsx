import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useFamily } from "../../../hooks/useFamily";
import { familyApi } from "../../../services/familyApi";
import { orphanApi } from "../../../services/orphanApi";
import { unwrapResult } from "../../../utils/apiUi";
import { FAMILY_STATUS_CONFIG } from "../../../config/familyStatus";
import AuthenticatedHeader from "../../../components/layout/AuthenticatedHeader";
import AuthenticatedFooter from "../../../components/layout/AuthenticatedFooter";
import { localizeStatus } from "../../../utils/localization";
import { formatArabicDateTime } from "../../../utils/date";

import {
  MdPerson,
  MdKeyboardArrowLeft,
  MdInfoOutline,
  MdVerifiedUser,
  MdPictureAsPdf,
  MdFamilyRestroom,
  MdOutlineRemoveRedEye,
  MdEdit,
  MdPersonAdd,
} from "react-icons/md";

/* ========================================================================== */
/* 🧩 مكونات مشتركة (نفسها حرفيًا بكل الحالات الخمسة الأصلية)                */
/* ========================================================================== */
function TopNavbar({ setOpenSidebar }) {
  return <AuthenticatedHeader onMenuClick={() => setOpenSidebar(true)} />;
  /* return (
    <header className="min-h-[52px] bg-white border-b border-[#DDE2EA] shadow-sm flex items-center justify-between gap-3 px-4 py-2 sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setOpenSidebar(true)}
          className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#003469] hover:bg-gray-100 transition shrink-0"
          aria-label="فتح القائمة"
        >
          <MdMenu className="text-2xl" />
        </button>

        <h1 className="font-[Cairo] text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-[#003469] truncate">
          عائلاتي
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          disabled
          title="التنبيهات غير متاحة حالياً"
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#003469] opacity-60 cursor-not-allowed"
        >
          <MdNotificationsNone className="text-[18px] sm:text-[20px]" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="font-[Cairo] text-[13px] lg:text-[14px] font-bold text-[#003469]">
              حساب الوصي
            </p>
            <p className="font-[Cairo] text-[10px] lg:text-[11px] text-gray-500">
              وصي
            </p>
          </div>

          <div className="w-9 h-9 rounded-full border border-[#C2C6D2] bg-gray-100 overflow-hidden flex items-center justify-center">
            <MdPerson className="text-gray-500 text-xl" />
          </div>
        </div>
      </div>
    </header>
  ); */
}

function Breadcrumb() {
  return (
    <div className="flex items-center justify-start gap-1 font-[Cairo] text-[12px] sm:text-[13px]">
      <span className="text-[#6B7280]">لوحة التحكم</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#6B7280]">العائلات</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#003469] font-bold">بيانات العائلة</span>
    </div>
  );
}

function PageHeader({ family, config, showEditButton, onEditClick }) {
  return (
    <section className="mt-3 text-right">
      <h2 className="font-[Cairo] text-[25px] sm:text-[34px] lg:text-[39px] font-bold text-[#111827] leading-tight">
        {family.title}
      </h2>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-[Cairo] text-[12px] font-bold ${config.badgeClass}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {config.badgeLabel}
        </span>

        {showEditButton && (
          <button
            type="button"
            onClick={onEditClick}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D0D5DD] bg-white px-3.5 py-1.5 font-[Cairo] text-[12px] font-bold text-[#003469] hover:bg-[#F5F8FB] transition"
          >
            <MdEdit className="text-[14px]" />
            تعديل البيانات
          </button>
        )}
      </div>
    </section>
  );
}

function StatusAlert({ config }) {
  const Icon = config.banner.icon;
  return (
    <div
      className={`mt-7 rounded-[9px] ${config.banner.bgClass} border-r-[5px] ${config.banner.borderClass} px-5 py-4 flex items-center gap-4`}
    >
      <div
        className={`w-[44px] h-[44px] rounded-full ${config.banner.iconWrapClass} flex items-center justify-center shrink-0`}
      >
        <Icon className={`${config.banner.iconClass} text-[24px]`} />
      </div>

      <div className="text-right">
        <p className={`font-[Cairo] text-[18px] font-bold ${config.banner.titleClass}`}>
          {config.banner.title}
        </p>

        <p className={`mt-1 font-[Cairo] text-[12px] sm:text-[13px] leading-6 ${config.banner.descClass}`}>
          {config.banner.description}
        </p>
      </div>
    </div>
  );
}

function InfoItem({ label, value, highlight }) {
  return (
    <div className="text-right">
      <p className="font-[Cairo] text-[12px] text-[#6B7280]">{label}</p>
      <p
        className={`mt-2 font-[Cairo] text-[14px] sm:text-[15px] font-bold leading-7 ${
          highlight ? "text-[#003469]" : "text-[#111827]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function FamilyInfoCard({ family }) {
  return (
    <section className="bg-white border border-[#C9D2E3] rounded-[12px] px-6 py-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-[Cairo] text-[16px] font-bold text-[#374151]">
          المعلومات العامة
        </h3>

        <span className="w-[30px] h-[30px] rounded-full bg-[#EAF2FF] flex items-center justify-center shrink-0">
          <MdInfoOutline className="text-[#003469] text-[20px]" />
        </span>
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6">
        <InfoItem label="اسم رب الأسرة" value={family.headOfHouseholdName} />
        <InfoItem label="المدينة والمنطقة" value={family.city} />
        <InfoItem label="العنوان التفصيلي" value={family.address} />
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 border-b border-[#D8DEE9] pb-6">
        <InfoItem label="الاحتياج الشهري المقدر" value={family.monthlyNeedAmount + " ILS"} highlight />
        <InfoItem label="تاريخ الإنشاء" value={formatArabicDateTime(family.createdAt)} />
        <InfoItem label="آخر تحديث" value={formatArabicDateTime(family.updatedAt)} />
      </div>

      <div className="mt-7">
        <p className="font-[Cairo] text-[12px] text-[#6B7280] mb-3">وصف الحالة</p>

        <div className="rounded-[10px] bg-[#F7F8FC] px-6 py-5">
          <p className="font-[Cairo] text-[14px] sm:text-[15px] leading-9 text-[#6B7280]">
            {family.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function DocumentsCard({
  documents,
  onViewCertificate,
  certificateLoading,
  certificateError,
}) {
  return (
    <section className="bg-white border border-[#C9D2E3] rounded-[14px] px-5 py-6 shadow-sm h-full min-h-[360px]">
      <div className="flex items-center gap-2">
        <span className="w-[30px] h-[30px] rounded-full bg-[#EAF2FF] flex items-center justify-center shrink-0">
          <MdVerifiedUser className="text-[#003469] text-[20px]" />
        </span>

        <h3 className="font-[Cairo] text-[16px] font-bold text-[#374151] whitespace-nowrap">
          إثبات حالة العائلة
        </h3>
      </div>

      <div className="mt-8 max-w-[280px] mx-auto">
        {documents.length === 0 ? (
          <p className="py-12 text-center font-[Cairo] text-sm text-[#6B7280]">
            لا توجد مستندات متاحة.
          </p>
        ) : documents.map((doc) => (
          <div
            key={doc.name}
            className="rounded-[12px] border border-[#CBD5E1] bg-[#FAFBFD] px-4 py-4 shadow-[0_1px_2px_rgba(16,24,40,0.03)]"
          >
            <div className="flex items-start gap-3">
              <div className="w-[38px] h-[38px] rounded-[8px] bg-[#FEE2E2] flex items-center justify-center shrink-0">
                <MdPictureAsPdf className="text-[#D11F1F] text-[22px]" />
              </div>

              <div className="min-w-0 flex-1 text-right">
                <p className="font-[Cairo] text-[13px] font-bold text-[#111827] truncate">
                  {doc.name}
                </p>

                <p className="mt-1 font-[Cairo] text-[10px] text-[#6B7280] whitespace-nowrap">
                  {doc.type || "ملف مرفوع"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onViewCertificate}
              disabled={certificateLoading}
              className="mt-4 w-full h-[42px] rounded-[8px] bg-[#DCE8FF] text-[#003469] font-[Cairo] text-[14px] font-bold hover:bg-[#C9DCFF] transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {certificateLoading ? "جارٍ فتح المستند..." : "عرض المستند"}
            </button>
            {certificateError && (
              <p className="mt-2 text-center font-[Cairo] text-xs text-red-600">
                {certificateError}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function OrphanCard({ orphan, onView }) {
  return (
    <article className="h-full bg-white border border-[#C9D2E3] rounded-[14px] px-6 py-5 shadow-sm hover:shadow-md transition flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex items-center rounded-full bg-[#D9F7F1] px-3 py-1.5 font-[Cairo] text-[11px] font-bold text-[#008C78] whitespace-nowrap">
          {localizeStatus(orphan.status)}
        </span>

        <div
          className={`w-[68px] h-[68px] rounded-[14px] ${orphan.avatarBg} border border-[#D8E0EA] flex items-center justify-center shrink-0 overflow-hidden shadow-sm`}
        >
          <MdPerson className="text-[#003469] text-[44px]" />
        </div>
      </div>

      <div className="mt-6 text-right">
        <h4 className="font-[Cairo] text-[18px] font-bold text-[#111827] leading-7">
          {orphan.name}
        </h4>

        <p className="mt-1 font-[Cairo] text-[13px] text-[#6B7280] leading-6">
          {orphan.relation}
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 rounded-[10px] border border-[#EEF1F5] overflow-hidden text-right">
        <div className="px-4 py-3 border-l border-b border-[#EEF1F5]">
          <p className="font-[Cairo] text-[11px] text-[#6B7280]">العمر</p>
          <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#111827]">
            {orphan.age}
          </p>
        </div>

        <div className="px-4 py-3 border-b border-[#EEF1F5]">
          <p className="font-[Cairo] text-[11px] text-[#6B7280]">الجنس</p>
          <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#111827]">
            {orphan.gender}
          </p>
        </div>

        <div className="px-4 py-3 border-l border-[#EEF1F5]">
          <p className="font-[Cairo] text-[11px] text-[#6B7280]">المستوى التعليمي</p>
          <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#111827]">
            {orphan.education}
          </p>
        </div>

        <div className="px-4 py-3">
          <p className="font-[Cairo] text-[11px] text-[#6B7280]">رقم الهوية</p>
          <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#111827]">
            {orphan.idNumber}
          </p>
        </div>
      </div>

      <div className="mt-auto pt-5">
        <button
          type="button"
          onClick={onView}
          className="w-full h-[48px] rounded-[10px] bg-[#DCE8FF] text-[#003469] font-[Cairo] text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-[#C9DCFF] transition"
        >
          <MdOutlineRemoveRedEye className="text-[20px]" />
          عرض تفاصيل اليتيم
        </button>
      </div>
    </article>
  );
}

/* ========================================================================== */
/* 📄 الصفحة الموحدة — بتاخد status وبتغيّر شكلها تلقائيًا                    */
/* ========================================================================== */
function FamilyDetailsPage({
  // props اختيارية للاستخدام المباشر/الاختبار؛ إذا انبعتوا بيتجاوزوا بيانات الـ API
  status: statusProp,
  family: familyProp,
  documents: documentsProp,
  orphans: orphansProp,
  onEditClick,
  onAddOrphanClick,
}) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [certificateError, setCertificateError] = useState("");
  const [ownedOrphans, setOwnedOrphans] = useState([]);
  const certificateUrlRef = useRef(null);
  const certificateRevokeTimerRef = useRef(null);
  const { familyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { family: fetchedFamily, loading, error } = useFamily(familyId);

  useEffect(() => {
    if (orphansProp) return undefined;
    let active = true;
    orphanApi.getMine().then((result) => {
      const data = unwrapResult(result, "تعذر تحميل الأيتام.");
      if (active) setOwnedOrphans((data?.orphans || []).filter((orphan) => orphan.familyId === familyId));
    }).catch(() => {
      if (active) setOwnedOrphans([]);
    });
    return () => { active = false; };
  }, [familyId, orphansProp]);

  useEffect(() => {
    return () => {
      if (certificateRevokeTimerRef.current) {
        clearTimeout(certificateRevokeTimerRef.current);
      }
      if (certificateUrlRef.current) {
        URL.revokeObjectURL(certificateUrlRef.current);
      }
    };
  }, []);

  const handleViewCertificate = async () => {
    if (certificateLoading) return;

    const previewWindow = window.open("about:blank", "_blank");
    if (!previewWindow) {
      setCertificateError("تعذر فتح نافذة عرض المستند. يرجى السماح بالنوافذ المنبثقة.");
      return;
    }
    previewWindow.opener = null;

    setCertificateLoading(true);
    setCertificateError("");
    try {
      const blob = await familyApi.getFatherDeathCertificate(familyId);

      if (certificateUrlRef.current) {
        URL.revokeObjectURL(certificateUrlRef.current);
      }
      if (certificateRevokeTimerRef.current) {
        clearTimeout(certificateRevokeTimerRef.current);
      }

      const objectUrl = URL.createObjectURL(blob);
      certificateUrlRef.current = objectUrl;
      previewWindow.location.replace(objectUrl);

      certificateRevokeTimerRef.current = setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
        if (certificateUrlRef.current === objectUrl) {
          certificateUrlRef.current = null;
        }
      }, 60000);
    } catch {
      previewWindow.close();
      setCertificateError("تعذر فتح شهادة الوفاة، حاول مجددًا.");
    } finally {
      setCertificateLoading(false);
    }
  };

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo] flex items-center justify-center">
        <p className="text-[#003469] font-bold">جارٍ تحميل بيانات العائلة...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo] flex items-center justify-center">
        <p className="text-red-600 font-bold">تعذر تحميل بيانات العائلة، حاول مجددًا.</p>
      </div>
    );
  }

  const family = familyProp || fetchedFamily;

  if (!family) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo] flex items-center justify-center">
        <p className="text-[#6B7280] font-bold">لا توجد بيانات لهذه العائلة.</p>
      </div>
    );
  }

  const documents =
    documentsProp ||
    (family.hasFatherDeathCertificate
      ? [
          {
            name: family.fatherDeathCertificateFileName || "شهادة وفاة",
            type: family.fatherDeathCertificateFileName?.split(".").pop()?.toUpperCase() || "ملف مرفوع",
          },
        ]
      : []);
  const status = statusProp || family.statusKey || "pending";
  const orphans = orphansProp || ownedOrphans;
  const config = FAMILY_STATUS_CONFIG[status] || FAMILY_STATUS_CONFIG.pending;

  // canEdit/canAddOrphan راجعين صراحة من الـ API — أدق من تخمينهم حسب الحالة بس
  const showEditButton = family.canEdit ?? (status === "active" || status === "needsEdit");
  const showAddOrphanButton = family.canAddOrphan ?? status === "active";

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo]">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="العائلات"
      />

      <div className="min-h-screen lg:mr-[256px] flex flex-col">
        <TopNavbar setOpenSidebar={setOpenSidebar} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-[1220px] mx-auto">
            <Breadcrumb />

            <PageHeader
              family={family}
              config={config}
              showEditButton={showEditButton}
              onEditClick={onEditClick || (() => navigate(`/families/${familyId}/edit`))}
            />

            <StatusAlert config={config} />

            {location.state?.familyDocumentSuccess && (
              <p role="status" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 font-[Cairo] text-sm font-bold text-emerald-700">
                {location.state.familyDocumentSuccess}
              </p>
            )}

            <section className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-6 items-stretch">
              <FamilyInfoCard family={family} />
              <DocumentsCard
                documents={documents}
                onViewCertificate={handleViewCertificate}
                certificateLoading={certificateLoading}
                certificateError={certificateError}
              />
            </section>

            <section className="mt-10">
              <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <MdFamilyRestroom className="text-[#003469] text-[25px]" />

                  <h3 className="font-[Cairo] text-[18px] sm:text-[20px] font-bold text-[#111827]">
                    الأيتام التابعون للعائلة ({orphans.length})
                  </h3>
                </div>

                {showAddOrphanButton && (
                  <button
                    type="button"
                    onClick={onAddOrphanClick || (() => navigate(`/families/${familyId}/orphans/add`))}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#008C78] text-white px-4 py-2 font-[Cairo] text-[13px] font-bold hover:bg-[#007566] transition"
                  >
                    <MdPersonAdd className="text-[16px]" />
                    إضافة يتيم جديد
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                {orphans.length === 0 ? (
                  <p className="md:col-span-2 xl:col-span-3 rounded-[14px] border border-[#C9D2E3] bg-white px-6 py-10 text-center font-[Cairo] text-sm text-[#6B7280]">
                    لا توجد بيانات أيتام متاحة لهذه العائلة.
                  </p>
                ) : orphans.map((orphan) => (
                  <OrphanCard
                    key={orphan.orphanId || orphan.name}
                    orphan={{
                      ...orphan,
                      name: orphan.name || orphan.fullName,
                      status: orphan.status || orphan.orphanStatus,
                      relation: orphan.relation || orphan.headOfHouseholdName,
                      education: orphan.education || orphan.educationalStatus,
                      idNumber: orphan.idNumber || orphan.maskedNationalId,
                      avatarBg: orphan.avatarBg || "bg-[#E8F1FA]",
                    }}
                    onView={() => navigate(`/guardian/orphans/${orphan.orphanId}`)}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>

        <AuthenticatedFooter />
      </div>
    </div>
  );
}

export default FamilyDetailsPage;
