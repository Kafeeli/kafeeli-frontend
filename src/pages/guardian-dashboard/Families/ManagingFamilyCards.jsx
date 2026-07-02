import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

import {
  MdMenu,
  MdNotificationsNone,
  MdPerson,
  MdAdd,
  MdGroups,
  MdCheckCircle,
  MdHourglassBottom,
  MdWarningAmber,
  MdBlock,
  MdVisibilityOff,
  MdLocationOn,
  MdInfoOutline,
  MdAssignment,
} from "react-icons/md";

const stats = [
  {
    id: "total",
    label: "إجمالي العائلات",
    value: "12",
    icon: <MdGroups />,
    iconBox: "bg-[#DBEAFE] text-[#003469]",
  },
  {
    id: "active",
    label: "نشطة ومعتمدة",
    value: "8",
    icon: <MdCheckCircle />,
    iconBox: "bg-[#68E3E8] text-[#006F78]",
  },
  {
    id: "pending",
    label: "قيد المراجعة",
    value: "3",
    icon: <MdAssignment />,
    iconBox: "bg-[#FFD99B] text-[#4A3400]",
  },
  {
    id: "needs-action",
    labelTop: "مخفية / موقوفة",
    labelBottom: "تحتاج تعديل",
    value: "3",
    icon: <MdWarningAmber />,
    iconBox: "bg-[#FFD8D8] text-[#C81E1E]",
    special: true,
  },
];

const familyCards = [
  {
    title: "عائلة المنصور",
    city: "الرياض، حي النرجس",
    status: "معتمدة ونشطة",
    description:
      "أسرة مكونة من 5 أفراد، تعاني من فقدان العائل الأساسي وتسعى لتأمين الاحتياجات التعليمية الأساسية للأبناء.",
    monthlyNeed: "1,200 SAR",
    date: "12 يناير 2024",
    headerClass: "bg-gradient-to-l from-[#003469] to-[#0D5FA8]",
    borderClass: "border-[#D6E2F0]",
    cardBg: "bg-white",
    statusClass: "bg-[#DFF5F3] text-[#007B83]",
    icon: <MdCheckCircle />,
    iconClass: "text-[#007B83]",
    note: "تم قبول العائلة المعتمدة ويمكنك البدء بدعمها من قبل الإدارة.",
  },
  {
    title: "عائلة العسيري",
    city: "جدة، حي السلامة",
    status: "قيد المراجعة",
    description:
      "تقديم طلب جديد لدعم تكاليف السكن والإيجار المتراكم، والوثائق بانتظار التدقيق الفني.",
    monthlyNeed: "3,500 SAR",
    date: "28 فبراير 2024",
    headerClass: "bg-gradient-to-l from-[#7A5200] to-[#D9A23B]",
    borderClass: "border-[#D6E2F0]",
    cardBg: "bg-white",
    statusClass: "bg-[#FFE1A6] text-[#7A5200]",
    icon: <MdHourglassBottom />,
    iconClass: "text-[#6B4A00]",
  },
  {
    title: "عائلة الحربي",
    city: "تبوك، حي المرج",
    status: "مخفية",
    description:
      "تم إخفاء الملف مؤقتًا بناءً على طلب الوصي لاستكمال بعض التحديثات العائلية.",
    monthlyNeed: "1,800 SAR",
    date: "05 مايو 2024",
    headerClass: "bg-[#C9CDD8]",
    borderClass: "border-[#D6E2F0]",
    cardBg: "bg-[#F7F8FA]",
    statusClass: "bg-[#8E96A3] text-white",
    icon: <MdVisibilityOff />,
    iconClass: "text-[#8E96A3]",
  },
  {
    title: "عائلة السعدون",
    city: "الدمام، حي الزهور",
    status: "تحتاج تعديل",
    description: "",
    monthlyNeed: "1,200 SAR",
    date: "15 مارس 2024",
    headerClass: "bg-[#EFEFEF]",
    borderClass: "border-[#F4B4B4]",
    cardBg: "bg-white",
    statusClass: "bg-[#D11F1F] text-white",
    icon: <MdBlock />,
    iconClass: "text-[#D11F1F]",
    reason:
      "المستندات الثانوية غير واضحة وتاريخ الهوية الوطنية منتهي، يرجى تحديث البيانات وإعادة الرفع.",
  },
  {
    title: "عائلة الصالح",
    city: "مكة، حي العزيزية",
    status: "موقوفة",
    description:
      "الملف موقوف مؤقتًا بسبب اكتشاف تضارب في البيانات المالية المقدمة، يرجى مراجعة الإدارة.",
    monthlyNeed: "1,200 SAR",
    date: "10 يناير 2024",
    headerClass: "bg-gradient-to-l from-[#D11F1F] to-[#F7B8B8]",
    borderClass: "border-[#D11F1F]",
    cardBg: "bg-white",
    statusClass: "bg-[#FEE2E2] text-[#D11F1F]",
    icon: <MdBlock />,
    iconClass: "text-[#D11F1F]",
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
          عائلتي
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

function HeaderCard() {
  const navigate = useNavigate();

  return (
    <section className="bg-white border border-[#D8E0EA] rounded-[12px] p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="text-right">
          <h2 className="font-[Cairo] text-[24px] sm:text-[30px] font-bold text-[#003469]">
            عائلتي
          </h2>

          <p className="mt-2 font-[Cairo] text-[13px] sm:text-[15px] leading-7 text-[#6B7280]">
            أدر بيانات العائلات التي تقع تحت رعايتك، وتابع حالة مراجعتها من
            الإدارة بشكل دوري ومباشر.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate("/families/add")}
          className="w-full md:w-[180px] h-[54px] rounded-[8px] bg-[#003469] text-white font-[Cairo] text-[14px] font-bold flex items-center justify-center gap-2 hover:bg-[#053c74] transition shadow-[0_8px_18px_rgba(0,52,105,0.18)]"
        >
          <MdAdd className="text-[22px]" />
          إضافة عائلة
        </button>
      </div>
    </section>
  );
}

function StatCard({ item }) {
  return (
    <div className="h-[116px] bg-white border border-[#D1D8E3] rounded-[12px] px-5 py-5 shadow-sm flex items-center justify-between gap-4">
      <div
        className={`w-[48px] h-[48px] rounded-[8px] flex items-center justify-center text-[25px] shrink-0 ${item.iconBox}`}
      >
        {item.icon}
      </div>

      {item.special ? (
        <div className="text-right flex-1 min-w-0" dir="rtl">
          <p className="font-[Cairo] text-[16px] leading-7 text-[#4B5563] whitespace-nowrap">
            {item.labelTop}
          </p>

          <div className="mt-1 flex items-center justify-start gap-2 whitespace-nowrap">
            <span className="font-[Cairo] text-[16px] leading-7 text-[#4B5563]">
              {item.labelBottom}
            </span>

            <span className="font-[Cairo] text-[16px] leading-7 text-[#4B5563]">
              /
            </span>

            <span className="font-[Cairo] text-[17px] font-bold text-[#111827]">
              {item.value}
            </span>
          </div>
        </div>
      ) : (
        <div className="text-right flex-1 min-w-0">
          <p className="font-[Cairo] text-[16px] leading-7 text-[#4B5563]">
            {item.label}
          </p>

          <p className="mt-1 font-[Cairo] text-[17px] font-bold text-[#111827]">
            {item.value}
          </p>
        </div>
      )}
    </div>
  );
}

function FamilyCard({ card }) {
  const navigate = useNavigate();

  return (
    <article
      className={`h-full min-h-[430px] overflow-hidden rounded-[12px] border ${card.borderClass} ${card.cardBg} shadow-sm hover:shadow-md transition flex flex-col`}
    >
      <div className={`relative h-[96px] ${card.headerClass} shrink-0`}>
        <div className="absolute right-6 bottom-[-26px] w-[62px] h-[62px] rounded-[8px] bg-white shadow-[0_3px_10px_rgba(16,24,40,0.12)] flex items-center justify-center">
          <span className={`text-[38px] ${card.iconClass}`}>
            {card.icon}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 px-6 pt-12 pb-5 text-right">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-[Cairo] text-[16px] font-bold text-[#003469] leading-6">
              {card.title}
            </h3>

            <p className="mt-2 font-[Cairo] text-[13px] text-[#6B7280] flex items-center justify-start gap-1">
              <MdLocationOn className="text-[17px] shrink-0" />
              <span>{card.city}</span>
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-[Cairo] text-[13px] font-bold whitespace-nowrap ${card.statusClass}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {card.status}
          </span>
        </div>

        <div className="mt-5 min-h-[70px]">
          {card.description && (
            <p className="font-[Cairo] text-[14px] leading-8 text-[#5F6673]">
              {card.description}
            </p>
          )}
        </div>

        <div className="border-t border-[#D6DCE5]" />

        <div className="grid grid-cols-2 gap-4 py-6">
          <div>
            <p className="font-[Cairo] text-[14px] text-[#6B7280]">
              الاحتياج الشهري
            </p>
            <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#003469]">
              {card.monthlyNeed}
            </p>
          </div>

          <div>
            <p className="font-[Cairo] text-[14px] text-[#6B7280]">
              تاريخ الإضافة
            </p>
            <p className="mt-1 font-[Cairo] text-[14px] font-bold text-[#111827]">
              {card.date}
            </p>
          </div>
        </div>

        <div className="border-t border-[#D6DCE5]" />

        <div className="mt-4 min-h-[70px]">
          {card.note && (
            <div className="rounded-[8px] bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 flex items-start gap-2">
              <MdInfoOutline className="text-[#007B83] text-[17px] mt-0.5 shrink-0" />
              <p className="font-[Cairo] text-[12px] leading-6 text-[#6B7280]">
                {card.note}
              </p>
            </div>
          )}

          {card.reason && (
            <div className="rounded-[8px] bg-[#FFD8D8] border border-[#F5A9A9] px-4 py-4">
              <p className="font-[Cairo] text-[13px] leading-7 text-[#C81E1E]">
                <span className="font-bold">السبب: </span>
                {card.reason}
              </p>
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={() => navigate("/families/details")}
            className="w-full h-[44px] rounded-[7px] border border-[#003469] bg-white text-[#003469] font-[Cairo] text-[15px] font-bold hover:bg-[#003469] hover:text-white transition"
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </article>
  );
}

function ManagingFamilyCards() {
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
          <div className="w-full max-w-[1180px] mx-auto">
            <HeaderCard />

            <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {stats.map((item) => (
                <StatCard key={item.id} item={item} />
              ))}
            </section>

            <section className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {familyCards.map((card) => (
                <FamilyCard key={card.title} card={card} />
              ))}
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

export default ManagingFamilyCards;