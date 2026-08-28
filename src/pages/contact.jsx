import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPaperPlane,
  FaClock,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

import Header from "./header";
import Footer from "./Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    // سيتم ربطه بالـBackend لاحقًا
    console.log("Contact form:", formData);

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "البريد الإلكتروني",
      value: "kafeeli.team@outlook.com",
      description: "نحن هنا للإجابة على استفساراتك",
      color: "#2DBCC3",
    },
    {
      icon: <FaPhone />,
      title: "الهاتف",
      value: "+972592161058",
      description: "من الأحد إلى الخميس",
      color: "#0D4B8E",
    },
  ];

  const supportTypes = [
    {
      icon: <FaHeadset />,
      title: "دعم الكفلاء",
      description:
        "هل لديك استفسار حول الكفالة أو عملية الدفع؟ فريقنا جاهز لمساعدتك.",
    },
    {
      icon: <FaEnvelope />,
      title: "استفسارات المؤسسات",
      description: "للمؤسسات والجمعيات الراغبة في التعاون أو تجربة منصة كفيلي.",
    },
    {
      icon: <FaCheckCircle />,
      title: "الدعم التقني",
      description:
        "واجهت مشكلة أثناء استخدام المنصة؟ تواصل معنا وسنعمل على حلها.",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAFBFD] flex flex-col font-[Cairo,sans-serif] overflow-x-hidden"
    >
      <Header />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0D4B8E]/5 via-[#2DBCC3]/5 to-transparent">
        {/* Decorative Shapes */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#2DBCC3]/10 blur-3xl" />
        <div className="absolute top-40 -right-40 w-96 h-96 rounded-full bg-[#0D4B8E]/5 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-right order-2 lg:order-1"
            >
              <span className="inline-flex items-center gap-2 bg-[#2DBCC3]/10 text-[#0D4B8E] border border-[#2DBCC3]/20 px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-5">
                <FaEnvelope className="text-[#2DBCC3]" />
                نحن هنا لنسمعك
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#0D4B8E] leading-[1.25] mb-6">
                يسعدنا التواصل معك
                <br />
                <span className="text-[#087D84]">ودعم مسيرتك في الخير</span>
              </h1>

              <p className="text-[#75777C] text-base sm:text-lg leading-[2] max-w-xl mb-8">
                نحن في كفيلي نؤمن أن كل طفل يستحق مستقبلًا مشرقًا. فريقنا موجود
                دائمًا للإجابة عن استفساراتك وتقديم الدعم اللازم لضمان تجربة
                موثوقة وآمنة.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-2 bg-[#0D4B8E] hover:bg-[#093A6E] text-white px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg shadow-[#0D4B8E]/15 active:scale-95"
                >
                  <FaPaperPlane />
                  أرسل لنا رسالة
                </a>

                <a
                  href="mailto:support@kafeeli.org"
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-[#2DBCC3] hover:text-[#0D4B8E] text-gray-700 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
                >
                  <FaEnvelope />
                  راسلنا عبر البريد
                </a>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative w-full max-w-[480px]">
                {/* Main Visual Card */}
                <div className="relative bg-white rounded-[2rem] p-4 sm:p-6 shadow-2xl border border-gray-100">
                  {/* Header */}
                  <div className="bg-[#0D4B8E] rounded-2xl p-5 text-white mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#2DBCC3] flex items-center justify-center shadow-lg">
                        <FaHeadset className="text-2xl" />
                      </div>

                      <div>
                        <h3 className="font-black text-lg">فريق كفيلي</h3>
                        <p className="text-white/70 text-xs mt-1">
                          جاهزون لمساعدتك
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Cards */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAFBFD] border border-gray-100">
                      <div className="w-11 h-11 rounded-xl bg-[#2DBCC3]/10 text-[#2DBCC3] flex items-center justify-center shrink-0">
                        <FaEnvelope />
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">
                          البريد الإلكتروني
                        </p>
                        <p className="text-sm font-bold text-gray-800">
                          kafeeli.team@outlook.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAFBFD] border border-gray-100">
                      <div className="w-11 h-11 rounded-xl bg-[#0D4B8E]/10 text-[#0D4B8E] flex items-center justify-center shrink-0">
                        <FaPhone />
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400 mb-1">الهاتف</p>
                        <p
                          dir="ltr"
                          className="text-sm font-bold text-gray-800"
                        >
                          +972 592 161 058
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="mt-5 flex items-center justify-between bg-[#2DBCC3]/5 border border-[#2DBCC3]/10 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-[#2DBCC3] rounded-full animate-pulse" />
                      <span className="text-xs font-bold text-[#0D4B8E]">
                        فريق الدعم متاح
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Decoration */}
                <div className="absolute -top-5 -left-5 w-14 h-14 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center text-[#D9A441] rotate-6">
                  <FaCheckCircle className="text-xl" />
                </div>

                <div className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-[#2DBCC3] shadow-xl flex items-center justify-center text-white">
                  <FaPaperPlane className="text-xl -rotate-12" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>  

      {/* =========================================================
          CONTACT FORM + SIDE PANEL
      ========================================================= */}
      <section
        id="contact-form"
        className="bg-[#FAFBFD] py-16 lg:py-24 border-y border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 border border-gray-100 shadow-lg"
            >
              <div className="mb-8">
                <span className="text-[#2DBCC3] text-xs font-black">
                  تواصل معنا
                </span>

                <h2 className="text-2xl sm:text-3xl font-black text-[#0D4B8E] mt-2 mb-3">
                  أرسل لنا رسالة مباشرة
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed">
                  املأ النموذج وسيتواصل معك فريق كفيلي في أقرب وقت ممكن.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-h-[360px] flex flex-col items-center justify-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#2DBCC3]/10 text-[#2DBCC3] flex items-center justify-center mb-5">
                    <FaCheckCircle className="text-4xl" />
                  </div>

                  <h3 className="text-2xl font-black text-[#0D4B8E] mb-3">
                    تم إرسال رسالتك بنجاح
                  </h3>

                  <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                    شكرًا لتواصلك معنا. سيقوم فريق كفيلي بالرد عليك في أقرب وقت
                    ممكن.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        الاسم الكامل
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="أدخل اسمك الكامل"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#FAFBFD] text-sm outline-none transition-all focus:border-[#2DBCC3] focus:ring-4 focus:ring-[#2DBCC3]/10"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        البريد الإلكتروني
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@domain.com"
                        dir="ltr"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#FAFBFD] text-sm outline-none transition-all focus:border-[#2DBCC3] focus:ring-4 focus:ring-[#2DBCC3]/10 text-left"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        رقم الجوال
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+966 5X XXX XXXX"
                        dir="ltr"
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#FAFBFD] text-sm outline-none transition-all focus:border-[#2DBCC3] focus:ring-4 focus:ring-[#2DBCC3]/10 text-left"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        موضوع الرسالة
                      </label>

                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-[#FAFBFD] text-sm outline-none transition-all focus:border-[#2DBCC3] focus:ring-4 focus:ring-[#2DBCC3]/10 text-gray-600"
                      >
                        <option value="">اختر موضوع الرسالة</option>
                        <option value="sponsorship">استفسار عن الكفالة</option>
                        <option value="payment">استفسار عن الدفع</option>
                        <option value="organization">تعاون مع مؤسسة</option>
                        <option value="technical">مشكلة تقنية</option>
                        <option value="other">موضوع آخر</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      تفاصيل الرسالة
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="كيف يمكننا مساعدتك اليوم؟"
                      className="w-full px-4 py-4 rounded-xl border border-gray-200 bg-[#FAFBFD] text-sm outline-none resize-none transition-all focus:border-[#2DBCC3] focus:ring-4 focus:ring-[#2DBCC3]/10"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-6 w-full h-13 bg-[#0D4B8E] hover:bg-[#093A6E] text-white rounded-xl font-black text-sm transition-all duration-200 shadow-lg shadow-[#0D4B8E]/15 hover:shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaPaperPlane />
                    إرسال الرسالة الآن
                  </button>
                </form>
              )}
            </motion.div>

            {/* Side Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="bg-[#0D4B8E] rounded-[2rem] p-7 sm:p-9 text-white shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-[#2DBCC3] flex items-center justify-center mb-6">
                  <FaHeadset className="text-2xl" />
                </div>

                <h2 className="text-2xl font-black mb-4">
                  كيف يمكننا مساعدتك؟
                </h2>

                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  سواء كنت كفيلًا، وليًا، أو مؤسسة ترغب في التعاون معنا، يسعدنا
                  أن نسمع منك ونساعدك في الوصول إلى الحل المناسب.
                </p>

                <div className="space-y-5">
                  {supportTypes.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-[#2DBCC3] shrink-0">
                        {item.icon}
                      </div>

                      <div>
                        <h3 className="font-bold text-sm mb-1">{item.title}</h3>

                        <p className="text-white/60 text-xs leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 mt-8 pt-6">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-[#2DBCC3]" />

                    <div>
                      <p className="text-xs text-white/50">أوقات الرد</p>

                      <p className="text-sm font-bold mt-1">خلال 24 ساعة</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-5 bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-black text-[#0D4B8E] text-sm mb-4">
                  تابعنا على منصات التواصل
                </h3>

                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/company/135195768/"
                    aria-label="LinkedIn"
                    className="w-11 h-11 rounded-xl bg-[#0D4B8E]/5 text-[#0D4B8E] flex items-center justify-center hover:bg-[#0D4B8E] hover:text-white transition-all"
                  >
                    <FaLinkedinIn />
                  </a>

                  <a
                    href="mailto:support@kafeeli.org"
                    aria-label="Email"
                    className="w-11 h-11 rounded-xl bg-[#2DBCC3]/10 text-[#087D84] flex items-center justify-center hover:bg-[#2DBCC3] hover:text-white transition-all"
                  >
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-l from-[#0D4B8E] to-[#2DBCC3] p-10 sm:p-14 lg:p-16 text-center shadow-xl"
        >
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-5">
              نحن هنا لنساعدك
            </h2>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8">
              لديك سؤال أو فكرة أو ترغب في التعاون مع كفيلي؟ لا تتردد في التواصل
              معنا.
            </p>

            <a
              href="#contact-form"
              className="inline-flex items-center gap-2 bg-white text-[#0D4B8E] hover:bg-gray-100 px-8 py-3.5 rounded-xl font-black text-sm transition-all active:scale-95 shadow-md"
            >
              <FaPaperPlane />
              تواصل معنا الآن
            </a>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
