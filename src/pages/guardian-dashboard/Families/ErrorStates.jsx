import { useState } from "react";
import Sidebar from "../Sidebar";

import {
  MdMenu,
  MdRefresh,
  MdOutlineCloudOff,
  MdOutlineSecurity,
  MdFamilyRestroom,
  MdNotificationsNone,
  MdPerson,
  MdOutlineUpdate,
} from "react-icons/md";

function TopNavbar({ setOpenSidebar }) {
  return (
    <header className="min-h-[52px] bg-white border-b border-[#DDE2EA] shadow-sm flex items-center justify-between gap-3 px-4 py-2 sm:px-6">
      <div className="flex items-center gap-2 min-w-0">
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
        <button className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#003469] hover:bg-gray-100 transition">
          <MdNotificationsNone className="text-[18px] sm:text-[20px]" />
          <span className="absolute top-[7px] right-[7px] w-2 h-2 rounded-full bg-red-500 border border-white" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="font-[Cairo] text-[13px] lg:text-[14px] font-bold text-[#003469]">
              أحمد العلي
            </p>
            <p className="mr-1 font-[Cairo] text-[10px] lg:text-[11px] text-gray-500">
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

function SkeletonCard() {
  return (
    <div className="min-h-[170px] sm:min-h-[190px] lg:min-h-[210px] rounded-[12px] bg-white border border-[#E6EAF0] shadow-[0_1px_4px_rgba(16,24,40,0.06)] p-4 sm:p-5 lg:p-6 animate-pulse overflow-hidden">
      <div className="flex items-start gap-4 lg:gap-5">
        <div className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] lg:w-[66px] lg:h-[66px] rounded-full bg-gray-300 shrink-0" />

        <div className="flex-1 pt-2 space-y-3">
          <div className="h-[13px] sm:h-[14px] lg:h-[15px] w-[70%] rounded-full bg-gray-300" />
          <div className="h-[12px] sm:h-[13px] lg:h-[14px] w-[52%] rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="mt-5 sm:mt-6 lg:mt-7 h-px bg-gray-100" />

      <div className="mt-5 sm:mt-6 space-y-3">
        <div className="h-[13px] sm:h-[14px] lg:h-[15px] w-full rounded-full bg-gray-300" />
        <div className="h-[13px] sm:h-[14px] lg:h-[15px] w-full rounded-full bg-gray-300" />
      </div>

      <div className="mt-5 sm:mt-6 flex items-center justify-between gap-4">
        <div className="h-[22px] sm:h-[24px] w-[90px] sm:w-[115px] rounded-[7px] bg-gray-300" />
        <div className="h-[18px] sm:h-[19px] w-[58px] sm:w-[70px] rounded-[6px] bg-gray-300" />
      </div>
    </div>
  );
}

function ErrorBox() {
  return (
    <section className="mt-10 sm:mt-14 lg:mt-16 rounded-[18px] sm:rounded-[24px] bg-white border border-[#F2D6D6] shadow-[0_2px_6px_rgba(16,24,40,0.04)] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center px-4 sm:px-8 py-10">
      <div className="w-full max-w-[520px] mx-auto flex flex-col items-center text-center">
        <div className="relative w-[76px] h-[76px] sm:w-[90px] sm:h-[90px] lg:w-[96px] lg:h-[96px] rounded-[18px] sm:rounded-[22px] bg-[#FFD4D4] rotate-[-12deg] flex items-center justify-center">
          <MdOutlineCloudOff className="text-[#C81E1E] text-[46px] sm:text-[54px] lg:text-[58px]" />

          <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#C81E1E] border-[3px] border-white text-white flex items-center justify-center rotate-[12deg]">
            <span className="text-[13px] sm:text-[15px] font-bold leading-none">
              !
            </span>
          </span>
        </div>

        <h2 className="mt-8 sm:mt-10 font-[Cairo] text-[17px] sm:text-[20px] lg:text-[22px] font-bold text-[#111827]">
          عذرًا، حدث خطأ غير متوقع
        </h2>

        <p className="mt-4 sm:mt-6 font-[Cairo] text-[13px] sm:text-[15px] lg:text-[16px] leading-[28px] sm:leading-[32px] text-[#4B5563]">
          تعذر تحميل البيانات الخاصة بالعائلات، الوقت الحالي قد يكون هذا
          <br className="hidden sm:block" />
          بسبب ضعف في اتصال الإنترنت أو تحديث في النظام.
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-7 sm:mt-8 h-[46px] sm:h-[50px] w-full max-w-[270px] rounded-[9px] bg-[#003469] text-white font-[Cairo] text-[14px] sm:text-[16px] font-bold flex items-center justify-center gap-3 sm:gap-4 hover:bg-[#004B8F] transition shadow-sm hover:shadow-md"
        >
          <MdRefresh className="text-[22px] sm:text-[24px]" />
          إعادة المحاولة
        </button>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, description }) {
  return (
    <div
      dir="rtl"
      className="min-h-[92px] sm:min-h-[96px] rounded-[14px] bg-white/45 border border-[#EEF1F5] px-4 sm:px-6 lg:px-7 py-4 sm:py-5 shadow-[0_1px_2px_rgba(16,24,40,0.02)] hover:shadow-md transition"
    >
      <div className="flex items-start justify-start gap-3 sm:gap-4">
        <span className="text-[#4BAEB8] text-[23px] sm:text-[25px] mt-0.5 shrink-0">
          {icon}
        </span>

        <div className="text-right min-w-0">
          <h3 className="font-[Cairo] text-[15px] sm:text-[17px] font-bold text-[#7A7F87] leading-6">
            {title}
          </h3>

          <p className="mt-1 font-[Cairo] text-[12px] sm:text-[13px] leading-6 text-[#8A94A6]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function RegisteredFamiliesPage() {
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

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-[1180px] mx-auto">
            <div className="w-full text-right">
              <div className="inline-flex items-center gap-2">
                <MdFamilyRestroom className="text-[#003469] text-[18px] sm:text-[20px]" />

                <h2 className="font-[Cairo] text-[16px] sm:text-[18px] font-bold text-[#003469]">
                  قيد التحميل
                </h2>
              </div>

              <p className="mt-1 font-[Cairo] text-[12px] sm:text-[14px] text-[#667085] text-right">
                نحن نقوم بجلب بيانات العائلات من النظام...
              </p>
            </div>

            <section className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </section>

            <ErrorBox />

            <section className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <InfoCard
                icon={<MdOutlineUpdate />}
                title="التحديث التلقائي"
                description="يقوم النظام بمحاولة التحديث التلقائي كل 5 دقائق في حال فشل الاتصال."
              />

              <InfoCard
                icon={<MdOutlineSecurity />}
                title="أمان البيانات"
                description="لم تتأثر قاعدة بيانات العائلات وبياناتها فهي محفوظة ضمن أنظمة الحماية."
              />
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

export default RegisteredFamiliesPage;