import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import Header from "./header";
import Footer from "./Footer";

import heroSection from "../assets/hero-bg.png";

import {
  PiBuildings,
  PiHandHeartFill,
  PiLockKeyOpen,
  PiCheckCircle,
} from "react-icons/pi";

import { MdFamilyRestroom } from "react-icons/md";
import { LuFileStack } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";

import {
  FiAlertTriangle,
  FiArrowLeft,
  FiChevronLeft,
  FiClipboard,
  FiCreditCard,
  FiEye,
  FiFileText,
  FiGrid,
  FiHome,
  FiInfo,
  FiRefreshCw,
  FiShield,
  FiTrendingUp,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiZap,
} from "react-icons/fi";

/* =========================================================
   ANIMATION CONFIG
========================================================= */

const revealUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/* =========================================================
   REUSABLE SECTION
========================================================= */

function AnimatedSection({
  children,
  className = "",
  id,
  reduceMotion = false,
}) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
      variants={revealUp}
    >
      {children}
    </motion.section>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  badge,
  title,
  description,
  dark = false,
  reduceMotion = false,
}) {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-[760px] flex-col items-center text-center"
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={revealUp}
    >
      <span
        className={[
          "inline-flex items-center justify-center rounded-full px-3 py-1.5",
          "font-['Cairo'] text-[10px] font-bold leading-[18px] sm:text-[11px]",
          dark
            ? "border border-[#2DBCC3]/20 bg-[#2DBCC3]/10 text-[#2DBCC3]"
            : "bg-[#EAF2F9] text-[#19579A]",
        ].join(" ")}
      >
        {badge}
      </span>

      <h2
        className={[
          "mt-3 mb-3 font-['Cairo'] text-[28px] font-black leading-[40px]",
          "tracking-[-0.4px] sm:text-[32px] lg:text-[36px]",
          dark ? "text-white" : "text-[#0F172A]",
        ].join(" ")}
      >
        {title}
      </h2>

      <p
        className={[
          "mt-2 max-w-[720px] font-['Cairo'] text-[13px] font-medium",
          "leading-[23px] sm:text-[14px] lg:text-[15px]",
          dark ? "text-[#D6E4F0]" : "text-[#667085]",
        ].join(" ")}
      >
        {description}
      </p>
    </motion.div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function LandingPage() {
  const reduceMotion = useReducedMotion();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  /* =======================================================
     GOVERNANCE
  ======================================================= */

  const governanceCards = [
    {
      label: "الطرف الأول",
      title: "المؤسسة",
      subtitle: "إدارة وتنظيم الكفالات",
      description:
        "إدارة وتنظيم الكفالات ومتابعة الحالات والبيانات والتأكد من استيفاء المتطلبات.",
      statusTitle: "الحالة التشغيلية",
      status: "صلاحيات إدارية كاملة",
      icon: PiBuildings,
      iconBg: "bg-[#0D4B8E]",
      iconColor: "text-white",
      labelBg: "bg-[#EAF0F7]",
      labelColor: "text-[#315B8C]",
      statusBg: "bg-[#F3F7FB]",
      statusBorder: "border-[#DDE6F0]",
      statusColor: "text-[#19579A]",
    },
    {
      label: "الطرف الثاني",
      title: "الكفيل",
      subtitle: "متابعة الكفالة وتوثيقها",
      description:
        "اختيار الحالة المناسبة وإنشاء الكفالة ومتابعة الدفعات والتحديثات الخاصة بها.",
      statusTitle: "قناة المتابعة",
      status: "متابعة شفافة ومباشرة",
      icon: PiHandHeartFill,
      iconBg: "bg-[#2DBCC3]",
      iconColor: "text-white",
      labelBg: "bg-[#E6F8F9]",
      labelColor: "text-[#2DBCC3]",
      statusBg: "bg-[#F2FBFC]",
      statusBorder: "border-[#BDECEF]",
      statusColor: "text-[#2DBCC3]",
    },
    {
      label: "الطرف الثالث",
      title: "الوصي",
      subtitle: "استلام ومتابعة الكفالة",
      description:
        "تقديم البيانات والوثائق المطلوبة ومتابعة حالة الكفالة والتحويلات المتعلقة بالحالة.",
      statusTitle: "البيئة التفاعلية",
      status: "حفظ الخصوصية والكرامة",
      icon: MdFamilyRestroom,
      iconBg: "bg-[#D9A441]",
      iconColor: "text-white",
      labelBg: "bg-[#FFF5DF]",
      labelColor: "text-[#D9A441]",
      statusBg: "bg-[#FFFBF2]",
      statusBorder: "border-[#F3D9A0]",
      statusColor: "text-[#D99A22]",
    },
  ];

  /* =======================================================
     PROBLEM
  ======================================================= */

  const problemCards = [
    {
      title: "ملفات وإجراءات متفرقة",
      description:
        "بيانات الكفالة قد تكون موزعة بين أكثر من أداة، مما يزيد من احتمالية ضياع المعلومات المهمة.",
      icon: LuFileStack,
      iconBg: "bg-[#FFF0F2]",
      iconColor: "text-[#F04461]",
    },
    {
      title: "متابعة غير متكاملة",
      description:
        "كل طرف قد يرى جزءًا من الرحلة دون رؤية منظومة الإجراءات المرتبطة به أو معرفة المرحلة التالية.",
      icon: FiAlertTriangle,
      iconBg: "bg-[#FFF9E8]",
      iconColor: "text-[#F59E0B]",
    },
    {
      title: "توثيق يحتاج إلى تنظيم",
      description:
        "المستندات والمعلومات تحتاج إلى سجل واضح وموحد يربط كل كفالة بمراحلها وتحديثاتها.",
      icon: IoDocumentTextOutline,
      iconBg: "bg-[#EFF8FF]",
      iconColor: "text-[#1570EF]",
    },
  ];

  /* =======================================================
     SOLUTION
  ======================================================= */

  const solutionCards = [
    {
      title: "المؤسسة",
      description:
        "تدير حالات الكفالة والكفلاء، وتراجع المستندات والدفعات وتضمن رحلة منظمة وشفافة.",
      note: "حوكمة وإشراف شامل",
      icon: PiBuildings,
    },
    {
      title: "الكفيل",
      description:
        "يتابع كفالته ومعطياتها والتحديثات المرتبطة بها، ويتمكن من رؤية آخر المستجدات بوضوح.",
      note: "متابعة موثقة ومستمرة",
      icon: FiUser,
    },
    {
      title: "الوصي",
      description:
        "يتابع الإجراءات المرتبطة بالحالة ويرفع المستندات والتحديثات المطلوبة وفق النظام.",
      note: "حماية وخصوصية منظمة",
      icon: FiShield,
    },
  ];

  /* =======================================================
     WHY KAFEELI
  ======================================================= */

  const whyCards = [
    {
      title: "إدارة متكاملة",
      description:
        "تنظيم الحالات والكفلاء والأوصياء والكفالات من مكان واحد وبدون تشتيت.",
      icon: FiGrid,
      iconBg: "bg-[#E7EEF7]",
      iconColor: "text-[#19579A]",
    },
    {
      title: "رحلة قابلة للتتبع",
      description:
        "معرفة المرحلة الحالية لكل كفالة والتحديثات المرتبطة بها بوضوح زمني كامل.",
      icon: FiTrendingUp,
      iconBg: "bg-[#E2F5F7]",
      iconColor: "text-[#2DBCC3]",
    },
    {
      title: "توثيق واضح",
      description:
        "ربط المستندات والمدفوعات والتحديثات برحلة الكفالة في سجل موثوق ومنظم.",
      icon: FiFileText,
      iconBg: "bg-[#F7F0E2]",
      iconColor: "text-[#E5A72D]",
    },
    {
      title: "صلاحيات وخصوصية",
      description:
        "لكل مستخدم تجربة وصلاحيات تناسب دوره داخل المنظومة مع الحفاظ على سرية البيانات.",
      icon: PiLockKeyOpen,
      iconBg: "bg-[#EEEAFE]",
      iconColor: "text-[#6956E5]",
    },
  ];

  /* =======================================================
     INSTITUTIONS
  ======================================================= */

  const institutionCards = [
    {
      title: "إدارة الحالات والأوصياء",
      description:
        "تنظيم البيانات والمستندات ومتابعة حالة المراجعة.",
      icon: FiUsers,
      iconBg: "bg-[#E7EEF7]",
      iconColor: "text-[#19579A]",
    },
    {
      title: "إدارة الكفلاء والكفالات",
      description:
        "ربط الكفالات بأطرافها ومتابعة دورة كل كفالة.",
      icon: FiUserCheck,
      iconBg: "bg-[#E2F5F7]",
      iconColor: "text-[#2DBCC3]",
    },
    {
      title: "متابعة الدفعات",
      description:
        "مراجعة إثباتات الدفع وتوثيق حالة الإجراءات المالية.",
      icon: FiCreditCard,
      iconBg: "bg-[#F7F0E2]",
      iconColor: "text-[#E5A72D]",
    },
    {
      title: "التحديثات والمتابعة",
      description:
        "إدارة التحديثات المرتبطة بالكفالات وإتاحتها للأطراف المعنية.",
      icon: FiRefreshCw,
      iconBg: "bg-[#EEF0FF]",
      iconColor: "text-[#6155E8]",
    },
  ];

  /* =======================================================
     PROCESS
  ======================================================= */

  const steps = [
    {
      number: "01",
      title: "بدء الكفالة",
      description:
        "يبدأ الكفيل إجراءات الكفالة من خلال حسابه.",
    },
    {
      number: "02",
      title: "توثيق الدفع",
      description:
        "يتم رفع إثبات الدفع وربطه بالكفالة.",
    },
    {
      number: "03",
      title: "مراجعة المؤسسة",
      description:
        "تراجع المؤسسة العملية والإثباتات المرتبطة بها.",
    },
    {
      number: "04",
      title: "توثيق التحويل والاستلام",
      description:
        "توثق إجراءات تحويل الكفالة وتأكيد الاستلام.",
    },
    {
      number: "05",
      title: "المتابعة والتحديثات",
      description:
        "تستمر رحلة الكفالة والتحديثات المرتبطة بها.",
    },
  ];

  /* =======================================================
     TRUST
  ======================================================= */

  const trustCards = [
    {
      title: "صلاحيات حسب الدور",
      description:
        "يصل كل مستخدم إلى البيانات والإجراءات المرتبطة بدوره فقط.",
      icon: FiShield,
      iconBg: "bg-[#E4ECF6]",
      iconColor: "text-[#19579A]",
    },
    {
      title: "مراجعة المؤسسة",
      description:
        "تمر الإجراءات الأساسية عبر المؤسسة المسؤولة قبل اعتمادها نهائيًا.",
      icon: FiHome,
      iconBg: "bg-[#DDF4F5]",
      iconColor: "text-[#2DBCC3]",
    },
    {
      title: "توثيق الإجراءات",
      description:
        "تربط المستندات والدفعات والتحديثات برحلة الكفالة كاملة.",
      icon: FiClipboard,
      iconBg: "bg-[#F7F0E2]",
      iconColor: "text-[#E5A72D]",
    },
    {
      title: "متابعة واضحة",
      description:
        "يمكن لكل طرف متابعة الإجراءات المرتبطة به دون لبس أو غموض.",
      icon: FiEye,
      iconBg: "bg-[#EAF8F1]",
      iconColor: "text-[#16B77A]",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-x-hidden bg-[#F8F9FA] text-[#0F172A]"
    >
      <Header />

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section
        id="home"
        className="relative isolate overflow-hidden"
      >
        {/* ===================================================
            BACKGROUND
        =================================================== */}

        <div className="absolute inset-0 -z-10">
          <img
            src={heroSection}
            alt="منصة كفيلي لإدارة رحلة الكفالة"
            className="h-full w-full object-cover object-center"
          />

          {/* Desktop Main Overlay */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(270deg, rgba(4,23,48,0.98) 0%, rgba(4,23,48,0.89) 34%, rgba(4,23,48,0.55) 61%, rgba(4,23,48,0.10) 100%)",
            }}
          />

          {/* Desktop Bottom Overlay */}
          <div
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(0deg, rgba(4,23,48,0.94) 0%, rgba(4,23,48,0.18) 43%, rgba(0,0,0,0) 100%)",
            }}
          />

          {/* Mobile Overlay */}
          <div
            className="absolute inset-0 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(4,23,48,0.18) 0%, rgba(4,23,48,0.53) 35%, rgba(4,23,48,0.96) 100%)",
            }}
          />
        </div>

        {/* ===================================================
            DECORATIVE GLOW
        =================================================== */}

        <div className="pointer-events-none absolute right-[-150px] top-[70px] h-[330px] w-[330px] rounded-full bg-[#2DBCC3]/10 blur-3xl" />

        <div className="pointer-events-none absolute bottom-[-130px] left-[-110px] h-[340px] w-[340px] rounded-full bg-[#0D4B8E]/30 blur-3xl" />

        {/* ===================================================
            HERO CONTENT
        =================================================== */}

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-[105px] sm:px-7 sm:py-[110px] md:py-[120px] lg:px-10 lg:py-[125px]">
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                  opacity: 0,
                  x: 32,
                }
            }
            animate={
              reduceMotion
                ? undefined
                : {
                  opacity: 1,
                  x: 0,
                }
            }
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-[700px] text-right"
          >
            {/* =================================================
                BADGE
            ================================================= */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    x: 20,
                  }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity: 1,
                    x: 0,
                  }
              }
              transition={{
                duration: 0.45,
                delay: 0.05,
              }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#09233F]/85 px-4 py-2 shadow-lg backdrop-blur-md"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#19C6D2] opacity-50" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#19C6D2]" />
              </span>

              <span className="font-['Cairo'] text-[11px] font-bold text-white sm:text-[12px]">
                منصة رقمية لإدارة رحلة الكفالة
              </span>
            </motion.div>

            {/* =================================================
                TITLE
            ================================================= */}

            <motion.h1
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    x: 22,
                  }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity: 1,
                    x: 0,
                  }
              }
              transition={{
                duration: 0.6,
                delay: 0.12,
              }}
              className="w-full font-['Cairo'] text-[37px] font-black leading-[1.3] tracking-[-0.8px] text-white sm:text-[49px] sm:leading-[1.22] lg:text-[61px] lg:leading-[1.17] lg:tracking-[-1.4px]"
            >
              <span className="block mb-3">
                كفالة أوضح.
              </span>

              <span className="mt-2 block text-[#19C6D2]">
                متابعة أسهل.
              </span>

              <span className="mt-2 block text-[#B8E2EC]">
                رحلة موثقة.
              </span>
            </motion.h1>

            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <motion.p
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    x: 20,
                  }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity: 1,
                    x: 0,
                  }
              }
              transition={{
                duration: 0.6,
                delay: 0.22,
              }}
              className="mt-6 w-full max-w-[650px] font-['Cairo'] text-[13px] font-medium leading-[26px] text-white/90 sm:text-[15px] sm:leading-[29px] lg:text-[16px] lg:leading-[30px]"
            >
              كفيلي منصة رقمية تنظّم رحلة الكفالة بين المؤسسة
              والكفيل والوصي، وتجمع الإجراءات والدفعات والتحديثات
              ضمن رحلة واحدة واضحة وقابلة للمتابعة.
            </motion.p>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    x: 20,
                  }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity: 1,
                    x: 0,
                  }
              }
              transition={{
                duration: 0.6,
                delay: 0.32,
              }}
              className="mt-8 flex w-full flex-col items-start gap-3 sm:w-fit sm:flex-row"
            >
              {/* PRIMARY */}
              <Link
                to="/register"
                className="group inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#19C6D2] px-7 font-['Cairo'] text-[13px] font-bold text-[#06345A] shadow-[0_10px_25px_rgba(25,198,210,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#2BD5DF] hover:shadow-[0_12px_28px_rgba(25,198,210,0.25)] sm:w-auto sm:text-[14px]"
              >
                ابدأ الآن

                <FiChevronLeft
                  size={19}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                />
              </Link>

              {/* SECONDARY */}
              <Link
                to="/how-it-works"
                className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 font-['Cairo'] text-[13px] font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 sm:w-auto sm:text-[14px]"
              >
                <FiInfo
                  size={16}
                  className="text-[#19C6D2]"
                />

                كيف تعمل كفيلي
              </Link>
            </motion.div>

            {/* =================================================
                DIVIDER
            ================================================= */}

            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                    opacity: 0,
                    scaleX: 0.7,
                  }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                    opacity: 1,
                    scaleX: 1,
                  }
              }
              transition={{
                duration: 0.65,
                delay: 0.42,
              }}
              className="mt-8 origin-right border-t border-white/15 pt-5"
            >
              {/* =================================================
                  TRUST POINTS
              ================================================= */}

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {/* ITEM 1 */}
                <div className="flex w-fit items-center justify-start gap-2.5 text-right">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#164263]/90 text-[#19C6D2]">
                    <PiCheckCircle size={18} />
                  </span>

                  <span className="whitespace-nowrap font-['Cairo'] text-[11px] font-semibold leading-[18px] text-white/90 sm:text-[12px]">
                    إجراءات منظمة
                    <span className="block text-white/55">
                      وموثقة
                    </span>
                  </span>
                </div>

                {/* ITEM 2 */}
                <div className="flex w-fit items-center justify-start gap-2.5 text-right">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#164263]/90 text-[#19C6D2]">
                    <PiCheckCircle size={18} />
                  </span>

                  <span className="whitespace-nowrap font-['Cairo'] text-[11px] font-semibold leading-[18px] text-white/90 sm:text-[12px]">
                    خصوصية وصلاحيات
                    <span className="block text-white/55">
                      حسب الدور
                    </span>
                  </span>
                </div>

                {/* ITEM 3 */}
                <div className="flex w-fit items-center justify-start gap-2.5 text-right">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#164263]/90 text-[#19C6D2]">
                    <PiCheckCircle size={18} />
                  </span>

                  <span className="whitespace-nowrap font-['Cairo'] text-[11px] font-semibold leading-[18px] text-white/90 sm:text-[12px]">
                    شفافية
                    <span className="block text-white/55">
                      في كل خطوة
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ===================================================
            SCROLL INDICATOR
        =================================================== */}

        <motion.button
          type="button"
          onClick={() => scrollToSection("governance")}
          initial={
            reduceMotion
              ? false
              : {
                opacity: 0,
              }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                opacity: 1,
              }
          }
          transition={{
            duration: 0.6,
            delay: 0.9,
          }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-['Cairo'] text-[10px] font-semibold text-white/55 transition hover:text-white lg:flex"
        >
          اكتشف المنصة

          <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5">
            <FiArrowLeft size={12} />
          </span>
        </motion.button>
      </section>

      {/* =====================================================
          GOVERNANCE
      ===================================================== */}

      <AnimatedSection
        id="governance"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 bg-white px-5 py-[70px] sm:px-8 lg:px-10 lg:py-[88px]"
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <SectionHeader
            badge="حوكمة الأطراف"
            title="رحلة واحدة تجمع أطراف الكفالة"
            description="لوحة رقمية متكاملة تضمن معرفة كل طرف بمهامه ومسؤولياته في كل لحظة."
            reduceMotion={reduceMotion}
          />

          <motion.div
            className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-3"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.12 }}
          >
            {governanceCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={cardAnimation}
                  className="group flex min-h-[330px] w-full flex-col rounded-[24px] border border-[#E2EBF5] bg-[#F8FAFD] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`rounded-full px-3 py-1 font-['Cairo'] text-[10px] font-bold ${card.labelBg} ${card.labelColor}`}
                    >
                      {card.label}
                    </span>

                    <div
                      className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}
                    >
                      <Icon size={22} />
                    </div>
                  </div>

                  <div className="mt-6 text-right">
                    <h3 className="font-['Cairo'] text-[21px] font-bold text-[#101828]">
                      {card.title}
                    </h3>

                    <p
                      className={`mt-1 font-['Cairo'] text-[14px] font-bold ${card.labelColor}`}
                    >
                      {card.subtitle}
                    </p>

                    <p className="mt-3 font-['Cairo'] text-[12px] font-medium leading-[22px] text-[#667085]">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className={`mt-auto flex min-h-[48px] items-center justify-between gap-3 rounded-xl border bg-white px-3 ${card.statusBorder}`}
                  >
                    <span className="font-['Cairo'] text-[11px] font-bold text-[#334155] sm:text-[12px]">
                      {card.statusTitle}
                    </span>

                    <span
                      className={`rounded-md border px-2.5 py-1.5 text-center font-['Cairo'] text-[10px] font-bold ${card.statusBg} ${card.statusBorder} ${card.statusColor}`}
                    >
                      {card.status}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =====================================================
          PROBLEM
      ===================================================== */}

      <AnimatedSection
        id="problem"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 bg-[#F4F7FB] px-5 py-[70px] sm:px-8 lg:px-8 lg:py-[88px]"
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <SectionHeader
            badge="التحدي القائم"
            title="إدارة الكفالة لا تنتهي عند الدفع"
            description="رحلة الكفالة تشمل بيانات ومستندات ودفعات ومراجعات وتحديثات وشراكات، لذلك تحتاج إلى منظومة واحدة تجمعها وتوضح مراحلها."
            reduceMotion={reduceMotion}
          />

          <motion.div
            className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-3"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.12 }}
          >
            {problemCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={cardAnimation}
                  className="group min-h-[220px] rounded-[20px] border border-[#E2EBF5] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.07)]"
                >
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-xl ${card.iconBg} ${card.iconColor}`}
                  >
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-6 font-['Cairo'] text-[17px] font-bold text-[#101828]">
                    {card.title}
                  </h3>

                  <p className="mt-2 font-['Cairo'] text-[12px] font-medium leading-[22px] text-[#667085]">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col gap-5 rounded-[20px] bg-[#0D4B8E] p-6 shadow-[0_12px_30px_rgba(13,75,142,0.15)] sm:flex-row sm:items-center sm:justify-between sm:px-7"
            variants={revealUp}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.18 }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0A638F] text-[#2DBCC3]">
                <FiZap size={18} />
              </div>

              <div className="text-right">
                <h3 className="font-['Cairo'] text-[18px] font-bold text-white">
                  من هنا جاءت كفيلي.
                </h3>

                <p className="mt-1 max-w-[650px] font-['Cairo'] text-[14px] font-medium leading-[19px] text-[#D6E4F0]">
                  صممنا تجربة رقمية تجمع أطراف الكفالة في مكان واحد
                  وتساعد على تنظيمها ومتابعتها بوضوح.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("solution")}
              className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2DBCC3] px-5 font-['Cairo'] text-[14px] font-bold text-[#073B59] transition duration-300 hover:-translate-y-0.5 hover:bg-[#42CBD1]"
            >
              اكتشف كيف نعمل
              <FiArrowLeft size={20} />
            </button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =====================================================
          SOLUTION
      ===================================================== */}

      <AnimatedSection
        id="solution"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#062246] via-[#0D4B8E] to-[#062246] px-5 py-[78px] sm:px-8 lg:px-8 lg:py-[96px]"
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <SectionHeader
            badge="الحل والتوجيه"
            title="منظومة واحدة لإدارة رحلة الكفالة"
            description="كفيلي تجمع المؤسسة والكفيل والوصي ضمن رحلة رقمية واحدة، بحيث يعرف كل طرف دوره وما يحتاج إليه."
            dark
            reduceMotion={reduceMotion}
          />

          <motion.div
            className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-3"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.12 }}
          >
            {solutionCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={cardAnimation}
                  className="group min-h-[260px] rounded-[24px] border border-white/10 bg-white/[0.09] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.13] hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-[#2DBCC3] transition-transform duration-300 group-hover:scale-105">
                    <Icon size={19} />
                  </div>

                  <div className="mt-6 text-right">
                    <h3 className="font-['Cairo'] text-[17px] font-bold text-white">
                      {card.title}
                    </h3>

                    <p className="mt-2 font-['Cairo'] text-[12px] font-medium leading-[22px] text-[#D6E4F0]">
                      {card.description}
                    </p>

                    <div className="mt-6 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />

                      <span className="font-['Cairo'] text-[10px] font-semibold text-[#2DBCC3]">
                        {card.note}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-7 flex flex-col gap-5 rounded-[18px] border border-white/10 bg-[#062246]/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
            variants={revealUp}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.12 }}
          >
            <div className="text-right">
              <p className="font-['Cairo'] text-[10px] font-medium text-[#2DBCC3]">
                دليل نجاح المنظومة
              </p>

              <h3 className="mt-1 font-['Cairo'] text-[15px] font-bold text-white">
                ركائز المنظومة
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:gap-3">
              {["تنظيم", "توثيق", "متابعة"].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-center gap-1 rounded-lg bg-[#12385F] px-3 py-2.5 font-['Cairo'] text-[10px] font-semibold text-white sm:px-4"
                >
                  {item}

                  <span className="text-[#2DBCC3]">
                    ✓
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =====================================================
          WHY KAFEELI
      ===================================================== */}

      <AnimatedSection
        id="why-kafeeli"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 bg-white px-5 py-[75px] sm:px-8 lg:px-8 lg:py-[95px]"
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <SectionHeader
            badge="القيمة المضافة"
            title="لماذا كفيلي؟"
            description="لأن التحدي ليس فقط بدء الكفالة، بل في إدارتها وتوثيقها ومتابعتها بشكل واضح."
            reduceMotion={reduceMotion}
          />

          <motion.div
            className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.12 }}
          >
            {whyCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={cardAnimation}
                  className="group min-h-[225px] rounded-[18px] border border-[#E2EBF5] bg-[#F8FAFD] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_rgba(15,23,42,0.07)]"
                >
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-[11px] ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon size={18} />
                  </div>

                  <h3 className="mt-5 font-['Cairo'] text-[17px] font-bold text-[#0F172A]">
                    {card.title}
                  </h3>

                  <p className="mt-2 font-['Cairo'] text-[12px] font-medium leading-[22px] text-[#667085]">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =====================================================
    INSTITUTIONS (KAFEELI FOR INSTITUTIONS)
===================================================== */}

      <AnimatedSection
        id="institutions"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 bg-[#F4F7FB] px-5 py-[70px] sm:px-8 lg:px-8 lg:py-[90px]"
      >
        <div className="mx-auto w-full max-w-[1216px]">

          {/* Main White Card Container */}
          <motion.div
            variants={revealUp}
            className="rounded-[32px] border border-[#E2EBF5] bg-white p-8 shadow-xl sm:p-10 lg:p-14"
          >
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">

              {/* =================================================
            RIGHT SIDE — CONTENT
        ================================================= */}

              <motion.div
                className="order-1 text-right lg:order-1 lg:col-span-5"
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.18 }}
                variants={revealUp}
              >
                {/* Badge */}
                <span className="mb-4 inline-flex rounded-full bg-[#EAF2F9] px-4 py-1.5 font-['Cairo'] text-xs font-bold text-[#19579A]">
                  كفيلي للمؤسسات
                </span>

                {/* Title */}
                <h2 className="font-['Cairo'] text-[30px] font-black leading-[1.25] tracking-[-0.5px] text-[#0F172A] sm:text-[36px] lg:text-[42px]">
                  إدارة الكفالات
                  <span className="block text-[#0D4B8E]">
                    في نظام واحد
                  </span>
                </h2>

                {/* Description */}
                <p className="mt-4 max-w-[540px] font-['Cairo'] text-xs font-medium leading-relaxed text-[#64748B] sm:text-sm lg:text-base">
                  تساعد كفيلي المؤسسات على تنظيم الحالات والكفلاء
                  والأوصياء والكفالات والإجراءات المرتبطة بها، بدل
                  توزيع رحلة العمل بين أدوات متعددة.
                </p>

                {/* Button */}
                <Link
                  to="/organizations"
                  className="mt-7 inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0D4B8E] px-7 py-3.5 font-['Cairo'] text-sm font-bold text-white shadow-lg shadow-[#0D4B8E]/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#083463] active:scale-95 sm:text-base"
                >
                  <span>
                    اكتشف كفيلي للمؤسسات
                  </span>

                  <FiArrowLeft size={18} />
                </Link>
              </motion.div>

              {/* =================================================
            LEFT SIDE — CARDS
        ================================================= */}

              <motion.div
                className="order-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:order-2 lg:col-span-7 sm:gap-5"
                variants={staggerContainer}
                initial={reduceMotion ? false : "hidden"}
                whileInView={reduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.12 }}
              >
                {institutionCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <motion.div
                      key={card.title}
                      variants={cardAnimation}
                      className="group min-h-[175px] rounded-2xl border border-[#E2EBF5] bg-[#F8FAFD] p-6 text-right transition-all duration-300 hover:-translate-y-1 hover:border-[#0D4B8E]/30 hover:shadow-md"
                    >
                      {/* Icon */}
                      <div
                        className={`grid h-11 w-11 place-items-center rounded-xl ${card.iconBg} ${card.iconColor} transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon size={20} />
                      </div>

                      {/* Title */}
                      <h3 className="mt-4 font-['Cairo'] text-[15px] font-extrabold text-[#0F172A]">
                        {card.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-1.5 font-['Cairo'] text-[12px] font-medium leading-[21px] text-[#64748B]">
                        {card.description}
                      </p>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <AnimatedSection
        id="process"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 border-b border-[#EAF0F5] bg-white px-5 py-[75px] sm:px-8 lg:px-8 lg:py-[95px]"
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <SectionHeader
            badge="التسلسل الإجرائي"
            title="رحلة واضحة من البداية إلى المتابعة"
            description="كل مرحلة لها إجراء واضح، وطرف مسؤول، وحالة يمكن متابعتها."
            reduceMotion={reduceMotion}
          />

          <motion.div
            className="relative mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="pointer-events-none absolute right-[10%] left-[10%] top-[39px] hidden h-px bg-[#DCE7F2] lg:block" />

            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={cardAnimation}
                className="relative z-10 flex min-h-[220px] flex-col rounded-[18px] border border-[#E2EBF5] bg-[#F8FAFD] p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
              >
                <span className="font-['Cairo'] text-[31px] font-black leading-none text-[#0D4B8E]/15">
                  {step.number}
                </span>

                <h3 className="mt-4 font-['Cairo'] text-[16px] font-bold leading-[24px] text-[#0F172A]">
                  {step.title}
                </h3>

                <p className="mt-2 font-['Cairo'] text-[11px] font-medium leading-[20px] text-[#718096]">
                  {step.description}
                </p>

                <div className="mt-auto pt-5">
                  <span className="inline-flex rounded-md bg-[#EAF2F9] px-2.5 py-1.5 font-['Cairo'] text-[9px] font-bold text-[#0D4B8E]">
                    الخطوة {step.number}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/how-it-works"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0D5BA8] px-5 font-['Cairo'] text-[14px] font-bold text-white shadow-[0_6px_14px_rgba(13,91,168,0.15)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0B4F94]"
            >
              شاهد الرحلة بالتفصيل
              <FiArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* =====================================================
          TRUST
      ===================================================== */}

      <AnimatedSection
        id="trust"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 bg-white px-5 py-[75px] sm:px-8 lg:px-8 lg:py-[95px]"
      >
        <div className="mx-auto w-full max-w-[1216px]">
          <SectionHeader
            badge="الأمان والمصداقية"
            title="الثقة تبدأ من وضوح كل خطوة"
            description="لأن رحلة الكفالة تتعامل مع بيانات حساسة وإجراءات مالية، تساعد كفيلي على جعل المسؤوليات والإجراءات والمتابعة أكثر وضوحًا."
            reduceMotion={reduceMotion}
          />

          <motion.div
            className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.12 }}
          >
            {trustCards.map((card) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  variants={cardAnimation}
                  className="group min-h-[190px] rounded-[17px] border border-[#E2EBF5] bg-[#F8FAFD] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.06)]"
                >
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-[10px] ${card.iconBg} ${card.iconColor}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="mt-5 text-right">
                    <h3 className="font-['Cairo'] text-[16px] font-bold text-[#0F172A]">
                      {card.title}
                    </h3>

                    <p className="mt-1.5 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#52657D]">
                      {card.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <AnimatedSection
        id="final-cta"
        reduceMotion={reduceMotion}
        className="scroll-mt-24 bg-[#F4F7FB] px-5 py-[65px] sm:px-8 lg:px-8 lg:py-[80px]"
      >
        <div className="relative mx-auto flex min-h-[390px] w-full max-w-[1216px] items-center justify-center overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-br from-[#062246] via-[#0D4B8E] to-[#072B53] px-6 py-14 shadow-[0_18px_45px_rgba(6,34,70,0.18)] sm:px-10 lg:px-12">
          {/* Decorative circles */}

          <div className="pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 rounded-full border border-[#2DBCC3]/10" />

          <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full border border-[#2DBCC3]/10" />

          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-[#2DBCC3]/10" />

          <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-[#2DBCC3]/10" />

          {/* Decorative dots */}

          <span className="pointer-events-none absolute bottom-16 left-16 h-2 w-2 rounded-full bg-[#2DBCC3]/50" />

          <span className="pointer-events-none absolute right-20 top-20 h-2 w-2 rounded-full bg-[#2DBCC3]/60" />

          <span className="pointer-events-none absolute bottom-24 right-[22%] h-1.5 w-1.5 rounded-full bg-white/20" />

          {/* Content */}

          <motion.div
            className="relative z-10 flex w-full max-w-[720px] flex-col items-center text-center"
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
            variants={revealUp}
          >
            <span className="inline-flex items-center rounded-full border border-[#2DBCC3]/20 bg-[#2DBCC3]/10 px-3 py-1.5 font-['Cairo'] text-[10px] font-semibold text-[#2DBCC3] sm:text-[11px]">
              <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />

              ابدأ رحلتك اليوم مع كفيلي
            </span>

            <h2 className="mt-5 font-['Cairo'] text-[29px] font-black leading-[1.4] tracking-[-0.4px] text-white sm:text-[34px] lg:text-[40px]">
              رحلة كفالة أوضح تبدأ من هنا
            </h2>

            <p className="mt-4 max-w-[680px] font-['Cairo'] text-[13px] font-medium leading-[25px] text-[#D6E4F0] sm:text-[14px] sm:leading-[27px] lg:text-[15px]">
              سواء كنت كفيلاً تريد متابعة كفالتك بوضوح، أو مؤسسة
              تريد تنظيم وإدارة كفالاتها، يجمع كفيلي الرحلة في منصة
              واحدة.
            </p>

            <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/register"
                className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-[#2DBCC3] px-8 font-['Cairo'] text-[14px] font-bold text-[#062246] transition duration-300 hover:-translate-y-0.5 hover:bg-[#3ACDD4] hover:shadow-[0_10px_22px_rgba(45,188,195,0.22)] sm:w-auto"
              >
                ابدأ الآن

                <FiArrowLeft size={18} />
              </Link>

              <button
                type="button"
                onClick={() => scrollToSection("institutions")}
                className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-8 font-['Cairo'] text-[14px] font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
              >
                كفيلي للمؤسسات

                <FiGrid
                  size={16}
                  className="text-[#2DBCC3]"
                />
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      <Footer />
    </div>
  );
}