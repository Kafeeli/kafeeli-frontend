// LandingPage.jsx
import Header from "./header";
import Footer from "./Footer";
import heroBg from "../assets/hero-bg.png";
import orphan1 from "../assets/orphan1.jpg";
import orphan2 from "../assets/orphan2.jpg";
import orphan3 from "../assets/orphan3.jpg";
import orphan4 from "../assets/orphan4.jpg";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaUsers, FaEye, FaShieldAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

import { PiBuildings, PiHandHeartFill, PiUsersThreeFill, PiLockKeyOpen, PiCheckCircle } from "react-icons/pi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdFamilyRestroom } from "react-icons/md";
import { LuFileStack } from "react-icons/lu";

import {
  FiHome,
  FiClipboard,
  FiMail,
  FiMapPin,
  FiEye,
  FiArrowLeft,
  FiCreditCard,
  FiRefreshCw,
  FiUsers,
  FiGrid,
  FiTrendingUp,
  FiShield,
  FiUser,
  FiCheck,
  FiChevronLeft,
  FiInfo,
  FiUserCheck,
  FiFileText,
  FiAlertTriangle,
  FiBriefcase,
  FiZap,
} from "react-icons/fi";

import main from "../assets/main.png";

export default function LandingPage() {
  // Counter Animation States
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const sectionRef = useRef(null);

  // Counter Animation - كل الأرقام بسيكشن واحد
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // animate count1 (10)
          animateCount(setCount1, 10);
          // animate count2 (2)
          animateCount(setCount2, 2);
          // animate count3 (5000)
          animateCount(setCount3, 5000);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const animateCount = (setCount, end) => {
    let startTime = null;
    const duration = 2000;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * end);

      if (progress === 1) {
        setCount(end);
      } else {
        setCount(current);
      }

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };
  const features = [
    {
      icon: <FaShieldAlt className="w-8 h-8 text-blue-900" />,
      title: "الأمان والخصوصية",
      description: "نضمن سرية بيانات المتبرعين والأيتام واستخدام أحدث تقنيات التشفير العالمي.",
    },
    {
      icon: <FaEye className="w-8 h-8 text-teal-500" />,
      title: "شفافية تامة",
      description: "تقارير دورية وفورية توضح أين تذهب كل هللة من تبرعك وكيف تؤثر في حياة اليتيم.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-[#D9A441]" />,
      title: "تواصل إنساني",
      description: "نفتح جسور التواصل المعنوي بين الكفيل والمكفول من خلال الرسائل والهدايا.",
    },
  ];
  const orphans = [
    {
      id: 1,
      name: "يوسف أحمد",
      age: "8 سنوات",
      location: "غزة",
      image: orphan1,
    },
    {
      id: 2,
      name: "سارة محمود",
      age: "10 سنوات",
      location: "غزة",
      image: orphan2,
    },
    {
      id: 3,
      name: "محمد خالد",
      age: "6 سنوات",
      location: "غزة",
      image: orphan3,
    },
    { id: 4, name: "ليلى عمر", age: "12 سنة", location: "غزة", image: orphan4 },
  ];
  const steps = [
    {
      number: "1",
      title: "التسجيل واختيار الحالة",
      description: "أنشئ حسابك وتصفح حالات الأيتام لاختيار من يلمس قلبك.",
      color: "bg-[#F8F9FA] text-[#0D4B8E]",
    },
    {
      number: "2",
      title: "تفعيل الكفالة",
      description: "اختر مبلغ الكفالة الشهري الذي يناسبك وقم بعملية الدفع الآمن.",
      color: "bg-[#2DBCC3] text-white",
    },
    {
      number: "3",
      title: "متابعة الأثر",
      description: "استلم تقارير دورية عن تقدم اليتيم دراسياً وصحياً وتواصل معه.",
      color: "bg-[#F8F9FA] text-[#0D4B8E]",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F9FA]">
      <Header />
      {/* Hero Section */}

      {/* ================= HERO SECTION ================= */}
      {/* ================= HERO SECTION ================= */}
      <section id="home" className="relative h-[100vh] w-full overflow-hidden">
        {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0">
          <img
            src={main}
            alt="Kafeeli"
            className="h-full w-full object-cover object-[35%_center] sm:object-[40%_center] lg:object-center"
          />

          {/* Right Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(270deg, rgba(4, 23, 48, 0.95) 0%, rgba(4, 23, 48, 0.65) 45%, rgba(4, 23, 48, 0.15) 100%)",
            }}
          />

          {/* Bottom Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, #062244 0%, rgba(6, 34, 68, 0) 50%, rgba(0, 0, 0, 0.2) 100%)",
            }}
          />
        </div>

        {/* ================= CONTENT WRAPPER ================= */}
        {/* ================= CONTENT ================= */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] items-center justify-end px-[clamp(20px,5vw,96px)]">
          <div className="ml-auto w-full max-w-[820px] translate-y-[clamp(20px,4vh,55px)] text-right 2xl:max-w-[900px]">
            {/* ================= BADGE ================= */}
            <div
              dir="rtl"
              className="mb-[clamp(18px,2.2vh,28px)] inline-flex w-fit items-center gap-[clamp(7px,0.6vw,11px)] rounded-full border border-[#5B7D9F] bg-[#183B60]/70 px-[clamp(12px,1vw,18px)] py-[clamp(5px,0.55vw,9px)] font-['Cairo'] text-[clamp(11px,0.8vw,15px)] font-bold leading-[1.5] text-white backdrop-blur-sm"
            >
              <span className="h-[clamp(8px,0.6vw,12px)] w-[clamp(8px,0.6vw,12px)] shrink-0 rounded-full bg-[#19C6D2]" />
              <span>منصة رقمية لإدارة رحلة الكفالة</span>
            </div>

            {/* ================= HEADING ================= */}
            <h1
              dir="rtl"
              className="text-right font-['Cairo'] text-[clamp(38px,4.7vw,76px)] font-black leading-[1.06] tracking-[-1px] text-white lg:tracking-[-1.5px] [@media(max-height:720px)]:text-[clamp(34px,4vw,58px)] [@media(max-height:620px)]:text-[clamp(30px,3.6vw,48px)]"
            >
              <span className="mb-[clamp(10px,1.4vh,20px)] block">كفالة أوضح.</span>

              <span className="mb-[clamp(10px,1.4vh,20px)] block text-[#19C6D2]">متابعة أسهل.</span>

              <span className="block text-[#A9D9EA]">رحلة موثقة.</span>
            </h1>

            {/* ================= DESCRIPTION ================= */}
            <p
              dir="rtl"
              className="mt-[clamp(20px,2.6vh,32px)] max-w-[780px] text-right font-['Cairo'] text-[clamp(12px,1vw,17px)] font-normal leading-[1.9] text-white [@media(max-height:700px)]:mt-4 [@media(max-height:700px)]:text-[clamp(11px,0.9vw,14px)] [@media(max-height:620px)]:leading-[1.6]"
            >
              كفيلي منصة رقمية تنظّم رحلة الكفالة بين المؤسسة والكفيل والوصي، وتجمع الإجراءات والدفعات والتحديثات ضمن رحلة واحدة واضحة
              وقابلة للمتابعة.
            </p>

            {/* ================= BUTTONS ================= */}
            <div className="mt-[clamp(20px,2.6vh,32px)] flex flex-col items-start gap-3 min-[480px]:flex-row min-[480px]:justify-start min-[480px]:gap-4">
              {/* Start Button */}
              <button
                type="button"
                className="inline-flex h-[clamp(44px,4vw,54px)] w-full items-center justify-center gap-2 rounded-[12px] bg-[#19C6D2] px-[clamp(20px,1.8vw,30px)] font-['Cairo'] text-[clamp(12px,0.9vw,15px)] font-bold text-[#06345A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#22D3DF] min-[480px]:w-auto"
              >
                <span>ابدأ الآن</span>
                <FiChevronLeft size={21} strokeWidth={2.5} className="shrink-0 text-[#06345A]" />
              </button>

              {/* How It Works */}
              <button
                type="button"
                className="inline-flex h-[clamp(44px,4vw,54px)] w-full items-center justify-center gap-2 rounded-[12px] border border-white/30 bg-white/10 px-[clamp(20px,1.8vw,30px)] font-['Cairo'] text-[clamp(12px,0.9vw,15px)] font-bold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 min-[480px]:w-auto"
              >
                <FiInfo size={16} className="shrink-0 text-[#19C6D2]" />
                <span>كيف تعمل كفيلي</span>
              </button>
            </div>

            {/* ================= TRUST POINTS ================= */}
            <div className="mt-[clamp(22px,3vh,38px)] border-t border-white/20 pt-[clamp(16px,2vh,26px)]">
              <div className="grid grid-cols-1 gap-3 min-[520px]:grid-cols-3 min-[520px]:gap-[clamp(14px,1.4vw,24px)]">
                {/* Point 1 */}
                <div
                  dir="rtl"
                  className="flex items-center gap-2.5 font-['Cairo'] text-[clamp(10px,0.8vw,14px)] font-semibold text-gray-200"
                >
                  <span className="grid h-[clamp(26px,2vw,34px)] w-[clamp(26px,2vw,34px)] shrink-0 place-items-center rounded-full bg-[#164263] text-[#19C6D2]">
                    <PiCheckCircle className="text-[clamp(17px,1.3vw,21px)]" />
                  </span>
                  <span>إجراءات منظمة وموثقة</span>
                </div>

                {/* Point 2 */}
                <div
                  dir="rtl"
                  className="flex items-center gap-2.5 font-['Cairo'] text-[clamp(10px,0.8vw,14px)] font-semibold text-gray-200"
                >
                  <span className="grid h-[clamp(26px,2vw,34px)] w-[clamp(26px,2vw,34px)] shrink-0 place-items-center rounded-full bg-[#164263] text-[#19C6D2]">
                    <PiCheckCircle className="text-[clamp(17px,1.3vw,21px)]" />
                  </span>
                  <span>.خصوصية وصلاحيات متقدمة</span>
                </div>

                {/* Point 3 */}
                <div
                  dir="rtl"
                  className="flex items-center gap-2.5 font-['Cairo'] text-[clamp(10px,0.8vw,14px)] font-semibold text-gray-200"
                >
                  <span className="grid h-[clamp(26px,2vw,34px)] w-[clamp(26px,2vw,34px)] shrink-0 place-items-center rounded-full bg-[#164263] text-[#19C6D2]">
                    <PiCheckCircle className="text-[clamp(17px,1.3vw,21px)]" />
                  </span>
                  <span>شفافية في كل خطوة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= GOVERNANCE SECTION ================= */}
      <section id="governance" className="bg-white px-[clamp(16px,3vw,48px)] py-[clamp(48px,5vw,90px)]">
        <div className="mx-auto w-full max-w-[clamp(1100px,88vw,1500px)]">
          {/* ================= HEADER ================= */}
          <div className="flex flex-col items-center text-center">
            <div
              dir="rtl"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[rgba(45,188,195,0.1)] px-[clamp(10px,0.8vw,14px)] py-[clamp(5px,0.4vw,8px)]"
            >
              <span className="font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-bold leading-[1.5] text-[#2DBCC3]">حوكمة الأطراف</span>
            </div>

            <h2
              dir="rtl"
              className="mt-[clamp(12px,1.2vw,20px)] text-center font-['Cairo'] text-[clamp(26px,2.5vw,44px)] font-black leading-[1.35] tracking-[0px] text-[#101828]"
            >
              رحلة واحدة تجمع أطراف الكفالة
            </h2>

            <p
              dir="rtl"
              className="mt-[clamp(10px,1vw,16px)] max-w-[clamp(600px,50vw,850px)] text-center font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.75] tracking-[0px] text-[#667085]"
            >
              لوحة رقمية متكاملة تضمن معرفة كل طرف بمهامه ومسؤولياته في كل لحظة.
            </p>
          </div>

          {/* ================= CARDS ================= */}
          <div className="mt-[clamp(28px,3vw,52px)] grid grid-cols-1 justify-items-center gap-[clamp(16px,1.5vw,26px)] md:grid-cols-3">
            {/* ================= INSTITUTION ================= */}
            <div className="flex h-full min-h-[clamp(280px,22vw,360px)] w-full max-w-none flex-col rounded-[clamp(18px,1.5vw,26px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(20px,2vw,32px)] transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="grid h-[clamp(42px,3.2vw,54px)] w-[clamp(42px,3.2vw,54px)] shrink-0 place-items-center rounded-[clamp(10px,0.8vw,14px)] bg-[#0D4B8E] text-white">
                  <PiBuildings className="text-[clamp(19px,1.4vw,24px)]" />
                </div>

                <span
                  dir="rtl"
                  className="rounded-full bg-[#EAF0F7] px-[clamp(10px,0.8vw,14px)] py-[clamp(4px,0.35vw,6px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-semibold text-[#315B8C]"
                >
                  الطرف الأول
                </span>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] flex flex-1 flex-col text-right">
                <h3 dir="rtl" className="font-['Cairo'] text-[clamp(17px,1.4vw,23px)] font-bold leading-[1.45] text-[#101828]">
                  المؤسسة
                </h3>

                <p
                  dir="rtl"
                  className="mt-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(12px,0.9vw,15px)] font-semibold leading-[1.5] text-[#2F5D8A]"
                >
                  إدارة وتنظيم الكفالات
                </p>

                <p
                  dir="rtl"
                  className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(11px,0.9vw,15px)] font-medium leading-[1.7] text-[#667085]"
                >
                  إدارة وتنظيم الكفالات ومتابعة الحالات والبيانات والتأكد من استيفاء المتطلبات.
                </p>

                <div className="mt-auto flex min-h-[clamp(42px,3.5vw,50px)] w-full items-center justify-between gap-2 rounded-[clamp(10px,0.8vw,13px)] border border-[#E2EBF5] bg-white px-[clamp(10px,0.9vw,14px)]">
                  <span className="font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-bold text-[#334155]">الحالة التشغيلية</span>

                  <span className="rounded-[4px] border border-[#DDE6F0] bg-[#F3F7FB] px-[clamp(7px,0.6vw,11px)] py-[clamp(4px,0.3vw,6px)] text-center font-['Cairo'] text-[clamp(9px,0.7vw,12px)] font-semibold leading-none text-[#19579A]">
                    صلاحيات إدارية كاملة
                  </span>
                </div>
              </div>
            </div>

            {/* ================= SPONSOR ================= */}
            <div className="flex h-full min-h-[clamp(280px,22vw,360px)] w-full max-w-none flex-col rounded-[clamp(18px,1.5vw,26px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(20px,2vw,32px)] transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="grid h-[clamp(42px,3.2vw,54px)] w-[clamp(42px,3.2vw,54px)] shrink-0 place-items-center rounded-[clamp(10px,0.8vw,14px)] bg-[#2DBCC3] text-white">
                  <PiHandHeartFill className="text-[clamp(19px,1.4vw,24px)]" />
                </div>

                <span
                  dir="rtl"
                  className="rounded-full bg-[#E6F8F9] px-[clamp(10px,0.8vw,14px)] py-[clamp(4px,0.35vw,6px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-semibold text-[#2DBCC3]"
                >
                  الطرف الثاني
                </span>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] flex flex-1 flex-col text-right">
                <h3 dir="rtl" className="font-['Cairo'] text-[clamp(17px,1.4vw,23px)] font-bold leading-[1.45] text-[#101828]">
                  الكفيل
                </h3>

                <p
                  dir="rtl"
                  className="mt-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(12px,0.9vw,15px)] font-semibold leading-[1.5] text-[#2DBCC3]"
                >
                  متابعة الكفالة وتوثيقها
                </p>

                <p
                  dir="rtl"
                  className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(11px,0.9vw,15px)] font-medium leading-[1.7] text-[#667085]"
                >
                  اختيار الحالة المناسبة وإنشاء الكفالة ومتابعة الدفعات والتحديثات الخاصة بها.
                </p>

                <div className="mt-auto flex min-h-[clamp(42px,3.5vw,50px)] items-center justify-between gap-2 rounded-[clamp(10px,0.8vw,13px)] border border-[#E2EBF5] bg-white px-[clamp(10px,0.9vw,14px)]">
                  <span className="font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-bold text-[#334155]">قناة المتابعة</span>

                  <span className="rounded-[4px] border border-[#BDECEF] bg-[#F2FBFC] px-[clamp(7px,0.6vw,11px)] py-[clamp(4px,0.3vw,6px)] text-center font-['Cairo'] text-[clamp(9px,0.7vw,12px)] font-semibold leading-none text-[#2DBCC3]">
                    متابعة شفافة ومباشرة
                  </span>
                </div>
              </div>
            </div>

            {/* ================= GUARDIAN ================= */}
            <div className="flex h-full min-h-[clamp(280px,22vw,360px)] w-full max-w-none flex-col rounded-[clamp(18px,1.5vw,26px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(20px,2vw,32px)] transition duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div className="grid h-[clamp(42px,3.2vw,54px)] w-[clamp(42px,3.2vw,54px)] shrink-0 place-items-center rounded-[clamp(10px,0.8vw,14px)] bg-[#D9A441] text-white">
                  <MdFamilyRestroom className="text-[clamp(19px,1.4vw,24px)]" />
                </div>

                <span
                  dir="rtl"
                  className="rounded-full bg-[#FFF5DF] px-[clamp(10px,0.8vw,14px)] py-[clamp(4px,0.35vw,6px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-semibold text-[#D9A441]"
                >
                  الطرف الثالث
                </span>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] flex flex-1 flex-col text-right">
                <h3 dir="rtl" className="font-['Cairo'] text-[clamp(17px,1.4vw,23px)] font-bold leading-[1.45] text-[#101828]">
                  الوصي
                </h3>

                <p
                  dir="rtl"
                  className="mt-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(12px,0.9vw,15px)] font-semibold leading-[1.5] text-[#D9A441]"
                >
                  استلام ومتابعة الكفالة
                </p>

                <p
                  dir="rtl"
                  className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(11px,0.9vw,15px)] font-medium leading-[1.7] text-[#667085]"
                >
                  تقديم البيانات والوثائق المطلوبة ومتابعة حالة الكفالة والتحويلات المتعلقة بالحالة.
                </p>

                <div className="mt-auto flex min-h-[clamp(42px,3.5vw,50px)] items-center justify-between gap-2 rounded-[clamp(10px,0.8vw,13px)] border border-[#E2EBF5] bg-white px-[clamp(10px,0.9vw,14px)]">
                  <span className="font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-bold text-[#334155]">البيئة التفاعلية</span>

                  <span className="rounded-[4px] border border-[#F3D9A0] bg-[#FFFBF2] px-[clamp(7px,0.6vw,11px)] py-[clamp(4px,0.3vw,6px)] text-center font-['Cairo'] text-[clamp(9px,0.7vw,12px)] font-semibold leading-none text-[#D99A22]">
                    حفظ الخصوصية والكرامة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM SECTION ================= */}
      <section id="problem" dir="rtl" className="w-full bg-[#F4F7FB] px-[clamp(16px,3vw,48px)] py-[clamp(50px,5vw,90px)]">
        <div className="mx-auto w-full max-w-[clamp(1100px,88vw,1500px)]">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full max-w-[clamp(650px,55vw,900px)] flex-col items-center text-center">
            <span className="rounded-full border border-[#FFD9DF] bg-[#FFF1F2] px-[clamp(10px,0.8vw,14px)] py-[clamp(4px,0.35vw,6px)] font-['Cairo'] text-[clamp(10px,0.75vw,13px)] font-bold leading-[1.5] text-[#F04461]">
              التحدي القائم
            </span>

            <h2 className="mt-[clamp(12px,1.2vw,20px)] font-['Cairo'] text-[clamp(26px,2.5vw,44px)] font-black leading-[1.35] tracking-[-0.3px] text-[#101828]">
              إدارة الكفالة لا تنتهي عند الدفع
            </h2>

            <p className="mt-[clamp(12px,1.2vw,20px)] max-w-[clamp(620px,55vw,900px)] font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.75] text-[#667085]">
              رحلة الكفالة تشمل بيانات ومستندات ودفعات ومراجعات وتحديثات وشراكات، لكنها لا تنتهي هنا.
              <br className="hidden sm:block" />
              العمليات موزعة بين الملفات والمحادثات والأدوات المختلفة، فيصبح الإدارة والمتابعة والتوثيق أكثر صعوبة.
            </p>
          </div>

          {/* ================= PROBLEM CARDS ================= */}
          <div className="mt-[clamp(30px,3vw,52px)] grid grid-cols-1 gap-[clamp(16px,1.5vw,26px)] md:grid-cols-3">
            {/* Card 1 */}
            <div className="flex min-h-[clamp(200px,16vw,270px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-white p-[clamp(20px,2vw,30px)] shadow-[0_4px_12px_rgba(16,24,40,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex justify-start">
                <div className="grid h-[clamp(38px,2.8vw,46px)] w-[clamp(38px,2.8vw,46px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-[#FFF0F2] text-[#F04461]">
                  <LuFileStack className="text-[clamp(17px,1.2vw,21px)]" />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-[#101828]">
                  ملفات وإجراءات متفرقة
                </h3>

                <p className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(11px,0.9vw,15px)] font-medium leading-[1.7] text-[#667085]">
                  بيانات الكفالة قد تكون موزعة بين أكثر من أداة، مما يزيد من احتمالية ضياع المعلومات المهمة.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex min-h-[clamp(200px,16vw,270px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-white p-[clamp(20px,2vw,30px)] shadow-[0_4px_12px_rgba(16,24,40,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex justify-start">
                <div className="grid h-[clamp(38px,2.8vw,46px)] w-[clamp(38px,2.8vw,46px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-[#FFF9E8] text-[#F59E0B]">
                  <FiAlertTriangle className="text-[clamp(17px,1.2vw,21px)]" />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-[#101828]">متابعة غير متكاملة</h3>

                <p className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(11px,0.9vw,15px)] font-medium leading-[1.7] text-[#667085]">
                  كل طرف قد يرى جزءًا من الرحلة دون رؤية منظومة الإجراءات المرتبطة به أو المعرفة الدقيقة بالمرحلة التالية.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex min-h-[clamp(200px,16vw,270px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-white p-[clamp(20px,2vw,30px)] shadow-[0_4px_12px_rgba(16,24,40,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex justify-start">
                <div className="grid h-[clamp(38px,2.8vw,46px)] w-[clamp(38px,2.8vw,46px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-[#EFF8FF] text-[#1570EF]">
                  <IoDocumentTextOutline className="text-[clamp(17px,1.2vw,21px)]" />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-[#101828]">
                  توثيق يحتاج إلى تنظيم
                </h3>

                <p className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(11px,0.9vw,15px)] font-medium leading-[1.7] text-[#667085]">
                  المستندات والمعلومات تحتاج إلى سجل واضح وموحد يربط كل كفالة بمراحلها وتحديثاتها.
                </p>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM CTA ================= */}
          <div
            dir="rtl"
            className="mt-[clamp(24px,2.5vw,40px)] flex w-full flex-col items-start justify-between gap-[clamp(18px,2vw,28px)] rounded-[clamp(14px,1vw,18px)] bg-[#0D4B8E] px-[clamp(18px,2vw,30px)] py-[clamp(20px,1.8vw,28px)] shadow-[0_8px_20px_rgba(0,0,0,0.10)] sm:flex-row sm:items-center"
          >
            {/* Right Content */}
            <div className="flex items-start gap-[clamp(10px,0.9vw,14px)] sm:items-center">
              <div className="grid h-[clamp(34px,2.6vw,42px)] w-[clamp(34px,2.6vw,42px)] shrink-0 place-items-center rounded-full bg-[#0A638F] text-[#2DBCC3]">
                <FiZap className="text-[clamp(17px,1.2vw,21px)]" />
              </div>

              <div className="text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-white">من هنا جاءت كفيلي.</h3>

                <p className="mt-[clamp(6px,0.6vw,10px)] max-w-[clamp(600px,60vw,950px)] font-['Cairo'] text-[clamp(11px,0.9vw,15px)] font-medium leading-[1.7] text-[#D6E4F0]">
                  صممنا تجربة رقمية تجمع أطراف الكفالة في مكان واحد وتساعد على تنظيمها ومتابعتها بأعلى درجات الموثوقية.
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="inline-flex h-[clamp(40px,3.2vw,50px)] w-full shrink-0 items-center justify-center rounded-[clamp(7px,0.6vw,10px)] bg-[#2DBCC3] px-[clamp(18px,1.5vw,26px)] font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-bold text-[#073B59] transition duration-200 hover:-translate-y-0.5 hover:bg-[#42CBD1] sm:w-auto"
            >
              اكتشف كيف نعمل
            </button>
          </div>
        </div>
      </section>
      {/* ================= SOLUTION SECTION ================= */}
      <section
        id="solution"
        dir="rtl"
        className="w-full overflow-hidden bg-gradient-to-b from-[#062246] via-[#0D4B8E] to-[#062246] px-[clamp(16px,3vw,48px)] py-[clamp(56px,5vw,96px)]"
      >
        <div className="mx-auto w-full max-w-[clamp(1100px,88vw,1500px)]">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full max-w-[clamp(650px,55vw,900px)] flex-col items-center text-center">
            <span className="rounded-full border border-[#2DBCC3]/30 bg-[#2DBCC3]/10 px-[clamp(10px,0.8vw,14px)] py-[clamp(4px,0.35vw,6px)] font-['Cairo'] text-[clamp(10px,0.75vw,13px)] font-semibold leading-[1.5] text-[#2DBCC3]">
              الحل والتوجيه
            </span>

            <h2 className="mt-[clamp(10px,0.8vw,14px)] font-['Cairo'] text-[clamp(28px,2.7vw,46px)] font-black leading-[1.3] text-white">
              منظومة واحدة لإدارة رحلة الكفالة
            </h2>

            <p className="mt-[clamp(12px,1vw,18px)] max-w-[clamp(620px,52vw,850px)] font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.75] text-[#D6E4F0]">
              كفيلي تجمع المؤسسة والكفيل والوصي ضمن رحلة رقمية واحدة، بحيث يعرف كل طرف دوره وما يحتاج إليه.
            </p>
          </div>

          {/* ================= CARDS ================= */}
          <div className="mt-[clamp(30px,3vw,52px)] grid grid-cols-1 gap-[clamp(14px,1.3vw,22px)] md:grid-cols-3">
            {/* Institution */}
            <div className="flex min-h-[clamp(230px,18vw,310px)] flex-col rounded-[clamp(18px,1.4vw,26px)] border border-white/10 bg-white/[0.10] p-[clamp(20px,2vw,32px)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14]">
              <div className="flex justify-start">
                <div className="grid h-[clamp(38px,2.8vw,46px)] w-[clamp(38px,2.8vw,46px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-white/10 text-[#2DBCC3]">
                  <PiBuildings className="text-[clamp(17px,1.2vw,21px)]" />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(20px,1.8vw,30px)] font-bold leading-[1.35] text-white">المؤسسة</h3>

                <p className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(12px,0.95vw,16px)] font-medium leading-[1.7] text-[#D6E4F0]">
                  تدير حالات الكفالة والكفلاء، وتراجع المستندات والدفعات وتضمن رحلة منظمة وشفافة.
                </p>

                <div className="mt-[clamp(14px,1.3vw,22px)] flex items-center gap-[clamp(5px,0.4vw,8px)]">
                  <span className="h-[clamp(5px,0.4vw,7px)] w-[clamp(5px,0.4vw,7px)] rounded-full bg-[#2DBCC3]" />
                  <span className="font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-semibold text-[#2DBCC3]">حوكمة وإشراف شامل</span>
                </div>
              </div>
            </div>

            {/* Sponsor */}
            <div className="flex min-h-[clamp(230px,18vw,310px)] flex-col rounded-[clamp(18px,1.4vw,26px)] border border-white/10 bg-white/[0.10] p-[clamp(20px,2vw,32px)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14]">
              <div className="flex justify-start">
                <div className="grid h-[clamp(38px,2.8vw,46px)] w-[clamp(38px,2.8vw,46px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-white/10 text-[#2DBCC3]">
                  <FiUser className="text-[clamp(17px,1.2vw,21px)]" />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(20px,1.8vw,30px)] font-bold leading-[1.35] text-white">الكفيل</h3>

                <p className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(12px,0.95vw,16px)] font-medium leading-[1.7] text-[#D6E4F0]">
                  يتابع كفالته ومعطياتها والتحديثات المرتبطة بها، ويتمكن من رؤية آخر المستجدات بوضوح.
                </p>

                <div className="mt-[clamp(14px,1.3vw,22px)] flex items-center gap-[clamp(5px,0.4vw,8px)]">
                  <span className="h-[clamp(5px,0.4vw,7px)] w-[clamp(5px,0.4vw,7px)] rounded-full bg-[#2DBCC3]" />
                  <span className="font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-semibold text-[#2DBCC3]">متابعة موثقة ومستمرة</span>
                </div>
              </div>
            </div>

            {/* Guardian */}
            <div className="flex min-h-[clamp(230px,18vw,310px)] flex-col rounded-[clamp(18px,1.4vw,26px)] border border-white/10 bg-white/[0.10] p-[clamp(20px,2vw,32px)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.14]">
              <div className="flex justify-start">
                <div className="grid h-[clamp(38px,2.8vw,46px)] w-[clamp(38px,2.8vw,46px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-white/10 text-[#2DBCC3]">
                  <FiShield className="text-[clamp(17px,1.2vw,21px)]" />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(20px,1.8vw,30px)] font-bold leading-[1.35] text-white">الوصي</h3>

                <p className="mt-[clamp(10px,1vw,16px)] font-['Cairo'] text-[clamp(12px,0.95vw,16px)] font-medium leading-[1.7] text-[#D6E4F0]">
                  يتابع الإجراءات المرتبطة بالحالة ويرفع المستندات والتحديثات المطلوبة وفق النظام.
                </p>

                <div className="mt-[clamp(14px,1.3vw,22px)] flex items-center gap-[clamp(5px,0.4vw,8px)]">
                  <span className="h-[clamp(5px,0.4vw,7px)] w-[clamp(5px,0.4vw,7px)] rounded-full bg-[#2DBCC3]" />
                  <span className="font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-semibold text-[#2DBCC3]">حماية وخصوصية منظمة</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= SYSTEM PILLARS ================= */}
          <div className="mt-[clamp(26px,2.7vw,44px)] flex w-full flex-col items-start justify-between gap-[clamp(18px,2vw,30px)] rounded-[clamp(14px,1vw,18px)] border border-black/30 bg-[#062246] px-[clamp(18px,2vw,30px)] py-[clamp(18px,1.6vw,26px)] sm:flex-row sm:items-center">
            <div className="text-right">
              <p className="font-['Cairo'] text-[clamp(10px,0.8vw,13px)] font-medium leading-[1.5] text-[#2DBCC3]">كفيلي تضمن المصداقية</p>

              <h3 className="mt-[clamp(7px,0.7vw,12px)] font-['Cairo'] text-[clamp(17px,1.4vw,23px)] font-bold leading-[1.4] text-white">
                ركائز المنظومة:
              </h3>
            </div>

            <div className="flex w-full flex-wrap items-center gap-[clamp(8px,1vw,16px)] sm:w-auto">
              <span className="rounded-[8px] bg-[#12385F] px-[clamp(12px,1.1vw,18px)] py-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-semibold text-white">
                <span className="ml-2 text-[#2DBCC3]">✓</span>
                تنظيم
              </span>

              <span className="rounded-[8px] bg-[#12385F] px-[clamp(12px,1.1vw,18px)] py-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-semibold text-white">
                <span className="ml-2 text-[#2DBCC3]">✓</span>
                توثيق
              </span>

              <span className="rounded-[8px] bg-[#12385F] px-[clamp(12px,1.1vw,18px)] py-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-semibold text-white">
                <span className="ml-2 text-[#2DBCC3]">✓</span>
                متابعة
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY KAFEELI SECTION ================= */}
      <section id="why-kafeeli" dir="rtl" className="w-full bg-white px-[clamp(16px,3vw,48px)] py-[clamp(50px,5vw,90px)]">
        <div className="mx-auto w-full max-w-[clamp(1100px,88vw,1500px)]">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full max-w-[clamp(650px,55vw,900px)] flex-col items-center text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-[#EAF0F7] px-[clamp(10px,0.8vw,14px)] py-[clamp(4px,0.4vw,7px)] font-['Cairo'] text-[clamp(9px,0.7vw,12px)] font-semibold leading-[1.5] text-[#19579A]">
              القيمة المضافة
            </span>

            <h2 className="mt-[clamp(9px,0.8vw,14px)] font-['Cairo'] text-[clamp(26px,2.5vw,44px)] font-black leading-[1.35] tracking-[0px] text-[#0F172A]">
              لماذا كفيلي؟
            </h2>

            <p className="mt-[clamp(12px,1.2vw,20px)] max-w-[clamp(620px,55vw,900px)] font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.75] text-[#667085]">
              لأن التحدي ليس فقط بدء الكفالة، بل في إدارتها وتوثيقها.
            </p>
          </div>

          {/* ================= FEATURE CARDS ================= */}
          <div className="mt-[clamp(30px,3vw,52px)] grid w-full grid-cols-1 gap-[clamp(14px,1.5vw,26px)] sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="flex min-h-[clamp(200px,16vw,270px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(20px,2vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
              <div className="flex justify-start">
                <div className="grid h-[clamp(34px,2.6vw,42px)] w-[clamp(34px,2.6vw,42px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-[#E7EEF7] text-[#19579A]">
                  <FiGrid className="text-[clamp(16px,1.2vw,20px)]" strokeWidth={2} />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-[#0F172A]">إدارة متكاملة</h3>

                <p className="mt-[clamp(7px,0.7vw,11px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-medium leading-[1.7] text-[#667085]">
                  تنظيم الحالات والكفلاء والأوصياء والكفالات من مكان واحد وبدون تشتيت.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex min-h-[clamp(200px,16vw,270px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(20px,2vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
              <div className="flex justify-start">
                <div className="grid h-[clamp(34px,2.6vw,42px)] w-[clamp(34px,2.6vw,42px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-[#E2F5F7] text-[#2DBCC3]">
                  <FiTrendingUp className="text-[clamp(16px,1.2vw,20px)]" strokeWidth={2} />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-[#0F172A]">رحلة قابلة للتتبع</h3>

                <p className="mt-[clamp(7px,0.7vw,11px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-medium leading-[1.7] text-[#667085]">
                  معرفة المرحلة الحالية لكل كفالة والتحديثات المرتبطة بها بوضوح زمني كامل.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex min-h-[clamp(200px,16vw,270px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(20px,2vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
              <div className="flex justify-start">
                <div className="grid h-[clamp(34px,2.6vw,42px)] w-[clamp(34px,2.6vw,42px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-[#F7F0E2] text-[#E5A72D]">
                  <FiFileText className="text-[clamp(16px,1.2vw,20px)]" strokeWidth={2} />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-[#0F172A]">توثيق واضح</h3>

                <p className="mt-[clamp(7px,0.7vw,11px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-medium leading-[1.7] text-[#667085]">
                  ربط المستندات والمدفوعات والتحديثات برحلة الكفالة في سجل موثوق ومعتمد.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex min-h-[clamp(200px,16vw,270px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(20px,2vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]">
              <div className="flex justify-start">
                <div className="grid h-[clamp(34px,2.6vw,42px)] w-[clamp(34px,2.6vw,42px)] place-items-center rounded-[clamp(9px,0.7vw,11px)] bg-[#EEEAFE] text-[#6956E5]">
                  <PiLockKeyOpen className="text-[clamp(16px,1.2vw,20px)]" strokeWidth={2} />
                </div>
              </div>

              <div className="mt-[clamp(16px,1.5vw,24px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(15px,1.2vw,20px)] font-bold leading-[1.5] text-[#0F172A]">صلاحيات وخصوصية</h3>

                <p className="mt-[clamp(7px,0.7vw,11px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-medium leading-[1.7] text-[#667085]">
                  لكل مستخدم تجربة وصلاحيات تناسب دوره داخل المنظومة مع الحفاظ على سرية البيانات.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========================
    Problem / Challenge Section
========================= */}
      {/* ================= PROBLEM / INSTITUTIONS SECTION ================= */}
      <section id="problem" dir="rtl" className="w-full bg-[#F4F7FB] px-[clamp(16px,3vw,48px)] py-[clamp(50px,5vw,90px)]">
        <div className="mx-auto w-full max-w-[clamp(1100px,88vw,1500px)]">
          {/* White Container */}
          <div className="w-full rounded-[clamp(18px,1.5vw,26px)] border border-[#E2EBF5] bg-white px-[clamp(20px,2.5vw,42px)] py-[clamp(24px,3vw,48px)]">
            {/* Main Grid */}
            <div className="mx-auto grid w-full max-w-[clamp(1000px,82vw,1380px)] min-w-0 grid-cols-1 gap-[clamp(28px,3vw,50px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:[direction:ltr]">
              {/* ================= CARDS ================= */}
              <div dir="rtl" className="order-2 grid w-full min-w-0 grid-cols-1 gap-[clamp(14px,1.2vw,20px)] sm:grid-cols-2 lg:order-1">
                {/* Card 1 */}
                <div className="flex min-h-[clamp(150px,12vw,205px)] w-full min-w-0 flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                  <div className="flex h-[clamp(34px,2.5vw,42px)] w-[clamp(34px,2.5vw,42px)] shrink-0 items-center justify-center self-start rounded-[clamp(9px,0.7vw,11px)] bg-[#E7EEF7] text-[#19579A]">
                    <FiUsers className="text-[clamp(17px,1.25vw,21px)]" strokeWidth={2} />
                  </div>

                  <div className="mt-auto pt-[clamp(14px,1.2vw,20px)] text-right">
                    <h3 className="font-['Cairo'] text-[clamp(13px,1vw,17px)] font-bold leading-[1.5] text-[#1E293B]">
                      إدارة الحالات والأوصياء
                    </h3>

                    <p className="mt-[clamp(4px,0.4vw,7px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                      تنظيم البيانات والمستندات ومتابعة حالة المراجعة.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="flex min-h-[clamp(150px,12vw,205px)] w-full min-w-0 flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                  <div className="flex h-[clamp(34px,2.5vw,42px)] w-[clamp(34px,2.5vw,42px)] shrink-0 items-center justify-center self-start rounded-[clamp(9px,0.7vw,11px)] bg-[#E2F5F7] text-[#2DBCC3]">
                    <FiUserCheck className="text-[clamp(17px,1.25vw,21px)]" strokeWidth={2} />
                  </div>

                  <div className="mt-auto pt-[clamp(14px,1.2vw,20px)] text-right">
                    <h3 className="font-['Cairo'] text-[clamp(13px,1vw,17px)] font-bold leading-[1.5] text-[#1E293B]">
                      إدارة الكفلاء والكفالات
                    </h3>

                    <p className="mt-[clamp(4px,0.4vw,7px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                      ربط الكفالات بأطرافها ومتابعة دورة كل كفالة.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="flex min-h-[clamp(150px,12vw,205px)] w-full min-w-0 flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                  <div className="flex h-[clamp(34px,2.5vw,42px)] w-[clamp(34px,2.5vw,42px)] shrink-0 items-center justify-center self-start rounded-[clamp(9px,0.7vw,11px)] bg-[#F7F0E2] text-[#E5A72D]">
                    <FiCreditCard className="text-[clamp(16px,1.2vw,20px)]" strokeWidth={2} />
                  </div>

                  <div className="mt-auto pt-[clamp(14px,1.2vw,20px)] text-right">
                    <h3 className="font-['Cairo'] text-[clamp(13px,1vw,17px)] font-bold leading-[1.5] text-[#1E293B]">متابعة الدفعات</h3>

                    <p className="mt-[clamp(4px,0.4vw,7px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                      مراجعة إثباتات الدفع وتوثيق حالة الإجراءات المالية.
                    </p>
                  </div>
                </div>

                {/* Card 4 */}
                <div className="flex min-h-[clamp(150px,12vw,205px)] w-full min-w-0 flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
                  <div className="flex h-[clamp(34px,2.5vw,42px)] w-[clamp(34px,2.5vw,42px)] shrink-0 items-center justify-center self-start rounded-[clamp(9px,0.7vw,11px)] bg-[#EEF0FF] text-[#6155E8]">
                    <FiRefreshCw className="text-[clamp(16px,1.2vw,20px)]" strokeWidth={2} />
                  </div>

                  <div className="mt-auto pt-[clamp(14px,1.2vw,20px)] text-right">
                    <h3 className="font-['Cairo'] text-[clamp(13px,1vw,17px)] font-bold leading-[1.5] text-[#1E293B]">
                      التحديثات والمتابعة
                    </h3>

                    <p className="mt-[clamp(4px,0.4vw,7px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                      إدارة التحديثات المرتبطة بالكفالات وإتاحتها للأطراف المعنية.
                    </p>
                  </div>
                </div>
              </div>

              {/* ================= CONTENT ================= */}
              <div
                dir="rtl"
                className="order-1 flex w-full min-w-0 flex-col items-start justify-center overflow-hidden text-right lg:order-2"
              >
                {/* Badge */}
                <span className="inline-flex w-fit items-center justify-center rounded-full bg-[#EAF2F9] px-[clamp(10px,0.8vw,14px)] py-[clamp(5px,0.4vw,7px)] font-['Cairo'] text-[clamp(10px,0.75vw,13px)] font-bold leading-[1.5] text-[#19579A]">
                  كفيلي للمؤسسات
                </span>

                {/* Title */}
                <h2 className="mt-[clamp(12px,1.2vw,20px)] w-full min-w-0 break-words font-['Cairo'] text-[clamp(26px,2.5vw,44px)] font-black leading-[1.3] tracking-[-0.3px] text-[#0F172A]">
                  إدارة الكفالات في نظام واحد
                </h2>

                {/* Description */}
                <p className="mt-[clamp(12px,1.2vw,20px)] w-full max-w-[clamp(460px,38vw,620px)] min-w-0 break-words font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.75] text-[#475569]">
                  تساعد كفيلي المؤسسات على تنظيم الحالات والكفلاء والأوصياء والكفالات والإجراءات المرتبطة بها، بدل توزيع رحلة العمل بين
                  أدوات متعددة.
                </p>

                {/* Button */}
                <button
                  type="button"
                  className="mt-[clamp(18px,1.8vw,28px)] inline-flex h-[clamp(40px,3.2vw,50px)] max-w-full shrink-0 items-center justify-center gap-[clamp(6px,0.5vw,9px)] rounded-[clamp(8px,0.6vw,10px)] bg-[#0D5BA8] px-[clamp(16px,1.4vw,24px)] font-['Cairo'] text-[clamp(11px,0.85vw,15px)] font-bold leading-[1.5] text-white shadow-[0_4px_10px_rgba(13,91,168,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B4F94]"
                >
                  <span>اكتشف كفيلي للمؤسسات</span>
                  <FiArrowLeft className="shrink-0 text-[clamp(15px,1vw,18px)]" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS SECTION ================= */}
      <section
        id="process"
        dir="rtl"
        className="w-full -translate-y-[clamp(24px,2.5vw,40px)] border-b border-[#F4F7FB] bg-white px-[clamp(16px,3vw,48px)] pt-[clamp(50px,5vw,90px)] pb-[clamp(50px,5vw,90px)]"
      >
        <div className="mx-auto w-full max-w-[clamp(1100px,88vw,1500px)]">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full max-w-[clamp(650px,55vw,900px)] flex-col items-center text-center">
            {/* Badge */}
            <span className="mb-[clamp(10px,0.8vw,14px)] inline-flex w-fit items-center justify-center rounded-full bg-[#EAF2F9] px-[clamp(9px,0.7vw,13px)] py-[clamp(4px,0.35vw,6px)] font-['Cairo'] text-[clamp(10px,0.75vw,13px)] font-bold leading-[1.5] text-[#0D4B8E]">
              التسلسل الإجرائي
            </span>

            {/* Title */}
            <h2 className="font-['Cairo'] text-[clamp(26px,2.5vw,44px)] font-black leading-[1.35] tracking-[0] text-[#0F172A]">
              رحلة واضحة من البداية إلى المتابعة
            </h2>

            {/* Description */}
            <p className="mt-[clamp(12px,1.2vw,20px)] font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.7] text-[#475569]">
              كل مرحلة لها إجراء واضح، وطرف مسؤول، وحالة يمكن متابعتها.
            </p>
          </div>

          {/* ================= STEPS ================= */}
          <div className="mt-[clamp(30px,3vw,52px)] grid w-full grid-cols-1 gap-[clamp(14px,1.2vw,20px)] sm:grid-cols-2 lg:grid-cols-5">
            {/* ================= 01 ================= */}
            <div className="flex min-h-[clamp(180px,14vw,235px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-right">
                <span className="font-['Cairo'] text-[clamp(26px,2.1vw,36px)] font-black leading-[1.2] text-[#0D4B8E]/20">01</span>

                <h3 className="mt-[clamp(3px,0.3vw,6px)] font-['Cairo'] text-[clamp(14px,1.05vw,18px)] font-bold leading-[1.5] text-[#0F172A]">
                  بدء الكفالة
                </h3>

                <p className="mt-[clamp(8px,0.8vw,14px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                  يبدأ الكفيل إجراءات الكفالة من خلال حسابه.
                </p>
              </div>

              <div className="mt-auto pt-[clamp(14px,1.2vw,20px)]">
                <span className="inline-flex items-center rounded-[6px] bg-[#EAF2F9] px-[clamp(8px,0.7vw,12px)] py-[clamp(3px,0.3vw,5px)] font-['Cairo'] text-[clamp(10px,0.7vw,12px)] font-bold leading-[1.5] text-[#0D4B8E]">
                  الخطوة الأولى
                </span>
              </div>
            </div>

            {/* ================= 02 ================= */}
            <div className="flex min-h-[clamp(180px,14vw,235px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-right">
                <span className="font-['Cairo'] text-[clamp(26px,2.1vw,36px)] font-black leading-[1.2] text-[#0D4B8E]/20">02</span>

                <h3 className="mt-[clamp(3px,0.3vw,6px)] font-['Cairo'] text-[clamp(14px,1.05vw,18px)] font-bold leading-[1.5] text-[#0F172A]">
                  توثيق الدفع
                </h3>

                <p className="mt-[clamp(8px,0.8vw,14px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                  يتم رفع إثبات الدفع وربطه بالكفالة.
                </p>
              </div>

              <div className="mt-auto pt-[clamp(14px,1.2vw,20px)]">
                <span className="inline-flex items-center rounded-[6px] bg-[#EAF2F9] px-[clamp(8px,0.7vw,12px)] py-[clamp(3px,0.3vw,5px)] font-['Cairo'] text-[clamp(10px,0.7vw,12px)] font-bold leading-[1.5] text-[#0D4B8E]">
                  الخطوة الثانية
                </span>
              </div>
            </div>

            {/* ================= 03 ================= */}
            <div className="flex min-h-[clamp(180px,14vw,235px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-right">
                <span className="font-['Cairo'] text-[clamp(26px,2.1vw,36px)] font-black leading-[1.2] text-[#0D4B8E]/20">03</span>

                <h3 className="mt-[clamp(3px,0.3vw,6px)] font-['Cairo'] text-[clamp(14px,1.05vw,18px)] font-bold leading-[1.5] text-[#0F172A]">
                  مراجعة المؤسسة
                </h3>

                <p className="mt-[clamp(8px,0.8vw,14px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                  تراجع المؤسسة العملية والإثباتات المرتبطة بها.
                </p>
              </div>

              <div className="mt-auto pt-[clamp(14px,1.2vw,20px)]">
                <span className="inline-flex items-center rounded-[6px] bg-[#EAF2F9] px-[clamp(8px,0.7vw,12px)] py-[clamp(3px,0.3vw,5px)] font-['Cairo'] text-[clamp(10px,0.7vw,12px)] font-bold leading-[1.5] text-[#0D4B8E]">
                  الخطوة الثالثة
                </span>
              </div>
            </div>

            {/* ================= 04 ================= */}
            <div className="flex min-h-[clamp(180px,14vw,235px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-right">
                <span className="font-['Cairo'] text-[clamp(26px,2.1vw,36px)] font-black leading-[1.2] text-[#0D4B8E]/20">04</span>

                <h3 className="mt-[clamp(3px,0.3vw,6px)] font-['Cairo'] text-[clamp(13px,0.95vw,17px)] font-bold leading-[1.5] tracking-[-0.2px] text-[#0F172A]">
                  توثيق التحويل والاستلام
                </h3>

                <p className="mt-[clamp(8px,0.8vw,14px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                  توثق إجراءات تحويل الكفالة وتأكيد الاستلام.
                </p>
              </div>

              <div className="mt-auto pt-[clamp(14px,1.2vw,20px)]">
                <span className="inline-flex items-center rounded-[6px] bg-[#EAF2F9] px-[clamp(8px,0.7vw,12px)] py-[clamp(3px,0.3vw,5px)] font-['Cairo'] text-[clamp(10px,0.7vw,12px)] font-bold leading-[1.5] text-[#0D4B8E]">
                  الخطوة الرابعة
                </span>
              </div>
            </div>

            {/* ================= 05 ================= */}
            <div className="flex min-h-[clamp(180px,14vw,235px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(17px,1.5vw,26px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="text-right">
                <span className="font-['Cairo'] text-[clamp(26px,2.1vw,36px)] font-black leading-[1.2] text-[#0D4B8E]/20">05</span>

                <h3 className="mt-[clamp(3px,0.3vw,6px)] font-['Cairo'] text-[clamp(14px,1.05vw,18px)] font-bold leading-[1.5] text-[#0F172A]">
                  المتابعة والتحديثات
                </h3>

                <p className="mt-[clamp(8px,0.8vw,14px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-medium leading-[1.65] text-[#718096]">
                  تستمر رحلة الكفالة والتحديثات المرتبطة بها.
                </p>
              </div>

              <div className="mt-auto pt-[clamp(14px,1.2vw,20px)]">
                <span className="inline-flex items-center rounded-[6px] bg-[#EAF2F9] px-[clamp(8px,0.7vw,12px)] py-[clamp(3px,0.3vw,5px)] font-['Cairo'] text-[clamp(10px,0.7vw,12px)] font-bold leading-[1.5] text-[#0D4B8E]">
                  الخطوة الخامسة
                </span>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM BUTTON ================= */}
          <div className="mt-[clamp(24px,2.5vw,40px)] flex justify-center">
            <button
              type="button"
              className="inline-flex h-[clamp(40px,3.2vw,50px)] w-fit items-center justify-center gap-[clamp(6px,0.5vw,9px)] rounded-[clamp(8px,0.6vw,10px)] bg-[#0D5BA8] px-[clamp(16px,1.4vw,24px)] font-['Cairo'] text-[clamp(11px,0.8vw,14px)] font-bold leading-[1.5] text-white shadow-[0_4px_10px_rgba(13,91,168,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B4F94]"
            >
              <span>شاهد الرحلة بالتفصيل</span>
              <FiArrowLeft className="text-[clamp(15px,1vw,18px)]" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>
      {/* Trust Section */}
      {/* ================= TRUST SECTION ================= */}
      <section
        id="trust"
        dir="rtl"
        className="w-full border-t border-[#E2EBF5] bg-white px-[clamp(16px,3vw,48px)] pt-[clamp(48px,5vw,90px)] pb-[clamp(60px,6vw,105px)]"
      >
        <div className="mx-auto flex w-full max-w-[clamp(1100px,88vw,1500px)] flex-col">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full max-w-[clamp(650px,55vw,900px)] flex-col items-center text-center">
            {/* Badge */}
            <span className="mb-[clamp(10px,0.9vw,16px)] inline-flex w-fit items-center justify-center rounded-full bg-[rgba(45,188,195,0.1)] px-[clamp(11px,0.8vw,15px)] py-[clamp(6px,0.5vw,9px)] font-['Cairo'] text-[clamp(10px,0.75vw,13px)] font-semibold leading-[1.5] text-[#2DBCC3]">
              الأمان والمصداقية
            </span>

            {/* Title */}
            <h2 className="font-['Cairo'] text-[clamp(26px,2.5vw,44px)] font-black leading-[1.35] tracking-[0px] text-[#0F172A]">
              الثقة تبدأ من وضوح كل خطوة
            </h2>

            {/* Description */}
            <p className="mt-[clamp(12px,1.2vw,20px)] max-w-[clamp(620px,55vw,900px)] font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.8] tracking-[0px] text-[#52657D]">
              لأن رحلة الكفالة تتعامل مع بيانات حساسة وإجراءات مالية، تساعد كفيلي على جعل المسؤوليات والإجراءات والمتابعة أكثر وضوحًا.
            </p>
          </div>

          {/* ================= CARDS ================= */}
          <div className="mt-[clamp(30px,3.2vw,52px)] grid w-full grid-cols-1 gap-[clamp(14px,1.5vw,26px)] sm:grid-cols-2 lg:grid-cols-4">
            {/* ================= CARD 1 ================= */}
            <div className="flex min-h-[clamp(165px,13vw,220px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(18px,1.8vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-[clamp(30px,2.4vw,40px)] w-[clamp(30px,2.4vw,40px)] items-center justify-center rounded-[clamp(8px,0.7vw,11px)] bg-[#E4ECF6] text-[#19579A]">
                <FiShield className="text-[clamp(16px,1.2vw,21px)]" strokeWidth={2} />
              </div>

              <div className="mt-[clamp(12px,1.2vw,20px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(14px,1.15vw,19px)] font-bold leading-[1.5] text-[#0F172A]">صلاحيات حسب الدور</h3>

                <p className="mt-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(11px,0.85vw,14px)] font-medium leading-[1.7] text-[#52657D]">
                  يصل كل مستخدم إلى البيانات والإجراءات المرتبطة بدوره فقط.
                </p>
              </div>
            </div>

            {/* ================= CARD 2 ================= */}
            <div className="flex min-h-[clamp(165px,13vw,220px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(18px,1.8vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-[clamp(30px,2.4vw,40px)] w-[clamp(30px,2.4vw,40px)] items-center justify-center rounded-[clamp(8px,0.7vw,11px)] bg-[#DDF4F5] text-[#2DBCC3]">
                <FiHome className="text-[clamp(16px,1.2vw,21px)]" strokeWidth={2} />
              </div>

              <div className="mt-[clamp(12px,1.2vw,20px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(14px,1.15vw,19px)] font-bold leading-[1.5] text-[#0F172A]">مراجعة المؤسسة</h3>

                <p className="mt-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(11px,0.85vw,14px)] font-medium leading-[1.7] text-[#52657D]">
                  تمر الإجراءات الأساسية عبر المؤسسة المسؤولة قبل اعتمادها نهائيًا.
                </p>
              </div>
            </div>

            {/* ================= CARD 3 ================= */}
            <div className="flex min-h-[clamp(165px,13vw,220px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(18px,1.8vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-[clamp(30px,2.4vw,40px)] w-[clamp(30px,2.4vw,40px)] items-center justify-center rounded-[clamp(8px,0.7vw,11px)] bg-[#F7F0E2] text-[#E5A72D]">
                <FiClipboard className="text-[clamp(16px,1.2vw,21px)]" strokeWidth={2} />
              </div>

              <div className="mt-[clamp(12px,1.2vw,20px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(14px,1.15vw,19px)] font-bold leading-[1.5] text-[#0F172A]">توثيق الإجراءات</h3>

                <p className="mt-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(11px,0.85vw,14px)] font-medium leading-[1.7] text-[#52657D]">
                  تربط المستندات والدفعات والتحديثات برحلة الكفالة كاملة.
                </p>
              </div>
            </div>

            {/* ================= CARD 4 ================= */}
            <div className="flex min-h-[clamp(165px,13vw,220px)] w-full flex-col rounded-[clamp(14px,1vw,18px)] border border-[#E2EBF5] bg-[#F8FAFD] p-[clamp(18px,1.8vw,30px)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="flex h-[clamp(30px,2.4vw,40px)] w-[clamp(30px,2.4vw,40px)] items-center justify-center rounded-[clamp(8px,0.7vw,11px)] bg-[#EAF8F1] text-[#16B77A]">
                <FiEye className="text-[clamp(16px,1.2vw,21px)]" strokeWidth={2} />
              </div>

              <div className="mt-[clamp(12px,1.2vw,20px)] text-right">
                <h3 className="font-['Cairo'] text-[clamp(14px,1.15vw,19px)] font-bold leading-[1.5] text-[#0F172A]">متابعة واضحة</h3>

                <p className="mt-[clamp(6px,0.6vw,10px)] font-['Cairo'] text-[clamp(11px,0.85vw,14px)] font-medium leading-[1.7] text-[#52657D]">
                  يمكن لكل طرف متابعة الإجراءات المرتبطة به دون لبس أو غموض.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= Final CTA Section ================= */}
      {/* ================= Final CTA Section ================= */}
      <section id="final-cta" dir="rtl" className="w-full bg-[#F4F7FB] px-[clamp(16px,3vw,48px)] py-[clamp(48px,5vw,88px)]">
        <div className="relative mx-auto flex min-h-[clamp(300px,27vw,430px)] w-full max-w-[clamp(1100px,85vw,1500px)] items-center justify-center overflow-hidden rounded-[clamp(18px,1.5vw,28px)] border border-white/10 bg-gradient-to-br from-[#062246] via-[#0D4B8E] to-[#072B53] px-[clamp(20px,4vw,64px)] py-[clamp(36px,4vw,64px)] shadow-[0_14px_30px_rgba(6,34,70,0.18)]">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -bottom-[clamp(70px,7vw,130px)] -left-[clamp(70px,7vw,130px)] h-[clamp(180px,18vw,300px)] w-[clamp(180px,18vw,300px)] rounded-full border border-[#2DBCC3]/10 opacity-70" />
          <div className="pointer-events-none absolute -bottom-[clamp(50px,5vw,95px)] -left-[clamp(50px,5vw,95px)] h-[clamp(125px,12vw,210px)] w-[clamp(125px,12vw,210px)] rounded-full border border-[#2DBCC3]/10" />
          <div className="pointer-events-none absolute -right-[clamp(65px,6vw,120px)] -top-[clamp(65px,6vw,120px)] h-[clamp(180px,18vw,300px)] w-[clamp(180px,18vw,300px)] rounded-full border border-[#2DBCC3]/10" />
          <div className="pointer-events-none absolute -right-[clamp(35px,3.5vw,65px)] -top-[clamp(35px,3.5vw,65px)] h-[clamp(115px,11vw,190px)] w-[clamp(115px,11vw,190px)] rounded-full border border-[#2DBCC3]/10" />

          {/* Small decorative dots */}
          <span className="pointer-events-none absolute bottom-[clamp(35px,4vw,75px)] left-[clamp(35px,4vw,75px)] h-[clamp(6px,0.5vw,9px)] w-[clamp(6px,0.5vw,9px)] rounded-full bg-[#2DBCC3]/40" />
          <span className="pointer-events-none absolute right-[clamp(40px,5vw,90px)] top-[clamp(40px,5vw,90px)] h-[clamp(6px,0.5vw,9px)] w-[clamp(6px,0.5vw,9px)] rounded-full bg-[#2DBCC3]/50" />

          {/* Content */}
          <div className="relative z-10 flex w-full max-w-[clamp(620px,52vw,850px)] flex-col items-center gap-[clamp(16px,1.5vw,26px)] text-center">
            {/* Badge */}
            <span className="inline-flex w-fit items-center rounded-full border border-[#2DBCC3]/20 bg-[#2DBCC3]/10 px-[clamp(11px,0.9vw,16px)] py-[clamp(6px,0.5vw,9px)] font-['Cairo'] text-[clamp(10px,0.75vw,13px)] font-semibold leading-[1.5] text-[#2DBCC3]">
              <span className="ml-[clamp(5px,0.4vw,8px)] h-[clamp(5px,0.4vw,7px)] w-[clamp(5px,0.4vw,7px)] rounded-full bg-[#2DBCC3]" />
              ابدأ رحلتك اليوم مع كفيلي
            </span>

            {/* Title */}
            <h2 className="font-['Cairo'] text-[clamp(26px,2.5vw,44px)] font-black leading-[1.35] tracking-[-0.3px] text-white">
              رحلة كفالة أوضح تبدأ من هنا
            </h2>

            {/* Description */}
            <p className="max-w-[clamp(600px,52vw,850px)] font-['Cairo'] text-[clamp(12px,1vw,18px)] font-medium leading-[1.8] text-[#D6E4F0]">
              سواء كنت كفيلاً تريد متابعة كفالتك بوضوح، أو مؤسسة تريد تنظيم وإدارة كفالاتها، يجمع كفيلي الرحلة في منصة واحدة.
            </p>

            {/* Buttons */}
            <div className="mt-[clamp(2px,0.4vw,7px)] flex w-full flex-col items-center justify-center gap-[clamp(10px,0.8vw,14px)] min-[520px]:w-auto min-[520px]:flex-row">
              {/* Primary */}
              <button
                type="button"
                className="flex h-[clamp(48px,3.8vw,60px)] w-full items-center justify-center gap-[clamp(7px,0.5vw,10px)] rounded-[clamp(10px,0.8vw,14px)] bg-[#2DBCC3] px-[clamp(24px,2vw,38px)] font-['Cairo'] text-[clamp(12px,0.9vw,16px)] font-bold leading-[1.5] text-[#062246] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3ACDD4] hover:shadow-[0_8px_18px_rgba(45,188,195,0.25)] min-[520px]:w-auto"
              >
                <span>ابدأ الآن</span>
                <FiArrowLeft className="text-[clamp(16px,1.1vw,20px)]" />
              </button>

              {/* Secondary */}
              <button
                type="button"
                className="flex h-[clamp(48px,3.8vw,60px)] w-full items-center justify-center rounded-[clamp(10px,0.8vw,14px)] border border-white/20 bg-white/[0.10] px-[clamp(24px,2vw,38px)] font-['Cairo'] text-[clamp(12px,0.9vw,16px)] font-bold leading-[1.5] text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.16] min-[520px]:w-auto"
              >
                كفيلي للمؤسسات
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
