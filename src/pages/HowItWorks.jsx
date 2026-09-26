import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCheckCircle,
  FaLock,
  FaQuestionCircle,
} from "react-icons/fa";
import {
  FiChevronLeft,
  FiInfo,
  FiMail,
  FiChevronDown,
  FiArrowLeft,
  FiCheckCircle,
} from "react-icons/fi";
import { LuSparkles, LuZap, LuShieldCheck, LuLayers, LuUsers, LuFileText } from "react-icons/lu";
import { RiHandHeartFill } from "react-icons/ri";
import { LiaUserShieldSolid } from "react-icons/lia";

import Header from "./header";
import Footer from "./Footer";
import howItWorksHeroBg from "../assets/howitworks.png";
import kafeeliOrphans from "../assets/kaf.png";

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 3 Roles Data (Ordered RTL: المؤسسة, الكفيل, الوصي)
  const partyRoles = [
    {
      badge: "الطرف الأول",
      title: "المؤسسة",
      subtitle: "إدارة الحالات والاعتماد والمتابعة الميدانية",
      color: "#0D4B8E",
      badgeStyle: "bg-[#0D4B8E]/10 text-[#0D4B8E] border-[#0D4B8E]/20",
      iconBg: "bg-[#0D4B8E] text-white shadow-[#0D4B8E]/30",
      accentBorder: "hover:border-[#0D4B8E]/40",
      features: [
        "تسجيل الأيتام والأسر والوثائق الرسمية",
        "مراجعة وتدقيق المستندات والتحويلات",
        "متابعة الحالات واستيفاء شروط الاستحقاق",
        "إصدار التقارير الدورية المعتمدة للكفلاء",
      ],
    },
    {
      badge: "الطرف الثاني",
      title: "الكفيل",
      subtitle: "اختيار الكفالة والمتابعة وتتبع الأثر",
      color: "#2DBCC3",
      badgeStyle: "bg-[#2DBCC3]/10 text-[#1EA4AB] border-[#2DBCC3]/20",
      iconBg: "bg-[#2DBCC3] text-white shadow-[#2DBCC3]/30",
      accentBorder: "hover:border-[#2DBCC3]/40",
      features: [
        "تصفح واختيار حالة اليتيم المناسبة",
        "توفير وتفعيل الكفالة الشهرية بمرونة",
        "متابعة التقارير والتحديثات الدورية الموثقة",
        "رؤية الأثر المباشر للتبرع بشفافية",
      ],
    },
    {
      badge: "الطرف الثالث",
      title: "الوصي",
      subtitle: "إدارة بيانات اليتيم وتوثيق الاستلام والاحتياج",
      color: "#D9A441",
      badgeStyle: "bg-[#D9A441]/10 text-[#A6400E] border-[#D9A441]/20",
      iconBg: "bg-[#E5A72D] text-white shadow-[#E5A72D]/30",
      accentBorder: "hover:border-[#D9A441]/40",
      features: [
        "رفع وثائق صك الولاية والشهادات المعتمدة",
        "تأكيد استلام المبالغ والتحويلات المالية",
        "مشاركة التحديثات الدراسية والصحية لليتيم",
        "تقديم طلبات الدعم والاحتياجات الأسرية",
      ],
    },
  ];

  // 7 Chronological Journey Steps
  const journeySteps = [
    {
      step: "01",
      title: "تسجيل وتوثيق الحالة",
      party: "الوصي والمؤسسة",
      desc: "إضافة بيانات اليتيم الأساسية والديموغرافية، مع الرفع المبدئي لجميع المستندات الرسمية وصك الولاية.",
      colorBg: "bg-[#0D4B8E] text-white shadow-[#0D4B8E]/30",
      pillBg: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
      borderColor: "hover:border-[#0D4B8E]/40",
    },
    {
      step: "02",
      title: "المراجعة والاعتماد",
      party: "المؤسسة الخيرية",
      desc: "تدقيق المستندات من قبل فريق المؤسسة المختص، والتحقق الميداني وتأكيد استحقاق الحالة قبل النشر.",
      colorBg: "bg-[#0D4B8E] text-white shadow-[#0D4B8E]/30",
      pillBg: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
      borderColor: "hover:border-[#0D4B8E]/40",
    },
    {
      step: "03",
      title: "إتاحة الكفالة للمتبرعين",
      party: "منصة كفيلي",
      desc: "عرض ملف اليتيم ضمن قائمة الكفالات المتاحة على المنصة مع مراعاة كاملة للخصوصية وحرية الاختيار.",
      colorBg: "bg-[#2DBCC3] text-white shadow-[#2DBCC3]/30",
      pillBg: "bg-[#2DBCC3]/10 text-[#1EA4AB]",
      borderColor: "hover:border-[#2DBCC3]/40",
    },
    {
      step: "04",
      title: "اختيار وتفعيل الكفالة",
      party: "الكفيل",
      desc: "تصفح الكفيل للحالات المتاحة، اختيار اليتيم، وتفعيل الكفالة الشهرية بخطوات بسيطة وآمنة.",
      colorBg: "bg-[#2DBCC3] text-white shadow-[#2DBCC3]/30",
      pillBg: "bg-[#2DBCC3]/10 text-[#1EA4AB]",
      borderColor: "hover:border-[#2DBCC3]/40",
    },
    {
      step: "05",
      title: "إرسال وإثبات التحويل",
      party: "المؤسسة والكفيل",
      desc: "توثيق حوالة السداد ومطابقة الإشعارات المالية واعتماد سندات الصرف في النظام.",
      colorBg: "bg-[#10B981] text-white shadow-[#10B981]/30",
      pillBg: "bg-[#10B981]/10 text-[#059669]",
      borderColor: "hover:border-[#10B981]/40",
    },
    {
      step: "06",
      title: "استلام المستحقات",
      party: "الوصي والأسرة",
      desc: "تأكيد استلام الأسرة للمبلغ المخصص، وتوثيق استلام الدعم بكرامة وشفافية.",
      colorBg: "bg-[#F59E0B] text-white shadow-[#F59E0B]/30",
      pillBg: "bg-[#F59E0B]/10 text-[#D97706]",
      borderColor: "hover:border-[#F59E0B]/40",
    },
    {
      step: "07",
      title: "التقارير والمتابعة الدورية",
      party: "جميع الأطراف",
      desc: "إصدار تقارير دورية تثبت التقدم الدراسي والصحي والنفسي لليتيم وتتيح للكفيل الاطمئنان الدائم.",
      colorBg: "bg-[#D9A441] text-white shadow-[#D9A441]/30",
      pillBg: "bg-[#D9A441]/10 text-[#A6400E]",
      borderColor: "hover:border-[#D9A441]/40",
    },
  ];

  // Tailored Experiences
  const tailoredInterfaces = [
    {
      title: "لوحة المؤسسة",
      subtitle: "إشراف ومراجعة مركزية",
      color: "border-t-4 border-t-[#0D4B8E]",
      badge: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
      items: [
        "لوحة قيادة إحصائية شاملة للحالات",
        "مركز مراجعة وتدقيق المستندات الحية",
        "إدارة الأيتام والأسر والوصي المعتمد",
        "متابعة السجلات المالية والحوالات",
        "إخراج التقارير الدورية للكفلاء",
      ],
    },
    {
      title: "لوحة الكفيل",
      subtitle: "متابعة شفافة وتتبع الأثر",
      color: "border-t-4 border-t-[#2DBCC3]",
      badge: "bg-[#2DBCC3]/10 text-[#1EA4AB]",
      items: [
        "تصفح الحالات والتصفية الذكية",
        "لوحة تتبع كفالاتي النشطة وتاريخها",
        "ملف تحديثات وتقارير اليتيم الدورية",
        "تأكيد المدفوعات والفواتير المالية",
        "تواصل إنساني معنوي آمن وموثق",
      ],
    },
    {
      title: "لوحة الوصي",
      subtitle: "إدارة بيانات اليتيم والتحديثات",
      color: "border-t-4 border-t-[#D9A441]",
      badge: "bg-[#D9A441]/10 text-[#A6400E]",
      items: [
        "إضافة وتحديث بيانات الأيتام بسهولة",
        "رفع وثائق صك الولاية والشهادات",
        "تتبع حالة الاستحقاق وجدول الصرف",
        "تأكيد استلام الدفعات الشهرية",
        "إرسال المستجدات والاحتياجات الأسرية",
      ],
    },
  ];

  // Value Pillars
  const valuePillars = [
    {
      icon: <LuShieldCheck className="text-2xl text-[#0D4B8E]" />,
      title: "مسؤوليات واضحة",
      desc: "كل طرف يعرف دوره بدقة دون تداخل في المهام أو تشتيت في التواصل بين الأطراف.",
    },
    {
      icon: <LuZap className="text-2xl text-[#2DBCC3]" />,
      title: "أتمتة وتقليل الأخطاء",
      desc: "تقليل الاعتماد على الأوراق والمحادثات العشوائية بنسبة تسهم في سرعة الإنجاز.",
    },
    {
      icon: <FaLock className="text-2xl text-[#D9A441]" />,
      title: "أمان وثبات عالي",
      desc: "حماية كاملة لبيانات الأسر واليتيم وتشفير عالي المستوى لكافة المعاملات.",
    },
    {
      icon: <RiHandHeartFill className="text-2xl text-[#0D4B8E]" />,
      title: "متابعة ذات أثر حقيقي",
      desc: "رؤية أثر الكفالة على أرض الواقع بشفافية وطمأنينة تامة لكافة الأطراف المعنية.",
    },
  ];

  // FAQ Accordion List
  const faqs = [
    {
      q: "هل كفيلي مؤسسة خيرية؟",
      a: "كفيلي ليست جمعية خيرية تقليدية، بل هي منصة تقنية متكاملة تتيح إدارة وتنظيم رحلة الكفالة وتوفر البنية الرقمية التي تربط الجمعيات الخيرية المعتمدة والكفلاء والأوصياء.",
    },
    {
      q: "كيف تضمن المنصة وصول الدعم للمستحقين؟",
      a: "يتم التحقق والتأكد من جميع الوثائق الرسمية وصكوك الولاية من قبل المؤسسات الخيرية المعتمدة قبل إتاحة وتفعيل أي كفالة، مع توثيق إثباتات السداد والاستلام في النظام.",
    },
    {
      q: "ما هو دور المؤسسة الخيرية في كفيلي؟",
      a: "تقوم المؤسسة بإدارة الحالات الميدانية، تدقيق المستندات والأوراق المرفوعة من قبل الأوصياء، التحقق الميداني من الاستحقاق، ومتابعة تسليم المبالغ وتحديث تقارير الأيتام.",
    },
    {
      q: "كيف يتم اختيار ومتابعة حالة اليتيم؟",
      a: "يستطيع الكفيل تصفح قائمة الأيتام المعتمدين واختيار الحالة التي يرغب بكفالتها، وتفعيل الكفالة بمرونة، ثم استلام تقارير دورية تثبت تقدم اليتيم ورعايته على كافة الأصعدة.",
    },
    {
      q: "هل البيانات والأوراق الرسمية آمنة في كفيلي؟",
      a: "نعم، المنصة مبنية وفق أعلى معايير أمان البيانات والخصوصية الشديدة ونظام صلاحيات متقدم يضمن عدم وصول البيانات الحساسة إلا للمصرح لهم فقط وفق نظام حماية مشفر.",
    },
    {
      q: "كيف يمكن للمؤسسات والجمعيات الانضمام لكفيلي؟",
      a: "يمكن للمؤسسات تقديم طلب تسجيل حساب مؤسسي، وسيقوم فريق كفيلي بمراجعة الأوراق الثبوتية وتفعيل لوحة التحكم الخاصة بالمؤسسة لمباشرة العمل فوراً.",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAFBFD] flex flex-col font-['Cairo',sans-serif] overflow-x-hidden text-right selection:bg-[#2DBCC3] selection:text-white"
    >
      <Header />

      <main className="flex-grow pt-10">
        {/* =========================================================
            SECTION 1: HERO SECTION
        ========================================================= */}
        <section
          id="how-it-works"
          className="relative min-h-[90vh] lg:min-h-[100vh] pt-24 pb-16 flex items-center overflow-hidden"
        >
          {/* Background Image with Dark Blue Right-to-Left Fading Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={howItWorksHeroBg}
              alt="كيف يعمل كفيلي"
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Dark Blue Overlay - Strong on Right (for text), Fading to Transparent on Left (to reveal photo) */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to left, rgba(4, 23, 48, 0.98) 0%, rgba(7, 43, 83, 0.92) 42%, rgba(7, 43, 83, 0.55) 70%, rgba(4, 23, 48, 0.18) 100%)",
              }}
            />
          </div>

          {/* Glowing Ambient Lights */}
          <div className="absolute top-12 right-12 w-96 h-96 rounded-full bg-[#2DBCC3]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#0D4B8E]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
            <div className="max-w-2xl text-right">
              {/* Top Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#09233F]/90 border border-white/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold text-white shadow-lg mb-6"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#2DBCC3] animate-pulse" />
                <span>3 أطراف في رحلة واحدة</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-6 tracking-tight"
              >
                كيف يعمل كفيلي؟
                <br />
                <span className="text-[#3BD4DC]">
                  رحلة واحدة، أدوار واضحة، متابعة مستمرة
                </span>
              </motion.h1>

              {/* Subtitle Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 font-normal"
              >
                نظام رقمي يتتبع مسار الكفالة خطوة بخطوة بين المؤسسة والكفيل والوصي، من
                تسجيل البيانات وحتى أثر العطاء الميداني.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-start gap-4 mb-10"
              >
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2.5 bg-[#2DBCC3] hover:bg-[#25B2B9] text-[#041730] px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-[#2DBCC3]/30 active:scale-95"
                >
                  <span>ابدأ الآن</span>
                  <FiChevronLeft size={18} strokeWidth={2.5} />
                </Link>

                <a
                  href="#journey-steps"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition-all duration-200 active:scale-95"
                >
                  <FiInfo size={16} className="text-[#3BD4DC]" />
                  <span>تصفح المراحل</span>
                </a>
              </motion.div>

              {/* Key Trust Points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-start gap-6 sm:gap-8 text-white/90 text-xs sm:text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#0D4B8E]/40 text-[#3BD4DC]">
                    <FaCheckCircle size={15} />
                  </span>
                  <span>3 أطراف متكاملة</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2DBCC3]/20 text-[#3BD4DC]">
                    <FaCheckCircle size={15} />
                  </span>
                  <span>7 خطوات منظمة ومؤتمتة</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#D9A441]/20 text-[#D9A441]">
                    <FaCheckCircle size={15} />
                  </span>
                  <span>متابعة حية ومستمرة</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: THREE PARTIES, CLEAR ROLE FOR EACH
        ========================================================= */}
        <section id="three-parties" className="py-16 lg:py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-[#0D4B8E]/10 text-[#0D4B8E] border border-[#0D4B8E]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3"
              >
                حوكمة الأدوار
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3"
              >
                ثلاثة أطراف لكل طرف دور واضح
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-500 text-sm sm:text-base leading-relaxed"
              >
                منظومة مخصصة تضمن أداء كل طرف لمهامه بأعلى درجات المرونة والمسؤولية.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {partyRoles.map((role, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-[#F8FAFC] border border-gray-100 ${role.accentBorder} rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group relative`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${role.badgeStyle}`}>
                        {role.badge}
                      </span>

                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold shadow-md ${role.iconBg} group-hover:scale-110 transition-transform`}>
                        <LiaUserShieldSolid size={26} />
                      </div>
                    </div>

                    <h3 className="font-black text-[#0F172A] text-2xl mb-1">
                      {role.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-bold text-gray-500 mb-6 leading-normal">
                      {role.subtitle}
                    </p>

                    <ul className="space-y-3 mb-6 text-right">
                      {role.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 font-medium">
                          <FaCheckCircle className="text-[#2DBCC3] mt-0.5 shrink-0 text-xs" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-200/70 text-xs font-bold text-gray-400 flex items-center justify-between">
                    <span>نظام موحد</span>
                    <span className="w-2 h-2 rounded-full bg-[#2DBCC3]" />
                    <span>حوكمة كاملة</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: STEP-BY-STEP SPONSORSHIP JOURNEY (SEQUENTIAL TIMELINE)
        ========================================================= */}
        <section id="journey-steps" className="py-16 lg:py-24 bg-[#FAFBFD]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-[#2DBCC3]/10 text-[#0D4B8E] border border-[#2DBCC3]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3"
              >
                المسار الزمني
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3"
              >
                رحلة الكفالة خطوة بخطوة
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-500 text-sm sm:text-base leading-relaxed"
              >
                مسار سلس ومنظم يضمن الوضوح والأتمتة في كافة المراحل.
              </motion.p>
            </div>

            {/* Vertical Connected Timeline Container */}
            <div className="relative space-y-6 sm:space-y-8">
              {/* Connecting Vertical Line (RTL right-aligned for desktop) */}
              <div className="absolute right-6 sm:right-9 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0D4B8E] via-[#2DBCC3] to-[#D9A441] hidden sm:block opacity-30" />

              {journeySteps.map((step, idx) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-white border border-gray-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Step Number Badge Circle */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${step.colorBg} font-black text-lg sm:text-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                    {step.step}
                  </div>

                  {/* Step Content */}
                  <div className="flex-grow text-right">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h3 className="font-black text-[#0F172A] text-lg sm:text-xl group-hover:text-[#0D4B8E] transition-colors">
                        {step.title}
                      </h3>

                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${step.pillBg}`}>
                        {step.party}
                      </span>
                    </div>

                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: TAILORED EXPERIENCE FOR EACH PARTY
        ========================================================= */}
        <section id="tailored-experience" className="py-16 lg:py-24 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-[#0D4B8E]/10 text-[#0D4B8E] border border-[#0D4B8E]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3"
              >
                الواجهات الرقمية
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3"
              >
                تجربة مصممة لكل طرف
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-500 text-sm sm:text-base leading-relaxed"
              >
                لوحات تحكم مخصصة تناسب طبيعة عمل واحتياجات كل مستخدم على المنصة.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tailoredInterfaces.map((ui, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-[#F8FAFC] border border-gray-100 ${ui.color} rounded-2xl p-7 text-right transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group`}
                >
                  <span className={`inline-block text-xs font-bold px-3 py-1 rounded-md mb-3 ${ui.badge}`}>
                    {ui.subtitle}
                  </span>

                  <h3 className="font-black text-[#0F172A] text-2xl mb-6">
                    {ui.title}
                  </h3>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-gray-600 font-medium">
                    {ui.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-center gap-2.5">
                        <FaCheckCircle className="text-[#2DBCC3] shrink-0 text-xs" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: WHY THIS JOURNEY?
        ========================================================= */}
        <section id="why-journey" className="py-16 lg:py-24 bg-[#FAFBFD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-[#D9A441]/10 text-[#D99A27] border border-[#D9A441]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3"
              >
                القيمة المضافة
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3"
              >
                لماذا هذه الرحلة؟
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-500 text-sm sm:text-base leading-relaxed"
              >
                لأن العمل الإنساني يستحق أعلى معايير الشفافية والتنظيم.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuePillars.map((pill, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-7 text-right transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FAFBFD] border border-gray-100 flex items-center justify-center mb-5 shrink-0 group-hover:scale-110 transition-transform">
                    {pill.icon}
                  </div>

                  <h3 className="font-black text-[#0F172A] text-lg mb-2">
                    {pill.title}
                  </h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {pill.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (ACCORDION)
        ========================================================= */}
        <section id="faq" className="py-16 lg:py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block bg-[#0D4B8E]/10 text-[#0D4B8E] border border-[#0D4B8E]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3"
              >
                أسئلة مكررة
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3"
              >
                أسئلة شائعة
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-gray-500 text-sm sm:text-base leading-relaxed"
              >
                إجابات لأكثر الاستفسارات شيوعاً حول عمل منصة كفيلي.
              </motion.p>
            </div>

            {/* Accordions List */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
                        ? "border-[#0D4B8E]/30 bg-white shadow-md"
                        : "border-gray-200/80 bg-[#FAFBFD] hover:border-gray-300"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-right flex items-center justify-between font-bold text-sm sm:text-base text-[#0F172A] hover:text-[#0D4B8E] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <FaQuestionCircle className={`text-base shrink-0 transition-colors ${isOpen ? "text-[#0D4B8E]" : "text-[#2DBCC3]"}`} />
                        <span>{faq.q}</span>
                      </span>

                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 shrink-0 ${isOpen ? "bg-[#0D4B8E] text-white rotate-180" : "bg-white border border-gray-200 text-gray-500"}`}>
                        <FiChevronDown size={18} />
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 7: FINAL CTA BANNER
        ========================================================= */}
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl bg-[#0D4B8E] text-white p-8 sm:p-14 text-center"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={kafeeliOrphans}
                alt="كفيلي"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D4B8E] via-[#0D4B8E]/95 to-[#0B3A6F]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-[#3BD4DC] flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <RiHandHeartFill size={28} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                ابدأ رحلتك مع كفيلي
              </h2>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                انضم إلى منصة كفيلي وابدأ في تجربة كفالة رقمية منظمة وموثوقة.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2.5 bg-[#2DBCC3] hover:bg-[#25B2B9] text-[#041730] px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-[#2DBCC3]/30 active:scale-95"
                >
                  <span>ابدأ الآن</span>
                  <FiArrowLeft size={18} strokeWidth={2.5} />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition-all duration-200 active:scale-95"
                >
                  <FiMail size={16} className="text-[#3BD4DC]" />
                  <span>تواصل معنا</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
