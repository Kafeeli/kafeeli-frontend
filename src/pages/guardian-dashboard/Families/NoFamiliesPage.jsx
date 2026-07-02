import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

import {
  MdMenu,
  MdNotificationsNone,
  MdPerson,
  MdAddCircle,
  MdHelpOutline,
  MdDescription,
  MdCheckCircle,
  MdAssignment,
  MdRateReview,
  MdFamilyRestroom,
} from "react-icons/md";

function TopNavbar({ setOpenSidebar }) {
  return (
    <header className="min-h-[52px] bg-white border-b border-[#DDE2EA] shadow-sm flex items-center justify-between gap-3 px-4 py-2 sm:px-6">
      <div className="flex items-center gap-1 min-w-0">
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

function EmptyFamilyIllustration() {
  return (
    <div className="relative mx-auto w-[230px] h-[230px] sm:w-[310px] sm:h-[310px] lg:w-[380px] lg:h-[380px] flex items-center justify-center">
      <div className="absolute inset-0 rounded-[6px] bg-gradient-to-b from-[#E9EEF2] to-[#DCE3E9] shadow-[0_12px_30px_rgba(16,24,40,0.10)]" />

      <div className="relative w-[135px] h-[170px] sm:w-[175px] sm:h-[225px] lg:w-[210px] lg:h-[265px] rounded-[20px] border-[8px] border-[#20252C] bg-[#F9FAFB] shadow-[0_8px_22px_rgba(16,24,40,0.12)] flex items-center justify-center">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-[#20252C]" />

        <div className="w-[96px] h-[96px] sm:w-[125px] sm:h-[125px] lg:w-[145px] lg:h-[145px] rounded-[26px] bg-white flex items-center justify-center">
          <div className="relative">
            <MdFamilyRestroom className="text-[#003469] text-[78px] sm:text-[96px] lg:text-[110px]" />
            <MdCheckCircle className="absolute -top-3 -right-3 text-[#4BC5C8] text-[26px] sm:text-[32px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StepPill({ icon, number, text }) {
  return (
    <div className="h-[38px] px-4 rounded-full bg-white border border-[#E5E7EB] shadow-[0_1px_2px_rgba(16,24,40,0.03)] flex items-center justify-center gap-2 text-[#6B7280]">
      <span className="text-[#003469] text-[17px]">{icon}</span>
      <span className="font-[Cairo] text-[12px] font-bold">{number}</span>
      <span className="font-[Cairo] text-[12px]">{text}</span>
    </div>
  );
}

function NoFamiliesPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo]">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="العائلات"
      />

      <div className="min-h-screen lg:mr-[256px] flex flex-col">
        <TopNavbar setOpenSidebar={setOpenSidebar} />

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-[1050px] mx-auto">
            <section className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center text-center">
              <EmptyFamilyIllustration />

              <h2 className="mt-8 font-[Cairo] text-[17px] sm:text-[22px] font-bold text-[#003469]">
                لا توجد عائلات مضافة حتى الآن
              </h2>

              <p className="mt-5 max-w-[560px] mx-auto font-[Cairo] text-[13px] sm:text-[18px] leading-8 text-[#6B7280]">
                أضف أول عائلة تقع تحت رعايتك ليتم مراجعتها من الإدارة. نحن هنا
                لمساعدتك في رحلة العطاء.
              </p>

              <div className="mt-10 w-full max-w-[680px] flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/families/add")}
                  className="w-full sm:w-[280px] h-[56px] rounded-[10px] bg-[#003469] text-white font-[Cairo] text-[15px] sm:text-[16px] font-bold flex items-center justify-center gap-3 hover:bg-[#004B8F] transition shadow-[0_6px_14px_rgba(0,52,105,0.18)] hover:shadow-[0_8px_18px_rgba(0,52,105,0.24)]"
                >
                  <MdAddCircle className="text-[22px]" />
                  إضافة أول عائلة
                </button>

                <button
                  type="button"
                  className="w-full sm:w-[280px] h-[56px] rounded-[10px] bg-white border border-[#9DD6DA] text-[#007B83] font-[Cairo] text-[15px] sm:text-[16px] font-bold flex items-center justify-center gap-3 hover:bg-[#F0FCFD] transition shadow-sm hover:shadow-md"
                >
                  <MdHelpOutline className="text-[22px]" />
                  كيفية الإضافة؟
                </button>
              </div>

              <div className="mt-12 w-full max-w-[700px] border-t border-[#E5E7EB] pt-8">
                <p className="font-[Cairo] text-[12px] text-[#8A94A6] mb-5">
                  خطوات سريعة للبدء:
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <StepPill
                    icon={<MdDescription />}
                    number="1"
                    text="تجهيز الوثائق"
                  />

                  <StepPill
                    icon={<MdAssignment />}
                    number="2"
                    text="تعبئة البيانات"
                  />

                  <StepPill
                    icon={<MdRateReview />}
                    number="3"
                    text="المراجعة والقبول"
                  />
                </div>
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

export default NoFamiliesPage;