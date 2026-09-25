import { motion } from "framer-motion";
import {
  FaBuilding,
  FaUserPlus,
  FaShieldAlt,
  FaUsers,
  FaFileContract,
  FaChartLine,
  FaExchangeAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaLock,
  FaSyncAlt,
  FaBolt,
  FaShieldVirus,
  FaRegCheckCircle,
  FaExternalLinkAlt,
  FaHeadset,
  FaFileAlt,
  FaCheck,
} from "react-icons/fa";
import { LuLayers, LuSparkles, LuZap, LuShieldCheck } from "react-icons/lu";

import Header from "./header";
import Footer from "./Footer";
import orgHeroBg from "../assets/org-hero.jpg";

export default function Organizations() {
  // Services / Features List (6 Core Modules)
  const systemServices = [
    {
      id: "case-management",
      icon: <FaUserPlus className="text-xl" />,
      iconBg: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
      title: "إدارة الحالات",
      description:
        "تسجيل الأيتام والأسر وتنظيم بياناتهم المستندية والديموغرافية بدقة عالية وبخطوات مبسطة.",
      actionText: "إدارة الأيتام والحالات",
      badge: "دقة 100%",
    },
    {
      id: "guardian-management",
      icon: <FaShieldAlt className="text-xl" />,
      iconBg: "bg-[#2DBCC3]/10 text-[#2DBCC3]",
      title: "إدارة الأوصياء",
      description:
        "ربط الأوصياء وتوثيق المستندات وحالة الاستحقاق وتحديث البيانات بشكل دوري وموثق.",
      actionText: "إدارة الأوصياء",
      badge: "توثيق آمن",
    },
    {
      id: "sponsor-management",
      icon: <FaUsers className="text-xl" />,
      iconBg: "bg-[#D9A441]/10 text-[#D9A441]",
      title: "إدارة الكفلاء",
      description:
        "متابعة سجل الكفالات وتخصيص الكفلاء للأيتام مع أتمتة الإشعارات والتنبيهات المباشرة.",
      actionText: "متابعة الكفلاء",
      badge: "أتمتة كاملة",
    },
    {
      id: "document-review",
      icon: <FaFileContract className="text-xl" />,
      iconBg: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
      title: "مراجعة المستندات",
      description:
        "تدقيق إثباتات السداد وصكوك الولاية والشهادات الرسمية بيسر مع نظام اعتماد متكامل.",
      actionText: "مركز تدقيق الوثائق",
      badge: "اعتماد سريع",
    },
    {
      id: "sponsorship-tracking",
      icon: <FaChartLine className="text-xl" />,
      iconBg: "bg-[#2DBCC3]/10 text-[#2DBCC3]",
      title: "متابعة الكفالات",
      description:
        "لوحة تحكم لتتبع الحالة المالية والدفعات الدورية والتحويلات المالية بشفافية تامة.",
      actionText: "تقارير وحالات الكفالة",
      badge: "تقارير حية",
    },
    {
      id: "payouts-transfers",
      icon: <FaExchangeAlt className="text-xl" />,
      iconBg: "bg-[#D9A441]/10 text-[#D9A441]",
      title: "التحويلات",
      description:
        "إدارة الحوالات وسندات الصرف والتحقق من وصول الدعم للمستحقين دون أي تأخير.",
      actionText: "سجل التحويلات",
      badge: "مزامنة مباشرة",
    },
  ];

  // Workflow Steps with Distinct Colorful Badges (6 Sequential Steps)
  const workflowSteps = [
    {
      number: "1",
      title: "إضافة الحالة",
      desc: "تسجيل بيانات اليتيم والمستندات الرسمية المعتمدة.",
      numBg: "bg-[#0D4B8E] shadow-[#0D4B8E]/30 text-white",
      hoverBorder: "hover:border-[#0D4B8E]/50",
    },
    {
      number: "2",
      title: "مراجعة المستندات",
      desc: "التدقيق والتأكد من قبل فريق المؤسسة المختص.",
      numBg: "bg-[#2DBCC3] shadow-[#2DBCC3]/30 text-white",
      hoverBorder: "hover:border-[#2DBCC3]/50",
    },
    {
      number: "3",
      title: "إتاحة الكفالة",
      desc: "عرض الحالة للكفلاء المعنيين على المنصة.",
      numBg: "bg-[#D9A441] shadow-[#D9A441]/30 text-white",
      hoverBorder: "hover:border-[#D9A441]/50",
    },
    {
      number: "4",
      title: "مطابقة الدعم",
      desc: "ربط الكفيل مع الحالة المحددة وتوثيق التحويل.",
      numBg: "bg-[#10B981] shadow-[#10B981]/30 text-white",
      hoverBorder: "hover:border-[#10B981]/50",
    },
    {
      number: "5",
      title: "التوثيق والتقارير",
      desc: "إصدار إثباتات السداد والتقارير الدورية المعتمدة.",
      numBg: "bg-[#8B5CF6] shadow-[#8B5CF6]/30 text-white",
      hoverBorder: "hover:border-[#8B5CF6]/50",
    },
    {
      number: "6",
      title: "المتابعة والتقييم",
      desc: "تحديث مستمر لحالة الكفالة وضمان أقصى شفافية.",
      numBg: "bg-[#F59E0B] shadow-[#F59E0B]/30 text-white",
      hoverBorder: "hover:border-[#F59E0B]/50",
    },
  ];

  // Institutional Features Grid (4 Pillars)
  const institutionalFeatures = [
    {
      icon: <LuSparkles className="text-2xl text-[#2DBCC3]" />,
      title: "نظام معياري",
      desc: "نظام موحد وسهل الاستخدام يغطي كافة احتياجات العمل الخيري الميداني والتقني.",
      borderColor: "hover:border-[#2DBCC3]/40",
    },
    {
      icon: <LuZap className="text-2xl text-[#D9A441]" />,
      title: "سرعة في الإجراءات",
      desc: "تسريع التسجيل والاعتماد ومتابعة الدفعات بخطوات بسيطة ومؤتمتة بالكامل.",
      borderColor: "hover:border-[#D9A441]/40",
    },
    {
      icon: <LuShieldCheck className="text-2xl text-[#0D4B8E]" />,
      title: "اعتمادية ومصداقية",
      desc: "أمان عالٍ في البيانات وتوثيق شفاف لجميع المعاملات المالية والتقارير المستندية.",
      borderColor: "hover:border-[#0D4B8E]/40",
    },
    {
      icon: <FaLock className="text-2xl text-[#2DBCC3]" />,
      title: "دعم وأمان",
      desc: "بيئة محمية بالكامل وفق أعلى معايير الأمان والخصوصية وحماية البيانات والأدوار.",
      borderColor: "hover:border-[#2DBCC3]/40",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAFBFD] flex flex-col font-['Cairo',sans-serif] overflow-x-hidden text-right selection:bg-[#2DBCC3] selection:text-white"
    >
      <Header />

      {/* =========================================================
          HERO SECTION: FULL-SCREEN (MIN-H-[100SVH]) NO WHITE SPACE
      ========================================================= */}
      <section className="relative min-h-[100svh] min-h-screen pt-20 lg:pt-24 pb-12 flex items-center justify-center overflow-hidden">
        {/* Full-Bleed Background Image with Dark Blue Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={orgHeroBg}
            alt="شبكة كفيلي للمؤسسات"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Rich Dark Blue Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(4, 23, 48, 0) 25%, rgba(7, 43, 83, 0.8) 55%, rgba(4, 23, 48, 0.96) 100%)",
            }}
          />
        </div>

        {/* Hero Glowing Orbs */}
        <div className="absolute top-12 right-12 w-96 h-96 rounded-full bg-[#2DBCC3]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#0D4B8E]/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-right my-auto">
          <div className="max-w-3xl mx-auto lg:mx-0">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#09233F]/90 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg mb-6"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2DBCC3] animate-pulse" />
              <span>خاص للمؤسسات</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.2] mb-6 tracking-tight"
            >
              إدارة الكفالات،
              <br />
              <span className="text-[#3BD4DC]">في نظام واحد</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
            >
              نظام رقمي متكامل يتيح للمؤسسات إدارة بيانات الأيتام والكفلاء،
              متابعة الحوالات والتقارير، وأتمتة العمليات بسهولة وأمان.
            </motion.p>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <a
                href="/register?type=organization"
                className="inline-flex items-center gap-2.5 bg-[#2DBCC3] hover:bg-[#25B2B9] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-[#2DBCC3]/30 active:scale-95 border border-white/10"
              >
                <span>إنشاء حساب مؤسسة</span>
                <FaArrowLeft className="text-xs" />
              </a>

              <a
                href="#dashboard"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                <span>استكشف النظام +</span>
              </a>
            </motion.div>

            {/* Hero Key Value Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-white/90 text-xs sm:text-sm font-medium"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-[#3BD4DC] font-black text-base sm:text-lg">
                  100%
                </span>
                <span>حماية وتشفير معتمد</span>
              </div>

              <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <span className="text-[#3BD4DC] font-black text-base sm:text-lg">
                  0 أخطاء
                </span>
                <span>في المزامنة وإدخال البيانات</span>
              </div>

              <div className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block" />

              <div className="flex items-center gap-2.5">
                <span className="text-[#3BD4DC] font-black text-base sm:text-lg">
                  دقة كاملة
                </span>
                <span>في التقارير وإثباتات السداد</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: ALL YOU NEED FOR YOUR INSTITUTION (6 SERVICES)
      ========================================================= */}
      <section id="services" className="py-16 lg:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-[#2DBCC3]/10 text-[#0D4B8E] border border-[#2DBCC3]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
              خدمات مخصصة للمؤسسات
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
              كل ما تحتاجه مؤسستك لإدارة رحلة الكفالة
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              نظام مصمم لتسهيل ضبط العمليات وتوفير الوقت والجهد على فريقك الميداني والتقني.
            </p>
          </div>

          {/* 6 Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systemServices.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-[#F8FAFC] border border-gray-100 hover:border-[#2DBCC3]/40 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/60 group relative overflow-hidden"
              >
                {/* Top Badge */}
                <div className="absolute top-6 left-6">
                  <span className="text-[11px] font-bold text-gray-400 bg-white border border-gray-200/70 px-2.5 py-1 rounded-md">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.iconBg} group-hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>

                  <h3 className="font-black text-[#0D4B8E] text-xl mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <a
                  href="/register?type=organization"
                  className="text-[#0D4B8E] group-hover:text-[#2DBCC3] text-xs font-bold inline-flex items-center gap-2 transition-colors cursor-pointer mt-auto pt-4 border-t border-gray-200/60"
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
          SECTION 3: IN-CODE INTERACTIVE DASHBOARD SHOWCASE
      ========================================================= */}
      <section id="dashboard" className="py-16 lg:py-24 bg-[#FAFBFD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-[#0D4B8E]/10 text-[#0D4B8E] border border-[#0D4B8E]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
              لوحة تحكم تفاعلية
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
              رؤية أوضح لعمليات الكفالة
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              لوحة استعراض حية توفر لك الوصول السريع إلى البيانات والتقارير وتسهل اتخاذ القرار.
            </p>
          </div>

          {/* Code-Based Interactive Dashboard Showcase Window */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Glow effect behind frame */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0D4B8E]/20 via-[#2DBCC3]/20 to-[#0D4B8E]/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

            {/* Dashboard Container Window */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-[#08203E]">
              {/* Browser Window Header Bar */}
              <div className="bg-[#092444] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                </div>

                <div className="bg-[#041730] text-gray-300 text-xs px-6 py-1.5 rounded-md font-mono dir-ltr flex items-center gap-2 border border-white/10 shadow-inner">
                  <FaLock className="text-[10px] text-emerald-400" />
                  <span>kafeeli.platform/organization/overview</span>
                </div>

                <span className="text-xs text-white/70 font-bold hidden sm:inline">
                  نظام كفيلي المؤسسي
                </span>
              </div>

              {/* IN-CODE DASHBOARD INTERFACE CONTENT */}
              <div className="bg-[#F4F7FB] p-4 sm:p-6 lg:p-8 text-right space-y-6">
                {/* 1. Header Org Profile Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#0D4B8E] text-white flex items-center justify-center font-black text-lg shadow-md shadow-[#0D4B8E]/20 shrink-0">
                      ج.أ
                    </div>
                    <div>
                      <h3 className="font-black text-[#0D4B8E] text-base sm:text-lg">
                        جمعية الأمل لرعاية الأيتام
                      </h3>
                      <p className="text-gray-400 text-xs font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        حساب مؤسسي معتمد • قطاع غزة
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      المزامنة نشطة
                    </span>

                    <button
                      type="button"
                      className="bg-[#0D4B8E] hover:bg-[#083463] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#0D4B8E]/20 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>+ إضافة حالة</span>
                    </button>
                  </div>
                </div>

                {/* 2. 4 Stat Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Metric 1 */}
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#0D4B8E]/30 transition-all">
                    <p className="text-xs text-gray-400 font-bold mb-2">
                      إجمالي الحالات
                    </p>
                    <h4 className="text-2xl lg:text-3xl font-black text-[#0D4B8E] mb-2">
                      324 يتيم
                    </h4>
                    <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      290 مكفول بنشاط
                    </p>
                  </div>

                  {/* Metric 2 */}
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#2DBCC3]/30 transition-all">
                    <p className="text-xs text-gray-400 font-bold mb-2">
                      الكفلاء النشطون
                    </p>
                    <h4 className="text-2xl lg:text-3xl font-black text-[#2DBCC3] mb-2">
                      218 كفيل
                    </h4>
                    <p className="text-xs font-semibold text-gray-400">
                      موزعون محلياً ودولياً
                    </p>
                  </div>

                  {/* Metric 3 */}
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#D9A441]/30 transition-all">
                    <p className="text-xs text-gray-400 font-bold mb-2">
                      تحويلات قيد الاعتماد
                    </p>
                    <h4 className="text-2xl lg:text-3xl font-black text-[#D9A441] mb-2">
                      7 حوالات
                    </h4>
                    <p className="text-xs font-bold text-amber-600">
                      تتطلب مطابقة الإشعار
                    </p>
                  </div>

                  {/* Metric 4 */}
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-emerald-300 transition-all">
                    <p className="text-xs text-gray-400 font-bold mb-2">
                      تقارير هذا الشهر
                    </p>
                    <h4 className="text-2xl lg:text-3xl font-black text-emerald-600 mb-2">
                      94% منجز
                    </h4>
                    <p className="text-xs font-semibold text-emerald-600">
                      جاهزة للإرسال للكفلاء
                    </p>
                  </div>
                </div>

                {/* 3. Action List Table Card */}
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <h4 className="font-black text-[#0D4B8E] text-sm sm:text-base">
                      إجراءات تتطلب مراجعة فريق المؤسسة
                    </h4>
                    <button
                      type="button"
                      className="text-[#2DBCC3] hover:text-[#0D4B8E] text-xs font-bold transition-colors cursor-pointer"
                    >
                      عرض سجل العمليات الكامل
                    </button>
                  </div>

                  {/* Item Row 1 */}
                  <div className="bg-[#FAFBFD] border border-gray-100 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#0D4B8E]/10 text-[#0D4B8E] flex items-center justify-center shrink-0">
                        <FaFileContract className="text-base" />
                      </div>
                      <div>
                        <h5 className="font-black text-gray-800 text-xs sm:text-sm mb-1">
                          إثبات سداد كفالة شهرية #KAF-8902
                        </h5>
                        <p className="text-gray-400 text-xs">
                          الكفيل: طارق العلي • اليتيم: يوسف خالد
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 mr-auto">
                      <span className="bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold px-3 py-1.5 rounded-lg">
                        بانتظار التحقق
                      </span>
                      <button
                        type="button"
                        className="bg-[#2DBCC3] hover:bg-[#25B2B9] text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
                      >
                        مراجعة
                      </button>
                    </div>
                  </div>

                  {/* Item Row 2 */}
                  <div className="bg-[#FAFBFD] border border-gray-100 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 hover:border-cyan-200 transition-all">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#2DBCC3]/10 text-[#2DBCC3] flex items-center justify-center shrink-0">
                        <FaFileAlt className="text-base" />
                      </div>
                      <div>
                        <h5 className="font-black text-gray-800 text-xs sm:text-sm mb-1">
                          تحديث صك ولاية جديد (عائلة النجار)
                        </h5>
                        <p className="text-gray-400 text-xs">
                          الوصي: فاطمة النجار • تم الرفع اليوم
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 mr-auto">
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-lg">
                        وثيقة جديدة
                      </span>
                      <button
                        type="button"
                        className="bg-[#0D4B8E] hover:bg-[#083463] text-white text-xs font-bold px-4 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
                      >
                        اعتماد
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Institutional Guarantee Bar */}
              <div className="bg-[#0A325E] text-white px-6 py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold border-t border-white/10">
                <FaCheckCircle className="text-[#3BD4DC] text-base shrink-0" />
                <span>
                  واجهة تفاعلية مصممة بالكامل وفق أنظمة الأمان والخصوصية وصلاحيات الأدوار
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: WORKFLOW STEPPER WITH DISTINCT COLORFUL BADGES
      ========================================================= */}
      <section className="py-16 lg:py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block bg-[#2DBCC3]/10 text-[#0D4B8E] border border-[#2DBCC3]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
              سلسلة عمل منظمة
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
              من تسجيل الحالة إلى المتابعة
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              خطوات متسلسلة تضمن أتمتة كاملة ودقة عالية في جميع مراحل الكفالة.
            </p>
          </div>

          {/* Stepper Cards with Distinct Color Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
            {workflowSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`bg-[#F8FAFC] border border-gray-100 ${step.hoverBorder} rounded-2xl p-5 text-center flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
              >
                {/* Distinct Colorful Number Icon */}
                <div
                  className={`w-11 h-11 rounded-full ${step.numBg} font-black text-base flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {step.number}
                </div>

                <h3 className="font-black text-[#0D4B8E] text-sm mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed font-normal">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: WHY KAFEELI FOR INSTITUTIONS?
      ========================================================= */}
      <section className="py-16 lg:py-24 bg-[#FAFBFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-[#D9A441]/10 text-[#D9A441] border border-[#D9A441]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
              مزايا مؤسسية
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
              لماذا كفيلي للمؤسسات؟
            </h2>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              أسباب تجعل من منصتنا الخيار الأمثل للمؤسسات والجمعيات الخيرية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutionalFeatures.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-white border border-gray-100 ${feat.borderColor} rounded-2xl p-7 text-right transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAFBFD] border border-gray-100 flex items-center justify-center mb-5 shrink-0">
                  {feat.icon}
                </div>

                <h3 className="font-black text-[#0D4B8E] text-lg mb-2">
                  {feat.title}
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: CALL TO ACTION BANNER
      ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-[#0D4B8E] text-white p-8 sm:p-12 lg:p-16 shadow-2xl text-center"
        >
          {/* Decorative Glowing Background Orbs */}
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#2DBCC3]/25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#083463]/60 blur-3xl pointer-events-none" />

          {/* Decorative Icon */}
          <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-md">
            <FaBuilding className="text-2xl text-[#3BD4DC]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              هل تريد تجربة كفيلي مع مؤسستك؟
            </h2>

            <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-normal">
              انضم إلى منصة كفيلي وابدأ في تنظيم أتمتة وإدارة الكفالات بكفاءة وشفافية عالية.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <a
                href="/register?type=organization"
                className="inline-flex items-center gap-2.5 bg-[#2DBCC3] hover:bg-[#25B2B9] text-white px-8 py-4 rounded-xl font-black text-sm transition-all duration-200 shadow-xl shadow-[#2DBCC3]/30 active:scale-95 border border-white/10"
              >
                <span>إنشاء حساب مؤسسة</span>
                <FaArrowLeft className="text-xs" />
              </a>

              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-4 rounded-xl font-black text-sm backdrop-blur-md transition-all duration-200 active:scale-95"
              >
                <FaHeadset className="text-xs text-[#3BD4DC]" />
                <span>تواصل معنا</span>
              </a>
            </div>

            <p className="text-white/60 text-xs font-medium">
              فريقنا جاهز لمساعدتك في عملية الربط والتهيئة بالكامل
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
