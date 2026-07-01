import { useState } from "react";
import Sidebar from "../Sidebar";

import {
  MdMenu,
  MdOutlineAccountCircle,
  MdInfoOutline,
  MdLock,
  MdDescription,
  MdManageAccounts,
  MdCheckCircle,
  MdHourglassEmpty,
  MdSettings,
  MdArticle,
  MdAccessTime,
  MdFamilyRestroom,
} from "react-icons/md";

function TopNavbar({ setOpenSidebar }) {
  return (
    <header
      dir="rtl"
      className="h-[56px] bg-white border-b border-[#DDE2EA] shadow-sm px-3 sm:px-6"
    >
      <div className="h-full flex items-center justify-between gap-3">
        {/* يمين الهيدر */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setOpenSidebar(true)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#374151] hover:bg-gray-100 transition shrink-0"
            aria-label="فتح القائمة"
          >
            <MdMenu className="text-2xl" />
          </button>

          <h1 className="font-[Cairo] text-[15px] font-bold text-[#003469] whitespace-nowrap shrink-0">
            عائلتي
          </h1>

          <div className="h-6 w-px bg-[#DDE2EA] shrink-0" />

          <div className="flex items-center gap-1.5 min-w-0">
            <MdInfoOutline className="text-[#374151] text-[17px] shrink-0" />

            <span className="font-[Cairo] text-[12px] sm:text-[14px] text-[#4B5563] whitespace-nowrap">
              حالة الحساب:
            </span>

            <span className="font-[Cairo] text-[12px] sm:text-[14px] font-bold text-[#D11F1F] whitespace-nowrap">
              بانتظار المراجعة
            </span>
          </div>
        </div>

        {/* يسار الهيدر */}
        <button
          type="button"
          className="w-9 h-9 rounded-full flex items-center justify-center text-[#374151] hover:bg-gray-100 transition shrink-0"
          aria-label="حساب المستخدم"
        >
          <MdOutlineAccountCircle className="text-[25px]" />
        </button>
      </div>
    </header>
  );
}

function RestrictedIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[430px] aspect-square sm:aspect-[1/0.9] flex items-center justify-center">
      <div className="absolute inset-[8%] rounded-[8px] bg-gradient-to-b from-[#E8EDF2] to-[#D9E0E7] shadow-[0_10px_25px_rgba(16,24,40,0.10)]" />

      <div className="relative w-[70%] h-[72%] rounded-full border-2 border-white/90 flex items-center justify-center">
        <div className="absolute w-[78%] h-[78%] rounded-full border border-white/70" />
        <div className="absolute -right-2 top-10 w-4 h-4 rounded-full bg-white" />
        <div className="absolute left-6 top-20 w-3 h-3 rounded-full bg-white" />
        <div className="absolute right-10 bottom-8 w-2 h-2 rounded-full bg-white" />

        <div className="relative w-[130px] h-[160px] sm:w-[150px] sm:h-[180px] bg-white border-[5px] border-[#1D2D72] rounded-[8px] shadow-md">
          <div className="absolute -top-[5px] -left-[5px] w-12 h-12 bg-[#E8EDF2] border-r-[5px] border-b-[5px] border-[#1D2D72] rounded-bl-[8px]" />

          <div className="mt-8 mx-auto w-[70%] h-[4px] bg-[#31D6C4] rounded-full" />
          <div className="mt-4 mx-auto w-[72%] h-[4px] bg-[#1D2D72] rounded-full" />
          <div className="mt-4 mx-auto w-[72%] h-[4px] bg-[#1D2D72] rounded-full" />
          <div className="mt-4 mx-auto w-[72%] h-[4px] bg-[#1D2D72] rounded-full" />

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[76px] h-[76px] rounded-full border-[7px] border-[#31D6C4] bg-white flex items-center justify-center">
            <MdLock className="text-[#1D2D72] text-[34px]" />

            <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-white border-[5px] border-[#1D2D72] flex items-center justify-center">
              <MdAccessTime className="text-[#31D6C4] text-[19px]" />
            </div>
          </div>
        </div>

        <MdArticle className="absolute text-[#1D2D72] text-[64px] sm:text-[76px] right-8 bottom-8 rotate-[-18deg] opacity-90" />
        <MdFamilyRestroom className="absolute text-[#31D6C4] text-[50px] sm:text-[60px] left-8 bottom-10 rotate-[16deg] opacity-90" />
      </div>
    </div>
  );
}

function StepCard({ status, title, description, icon }) {
  const styles = {
    done: {
      title: "text-[#62B8B0]",
      icon: "text-[#62B8B0]",
      text: "text-[#8A94A6]",
    },
    current: {
      title: "text-[#003469]",
      icon: "text-[#003469]",
      text: "text-[#4B5563]",
    },
    disabled: {
      title: "text-[#C9CED8]",
      icon: "text-[#C9CED8]",
      text: "text-[#C9CED8]",
    },
  };

  const selected = styles[status];

  return (
    <div className="flex-1 min-w-[180px] text-center px-4 py-4">
      <div className="flex items-center justify-center gap-2">
        <span className={`text-[22px] ${selected.icon}`}>{icon}</span>

        <h3 className={`font-[Cairo] text-[14px] sm:text-[15px] font-bold ${selected.title}`}>
          {title}
        </h3>
      </div>

      <p className={`mt-2 font-[Cairo] text-[12px] sm:text-[13px] leading-6 ${selected.text}`}>
        {description}
      </p>
    </div>
  );
}

function ProgressSteps() {
  return (
    <section className="mt-9 sm:mt-11 w-full max-w-[820px] mx-auto rounded-[16px] bg-white border border-[#EEF1F5] shadow-[0_2px_8px_rgba(16,24,40,0.04)] overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-stretch">
        <div className="hidden md:block w-[4px] bg-[#009688]" />

        <StepCard
          status="done"
          icon={<MdCheckCircle />}
          title="الخطوة الأولى"
          description="إكمال الملف الشخصي"
        />

        <div className="hidden md:block w-px bg-[#F1F3F6]" />

        <StepCard
          status="current"
          icon={<MdHourglassEmpty />}
          title="الخطوة الثانية"
          description={
            <>
              مراجعة الوثائق الحالية
              <br />
              تستغرق المراجعة عادة 24-48 ساعة.
            </>
          }
        />

        <div className="hidden md:block w-px bg-[#F1F3F6]" />

        <StepCard
          status="disabled"
          icon={<MdSettings />}
          title="الخطوة الثالثة"
          description="تفعيل خاصية إضافة العائلات"
        />
      </div>
    </section>
  );
}

function FamilyAccessPendingPage() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo]">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="عائلتي"
      />

      <div className="min-h-screen lg:mr-[256px] flex flex-col">
        <TopNavbar setOpenSidebar={setOpenSidebar} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-[980px] mx-auto">
            <section className="bg-white/0 rounded-[18px] px-2 sm:px-6 py-3 sm:py-6 text-center">
              <RestrictedIllustration />

              <div className="mt-4 sm:mt-6 flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-[9px] bg-[#FFDADA] border border-[#FFB8B8] px-5 py-2.5 font-[Cairo] text-[14px] font-bold text-[#C81E1E] shadow-[0_8px_18px_rgba(200,30,30,0.12)]">
                  <MdLock className="text-[18px]" />
                  دخول مقيد
                </span>
              </div>

              <h2 className="mt-4 font-[Cairo] text-[15px] sm:text-[17px] font-bold text-[#003469]">
                لا يمكنك إضافة عائلة حاليًا
              </h2>

              <p className="mt-4 max-w-[600px] mx-auto font-[Cairo] text-[13px] sm:text-[15px] leading-8 text-[#6B7280]">
                يجب اعتماد حسابك ووثائقك من الإدارة قبل إضافة عائلات جديدة.
                هذه الخطوة ضرورية لضمان جودة البيانات وحماية المساعدات المقدمة.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  className="w-full sm:w-[260px] h-[54px] rounded-[10px] bg-[#003469] text-white font-[Cairo] text-[15px] font-bold flex items-center justify-center gap-3 hover:bg-[#004B8F] transition shadow-sm hover:shadow-md"
                >
                  <MdDescription className="text-[21px]" />
                  الذهاب إلى الوثائق
                </button>

                <button
                  type="button"
                  className="w-full sm:w-[260px] h-[54px] rounded-[10px] bg-[#F1F3F6] border border-[#C8CED8] text-[#4B5563] font-[Cairo] text-[15px] font-bold flex items-center justify-center gap-3 hover:bg-[#E5E7EB] transition shadow-sm hover:shadow-md"
                >
                  <MdManageAccounts className="text-[21px]" />
                  عرض حالة الحساب
                </button>
              </div>

              <ProgressSteps />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FamilyAccessPendingPage;