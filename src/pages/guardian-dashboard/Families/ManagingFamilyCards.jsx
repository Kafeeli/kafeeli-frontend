import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useFamilies } from "../../../hooks/useFamilies";
import FamilyCard from "./FamilyCard";
import NoFamiliesPage from "./NoFamiliesPage";
import FamilyAccessPendingPage from "./FamilyAccessPendingPage";
import { FamiliesLoadingState, FamiliesErrorState } from "./ErrorStates";

import {
  MdMenu,
  MdNotificationsNone,
  MdPerson,
  MdAdd,
  MdGroups,
  MdCheckCircle,
  MdAssignment,
  MdWarningAmber,
} from "react-icons/md";

function TopNavbar({ setOpenSidebar }) {
  return (
    <header className="min-h-[60px] bg-white border-b border-[#DDE2EA] shadow-sm flex items-center justify-between gap-3 px-4 py-2 sm:px-6">
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

function StatCard({ icon, iconBox, label, labelTop, labelBottom, value, special }) {
  return (
    <div className="h-[116px] bg-white border border-[#D1D8E3] rounded-[12px] px-5 py-5 shadow-sm flex items-center justify-between gap-4">
      <div
        className={`w-[48px] h-[48px] rounded-[8px] flex items-center justify-center text-[25px] shrink-0 ${iconBox}`}
      >
        {icon}
      </div>

      {special ? (
        <div className="text-right flex-1 min-w-0" dir="rtl">
          <p className="font-[Cairo] text-[16px] leading-7 text-[#4B5563] whitespace-nowrap">
            {labelTop}
          </p>

          <div className="mt-1 flex items-center justify-start gap-2 whitespace-nowrap">
            <span className="font-[Cairo] text-[16px] leading-7 text-[#4B5563]">
              {labelBottom}
            </span>
            <span className="font-[Cairo] text-[16px] leading-7 text-[#4B5563]">/</span>
            <span className="font-[Cairo] text-[17px] font-bold text-[#111827]">{value}</span>
          </div>
        </div>
      ) : (
        <div className="text-right flex-1 min-w-0">
          <p className="font-[Cairo] text-[16px] leading-7 text-[#4B5563]">{label}</p>
          <p className="mt-1 font-[Cairo] text-[17px] font-bold text-[#111827]">{value}</p>
        </div>
      )}
    </div>
  );
}

function ManagingFamilyCards() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const { families, loading, error, refetch } = useFamilies();

  // 🔌 TODO: مصدر التأهيل (canAddFamily) لسا مش مؤكد من الـ API — لما نلاقيه
  // (غالبًا جزء من بروفايل الوصي أو حالة وثائقه)، نبدّل هاد بقيمته الحقيقية.
  const isEligible = true;

  if (loading) {
    return (
      <PageShell openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}>
        <FamiliesLoadingState />
      </PageShell>
    );
  }

  if (error) {
    return (
      <PageShell openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}>
        <FamiliesErrorState onRetry={refetch} />
      </PageShell>
    );
  }

  if (!isEligible) {
    return <FamilyAccessPendingPage />;
  }

  if (families.length === 0) {
    return <NoFamiliesPage />;
  }

  const totalCount = families.length;
  const activeCount = families.filter((f) => f.statusKey === "active").length;
  const pendingCount = families.filter((f) => f.statusKey === "pending").length;
  const needsActionCount = families.filter((f) =>
    ["hidden", "stopped", "needsEdit"].includes(f.statusKey)
  ).length;

  return (
    <PageShell openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}>
      <HeaderCard />

      <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          icon={<MdGroups />}
          iconBox="bg-[#DBEAFE] text-[#003469]"
          label="إجمالي العائلات"
          value={totalCount}
        />
        <StatCard
          icon={<MdCheckCircle />}
          iconBox="bg-[#68E3E8] text-[#006F78]"
          label="نشطة ومعتمدة"
          value={activeCount}
        />
        <StatCard
          icon={<MdAssignment />}
          iconBox="bg-[#FFD99B] text-[#4A3400]"
          label="قيد المراجعة"
          value={pendingCount}
        />
        <StatCard
          icon={<MdWarningAmber />}
          iconBox="bg-[#FFD8D8] text-[#C81E1E]"
          special
          labelTop="مخفية / موقوفة"
          labelBottom="تحتاج تعديل"
          value={needsActionCount}
        />
      </section>

      <section className="mt-7 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {families.map((family) => (
          <FamilyCard key={family.familyId} family={family} />
        ))}
      </section>
    </PageShell>
  );
}

/** الهيكل المشترك (Sidebar + TopNavbar + Footer) لكل حالات هاي الصفحة */
function PageShell({ openSidebar, setOpenSidebar, children }) {
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
          <div className="w-full max-w-[1180px] mx-auto">{children}</div>
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
