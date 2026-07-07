import { useState } from "react";

import {
  // إدارة القوائم والهيدر
  MdMenu,
  MdDashboard,
  MdPerson,
  MdDescription,
  MdFamilyRestroom,
  MdSettings,
  MdNotificationsNone,
  MdAccountBalanceWallet,
  MdPayments,
  MdPublishedWithChanges,
  MdSentimentSatisfiedAlt,

  // أيقونات الحقول والتوثيق
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
} from "react-icons/md";

import { LuPencil } from "react-icons/lu";
import { FaRestroom, FaUserTie } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";

import Sidebar from "./Sidebar"; 
import personalImage from "../../assets/personal.jpg";

/* ⚙️ الإعدادات العامة ومصدر البيانات الموحد */
const SPONSOR_PROFILE_DATA = {
  name: "أحمد بن فهد العالي",
  email: "ahmed.alali@example.com",
  phone: "+965 9876 5432",
  gender: "ذكر",
  country: "الكويت",
  city: "مدينة الكويت",
  job: "مهندس برمجيات",
  income: "15,000 - 20,000",
  birthDate: "1985-05-12",
  joinDate: "12 يناير 2022",
};

function SponsorProfile() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(SPONSOR_PROFILE_DATA);

  // دالة التعامل مع تغيير المدخلات
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // دالة إلغاء التعديل
  const handleCancel = () => {
    setFormData(SPONSOR_PROFILE_DATA);
    setIsEditing(false);
  };

  // دالة حفظ التعديل
  const handleSave = () => {
    setIsEditing(false);
    // هنا يتم استدعاء الـ API الخاص بحفظ بيانات الكفيل عند الحاجة
  };

  const menuItems = [
    { title: "لوحة التحكم", icon: <MdDashboard />, active: false },
    { title: "ملفي الشخصي", icon: <MdPerson />, active: true },
    { title: "الأيتام المكفولين", icon: <MdSentimentSatisfiedAlt />, active: false },
    { title: "المحفظة والدفعات", icon: <MdAccountBalanceWallet />, active: false },
    { title: "التقارير الدورية", icon: <MdDescription />, active: false },
    { title: "التنبيهات", icon: <MdNotificationsNone />, active: false },
    { title: "الإعدادات", icon: <MdSettings />, active: false },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8fafc] flex overflow-x-hidden font-[Cairo,sans-serif] text-right"
    >
      {/* ============================== Sidebar ============================== */}
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="ملفي الشخصي"
        menuItems={menuItems}
      />

      {/* ====================== Main Content Body ======================== */}
      <div className="flex-1 min-w-0 w-full lg:mr-[255px] flex flex-col justify-between">
        
        {/* ---------------------------- Top Navbar ---------------------------- */}
        <header className="w-full h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#424750] hover:bg-gray-50 transition shrink-0 cursor-pointer"
            >
              <MdMenu className="text-2xl" />
            </button>
            <h1 className="font-bold text-[16px] text-[#003469] truncate">
              ملفي الشخصي - الكفيل
            </h1>
          </div>

          <div dir="ltr" className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src={personalImage}
                alt="صورة الكفيل"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div dir="rtl" className="text-right hidden sm:block">
                <h3 className="font-bold text-[13px] text-[#111827] leading-tight">
                  {formData.name}
                </h3>
                <p className="text-[11px] text-gray-500">كفيل معتمد</p>
              </div>
            </div>
            <div className="w-px h-6 bg-[#D8DEE8]" />
            <button className="relative w-8 h-8 flex items-center justify-center text-[#111827] hover:bg-gray-50 rounded-lg transition cursor-pointer">
              <MdNotificationsNone className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
          </div>
        </header>

        {/* =================================================================== */}
        {/* 🖥️ DESKTOP VIEW (شاشات الكمبيوتر) */}
        {/* =================================================================== */}
        <main className="hidden lg:block p-6 flex-1">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[309px_1fr] gap-6 items-stretch">
              
              {/* العمود الأيمن (كارت التعريف المحدث المماثل لـ image_3653ea.png + كارت الأمان) */}
              <div className="flex flex-col gap-5 order-2 lg:order-1 h-full">
                
                {/* 🌟 كارت الهوية المحدث للكفيل بأسلوب الصفوف الأنيقة */}
                <section className="w-full bg-white rounded-[12px] border border-[#C2C6D2] shadow-sm overflow-hidden shrink-0">
                  <div className="h-[96px] bg-[#003469]" />
                  <div className="px-5 pb-6 text-center -mt-12">
                    <img
                      src={personalImage}
                      alt="Sponsor Avatar"
                      className="w-[92px] h-[92px] mx-auto rounded-full border-4 border-white shadow-sm object-cover bg-white"
                    />
                    <h3 className="mt-3.5 font-bold text-[16px] text-[#111827]">
                      {formData.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-gray-500 leading-relaxed">
                      عضو في كفيلي منذ عامين، ساهم في كفالة 5 أطفال
                    </p>

                    {/* القائمة المنظمة على شكل صفوف خلفية هادئة */}
                    <div className="mt-5 flex flex-col gap-2 text-[13px]">
                      {/* صف حالة الحساب */}
                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium">حالة الحساب</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold text-[12px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-1" /> نشط
                        </span>
                      </div>

                      {/* صف البريد الإلكتروني */}
                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium">البريد الإلكتروني</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003469] font-bold text-[12px]">
                          <MdCheckCircle className="text-blue-500" /> موثق
                        </span>
                      </div>

                      {/* صف تاريخ الانضمام */}
                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium flex items-center gap-1">
                          <MdStars className="text-amber-500 text-base" /> الانضمام
                        </span>
                        <span className="font-bold text-gray-700 text-[12px]">
                          {formData.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* كارت أمن الحساب */}
                <section className="w-full bg-white rounded-[12px] border border-[#C2C6D2] shadow-sm p-6 flex flex-col justify-center flex-1">
                  <div className="space-y-4">
                    <h3 className="font-bold text-[16px] text-[#003469] flex items-center gap-2">
                      <MdLockReset className="text-xl" /> أمن الحساب
                    </h3>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      ينصح بتغيير كلمة المرور كل 3 أشهر لضمان أعلى درجات الأمان.
                    </p>
                  </div>
                  <button className="w-full mt-6 py-2.5 border border-[#003469] text-[#003469] rounded-lg font-bold text-[14px] hover:bg-[#003469] hover:text-white transition flex items-center justify-center gap-2 cursor-pointer">
                    <MdLock /> تحديث كلمة المرور
                  </button>
                </section>
              </div>

              {/* العمود الأيسر (نموذج الحقول الكاملة المنسقة كما في image_3653ea.png) */}
              <div className="order-1 lg:order-2 h-full">
                <section className="w-full h-full bg-white rounded-xl border border-[#D8DEE8] overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="w-full bg-[#F3F4F5] border-b border-[#D8DEE8] px-6 py-4 flex items-center justify-between shrink-0">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#003469]">
                        تعديل البيانات الشخصية
                      </h3>
                      <p className="text-[12px] text-[#6B7280] mt-0.5">
                        تحديث معلومات التواصل ومكان الإقامة
                      </p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="h-9 px-4 bg-[#003469] text-white rounded-md flex items-center gap-2 text-[13px] font-medium hover:bg-[#002b57] transition cursor-pointer"
                      >
                        <span>تعديل البيانات</span>
                        <LuPencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-6 space-y-5 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      
                      {/* الاسم الكامل */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#424750]">
                          الاسم الكامل (غير قابل للتعديل)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.name}
                            readOnly
                            disabled
                            className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none cursor-not-allowed"
                          />
                          <MdOutlinePerson className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      {/* البريد الإلكتروني */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#424750]">
                          البريد الإلكتروني (غير قابل للتعديل)
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            readOnly
                            disabled
                            dir="ltr"
                            className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] pl-10 pr-10 text-left text-sm text-gray-500 outline-none cursor-not-allowed"
                          />
                          <MdOutlineEmail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      {/* رقم الهاتف */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          رقم الهاتف
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          />
                          <MdOutlinePhone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      {/* الجنس */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          الجنس
                        </label>
                        <div className="relative">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none appearance-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                          </select>
                          <FaRestroom className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                        </div>
                      </div>

                      {/* الدولة */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          الدولة
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.country}
                            readOnly
                            disabled
                            className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none cursor-not-allowed"
                          />
                          <IoEarthSharp className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      {/* المدينة */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          المدينة
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          />
                          <MdOutlineLocationOn className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      {/* المهنة */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          المهنة
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="job"
                            value={formData.job}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          />
                          <FaUserTie className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                        </div>
                      </div>

                      {/* الدخل الشهري التقديري */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          الدخل الشهري التقديري
                        </label>
                        <input
                          type="text"
                          name="income"
                          value={formData.income}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full h-11 rounded-lg border px-4 text-sm outline-none transition ${
                            isEditing
                              ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                              : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                          }`}
                        />
                      </div>

                      {/* تاريخ الميلاد */}
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          تاريخ الميلاد
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          />
                          <MdOutlineCalendarToday className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 text-sm text-[#006B70]">
                      <MdInfoOutline className="text-lg shrink-0" />
                      <p>
                        سيتم تدقيق البيانات المحدثة من قبل فريقنا لضمان دقة معلومات الكفالة.
                      </p>
                    </div>

                    {/* أزرار الإجراءات للديسكتوب */}
                    <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-3">
                      <button
                        onClick={handleSave}
                        disabled={!isEditing}
                        className={`h-9 px-5 rounded-md text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm transition ${
                          isEditing
                            ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                            : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                      >
                        <MdSave /> حفظ التغييرات
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={!isEditing}
                        className={`h-9 px-5 rounded-md border text-[13px] font-bold transition ${
                          isEditing
                            ? "border-[#D0D5DD] bg-white text-slate-600 hover:bg-gray-50 cursor-pointer"
                            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        {/* =================================================================== */}
        {/* 📱 MOBILE VIEW (شاشات الموبايل) */}
        {/* =================================================================== */}
        <main className="lg:hidden p-4 space-y-5 flex-1 bg-[#f8fafc]">
          
          {/* 🌟 كارت الهوية المحدث المخصص للموبايل */}
          <section className="w-full bg-white rounded-xl border border-[#C2C6D2] shadow-sm overflow-hidden">
            <div className="h-24 bg-[#003469]" />
            <div className="px-5 pb-5 text-center -mt-11">
              <img
                src={personalImage}
                alt="Sponsor Avatar Mobile"
                className="w-[92px] h-[92px] mx-auto rounded-full border-4 border-white shadow-sm object-cover bg-white"
              />
              <h3 className="mt-3 font-bold text-[16px] text-[#111827]">
                {formData.name}
              </h3>
              <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                عضو في كفيلي منذ عامين، ساهم في كفالة 5 أطفال
              </p>

              {/* عناصر الصفوف للموبايل */}
              <div className="mt-4 flex flex-col gap-2 text-[13px] text-right">
                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium">حالة الحساب</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold text-[12px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-1" /> نشط
                  </span>
                </div>

                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium">البريد الإلكتروني</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003469] font-bold text-[12px]">
                    <MdCheckCircle className="text-blue-500" /> موثق
                  </span>
                </div>

                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <MdStars className="text-amber-500 text-base" /> الانضمام
                  </span>
                  <span className="font-bold text-gray-700 text-[12px]">
                    {formData.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* كارت أمن الحساب للموبايل */}
          <section className="w-full bg-white rounded-xl border border-[#C2C6D2] p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-[15px] text-[#003469] flex items-center gap-2">
              <MdLockReset className="text-xl" /> أمن الحساب
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed">
              ينصح بتغيير كلمة المرور كل 3 أشهر لحماية حسابك.
            </p>
            <button className="w-full py-2 border border-[#003469] text-[#003469] rounded-lg font-bold text-[13px] hover:bg-[#003469] hover:text-white transition flex items-center justify-center gap-2 cursor-pointer">
              <MdLock /> تحديث كلمة المرور
            </button>
          </section>

          {/* نموذج البيانات الشخصية للموبايل */}
          <section className="w-full bg-white rounded-xl border border-[#D8DEE8] p-5 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[16px] text-[#003469]">
                  تعديل البيانات الشخصية
                </h3>
                <p className="text-[12px] text-[#6B7280] mt-0.5">
                  تحديث معلومات التواصل والإقامة
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[13px] font-bold text-[#003469] flex items-center gap-1 cursor-pointer"
                >
                  <LuPencil /> تعديل
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#424750]">
                  الاسم الكامل (غير قابل للتعديل)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    readOnly
                    disabled
                    className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none"
                  />
                  <MdOutlinePerson className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#424750]">
                  البريد الإلكتروني (غير قابل للتعديل)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] pl-10 pr-10 text-left text-sm text-gray-500 outline-none"
                    dir="ltr"
                  />
                  <MdOutlineEmail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#003469]">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                      isEditing
                        ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                        : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                    }`}
                  />
                  <MdOutlinePhone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#003469]">
                    الجنس
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none appearance-none transition ${
                        isEditing
                          ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                          : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">أنثى</option>
                    </select>
                    <FaRestroom className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#003469]">
                    تاريخ الميلاد
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                        isEditing
                          ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                          : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                      }`}
                    />
                    <MdOutlineCalendarToday className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#003469]">
                  المهنة
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="job"
                    value={formData.job}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                      isEditing
                        ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                        : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                    }`}
                  />
                  <FaUserTie className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#003469]">
                    الدولة
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.country}
                      readOnly
                      disabled
                      className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500"
                    />
                    <IoEarthSharp className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#003469]">
                    المدينة
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                        isEditing
                          ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                          : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                      }`}
                    />
                    <MdOutlineLocationOn className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#003469]">
                  الدخل الشهري التقديري
                </label>
                <input
                  type="text"
                  name="income"
                  value={formData.income}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={`w-full h-11 rounded-lg border px-4 text-sm outline-none transition ${
                    isEditing
                      ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                      : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                  }`}
                />
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 text-sm text-[#006B70] leading-relaxed">
                <MdInfoOutline className="text-lg shrink-0 mt-0.5" />
                <p>
                  سيتم تدقيق البيانات المحدثة من قبل فريقنا لضمان دقة معلومات الكفالة.
                </p>
              </div>

              {/* أزرار الإجراءات للموبايل */}
              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleSave}
                  disabled={!isEditing}
                  className={`flex-1 h-11 rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm transition ${
                    isEditing
                      ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                      : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <MdSave /> حفظ التغييرات
                </button>
                <button
                  onClick={handleCancel}
                  disabled={!isEditing}
                  className={`h-11 px-5 rounded-lg border text-[13px] font-bold transition ${
                    isEditing
                      ? "border-[#D0D5DD] bg-white text-slate-600 hover:bg-gray-50 cursor-pointer"
                      : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* ---------------------------- Global Footer ---------------------------- */}
        <footer className="w-full h-[54px] bg-white border-t border-[#E5E7EB] flex items-center justify-center px-4 shrink-0 z-10">
          <p className="text-[12px] text-center text-gray-400">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}

export default SponsorProfile;