import { useState } from "react";
import {
  MdMenu,
  MdClose,
  MdLogout,
  MdSettings,
  MdNotificationsNone,
  MdDashboard,
  MdPerson,
  MdDescription,
  MdFamilyRestroom,
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
  MdVerified,
  MdErrorOutline,
  MdHome,
  MdPhotoCamera,
  MdAccountBalanceWallet,
  MdPayments,
  MdPublishedWithChanges,
} from "react-icons/md";
import Sidebar from "../components/Sidebar";
import { MdSentimentSatisfiedAlt } from "react-icons/md";
import headerImg from "../assets/headerimg.jpg";
import kafeeliLogo from "../assets/kafeeli-removebg-preview1.png";
import { LuPencil } from "react-icons/lu";
import { FaRestroom, FaUserTie } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";

import personalImage from "../assets/personal.jpg";
import TransferDataSection from "../components/TransferDataSection";
function GuardianProfile() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const transferStatus = "approved";
  // جرّبي القيم:
  // "empty"
  // "pendingReview"
  // "needsUpdate"
  // "approved"

  const hasPersonalData = true;
  const hasTransferData = transferStatus !== "empty";

  const transferMobileStatus = {
    empty: {
      label: "غير مضافة",
      badgeClass: "bg-gray-100 text-gray-600",
      title: "تفاصيل التحويل",
      desc: "لم يتم إضافة بيانات التحويل بعد",
    },

    pendingReview: {
      label: "قيد المراجعة",
      badgeClass: "bg-[#FFE7B8] text-[#9A6700]",
      title: "تفاصيل التحويل",
      desc: "تم إرسال بيانات التحويل وهي بانتظار مراجعة الإدارة",
    },

    needsUpdate: {
      label: "يحتاج تعديل",
      badgeClass: "bg-[#FFE7B8] text-[#9A6700]",
      title: "تفاصيل التحويل",
      desc: "تحتاج بيانات التحويل إلى تعديل من قبل المستخدم",
    },

    approved: {
      label: "معتمد",
      badgeClass: "bg-[#DDFBFB] text-[#018B8F]",
      title: "تفاصيل التحويل",
      desc: "تم اعتماد بيانات التحويل من قبل الإدارة",
    },
  };

  const currentTransferMobile = transferMobileStatus[transferStatus];

  const verificationStatus = "Approved";

  const rejectionReason =
    "الوثائق المرفقة غير واضحة أو غير مكتملة. يرجى رفع وثائق جديدة بجودة أعلى.";

  const verificationData = {
    "Not Uploaded": {
      title: "لم يتم رفع الوثائق",
      message: "يرجى رفع الوثائق المطلوبة لبدء عملية التحقق.",
      color: "bg-gray-50 border-gray-200 text-gray-700",
    },
    "Pending Review": {
      title: "قيد المراجعة",
      message: "تم استلام الوثائق وهي الآن قيد المراجعة من قبل الفريق المختص.",
      color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    },
    Approved: {
      title: "تم قبول الوثائق",
      message: "تم التحقق من وثائق الوصي بنجاح.",
      color: "bg-green-50 border-green-200 text-green-700",
    },
    Rejected: {
      title: "حالة الوثائق: مرفوض",
      message:
        "نأسف، الوثائق المرفقة غير واضحة أو غير مكتملة. يرجى رفع وثائق جديدة.",
      color: "bg-red-50 border-red-200 text-red-700",
    },
    "Needs Update": {
      title: "تحتاج الوثائق إلى تحديث",
      message: "يرجى تحديث بعض الوثائق لاستكمال عملية التحقق.",
      color: "bg-orange-50 border-orange-200 text-orange-700",
    },
  };

  const currentVerification = verificationData[verificationStatus];

  const menuItems = [
    {
      title: "لوحة التحكم",
      icon: <MdDashboard />,
      active: false,
    },
    {
      title: "ملفي الشخصي",
      icon: <MdPerson />,
      active: true,
    },
    {
      title: "وثائقي",
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
  const isEmailVerified = true;
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f5f6f8] flex overflow-x-hidden font-[Cairo,sans-serif]"
    >
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="ملفي الشخصي"
      />
      {/* Header + Content */}
      {/* Header + Content */}
      <div className="flex-1 min-w-0 w-full lg:mr-[255px]">
        {/* Header */}
        <header className="w-full h-[56px] lg:h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 lg:px-16 opacity-100">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#424750] hover:bg-gray-100 transition shrink-0 cursor-pointer"
            >
              <MdMenu className="text-2xl" />
            </button>

            <h1 className="font-[Cairo] font-bold text-[14px] sm:text-[16px] leading-[24px] text-right text-[#003469] truncate">
              ملفي الشخصي - الوصي
            </h1>
          </div>

          <div dir="ltr" className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <img
                src={headerImg}
                alt="صورة الكفيل المعتمد"
                className="w-[32px] h-[32px] rounded-full object-cover"
              />
              <div dir="rtl" className="text-right leading-none">
                <h3 className="font-[Cairo] font-bold text-[12px] leading-[16px] text-[#111827]">
                  أحمد العلي
                </h3>

                <p className="font-[Cairo] font-normal text-[10px] leading-[14px] text-[#6B7280]">
                  الكفيل المعتمد
                </p>
              </div>
            </div>

            <div className="w-px h-[28px] bg-[#D8DEE8]"></div>

            <button className="relative w-8 h-8 flex items-center justify-center text-[#111827] hover:bg-gray-100 rounded-lg transition cursor-pointer">
              <MdNotificationsNone className="text-[21px]" />
              <span className="absolute top-[6px] right-[7px] w-[7px] h-[7px] bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        {/* Desktop Main Content - نفس شكل الديسكتوب */}
        <main className="hidden lg:block px-3 sm:px-6 pt-4 pb-6">
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
                    <h3 className="text-[16px] font-bold text-[#003469] leading-6">
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
                          dir="ltr"
                          className="
      w-full h-12
      rounded-lg
      border border-[#D0D5DD]
      bg-[#F9FAFB]
      pl-16 pr-12
      text-left
      text-sm text-gray-500
      outline-none
      cursor-not-allowed
    "
                        />

                        <MdOutlineEmail className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />

                        <MdVerified className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4DA3A3] text-[20px]" />
                      </div>
                    </div>

                    <div className="w-full">
                      <label className="block text-right text-[14px] leading-[20px] font-bold  text-[#003469] mb-2">
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
                      <label className="block text-right  text-[#003469] leading-[20px] font-bold  mb-2">
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
                      <label className="block text-right text-[14px] leading-[20px] font-bold  text-[#003469] mb-2">
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
                      <label className="block text-right text-[14px] leading-[20px] font-bold  text-[#003469] mb-2">
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
                      <label className="block text-right text-[14px] leading-[20px] font-bold  text-[#003469] mb-2">
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
                      <label className="block text-right text-[14px] leading-[20px] font-bold  text-[#003469] mb-2">
                        الدخل الشهري التقديري
                      </label>

                      <input
                        type="text"
                        defaultValue="15,000 - 20,000"
                        className="w-full h-12 rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>

                    <div className="w-full md:col-span-2">
                      <label className="block text-right text-[14px] leading-[20px] font-bold  text-[#003469] mb-2">
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
                    dir="rtl"
                    className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center gap-3"
                  >
                    <button className="h-[36px] min-w-[132px] px-6 rounded-md bg-[#003469] text-white text-[14px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002b57] transition">
                      <MdSave className="text-[14px]" />
                      حفظ التغييرات
                    </button>

                    <button className="h-[36px] min-w-[74px] px-6 rounded-md border border-[#D0D5DD] bg-white text-[#111827] text-[14px] font-bold hover:bg-gray-50 transition">
                      إلغاء
                    </button>
                  </div>
                </div>
              </section>

              {/* Verification Status Section */}
              <section className="order-3 xl:order-3 w-full max-w-[722px] mx-auto bg-white rounded-xl border border-[#D8DEE8] overflow-hidden shadow-sm hover:shadow-md transition">
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

                  <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      className="
      w-full h-[48px]
      rounded-[10px]
      bg-[#003469]
      text-white
      font-[Cairo] font-bold
      text-[10px] sm:text-[10px]
      flex items-center justify-center gap-2
      px-4
      shadow-sm
      hover:bg-[#002B57]
      hover:shadow-md
      hover:-translate-y-[1px]
      active:translate-y-0
      transition-all duration-200
      cursor-pointer
    "
                    >
                      <MdDescription className="text-[18px] shrink-0" />
                      <span className="whitespace-nowrap leading-5">
                        الانتقال إلى وثائقي
                      </span>
                    </button>

                    <button
                      className="
      w-full h-[48px]
      rounded-[10px]
      border border-[#D0D5DD]
      bg-white
      text-[#003469]
      font-[Cairo] font-bold
      text-[10px] sm:text-[10px]
      flex items-center justify-center gap-2
      px-4
      shadow-sm
      hover:bg-[#F5F8FB]
      hover:border-[#003469]
      hover:shadow-md
      hover:-translate-y-[1px]
      active:translate-y-0
      transition-all duration-200
      cursor-pointer
    "
                    >
                      <MdHome className="text-[18px] shrink-0" />
                      <span className="whitespace-nowrap leading-5">
                        العودة للوحة التحكم
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>
        <div className="order-4 xl:order-3 w-full max-w-full overflow-x-hidden px-3 sm:px-6 lg:px-0">
          <TransferDataSection initialStatus="empty" />
        </div>
        {/* Mobile Main Content - شكل الموبايل فقط */}
        <main className="lg:hidden px-2 pt-3 pb-5">
          <div className="w-full max-w-[340px] mx-auto space-y-3">
            {/* Verification Alert */}
            <section className="w-full rounded-[8px] border border-red-200 bg-red-50 p-3 shadow-sm">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                  <MdErrorOutline className="text-[19px]" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-[12px] font-bold text-red-700 leading-5">
                    حالة الوثائق: مرفوض
                  </h3>

                  <p className="text-[10px] text-red-700 leading-4 mt-1">
                    نأسف، الوثائق المرفقة غير واضحة أو غير مكتملة. يرجى رفع
                    وثائق جديدة.
                  </p>

                  <button className="mt-2 w-full h-[30px] rounded-[5px] bg-red-700 text-white text-[10px] font-bold flex items-center justify-center gap-1">
                    <MdDescription className="text-[13px]" />
                    تحديث الوثائق
                  </button>
                </div>
              </div>
            </section>

            {/* Profile Card */}
            <section className="w-full rounded-[8px] border border-[#D8DEE8] bg-white shadow-sm px-4 py-5 text-center">
              <div className="relative w-fit mx-auto">
                <div className="w-[58px] h-[58px] rounded-full bg-[#E8EAEE] border border-[#C8CDD5] flex items-center justify-center">
                  <MdPerson className="text-[34px] text-[#737782]" />
                </div>

                <span className="absolute bottom-0 left-0 w-[20px] h-[20px] rounded-full bg-[#003469] text-white flex items-center justify-center border-2 border-white">
                  <MdPhotoCamera className="text-[10px]" />
                </span>
              </div>

              <h3 className="mt-3 text-[12px] font-bold text-[#252C32] leading-5">
                أحمد محمد عبد الله
              </h3>

              <p className="text-[10px] text-[#6B7280] leading-4">
                تاريخ الانضمام: أكتوبر 2023
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-[5px] bg-[#F3F4F5] px-2 py-2">
                  <p className="text-[9px] text-[#737782] leading-4">
                    حالة الحسابٍ
                  </p>
                  <p className="text-[10px] font-bold text-red-600 leading-4">
                    معلق
                  </p>
                </div>

                <div className="rounded-[5px] bg-[#F3F4F5] px-2 py-2">
                  <p className="text-[9px] text-[#737782] leading-4">
                    نوع الحساب
                  </p>
                  <p className="text-[10px] font-bold text-[#003469] leading-4">
                    وصي
                  </p>
                </div>
              </div>
            </section>

            {/* Basic Info Mobile */}
            <section className="w-full rounded-[8px] border border-[#D8DEE8] bg-white shadow-sm overflow-hidden">
              <div className="px-3 py-3 flex items-center justify-between border-b border-[#EEF0F3]">
                <button className="text-[11px] font-bold text-[#003469] flex items-center gap-1">
                  <LuPencil className="text-[12px]" />
                  تعديل /
                </button>

                <h3 className="text-[12px] font-bold text-[#003469] flex items-center gap-1">
                  <MdOutlinePerson className="text-[14px]" />
                  البيانات الأساسية
                </h3>
              </div>

              <div className="p-3 space-y-3">
                <div>
                  <label className="block text-[9px] text-[#737782] mb-1">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value="أحمد محمد عبد الله الفقي"
                    readOnly
                    className="w-full h-[34px] rounded-[4px] bg-[#F1F2F4] border border-transparent px-2 text-[10px] text-[#424750] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-[#737782] mb-1">
                    البريد الإلكتروني
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value="ahmed.m@example.com"
                      readOnly
                      className="w-full h-[34px] rounded-[4px] bg-[#F1F2F4] border border-transparent px-2 pr-7 text-[10px] text-[#424750] outline-none"
                    />
                    <MdCheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 text-[#018B8F] text-[12px]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] text-[#737782] mb-1">
                      رقم الهاتف
                    </label>
                    <input
                      type="text"
                      value="+966 50 123 4567"
                      readOnly
                      className="w-full h-[34px] rounded-[4px] bg-[#F1F2F4] border border-transparent px-2 text-[9px] text-[#424750] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] text-[#737782] mb-1">
                      تاريخ الميلاد
                    </label>
                    <input
                      type="text"
                      value="1985-05-12"
                      readOnly
                      className="w-full h-[34px] rounded-[4px] bg-[#F1F2F4] border border-transparent px-2 text-[9px] text-[#424750] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] text-[#737782] mb-1">
                    المهنة
                  </label>
                  <input
                    type="text"
                    value="مهندس برمجيات"
                    readOnly
                    className="w-full h-[34px] rounded-[4px] bg-[#F1F2F4] border border-transparent px-2 text-[10px] text-[#424750] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] text-[#737782] mb-1">
                    العنوان
                  </label>
                  <input
                    type="text"
                    value="الرياض حي الياسمين"
                    readOnly
                    className="w-full h-[34px] rounded-[4px] bg-[#F1F2F4] border border-transparent px-2 text-[10px] text-[#424750] outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Security Mobile */}
            <section className="w-full rounded-[8px] border border-[#D8DEE8] bg-white shadow-sm overflow-hidden">
              <div className="px-3 py-3 flex items-center justify-between border-b border-[#EEF0F3]">
                <h3 className="text-[12px] font-bold text-[#003469] flex items-center gap-1">
                  <MdLockReset className="text-[14px]" />
                  أمن الحساب
                </h3>
              </div>

              <div className="p-3 flex items-center justify-between gap-3">
                <div className="text-right">
                  <h4 className="text-[11px] font-bold text-[#252C32]">
                    تغيير كلمة المرور
                  </h4>
                  <p className="text-[9px] text-[#737782] mt-1">
                    آخر تحديث قبل شهر
                  </p>
                </div>

                <button className="h-[32px] px-3 rounded-[4px] border border-[#003469] text-[#003469] text-[10px] font-bold">
                  تحديث
                </button>
              </div>
            </section>
          </div>
        </main>
        {/* Footer */}
        <footer className="w-full h-[108px] bg-white border-t border-[#C2C6D2] flex items-center justify-center px-4">
          <p className="font-[Cairo] font-normal text-[12px] leading-[20px] text-center text-[#6B7280]">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}

export default GuardianProfile;
