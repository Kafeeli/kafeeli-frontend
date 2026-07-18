import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useFamily } from "../../../hooks/useFamily";
import { familyApi } from "../../../services/familyApi";
import { FAMILY_STATUS_CONFIG } from "../../../config/familyStatus";

import {
  MdMenu,
  MdNotificationsNone,
  MdPerson,
  MdKeyboardArrowLeft,
  MdWarningAmber,
  MdInfoOutline,
  MdEditNote,
  MdFolderOpen,
  MdPictureAsPdf,
  MdVisibility,
  MdDownload,
  MdSend,
  MdErrorOutline,
} from "react-icons/md";

/* ========================================================================== */
/* ⚙️ إعدادات كل حالة ممكنة عند دخول صفحة التعديل                            */
/* ========================================================================== */
/**
 * badgeLabel/badgeClass مستوردين من نفس الإعداد المشترك (familyStatus.js) —
 * بس محتوى البانر هون مختلف فعليًا عن صفحة التفاصيل (رسائل خاصة بسياق التعديل)،
 * فخليته محلي بدل ما نفرض توحيد نص مش منطقي.
 */
const EDIT_STATUS_CONFIG = {
  active: {
    badgeLabel: FAMILY_STATUS_CONFIG.active.badgeLabel,
    badgeClass: FAMILY_STATUS_CONFIG.active.badgeClass,
    formIcon: MdInfoOutline,
    banner: {
      icon: MdWarningAmber,
      bgClass: "bg-[#FFF9D8]",
      borderClass: "border-[#D99A00]",
      iconWrapClass: "bg-white/70",
      iconClass: "text-[#B77900]",
      titleClass: "text-[#B77900]",
      descClass: "text-[#8A5A00]",
      title: "تنبيه قبل حفظ التعديلات",
      description:
        "بعد حفظ التعديلات ستعود حالة الطلب إلى قيد المراجعة، ولن تظهر العائلة للرعاة حتى تعتمد الإدارة التعديلات مرة أخرى.",
    },
  },
  needsEdit: {
    badgeLabel: FAMILY_STATUS_CONFIG.needsEdit.badgeLabel,
    badgeClass: FAMILY_STATUS_CONFIG.needsEdit.badgeClass,
    formIcon: MdEditNote,
    banner: {
      icon: MdWarningAmber,
      bgClass: "bg-[#FFDADA]",
      borderClass: "border-[#D11F1F]",
      iconWrapClass: "bg-white/65",
      iconClass: "text-[#D11F1F]",
      titleClass: "text-[#B91C1C]",
      descClass: "text-[#B91C1C]",
      title: "حالة العائلة: تحتاج تعديل",
      description:
        "يرجى مراجعة الملاحظات وتحديث البيانات المطلوبة لاستكمال الملف.",
    },
  },
};

/* 🔌 بيانات وهمية (mock) — بتتعوض ببيانات GET /families/{id} الحقيقية لاحقًا */
const MOCK_FORM_DATA = {
  headOfHouseholdName: "أحمد جابر العتيبي",
  city: "الرياض - المنطقة الوسطى",
  address: "حي الياسمين، شارع العليا، مبنى رقم 42",
  monthlyNeedAmount: "4500",
  description:
    "عائلة مكوّنة من أرملة و 3 أيتام، السكن مستأجر ولا يوجد دخل ثابت للأسرة سوى معاش الضمان الاجتماعي، الحالة تستدعي الدعم العاجل لتوفير المستلزمات المدرسية والإيجار.",
};

const MOCK_FAMILY_TITLE = "عائلة المرحوم أحمد جابر العتيبي";

/* ========================================================================== */
/* 🧩 مكونات مشتركة (متطابقة حرفيًا بين الملفين الأصليين)                    */
/* ========================================================================== */
function TopNavbar({ setOpenSidebar }) {
  return (
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
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#003469] hover:bg-gray-100 transition"
        >
          <MdNotificationsNone className="text-[18px] sm:text-[20px]" />
          <span className="absolute top-[7px] right-[7px] w-2 h-2 rounded-full bg-red-500 border border-white" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="font-[Cairo] text-[13px] lg:text-[14px] font-bold text-[#003469]">
              أحمد العلي
            </p>
            <p className="font-[Cairo] text-[10px] lg:text-[11px] text-gray-500">
              كفيل معتمد
            </p>
          </div>

          <div className="w-9 h-9 rounded-full border border-[#C2C6D2] bg-gray-100 overflow-hidden flex items-center justify-center">
            <MdPerson className="text-gray-500 text-xl" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center justify-start gap-1 font-[Cairo] text-[12px] sm:text-[13px]">
      <span className="text-[#6B7280]">الرئيسية</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#6B7280]">إدارة العائلات</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#003469] font-bold">تعديل بيانات العائلة</span>
    </div>
  );
}

function PageHeader({ familyTitle, config }) {
  return (
    <section className="mt-3 text-right">
      <h2 className="font-[Cairo] text-[25px] sm:text-[34px] lg:text-[39px] font-bold text-[#111827] leading-tight">
        تعديل بيانات العائلة
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="font-[Cairo] text-[14px] sm:text-[16px] text-[#6B7280]">
          {familyTitle}
        </p>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-4 py-1.5 font-[Cairo] text-[12px] font-bold ${config.badgeClass}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {config.badgeLabel}
        </span>
      </div>
    </section>
  );
}

function WarningBanner({ config }) {
  const Icon = config.banner.icon;
  return (
    <div
      className={`mt-7 rounded-[9px] ${config.banner.bgClass} border-r-[5px] ${config.banner.borderClass} px-5 py-4 flex items-center gap-4`}
    >
      <div
        className={`w-[42px] h-[42px] rounded-full ${config.banner.iconWrapClass} flex items-center justify-center shrink-0`}
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

function FieldLabel({ children }) {
  return (
    <label className="block mb-2 font-[Cairo] text-[13px] font-bold text-[#374151]">
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full h-[46px] rounded-[8px] border border-[#CBD5E1] bg-white px-4 text-right font-[Cairo] text-[13px] text-[#374151] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#003469] focus:ring-2 focus:ring-[#003469]/10"
    />
  );
}

function TextArea({ value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={5}
      className="w-full min-h-[120px] resize-none rounded-[8px] border border-[#CBD5E1] bg-white px-4 py-3 text-right font-[Cairo] text-[13px] leading-7 text-[#374151] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#003469] focus:ring-2 focus:ring-[#003469]/10"
    />
  );
}

function BasicInfoForm({ formData, setFormData, FormIcon }) {
  return (
    <section className="bg-white border border-[#D8E0EA] rounded-[12px] px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] pb-4">
        <h3 className="font-[Cairo] text-[16px] font-bold text-[#003469]">
          المعلومات الأساسية
        </h3>

        <FormIcon className="text-[#003469] text-[22px]" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <FieldLabel>اسم رب الأسرة</FieldLabel>
          <TextInput
            value={formData.headOfHouseholdName}
            onChange={(e) => setFormData({ ...formData, headOfHouseholdName: e.target.value })}
          />
        </div>

        <div>
          <FieldLabel>المدينة والمنطقة</FieldLabel>
          <TextInput
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel>العنوان التفصيلي</FieldLabel>
          <TextInput
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 max-w-[360px]">
          <FieldLabel>الاحتياج الشهري المقدّر</FieldLabel>
          <div className="relative">
            <TextInput
              value={formData.monthlyNeedAmount}
              onChange={(e) => setFormData({ ...formData, monthlyNeedAmount: e.target.value })}
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-[Cairo] text-[12px] text-[#6B7280]">
              ILS
            </span>
          </div>
        </div>

        <div className="md:col-span-2">
          <FieldLabel>وصف الحالة</FieldLabel>
          <TextArea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>
    </section>
  );
}

function DocumentsSection() {
  return (
    <section className="mt-7 bg-white border border-[#D8E0EA] rounded-[12px] px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] pb-4">
        <h3 className="font-[Cairo] text-[16px] font-bold text-[#003469]">
          الوثائق والمستندات
        </h3>

        <MdFolderOpen className="text-[#003469] text-[22px]" />
      </div>

      <div className="mt-6 rounded-[10px] border border-dashed border-[#CBD5E1] bg-[#F8FAFC] px-4 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-[42px] h-[42px] rounded-[8px] bg-[#FEE2E2] flex items-center justify-center shrink-0">
              <MdPictureAsPdf className="text-[#D11F1F] text-[24px]" />
            </div>

            <div className="text-right">
              <p className="font-[Cairo] text-[14px] font-bold text-[#111827]">
                شهادة وفاة
              </p>
              <p className="mt-1 font-[Cairo] text-[12px] text-[#6B7280]">
                تم الرفع بتاريخ 12 أكتوبر 2023
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              className="h-[40px] rounded-[7px] bg-white border border-[#CBD5E1] px-5 font-[Cairo] text-[13px] font-bold text-[#374151] flex items-center justify-center gap-2 hover:bg-[#F8FAFC] transition"
            >
              <MdVisibility className="text-[18px]" />
              عرض
            </button>

            <button
              type="button"
              className="h-[40px] rounded-[7px] bg-[#003469] px-5 font-[Cairo] text-[13px] font-bold text-white flex items-center justify-center gap-2 hover:bg-[#053c74] transition"
            >
              <MdDownload className="text-[18px]" />
              استبدال الملف
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActionBar({ onCancel, onSubmit, submitting, error }) {
  return (
    <section className="mt-7 bg-white border border-[#E5E7EB] rounded-[12px] px-5 sm:px-7 py-5 shadow-sm">
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <MdErrorOutline className="text-lg shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitting}
          className="w-full sm:w-[120px] h-[46px] rounded-[8px] bg-white border border-[#CBD5E1] text-[#374151] font-[Cairo] text-[14px] font-bold hover:bg-[#F8FAFC] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          إلغاء
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="w-full sm:w-[230px] h-[46px] rounded-[8px] bg-[#003469] text-white font-[Cairo] text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#053c74] transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <MdSend className="text-[20px]" />
          {submitting ? "جارٍ الحفظ..." : "حفظ وإرسال للمراجعة"}
        </button>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* 📄 الصفحة الموحدة — بتاخد status وبتغيّر البانر/البادج تلقائيًا           */
/* ========================================================================== */
function FamilyEditPage({
  status: statusProp,
  familyTitle: familyTitleProp,
  initialFormData,
}) {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();
  const { familyId } = useParams();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState(initialFormData || MOCK_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { family: fetchedFamily, loading, error: fetchError } = useFamily(familyId);

  // 🔌 مؤقتًا (لحد ما يجهز API): /families/123/edit?status=needsEdit
  const previewStatus = searchParams.get("status");
  const status = statusProp || previewStatus || fetchedFamily?.statusKey || "needsEdit";
  const config = EDIT_STATUS_CONFIG[status] || EDIT_STATUS_CONFIG.needsEdit;
  const familyTitle = familyTitleProp || (fetchedFamily ? `عائلة ${fetchedFamily.headOfHouseholdName}` : MOCK_FAMILY_TITLE);

  // لما توصل بيانات العائلة الحقيقية، عبّي الفورم فيها (مرة وحدة، مش بكل render)
  useEffect(() => {
    if (fetchedFamily && !initialFormData) {
      setFormData({
        headOfHouseholdName: fetchedFamily.headOfHouseholdName || "",
        city: fetchedFamily.city || "",
        address: fetchedFamily.address || "",
        monthlyNeedAmount: fetchedFamily.monthlyNeedAmount ?? "",
        description: fetchedFamily.description || "",
      });
    }
  }, [fetchedFamily, initialFormData]);

  async function handleSubmit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      // 🔌 استدعاء PUT الفعلي لتحديث بيانات العائلة
      await familyApi.updateFamily(familyId, formData);
      navigate(`/families/${familyId}`);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) {
        setSubmitError("لا يمكن تعديل هذه العائلة بحالتها الحالية.");
      } else if (status === 400) {
        setSubmitError("تحقق من صحة البيانات المدخلة.");
      } else {
        setSubmitError("تعذر حفظ التعديلات، حاول مجددًا.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  function handleCancel() {
    navigate(`/families/${familyId}`);
  }

  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo] flex items-center justify-center">
        <p className="text-[#003469] font-bold">جارٍ تحميل بيانات العائلة...</p>
      </div>
    );
  }

  // ⚠️ قبل هيك كان الكود يتجاهل فشل الجلب ويعرض بيانات وهمية بصمت لو ما في
  // initialFormData ممرّرة — هلق بيوضح الخطأ فعليًا، متل FamilyDetailsPage بالظبط.
  if (fetchError && !initialFormData) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo] flex items-center justify-center">
        <p className="text-red-600 font-bold">تعذر تحميل بيانات العائلة، حاول مجددًا.</p>
      </div>
    );
  }

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
          <div className="w-full max-w-[1180px] mx-auto">
            <Breadcrumb />

            <PageHeader familyTitle={familyTitle} config={config} />

            <WarningBanner config={config} />

            <form noValidate onSubmit={(e) => e.preventDefault()} className="mt-7">
              <BasicInfoForm
                formData={formData}
                setFormData={setFormData}
                FormIcon={config.formIcon}
              />

              <DocumentsSection />

              <ActionBar
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                submitting={submitting}
                error={submitError}
              />
            </form>
          </div>
        </main>

        <footer className="mt-10 sm:mt-14 lg:mt-20 border-t border-[#E5E7EB] text-center px-4">
          <p className="text-xs sm:text-sm text-[#6B7280] mt-4 mb-4">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}

export default FamilyEditPage;
