import { useState } from "react";

import { Link } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";

import { IoSendOutline } from "react-icons/io5";

import { LiaClipboardCheckSolid, LiaUserLockSolid, LiaCreditCardSolid } from "react-icons/lia";

import { TbBellRinging, TbUserSquare } from "react-icons/tb";

import { RiShieldUserLine } from "react-icons/ri";

import { LuUsers, LuShieldCheck } from "react-icons/lu";

import { CiHeart } from "react-icons/ci";

import { MdOutlineLockPerson } from "react-icons/md";

import { LiaClipboardListSolid } from "react-icons/lia";

import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

import {
  FiArrowLeft,
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiHeart,
  FiTrendingUp,
  FiFileText,
  FiLock,
  FiEye,
  FiList,
  FiShield,
  FiUpload,
  FiSliders,
  FiBell,
  FiUsers,
  FiClipboard,
  FiCheckCircle,
  FiSend,
  FiFolder,
  FiFolderPlus,
  FiUserCheck,
  FiCreditCard,
  FiRefreshCw,
} from "react-icons/fi";

import { PiShieldCheck, PiFileArrowUp, PiFolderUser } from "react-icons/pi";

import { GoCheckCircle } from "react-icons/go";

import { BsClipboardCheck } from "react-icons/bs";

import { FaUserPlus, FaUserCheck } from "react-icons/fa";

import { LuBuilding2 } from "react-icons/lu";

import { FaHandHoldingHeart, FaPeopleGroup, FaListCheck } from "react-icons/fa6";

import { BiSolidBellRing } from "react-icons/bi";

import howItWorks from "../assets/howitworks.png";

import Header from "./header";

import Footer from "./Footer";

import { LiaUserShieldSolid } from "react-icons/lia";

const roles = [
  {
    title: "المؤسسة",

    subtitle: "لوحة الإشراف والإدارة",

    color: "#0D4B8E",

    iconBg: "#EEF5FF",

    icon: LiaUserShieldSolid,

    features: [
      { text: "إدارة الحالات", icon: PiFolderUser },

      { text: "مراجعة المستندات", icon: HiOutlineClipboardDocumentList },

      { text: "إدارة الكفالات", icon: TbUserSquare },

      { text: "متابعة الدفعات", icon: LiaCreditCardSolid },

      { text: "إدارة التحديثات", icon: FiRefreshCw },
    ],
  },

  {
    title: "الكفيل",

    subtitle: "بوابة الكفيل الرقمية",

    color: "#20B8C0",

    iconBg: "#ECFBFB",

    icon: FiEye,

    features: [
      { text: "متابعة الكفالة", icon: FiEye },

      { text: "رفع إثبات الدفع", icon: PiFileArrowUp },

      { text: "متابعة حالة الإجراءات", icon: FaListCheck },

      { text: "استلام التحديثات", icon: TbBellRinging },
    ],
  },

  {
    title: "الوصي",

    subtitle: "لوحة الحاضن والمستفيد",

    color: "#F59E0B",

    iconBg: "#FFF8E8",

    icon: FaUserPlus,

    features: [
      { text: "إدارة الحالات المرتبطة به", icon: LuUsers },

      { text: "رفع المستندات", icon: FiFolderPlus },

      { text: "متابعة الطلبات", icon: FiClipboard },

      { text: "تأكيد الاستلام", icon: FiCheckCircle },

      { text: "إرسال التحديثات", icon: IoSendOutline },
    ],
  },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#FAFBFD] font-[Cairo,sans-serif] text-right antialiased">
      <Header />

      <section id="how-it-works" dir="rtl" className="relative h-[100vh] w-full overflow-x-hidden overflow-y-auto">
        {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0">
          <img src={howItWorks} alt="كيف يعمل كفيلي" className="h-full w-full object-cover object-center" />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#041730]/30" />

          {/* Right Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(270deg, rgba(4,23,48,0.98) 0%, rgba(4,23,48,0.88) 35%, rgba(4,23,48,0.50) 68%, rgba(4,23,48,0.18) 100%)",
            }}
          />

          {/* Bottom Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, #062244 0%, rgba(6,34,68,0.22) 38%, rgba(0,0,0,0.12) 100%)",
            }}
          />
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className="
      relative
      z-10
      mx-auto
      flex
      h-full
      w-full
      max-w-[1440px]
      items-center
      justify-center

      px-4
      py-5

      sm:px-6
      sm:py-6

      md:px-8
      md:py-7

      lg:justify-start
      lg:px-16
      lg:py-8

      xl:px-20
      2xl:px-24
      lg:translate-y-[30px]

      [@media(max-height:700px)]:py-4
      [@media(max-height:600px)]:py-3
    "
        >
          {/* ================= TEXT CONTENT ================= */}
          <div
            className="
        w-full
        max-w-[760px]
        origin-center
        text-center

        sm:max-w-[720px]

        md:max-w-[760px]

        lg:ml-auto
        lg:mr-0
        lg:max-w-[760px]
        lg:origin-right
        lg:text-right

        xl:max-w-[800px]
        2xl:max-w-[820px]

        [@media(max-height:760px)]:scale-[0.95]
        [@media(max-height:680px)]:scale-[0.88]
        [@media(max-height:600px)]:scale-[0.80]
        [@media(max-height:530px)]:scale-[0.72]
      "
          >
            {/* ================= BADGE ================= */}
            <div className="flex justify-center lg:justify-start">
              <div
                className="
            inline-flex
            max-w-full
            items-center
            gap-2
            rounded-full
            border
            border-white/20
            bg-white/10
            px-3
            py-1.5
            backdrop-blur-md

            sm:px-4
            sm:py-2

            md:px-5
            md:py-2.5
          "
              >
                <LuShieldCheck size={20} strokeWidth={2} className="shrink-0 text-[#2DBCC3]" />

                <span
                  className="
              font-['Cairo']
              text-[11px]
              font-semibold
              leading-5
              text-white

              sm:text-[12px]

              md:text-[14px]

              lg:text-[15px]
            "
                >
                  نظام موثوق ومعتمد · رحلة كفالة منظمة
                </span>
              </div>
            </div>

            {/* ================= MAIN TITLE ================= */}
            <h2
              className="
          mt-4
          font-['Cairo']
          text-[30px]
          font-extrabold
          leading-[1.25]
          tracking-[-0.8px]
          text-white

          sm:mt-5
          sm:text-[38px]

          md:text-[46px]

          lg:mt-5
          lg:text-[52px]

          xl:text-[58px]

          2xl:text-[62px]

          [@media(max-height:680px)]:mt-3
        "
            >
              كيف يعمل كفيلي؟
            </h2>

            {/* ================= GRADIENT TITLE ================= */}
            <h3
              className="
          mt-1

          bg-gradient-to-r
          from-[#2DBCC3]
          via-[#99F6E4]
          to-white
          bg-clip-text

          font-['Cairo']
          text-[24px]
          font-extrabold
          leading-[1.4]
          tracking-[-0.8px]
          text-transparent

          sm:text-[30px]

          md:text-[37px]

          lg:text-[43px]

          xl:text-[48px]

          2xl:text-[52px]
        "
            >
              رحلة واحدة، أدوار واضحة،
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              متابعة مستمرة.
            </h3>

            {/* ================= DESCRIPTION ================= */}
            <p
              className="
          mx-auto
          mt-4
          max-w-[700px]

          font-['Cairo']
          text-[13px]
          font-medium
          leading-[1.9]
          text-white/85

          sm:mt-5
          sm:text-[14px]
          sm:leading-7

          md:text-[16px]
          md:leading-8

          lg:mx-0
          lg:text-[17px]

          xl:text-[18px]

          2xl:text-[19px]

          [@media(max-height:680px)]:mt-3
        "
            >
              كفيلي تجمع المؤسسة والكفيل والوصي ضمن رحلة رقمية واحدة، بحيث تكون كل خطوة واضحة وموثقة وقابلة للمتابعة.
            </p>

            {/* ================= BUTTONS ================= */}
            <div
              className="
          mt-5
          flex
          w-full
          flex-col
          gap-2.5

          sm:mt-6
          sm:flex-row
          sm:flex-wrap
          sm:items-center
          sm:justify-center
          sm:gap-3

          lg:mt-7
          lg:w-auto
          lg:justify-start

          [@media(max-height:680px)]:mt-4
        "
            >
              {/* ================= PRIMARY BUTTON ================= */}
              <a
                href="#solution"
                className="
            inline-flex
            h-[48px]
            w-full
            items-center
            justify-center
            gap-2

            rounded-[12px]

            bg-[#2DBCC3]

            px-5

            font-['Cairo']
            text-[13px]
            font-bold
            text-white

            shadow-[0_8px_24px_rgba(45,188,195,0.22)]

            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:bg-[#27AEB5]

            sm:h-[50px]
            sm:w-auto
            sm:min-w-[145px]
            sm:px-6
            sm:text-[14px]

            md:h-[54px]
            md:min-w-[150px]
            md:text-[15px]

            lg:h-[56px]
            lg:min-w-[155px]

            xl:text-[16px]

            [@media(max-height:650px)]:h-[48px]
          "
              >
                <span>ابدأ الآن</span>

                <FiArrowLeft size={18} strokeWidth={2.2} />
              </a>

              {/* ================= SECONDARY BUTTON ================= */}
              <a
                href="#solution"
                className="
            inline-flex
            h-[48px]
            w-full
            items-center
            justify-center
            gap-2

            rounded-[12px]

            border
            border-white/25

            bg-white/10

            px-5

            font-['Cairo']
            text-[13px]
            font-semibold
            text-white

            backdrop-blur-md

            transition-all
            duration-300

            hover:-translate-y-0.5
            hover:bg-white/15

            sm:h-[50px]
            sm:w-auto
            sm:min-w-[175px]
            sm:px-6
            sm:text-[14px]

            md:h-[54px]
            md:min-w-[180px]
            md:text-[15px]

            lg:h-[56px]
            lg:min-w-[185px]

            xl:text-[16px]

            [@media(max-height:650px)]:h-[48px]
          "
              >
                <FaPeopleGroup size={18} className="shrink-0" />

                <span>اكتشف الأدوار</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="roles" dir="rtl" className="w-full bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* ================= HEADER ================= */}

          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            <span className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-[#E7EEF7] px-4 py-1.5 font-['Cairo'] text-xs font-bold leading-5 text-[#19579A] sm:text-sm">
              الأطراف المشاركة
            </span>

            <h2 className="mt-3 font-['Cairo'] text-3xl font-black leading-[1.35] text-[#0F172A] sm:text-4xl lg:text-5xl">
              ثلاثة أطراف، لكل طرف دور واضح
            </h2>

            <p className="mt-4 max-w-[768px] font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base sm:leading-8 lg:text-lg">
              تضمن المنصة تنظيم المسؤوليات بدقة، بحيث يعرف كل طرف دوره وما يحتاج إلى إنجازه ضمن رحلة الكفالة.
            </p>
          </div>

          {/* ================= CARDS GRID ================= */}

          <div className="mx-auto mt-10 grid w-full max-w-[1216px] grid-cols-1 gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
            {/* ================= المؤسسة ================= */}

            <div className="flex w-full flex-col justify-between rounded-2xl border-2 border-[#19579A] bg-white p-5 sm:min-h-[360px] sm:p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(25,87,154,0.10)]">
              <div>
                <div className="flex justify-center">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[16px] bg-[#EEF6FF]">
                    <LuBuilding2 size={28} strokeWidth={2} className="text-[#19579A]" />
                  </div>
                </div>

                <div className="mt-[16px] flex justify-center">
                  <span className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-[#E7EEF7] px-4 py-1.5 font-['Cairo'] text-xs font-bold leading-5 text-[#19579A] sm:text-sm">
                    الطرف الأول
                  </span>
                </div>

                <h3 className="mt-[12px] text-center font-['Cairo'] text-2xl font-black leading-9 sm:text-[26px] text-[#0F172A]">
                  المؤسسة
                </h3>

                <p className="mt-[8px] text-center font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base">
                  إدارة الحالات والكفالات، ومراجعة المستندات والدفعات والإجراءات.
                </p>
              </div>

              <div className="mt-6 border-t border-[#EEF2F7] pt-5">
                <div className="flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#19579A]" />
                  </span>

                  <span className="order-2 flex-1 text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base sm:leading-7">
                    إدارة شاملة لملفات وبيانات الأيتام
                  </span>
                </div>

                <div className="mt-3 flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#19579A]" />
                  </span>

                  <span className="order-2 flex-1 text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base sm:leading-7">
                    تدقيق واعتماد التحويلات والوثائق
                  </span>
                </div>
              </div>
            </div>

            {/* ================= الكفيل ================= */}

            <div className="flex w-full flex-col justify-between rounded-2xl border-2 border-[#2DBCC3] bg-white p-5 sm:min-h-[360px] sm:p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(45,188,195,0.10)]">
              <div>
                <div className="flex justify-center">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[16px] bg-[#EFFFFF]">
                    <FaHandHoldingHeart size={27} className="text-[#2DBCC3]" />
                  </div>
                </div>

                <div className="mt-[16px] flex justify-center">
                  <span className="inline-flex h-[24px] items-center justify-center rounded-[8px] bg-[#CCFBF1] px-[16px] py-[4px] font-['Cairo'] text-[10px] font-bold leading-[16px] text-[#1597A0]">
                    الطرف الثاني
                  </span>
                </div>

                <h3 className="mt-[12px] text-center font-['Cairo'] text-2xl font-black leading-9 sm:text-[26px] text-[#0F172A]">الكفيل</h3>

                <p className="mt-[8px] text-center font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base">
                  بدء الكفالة، وتوثيق الدفع، ومتابعة الحالة والتحديثات.
                </p>
              </div>

              <div className="mt-6 border-t border-[#EEF2F7] pt-5">
                <div className="flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#2DBCC3]" />
                  </span>

                  <span className="order-2 flex-1 text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base sm:leading-7">
                    رفع فوري لإثباتات الدفع بخصوصية تامة
                  </span>
                </div>

                <div className="mt-3 flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#2DBCC3]" />
                  </span>

                  <span className="order-2 flex-1 text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base sm:leading-7">
                    متابعة التقارير الدورية وأثر الكفالة
                  </span>
                </div>
              </div>
            </div>

            {/* ================= الوصي ================= */}

            <div className="flex w-full flex-col justify-between rounded-2xl border-2 border-[#E5A72D] bg-white p-5 sm:min-h-[360px] sm:p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(229,167,45,0.10)]">
              <div>
                <div className="flex justify-center">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[16px] bg-[#FFF8E8]">
                    <FaPeopleGroup size={27} className="text-[#E5A72D]" />
                  </div>
                </div>

                <div className="mt-[16px] flex justify-center">
                  <span className="inline-flex h-[24px] items-center justify-center rounded-[8px] bg-[#FEF0C7] px-[16px] py-[4px] font-['Cairo'] text-[10px] font-bold leading-[16px] text-[#C96A16]">
                    الطرف الثالث
                  </span>
                </div>

                <h3 className="mt-[12px] text-center font-['Cairo'] text-2xl font-black leading-9 sm:text-[26px] text-[#0F172A]">الوصي</h3>

                <p className="mt-[8px] text-center font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base">
                  إدارة البيانات المطلوبة، ومتابعة الإجراءات، وتوثيق الاستلام والتحديثات.
                </p>
              </div>

              <div className="mt-6 border-t border-[#EEF2F7] pt-5">
                <div className="flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#F59E0B]" />
                  </span>

                  <span className="order-2 flex-1 text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base sm:leading-7">
                    توثيق رسمي للبيانات المستخدمة
                  </span>
                </div>

                <div className="mt-3 flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#F59E0B]" />
                  </span>

                  <span className="order-2 flex-1 text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base sm:leading-7">
                    مشاركة المستجدات المتعلقة بحالة الكفالة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="journey" dir="rtl" className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* ================= HEADER ================= */}

          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-[#EAF7F8] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#2DBCC3]">
              التسلسل الإجرائي
            </span>

            <h2 className="mt-3 font-['Cairo'] text-3xl font-black leading-[1.35] text-[#07579F] sm:text-4xl lg:text-5xl">
              رحلة الكفالة خطوة بخطوة
            </h2>

            <p className="mt-3 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base sm:leading-8 lg:text-lg">
              مسار متكامل يبدأ من اعتماد الحالة ويستمر في رعاية وتحديثات دورية منظمة.
            </p>
          </div>

          {/* ================= TIMELINE ================= */}

          <div dir="ltr" className="relative mx-auto mt-12 w-full max-w-[960px] sm:mt-14 lg:mt-16">
            {/* الخط العمودي */}

            <div className="absolute bottom-0 left-6 top-0 w-px bg-[#CFE9E8] sm:left-7 lg:left-1/2 lg:-translate-x-1/2" />

            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[58px]">
              {/* ================= 01 ================= */}

              <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 lg:min-h-[118px] lg:grid-cols-2 lg:gap-0">
                <div className="col-start-2 flex min-w-0 justify-start pl-0 lg:col-start-2 lg:pl-[44px]">
                  <div
                    dir="rtl"
                    className="w-full max-w-none rounded-2xl border border-[#E2EBF5] bg-[#F8FAFC] px-4 py-5 text-right sm:px-6 lg:max-w-[384px] lg:px-7"
                  >
                    <span className="inline-flex rounded-[5px] bg-[#EAF2FA] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#07579F]">
                      المرحلة الأولى
                    </span>

                    <h3 className="mt-2 font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl sm:leading-8">
                      إدارة واعتماد الحالة
                    </h3>

                    <p className="mt-1 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-[15px]">
                      يتم إدارة بيانات الحالة ومستنداتها ومراجعتها من المؤسسة.
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:left-7 sm:h-14 sm:w-14 lg:left-1/2 lg:h-[60px] lg:w-[60px] lg:rounded-[15px] bg-[#07579F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-base font-bold sm:text-[17px]">01</span>
                </div>
              </div>

              {/* ================= 02 ================= */}

              <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 lg:min-h-[118px] lg:grid-cols-2 lg:gap-0">
                <div className="col-start-2 flex min-w-0 justify-start pr-0 lg:col-start-1 lg:justify-end lg:pr-[44px]">
                  <div
                    dir="rtl"
                    className="w-full max-w-none rounded-2xl border border-[#E2EBF5] bg-[#F8FAFC] px-4 py-5 text-right sm:px-6 lg:max-w-[384px] lg:px-7"
                  >
                    <span className="inline-flex rounded-[5px] bg-[#EAF2FA] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#07579F]">
                      المرحلة الثانية
                    </span>

                    <h3 className="mt-2 font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl sm:leading-8">بدء الكفالة</h3>

                    <p className="mt-1 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-[15px]">
                      يبدأ الكفيل إجراءات الكفالة من خلال حسابه.
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:left-7 sm:h-14 sm:w-14 lg:left-1/2 lg:h-[60px] lg:w-[60px] lg:rounded-[15px] bg-[#07579F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-base font-bold sm:text-[17px]">02</span>
                </div>
              </div>

              {/* ================= 03 ================= */}

              <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 lg:min-h-[118px] lg:grid-cols-2 lg:gap-0">
                <div className="col-start-2 flex min-w-0 justify-start pl-0 lg:col-start-2 lg:pl-[44px]">
                  <div
                    dir="rtl"
                    className="w-full max-w-none rounded-2xl border border-[#E2EBF5] bg-[#F8FAFC] px-4 py-5 text-right sm:px-6 lg:max-w-[384px] lg:px-7"
                  >
                    <span className="inline-flex rounded-[5px] bg-[#E8F8F8] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#20B8C0]">
                      المرحلة الثالثة
                    </span>

                    <h3 className="mt-2 font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl sm:leading-8">توثيق الدفع</h3>

                    <p className="mt-1 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-[15px]">
                      يرفع الكفيل إثبات الدفع ليصبح جزءًا من سجل الكفالة.
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:left-7 sm:h-14 sm:w-14 lg:left-1/2 lg:h-[60px] lg:w-[60px] lg:rounded-[15px] bg-[#20B8C0] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-base font-bold sm:text-[17px]">03</span>
                </div>
              </div>

              {/* ================= 04 ================= */}

              <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 lg:min-h-[118px] lg:grid-cols-2 lg:gap-0">
                <div className="col-start-2 flex min-w-0 justify-start pr-0 lg:col-start-1 lg:justify-end lg:pr-[44px]">
                  <div
                    dir="rtl"
                    className="w-full max-w-none rounded-2xl border border-[#E2EBF5] bg-[#F8FAFC] px-4 py-5 text-right sm:px-6 lg:max-w-[384px] lg:px-7"
                  >
                    <span className="inline-flex rounded-[5px] bg-[#EAF2FA] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#07579F]">
                      المرحلة الرابعة
                    </span>

                    <h3 className="mt-2 font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl sm:leading-8">
                      مراجعة المؤسسة
                    </h3>

                    <p className="mt-1 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-[15px]">
                      تراجع المؤسسة العملية وإثباتات الكفالة المرتبطة بها.
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:left-7 sm:h-14 sm:w-14 lg:left-1/2 lg:h-[60px] lg:w-[60px] lg:rounded-[15px] bg-[#07579F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-base font-bold sm:text-[17px]">04</span>
                </div>
              </div>

              {/* ================= 05 ================= */}

              <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 lg:min-h-[118px] lg:grid-cols-2 lg:gap-0">
                <div className="col-start-2 flex min-w-0 justify-start pl-0 lg:col-start-2 lg:pl-[44px]">
                  <div
                    dir="rtl"
                    className="w-full max-w-none rounded-2xl border border-[#E2EBF5] bg-[#F8FAFC] px-4 py-5 text-right sm:px-6 lg:max-w-[384px] lg:px-7"
                  >
                    <span className="inline-flex rounded-[5px] bg-[#E7F8F6] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#20A89F]">
                      المرحلة الخامسة
                    </span>

                    <h3 className="mt-2 font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl sm:leading-8">
                      توثيق التحويل
                    </h3>

                    <p className="mt-1 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-[15px]">
                      توثق المؤسسة الإجراء المرتبط بتحويل الكفالة للوصي.
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:left-7 sm:h-14 sm:w-14 lg:left-1/2 lg:h-[60px] lg:w-[60px] lg:rounded-[15px] bg-[#20A89F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-base font-bold sm:text-[17px]">05</span>
                </div>
              </div>

              {/* ================= 06 ================= */}

              <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 lg:min-h-[118px] lg:grid-cols-2 lg:gap-0">
                <div className="col-start-2 flex min-w-0 justify-start pr-0 lg:col-start-1 lg:justify-end lg:pr-[44px]">
                  <div
                    dir="rtl"
                    className="w-full max-w-none rounded-2xl border border-[#E2EBF5] bg-[#F8FAFC] px-4 py-5 text-right sm:px-6 lg:max-w-[384px] lg:px-7"
                  >
                    <span className="inline-flex rounded-[5px] bg-[#FFF4DD] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#F59E0B]">
                      المرحلة السادسة
                    </span>

                    <h3 className="mt-2 font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl sm:leading-8">
                      تأكيد الاستلام
                    </h3>

                    <p className="mt-1 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-[15px]">
                      يوثق الوصي استلام الكفالة ضمن المنصة.
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:left-7 sm:h-14 sm:w-14 lg:left-1/2 lg:h-[60px] lg:w-[60px] lg:rounded-[15px] bg-[#F59E0B] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-base font-bold sm:text-[17px]">06</span>
                </div>
              </div>

              {/* ================= 07 ================= */}

              <div className="relative grid grid-cols-[48px_minmax(0,1fr)] gap-4 sm:grid-cols-[56px_minmax(0,1fr)] sm:gap-5 lg:min-h-[118px] lg:grid-cols-2 lg:gap-0">
                <div className="col-start-2 flex min-w-0 justify-start pl-0 lg:col-start-2 lg:pl-[44px]">
                  <div
                    dir="rtl"
                    className="w-full max-w-none rounded-2xl border border-[#E2EBF5] bg-[#F8FAFC] px-4 py-5 text-right sm:px-6 lg:max-w-[384px] lg:px-7"
                  >
                    <span className="inline-flex rounded-[5px] bg-[#FFF5D9] px-3 py-1 font-['Cairo'] text-xs font-semibold leading-5 sm:text-[13px] text-[#D9A441]">
                      المرحلة السابعة
                    </span>

                    <h3 className="mt-2 font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl sm:leading-8">
                      المتابعة والتحديثات
                    </h3>

                    <p className="mt-1 font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-[15px]">
                      تستمر رحلة الكفالة من خلال التحديثات والإجراءات الدورية.
                    </p>
                  </div>
                </div>

                <div className="absolute left-6 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl sm:left-7 sm:h-14 sm:w-14 lg:left-1/2 lg:h-[60px] lg:w-[60px] lg:rounded-[15px] bg-[#D9A441] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-base font-bold sm:text-[17px]">07</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ROLES ================= */}

      <section id="role-experience" dir="rtl" className="w-full bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* Header */}

          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            <span className="rounded-full bg-[#E8F0F8] px-3 py-[5px] font-['Cairo'] text-[10px] font-semibold leading-[16px] text-[#0D4B8E]">
              التخصيص الوظيفي
            </span>

            <h2 className="mt-3 font-['Cairo'] text-3xl font-black leading-[1.35] text-[#0D4B8E] sm:text-4xl lg:text-5xl">
              تجربة مصممة لكل طرف
            </h2>

            <p className="mt-3 max-w-[768px] font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base sm:leading-8 lg:text-lg">
              واجهات ولوحات تحكم مخصصة تمنح كل مستخدم الأدوات المناسبة لصلاحياته دون تشتيت.
            </p>
          </div>

          {/* Cards */}

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
            {/* المؤسسة */}

            <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-5 sm:p-7 lg:p-8 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              <div className="flex items-center justify-start gap-4">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF5FF]">
                  <LiaUserShieldSolid strokeWidth={1.8} size={24} style={{ color: "#0D4B8E" }} />
                </div>

                <div className="text-right">
                  <h3 className="font-['Cairo'] text-xl font-bold leading-8 text-[#0F172A] sm:text-2xl">للمؤسسة</h3>

                  <p className="mt-[1px] font-['Cairo'] text-xs font-medium leading-5 text-[#64748B] sm:text-sm">لوحة الإشراف والإدارة</p>
                </div>
              </div>

              <div className="mt-[20px] h-px w-full bg-[#EEF2F7]" />

              <div className="mt-[18px] flex flex-col gap-[10px]">
                {[
                  ["إدارة الحالات", PiFolderUser],

                  ["مراجعة المستندات", HiOutlineClipboardDocumentList],

                  ["إدارة الكفالات", TbUserSquare],

                  ["متابعة الدفعات", LiaCreditCardSolid],

                  ["إدارة التحديثات", FiRefreshCw],
                ].map(([text, Icon], index) => (
                  <div key={index} className="flex min-h-[46px] w-full items-center rounded-[14px] bg-[#F8FAFC] px-[8px] py-[9px]">
                    <Icon size={18} strokeWidth={1.8} className="mr-[2px] shrink-0 text-[#0D4B8E]" />

                    <span className="ml-auto mr-[12px] flex-1 text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* الكفيل */}

            <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-5 sm:p-7 lg:p-8 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              <div className="flex items-center justify-start gap-4">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#ECFBFB]">
                  <CiHeart size={24} strokeWidth={1.8} className="text-[#20B8C0]" />
                </div>

                <div className="text-right">
                  <h3 className="font-['Cairo'] text-xl font-bold leading-8 text-[#0F172A] sm:text-2xl">للكفيل</h3>

                  <p className="mt-[1px] font-['Cairo'] text-xs font-medium leading-5 text-[#64748B] sm:text-sm">بوابة الكفيل الرقمية</p>
                </div>
              </div>

              <div className="mt-[20px] h-px w-full bg-[#EEF2F7]" />

              <div className="mt-[18px] flex flex-col gap-[10px]">
                {[
                  ["متابعة الكفالة", FiEye],

                  ["رفع إثبات الدفع", PiFileArrowUp],

                  ["متابعة حالة الإجراءات", FaListCheck],

                  ["استلام التحديثات", TbBellRinging],
                ].map(([text, Icon], index) => (
                  <div key={index} className="flex min-h-[46px] w-full items-center rounded-[8px] bg-[#F8FAFC] px-[14px] py-[9px]">
                    <Icon size={18} strokeWidth={1.8} className="shrink-0 text-[#20B8C0]" />

                    <span className="ml-auto mr-[12px] text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* الوصي */}

            <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-5 sm:p-7 lg:p-8 shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              <div className="flex items-center justify-start gap-4">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#FFF8E8]">
                  <RiShieldUserLine size={23} strokeWidth={0.5} className="text-[#F59E0B]" />
                </div>

                <div className="text-right">
                  <h3 className="font-['Cairo'] text-xl font-bold leading-8 text-[#0F172A] sm:text-2xl">للوصي</h3>

                  <p className="mt-[1px] font-['Cairo'] text-xs font-medium leading-5 text-[#64748B] sm:text-sm">لوحة الحاضن والمستفيد</p>
                </div>
              </div>

              <div className="mt-[20px] h-px w-full bg-[#EEF2F7]" />

              <div className="mt-[18px] flex flex-col gap-[10px]">
                {[
                  ["إدارة الحالات المرتبطة به", LuUsers],

                  ["رفع المستندات", FiFolderPlus],

                  ["متابعة الطلبات", FiClipboard],

                  ["تأكيد الاستلام", FiCheckCircle],

                  ["إرسال التحديثات", IoSendOutline],
                ].map(([text, Icon], index) => (
                  <div key={index} className="flex min-h-[46px] w-full items-center rounded-[8px] bg-[#F8FAFC] px-[14px] py-[9px]">
                    <Icon size={18} strokeWidth={1.8} className="shrink-0 text-[#F59E0B]" />

                    <span className="ml-auto mr-[12px] text-right font-['Cairo'] text-sm font-medium leading-6 text-[#334155] sm:text-base">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY THIS MODEL ================= */}

      <section id="why-this-model" dir="rtl" className="w-full bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* Header */}

          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center gap-[7px] text-center">
            <span className="inline-flex h-[28px] items-center justify-center rounded-full bg-[#EAF2FC] px-[12px] font-['Cairo'] text-[11px] font-bold leading-[18px] text-[#19579A]">
              القيمة الجوهرية
            </span>

            <h2 className="font-['Cairo'] text-3xl font-black leading-[1.35] tracking-[-0.4px] text-[#0D4B8E] sm:text-4xl lg:text-5xl">
              لماذا هذه الرحلة؟
            </h2>

            <p className="font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base sm:leading-8 lg:text-lg">
              لأن وضوح الكفالة يحتاج أكثر من مجرد تسجيل عملية.
            </p>
          </div>

          {/* Cards */}

          <div className="mx-auto mt-10 grid w-full max-w-[1216px] grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-6">
            {/* Card 1 */}

            <div className="flex w-full min-w-0 flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#EEF5FF]">
                <FiClipboard size={21} strokeWidth={2} className="text-[#0D4B8E]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl">مسؤوليات واضحة</h3>

                <p className="font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base">
                  كل طرف يعرف الإجراءات المطلوبة منه.
                </p>
              </div>
            </div>

            {/* Card 2 */}

            <div className="flex w-full min-w-0 flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#ECFBFB]">
                <FiTrendingUp size={21} strokeWidth={2} className="text-[#20B8C0]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl">حالة قابلة للمتابعة</h3>

                <p className="font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base">
                  يمكن متابعة المرحلة الحالية للإجراءات المرتبطة بالكفالة.
                </p>
              </div>
            </div>

            {/* Card 3 */}

            <div className="flex w-full min-w-0 flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#FFF8E8]">
                <FiFileText size={21} strokeWidth={2} className="text-[#F59E0B]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl">توثيق مركزي</h3>

                <p className="font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base">
                  المستندات والدفعات والتحديثات مرتبطة بسجل الكفالة.
                </p>
              </div>
            </div>

            {/* Card 4 */}

            <div className="flex w-full min-w-0 flex-col rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#F0F0FF]">
                <LiaUserLockSolid size={21} strokeWidth={0.5} className="text-[#5B5BF7]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-lg font-bold leading-7 text-[#0F172A] sm:text-xl">صلاحيات حسب الدور</h3>

                <p className="font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base">
                  كل مستخدم يتعامل مع البيانات والوظائف المرتبطة بدوره.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}

      {/* ================= FAQ ================= */}

      {/* ================= FAQ ================= */}

      <section id="faq" dir="rtl" className="w-full bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto flex w-full max-w-[896px] flex-col gap-10 sm:gap-12 lg:gap-14">
          {/* Header */}

          <div className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-[7px] text-center">
            <span className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-[#E5EEF8] px-[14px] py-[3px] font-['Cairo'] text-[11px] font-bold leading-[22px] text-[#0D4B8E] sm:text-[12px]">
              مركز الإيضاح
            </span>

            <h2 className="text-center font-['Cairo'] text-3xl font-black leading-[1.35] text-[#0D4B8E] sm:text-4xl lg:text-5xl">
              أسئلة شائعة
            </h2>

            <p className="max-w-[672px] font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base sm:leading-8 lg:text-lg">
              إجابات واضحة ومباشرة حول دور منصة كفيلي وآلية عملها التقنية.
            </p>
          </div>

          {/* FAQ List */}

          <div className="mx-auto flex w-full max-w-[832px] flex-col gap-[16px]">
            {[
              {
                question: "هل كفيلي مؤسسة خيرية؟",

                answer:
                  "لا، كفيلي ليست مؤسسة خيرية ولا تستقبل التبرعات بشكل مباشر، بل هي منصة رقمية تساعد على تنظيم وإدارة رحلة الكفالة بين المؤسسة والكفيل والوصي، وتوفر الشفافية والمتابعة لجميع الأطراف.",
              },

              {
                question: "هل تستقبل كفيلي أموال الكفالات مباشرة؟",

                answer:
                  "لا، كفيلي لا تستلم أموال الكفالات مباشرة. تتم عمليات الدفع من خلال القنوات المعتمدة لدى المؤسسات والجهات المسؤولة، بينما توفر المنصة نظام متابعة وتوثيق يضمن وضوح المعلومات للكفيل.",
              },

              {
                question: "ما دور المؤسسة؟",

                answer:
                  "الجهة المسؤولة عن إدارة نظام الكفالات والإشراف على عمليات التحقق، حيث تقوم بمراجعة واعتماد بيانات الأوصياء والوثائق، متابعة الكفالات والمدفوعات، وضمان وصول الدعم للمستفيدين بشفافية وموثوقية.",
              },

              {
                question: "ما الذي يستطيع الكفيل متابعته؟",

                answer:
                  "يستطيع الكفيل متابعة معلومات الكفالة والتحديثات المتعلقة بالحالة المكفولة، ومعرفة مستجدات المتابعة والتقارير التي توفرها المؤسسة، ضمن حدود الخصوصية وحماية البيانات.",
              },

              {
                question: "ما دور الوصي؟",

                answer:
                  "الوصي هو المسؤول عن تقديم المعلومات والوثائق المطلوبة المتعلقة بالأسرة والحالة المكفولة، والتعاون مع المؤسسة في تحديث البيانات اللازمة لضمان دقة المعلومات واستمرار المتابعة.",
              },

              {
                question: "كيف تتم حماية البيانات؟",

                answer:
                  "تلتزم كفيلي بحماية بيانات المستخدمين من خلال إجراءات أمنية وتقنية مناسبة، مع تنظيم صلاحيات الوصول للمعلومات بحيث يطلع كل طرف فقط على البيانات المسموح له بها، حفاظاً على الخصوصية.",
              },
            ].map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={index}
                  className={`w-full overflow-hidden rounded-[16px] border border-[#E2E8F0] bg-white transition-all duration-300 ${isOpen ? "shadow-[0_4px_14px_rgba(15,23,42,0.04)]" : ""}`}
                >
                  {/* Question */}

                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex min-h-[64px] w-full items-center gap-3 px-4 py-4 text-right transition-colors duration-200 hover:bg-[#FAFCFE] sm:min-h-[68px] sm:gap-4 sm:px-5 lg:px-6"
                  >
                    <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center text-[#0D4B8E]">
                      {isOpen ? <FiChevronUp size={16} strokeWidth={2} /> : <FiChevronDown size={16} strokeWidth={2} />}
                    </span>

                    <span className="flex-1 text-right font-['Cairo'] text-sm font-bold leading-7 text-[#0F172A] sm:text-base lg:text-lg">
                      {faq.question}
                    </span>
                  </button>

                  {/* Answer */}

                  {isOpen && faq.answer && (
                    <div className="border-t border-[#EEF2F7] px-[16px] pb-[18px] pt-[12px] sm:px-[20px] sm:pb-[20px] lg:px-[24px] lg:pb-[24px]">
                      <div className="mb-1 text-right font-['Cairo'] text-xs font-bold leading-5 text-[#0D4B8E] sm:text-sm">الجواب</div>

                      <p className="text-right font-['Cairo'] text-sm font-medium leading-7 text-[#64748B] sm:text-base sm:leading-8">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section
        dir="rtl"
        className="mb-7 w-full bg-gradient-to-l from-[#176BB3] via-[#0D528F] to-[#07365F] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <div className="inline-flex min-h-[30px] items-center justify-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-['Cairo'] text-xs font-bold leading-5 text-[#3BD4DC] backdrop-blur-sm sm:text-sm">
            انضم لمنظومة كفيلي
          </div>

          <h2 className="mt-5 font-['Cairo'] text-3xl font-black leading-[1.35] tracking-tight text-white sm:text-4xl lg:text-5xl">
            ابدأ رحلتك مع كفيلي
          </h2>

          <p className="mt-4 max-w-2xl font-['Cairo'] text-sm font-medium leading-7 text-white/85 sm:text-base sm:leading-8 lg:text-lg">
            اختر دورك وابدأ باستخدام المنصة ضمن رحلة كفالة أكثر وضوحاً وتنظيماً.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              className="inline-flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl border border-[#31C0C9] bg-[#31C0C9] px-7 py-3.5 font-['Cairo'] text-base font-bold text-[#07549A] shadow-lg shadow-[#31C0C9]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#38CDD5] active:scale-[0.98] sm:w-auto sm:min-w-[150px]"
            >
              <span>ابدأ الآن</span>
              <FiArrowLeft size={19} strokeWidth={2} />
            </button>

            <button
              type="button"
              className="inline-flex min-h-[54px] w-full items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-3.5 font-['Cairo'] text-base font-semibold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 active:scale-[0.98] sm:w-auto sm:min-w-[150px]"
            >
              تواصل معنا
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
