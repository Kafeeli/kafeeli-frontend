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

import {
  PiBuildings,
  PiHandHeartFill,
  PiUsersThreeFill,
  PiLockKeyOpen,
  PiCheckCircle,
} from "react-icons/pi";
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

import heroSection from "../assets/hero-bg.png";

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
      description:
        "نضمن سرية بيانات المتبرعين والأيتام واستخدام أحدث تقنيات التشفير العالمي.",
    },
    {
      icon: <FaEye className="w-8 h-8 text-teal-500" />,
      title: "شفافية تامة",
      description:
        "تقارير دورية وفورية توضح أين تذهب كل هللة من تبرعك وكيف تؤثر في حياة اليتيم.",
    },
    {
      icon: <FaUsers className="w-8 h-8 text-[#D9A441]" />,
      title: "تواصل إنساني",
      description:
        "نفتح جسور التواصل المعنوي بين الكفيل والمكفول من خلال الرسائل والهدايا.",
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
      description:
        "اختر مبلغ الكفالة الشهري الذي يناسبك وقم بعملية الدفع الآمن.",
      color: "bg-[#2DBCC3] text-white",
    },
    {
      number: "3",
      title: "متابعة الأثر",
      description:
        "استلم تقارير دورية عن تقدم اليتيم دراسياً وصحياً وتواصل معه.",
      color: "bg-[#F8F9FA] text-[#0D4B8E]",
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8F9FA]">
      <Header />
      {/* Hero Section */}

      <section id="home" className="relative h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={heroSection}
            alt="Kafeeli"
            className="h-full w-full object-cover object-center"
          />

          {/* Gradient Overlay: اليمين غامق والشمال فاتح */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(270deg, rgba(4, 23, 48, 0.95) 0%, rgba(4, 23, 48, 0.65) 45%, rgba(4, 23, 48, 0.15) 100%)",
            }}
          />

          {/* Exact Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, #062244 0%, rgba(6, 34, 68, 0) 50%, rgba(0, 0, 0, 0.2) 100%)",
            }}
          />
        </div>

        {/* Content */}
        {/* Content */}
        <div
          className="

      relative z-10 mx-auto flex
      h-full
      max-w-7xl
      items-center
      px-5
      pt-10
      sm:px-8
      lg:px-10
      lg:pt-12
    "
        >
          <div
            className="
    ml-auto
    w-full
    max-w-2xl
    text-right
    origin-top-right
    transition-transform

    [@media(max-height:900px)]:scale-[0.58]
    [@media(max-height:820px)]:scale-[0.48]
    [@media(max-height:760px)]:scale-[0.38]
    [@media(max-height:700px)]:scale-[0.32]

    [@media(max-height:900px)]:translate-y-32
    [@media(max-height:820px)]:translate-y-36
    [@media(max-height:760px)]:translate-y-40
    [@media(max-height:700px)]:translate-y-44

    [@media(max-height:900px)]:translate-x-8
    [@media(max-height:820px)]:translate-x-10
    [@media(max-height:760px)]:translate-x-14
    [@media(max-height:700px)]:translate-x-16
  "
          >
            {/* Small Label */}
            <div
              dir="rtl"
              className="

          relative z-20
          mb-5
          inline-flex
          w-fit
          items-center
          gap-2
          rounded-full
          border
          border-[#5B7D9F]
          bg-[#183B60]/70
          px-[14px]
          py-[6px]
          font-['Cairo']
          text-xs
          font-medium
          leading-[18px]
          text-white
          backdrop-blur-sm
          sm:text-sm
        "
            >
              <span className="h-3 w-3 shrink-0 rounded-full bg-[#19C6D2]" />

              <span>منصة رقمية لإدارة رحلة الكفالة</span>
            </div>

            {/* Heading */}
            <h1
              dir="rtl"
              className="
          font-['Cairo']
          text-[20px]
          font-black
          leading-[60px]
          tracking-[-1px]
          text-right
          text-white
          sm:text-[50px]
          sm:leading-[75px]
          lg:text-[60px]
          lg:leading-[96px]
          lg:tracking-[-1.5px]
        "
            >
              كفالة أوضح.
              <br />
              <span className="text-[#19C6D2]">متابعة أسهل.</span>
              <br />
              <span className="text-[#A9D9EA]">رحلة موثقة.</span>
            </h1>

            {/* Description */}
            <p
              dir="rtl"
              className="
          mt-3
          font-['Cairo']
          text-[16px]
          font-normal
          leading-[28px]
          text-right
          text-white
          sm:text-[18px]
        "
            >
              كفيلي منصة رقمية تنظّم رحلة الكفالة بين المؤسسة والكفيل والوصي،
              وتجمع الإجراءات والدفعات والتحديثات ضمن رحلة واحدة واضحة وقابلة
              للمتابعة.
            </p>

            {/* Buttons */}
            <div
              className="
          mt-7
          flex
          flex-col
          items-start
          gap-3
          sm:flex-row
          sm:justify-start
        "
            >
              {/* Start Button */}
              <button
                className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#19C6D2]
            px-6
            py-3.5
            font-['Cairo']
            font-bold
            text-[#06345A]
            transition
            hover:-translate-y-1
            hover:bg-[#22D3DF]
            sm:w-auto
          "
              >
                ابدأ الآن
                <FiChevronLeft
                  size={28}
                  strokeWidth={2.5}
                  className="text-[#06345A]"
                />
              </button>

              {/* How it works */}
              <button
                className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/30
            bg-white/10
            px-6
            py-3.5
            font-['Cairo']
            font-bold
            text-white
            backdrop-blur-sm
            transition
            hover:-translate-y-1
            hover:bg-white/20
            sm:w-auto
          "
              >
                <FiInfo size={14} className="text-[#19C6D2]" />
                كيف تعمل كفيلي
              </button>
            </div>

            {/* Trust Points */}
            <div className="mt-8 border-t border-white/20 pt-5">
              <div
                className="
            flex
            flex-col
            items-start
            gap-3
            sm:flex-row
            sm:flex-wrap
            sm:justify-start
            sm:gap-x-6
          "
              >
                {/* Point 1 */}
                <div
                  dir="rtl"
                  className="
              flex
              items-center
              gap-2
              text-xs
              text-gray-200
              sm:text-sm
            "
                >
                  <span
                    className="
                grid
                h-7
                w-7
                shrink-0
                place-items-center
                rounded-full
                bg-[#164263]
                text-[#19C6D2]
              "
                  >
                    <PiCheckCircle size={18} />
                  </span>
                  إجراءات منظمة وموثقة
                </div>

                {/* Point 2 */}
                <div
                  dir="rtl"
                  className="
              flex
              items-center
              gap-2
              text-xs
              text-gray-200
              sm:text-sm
            "
                >
                  <span
                    className="
                grid
                h-7
                w-7
                shrink-0
                place-items-center
                rounded-full
                bg-[#164263]
                text-[#19C6D2]
              "
                  >
                    <PiCheckCircle size={18} />
                  </span>
                  خصوصية وصلاحيات متقدمة
                </div>

                {/* Point 3 */}
                <div
                  dir="rtl"
                  className="
              flex
              items-center
              gap-2
              text-xs
              text-gray-200
              sm:text-sm
            "
                >
                  <span
                    className="
                grid
                h-7
                w-7
                shrink-0
                place-items-center
                rounded-full
                bg-[#164263]
                text-[#19C6D2]
              "
                  >
                    <PiCheckCircle size={18} />
                  </span>
                  شفافية في كل خطوة
                  {/* باقي الكود تبعك كما هو */}
                  <div className="ml-auto w-full max-w-2xl text-right">
                    {/* Heading */}
                    <h1
                      dir="rtl"
                      className="
                      font-['Cairo']
                      text-[40px]
                      font-black
                      leading-[60px]
                      tracking-[-1px]
                      text-right
                      text-white
                      sm:text-[50px]
                      sm:leading-[75px]
                      lg:text-[60px]
                      lg:leading-[96px]
                      lg:tracking-[-1.5px]
                    "
                    >
                      كفالة أوضح.
                      <br />
                      <span className="text-[#19C6D2]">متابعة أسهل.</span>
                      <br />
                      <span className="text-[#A9D9EA]">رحلة موثقة.</span>
                    </h1>

                    {/* Description */}
                    <p
                      dir="rtl"
                      className="
                      mt-3
                      font-['Cairo']
                      text-[16px]
                      font-medium
                      leading-[28px]
                      text-right
                      text-white
                      sm:text-[18px]
                    "
                    >
                      كفيلي منصة رقمية تنظّم رحلة الكفالة بين المؤسسة والكفيل
                      والوصي، وتجمع الإجراءات والدفعات والتحديثات ضمن رحلة واحدة
                      واضحة وقابلة للمتابعة.
                    </p>

                    {/* Buttons */}
                    <div
                      className="
                      mt-7
                      flex
                      flex-col
                      items-start
                      gap-3
                      sm:flex-row
                      sm:justify-start
                    "
                    >
                      {/* Start Button */}
                      <button
                        className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#19C6D2]
                        px-6
                        py-3.5
                        font-['Cairo']
                        font-bold
                        text-[#06345A]
                        transition
                        hover:-translate-y-1
                        hover:bg-[#22D3DF]
                        sm:w-auto
                      "
                      >
                        ابدأ الآن
                        <FiChevronLeft
                          size={28}
                          strokeWidth={2.5}
                          className="text-[#06345A]"
                        />
                      </button>

                      {/* How it works */}
                      <button
                        className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-white/30
                        bg-white/10
                        px-6
                        py-3.5
                        font-['Cairo']
                        font-bold
                        text-white
                        backdrop-blur-sm
                        transition
                        hover:-translate-y-1
                        hover:bg-white/20
                        sm:w-auto
                      "
                      >
                        <FiInfo size={14} className="text-[#19C6D2]" />
                        كيف تعمل كفيلي
                      </button>
                    </div>

                    {/* Trust Points */}
                    <div className="mt-8 border-t border-white/20 pt-5">
                      <div
                        className="
                        flex
                        flex-col
                        items-start
                        gap-3
                        sm:flex-row
                        sm:flex-wrap
                        sm:justify-start
                        sm:gap-x-6
                      "
                      >
                        {/* Point 1 */}
                        <div
                          dir="rtl"
                          className="flex items-center gap-2 text-xs text-gray-200 sm:text-sm"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#164263] text-[#19C6D2]">
                            <PiCheckCircle size={18} />
                          </span>
                          إجراءات منظمة وموثقة
                        </div>

                        {/* Point 2 */}
                        <div
                          dir="rtl"
                          className="flex items-center gap-2 text-xs text-gray-200 sm:text-sm"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#164263] text-[#19C6D2]">
                            <PiCheckCircle size={18} />
                          </span>
                          خصوصية وصلاحيات متقدمة
                        </div>

                        {/* Point 3 */}
                        <div
                          dir="rtl"
                          className="flex items-center gap-2 text-xs text-gray-200 sm:text-sm"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#164263] text-[#19C6D2]">
                            <PiCheckCircle size={18} />
                          </span>
                          شفافية في كل خطوة
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Governance Section */}
      <section id="governance" className="bg-white px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <div
              dir="rtl"
              className="
                            inline-flex
                            h-[31px]
                            w-fit
                            items-center
                            justify-center
                            rounded-[9999px]
                            bg-[rgba(45,188,195,0.1)]
                            px-3
                            py-[7.5px]
                          "
            >
              <span
                className="
                              font-['Cairo']
                              text-sm
                              font-bold
                              leading-[20px]
                              text-[#2DBCC3]
                            "
              >
                حوكمة الأطراف
              </span>
            </div>

            {/* Title */}
            <h2
              dir="rtl"
              className="
                            mt-4
                            font-['Cairo']
                            text-[28px]
                            font-black
                            leading-[40px]
                            tracking-[0px]
                            text-center
                            text-[#101828]
                            sm:text-[32px]
                            lg:text-[36px]
                          "
            >
              رحلة واحدة تجمع أطراف الكفالة
            </h2>

            {/* Description */}
            <p
              dir="rtl"
              className="
                            mt-3
                            max-w-[650px]
                            font-['Cairo']
                            text-[14px]
                            font-medium
                            leading-[24px]
                            tracking-[0px]
                            text-center
                            text-[#667085]
                            sm:text-[16px]
                          "
            >
              لوحة رقمية متكاملة تضمن معرفة كل طرف بمهامه ومسؤولياته في كل لحظة.
            </p>
          </div>

          {/* Cards */}
          <div
            className="
                          mt-8
                          grid
                          grid-cols-1
                          justify-items-center
                          gap-5
                          md:grid-cols-3
                        "
          >
            {/* Institution */}
            <div
              className="
                flex
                h-full
                w-full
                max-w-[384px]
                flex-col
                rounded-[24px]
                border
                border-[#E2EBF5]
                bg-[#F8FAFD]
                p-6
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span
                  dir="rtl"
                  className="
                    rounded-full
                    bg-[#EAF0F7]
                    px-3
                    py-1
                    font-['Cairo']
                    text-[10px]
                    font-semibold
                    text-[#315B8C]
                  "
                >
                  الطرف الأول
                </span>

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#0D4B8E] text-white">
                  <PiBuildings size={22} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 text-right">
                <h3
                  dir="rtl"
                  className="
                    font-['Cairo']
                    text-[20px]
                    font-bold
                    leading-[28px]
                    text-[#101828]
                  "
                >
                  المؤسسة
                </h3>

                <p
                  dir="rtl"
                  className="
                    mt-1
                    font-['Cairo']
                    text-[14px]
                    font-semibold
                    leading-[20px]
                    text-[#2F5D8A]
                  "
                >
                  إدارة وتنظيم الكفالات
                </p>

                <p
                  dir="rtl"
                  className="
                    mt-3
                    font-['Cairo']
                    text-[12px]
                    font-medium
                    leading-[20px]
                    text-[#667085]
                  "
                >
                  إدارة وتنظيم الكفالات ومتابعة الحالات والبيانات والتأكد من
                  استيفاء المتطلبات.
                </p>
              </div>

              {/* Operational Status */}
              <div
                className="
                  mt-auto
                  flex
                  h-[45px]
                  w-full
                  items-center
                  justify-between
                  rounded-[12px]
                  border
                  border-[#E2EBF5]
                  bg-white
                  px-3
                "
              >
                <span className="font-['Cairo'] text-[13px] font-bold text-[#334155]">
                  الحالة التشغيلية
                </span>

                <span
                  className="
                    rounded-[4px]
                    border
                    border-[#DDE6F0]
                    bg-[#F3F7FB]
                    px-2.5
                    py-1
                    font-['Cairo']
                    text-[11px]
                    font-semibold
                    leading-none
                    text-[#19579A]
                  "
                >
                  صلاحيات إدارية كاملة
                </span>
              </div>
            </div>

            {/* Sponsor */}
            <div
              className="
                            w-full
                            max-w-[384px]
                            rounded-[24px]
                            border
                            border-[#E2EBF5]
                            bg-[#F8FAFD]
                            p-6
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-md
                          "
            >
              <div className="flex items-center justify-between">
                <span
                  dir="rtl"
                  className="
                                rounded-full
                                bg-[#E6F8F9]
                                px-3
                                py-1
                                font-['Cairo']
                                text-[10px]
                                font-semibold
                                text-[#2DBCC3]
                              "
                >
                  الطرف الثاني
                </span>

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#2DBCC3] text-white">
                  <PiHandHeartFill size={22} />
                </div>
              </div>

              <div className="mt-5 text-right">
                <h3
                  dir="rtl"
                  className="
                                font-['Cairo']
                                text-[20px]
                                font-bold
                                leading-[28px]
                                text-[#101828]
                              "
                >
                  الكفيل
                </h3>

                <p
                  dir="rtl"
                  className="
                                mt-1
                                font-['Cairo']
                                text-[14px]
                                font-semibold
                                leading-[20px]
                                text-[#2DBCC3]
                              "
                >
                  متابعة الكفالة وتوثيقها
                </p>

                <p
                  dir="rtl"
                  className="
                                mt-3
                                font-['Cairo']
                                text-[12px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  اختيار الحالة المناسبة وإنشاء الكفالة ومتابعة الدفعات
                  والتحديثات الخاصة بها.
                </p>
                <div className="mt-5 flex h-[45px] items-center justify-between rounded-[12px] border border-[#E2EBF5] bg-white px-3">
                  <span className="font-['Cairo'] text-[13px] font-bold text-[#334155]">
                    قناة المتابعة
                  </span>

                  <span className="rounded-[4px] border border-[#BDECEF] bg-[#F2FBFC] px-2.5 py-1 font-['Cairo'] text-[11px] font-semibold leading-none text-[#2DBCC3]">
                    متابعة شفافة ومباشرة
                  </span>
                </div>
              </div>
            </div>

            {/* Guardian */}
            <div
              className="
                            w-full
                            max-w-[384px]
                            rounded-[24px]
                            border
                            border-[#E2EBF5]
                            bg-[#F8FAFD]
                            p-6
                            transition
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-md
                          "
            >
              <div className="flex items-center justify-between">
                <span
                  dir="rtl"
                  className="
                                rounded-full
                                bg-[#FFF5DF]
                                px-3
                                py-1
                                font-['Cairo']
                                text-[10px]
                                font-semibold
                                text-[#D9A441]
                              "
                >
                  الطرف الثالث
                </span>

                <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#D9A441] text-white">
                  <MdFamilyRestroom size={22} />
                </div>
              </div>

              <div className="mt-5 text-right">
                <h3
                  dir="rtl"
                  className="
                                font-['Cairo']
                                text-[20px]
                                font-bold
                                leading-[28px]
                                text-[#101828]
                              "
                >
                  الوصي
                </h3>

                <p
                  dir="rtl"
                  className="
                                mt-1
                                font-['Cairo']
                                text-[14px]
                                font-semibold
                                leading-[20px]
                                text-[#D9A441]
                              "
                >
                  استلام ومتابعة الكفالة
                </p>

                <p
                  dir="rtl"
                  className="
                                mt-3
                                font-['Cairo']
                                text-[12px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  تقديم البيانات والوثائق المطلوبة ومتابعة حالة الكفالة
                  والتحويلات المتعلقة بالحالة.
                </p>
                <div className="mt-5 flex h-[45px] items-center justify-between rounded-[12px] border border-[#E2EBF5] bg-white px-3">
                  <span className="font-['Cairo'] text-[13px] font-bold text-[#334155]">
                    البيئة التفاعلية
                  </span>

                  <span className="rounded-[4px] border border-[#F3D9A0] bg-[#FFFBF2] px-2.5 py-1 font-['Cairo'] text-[11px] font-semibold leading-none text-[#D99A22]">
                    حفظ الخصوصية والكرامة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Problem Section */}
      <section
        id="problem"
        dir="rtl"
        className="
                      w-full
                      bg-[#F4F7FB]
                      px-5
                      py-[56px]
                      sm:px-8
                      lg:px-8
                    "
      >
        <div className="mx-auto w-full max-w-[1216px]">
          {/* Section Header */}
          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            {/* Badge */}
            <span
              className="
                            rounded-full
                            bg-[#FFF1F3]
                            px-3
                            py-1
                            font-['Cairo']
                            text-[10px]
                            font-bold
                            leading-[16px]
                            text-[#F04461]
                          "
            >
              التحدي القائم
            </span>

            {/* Title */}
            <h2
              className="
                            mt-2
                            font-['Cairo']
                            text-[28px]
                            font-black
                            leading-[40px]
                            tracking-[-0.3px]
                            text-[#101828]
                            sm:text-[32px]
                            lg:text-[36px]
                          "
            >
              إدارة الكفالة لا تنتهي عند الدفع
            </h2>

            {/* Description */}
            <p
              className="
                            mt-1
                            max-w-[768px]
                            font-['Cairo']
                            text-[12px]
                            font-medium
                            leading-[20px]
                            text-[#667085]
                            sm:text-[13px]
                          "
            >
              رحلة الكفالة تشمل بيانات ومستندات ودفعات ومراجعات وتحديثات
              وشراكات، لكنها لا تنتهي هنا.
              <br className="hidden sm:block" />
              العمليات موزعة بين الملفات والمحادثات والأدوات المختلفة، فيصبح
              الإدارة والمتابعة والتوثيق أكثر صعوبة.
            </p>
          </div>

          {/* Problem Cards */}
          <div
            className="
                          mt-10
                          grid
                          grid-cols-1
                          gap-5
                          md:grid-cols-3
                        "
          >
            {/* Card 1 */}
            <div
              className="
                            flex
                            min-h-[230px]
                            w-full
                            flex-col
                            rounded-[16px]
                            border
                            border-[#E2EBF5]
                            bg-white
                            px-7
                            pt-7
                            pb-6
                            shadow-[0_4px_12px_rgba(16,24,40,0.03)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-md
                          "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                                grid
                                h-10
                                w-10
                                place-items-center
                                rounded-[10px]
                                bg-[#FFF0F2]
                                text-[#F04461]
                              "
                >
                  <LuFileStack size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3
                  className="
                                font-['Cairo']
                                text-[16px]
                                font-bold
                                leading-[24px]
                                text-[#101828]
                              "
                >
                  ملفات وإجراءات متفرقة
                </h3>

                <p
                  className="
                                mt-2
                                font-['Cairo']
                                text-[11px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  بيانات الكفالة قد تكون موزعة بين أكثر من أداة، مما يزيد من
                  احتمالية ضياع المعلومات المهمة.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="
                            flex
                            min-h-[230px]
                            w-full
                            flex-col
                            rounded-[16px]
                            border
                            border-[#E2EBF5]
                            bg-white
                            px-7
                            pt-7
                            pb-6
                            shadow-[0_4px_12px_rgba(16,24,40,0.03)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-md
                          "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                                grid
                                h-10
                                w-10
                                place-items-center
                                rounded-[10px]
                                bg-[#FFF9E8]
                                text-[#F59E0B]
                              "
                >
                  <FiAlertTriangle size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3
                  className="
                                font-['Cairo']
                                text-[16px]
                                font-bold
                                leading-[24px]
                                text-[#101828]
                              "
                >
                  متابعة غير متكاملة
                </h3>

                <p
                  className="
                                mt-2
                                font-['Cairo']
                                text-[11px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  كل طرف قد يرى جزءًا من الرحلة دون رؤية منظومة الإجراءات
                  المرتبطة به أو المعرفة الدقيقة بالمرحلة التالية.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="
                            flex
                            min-h-[230px]
                            w-full
                            flex-col
                            rounded-[16px]
                            border
                            border-[#E2EBF5]
                            bg-white
                            px-7
                            pt-7
                            pb-6
                            shadow-[0_4px_12px_rgba(16,24,40,0.03)]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-md
                          "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                                grid
                                h-10
                                w-10
                                place-items-center
                                rounded-[10px]
                                bg-[#EFF8FF]
                                text-[#1570EF]
                              "
                >
                  <IoDocumentTextOutline size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3
                  className="
                                font-['Cairo']
                                text-[16px]
                                font-bold
                                leading-[24px]
                                text-[#101828]
                              "
                >
                  توثيق يحتاج إلى تنظيم
                </h3>

                <p
                  className="
                                mt-2
                                font-['Cairo']
                                text-[11px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  المستندات والمعلومات تحتاج إلى سجل واضح وموحد يربط كل كفالة
                  بمراحلها وتحديثاتها.
                </p>
              </div>
            </div>
          </div>
          {/* Bottom CTA */}
          <div
            dir="rtl"
            className="
                      mt-7
                      flex
                      min-h-[112px]
                      w-full
                      items-center
                      justify-between
                      rounded-[16px]
                      bg-[#0D4B8E]
                      px-6
                      shadow-[0_8px_20px_rgba(0,0,0,0.10)]
                      sm:px-7
                    "
          >
            {/* Right Content */}
            <div className="flex items-center gap-3">
              {/* Lightning Icon */}
              <div
                className="
                          grid
                          h-9
                          w-9
                          shrink-0
                          place-items-center
                          rounded-full
                          bg-[#0A638F]
                          text-[#2DBCC3]
                        "
              >
                <FiZap size={19} />
              </div>

              {/* Text */}
              <div className="text-right">
                <h3
                  className="
                            font-['Cairo']
                            text-[15px]
                            font-bold
                            leading-[22px]
                            text-white
                          "
                >
                  من هنا جاءت كفيلي.
                </h3>

                <p
                  className="
                            mt-0.5
                            font-['Cairo']
                            text-[10px]
                            font-medium
                            leading-[18px]
                            text-[#D6E4F0]
                          "
                >
                  صممنا تجربة رقمية تجمع أطراف الكفالة في مكان واحد وتساعد على
                  تنظيمها ومتابعتها بأعلى درجات الموثوقية.
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="
                        shrink-0
                        rounded-[7px]
                        bg-[#2DBCC3]
                        px-5
                        py-2.5
                        font-['Cairo']
                        text-[11px]
                        font-bold
                        text-[#073B59]
                        transition
                        duration-200
                        hover:bg-[#42CBD1]
                      "
            >
              اكتشف كيف نعمل
            </button>
          </div>
        </div>
      </section>
      {/* Problem Section */}
      <section
        id="problem"
        dir="rtl"
        className="
          w-full
          bg-[#F4F7FB]
          px-5
          py-[56px]
          sm:px-8
          lg:px-8
        "
      >
        <div className="mx-auto w-full max-w-[1216px]">
          {/* Section Header */}
          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            {/* Badge */}
            <span
              className="
                rounded-full
                bg-[#FFF1F3]
                px-3
                py-1
                font-['Cairo']
                text-[10px]
                font-bold
                leading-[16px]
                text-[#F04461]
              "
            >
              التحدي القائم
            </span>

            {/* Title */}
            <h2
              className="
                mt-2
                font-['Cairo']
                text-[28px]
                font-black
                leading-[40px]
                tracking-[-0.3px]
                text-[#101828]
                sm:text-[32px]
                lg:text-[36px]
              "
            >
              إدارة الكفالة لا تنتهي عند الدفع
            </h2>

            {/* Description */}
            <p
              className="
                mt-1
                max-w-[768px]
                font-['Cairo']
                text-[12px]
                font-medium
                leading-[20px]
                text-[#667085]
                sm:text-[13px]
              "
            >
              رحلة الكفالة تشمل بيانات ومستندات ودفعات ومراجعات وتحديثات
              وشراكات، لكنها لا تنتهي هنا.
              <br className="hidden sm:block" />
              العمليات موزعة بين الملفات والمحادثات والأدوات المختلفة، فيصبح
              الإدارة والمتابعة والتوثيق أكثر صعوبة.
            </p>
          </div>

          {/* Problem Cards */}
          <div
            className="
              mt-10
              grid
              grid-cols-1
              gap-5
              md:grid-cols-3
            "
          >
            {/* Card 1 */}
            <div
              className="
                flex
                min-h-[230px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-white
                px-7
                pt-7
                pb-6
                shadow-[0_4px_12px_rgba(16,24,40,0.03)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-[10px]
                    bg-[#FFF0F2]
                    text-[#F04461]
                  "
                >
                  <LuFileStack size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3
                  className="
                    font-['Cairo']
                    text-[16px]
                    font-bold
                    leading-[24px]
                    text-[#101828]
                  "
                >
                  ملفات وإجراءات متفرقة
                </h3>

                <p
                  className="
                    mt-2
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[20px]
                    text-[#667085]
                  "
                >
                  بيانات الكفالة قد تكون موزعة بين أكثر من أداة، مما يزيد من
                  احتمالية ضياع المعلومات المهمة.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="
                flex
                min-h-[230px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-white
                px-7
                pt-7
                pb-6
                shadow-[0_4px_12px_rgba(16,24,40,0.03)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-[10px]
                    bg-[#FFF9E8]
                    text-[#F59E0B]
                  "
                >
                  <FiAlertTriangle size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3
                  className="
                    font-['Cairo']
                    text-[16px]
                    font-bold
                    leading-[24px]
                    text-[#101828]
                  "
                >
                  متابعة غير متكاملة
                </h3>

                <p
                  className="
                    mt-2
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[20px]
                    text-[#667085]
                  "
                >
                  كل طرف قد يرى جزءًا من الرحلة دون رؤية منظومة الإجراءات
                  المرتبطة به أو المعرفة الدقيقة بالمرحلة التالية.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="
                flex
                min-h-[230px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-white
                px-7
                pt-7
                pb-6
                shadow-[0_4px_12px_rgba(16,24,40,0.03)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-md
              "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                    grid
                    h-10
                    w-10
                    place-items-center
                    rounded-[10px]
                    bg-[#EFF8FF]
                    text-[#1570EF]
                  "
                >
                  <IoDocumentTextOutline size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5">
                <h3
                  className="
                    font-['Cairo']
                    text-[16px]
                    font-bold
                    leading-[24px]
                    text-[#101828]
                  "
                >
                  توثيق يحتاج إلى تنظيم
                </h3>

                <p
                  className="
                    mt-2
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[20px]
                    text-[#667085]
                  "
                >
                  المستندات والمعلومات تحتاج إلى سجل واضح وموحد يربط كل كفالة
                  بمراحلها وتحديثاتها.
                </p>
              </div>
            </div>
          </div>
          {/* Bottom CTA */}
          <div
            dir="rtl"
            className="
          mt-7
          flex
          min-h-[112px]
          w-full
          items-center
          justify-between
          rounded-[16px]
          bg-[#0D4B8E]
          px-6
          shadow-[0_8px_20px_rgba(0,0,0,0.10)]
          sm:px-7
        "
          >
            {/* Right Content */}
            <div className="flex items-center gap-3">
              {/* Lightning Icon */}
              <div
                className="
              grid
              h-9
              w-9
              shrink-0
              place-items-center
              rounded-full
              bg-[#0A638F]
              text-[#2DBCC3]
            "
              >
                <FiZap size={19} />
              </div>

              {/* Text */}
              <div className="text-right">
                <h3
                  className="
                font-['Cairo']
                text-[15px]
                font-bold
                leading-[22px]
                text-white
              "
                >
                  من هنا جاءت كفيلي.
                </h3>

                <p
                  className="
                mt-0.5
                font-['Cairo']
                text-[10px]
                font-medium
                leading-[18px]
                text-[#D6E4F0]
              "
                >
                  صممنا تجربة رقمية تجمع أطراف الكفالة في مكان واحد وتساعد على
                  تنظيمها ومتابعتها بأعلى درجات الموثوقية.
                </p>
              </div>
            </div>

            {/* Button */}
            <button
              type="button"
              className="
            shrink-0
            rounded-[7px]
            bg-[#2DBCC3]
            px-5
            py-2.5
            font-['Cairo']
            text-[11px]
            font-bold
            text-[#073B59]
            transition
            duration-200
            hover:bg-[#42CBD1]
          "
            >
              اكتشف كيف نعمل
            </button>
          </div>
        </div>
      </section>
      {/* Solution Section */}
      <section
        id="solution"
        dir="rtl"
        className="
                w-full
                overflow-hidden
                bg-gradient-to-b
                from-[#062246]
                via-[#0D4B8E]
                to-[#062246]
                px-5
                py-[72px]
                sm:px-8
                lg:px-8
              "
      >
        <div className="mx-auto w-full max-w-[1216px]">
          {/* Header */}
          <div
            className="
                    mx-auto
                    flex
                    w-full
                    max-w-[768px]
                    flex-col
                    items-center
                    text-center
                  "
          >
            {/* Badge */}
            <span
              className="
                      rounded-full
                      border
                      border-[#2DBCC3]/30
                      bg-[#2DBCC3]/10
                      px-3
                      py-1
                      font-['Cairo']
                      text-[10px]
                      font-semibold
                      leading-[16px]
                      text-[#2DBCC3]
                    "
            >
              الحل والتوجيه
            </span>

            {/* Title */}
            <h2
              className="
                      mt-2
                      font-['Cairo']
                      text-[28px]
                      font-black
                      leading-[40px]
                      text-white
                      sm:text-[32px]
                      lg:text-[36px]
                    "
            >
              منظومة واحدة لإدارة رحلة الكفالة
            </h2>

            {/* Description */}
            <p
              className="
                      mt-2
                      max-w-[700px]
                      font-['Cairo']
                      text-[12px]
                      font-medium
                      leading-[20px]
                      text-[#D6E4F0]
                      sm:text-[13px]
                    "
            >
              كفيلي تجمع المؤسسة والكفيل والوصي ضمن رحلة رقمية واحدة، بحيث يعرف
              كل طرف دوره وما يحتاج إليه.
            </p>
          </div>

          {/* Cards */}
          <div
            className="
                    mt-10
                    grid
                    grid-cols-1
                    gap-4
                    md:grid-cols-3
                  "
          >
            {/* Institution */}
            <div
              className="
                      flex
                      min-h-[267px]
                      flex-col
                      rounded-[24px]
                      border
                      border-white/10
                      bg-white/[0.10]
                      p-7
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white/[0.14]
                    "
            >
              <div className="flex justify-start">
                <div
                  className="
                          grid
                          h-10
                          w-10
                          place-items-center
                          rounded-[10px]
                          bg-white/10
                          text-[#2DBCC3]
                        "
                >
                  <PiBuildings size={18} />
                </div>
              </div>

              <div className="mt-5 text-right">
                <h3
                  className="
                          font-['Cairo']
                          text-[16px]
                          font-bold
                          leading-[24px]
                          text-white
                        "
                >
                  المؤسسة
                </h3>

                <p
                  className="
                          mt-2
                          font-['Cairo']
                          text-[11px]
                          font-medium
                          leading-[20px]
                          text-[#D6E4F0]
                        "
                >
                  تدير حالات الكفالة والكفلاء، وتراجع المستندات والدفعات وتضمن
                  رحلة منظمة وشفافة.
                </p>

                <div className="mt-5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />
                  <span
                    className="
                            font-['Cairo']
                            text-[9px]
                            font-semibold
                            text-[#2DBCC3]
                          "
                  >
                    حوكمة وإشراف شامل
                  </span>
                </div>
              </div>
            </div>

            {/* Sponsor */}
            <div
              className="
                      flex
                      min-h-[267px]
                      flex-col
                      rounded-[24px]
                      border
                      border-white/10
                      bg-white/[0.10]
                      p-7
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white/[0.14]
                    "
            >
              <div className="flex justify-start">
                <div
                  className="
                          grid
                          h-10
                          w-10
                          place-items-center
                          rounded-[10px]
                          bg-white/10
                          text-[#2DBCC3]
                        "
                >
                  <FiUser size={18} />
                </div>
              </div>

              <div className="mt-5 text-right">
                <h3
                  className="
                          font-['Cairo']
                          text-[16px]
                          font-bold
                          leading-[24px]
                          text-white
                        "
                >
                  الكفيل
                </h3>

                <p
                  className="
                          mt-2
                          font-['Cairo']
                          text-[11px]
                          font-medium
                          leading-[20px]
                          text-[#D6E4F0]
                        "
                >
                  يتابع كفالته ومعطياتها والتحديثات المرتبطة بها، ويتمكن من رؤية
                  آخر المستجدات بوضوح.
                </p>

                <div className="mt-5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />
                  <span
                    className="
                            font-['Cairo']
                            text-[9px]
                            font-semibold
                            text-[#2DBCC3]
                          "
                  >
                    متابعة موثقة ومستمرة
                  </span>
                </div>
              </div>
            </div>

            {/* Guardian */}
            <div
              className="
                      flex
                      min-h-[267px]
                      flex-col
                      rounded-[24px]
                      border
                      border-white/10
                      bg-white/[0.10]
                      p-7
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white/[0.14]
                    "
            >
              <div className="flex justify-start">
                <div
                  className="
                          grid
                          h-10
                          w-10
                          place-items-center
                          rounded-[10px]
                          bg-white/10
                          text-[#2DBCC3]
                        "
                >
                  <FiShield size={18} />
                </div>
              </div>

              <div className="mt-5 text-right">
                <h3
                  className="
                          font-['Cairo']
                          text-[16px]
                          font-bold
                          leading-[24px]
                          text-white
                        "
                >
                  الوصي
                </h3>

                <p
                  className="
                          mt-2
                          font-['Cairo']
                          text-[11px]
                          font-medium
                          leading-[20px]
                          text-[#D6E4F0]
                        "
                >
                  يتابع الإجراءات المرتبطة بالحالة ويرفع المستندات والتحديثات
                  المطلوبة وفق النظام.
                </p>

                <div className="mt-5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />
                  <span
                    className="
                            font-['Cairo']
                            text-[9px]
                            font-semibold
                            text-[#2DBCC3]
                          "
                  >
                    حماية وخصوصية منظمة
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* System Pillars */}
          <div
            className="
                    mt-9
                    flex
                    min-h-[98px]
                    w-full
                    items-center
                    justify-between
                    gap-5
                    rounded-[16px]
                    border
                    border-black/30
                    bg-[#062246]
                    px-6
                    py-5
                  "
          >
            {/* Title */}
            <div className="text-right">
              <p
                className="
                        font-['Cairo']
                        text-[9px]
                        font-medium
                        leading-[16px]
                        text-[#2DBCC3]
                      "
              >
                دليل نجاح المنظومة
              </p>

              <h3
                className="
                        font-['Cairo']
                        text-[14px]
                        font-bold
                        leading-[22px]
                        text-white
                      "
              >
                ركائز المنظومة:
              </h3>
            </div>

            {/* Pillars */}
            <div className="flex items-center gap-4">
              <span
                className="
                        rounded-[8px]
                        bg-[#12385F]
                        px-4
                        py-2
                        font-['Cairo']
                        text-[10px]
                        font-semibold
                        text-white
                      "
              >
                تنظيم
                <span className="mr-1 text-[#2DBCC3]">✓</span>
              </span>

              <span
                className="
                        rounded-[8px]
                        bg-[#12385F]
                        px-4
                        py-2
                        font-['Cairo']
                        text-[10px]
                        font-semibold
                        text-white
                      "
              >
                توثيق
                <span className="mr-1 text-[#2DBCC3]">✓</span>
              </span>

              <span
                className="
                        rounded-[8px]
                        bg-[#12385F]
                        px-4
                        py-2
                        font-['Cairo']
                        text-[10px]
                        font-semibold
                        text-white
                      "
              >
                متابعة
                <span className="mr-1 text-[#2DBCC3]">✓</span>
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* Why Kafeeli Section */}
      <section
        id="why-kafeeli"
        dir="rtl"
        className="
                      w-full
                      bg-white
                      px-5
                      py-[60px]
                      sm:px-8
                      lg:px-8
                      lg:py-[78px]
                    "
      >
        <div className="mx-auto w-full max-w-[1216px]">
          {/* =========================
                          Section Header
                      ========================== */}
          <div
            className="
                          mx-auto
                          flex
                          w-full
                          max-w-[768px]
                          flex-col
                          items-center
                          text-center
                        "
          >
            {/* Badge */}
            <span
              className="
                            inline-flex
                            items-center
                            justify-center
                            rounded-full
                            bg-[#EAF0F7]
                            px-3
                            py-[5px]
                            font-['Cairo']
                            text-[10px]
                            font-semibold
                            leading-[16px]
                            text-[#19579A]
                          "
            >
              القيمة المضافة
            </span>

            {/* Title */}
            <h2
              className="
                            mt-2
                            font-['Cairo']
                            text-[30px]
                            font-black
                            leading-[40px]
                            tracking-[0px]
                            text-[#0F172A]
                            sm:text-[34px]
                            lg:text-[36px]
                          "
            >
              لماذا كفيلي؟
            </h2>

            {/* Description */}
            <p
              className="
                            mt-1
                            max-w-[768px]
                            font-['Cairo']
                            text-[14px]
                            font-medium
                            leading-[24px]
                            text-[#667085]
                            sm:text-[15px]
                          "
            >
              لأن التحدي ليس فقط بدء الكفالة، بل في إدارتها وتوثيقها.
            </p>
          </div>

          {/* =========================
                          Features Cards
                      ========================== */}
          <div
            className="
                          mt-10
                          grid
                          w-full
                          grid-cols-1
                          gap-5
                          sm:grid-cols-2
                          lg:grid-cols-4
                          lg:gap-6
                        "
          >
            {/* =========================
                            Card 1 - Institution
                        ========================== */}
            <div
              className="
                            flex
                            min-h-[230px]
                            w-full
                            flex-col
                            rounded-[16px]
                            border
                            border-[#E2EBF5]
                            bg-[#F8FAFD]
                            p-7
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]
                          "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                                grid
                                h-9
                                w-9
                                place-items-center
                                rounded-[10px]
                                bg-[#E7EEF7]
                                text-[#19579A]
                              "
                >
                  <FiGrid size={18} strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 text-right">
                <h3
                  className="
                                font-['Cairo']
                                text-[18px]
                                font-bold
                                leading-[28px]
                                text-[#0F172A]
                              "
                >
                  إدارة متكاملة
                </h3>

                <p
                  className="
                                mt-2
                                font-['Cairo']
                                text-[12px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  تنظيم الحالات والكفلاء والأوصياء والكفالات من مكان واحد وبدون
                  تشتيت.
                </p>
              </div>
            </div>

            {/* =========================
                            Card 2 - Tracking
                        ========================== */}
            <div
              className="
                            flex
                            min-h-[230px]
                            w-full
                            flex-col
                            rounded-[16px]
                            border
                            border-[#E2EBF5]
                            bg-[#F8FAFD]
                            p-7
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]
                          "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                                grid
                                h-9
                                w-9
                                place-items-center
                                rounded-[10px]
                                bg-[#E2F5F7]
                                text-[#2DBCC3]
                              "
                >
                  <FiTrendingUp size={18} strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 text-right">
                <h3
                  className="
                                font-['Cairo']
                                text-[18px]
                                font-bold
                                leading-[28px]
                                text-[#0F172A]
                              "
                >
                  رحلة قابلة للتتبع
                </h3>

                <p
                  className="
                                mt-2
                                font-['Cairo']
                                text-[12px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  معرفة المرحلة الحالية لكل كفالة والتحديثات المرتبطة بها بوضوح
                  زمني كامل.
                </p>
              </div>
            </div>

            {/* =========================
                            Card 3 - Documentation
                        ========================== */}
            <div
              className="
                            flex
                            min-h-[230px]
                            w-full
                            flex-col
                            rounded-[16px]
                            border
                            border-[#E2EBF5]
                            bg-[#F8FAFD]
                            p-7
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]
                          "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                                grid
                                h-9
                                w-9
                                place-items-center
                                rounded-[10px]
                                bg-[#F7F0E2]
                                text-[#E5A72D]
                              "
                >
                  <FiFileText size={18} strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 text-right">
                <h3
                  className="
                                font-['Cairo']
                                text-[18px]
                                font-bold
                                leading-[28px]
                                text-[#0F172A]
                              "
                >
                  توثيق واضح
                </h3>

                <p
                  className="
                                mt-2
                                font-['Cairo']
                                text-[12px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  ربط المستندات والمدفوعات والتحديثات برحلة الكفالة في سجل موثوق
                  ومعتمد.
                </p>
              </div>
            </div>

            {/* =========================
                            Card 4 - Privacy
                        ========================== */}
            <div
              className="
                            flex
                            min-h-[230px]
                            w-full
                            flex-col
                            rounded-[16px]
                            border
                            border-[#E2EBF5]
                            bg-[#F8FAFD]
                            p-7
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-[0_8px_24px_rgba(16,24,40,0.06)]
                          "
            >
              {/* Icon */}
              <div className="flex justify-start">
                <div
                  className="
                                grid
                                h-9
                                w-9
                                place-items-center
                                rounded-[10px]
                                bg-[#EEEAFE]
                                text-[#6956E5]
                              "
                >
                  <PiLockKeyOpen size={18} strokeWidth={2} />
                </div>
              </div>

              {/* Content */}
              <div className="mt-5 text-right">
                <h3
                  className="
                                font-['Cairo']
                                text-[18px]
                                font-bold
                                leading-[28px]
                                text-[#0F172A]
                              "
                >
                  صلاحيات وخصوصية
                </h3>

                <p
                  className="
                                mt-2
                                font-['Cairo']
                                text-[12px]
                                font-medium
                                leading-[20px]
                                text-[#667085]
                              "
                >
                  لكل مستخدم تجربة وصلاحيات تناسب دوره داخل المنظومة مع الحفاظ
                  على سرية البيانات.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========================
    Problem / Challenge Section
========================= */}
      <section
        id="problem"
        dir="rtl"
        className="
    w-full
    bg-[#F4F7FB]
    px-4
    py-[60px]
    sm:px-6
    sm:py-[70px]
    lg:px-8
    lg:py-[80px]
  "
      >
        <div className="mx-auto w-full max-w-[1216px]">
          {/* =========================
        WHITE CONTAINER
    ========================= */}
          <div
            className="
        w-full
        rounded-[24px]
        border
        border-[#E2EBF5]
        bg-white
        px-5
        py-6
        sm:px-7
        sm:py-8
        lg:px-8
        lg:py-[40px]
      "
          >
            {/* =========================
          MAIN GRID
      ========================= */}
            <div
              className="
          mx-auto
          grid
          w-full
          max-w-[1118px]
          min-w-0
          grid-cols-1
          gap-8
          lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
          lg:gap-[40px]
          lg:[direction:ltr]
        "
            >
              {/* =================================
            CARDS
            LEFT SIDE
        ================================= */}
              <div
                dir="rtl"
                className="
            order-2
            grid
            w-full
            min-w-0
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:order-1
          "
              >
                {/* =================================
              CARD 1
              إدارة الحالات والأوصياء
          ================================= */}
                <div
                  className="
              flex
              min-h-[157px]
              w-full
              min-w-0
              flex-col
              rounded-[16px]
              border
              border-[#E2EBF5]
              bg-[#F8FAFD]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]
            "
                >
                  {/* Icon - Left */}
                  <div
                    className="
                flex
                h-[36px]
                w-[36px]
                shrink-0
                items-center
                justify-center
                self-start
                rounded-[10px]
                bg-[#E7EEF7]
                text-[#19579A]
              "
                  >
                    <FiUsers size={19} strokeWidth={2} />
                  </div>

                  {/* Content - Right */}
                  <div className="mt-auto text-right">
                    <h3
                      className="
                  font-['Cairo']
                  text-[14px]
                  font-bold
                  leading-[20px]
                  text-[#1E293B]
                "
                    >
                      إدارة الحالات والأوصياء
                    </h3>

                    <p
                      className="
                  mt-1
                  font-['Cairo']
                  text-[11px]
                  font-medium
                  leading-[19px]
                  text-[#718096]
                "
                    >
                      تنظيم البيانات والمستندات ومتابعة حالة المراجعة.
                    </p>
                  </div>
                </div>

                {/* =================================
              CARD 2
              إدارة الكفلاء والكفالات
          ================================= */}
                <div
                  className="
              flex
              min-h-[157px]
              w-full
              min-w-0
              flex-col
              rounded-[16px]
              border
              border-[#E2EBF5]
              bg-[#F8FAFD]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]
            "
                >
                  {/* Icon - Left */}
                  <div
                    className="
                flex
                h-[36px]
                w-[36px]
                shrink-0
                items-center
                justify-center
                self-start
                rounded-[10px]
                bg-[#E2F5F7]
                text-[#2DBCC3]
              "
                  >
                    <FiUserCheck size={19} strokeWidth={2} />
                  </div>

                  {/* Content - Right */}
                  <div className="mt-auto text-right">
                    <h3
                      className="
                  font-['Cairo']
                  text-[14px]
                  font-bold
                  leading-[20px]
                  text-[#1E293B]
                "
                    >
                      إدارة الكفلاء والكفالات
                    </h3>

                    <p
                      className="
                  mt-1
                  font-['Cairo']
                  text-[11px]
                  font-medium
                  leading-[19px]
                  text-[#718096]
                "
                    >
                      ربط الكفالات بأطرافها ومتابعة دورة كل كفالة.
                    </p>
                  </div>
                </div>

                {/* =================================
              CARD 3
              متابعة الدفعات
          ================================= */}
                <div
                  className="
              flex
              min-h-[157px]
              w-full
              min-w-0
              flex-col
              rounded-[16px]
              border
              border-[#E2EBF5]
              bg-[#F8FAFD]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]
            "
                >
                  {/* Icon - Left */}
                  <div
                    className="
                flex
                h-[36px]
                w-[36px]
                shrink-0
                items-center
                justify-center
                self-start
                rounded-[10px]
                bg-[#F7F0E2]
                text-[#E5A72D]
              "
                  >
                    <FiCreditCard size={18} strokeWidth={2} />
                  </div>

                  {/* Content - Right */}
                  <div className="mt-auto text-right">
                    <h3
                      className="
                  font-['Cairo']
                  text-[14px]
                  font-bold
                  leading-[20px]
                  text-[#1E293B]
                "
                    >
                      متابعة الدفعات
                    </h3>

                    <p
                      className="
                  mt-1
                  font-['Cairo']
                  text-[11px]
                  font-medium
                  leading-[19px]
                  text-[#718096]
                "
                    >
                      مراجعة إثباتات الدفع وتوثيق حالة الإجراءات المالية.
                    </p>
                  </div>
                </div>

                {/* =================================
              CARD 4
              التحديثات والمتابعة
          ================================= */}
                <div
                  className="
              flex
              min-h-[157px]
              w-full
              min-w-0
              flex-col
              rounded-[16px]
              border
              border-[#E2EBF5]
              bg-[#F8FAFD]
              p-5
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)]
            "
                >
                  {/* Icon - Left */}
                  <div
                    className="
                flex
                h-[36px]
                w-[36px]
                shrink-0
                items-center
                justify-center
                self-start
                rounded-[10px]
                bg-[#EEF0FF]
                text-[#6155E8]
              "
                  >
                    <FiRefreshCw size={18} strokeWidth={2} />
                  </div>

                  {/* Content - Right */}
                  <div className="mt-auto text-right">
                    <h3
                      className="
                  font-['Cairo']
                  text-[14px]
                  font-bold
                  leading-[20px]
                  text-[#1E293B]
                "
                    >
                      التحديثات والمتابعة
                    </h3>

                    <p
                      className="
                  mt-1
                  font-['Cairo']
                  text-[11px]
                  font-medium
                  leading-[19px]
                  text-[#718096]
                "
                    >
                      إدارة التحديثات المرتبطة بالكفالات وإتاحتها للأطراف
                      المعنية.
                    </p>
                  </div>
                </div>
              </div>

              {/* =================================
            CONTENT
            RIGHT SIDE
        ================================= */}
              <div
                dir="rtl"
                className="
            order-1
            flex
            w-full
            min-w-0
            flex-col
            items-start
            justify-center
            overflow-hidden
            text-right
            lg:order-2
          "
              >
                {/* Badge */}
                <span
                  className="
              inline-flex
              h-[31px]
              w-fit
              items-center
              rounded-full
              bg-[#EAF2F9]
              px-3
              font-['Cairo']
              text-[11px]
              font-bold
              leading-[18px]
              text-[#19579A]
            "
                >
                  كفيلي للمؤسسات
                </span>

                {/* Title */}
                <h2
                  className="
              mt-[7px]
              w-full
              min-w-0
              break-words
              font-['Cairo']
              text-[28px]
              font-black
              leading-[38px]
              tracking-[-0.3px]
              text-[#0F172A]
              sm:text-[32px]
              sm:leading-[40px]
              lg:text-[36px]
              lg:leading-[40px]
            "
                >
                  إدارة الكفالات في نظام واحد
                </h2>

                {/* Description */}
                <p
                  className="
              mt-[7px]
              w-full
              max-w-[485px]
              min-w-0
              break-words
              font-['Cairo']
              text-[14px]
              font-medium
              leading-[24px]
              text-[#475569]
              sm:text-[15px]
              sm:leading-[25px]
              lg:text-[16px]
              lg:leading-[26px]
            "
                >
                  تساعد كفيلي المؤسسات على تنظيم الحالات والكفلاء والأوصياء
                  والكفالات والإجراءات المرتبطة بها، بدل توزيع رحلة العمل بين
                  أدوات متعددة.
                </p>

                {/* Button */}
                <button
                  type="button"
                  className="
              mt-[18px]
              inline-flex
              h-[40px]
              max-w-full
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-[8px]
              bg-[#0D5BA8]
              px-4
              font-['Cairo']
              text-[12px]
              font-bold
              leading-[20px]
              text-white
              shadow-[0_4px_10px_rgba(13,91,168,0.15)]
              transition-all
              duration-300
              hover:bg-[#0B4F94]
            "
                >
                  <span className="truncate">اكتشف كفيلي للمؤسسات</span>

                  <FiArrowLeft size={17} strokeWidth={2} className="shrink-0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* =========================
          Process Section
      ========================= */}
      <section
        id="process"
        dir="rtl"
        className="
          w-full
          -translate-y-10
          bg-white
          px-5
          pt-[70px]
          pb-[70px]
          sm:px-8
          lg:px-8
          border-b border-[#F4F7FB]
        "
      >
        <div className="mx-auto w-full max-w-[1216px]">
          {/* =========================
              Section Header
          ========================= */}
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[768px]
              flex-col
              items-center
              gap-[7px]
              text-center
            "
          >
            {/* Badge */}
            <span
              className="
                inline-flex
                h-[24px]
                w-fit
                items-center
                rounded-full
                bg-[#EAF2F9]
                px-[9px]
                font-['Cairo']
                text-[10px]
                font-bold
                leading-[16px]
                text-[#0D4B8E]
              "
            >
              التسلسل الإجرائي
            </span>

            {/* Title */}
            <h2
              className="
                font-['Cairo']
                text-[28px]
                font-black
                leading-[36px]
                tracking-[0]
                text-[#0F172A]
                sm:text-[32px]
                sm:leading-[38px]
                lg:text-[36px]
                lg:leading-[40px]
              "
            >
              رحلة واضحة من البداية إلى المتابعة
            </h2>

            {/* Description */}
            <p
              className="
                font-['Cairo']
                text-[13px]
                font-medium
                leading-[22px]
                text-[#475569]
                sm:text-[14px]
                sm:leading-[24px]
              "
            >
              كل مرحلة لها إجراء واضح، وطرف مسؤول، وحالة يمكن متابعتها.
            </p>
          </div>

          {/* =========================
              Steps
          ========================= */}
          <div
            className="
              mt-[40px]
              grid
              w-full
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-5
              lg:gap-3
            "
          >
            {/* =========================
                01 - بدء الكفالة
            ========================= */}
            <div
              className="
                flex
                min-h-[196px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-[#F8FAFD]
                p-5
              "
            >
              <div className="text-right">
                <span
                  className="
                    font-['Cairo']
                    text-[30px]
                    font-black
                    leading-[36px]
                    text-[#0D4B8E]/20
                  "
                >
                  01
                </span>

                <h3
                  className="
                    mt-[2px]
                    font-['Cairo']
                    text-[16px]
                    font-bold
                    leading-[24px]
                    text-[#0F172A]
                  "
                >
                  بدء الكفالة
                </h3>

                <p
                  className="
                    mt-[4px]
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[19px]
                    text-[#718096]
                  "
                >
                  يبدأ الكفيل إجراءات الكفالة من خلال حسابه.
                </p>
              </div>

              <div className="mt-auto">
                <span
                  className="
                    inline-flex
                    h-[24px]
                    items-center
                    rounded-[6px]
                    bg-[#EAF2F9]
                    px-[9px]
                    font-['Cairo']
                    text-[10px]
                    font-bold
                    leading-[18px]
                    text-[#0D4B8E]
                  "
                >
                  الخطوة الأولى
                </span>
              </div>
            </div>

            {/* =========================
                02 - توثيق الدفع
            ========================= */}
            <div
              className="
                flex
                min-h-[196px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-[#F8FAFD]
                p-5
              "
            >
              <div className="text-right">
                <span
                  className="
                    font-['Cairo']
                    text-[30px]
                    font-black
                    leading-[36px]
                    text-[#0D4B8E]/20
                  "
                >
                  02
                </span>

                <h3
                  className="
                    mt-[2px]
                    font-['Cairo']
                    text-[16px]
                    font-bold
                    leading-[24px]
                    text-[#0F172A]
                  "
                >
                  توثيق الدفع
                </h3>

                <p
                  className="
                    mt-[4px]
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[19px]
                    text-[#718096]
                  "
                >
                  يتم رفع إثبات الدفع وربطه بالكفالة.
                </p>
              </div>

              <div className="mt-auto">
                <span
                  className="
                    inline-flex
                    h-[24px]
                    items-center
                    rounded-[6px]
                    bg-[#EAF2F9]
                    px-[9px]
                    font-['Cairo']
                    text-[10px]
                    font-bold
                    leading-[18px]
                    text-[#0D4B8E]
                  "
                >
                  الخطوة الثانية
                </span>
              </div>
            </div>

            {/* =========================
                03 - مراجعة المؤسسة
            ========================= */}
            <div
              className="
                flex
                min-h-[196px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-[#F8FAFD]
                p-5
              "
            >
              <div className="text-right">
                <span
                  className="
                    font-['Cairo']
                    text-[30px]
                    font-black
                    leading-[36px]
                    text-[#0D4B8E]/20
                  "
                >
                  03
                </span>

                <h3
                  className="
                    mt-[2px]
                    font-['Cairo']
                    text-[16px]
                    font-bold
                    leading-[24px]
                    text-[#0F172A]
                  "
                >
                  مراجعة المؤسسة
                </h3>

                <p
                  className="
                    mt-[4px]
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[19px]
                    text-[#718096]
                  "
                >
                  تراجع المؤسسة العملية والإثباتات المرتبطة بها.
                </p>
              </div>

              <div className="mt-auto">
                <span
                  className="
                    inline-flex
                    h-[24px]
                    items-center
                    rounded-[6px]
                    bg-[#EAF2F9]
                    px-[9px]
                    font-['Cairo']
                    text-[10px]
                    font-bold
                    leading-[18px]
                    text-[#0D4B8E]
                  "
                >
                  الخطوة الثالثة
                </span>
              </div>
            </div>

            {/* =========================
                04 - توثيق التحويل والاستلام
            ========================= */}
            <div
              className="
                flex
                min-h-[196px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-[#F8FAFD]
                p-5
              "
            >
              <div className="text-right">
                <span
                  className="
                    font-['Cairo']
                    text-[30px]
                    font-black
                    leading-[36px]
                    text-[#0D4B8E]/20
                  "
                >
                  04
                </span>

                <h3
                  className="
                    mt-[2px]
                    whitespace-nowrap
                    text-right
                    font-['Cairo']
                    text-[14px]
                    font-bold
                    leading-[24px]
                    tracking-[-0.2px]
                    text-[#0F172A]
                    sm:text-[15px]
                  "
                >
                  توثيق التحويل والاستلام
                </h3>

                <p
                  className="
                    mt-[4px]
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[19px]
                    text-[#718096]
                  "
                >
                  توثق إجراءات تحويل الكفالة وتأكيد الاستلام.
                </p>
              </div>

              <div className="mt-auto">
                <span
                  className="
                    inline-flex
                    h-[24px]
                    items-center
                    rounded-[6px]
                    bg-[#EAF2F9]
                    px-[9px]
                    font-['Cairo']
                    text-[10px]
                    font-bold
                    leading-[18px]
                    text-[#0D4B8E]
                  "
                >
                  الخطوة الرابعة
                </span>
              </div>
            </div>

            {/* =========================
                05 - المتابعة والتحديثات
            ========================= */}
            <div
              className="
                flex
                min-h-[196px]
                w-full
                flex-col
                rounded-[16px]
                border
                border-[#E2EBF5]
                bg-[#F8FAFD]
                p-5
              "
            >
              <div className="text-right">
                <span
                  className="
                    font-['Cairo']
                    text-[30px]
                    font-black
                    leading-[36px]
                    text-[#0D4B8E]/20
                  "
                >
                  05
                </span>

                <h3
                  className="
                    mt-[2px]
                    font-['Cairo']
                    text-[16px]
                    font-bold
                    leading-[24px]
                    text-[#0F172A]
                  "
                >
                  المتابعة والتحديثات
                </h3>

                <p
                  className="
                    mt-[4px]
                    font-['Cairo']
                    text-[11px]
                    font-medium
                    leading-[19px]
                    text-[#718096]
                  "
                >
                  تستمر رحلة الكفالة والتحديثات المرتبطة بها.
                </p>
              </div>

              <div className="mt-auto">
                <span
                  className="
                    inline-flex
                    h-[24px]
                    items-center
                    rounded-[6px]
                    bg-[#EAF2F9]
                    px-[9px]
                    font-['Cairo']
                    text-[10px]
                    font-bold
                    leading-[18px]
                    text-[#0D4B8E]
                  "
                >
                  الخطوة الخامسة
                </span>
              </div>
            </div>
          </div>

          {/* =========================
              Bottom Button
          ========================= */}
          <div className="mt-[32px] flex justify-center">
            <button
              type="button"
              className="
                inline-flex
                h-[40px]
                w-fit
                items-center
                justify-center
                gap-2
                rounded-[8px]
                bg-[#0D5BA8]
                px-4
                font-['Cairo']
                text-[12px]
                font-bold
                leading-[20px]
                text-white
                shadow-[0_4px_10px_rgba(13,91,168,0.15)]
                transition-all
                duration-300
                hover:bg-[#0B4F94]
              "
            >
              شاهد الرحلة بالتفصيل
              <FiArrowLeft size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>
      {/* Trust Section */}
      <section
        id="trust"
        dir="rtl"
        className="w-full border-t border-[#E2EBF5] bg-white px-5 pt-[60px] pb-[80px] sm:px-8 lg:px-8"
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-col">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            {/* Badge */}
            <span
              className="
                      inline-flex
                      h-[31px]
                      w-fit
                      items-center
                      justify-center
                      rounded-[9999px]
                      bg-[rgba(45,188,195,0.1)]
                      px-3
                      py-[7.5px]
                      font-['Cairo']
                      text-[12px]
                      font-semibold
                      leading-[16px]
                      text-[#2DBCC3]
                    "
            >
              الأمان والمصداقية
            </span>

            {/* Title */}
            <h2
              className="
                      mt-2
                      font-['Cairo']
                      text-[28px]
                      font-black
                      leading-[40px]
                      tracking-[0px]
                      text-[#0F172A]
                      sm:text-[32px]
                      lg:text-[36px]
                    "
            >
              الثقة تبدأ من وضوح كل خطوة
            </h2>

            {/* Description */}
            <p
              className="
                      mt-[7px]
                      max-w-[768px]
                      font-['Cairo']
                      text-[14px]
                      font-medium
                      leading-[24px]
                      tracking-[0px]
                      text-[#52657D]
                      sm:text-[15px]
                      lg:text-[16px]
                    "
            >
              لأن رحلة الكفالة تتعامل مع بيانات حساسة وإجراءات مالية، تساعد
              كفيلي على جعل المسؤوليات والإجراءات والمتابعة أكثر وضوحًا.
            </p>
          </div>

          {/* Cards */}
          <div
            className="
                    mt-10
                    grid
                    w-full
                    grid-cols-1
                    gap-5
                    sm:grid-cols-2
                    lg:grid-cols-4
                    lg:gap-6
                  "
          >
            {/* Card 1 */}
            <div
              className="
                      flex
                      min-h-[177px]
                      w-full
                      flex-col
                      rounded-[16px]
                      border
                      border-[#E2EBF5]
                      bg-[#F8FAFD]
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-md
                    "
            >
              {/* Icon */}
              <div
                className="
                        flex
                        h-[32px]
                        w-[32px]
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-[#E4ECF6]
                        text-[#19579A]
                      "
              >
                <FiShield size={17} strokeWidth={2} />
              </div>

              <div className="mt-4 text-right">
                <h3
                  className="
                          font-['Cairo']
                          text-[16px]
                          font-bold
                          leading-[24px]
                          text-[#0F172A]
                        "
                >
                  صلاحيات حسب الدور
                </h3>

                <p
                  className="
                          mt-1
                          font-['Cairo']
                          text-[11px]
                          font-medium
                          leading-[20px]
                          text-[#52657D]
                        "
                >
                  يصل كل مستخدم إلى البيانات والإجراءات المرتبطة بدوره فقط.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              className="
                      flex
                      min-h-[177px]
                      w-full
                      flex-col
                      rounded-[16px]
                      border
                      border-[#E2EBF5]
                      bg-[#F8FAFD]
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-md
                    "
            >
              {/* Icon */}
              <div
                className="
                        flex
                        h-[32px]
                        w-[32px]
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-[#DDF4F5]
                        text-[#2DBCC3]
                      "
              >
                <FiHome size={17} strokeWidth={2} />
              </div>

              <div className="mt-4 text-right">
                <h3
                  className="
                          font-['Cairo']
                          text-[16px]
                          font-bold
                          leading-[24px]
                          text-[#0F172A]
                        "
                >
                  مراجعة المؤسسة
                </h3>

                <p
                  className="
                          mt-1
                          font-['Cairo']
                          text-[11px]
                          font-medium
                          leading-[20px]
                          text-[#52657D]
                        "
                >
                  تمر الإجراءات الأساسية عبر المؤسسة المسؤولة قبل اعتمادها
                  نهائيًا.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              className="
                      flex
                      min-h-[177px]
                      w-full
                      flex-col
                      rounded-[16px]
                      border
                      border-[#E2EBF5]
                      bg-[#F8FAFD]
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-md
                    "
            >
              {/* Icon */}
              <div
                className="
                        flex
                        h-[32px]
                        w-[32px]
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-[#F7F0E2]
                        text-[#E5A72D]
                      "
              >
                <FiClipboard size={17} strokeWidth={2} />
              </div>

              <div className="mt-4 text-right">
                <h3
                  className="
                          font-['Cairo']
                          text-[16px]
                          font-bold
                          leading-[24px]
                          text-[#0F172A]
                        "
                >
                  توثيق الإجراءات
                </h3>

                <p
                  className="
                          mt-1
                          font-['Cairo']
                          text-[11px]
                          font-medium
                          leading-[20px]
                          text-[#52657D]
                        "
                >
                  تربط المستندات والدفعات والتحديثات برحلة الكفالة كاملة.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div
              className="
                      flex
                      min-h-[177px]
                      w-full
                      flex-col
                      rounded-[16px]
                      border
                      border-[#E2EBF5]
                      bg-[#F8FAFD]
                      p-6
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-md
                    "
            >
              {/* Icon */}
              <div
                className="
                        flex
                        h-[32px]
                        w-[32px]
                        items-center
                        justify-center
                        rounded-[9px]
                        bg-[#EAF8F1]
                        text-[#16B77A]
                      "
              >
                <FiEye size={17} strokeWidth={2} />
              </div>

              <div className="mt-4 text-right">
                <h3
                  className="
                          font-['Cairo']
                          text-[16px]
                          font-bold
                          leading-[24px]
                          text-[#0F172A]
                        "
                >
                  متابعة واضحة
                </h3>

                <p
                  className="
                          mt-1
                          font-['Cairo']
                          text-[11px]
                          font-medium
                          leading-[20px]
                          text-[#52657D]
                        "
                >
                  يمكن لكل طرف متابعة الإجراءات المرتبطة به دون لبس أو غموض.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= Final CTA Section ================= */}
      <section
        id="final-cta"
        dir="rtl"
        className="w-full bg-[#F4F7FB] px-5 py-16 sm:px-8 lg:px-8"
      >
        <div
          className="
                        relative mx-auto flex w-full max-w-[1216px]
                        min-h-[364px]
                        items-center justify-center
                        overflow-hidden
                        rounded-[24px]
                        border border-white/10
                        bg-gradient-to-br from-[#062246] via-[#0D4B8E] to-[#072B53]
                        px-6 py-12
                        shadow-[0_14px_30px_rgba(6,34,70,0.18)]
                        sm:px-10
                        lg:px-12
                      "
        >
          {/* Decorative circles */}
          <div
            className="
                          pointer-events-none absolute
                          -bottom-28 -left-28
                          h-64 w-64
                          rounded-full
                          border border-[#2DBCC3]/10
                          opacity-70
                        "
          />

          <div
            className="
                          pointer-events-none absolute
                          -bottom-20 -left-20
                          h-44 w-44
                          rounded-full
                          border border-[#2DBCC3]/10
                        "
          />

          <div
            className="
                          pointer-events-none absolute
                          -right-24 -top-24
                          h-64 w-64
                          rounded-full
                          border border-[#2DBCC3]/10
                        "
          />

          <div
            className="
                          pointer-events-none absolute
                          -right-12 -top-12
                          h-40 w-40
                          rounded-full
                          border border-[#2DBCC3]/10
                        "
          />

          {/* Small decorative dots */}
          <span className="pointer-events-none absolute bottom-16 left-16 h-2 w-2 rounded-full bg-[#2DBCC3]/40" />
          <span className="pointer-events-none absolute right-20 top-20 h-2 w-2 rounded-full bg-[#2DBCC3]/50" />

          {/* Content */}
          <div
            className="
                          relative z-10
                          flex w-full max-w-[672px]
                          flex-col items-center
                          gap-5
                          text-center
                        "
          >
            {/* Badge */}
            <span
              className="
                            inline-flex w-fit items-center
                            rounded-[9999px]
                            border border-[#2DBCC3]/20
                            bg-[#2DBCC3]/10
                            px-3 py-[7.5px]
                            font-['Cairo']
                            text-[11px]
                            font-semibold
                            leading-[16px]
                            text-[#2DBCC3]
                          "
            >
              <span className="ml-1.5 h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />
              ابدأ رحلتك اليوم مع كفيلي
            </span>

            {/* Title */}
            <h2
              className="
                            font-['Cairo']
                            text-[28px]
                            font-black
                            leading-[40px]
                            tracking-[-0.3px]
                            text-white
                            sm:text-[32px]
                            lg:text-[36px]
                          "
            >
              رحلة كفالة أوضح تبدأ من هنا
            </h2>

            {/* Description */}
            <p
              className="
                            max-w-[672px]
                            font-['Cairo']
                            text-[14px]
                            font-medium
                            leading-[24px]
                            text-[#D6E4F0]
                            sm:text-[15px]
                            lg:text-[16px]
                          "
            >
              سواء كنت كفيلاً تريد متابعة كفالتك بوضوح، أو مؤسسة تريد تنظيم
              وإدارة كفالاتها، يجمع كفيلي الرحلة في منصة واحدة.
            </p>

            {/* Buttons */}
            <div
              className="
                            mt-1
                            flex w-full
                            flex-col items-center
                            justify-center
                            gap-3
                            sm:w-auto
                            sm:flex-row
                          "
            >
              {/* Primary */}
              <button
                type="button"
                className="
                              flex h-[54px]
                              w-full
                              items-center justify-center
                              gap-2
                              rounded-[12px]
                              bg-[#2DBCC3]
                              px-8
                              font-['Cairo']
                              text-[14px]
                              font-bold
                              leading-[24px]
                              text-[#062246]
                              transition-all duration-300
                              hover:-translate-y-0.5
                              hover:bg-[#3ACDD4]
                              hover:shadow-[0_8px_18px_rgba(45,188,195,0.25)]
                              sm:w-auto
                            "
              >
                ابدأ الآن
                <FiArrowLeft size={18} />
              </button>

              {/* Secondary */}
              <button
                type="button"
                className="
                              flex h-[54px]
                              w-full
                              items-center justify-center
                              rounded-[12px]
                              border border-white/20
                              bg-white/[0.10]
                              px-8
                              font-['Cairo']
                              text-[14px]
                              font-bold
                              leading-[24px]
                              text-white
                              transition-all duration-300
                              hover:-translate-y-0.5
                              hover:bg-white/[0.16]
                              hover:border-white/30
                              sm:w-auto
                            "
              >
                . كفيلي للمؤسسات
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
