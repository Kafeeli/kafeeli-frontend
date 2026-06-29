import { useState } from "react";

import personalImage from "../assets/personal.jpg";
import kafeeliLogo from "../assets/kafeeli-logo.jpg";

import {
  MdVerified,
  MdErrorOutline,
  MdHome,
  MdMenu,
  MdClose,
  MdLogout,
  MdSettings,
  MdNotificationsNone,
  MdDashboard,
  MdPerson,
  MdDescription,
  MdFamilyRestroom,
  MdSentimentSatisfiedAlt,
  MdAccountBalanceWallet,
  MdPayments,
  MdCheckCircle,
  MdStars,
  MdLockReset,
  MdLock,
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineCalendarToday,
  MdInfoOutline,
  MdSave,
  MdPublishedWithChanges,
} from "react-icons/md";

import { LuPencil } from "react-icons/lu";
import { FaRestroom, FaUserTie } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";
function GuardianProfile() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const verificationStatus = "Pending Review";

  const rejectionReason =
    "الصورة غير واضحة، يرجى إعادة رفع الوثائق بجودة أفضل.";

  const verificationStatusData = {
    "Not Uploaded": {
      title: "لم يتم رفع الوثائق",
      message: "لم تقم برفع وثائق الوصي بعد. يرجى رفع الوثائق لإكمال التحقق.",
      color: "bg-gray-100 text-gray-700 border-gray-200",
    },
    "Pending Review": {
      title: "قيد المراجعة",
      message: "تم استلام وثائقك وهي الآن قيد المراجعة من قبل الفريق المختص.",
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    Approved: {
      title: "تمت الموافقة",
      message: "تمت الموافقة على وثائق الوصي بنجاح.",
      color: "bg-green-50 text-green-700 border-green-200",
    },
    Rejected: {
      title: "مرفوضة",
      message: "تم رفض الوثائق المرفوعة. يرجى مراجعة سبب الرفض وإعادة الرفع.",
      color: "bg-red-50 text-red-700 border-red-200",
    },
    "Needs Update": {
      title: "تحتاج إلى تحديث",
      message: "تحتاج وثائقك إلى تحديث. يرجى رفع النسخة الأحدث.",
      color: "bg-orange-50 text-orange-700 border-orange-200",
    },
  };

  const currentVerification = verificationStatusData[verificationStatus];
  const menuItems = [
    {
      title: "نظرة عامة",
      icon: <MdDashboard />,
      active: false,
    },
    {
      title: "الملف الشخصي",
      icon: <MdPerson />,
      active: true,
    },
    {
      title: "الوثائق",
      icon: <MdDescription />,
      active: false,
    },
    {
      title: "العائلات",

      icon: <MdFamilyRestroom />,
      active: false,
    },
    {
      title: "الأيتام",

      icon: <MdSentimentSatisfiedAlt />,
      active: false,
    },
    {
      title: "المحفظة",
      icon: <MdAccountBalanceWallet />,
      active: false,
    },
    {
      title: "المدفوعات",
      icon: <MdPayments />,
      active: false,
    },
    {
      title: "التحديثات الدورية",

      icon: <MdPublishedWithChanges />,
      active: false,
    },
    {
      title: "التنبيهات",
      icon: <MdNotificationsNone />,
      active: false,
    },
    {
      title: "الإعدادات",
      icon: <MdSettings />,
      active: false,
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#f5f6f8] flex overflow-x-hidden">
      {openSidebar && (
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static top-0 right-0 z-50
          w-[255px] h-screen lg:h-[936px] shrink-0 bg-white border-l border-gray-200
          flex flex-col justify-between px-3 overflow-y-auto overflow-x-hidden
          transition-transform duration-300
          ${openSidebar ? "translate-x-0" : "translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div>
          <div className="lg:hidden flex justify-start pt-4 px-2">
            <button
              onClick={() => setOpenSidebar(false)}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-[#003469]"
            >
              <MdClose className="text-xl" />
            </button>
          </div>

          <div className="flex justify-center py-8 border-b border-gray-100">
            <img
              src={kafeeliLogo}
              alt="Kafeeli Logo"
              className="w-[180px] h-[180px] max-w-[207px] opacity-100 object-contain"
            />
          </div>

          <nav className="px-4 py-5 space-y-2 font-[Cairo] font-normal text-[16px] leading-[24px] text-right">
            {menuItems.map((item) => (
              <button
                key={item.title}
                onClick={() => setOpenSidebar(false)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  item.active
                    ? "bg-[#47dbe0] text-[#003469] font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#003469]"
                }`}
              >
                <span
                  className={`text-[22px] flex items-center ${
                    item.active ? "text-[#003469]" : "text-[#4B5563]"
                  }`}
                >
                  {item.icon}
                </span>

                <span>{item.title}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition">
            <MdLogout className="text-lg" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Header + Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="w-full h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-16 opacity-100">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-[#003469]"
            >
              <MdMenu className="text-2xl" />
            </button>

            <h1 className="font-[Cairo] font-bold text-[16px] leading-[24px] text-right text-[#003469]">
              ملفي الشخصي - الوصي
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="text-gray-600 hover:text-[#003469] transition text-lg">
              <MdSettings />
            </button>

            <button className="relative text-gray-600 hover:text-[#003469] transition text-lg">
              <MdNotificationsNone />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <span className="hidden md:block font-[Cairo] font-bold text-[16px] leading-[24px] text-right text-gray-700">
              أحمد محمد عبد الله
            </span>

            <div className="w-[40px] h-[40px] rounded-full bg-[#47dbe0] text-[#003469] flex items-center justify-center font-bold">
              أ
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-3 sm:px-6 pt-4 pb-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[309px_1fr] gap-6 items-start">
              {/* Guardian Card + Security Card */}
              <div className="space-y-5 w-full max-w-[309px] mx-auto lg:max-w-none">
                <section className="w-full h-[444px] bg-white rounded-[12px] border border-[#C2C6D2] shadow-sm hover:shadow-md transition overflow-hidden">
                  <div className="h-[92px] bg-gradient-to-l from-[#003469] to-[#018b8f]"></div>

                  <div className="px-5 pb-5 text-center -mt-11">
                    <img
                      src={personalImage}
                      alt="صورة الوصي"
                      className="w-[92px] h-[92px] mx-auto rounded-full border-4 border-white shadow object-cover"
                    />

                    <h3 className="mt-4 font-[Cairo] font-bold text-[16px] leading-[24px] text-center text-[#003469]">
                      أحمد العلي
                    </h3>

                    <p className="mt-3 font-[Cairo] font-normal text-[14px] leading-[20px] text-center text-gray-600">
                      عضو في كفيلي منذ عامين • ساهم في كفالة
                      <br />5 أطفال
                    </p>

                    <div className="mt-5 flex flex-col gap-[24px] text-[14px] font-[Cairo]">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-gray-600">
                          البريد الإلكتروني:
                        </span>

                        <span className="w-[151px] h-[24px] flex items-center justify-center gap-1 rounded-full bg-blue-100 text-[#003469] px-3 py-1 font-bold text-[12px]">
                          <MdCheckCircle className="text-[14px]" />
                          موثق
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-gray-600">
                          حالة الحساب:
                        </span>

                        <span className="px-4 py-1 rounded-md bg-red-100 text-red-600 text-sm font-bold">
                          معلق (بانتظار الوثائق)
                        </span>
                      </div>

                      <div className="w-full h-[36px] mx-auto flex items-center justify-center gap-2 rounded-[8px] bg-[#F5BD58]/20 px-3 py-2">
                        <MdStars className="text-[22px] text-[#483100]" />
                        <span className="font-bold text-[15px] leading-[20px] text-[#F5BD58] whitespace-nowrap">
                          تاريخ الانضمام: 12 يناير 2022
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="w-full h-[288px] bg-white rounded-[12px] border border-[#C2C6D2] shadow-sm hover:shadow-md transition p-6 flex flex-col justify-center">
                  <div className="flex flex-col items-start text-right">
                    <h3 className="font-[Cairo] font-bold text-[16px] leading-[20px] text-[#003469] mb-3 flex items-center gap-2">
                      <MdLockReset className="w-[20px] h-[20px] text-[#003469]" />
                      أمن الحساب
                    </h3>

                    <p className="font-[Cairo] font-normal text-[14px] leading-[22px] text-gray-600 mb-5 max-w-[190px]">
                      ينصح بتغيير كلمة المرور كل 3 أشهر لضمان أعلى درجات الأمان.
                    </p>
                  </div>

                  <button className="w-[221.67px] h-[49px] mx-auto flex items-center justify-center gap-2 border border-[#003469] text-[#003469] rounded-[8px] font-[Cairo] font-bold text-[16px] hover:bg-[#003469] hover:text-white hover:scale-[1.02] transition">
                    <MdLock className="w-[20px] h-[20px]" />
                    تحديث كلمة المرور
                  </button>
                </section>
              </div>

              {/* Edit Profile Section */}
              <section className="w-full bg-white rounded-xl border border-[#D8DEE8] overflow-hidden">
                {/* Header */}
                <div
                  dir="ltr"
                  className="w-full h-auto sm:h-[97px] bg-[#F3F4F5] border-b border-[#D8DEE8] px-4 sm:px-6 py-5 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <button className="h-[36px] px-4 bg-[#003469] text-white rounded-md flex items-center gap-2 text-[13px] font-medium shadow-sm hover:bg-[#002b57] transition">
                    <span>تعديل البيانات</span>
                    <LuPencil className="w-4 h-4" />
                  </button>

                  <div dir="rtl" className="text-right">
                    <h3 className="text-[15px] font-bold text-[#003469] leading-6">
                      تعديل البيانات الشخصية
                    </h3>

                    <p className="text-[12px] text-[#6B7280] mt-1 leading-5">
                      تحديث معلومات التواصل ومكان الإقامة
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                    <div className="w-full">
                      <label className="block whitespace-nowrap text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        الاسم الكامل (غير قابل للتعديل)
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          value="أحمد بن فهد العالي"
                          readOnly
                          disabled
                          className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none cursor-not-allowed"
                        />
                        <MdOutlinePerson className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        البريد الإلكتروني
                      </label>

                      <div className="relative">
                        <input
                          type="email"
                          value="ahmed.alali@example.com"
                          readOnly
                          disabled
                          className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none cursor-not-allowed"
                        />
                        <MdOutlineEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        رقم الهاتف
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="+965 9876 5432"
                          className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-white px-4 pr-10 text-right text-sm outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition"
                        />
                        <MdOutlinePhone className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>

                      <p className="mt-2 text-right text-[11px] text-[#018B8F]">
                        تأكد من صحة الرقم لتلقي تحديثات الكفالة
                      </p>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        الجنس
                      </label>

                      <div className="relative">
                        <select className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-white px-4 pr-10 text-sm outline-none appearance-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition">
                          <option>ذكر</option>
                          <option>أنثى</option>
                        </select>
                        <FaRestroom className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        الدولة
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          value="فلسطين"
                          readOnly
                          disabled
                          className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none cursor-not-allowed"
                        />
                        <IoEarthSharp className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        المدينة
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="مدينة غزة"
                          className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-white px-4 pr-10 text-sm outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition"
                        />
                        <MdOutlineLocationOn className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        المهنة
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="مهندس برمجيات"
                          className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-white px-4 pr-10 text-sm outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition"
                        />
                        <FaUserTie className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        الدخل الشهري التقديري
                      </label>

                      <input
                        type="text"
                        defaultValue="15,000 - 20,000"
                        className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>

                    <div className="w-full md:col-span-2">
                      <label className="block text-right text-[14px] leading-[20px] font-bold text-[#424750] mb-2">
                        تاريخ الميلاد
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          defaultValue="05/15/1985"
                          dir="rtl"
                          className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-white px-4 pr-10 text-right text-sm text-[#424750] outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition"
                        />
                        <MdOutlineCalendarToday className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-2 rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 text-sm text-[#006B70]">
                    <MdInfoOutline className="text-lg shrink-0" />
                    <p className="text-right">
                      سيتم تحديث البيانات المحددة من قبل فريقنا لضمان دقة
                      معلومات الكفالة.
                    </p>
                  </div>

                  <div
                    dir="ltr"
                    className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center gap-3"
                  >
                    <button className="h-[36px] min-w-[132px] px-6 rounded-md bg-[#003469] text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002b57] transition">
                      <MdSave className="text-[14px]" />
                      حفظ التغييرات
                    </button>

                    <button className="h-[36px] min-w-[74px] px px-6 rounded-md border border-[#D0D5DD] bg-white text-[#111827] text-[14px] font-bold hover:bg-gray-50 transition">
                      إلغاء
                    </button>
                  </div>
                </div>
              </section>
              {/* Verification Status Section */}
              <section className="order-3 xl:order-3 w-full max-w-[642px] mx-auto bg-white rounded-xl border border-[#D8DEE8] overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="w-full bg-[#F3F4F5] border-b border-[#D8DEE8] px-4 sm:px-6 py-5 flex items-center justify-between gap-4">
                  <div className="text-right">
                    <h3 className="text-[15px] font-bold text-[#003469] leading-6">
                      حالة وثائق الوصي
                    </h3>

                    <p className="text-[12px] text-[#6B7280] mt-1 leading-5">
                      متابعة حالة التحقق من الوثائق المطلوبة
                    </p>
                  </div>

                  <MdVerified className="text-[24px] text-[#003469] shrink-0" />
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                  <div
                    className={`border rounded-lg px-4 py-3 flex items-start justify-between gap-3 ${currentVerification.color}`}
                  >
                    <div className="text-right">
                      <h4 className="font-bold text-[14px] leading-[20px]">
                        {currentVerification.title}
                      </h4>

                      <p className="mt-1 text-[13px] leading-[22px]">
                        {currentVerification.message}
                      </p>
                    </div>

                    <MdInfoOutline className="text-[20px] shrink-0 mt-1" />
                  </div>

                  {verificationStatus === "Rejected" && (
                    <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-right text-red-700">
                      <div className="flex items-center justify-end gap-2 font-bold text-[14px]">
                        <span>سبب الرفض</span>
                        <MdErrorOutline className="text-[18px]" />
                      </div>

                      <p className="mt-2 text-[13px] leading-[22px]">
                        {rejectionReason}
                      </p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <button className="w-full min-h-[46px] rounded-lg bg-[#003469] text-white text-[13px] sm:text-[14px] font-bold flex items-center justify-center gap-2 px-4 shadow-sm hover:bg-[#002b57] hover:scale-[1.02] transition">
                      <MdDescription className="text-[16px] shrink-0" />
                      <span className="text-center leading-5">
                        الانتقال إلى وثائقي
                      </span>
                    </button>

                    <button className="w-full min-h-[46px] rounded-lg border border-[#D0D5DD] bg-white text-[#111827] text-[13px] sm:text-[14px] font-bold flex items-center justify-center gap-2 px-4 hover:bg-gray-50 hover:scale-[1.02] transition">
                      <MdHome className="text-[10px] shrink-0" />
                      <span className="text-center leading-5">
                        العودة للوحة التحكم
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default GuardianProfile;
