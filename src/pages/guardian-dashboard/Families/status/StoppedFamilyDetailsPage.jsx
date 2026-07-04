import { useState } from "react";
import Sidebar from "../../Sidebar";

import {
  MdMenu,
  MdNotificationsNone,
  MdPerson,
  MdKeyboardArrowLeft,
  MdInfoOutline,
  MdVerifiedUser,
  MdPictureAsPdf,
  MdFamilyRestroom,
  MdOutlineRemoveRedEye,
  MdBlock,
} from "react-icons/md";

const familyInfo = {
  title: "عائلة المرحوم أحمد جابر العتيبي",
  status: "موقوفة",
  guardianName: "أحمد جابر العتيبي رحمه الله",
  city: "الرياض - حي اليرموك",
  address: "شارع خالد بن الوليد، مبنى ٤٤، شقة ١٢",
  monthlyNeed: "4,500 ريال سعودي",
  createdAt: "12 يناير 2023",
  updatedAt: "05 مايو 2024",
  description:
    "عائلة مكوّنة من أم و3 أيتام، يسكنون في شقة مستأجرة. مصدر الدخل الوحيد هو معاش الضمان الاجتماعي. تحتاج العائلة لدعم في الرسوم المدرسية والمستلزمات الطبية للأم، والحالة مستقرة دراسياً للأبناء.",
};

const documents = [
  {
    name: "شهادة_وفاة_أحمد_العتيبي.pdf",
    size: "1.2 MB",
    date: "2023/12/01",
  },
];

const orphans = [
  {
    name: "فهد أحمد العتيبي",
    relation: "ابن المرحوم أحمد العتيبي",
    age: "9 سنوات",
    gender: "ذكر",
    education: "ثالث ابتدائي",
    idNumber: "109****122",
    status: "منتظم دراسياً",
    avatarBg: "bg-[#FFF2D7]",
  },
  {
    name: "سارة أحمد العتيبي",
    relation: "ابنة المرحوم أحمد العتيبي",
    age: "12 سنة",
    gender: "أنثى",
    education: "أول متوسط",
    idNumber: "112****990",
    status: "منتظم دراسياً",
    avatarBg: "bg-[#E8F3FF]",
  },
  {
    name: "ياسر أحمد العتيبي",
    relation: "ابن المرحوم أحمد العتيبي",
    age: "5 سنوات",
    gender: "ذكر",
    education: "تمهيدي",
    idNumber: "118****321",
    status: "تحت السن الدراسي",
    avatarBg: "bg-[#EAF2FF]",
  },
];

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
      <span className="text-[#6B7280]">لوحة التحكم</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#6B7280]">العائلات</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#003469] font-bold">بيانات العائلة</span>
    </div>
  );
}

function PageHeader() {
  return (
    <section className="mt-3 text-right">
      <h2 className="font-[Cairo] text-[25px] sm:text-[34px] lg:text-[39px] font-bold text-[#111827] leading-tight">
        {familyInfo.title}
      </h2>

      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FEE2E2] px-4 py-1.5 font-[Cairo] text-[12px] font-bold text-[#D11F1F]">
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {familyInfo.status}
      </span>
    </section>
  );
}

function StoppedAlert() {
  return (
    <div className="mt-7 rounded-[9px] bg-[#FFDADA] border-r-[5px] border-[#D11F1F] px-5 py-4 flex items-center gap-4">
      <div className="w-[44px] h-[44px] rounded-full bg-white/65 flex items-center justify-center shrink-0">
        <MdBlock className="text-[#D11F1F] text-[25px]" />
      </div>

      <div className="text-right">
        <p className="font-[Cairo] text-[14px] font-bold text-[#B91C1C] text-[18px]">
          حالة العائلة: موقوفة
        </p>

        <p className="mt-1 font-[Cairo] text-[12px] sm:text-[13px] leading-6 text-[#B91C1C]">
          تم إيقاف الدعم مؤقتًا بسبب استيفاء الشروط أو انتهاء صلاحية المستندات.
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

function FamilyInfoCard() {
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
        <InfoItem label="اسم رب الأسرة" value={familyInfo.guardianName} />
        <InfoItem label="المدينة والمنطقة" value={familyInfo.city} />
        <InfoItem label="العنوان التفصيلي" value={familyInfo.address} />
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 border-b border-[#D8DEE9] pb-6">
        <InfoItem
          label="الاحتياج الشهري المقدر"
          value={familyInfo.monthlyNeed}
          highlight
        />
        <InfoItem label="تاريخ الإنشاء" value={familyInfo.createdAt} />
        <InfoItem label="آخر تحديث" value={familyInfo.updatedAt} />
      </div>

      <div className="mt-7">
        <p className="font-[Cairo] text-[12px] text-[#6B7280] mb-3">
          وصف الحالة
        </p>

        <div className="rounded-[10px] bg-[#F7F8FC] px-6 py-5">
          <p className="font-[Cairo] text-[14px] sm:text-[15px] leading-9 text-[#6B7280]">
            {familyInfo.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function DocumentsCard() {
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
        {documents.map((doc) => (
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
                  {doc.date} - PDF - {doc.size}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="mt-4 w-full h-[42px] rounded-[8px] bg-[#DCE8FF] text-[#003469] font-[Cairo] text-[14px] font-bold hover:bg-[#C9DCFF] transition"
            >
              عرض المستند
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function OrphanCard({ orphan }) {
  return (
    <article className="h-full bg-white border border-[#C9D2E3] rounded-[14px] px-6 py-5 shadow-sm hover:shadow-md transition flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex items-center rounded-full bg-[#D9F7F1] px-3 py-1.5 font-[Cairo] text-[11px] font-bold text-[#008C78] whitespace-nowrap">
          {orphan.status}
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
          <p className="font-[Cairo] text-[11px] text-[#6B7280]">
            المستوى التعليمي
          </p>
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
          className="w-full h-[48px] rounded-[10px] bg-[#DCE8FF] text-[#003469] font-[Cairo] text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-[#C9DCFF] transition"
        >
          <MdOutlineRemoveRedEye className="text-[20px]" />
          عرض تفاصيل اليتيم
        </button>
      </div>
    </article>
  );
}

function StoppedFamilyDetailsPage() {
  const [openSidebar, setOpenSidebar] = useState(false);

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

            <PageHeader />

            <StoppedAlert />

            <section className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-6 items-stretch">
              <FamilyInfoCard />
              <DocumentsCard />
            </section>

            <section className="mt-10">
              <div className="flex items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <MdFamilyRestroom className="text-[#003469] text-[25px]" />

                  <h3 className="font-[Cairo] text-[18px] sm:text-[20px] font-bold text-[#111827]">
                    الأيتام التابعون للعائلة ({orphans.length})
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                {orphans.map((orphan) => (
                  <OrphanCard key={orphan.name} orphan={orphan} />
                ))}
              </div>
            </section>
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

export default StoppedFamilyDetailsPage;