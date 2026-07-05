import { useState } from "react";
import { FaBolt } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import supportIcon from "../assets/support-icon.png";
import { IoSend } from "react-icons/io5";
import {
  MdMenu,
  MdNotificationsNone,
  MdHelpOutline,
  MdWarningAmber,
  MdLock,
  MdCheckCircle,
  MdCancel,
  MdEmail,
  MdDescription,
  MdEventRepeat,
  MdInfoOutline,
  MdAccountCircle,
  MdFamilyRestroom,
  MdPersonAdd,
  MdPayments,
  MdAccountBalanceWallet,
  MdAccountBalance,
  MdOutlineCalendarToday,
  MdVisibility,
  MdUploadFile,
  MdSentimentSatisfiedAlt,
  MdExtension,
} from "react-icons/md";

import Sidebar from "../components/Sidebar";
import headerImg from "../assets/headerimg.jpg";

function GuardianDashboard() {
  const [openSidebar, setOpenSidebar] = useState(false);

  /*
    الحالات الممكنة:

    emailStatus:
    verified / unverified

    guardianDocumentsStatus:
    not_uploaded / pending / approved / rejected / needs_update

    accountStatus:
    active / suspended
  */

  const emailStatus = "verified";
  const guardianDocumentsStatus = "pending";
  const accountStatus = "active";

  const isDocumentsApproved = guardianDocumentsStatus === "approved";

  const documentStatusMap = {
    not_uploaded: {
      title: "لم يتم الرفع",
      text: "لم يتم رفع وثائق الوصي بعد.",
      color: "text-[#9A6700]",
      bg: "bg-[#FFF4DC]",
      border: "border-[#F5C77B]",
      icon: MdWarningAmber,
    },

    pending: {
      title: "قيد المراجعة",
      text: "وثائقك قيد المراجعة من الإدارة.",
      color: "text-[#9A6700]",
      bg: "bg-[#FFF4DC]",
      border: "border-[#F5C77B]",
      icon: MdWarningAmber,
    },

    approved: {
      title: "معتمدة",
      text: "تم اعتماد وثائق الوصي من الإدارة.",
      color: "text-[#018B8F]",
      bg: "bg-[#DDFBFB]",
      border: "border-[#9EE8E8]",
      icon: MdCheckCircle,
    },

    rejected: {
      title: "مرفوضة",
      text: "تم رفض الوثائق، يرجى مراجعة السبب ورفع الوثائق من جديد.",
      color: "text-[#B42318]",
      bg: "bg-[#FEF3F2]",
      border: "border-[#FDA29B]",
      icon: MdCancel,
    },

    needs_update: {
      title: "تحتاج تعديل",
      text: "يجب تحديث بعض الوثائق المطلوبة.",
      color: "text-[#9A6700]",
      bg: "bg-[#FFF4DC]",
      border: "border-[#F5C77B]",
      icon: MdWarningAmber,
    },
  };

  const currentDocumentStatus = documentStatusMap[guardianDocumentsStatus];
  const DocumentIcon = currentDocumentStatus.icon;

  const statusCards = [
    {
      title: "حالة البريد الإلكتروني",
      value: emailStatus === "verified" ? "موثق" : "غير موثق",
      description:
        emailStatus === "verified"
          ? "تم توثيق البريد الإلكتروني."
          : "يرجى توثيق البريد الإلكتروني.",
      icon: MdEmail,
      bg: emailStatus === "verified" ? "bg-[#DDFBFB]" : "bg-[#FFF4DC]",
      color: emailStatus === "verified" ? "text-[#018B8F]" : "text-[#9A6700]",
      border:
        emailStatus === "verified" ? "border-[#9EE8E8]" : "border-[#F5C77B]",
    },

    {
      title: "حالة وثائق الوصي",
      value: currentDocumentStatus.title,
      description: currentDocumentStatus.text,
      icon: MdDescription,
      bg: currentDocumentStatus.bg,
      color: currentDocumentStatus.color,
      border: currentDocumentStatus.border,
    },

    {
      title: "حالة الحساب",
      value: accountStatus === "active" ? "نشط" : "موقوف",
      description:
        accountStatus === "active"
          ? "الحساب يعمل بشكل طبيعي."
          : "تم إيقاف الحساب من قبل الإدارة.",
      icon: MdAccountCircle,
      bg: accountStatus === "active" ? "bg-[#DDFBFB]" : "bg-[#FEF3F2]",
      color: accountStatus === "active" ? "text-[#018B8F]" : "text-[#B42318]",
      border:
        accountStatus === "active" ? "border-[#9EE8E8]" : "border-[#FDA29B]",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f5f6f8] flex overflow-x-hidden font-[Cairo,sans-serif]"
    >
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="لوحة التحكم"
      />

      <div className="flex-1 min-w-0 w-full lg:mr-[255px]">
        <header className="w-full h-[56px] lg:h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 lg:px-16 opacity-100">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#424750] hover:bg-gray-100 transition shrink-0 cursor-pointer"
            >
              <MdMenu className="text-2xl" />
            </button>

            <h1 className="font-[Cairo] font-bold text-[14px] sm:text-[16px] leading-[24px] text-right text-[#003469] truncate">
              لوحة التحكم
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
        <main className="w-full bg-[#f5f6f8] px-4 sm:px-6 lg:px-8 py-6 pb-12 overflow-x-hidden">
          <div className="w-full max-w-[1120px] mx-auto space-y-5">
            {/* Welcome Section */}
            {/* Welcome Section */}
            <section className="bg-[#003469] rounded-[12px] p-4 sm:p-5 text-white shadow-sm">
              <div className="flex flex-col lg:flex-row-reverse lg:items-center lg:justify-between gap-4">
                {/* Status Boxes */}
                <div className="grid grid-cols-3 gap-3 shrink-0 w-full lg:w-auto">
                  <div className="min-h-[72px] lg:w-[110px] rounded-[10px] bg-[#174C83] text-white flex flex-col items-center justify-center gap-1 text-center">
                    <span className="text-[12px] font-bold">بريد إلكتروني</span>
                    <span className="text-[12px] font-bold flex items-center gap-1">
                      موثق
                      <MdCheckCircle className="text-[15px]" />
                    </span>
                  </div>
                  <div className="min-h-[72px] lg:w-[110px] rounded-[10px] bg-[#8A6500] text-white flex flex-col items-center justify-center gap-1 text-center">
                    <span className="text-[12px] font-bold">المستندات</span>
                    <span className="text-[12px] font-bold flex items-center gap-1">
                      قيد المراجعة
                      <MdHistory className="text-[15px]" />
                    </span>
                  </div>
                  <div className="min-h-[72px] lg:w-[110px] rounded-[10px] bg-[#7BE4E8] text-[#003469] flex flex-col items-center justify-center gap-1 text-center">
                    <span className="text-[12px] font-bold">الحساب</span>
                    <span className="text-[12px] font-bold flex items-center gap-1">
                      نشط
                      <FaBolt className="text-[15px]" />
                    </span>
                  </div>
                </div>
                {/* Text */}
                <div className="text-right flex-1">
                  <h2 className="font-[Cairo] font-bold text-[14px] sm:text-[16px] leading-7">
                    مرحبًا أحمد محمد
                  </h2>

                  <p className="text-white/80 text-[12px] sm:text-[13px] leading-6 mt-1 max-w-[520px]">
                    أهلاً بك في لوحة تحكم الوصي في كفيلي. نتمنى لك يومًا مليئًا
                    بالخير والعطاء.
                  </p>
                </div>
              </div>
            </section>
            {/* Alert يظهر إذا الوثائق غير معتمدة */}
            {!isDocumentsApproved && (
              <section className="rounded-[12px] border border-[#F5C77B] bg-[#FFF4DC] px-4 py-4 flex items-start gap-3 text-right shadow-sm">
                <MdWarningAmber className="text-[#9A6700] text-[24px] shrink-0 mt-1" />

                <div>
                  <h3 className="font-[Cairo] font-bold text-[14px] text-[#7A4D00]">
                    تنبيه: بانتظار اعتماد الوثائق
                  </h3>

                  <p className="mt-1 text-[12px] leading-6 text-[#7A5B15]">
                    وثائقك لم تعتمد بعد. يرجى رفع الوثائق المطلوبة وانتظار
                    مراجعة الإدارة حتى تتمكن من إضافة العائلات والأيتام.
                  </p>
                </div>
              </section>
            )}
            {/* Status Cards */}
            {/* Stats */}
            <section
              dir="rtl"
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              {/* Families Card - left */}
              <div
                dir="rtl"
                className="bg-white rounded-[12px] border border-[#D8DEE8] p-5 shadow-sm"
              >
                <div className="flex flex-col items-center justify-center text-center min-h-[82px]">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#EEF4FB] flex items-center justify-center mb-3">
                    <MdFamilyRestroom className="text-[22px] text-[#003469]" />
                  </div>

                  <p className="text-[12px] text-[#6B7280] font-[Cairo]">
                    إجمالي العائلات
                  </p>

                  <h3 className="text-[16px] font-bold text-[#111827] mt-1">
                    0
                  </h3>
                </div>
              </div>

              {/* Orphans Card - middle */}
              <div
                dir="rtl"
                className="bg-white rounded-[12px] border border-[#D8DEE8] p-5 shadow-sm"
              >
                <div className="flex flex-col items-center justify-center text-center min-h-[82px]">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#E6FAFA] flex items-center justify-center mb-3">
                    <MdSentimentSatisfiedAlt className="text-[22px] text-[#018B8F]" />
                  </div>

                  <p className="text-[12px] text-[#6B7280] font-[Cairo]">
                    إجمالي الأيتام
                  </p>

                  <h3 className="text-[16px] font-bold text-[#111827] mt-1">
                    0
                  </h3>
                </div>
              </div>

              {/* Wallet Card - right */}
              <div
                dir="ltr"
                className="md:col-span-2 bg-white rounded-[12px] border border-[#D8DEE8] p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-[#F3F0E8] flex items-center justify-center shrink-0">
                    <MdAccountBalanceWallet className="text-[22px] text-[#7A5B15]" />
                  </div>

                  <div className="flex-1 text-right">
                    <p className="text-[12px] text-[#6B7280] font-[Cairo]">
                      بانتظار التحويل
                    </p>

                    <h3 className="text-[14px] font-bold text-[#003469] mt-1">
                      ILS 0.00
                    </h3>
                  </div>

                  <div className="w-px h-[40px] bg-[#E5E7EB]"></div>

                  <div className="flex-1 text-right">
                    <p className="text-[12px] text-[#6B7280] font-[Cairo]">
                      الرصيد المتاح
                    </p>

                    <h3 className="text-[14px] font-bold text-[#003469] mt-1">
                      ILS 0.00
                    </h3>
                  </div>
                </div>
              </div>
            </section>
            {/* Document Status Bar */}
            {/* Next Periodic Update */}
            <section className="bg-white rounded-[12px] border border-[#D8DEE8] px-4 sm:px-5 py-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Right Side */}
                <div className="flex items-center gap-3 text-right">
                  <div className="w-[42px] h-[42px] rounded-[10px] bg-[#F3F4F6] flex items-center justify-center shrink-0">
                    <MdEventRepeat className="text-[23px] text-[#6B7280]" />
                  </div>

                  <div>
                    <h3 className="font-[Cairo] font-bold text-[14px] text-[#6B7280]">
                      التحديث الدوري القادم
                    </h3>

                    <p className="font-[Cairo] font-bold text-[13px] text-[#111827] mt-1">
                      لم يحدد بعد
                    </p>
                  </div>
                </div>

                {/* Left Side */}
                <div className="flex items-center gap-2 text-[#9CA3AF] text-[12px] font-[Cairo]">
                  <span>بانتظار رفع الوثائق لتحديد المواعيد</span>
                  <MdInfoOutline className="text-[18px]" />
                </div>
              </div>
            </section>
            {/* Quick Actions */}
            <section className="bg-white rounded-[12px] border border-[#D8DEE8] p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-[Cairo] font-bold text-[14px] text-[#003469]">
                  إجراءات سريعة
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {/* رفع وثائق الوصي */}
                <button
                  type="button"
                  className="min-h-[112px] rounded-[12px] bg-[#003469] text-white border border-[#003469] flex flex-col items-center justify-center gap-3 text-[13px] font-bold transition hover:opacity-90 cursor-pointer"
                >
                  <MdUploadFile className="text-[34px]" />
                  <span>رفع وثائق الوصي</span>
                </button>

                {/* إضافة عائلة - Disabled */}
                <button
                  type="button"
                  disabled
                  className="relative min-h-[112px] rounded-[12px] bg-[#F8F9FA] text-[#C2C6D2] border border-dashed border-[#D8DEE8] flex flex-col items-center justify-center gap-3 text-[13px] font-bold cursor-not-allowed"
                >
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                    <MdLock className="text-[13px] text-[#9CA3AF]" />
                  </span>

                  <MdPersonAdd className="text-[34px]" />
                  <span>إضافة عائلة</span>
                </button>

                {/* إضافة يتيم - Disabled */}
                <button
                  type="button"
                  disabled
                  className="relative min-h-[112px] rounded-[12px] bg-[#F8F9FA] text-[#C2C6D2] border border-dashed border-[#D8DEE8] flex flex-col items-center justify-center gap-3 text-[13px] font-bold cursor-not-allowed"
                >
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                    <MdLock className="text-[13px] text-[#9CA3AF]" />
                  </span>

                  <MdSentimentSatisfiedAlt className="text-[34px]" />
                  <span>إضافة يتيم</span>
                </button>

                {/* عرض المحفظة */}
                <button
                  type="button"
                  className="min-h-[112px] rounded-[12px] bg-[#2F7B7E] text-white border border-[#2F7B7E] flex flex-col items-center justify-center gap-3 text-[13px] font-bold transition hover:opacity-90 cursor-pointer"
                >
                  <MdAccountBalanceWallet className="text-[34px]" />
                  <span>عرض المحفظة</span>
                </button>

                {/* إرسال تحديث دوري */}
                <button
                  type="button"
                  className="min-h-[112px] rounded-[12px] bg-white text-[#003469] border-2 border-[#003469] flex flex-col items-center justify-center gap-3 text-[13px] font-bold transition hover:bg-[#F5F8FB] cursor-pointer"
                >
                  <div className="relative w-[42px] h-[42px] flex items-center justify-center">
                    <MdExtension className="text-[42px] text-[#003469]" />
                    <IoSend className="absolute text-[23px] text-[#003469] rotate-180 left-[13px] top-[14px]" />
                  </div>

                  <span>إرسال تحديث دوري</span>
                </button>
              </div>
            </section>
            {/* Help Center + Review Info */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* نحن هنا لمساعدتك */}
              <div className="rounded-[12px] bg-white border border-[#E5E7EB] p-5 shadow-sm">
                <div className="flex items-center justify-between gap-5">
                  <div className="w-[86px] h-[86px] rounded-[8px] bg-[#F3F4F5] flex items-center justify-center shrink-0">
                    <img
                      src={supportIcon}
                      alt="دعم الوصي"
                      className="w-[52px] h-[52px] object-contain"
                    />
                  </div>
                  <div className="text-right flex-1">
                    <h3 className="font-[Cairo] font-bold text-[16px] text-[#424750] mb-3">
                      نحن هنا لمساعدتك
                    </h3>

                    <p className="font-[Cairo] text-[13px] leading-7 text-[#6B7280]">
                      تحقق الإدارة من الوثائق المرفوعة في غضون 24-48 ساعة عمل.
                      بمجرد الاعتماد، ستتمكن من البدء في إضافة العائلات.
                    </p>
                  </div>
                </div>
              </div>
              {/* مركز المساعدة */}
              <div className="rounded-[12px] bg-[#DDFBFB] border border-[#BFEFEF] p-5 shadow-sm">
                <h3 className="font-[Cairo] font-bold text-[16px] text-[#0B6F73] mb-4 text-right">
                  مركز المساعدة للوصي
                </h3>

                <div className="space-y-3 mr-auto ml-0 w-fit pl-26">
                  <button
                    type="button"
                    className="w-fit flex items-center justify-start flex-row-reverse gap-3 text-[#0B6F73] text-[13px] font-bold hover:underline cursor-pointer"
                  >
                    <span>كيفية إضافة وثائق الوصاية؟</span>
                    <MdHelpOutline className="text-[20px] shrink-0" />
                  </button>

                  <button
                    type="button"
                    className="w-fit flex items-center justify-start flex-row-reverse gap-3 text-[#0B6F73] text-[13px] font-bold hover:underline cursor-pointer"
                  >
                    <span>ما هي الوثائق المطلوبة للنظام؟</span>
                    <MdDescription className="text-[20px] shrink-0" />
                  </button>

                  <button
                    type="button"
                    className="w-fit flex items-center justify-start flex-row-reverse gap-3 text-[#0B6F73] text-[13px] font-bold hover:underline cursor-pointer"
                  >
                    <span>دليل استلام المساعدات المالية</span>
                    <MdAccountBalance className="text-[20px] shrink-0" />
                  </button>
                </div>
              </div>
            </section>
          </div>
        </main>
        <footer className="w-full h-[108px] bg-white border-t border-[#C2C6D2] flex items-center justify-center px-4">
          <p className="font-[Cairo] font-normal text-[12px] leading-[20px] text-center text-[#6B7280]">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}

export default GuardianDashboard;
