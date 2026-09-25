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
      { text: "متابعة الطلبات", FiClipboard },
      { text: "تأكيد الاستلام", icon: FiCheckCircle },
      { text: "إرسال التحديثات", icon: IoSendOutline },
    ],
  },
];

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <div dir="rtl" className="min-h-screen bg-[#FAFBFD] flex flex-col font-[Cairo,sans-serif] overflow-x-hidden">
      <Header />
      <section id="how-it-works" dir="rtl" className="relative h-[100vh] w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img src={howItWorks} alt="كيف يعمل كفيلي" className="h-full w-full object-cover object-center" />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#041730]/20" />

          {/* Gradient Overlay: اليمين غامق والشمال فاتح */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(270deg, rgba(4, 23, 48, 0.95) 0%, rgba(4, 23, 48, 0.65) 45%, rgba(4, 23, 48, 0.15) 100%)",
            }}
          />

          {/* Exact Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(0deg, #062244 0%, rgba(6, 34, 68, 0) 50%, rgba(0, 0, 0, 0.2) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] items-center justify-end px-5 py-6 sm:px-8 lg:px-[64px]">
          <div className="ml-auto w-full max-w-[760px] origin-right translate-y-[40px] text-right transition-transform [@media(max-height:750px)]:scale-[0.92] [@media(max-height:680px)]:scale-[0.84] [@media(max-height:600px)]:scale-[0.76]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm">
              <LuShieldCheck size={18} strokeWidth={2} className="shrink-0 text-[#2DBCC3]" />
              <span className="font-['Cairo'] text-[12px] font-medium text-white sm:text-[13px]">نظام موثوق ومعتمد · رحلة كفالة منظمة</span>
            </div>

            {/* Main Title */}
            <h2 className="mt-6 text-right font-['Cairo'] text-[34px] font-extrabold leading-[46px] tracking-[-1.2px] text-white sm:text-[40px] sm:leading-[52px] lg:text-[48px] lg:leading-[62px]">
              كيف يعمل كفيلي؟
            </h2>

            {/* Gradient Title */}
            <h3 className="mt-1 bg-gradient-to-r from-[#2DBCC3] via-[#99F6E4] to-white bg-clip-text text-right font-['Cairo'] text-[30px] font-extrabold leading-[44px] tracking-[-1.2px] text-transparent sm:text-[36px] sm:leading-[52px] lg:text-[42px] lg:leading-[58px]">
              رحلة واحدة، أدوار واضحة،
              <br />
              متابعة مستمرة.
            </h3>

            {/* Description */}
            <p className="mt-5 max-w-[680px] font-['Cairo'] text-[14px] font-medium leading-[27px] text-white/75 sm:text-[16px] sm:leading-[30px] lg:text-[17px] lg:leading-[32px]">
              كفيلي تجمع المؤسسة والكفيل والوصي ضمن رحلة رقمية واحدة، بحيث تكون كل خطوة واضحة وموثقة وقابلة للمتابعة.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-wrap items-center justify-start gap-3">
              {/* ابدأ الآن */}
              <a
                href="#solution"
                className="box-border inline-flex h-[54px] min-w-[140px] shrink-0 items-center justify-center gap-2 rounded-[12px] bg-[#2DBCC3] px-6 py-[14px] font-['Cairo'] text-[13px] font-bold leading-[18px] text-white shadow-[0px_4px_6px_-4px_rgba(45,188,195,0.20)] transition-all duration-300 hover:bg-[#27AEB5]"
              >
                <span>ابدأ الآن</span>
                <FiArrowLeft size={17} strokeWidth={2} />
              </a>

              {/* اكتشف الأدوار */}
              <a
                href="#solution"
                className="box-border inline-flex h-[54px] min-w-[175px] shrink-0 items-center justify-center gap-2 rounded-[12px] border border-white/20 bg-white/10 px-6 py-[14px] font-['Cairo'] text-[12px] font-medium leading-[18px] text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15"
              >
                <FaPeopleGroup size={16} />
                <span>اكتشف الأدوار</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="roles" dir="rtl" className="w-full bg-[#F8FAFC] px-5 py-[60px] sm:px-8 sm:py-[70px] lg:px-8 lg:py-[78px]">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            <span className="inline-flex h-[24px] items-center justify-center rounded-[8px] bg-[#E7EEF7] px-[16px] py-[4px] font-['Cairo'] text-[10px] font-bold leading-[16px] text-[#19579A]">
              الأطراف المشاركة
            </span>

            <h2 className="mt-[7px] font-['Cairo'] text-[28px] font-black leading-[40px] text-[#0F172A] sm:text-[32px] lg:text-[36px] lg:leading-[40px]">
              ثلاثة أطراف، لكل طرف دور واضح
            </h2>

            <p className="mt-[7px] max-w-[768px] font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#64748B] sm:text-[13px] sm:leading-[22px]">
              تضمن المنصة تنظيم المسؤوليات بدقة، بحيث يعرف كل طرف دوره وما يحتاج إلى إنجازه ضمن رحلة الكفالة.
            </p>
          </div>

          {/* ================= CARDS GRID ================= */}
          <div className="mx-auto mt-[16px] grid w-full max-w-[1216px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* ================= المؤسسة ================= */}
            <div className="flex min-h-[362.5px] w-full flex-col justify-between rounded-[16px] border-2 border-[#19579A] bg-white p-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(25,87,154,0.10)]">
              <div>
                <div className="flex justify-center">
                  <div className="flex h-[64px] w-[64px] items-center justify-center rounded-[16px] bg-[#EEF6FF]">
                    <LuBuilding2 size={28} strokeWidth={2} className="text-[#19579A]" />
                  </div>
                </div>

                <div className="mt-[16px] flex justify-center">
                  <span className="inline-flex h-[24px] items-center justify-center rounded-[8px] bg-[#E7EEF7] px-[16px] py-[4px] font-['Cairo'] text-[10px] font-bold leading-[16px] text-[#19579A]">
                    الطرف الأول
                  </span>
                </div>

                <h3 className="mt-[12px] text-center font-['Cairo'] text-[24px] font-black leading-[34px] text-[#0F172A]">المؤسسة</h3>

                <p className="mt-[8px] text-center font-['Cairo'] text-[13px] font-medium leading-[22px] text-[#64748B]">
                  إدارة الحالات والكفالات، ومراجعة المستندات والدفعات والإجراءات.
                </p>
              </div>

              <div className="mt-6 border-t border-[#EEF2F7] pt-5">
                <div className="flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#19579A]" />
                  </span>
                  <span className="order-2 flex-1 text-right font-['Cairo'] text-[14px] font-medium leading-[22px] text-[#334155]">
                    إدارة شاملة لملفات وبيانات الأيتام
                  </span>
                </div>

                <div className="mt-3 flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#19579A]" />
                  </span>
                  <span className="order-2 flex-1 text-right font-['Cairo'] text-[14px] font-medium leading-[22px] text-[#334155]">
                    تدقيق واعتماد التحويلات والوثائق
                  </span>
                </div>
              </div>
            </div>

            {/* ================= الكفيل ================= */}
            <div className="flex min-h-[362.5px] w-full flex-col justify-between rounded-[16px] border-2 border-[#2DBCC3] bg-white p-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(45,188,195,0.10)]">
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

                <h3 className="mt-[12px] text-center font-['Cairo'] text-[24px] font-black leading-[34px] text-[#0F172A]">الكفيل</h3>

                <p className="mt-[8px] text-center font-['Cairo'] text-[13px] font-medium leading-[22px] text-[#64748B]">
                  بدء الكفالة، وتوثيق الدفع، ومتابعة الحالة والتحديثات.
                </p>
              </div>

              <div className="mt-6 border-t border-[#EEF2F7] pt-5">
                <div className="flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#2DBCC3]" />
                  </span>
                  <span className="order-2 flex-1 text-right font-['Cairo'] text-[14px] font-medium leading-[22px] text-[#334155]">
                    رفع فوري لإثباتات الدفع بخصوصية تامة
                  </span>
                </div>

                <div className="mt-3 flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#2DBCC3]" />
                  </span>
                  <span className="order-2 flex-1 text-right font-['Cairo'] text-[14px] font-medium leading-[22px] text-[#334155]">
                    متابعة التقارير الدورية وأثر الكفالة
                  </span>
                </div>
              </div>
            </div>

            {/* ================= الوصي ================= */}
            <div className="flex min-h-[362.5px] w-full flex-col justify-between rounded-[16px] border-2 border-[#E5A72D] bg-white p-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(229,167,45,0.10)]">
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

                <h3 className="mt-[12px] text-center font-['Cairo'] text-[24px] font-black leading-[34px] text-[#0F172A]">الوصي</h3>

                <p className="mt-[8px] text-center font-['Cairo'] text-[13px] font-medium leading-[22px] text-[#64748B]">
                  إدارة البيانات المطلوبة، ومتابعة الإجراءات، وتوثيق الاستلام والتحديثات.
                </p>
              </div>

              <div className="mt-6 border-t border-[#EEF2F7] pt-5">
                <div className="flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#F59E0B]" />
                  </span>
                  <span className="order-2 flex-1 text-right font-['Cairo'] text-[14px] font-medium leading-[22px] text-[#334155]">
                    توثيق رسمي للبيانات المستخدمة
                  </span>
                </div>

                <div className="mt-3 flex flex-row items-center gap-3">
                  <span className="order-1 shrink-0">
                    <GoCheckCircle size={19} strokeWidth={2} className="text-[#F59E0B]" />
                  </span>
                  <span className="order-2 flex-1 text-right font-['Cairo'] text-[14px] font-medium leading-[22px] text-[#334155]">
                    مشاركة المستجدات المتعلقة بحالة الكفالة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="journey" dir="rtl" className="w-full bg-white px-5 py-[80px] sm:px-8 lg:px-8 lg:py-[94px]">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* ================= HEADER ================= */}
          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            <span className="inline-flex items-center justify-center rounded-full bg-[#EAF7F8] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#2DBCC3]">
              التسلسل الإجرائي
            </span>

            <h2 className="mt-3 font-['Cairo'] text-[28px] font-black leading-[40px] text-[#07579F] sm:text-[32px] lg:text-[36px] lg:leading-[50px]">
              رحلة الكفالة خطوة بخطوة
            </h2>

            <p className="mt-1 font-['Cairo'] text-[12px] font-medium leading-[22px] text-[#64748B] sm:text-[13px]">
              مسار متكامل يبدأ من اعتماد الحالة ويستمر في رعاية وتحديثات دورية منظمة.
            </p>
          </div>

          {/* ================= TIMELINE ================= */}
          <div dir="ltr" className="relative mx-auto mt-[58px] w-full max-w-[896px]">
            {/* الخط العمودي */}
            <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[#CFE9E8] lg:block" />

            <div className="flex flex-col gap-[58px]">
              {/* ================= 01 ================= */}
              <div className="relative grid min-h-[118px] grid-cols-2">
                <div className="col-start-2 flex justify-start pl-[44px]">
                  <div dir="rtl" className="w-full max-w-[384px] rounded-[16px] border border-[#E2EBF5] bg-[#F8FAFC] px-7 py-5 text-right">
                    <span className="inline-flex rounded-[5px] bg-[#EAF2FA] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#07579F]">
                      المرحلة الأولى
                    </span>
                    <h3 className="mt-2 font-['Cairo'] text-[17px] font-bold leading-[27px] text-[#0F172A]">إدارة واعتماد الحالة</h3>
                    <p className="mt-1 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#64748B]">
                      يتم إدارة بيانات الحالة ومستنداتها ومراجعتها من المؤسسة.
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#07579F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-[17px] font-bold">01</span>
                </div>
              </div>

              {/* ================= 02 ================= */}
              <div className="relative grid min-h-[118px] grid-cols-2">
                <div className="col-start-1 flex justify-end pr-[44px]">
                  <div dir="rtl" className="w-full max-w-[384px] rounded-[16px] border border-[#E2EBF5] bg-[#F8FAFC] px-7 py-5 text-right">
                    <span className="inline-flex rounded-[5px] bg-[#EAF2FA] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#07579F]">
                      المرحلة الثانية
                    </span>
                    <h3 className="mt-2 font-['Cairo'] text-[17px] font-bold leading-[27px] text-[#0F172A]">بدء الكفالة</h3>
                    <p className="mt-1 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#64748B]">
                      يبدأ الكفيل إجراءات الكفالة من خلال حسابه.
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#07579F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-[17px] font-bold">02</span>
                </div>
              </div>

              {/* ================= 03 ================= */}
              <div className="relative grid min-h-[118px] grid-cols-2">
                <div className="col-start-2 flex justify-start pl-[44px]">
                  <div dir="rtl" className="w-full max-w-[384px] rounded-[16px] border border-[#E2EBF5] bg-[#F8FAFC] px-7 py-5 text-right">
                    <span className="inline-flex rounded-[5px] bg-[#E8F8F8] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#20B8C0]">
                      المرحلة الثالثة
                    </span>
                    <h3 className="mt-2 font-['Cairo'] text-[17px] font-bold leading-[27px] text-[#0F172A]">توثيق الدفع</h3>
                    <p className="mt-1 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#64748B]">
                      يرفع الكفيل إثبات الدفع ليصبح جزءًا من سجل الكفالة.
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#20B8C0] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-[17px] font-bold">03</span>
                </div>
              </div>

              {/* ================= 04 ================= */}
              <div className="relative grid min-h-[118px] grid-cols-2">
                <div className="col-start-1 flex justify-end pr-[44px]">
                  <div dir="rtl" className="w-full max-w-[384px] rounded-[16px] border border-[#E2EBF5] bg-[#F8FAFC] px-7 py-5 text-right">
                    <span className="inline-flex rounded-[5px] bg-[#EAF2FA] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#07579F]">
                      المرحلة الرابعة
                    </span>
                    <h3 className="mt-2 font-['Cairo'] text-[17px] font-bold leading-[27px] text-[#0F172A]">مراجعة المؤسسة</h3>
                    <p className="mt-1 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#64748B]">
                      تراجع المؤسسة العملية وإثباتات الكفالة المرتبطة بها.
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#07579F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-[17px] font-bold">04</span>
                </div>
              </div>

              {/* ================= 05 ================= */}
              <div className="relative grid min-h-[118px] grid-cols-2">
                <div className="col-start-2 flex justify-start pl-[44px]">
                  <div dir="rtl" className="w-full max-w-[384px] rounded-[16px] border border-[#E2EBF5] bg-[#F8FAFC] px-7 py-5 text-right">
                    <span className="inline-flex rounded-[5px] bg-[#E7F8F6] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#20A89F]">
                      المرحلة الخامسة
                    </span>
                    <h3 className="mt-2 font-['Cairo'] text-[17px] font-bold leading-[27px] text-[#0F172A]">توثيق التحويل</h3>
                    <p className="mt-1 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#64748B]">
                      توثق المؤسسة الإجراء المرتبط بتحويل الكفالة للوصي.
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#20A89F] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-[17px] font-bold">05</span>
                </div>
              </div>

              {/* ================= 06 ================= */}
              <div className="relative grid min-h-[118px] grid-cols-2">
                <div className="col-start-1 flex justify-end pr-[44px]">
                  <div dir="rtl" className="w-full max-w-[384px] rounded-[16px] border border-[#E2EBF5] bg-[#F8FAFC] px-7 py-5 text-right">
                    <span className="inline-flex rounded-[5px] bg-[#FFF4DD] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#F59E0B]">
                      المرحلة السادسة
                    </span>
                    <h3 className="mt-2 font-['Cairo'] text-[17px] font-bold leading-[27px] text-[#0F172A]">تأكيد الاستلام</h3>
                    <p className="mt-1 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#64748B]">
                      يوثق الوصي استلام الكفالة ضمن المنصة.
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#F59E0B] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-[17px] font-bold">06</span>
                </div>
              </div>

              {/* ================= 07 ================= */}
              <div className="relative grid min-h-[118px] grid-cols-2">
                <div className="col-start-2 flex justify-start pl-[44px]">
                  <div dir="rtl" className="w-full max-w-[384px] rounded-[16px] border border-[#E2EBF5] bg-[#F8FAFC] px-7 py-5 text-right">
                    <span className="inline-flex rounded-[5px] bg-[#FFF5D9] px-3 py-1 font-['Cairo'] text-[11px] font-semibold leading-[18px] text-[#D9A441]">
                      المرحلة السابعة
                    </span>
                    <h3 className="mt-2 font-['Cairo'] text-[17px] font-bold leading-[27px] text-[#0F172A]">المتابعة والتحديثات</h3>
                    <p className="mt-1 font-['Cairo'] text-[11px] font-medium leading-[21px] text-[#64748B]">
                      تستمر رحلة الكفالة من خلال التحديثات والإجراءات الدورية.
                    </p>
                  </div>
                </div>

                <div className="absolute left-1/2 top-1/2 z-10 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[15px] bg-[#D9A441] text-white shadow-[0_4px_8px_rgba(15,23,42,0.12)]">
                  <span className="font-['Cairo'] text-[17px] font-bold">07</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= ROLES ================= */}
      <section id="roles" dir="rtl" className="w-full bg-[#F8FAFC] px-5 py-[70px] sm:px-8 sm:py-[80px] lg:px-8 lg:py-[88px]">
        <div className="mx-auto w-full max-w-[1280px]">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
            <span className="rounded-full bg-[#E8F0F8] px-3 py-[5px] font-['Cairo'] text-[10px] font-semibold leading-[16px] text-[#0D4B8E]">
              التخصيص الوظيفي
            </span>

            <h2 className="mt-[7px] font-['Cairo'] text-[28px] font-black leading-[40px] text-[#0D4B8E] sm:text-[32px] lg:text-[36px] lg:leading-[50px]">
              تجربة مصممة لكل طرف
            </h2>

            <p className="mt-[2px] max-w-[768px] font-['Cairo'] text-[12px] font-medium leading-[22px] text-[#64748B] sm:text-[13px]">
              واجهات ولوحات تحكم مخصصة تمنح كل مستخدم الأدوات المناسبة لصلاحياته دون تشتيت.
            </p>
          </div>

          {/* Cards */}
          <div className="mt-[42px] grid grid-cols-1 gap-5 sm:mt-[48px] sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* المؤسسة */}
            <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-[28px] shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              <div className="flex items-center justify-start gap-4">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#EEF5FF]">
                  <LiaUserShieldSolid strokeWidth={1.8} size={24} style={{ color: "#0D4B8E" }} />
                </div>

                <div className="text-right">
                  <h3 className="font-['Cairo'] text-[20px] font-bold leading-[29px] text-[#0F172A]">للمؤسسة</h3>
                  <p className="mt-[1px] font-['Cairo'] text-[10px] font-medium leading-[18px] text-[#64748B]">لوحة الإشراف والإدارة</p>
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
                    <span className="ml-auto mr-[12px] flex-1 text-right font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#334155] sm:text-[13px]">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* الكفيل */}
            <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-[28px] shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              <div className="flex items-center justify-start gap-4">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#ECFBFB]">
                  <CiHeart size={24} strokeWidth={1.8} className="text-[#20B8C0]" />
                </div>

                <div className="text-right">
                  <h3 className="font-['Cairo'] text-[20px] font-bold leading-[29px] text-[#0F172A]">للكفيل</h3>
                  <p className="mt-[1px] font-['Cairo'] text-[10px] font-medium leading-[18px] text-[#64748B]">بوابة الكفيل الرقمية</p>
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
                    <span className="ml-auto mr-[12px] text-right font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#334155] sm:text-[13px]">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* الوصي */}
            <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white p-[28px] shadow-[0_2px_8px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.07)]">
              <div className="flex items-center justify-start gap-4">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-[#FFF8E8]">
                  <RiShieldUserLine size={23} strokeWidth={0.5} className="text-[#F59E0B]" />
                </div>

                <div className="text-right">
                  <h3 className="font-['Cairo'] text-[20px] font-bold leading-[29px] text-[#0F172A]">للوصي</h3>
                  <p className="mt-[1px] font-['Cairo'] text-[10px] font-medium leading-[18px] text-[#64748B]">لوحة الحاضن والمستفيد</p>
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
                    <span className="ml-auto mr-[12px] text-right font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#334155] sm:text-[13px]">
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
      <section
        id="why-this-model"
        dir="rtl"
        className="w-full bg-white px-5 py-[56px] sm:px-8 sm:py-[64px] lg:px-8 lg:pb-[80px] lg:pt-[78px]"
      >
        <div className="mx-auto w-full max-w-[1280px]">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-[768px] flex-col items-center gap-[7px] text-center">
            <span className="inline-flex h-[28px] items-center justify-center rounded-full bg-[#EAF2FC] px-[12px] font-['Cairo'] text-[11px] font-bold leading-[18px] text-[#19579A]">
              القيمة الجوهرية
            </span>

            <h2 className="font-['Cairo'] text-[28px] font-black leading-[40px] tracking-[-0.4px] text-[#0D4B8E] sm:text-[32px] lg:text-[36px] lg:leading-[48px]">
              لماذا هذه الرحلة؟
            </h2>

            <p className="font-['Cairo'] text-[13px] font-medium leading-[22px] text-[#64748B] sm:text-[14px]">
              لأن وضوح الكفالة يحتاج أكثر من مجرد تسجيل عملية.
            </p>
          </div>

          {/* Cards */}
          <div className="mx-auto mt-[40px] grid w-full max-w-[1216px] grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-[24px]">
            {/* Card 1 */}
            <div className="flex min-h-[196px] w-full min-w-0 flex-col rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-[24px] pb-[24px] pt-[24px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#EEF5FF]">
                <FiClipboard size={21} strokeWidth={2} className="text-[#0D4B8E]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-[16px] font-bold leading-[24px] text-[#0F172A]">مسؤوليات واضحة</h3>
                <p className="font-['Cairo'] text-[11px] font-medium leading-[20px] text-[#64748B]">كل طرف يعرف الإجراءات المطلوبة منه.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex min-h-[196px] w-full min-w-0 flex-col rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-[24px] pb-[24px] pt-[24px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#ECFBFB]">
                <FiTrendingUp size={21} strokeWidth={2} className="text-[#20B8C0]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-[16px] font-bold leading-[24px] text-[#0F172A]">حالة قابلة للمتابعة</h3>
                <p className="font-['Cairo'] text-[11px] font-medium leading-[20px] text-[#64748B]">
                  يمكن متابعة المرحلة الحالية للإجراءات المرتبطة بالكفالة.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flex min-h-[196px] w-full min-w-0 flex-col rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-[24px] pb-[24px] pt-[24px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#FFF8E8]">
                <FiFileText size={21} strokeWidth={2} className="text-[#F59E0B]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-[16px] font-bold leading-[24px] text-[#0F172A]">توثيق مركزي</h3>
                <p className="font-['Cairo'] text-[11px] font-medium leading-[20px] text-[#64748B]">
                  المستندات والدفعات والتحديثات مرتبطة بسجل الكفالة.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flex min-h-[196px] w-full min-w-0 flex-col rounded-[16px] border border-[#E2E8F0] bg-[#F8FAFC] px-[24px] pb-[24px] pt-[24px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center self-start rounded-[12px] bg-[#F0F0FF]">
                <LiaUserLockSolid size={21} strokeWidth={0.5} className="text-[#5B5BF7]" />
              </div>

              <div className="mt-[8px] flex flex-col gap-[8px] text-right">
                <h3 className="font-['Cairo'] text-[16px] font-bold leading-[24px] text-[#0F172A]">صلاحيات حسب الدور</h3>
                <p className="font-['Cairo'] text-[11px] font-medium leading-[20px] text-[#64748B]">
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
      <section id="faq" dir="rtl" className="w-full bg-[#F8FAFC] px-5 py-[64px] sm:px-8 sm:py-[72px] lg:px-8 lg:pb-[96px] lg:pt-[94px]">
        <div className="mx-auto flex w-full max-w-[896px] flex-col gap-[56px]">
          {/* Header */}
          <div className="mx-auto flex w-full max-w-[672px] flex-col items-center gap-[7px] text-center">
            <span className="inline-flex min-h-[28px] items-center justify-center rounded-full bg-[#E5EEF8] px-[14px] py-[3px] font-['Cairo'] text-[11px] font-bold leading-[22px] text-[#0D4B8E] sm:text-[12px]">
              مركز الإيضاح
            </span>

            <h2 className="text-center font-['Cairo'] text-[36px] font-black leading-[40px] tracking-[0px] text-[#0D4B8E]">أسئلة شائعة</h2>

            <p className="max-w-[672px] font-['Cairo'] text-[11px] font-medium leading-[20px] text-[#64748B] sm:text-[12px] sm:leading-[22px] lg:text-[13px]">
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
                    className="flex min-h-[56px] w-full items-center gap-4 px-[16px] py-[14px] text-right transition-colors duration-200 hover:bg-[#FAFCFE] sm:min-h-[58px] sm:px-[20px] lg:px-[24px]"
                  >
                    <span className="flex h-[20px] w-[20px] shrink-0 items-center justify-center text-[#0D4B8E]">
                      {isOpen ? <FiChevronUp size={16} strokeWidth={2} /> : <FiChevronDown size={16} strokeWidth={2} />}
                    </span>

                    <span className="flex-1 text-right font-['Cairo'] text-[12px] font-bold leading-[22px] text-[#0F172A] sm:text-[13px] lg:text-[14px]">
                      {faq.question}
                    </span>
                  </button>

                  {/* Answer */}
                  {isOpen && faq.answer && (
                    <div className="border-t border-[#EEF2F7] px-[16px] pb-[18px] pt-[12px] sm:px-[20px] sm:pb-[20px] lg:px-[24px] lg:pb-[24px]">
                      <div className="mb-[4px] text-right font-['Cairo'] text-[10px] font-bold leading-[18px] text-[#0D4B8E] sm:text-[11px]">
                        الجواب
                      </div>

                      <p className="text-right font-['Cairo'] text-[10px] font-medium leading-[20px] text-[#64748B] sm:text-[11px] sm:leading-[21px] lg:text-[12px] lg:leading-[22px]">
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
        className="mx-auto"
        style={{
          width: "100%",
          maxWidth: "1280px",
          height: "413px",
          boxSizing: "border-box",
          padding: "80px 128px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Cairo', sans-serif",
          background: "linear-gradient(110deg, #07365F 0%, #0D528F 52%, #176BB3 100%)",
        }}
      >
        {/* Figma Container */}
        <div
          style={{
            width: "1024px",
            maxWidth: "100%",
            height: "236px",
            boxSizing: "border-box",
            paddingLeft: "32px",
            paddingRight: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "24px",
          }}
        >
          {/* Content */}
          <div
            style={{
              width: "100%",
              height: "146px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              textAlign: "center",
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
                minHeight: "30px",
                padding: "4px 14px",
                borderRadius: "9999px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                backgroundColor: "rgba(255, 255, 255, 0.10)",
                color: "#2FC4CA",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "14px",
                fontWeight: "700",
                lineHeight: "20px",
                whiteSpace: "nowrap",
                boxSizing: "border-box",
              }}
            >
              انضم لمنظومة كفيلي
            </div>

            {/* Title */}
            <h2
              style={{
                margin: "20px 0 0 0",
                color: "#FFFFFF",
                fontSize: "36px",
                fontWeight: "900",
                lineHeight: "40px",
                letterSpacing: "-0.9px",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              ابدأ رحلتك مع كفيلي
            </h2>

            {/* Description */}
            <p
              style={{
                margin: "20px 0 0 0",
                color: "rgba(255,255,255,0.82)",
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "28px",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              اختر دورك وابدأ باستخدام المنصة ضمن رحلة كفالة أكثر وضوحاً وتنظيماً.
            </p>
          </div>

          {/* Buttons */}
          <div
            style={{
              width: "100%",
              height: "66px",
              paddingTop: "12px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <button
              type="button"
              className="btn"
              style={{
                width: "138px",
                height: "54px",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                borderRadius: "10px",
                border: "1px solid #31C0C9",
                backgroundColor: "#31C0C9",
                color: "#07549A",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "24px",
              }}
            >
              <span>ابدأ الآن</span>
              <FiArrowLeft size={19} strokeWidth={2} />
            </button>

            <button
              type="button"
              className="btn"
              style={{
                width: "134px",
                height: "54px",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.22)",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#FFFFFF",
                fontFamily: "'Cairo', sans-serif",
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "24px",
              }}
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
