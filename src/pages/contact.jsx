import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPaperPlane,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaBuilding,
  FaUser,
  FaUsers,
  FaHeadset,
  FaWhatsapp,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaLock,
} from "react-icons/fa";

import Header from "./header";
import Footer from "./Footer";
import heroBg from "../assets/contact-hero.jpg";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "كفيل",
    subjectType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        role: "كفيل",
        subjectType: "",
        message: "",
      });
    }, 4000);
  };

  const pathways = [
    {
      id: "sponsor",
      icon: <FaUser className="text-xl" />,
      iconBg: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
      title: "استفسارات الكفلاء",
      description:
        "لمساعدتك في استخدام المنصة أو متابعة الإجراءات المتعلقة بحساب الكفيل وسجل التبرعات والتفارير الدورية.",
      actionText: "طلب مساعدة كفيل +",
      role: "كفيل",
      subject: "sponsorship",
    },
    {
      id: "guardian",
      icon: <FaUsers className="text-xl" />,
      iconBg: "bg-[#D9A441]/10 text-[#D9A441]",
      title: "استفسارات الأوصياء",
      description:
        "لمساعدتك في التسجيل والمستندات والإجراءات المتعلقة بالأطفال ومتابعة حالة الاستحقاق والدعم.",
      actionText: "طلب مساعدة وصي +",
      role: "وصي",
      subject: "guardian",
    },
    {
      id: "institution",
      icon: <FaBuilding className="text-xl" />,
      iconBg: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
      title: "المؤسسات والشراكات",
      description:
        "للمؤسسات التي ترغب بمعرفة المزيد عن كفيلي أو مناقشة الربط البرمجي وتكامل أنظمة العمل الإنساني.",
      actionText: "تواصل للشراكات +",
      role: "مؤسسة",
      subject: "partnership",
    },
    {
      id: "support",
      icon: <FaHeadset className="text-xl" />,
      iconBg: "bg-[#2DBCC3]/10 text-[#2DBCC3]",
      title: "الدعم التقني",
      description:
        "للإبلاغ عن مشكلة تقنية أو الحصول على مساعدة في استخدام النظام ومزامنة الحساب وتحديث البيانات.",
      actionText: "فتح تذكرة دعم +",
      role: "أخرى",
      subject: "technical",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAFBFD] flex flex-col font-['Cairo',sans-serif] overflow-x-hidden text-right selection:bg-[#2DBCC3] selection:text-white"
    >
      <Header />

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative min-h-[100svh] pt-20 lg:pt-24 pb-12 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="كفيلي تواصل معنا"
            className="w-full h-full object-cover object-center"
          />
          {/* Exact Figma Gradient Overlay: 0% #041730 95%, 63% #072B53 85%, 100% #072B53 0% */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to left, rgba(4, 23, 48, 0.95) 0%, rgba(7, 43, 83, 0.70) 63%, rgba(7, 43, 83, 0) 100%)",
            }}
          />
        </div>

        {/* Hero Decorative Glow */}
        <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#2DBCC3]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#09233F]/90 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-md mb-6"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2DBCC3] animate-pulse" />
              <span>تواصل مع فريق كفيلي</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-6 tracking-tight"
            >
              لديك سؤال؟
              <br />
              <span className="text-[#3BD4DC]">نحن هنا لمساعدتك.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
            >
              سواء كنت كفيلاً، وصياً، تمثل مؤسسة، أو لديك استفسار حول المنصة يمكنك
              التواصل مع فريق كفيلي وسنساعدك في الوصول إلى الجهة المناسبة.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2.5 bg-[#0D4B8E] hover:bg-[#0A3D74] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-[#0D4B8E]/30 active:scale-95 border border-white/10"
              >
                <FaPaperPlane className="" />
                <span>أرسل رسالة</span>
              </a>

              <a
                href="mailto:kafeeli.team@outlook.com"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-100 text-[#0D4B8E] px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md active:scale-95"
              >
                <FaEnvelope className="text-[#2DBCC3]" />
                <span>البريد الإلكتروني</span>
              </a>
            </motion.div>

            {/* Hero Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-15 pt-6 border-t border-white/15 flex flex-wrap items-center gap-8 text-white/90 text-xs sm:text-sm font-medium"
            >
              <div className="flex items-center gap-2.5">
                <FaCheckCircle className="text-[#3BD4DC] text-base" />
                <span>فريق متخصص وواعي باحتياجات الميدان</span>
              </div>

              <div className="flex items-center gap-2.5">
                <FaLock className="text-[#3BD4DC] text-base" />
                <span>خصوصية وأمان تام للبيانات</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: SUPPORT PATHWAYS
      ========================================================= */}
      <section className="bg-white py-16 lg:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-[#2DBCC3]/10 text-[#0D4B8E] border border-[#2DBCC3]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
              مسارات المساعدة المباشرة
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
              كيف يمكننا مساعدتك؟
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              اختر المسار المناسب لاستفسارك لتوجيهك للحل الأسرع والأدق.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#F8FAFC] border border-gray-100 hover:border-[#2DBCC3]/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.iconBg} group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="font-black text-[#0D4B8E] text-lg mb-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <a
                  href="#contact-form"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      role: item.role,
                      subjectType: item.subject,
                    }))
                  }
                  className="text-[#0D4B8E] group-hover:text-[#2DBCC3] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer mt-auto pt-4 border-t border-gray-100"
                >
                  <span>{item.actionText}</span>
                  <FaArrowLeft className="text-[10px] group-hover:-translate-x-1 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: FORM + DIRECT CONTACT CHANNELS
      ========================================================= */}
      <section id="contact-form" className="py-16 lg:py-24 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* RIGHT COLUMN: FORM */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-xl shadow-gray-100/70"
            >
              <div className="mb-8">
                <span className="text-xs font-bold text-[#0D4B8E] bg-[#0D4B8E]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                  نموذج المراسلة السريعة
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0D4B8E] mb-2">
                  أرسل لنا رسالة
                </h2>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  اختر نوع الاستفسار وسنتوجه برسالتك إلى الشخص المناسب.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center flex flex-col items-center justify-center bg-[#F4FDFB] rounded-2xl border border-[#2DBCC3]/30 p-8"
                >
                  <div className="w-16 h-16 rounded-full bg-[#2DBCC3]/20 text-[#2DBCC3] flex items-center justify-center mb-4">
                    <FaCheckCircle className="text-3xl" />
                  </div>

                  <h3 className="text-xl font-black text-[#0D4B8E] mb-2">
                    تم إرسال رسالتك بنجاح!
                  </h3>

                  <p className="text-gray-600 text-sm max-w-md leading-relaxed">
                    شكرًا لتواصلك معنا. سيقوم فريق كفيلي بمراجعة استفسارك والرد
                    عليك في أقرب وقت ممكن.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      الاسم الكامل <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <FaUser className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="أدخل اسمك"
                        className="w-full h-12 pr-11 pl-4 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm text-gray-800 outline-none transition-all focus:border-[#2DBCC3] focus:bg-white focus:ring-4 focus:ring-[#2DBCC3]/10"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                        البريد الإلكتروني <span className="text-red-500">*</span>
                      </label>

                      <div className="relative">
                        <FaEnvelope className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          dir="ltr"
                          placeholder="name@example.com"
                          className="w-full h-12 pr-11 pl-4 text-left rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm text-gray-800 outline-none transition-all focus:border-[#2DBCC3] focus:bg-white focus:ring-4 focus:ring-[#2DBCC3]/10"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                        رقم الهاتف <span className="text-gray-400 font-normal">(اختياري)</span>
                      </label>

                      <div className="relative">
                        <FaPhoneAlt className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />

                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          dir="ltr"
                          placeholder="+970 59..."
                          className="w-full h-12 pr-11 pl-4 text-left rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm text-gray-800 outline-none transition-all focus:border-[#2DBCC3] focus:bg-white focus:ring-4 focus:ring-[#2DBCC3]/10"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Role Selector Pills ("أنا *") */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      أنا <span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["كفيل", "وصي", "مؤسسة", "أخرى"].map((roleOption) => {
                        const isActive = formData.role === roleOption;
                        return (
                          <button
                            type="button"
                            key={roleOption}
                            onClick={() => handleRoleSelect(roleOption)}
                            className={`h-11 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center ${isActive
                              ? "bg-[#0D4B8E] text-white shadow-md shadow-[#0D4B8E]/20"
                              : "bg-[#F1F5F9] text-gray-600 hover:bg-gray-200 border border-transparent"
                              }`}
                          >
                            {roleOption}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Subject Dropdown */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      نوع الاستفسار <span className="text-red-500">*</span>
                    </label>

                    <select
                      name="subjectType"
                      value={formData.subjectType}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm text-gray-700 outline-none transition-all focus:border-[#2DBCC3] focus:bg-white focus:ring-4 focus:ring-[#2DBCC3]/10 cursor-pointer"
                    >
                      <option value="">اختر نوع الاستفسار...</option>
                      <option value="sponsorship">استفسار عن كفالة</option>
                      <option value="guardian">استفسارات وإجراءات الوصي</option>
                      <option value="partnership">شراكة وتعاون مؤسسي</option>
                      <option value="technical">مشكلة ودعم تقني</option>
                      <option value="financial">استفسار مالي أو دفعات</option>
                      <option value="other">موضوع آخر</option>
                    </select>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2">
                      الرسالة <span className="text-red-500">*</span>
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="اكتب تفاصيل استفسارك..."
                      className="w-full p-4 rounded-xl border border-gray-200 bg-[#F8FAFC] text-sm text-gray-800 outline-none resize-none transition-all focus:border-[#2DBCC3] focus:bg-white focus:ring-4 focus:ring-[#2DBCC3]/10"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#0D4B8E] hover:bg-[#0A3D74] text-white font-black text-sm rounded-xl transition-all shadow-lg shadow-[#0D4B8E]/20 hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>إرسال الرسالة</span>
                    <FaPaperPlane className="text-xs" />
                  </button>
                </form>
              )}
            </motion.div>

            {/* LEFT COLUMN: DIRECT CONTACT CHANNELS */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-[#2DBCC3] bg-[#2DBCC3]/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                  قنوات الاتصال المتاحة
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0D4B8E] mb-2">
                  تواصل مباشرة
                </h2>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  فريقنا متواجد ومستعد لإجابة عن تساؤلاتك عبر القنوات الرسمية.
                </p>
              </div>

              {/* Direct Card 1: Email */}
              <a
                href="mailto:kafeeli.team@outlook.com"
                className="group bg-[#F4F9FF] border border-[#E0EEFE] hover:border-[#2DBCC3] rounded-2xl p-5 flex items-center justify-between transition-all duration-300 shadow-sm hover:shadow-md block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2DBCC3] text-white flex items-center justify-center text-lg shadow-md shadow-[#2DBCC3]/20 group-hover:scale-105 transition-transform shrink-0">
                    <FaEnvelope />
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold mb-1">
                      البريد الإلكتروني المباشر
                    </p>
                    <p
                      dir="ltr"
                      className="text-sm font-extrabold text-[#0D4B8E] group-hover:text-[#2DBCC3] transition-colors"
                    >
                      kafeeli.team@outlook.com
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#2DBCC3] group-hover:border-[#2DBCC3]/30 transition-all shrink-0">
                  <FaExternalLinkAlt className="text-xs" />
                </div>
              </a>

              {/* Direct Card 2: Phone & WhatsApp */}
              <div className="bg-[#FAFBFD] border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0D4B8E] text-white flex items-center justify-center text-lg shadow-md shadow-[#0D4B8E]/20 shrink-0">
                    <FaPhoneAlt />
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400 font-bold mb-1">
                      رقم الاتصال والواتساب
                    </p>
                    <p
                      dir="ltr"
                      className="text-sm sm:text-base font-extrabold text-[#0D4B8E]"
                    >
                      +970594828270
                    </p>
                  </div>
                </div>

                <div className="pr-16 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500 font-medium">
                    متواجدون لخدمتكم طوال اليوم
                  </p>

                  <a
                    href="https://wa.me/970594020270"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95"
                  >
                    <FaWhatsapp className="text-sm text-emerald-600" />
                    <span>محادثة واتساب</span>
                  </a>
                </div>
              </div>

              {/* Direct Card 3: Location */}
              <div className="bg-[#FAFBFD] border border-gray-200/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-[#D9A441] text-white flex items-center justify-center text-lg shadow-md shadow-[#D9A441]/20 shrink-0">
                  <FaMapMarkerAlt />
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold mb-1">
                    المقر والموقع الجغرافي
                  </p>
                  <p className="text-sm font-extrabold text-[#0D4B8E]">
                    قطاع غزة - فلسطين
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: INSTITUTIONAL CTA BANNER
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0D4B8E] text-white p-8 sm:p-12 lg:p-16 shadow-2xl"
        >
          {/* Decorative Glowing Orbs */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#2DBCC3]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#083463]/50 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl text-right">
              <span className="inline-block bg-white/10 text-[#3BD4DC] border border-white/15 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                حلول مخصصة للمؤسسات | المجمع
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4">
                تمثل مؤسسة؟
              </h2>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-normal">
                إذا كنت تبحث عن طريقة أكثر تنظيماً لإدارة الكفالات ومتابعتها،
                تعرّف على ما تقدمه كفيلي للمؤسسات.
              </p>
            </div>

            <a
              href="/register?type=organization"
              className="inline-flex items-center gap-2.5 bg-[#2DBCC3] hover:bg-[#25B2B9] text-white px-8 py-4 rounded-xl font-black text-sm transition-all duration-200 shadow-lg shadow-[#2DBCC3]/30 active:scale-95 border border-white/10 shrink-0"
            >
              <span>كفيلي للمؤسسات</span>
              <FaArrowLeft className="text-xs" />
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}