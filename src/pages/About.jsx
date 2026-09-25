import {
  FiChevronLeft,
  FiInfo,
  FiHeart,
  FiLinkedin,
  FiLock,
  FiUsers,
  FiCheckCircle,
  FiBarChart2,
  FiZap,
  FiHome,
  FiFileText,
  FiShield,
  FiMousePointer,
  FiUserCheck,
  FiCheck,
  FiEye,
  FiFlag,
  FiEdit3,
  FiCode,
  FiArrowLeft,
  FiMail,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { useState } from "react";
import kafeeliOrphans from "../assets/kaf.png";
import { LuMonitor, LuLightbulb, LuPalette, LuCode } from "react-icons/lu";
import { IoEye } from "react-icons/io5";
import { FaCheckCircle, FaFlag, FaEye, FaHandPointer, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { BsShieldFill } from "react-icons/bs";
import { BsLightbulbFill } from "react-icons/bs";
import { MdFamilyRestroom, MdVerifiedUser } from "react-icons/md";
import { RiShieldCheckLine, RiHandHeartFill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { BiSolidShield } from "react-icons/bi";

import {
  PiPalette,
  PiLightbulb,
  PiCode,
  PiUsersThree,
  PiBuildings,
  PiHandHeartFill,
  PiUsersThreeFill,
  PiLockKeyOpen,
  PiCheckCircle,
} from "react-icons/pi";
import Header from "./header";
import Footer from "./Footer";

import about from "../assets/about.png";
import backendImg from "../assets/backendimg.png";
import frontendImg from "../assets/frontimg.png";
const team = [
  {
    name: "تالة رأفت أبو شيحة",
    role: "Frontend Engineer · Idea Originator",
    roleColor: "#C96A16",
    iconColor: "#E5A72D",
    icon: LuLightbulb,
    image: frontendImg,
    whatsapp: "#",
    linkedin:
      "https://www.linkedin.com/in/talaabusheha2832005?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "أمير سمير صقر",
    role: "Frontend Developer & UX/UI Designer",
    roleColor: "#20B8C0",
    iconColor: "#2DBCC3",
    icon: LuPalette,
    image: backendImg,
    whatsapp: "#",
    linkedin: "https://www.linkedin.com/in/ameer-saqer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "محمود ماجد العجرمي",
    role: "Backend Developer & System Analyst",
    roleColor: "#07579F",
    iconColor: "#07579F",
    icon: LuCode,
    image: backendImg,
    whatsapp: "#",
    linkedin: "https://www.linkedin.com/in/mahmoud-ajrami?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    name: "شيماء أحمد الرياطي",
    role: "Frontend Engineer",
    roleColor: "#C96A16",
    iconColor: "#E5A72D",
    icon: FiCode,
    image: frontendImg,
    whatsapp: "#",
    linkedin: "https://www.linkedin.com/in/shima-al-riyati-8b0573253?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
];
export default function About() {
  const [openFaq, setOpenFaq] = useState(null);
  return (
    <div dir="rtl" className="min-h-screen overflow-x-hidden bg-[#FAFBFD] font-['Cairo']">
      <Header />

      <main>
        {/* =========================
            Section 1 - About Hero
        ========================== */}
        <section id="about" dir="rtl" className="relative h-[100vh] w-full overflow-hidden">
          {/* ================= BACKGROUND ================= */}
          <div className="absolute inset-0">
            <img src={about} alt="كفيلي" className="h-full w-full object-cover object-center" />

            <div className="absolute inset-0 bg-[rgba(4,23,48,0.20)]" />

            {/* اليمين غامق والشمال فاتح */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(270deg, rgba(4,23,48,0.95) 0%, rgba(4,23,48,0.65) 45%, rgba(4,23,48,0.15) 100%)",
              }}
            />
          </div>

          {/* ================= CONTENT ================= */}
          <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] items-start justify-end px-5 pt-7 sm:px-8 sm:pt-8 lg:px-[64px] lg:pt-8">
            <div className="ml-auto w-full max-w-[700px] translate-y-[60px] text-right">
              {/* ================= BADGE ================= */}
              <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-[#5B7D9F] bg-[#183B60]/70 px-3.5 py-1.5 font-['Cairo'] text-[11px] font-medium leading-[17px] text-white backdrop-blur-sm sm:text-[12px]">
                <span className="h-2 w-2 shrink-0 rounded-full bg-[#19C6D2]" />
                <span>عن كفيلي</span>
              </div>

              {/* ================= TITLE ================= */}
              <h1 className="w-full font-['Cairo'] text-[28px] font-black leading-[1.25] tracking-[-0.6px] text-white sm:text-[34px] lg:text-[40px] lg:leading-[1.3] lg:tracking-[-1px]">
                بدأنا من مشكلة حقيقية :
                <br />
                <span className="text-[#2DBCC3]">رحلة كفالة تحتاج إلى وضوح</span>
                <br />
                <span className="bg-gradient-to-r from-[#2DBCC3] to-[#D9ECFA] bg-clip-text text-transparent">أكبر</span>
              </h1>

              {/* ================= DESCRIPTION ================= */}
              <p className="mt-3.5 w-full max-w-[650px] font-['Cairo'] text-[13px] font-medium leading-[23px] text-white/90 sm:text-[14px] sm:leading-[25px] lg:text-[15px] lg:leading-[26px]">
                كفيلي مشروع تقني يهدف إلى تنظيم وإدارة كفالات الأيتام، من خلال ربط المؤسسة والكفيل والوصي ضمن رحلة رقمية واحدة واضحة وموثقة
                وقابلة للمتابعة.
              </p>

              {/* ================= BUTTONS ================= */}
              <div className="mt-4 flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-start">
                <button className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[11px] bg-[#2DBCC3] px-6 font-['Cairo'] text-[13px] font-bold text-[#041730] shadow-[0_8px_20px_rgba(45,188,195,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#35CDD4]">
                  تعرف على طريقة عملنا
                  <FiChevronLeft size={18} strokeWidth={2.5} />
                </button>

                <button className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[11px] border border-white/25 bg-white/10 px-6 font-['Cairo'] text-[13px] font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/20">
                  <FiInfo size={16} className="text-[#19C6D2]" />
                  رسالتنا وأهدافنا
                </button>
              </div>

              {/* ================= TRUST POINTS ================= */}
              <div className="mt-5 w-full border-t border-white/20 pt-4">
                <div className="flex w-full flex-col items-start justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-3">
                  {/* Point 1 */}
                  <div className="flex items-center gap-1.5 whitespace-nowrap font-['Cairo'] text-[10px] font-bold text-white sm:text-[11px]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#10B9814D] text-[#34D399]">
                      <PiCheckCircle size={18} />
                    </span>
                    <span>100% شفافية وتنسيق بين كافة الأطراف</span>
                  </div>

                  {/* Point 2 */}
                  <div className="flex items-center gap-1.5 whitespace-nowrap font-['Cairo'] text-[10px] font-bold text-white sm:text-[11px]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#07546B] text-[#2DBCC3]">
                      <PiCheckCircle size={18} />
                    </span>
                    <span>أثر رقمي مستدام</span>
                  </div>

                  {/* Point 3 */}
                  <div className="flex items-center gap-1.5 whitespace-nowrap font-['Cairo'] text-[10px] font-bold text-white sm:text-[11px]">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#4B3D13] text-[#D9A441]">
                      <PiCheckCircle size={18} />
                    </span>
                    <span>منظومة موثوقة لحماية حقوق الأيتام</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ================= WHY KAFEELI SECTION ================= */}
        {/* ================= FAQ ================= */}
        {/* ================= WHY KAFEELI ================= */}
        <section id="why-kafeeli" dir="rtl" className="w-full bg-white px-5 py-[48px] sm:px-8 sm:py-[60px] lg:px-8 lg:py-[70px]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[48px]">
            {/* Header */}
            <div className="mx-auto flex w-full max-w-[768px] flex-col items-center text-center">
              <span className="inline-flex h-[24px] w-fit items-center justify-center rounded-full bg-[#FFF7E6] px-[10px] font-['Cairo'] text-[10px] font-medium leading-[16px] text-[#D99A27]">
                قصة المنصة
              </span>

              <h2 className="mt-[8px] font-['Cairo'] text-[28px] font-extrabold leading-[36px] tracking-0 text-[#0F172A] sm:text-[32px] sm:leading-[38px] lg:text-[36px] lg:leading-[40px]">
                لماذا بدأنا كفيلي؟
              </h2>

              <p className="mt-[12px] max-w-[700px] font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#64748B] sm:text-[13px] sm:leading-[22px] lg:text-[14px] lg:leading-[24px]">
                إدارة الكفالة لا تنتهي عند تسجيل الحالة أو دفع الكفالة، هناك مسؤولية تجاه الحالة، ومسؤولية عن الإجراءات المتعلقة بالحالة.
                وعندما تكون هذه الرحلة موزعة بين ملفات ومحادثات وإجراءات مختلفة، تصبح المتابعة والتوثيق أكثر صعوبة.
              </p>
            </div>

            {/* Cards */}
            <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {/* المؤسسة */}
              <div className="flex min-h-[284px] w-full flex-col items-center rounded-[16px] border-2 border-[#CFE0F5] bg-gradient-to-b from-[rgba(239,246,255,0.7)] to-[rgba(239,246,255,0.2)] p-7 text-center">
                <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#0D4B8E] text-white shadow-[0_6px_14px_rgba(13,75,142,0.20)]">
                  <FiHome size={25} strokeWidth={2} />
                </div>

                <h3 className="font-['Cairo'] text-[20px] font-bold leading-[28px] text-[#0F172A]">المؤسسة</h3>

                <p className="mt-1 font-['Cairo'] text-[14px] font-semibold leading-[20px] text-[#0D4B8E] sm:whitespace-nowrap">
                  نظام دقيق ومراجعة مركزية للبيانات والدفعات
                </p>

                <p className="mt-2 font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B]">
                  تدير المؤسسة العملية بالكامل، تراجع المستندات الرسمية، وتضمن الشفافية في كل خطوة ومرحلة.
                </p>
              </div>

              {/* الكفيل */}
              <div className="flex min-h-[284px] w-full flex-col items-center rounded-[16px] border-2 border-[#BFECEF] bg-gradient-to-b from-[rgba(240,253,250,0.7)] to-[rgba(240,253,250,0.2)] p-7 text-center">
                <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#2DBCC3] text-white shadow-[0_6px_14px_rgba(45,188,195,0.20)]">
                  <FiUserCheck size={25} strokeWidth={2} />
                </div>

                <h3 className="font-['Cairo'] text-[20px] font-bold leading-[28px] text-[#0F172A]">الكفيل</h3>

                <p className="mt-1 font-['Cairo'] text-[14px] font-semibold leading-[20px] text-[#1EA4AB] sm:whitespace-nowrap">
                  رؤية واضحة لأثر العطاء ومتابعة مباشرة للحالة
                </p>

                <p className="mt-2 font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B]">
                  يبدأ الكفيل بسهولة، ويوثق الكفالة الشهرية، ويستقبل التحديثات الدورية الموثقة والتقارير التي تهمه.
                </p>
              </div>

              {/* الوصي */}
              <div className="flex min-h-[284px] w-full flex-col items-center rounded-[16px] border-2 border-[#F6D98E] bg-gradient-to-b from-[rgba(255,251,235,0.7)] to-[rgba(255,251,235,0.2)] p-7 text-center">
                <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-[#E5A72D] text-white shadow-[0_6px_14px_rgba(229,167,45,0.20)]">
                  <FiUsers size={25} strokeWidth={2} />
                </div>

                <h3 className="font-['Cairo'] text-[20px] font-bold leading-[28px] text-[#0F172A]">الوصي</h3>

                <p className="mt-1 font-['Cairo'] text-[14px] font-semibold leading-[20px] text-[#A6400E] sm:whitespace-nowrap">
                  جمع المستندات وتأكيد الاستلام والتحديثات الدورية
                </p>

                <p className="mt-2 font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B]">
                  مسؤول عن رعاية اليتيم، يرفع الأوراق الرسمية المعتمدة، ويوثق استلام المبالغ ويشارك التحديثات باطمئنان وكرامة.
                </p>
              </div>
            </div>

            {/* Conclusion Banner */}
            <div className="flex min-h-[98px] w-full flex-col items-stretch justify-between gap-5 rounded-[16px] bg-gradient-to-r from-[#0D4B8E] to-[#0F5A9F] px-5 py-5 shadow-[0_8px_20px_rgba(8,47,91,0.18)] sm:flex-row sm:items-center sm:px-6 sm:py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] border border-[#2DBCC3]/20 bg-[#2DBCC3]/20 text-[#2DBCC3]">
                  <BsLightbulbFill size={21} />
                </div>

                <div className="text-right">
                  <h3 className="font-['Cairo'] text-[13px] font-bold leading-[20px] text-[#2DBCC3] sm:text-[14px] sm:leading-[22px]">
                    من هنا جاءت كفيلي:
                  </h3>
                  <p className="mt-0.5 max-w-[650px] font-['Cairo'] text-[9px] font-medium leading-[17px] text-[#D6E4F0] sm:text-[10px] sm:leading-[18px]">
                    منصة رقمية تساعد على تنظيم رحلة الكفالة وتوثيقها من طرف واحد وعلى أعلى درجات الموثوقية.
                  </p>
                </div>
              </div>

              <button className="inline-flex h-[42px] shrink-0 items-center justify-center rounded-[10px] bg-white px-5 font-['Cairo'] text-[11px] font-bold text-[#0D4B8E] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F8FAFD] sm:h-[40px] sm:px-6">
                اكتشف كيف نعمل
              </button>
            </div>
          </div>
        </section>

        {/* ================= VISION & MISSION ================= */}
        <section
          id="vision"
          dir="rtl"
          className="w-full overflow-hidden bg-gradient-to-b from-[#0F172A] via-[#0D3B73] to-[#051E3A] px-5 py-20 sm:px-8 lg:px-8"
        >
          <div className="mx-auto w-full max-w-[1280px]">
            {/* Header */}
            <div className="mx-auto flex w-full max-w-[672px] flex-col items-center text-center">
              <span className="inline-flex items-center justify-center rounded-full border border-[#2DBCC3]/30 bg-[#2DBCC3]/10 px-3 py-1 font-['Cairo'] text-[10px] font-semibold leading-[16px] text-[#2DBCC3]">
                الرؤية والتوجه
              </span>

              <h2 className="mt-3 font-['Cairo'] text-[28px] font-black leading-[40px] tracking-[-0.3px] text-white sm:text-[32px] lg:text-[36px]">
                رسالتنا ورؤيتنا لمستقبل الكفالة
              </h2>

              <p className="mt-2 font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#B9C9DA] sm:text-[13px]">
                نعمل بشغف على نقل العمل الخيري إلى آفاق التنظيم والشفافية الرقمية العالمية.
              </p>
            </div>

            {/* Cards */}
            <div className="mt-12 grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Card 1 */}
              <div className="flex min-h-[335px] w-full flex-col rounded-[24px] border border-white/10 bg-white/[0.10] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.13] sm:p-10">
                <div className="flex w-full items-start justify-between">
                  <span className="inline-flex items-center rounded-[6px] border border-[#2DBCC3]/40 bg-[#2DBCC3]/10 px-2.5 py-1 font-['Cairo'] text-[10px] font-semibold leading-[16px] text-[#2DBCC3]">
                    رسالتنا
                  </span>

                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#2DBCC3] text-white shadow-[0_6px_15px_rgba(45,188,195,0.20)]">
                    <FaFlag size={19} strokeWidth={2.2} />
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <h3 className="font-['Cairo'] text-[18px] font-bold leading-[28px] text-white sm:text-[20px]">
                    تمكين المنظومة الخيرية رقمياً
                  </h3>

                  <p className="mt-3 font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#C8D4E1] sm:text-[13px] sm:leading-[22px]">
                    تطوير بيئة رقمية تساعد المؤسسات على إدارة الكفالات بشكل أكثر تنظيمًا، وتمنح الكفيل والوصي تجربة واضحة للمتابعة والتوثيق.
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-white/10" />
                  <div className="mt-4 flex items-center justify-start gap-2 font-['Cairo'] text-[10px] font-semibold leading-[16px] text-[#2DBCC3]">
                    <FaCheckCircle size={13} strokeWidth={2} />
                    <span>تنظيم مؤسسي • تجربة كفيل ووصي واضحة</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex min-h-[335px] w-full flex-col rounded-[24px] border border-white/10 bg-white/[0.10] p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.13] sm:p-10">
                <div className="flex w-full items-start justify-between">
                  <span className="inline-flex items-center rounded-[6px] border border-[#D9A441]/40 bg-[#D9A441]/10 px-2.5 py-1 font-['Cairo'] text-[10px] font-semibold leading-[16px] text-[#D9A441]">
                    رؤيتنا
                  </span>

                  <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[8px] bg-[#D9A441] text-white shadow-[0_6px_15px_rgba(217,164,65,0.20)]">
                    <FaEye size={19} strokeWidth={2.2} />
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <h3 className="font-['Cairo'] text-[18px] font-bold leading-[28px] text-white sm:text-[20px]">
                    بناء الثقة عبر الشفافية التقنية
                  </h3>

                  <p className="mt-3 font-['Cairo'] text-[12px] font-medium leading-[20px] text-[#C8D4E1] sm:text-[13px] sm:leading-[22px]">
                    أن تصبح إدارة الكفالات أكثر تنظيمًا ووضوحًا، وأن تساعد التقنية في بناء رحلة يمكن للأطراف المعنية متابعتها والثقة
                    بإجراءاتها.
                  </p>
                </div>

                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-white/10" />
                  <div className="mt-4 flex items-center justify-start gap-2 font-['Cairo'] text-[10px] font-semibold leading-[16px] text-[#D9A441]">
                    <RiShieldCheckLine size={13} strokeWidth={2} />
                    <span>وضوح الإجراءات • تعزيز الموثوقية والأثر</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PILLARS ================= */}
        <section id="pillars" dir="rtl" className="w-full bg-[#F4F7FB] px-5 py-[56px] sm:px-8 sm:py-[64px] lg:px-8 lg:py-[80px]">
          <div className="mx-auto w-full max-w-[1280px]">
            {/* Header */}
            <div className="mx-auto flex w-full max-w-[768px] flex-col items-center gap-3 text-center">
              <span className="inline-flex h-[26px] w-fit items-center justify-center rounded-[9999px] border border-[#0D4B8E]/10 bg-[#0D4B8E]/10 px-[14px] py-[4px] font-['Cairo'] text-[11px] font-semibold leading-[16px] text-[#19579A]">
                ركائز العمل
              </span>

              <h2 className="font-['Cairo'] text-[30px] font-extrabold leading-[40px] tracking-0 text-[#0F172A] sm:text-[32px] lg:text-[36px]">
                ما الذي نبني عليه كفيلي؟
              </h2>

              <p className="max-w-[768px] font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B] sm:text-[15px]">
                مبادئ محورية توجه قراراتنا الهندسية والتصميمية لتقديم أعلى درجات الموثوقية والسهولة.
              </p>
            </div>

            {/* Cards */}
            <div className="mt-10 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[18px]">
              {/* Card 1 - الوضوح */}
              <div
                dir="ltr"
                className="flex min-h-[244px] w-full flex-col rounded-[16px] border border-[#E2EBF5] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
              >
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center self-end rounded-[12px] bg-[#EEF6FF] text-[#19579A]">
                  <IoEye size={21} strokeWidth={2} />
                </div>

                <div className="mt-5 text-right">
                  <h3 className="font-['Cairo'] text-[20px] font-bold leading-[28px] text-[#0F172A]">الوضوح</h3>
                  <p className="mt-3 max-w-[240px] font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B]">
                    نجعل حالة الإجراءات ومراحلها واضحة للطرف المعني.
                  </p>
                </div>

                <div className="mt-auto flex min-h-[29px] w-full justify-end gap-[6px] border-t border-[#E2EBF5] pt-3">
                  <span className="font-['Cairo'] text-[12px] font-semibold leading-[16px] text-[#1E64B7]">متابعة حية في كل خطوة</span>
                  <span className="text-[13px] text-[#1E64B7]">•</span>
                </div>
              </div>

              {/* Card 2 - التوثيق */}
              <div
                dir="ltr"
                className="flex min-h-[244px] w-full flex-col rounded-[16px] border border-[#E2EBF5] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
              >
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center self-end rounded-[12px] bg-[#EAF9F7] text-[#1EA4AB]">
                  <AiFillFileText size={21} strokeWidth={2} />
                </div>

                <div className="mt-5 text-right">
                  <h3 className="font-['Cairo'] text-[20px] font-bold leading-[28px] text-[#0F172A]">التوثيق</h3>
                  <p className="mt-3 max-w-[240px] font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B]">
                    نربط المستندات والدفعات والتحديثات برحلة الكفالة.
                  </p>
                </div>

                <div className="mt-auto flex min-h-[29px] w-full items-center justify-end gap-[6px] border-t border-[#E2EBF5] pt-3">
                  <span className="font-['Cairo'] text-[12px] font-semibold leading-[16px] text-[#1EA4AB]">أرشيف رقمي موثق</span>
                  <span className="text-[13px] text-[#1EA4AB]">•</span>
                </div>
              </div>

              {/* Card 3 - الخصوصية */}
              <div
                dir="ltr"
                className="flex min-h-[244px] w-full flex-col rounded-[16px] border border-[#E2EBF5] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
              >
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center self-end rounded-[12px] bg-[#FFF8E8] text-[#B45309]">
                  <BiSolidShield size={18} strokeWidth={3} />
                </div>

                <div className="mt-5 text-right">
                  <h3 className="font-['Cairo'] text-[20px] font-bold leading-[28px] text-[#0F172A]">الخصوصية</h3>
                  <p className="mt-3 max-w-[240px] font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B]">
                    نتعامل مع البيانات الحساسة وفق الأدوار والصلاحيات.
                  </p>
                </div>

                <div className="mt-auto flex min-h-[29px] w-full items-center justify-end gap-[6px] border-t border-[#E2EBF5] pt-3">
                  <span className="font-['Cairo'] text-[12px] font-semibold leading-[16px] text-[#B45309]">أمان وحماية بيانات</span>
                  <span className="text-[13px] text-[#B45309]">•</span>
                </div>
              </div>

              {/* Card 4 - سهولة الاستخدام */}
              <div
                dir="ltr"
                className="flex min-h-[244px] w-full flex-col rounded-[16px] border border-[#E2EBF5] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
              >
                <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center self-end rounded-[12px] bg-[#EEF0FF] text-[#4338CA]">
                  <FaHandPointer size={21} strokeWidth={2} />
                </div>

                <div className="mt-5 text-right">
                  <h3 className="font-['Cairo'] text-[20px] font-bold leading-[28px] text-[#0F172A]">سهولة الاستخدام</h3>
                  <p className="mt-3 max-w-[240px] font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#64748B]">
                    نبني تجربة واضحة وبسيطة للمؤسسة والكفيل والوصي.
                  </p>
                  ٍ
                </div>

                <div className="mt-auto flex min-h-[29px] w-full items-center justify-end gap-[6px] border-t border-[#E2EBF5] pt-3">
                  <span className="font-['Cairo'] text-[12px] font-semibold leading-[16px] text-[#4338CA]">واجهات بديهية وسلسة</span>
                  <span className="text-[13px] text-[#4338CA]">•</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INSTITUTION SUPPORT ================= */}
        <section id="institution-support" dir="rtl" className="w-full bg-white px-5 py-8 sm:px-8 lg:px-8">
          <div className="mx-auto flex w-full max-w-[1216px] flex-col rounded-[24px] border border-white/10 bg-gradient-to-l from-[#0D4B8E] via-[#125B9A] to-[#0B467F] px-6 py-8 shadow-[0_12px_30px_rgba(0,0,0,0.10)] sm:px-8 sm:py-10 lg:min-h-[393px] lg:px-12 lg:py-12">
            <div className="flex w-full max-w-[768px] flex-col gap-4 text-right lg:mr-0">
              {/* Badge */}
              <span className="inline-flex w-fit items-center gap-2 rounded-[9999px] border border-white/20 bg-white/10 px-3 py-1 font-['Cairo'] text-[11px] font-medium leading-[18px] text-[#8FE8EA]">
                جزء كفيلي
                <span className="h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />
              </span>

              {/* Title */}
              <h2 className="max-w-[658px] font-['Cairo'] text-[28px] font-extrabold leading-[36px] tracking-[-0.3px] text-white sm:text-[32px] sm:leading-[38px] lg:text-[36px] lg:leading-[40px]">
                نحن لا نستبدل المؤسسة،
                <br />
                بل نساعدها على إدارة رحلة الكفالة بشكل أفضل.
              </h2>

              {/* Description */}
              <p className="max-w-[768px] font-['Cairo'] text-[14px] font-medium leading-[24px] text-[#D7E6F3] sm:text-[15px]">
                توفر كفيلي البنية الرقمية التي تساعد المؤسسة على تنظيم الحالات والكفالات، وربط الكفيل والوصي ضمن رحلة أكثر وضوحًا وقابلية
                للمتابعة.
              </p>

              {/* Features */}
              <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="inline-flex h-[34px] items-center gap-2 rounded-[8px] border border-white/20 bg-white/10 px-[14px] py-2 font-['Cairo'] text-[11px] font-medium leading-[18px] text-[#DCEAF5]">
                  <FiCheckCircle size={20} strokeWidth={2} className="shrink-0 text-[#2DBCC3]" />
                  <span>بنية تحتية للمؤسسات</span>
                </div>

                <div className="inline-flex h-[34px] items-center gap-2 rounded-[8px] border border-white/20 bg-white/10 px-[14px] py-2 font-['Cairo'] text-[11px] font-medium leading-[18px] text-[#DCEAF5]">
                  <FiCheckCircle size={20} strokeWidth={2} className="shrink-0 text-[#2DBCC3]" />
                  <span>تنظيم مسارات التوثيق</span>
                </div>

                <div className="inline-flex h-[34px] items-center gap-2 rounded-[8px] border border-white/20 bg-white/10 px-[14px] py-2 font-['Cairo'] text-[11px] font-medium leading-[18px] text-[#DCEAF5]">
                  <FiCheckCircle size={20} strokeWidth={2} className="shrink-0 text-[#2DBCC3]" />
                  <span>حلقة وصل رقمية آمنة</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section id="team" dir="rtl" className="w-full bg-[#F4F7FB] px-5 py-[80px] sm:px-8 lg:px-8">
          <div className="mx-auto w-full max-w-[1280px]">
            {/* Header */}
            <div className="mx-auto flex max-w-[768px] flex-col items-center text-center">
              <span className="rounded-full bg-[#EAF7F8] px-3 py-1 font-['Cairo'] text-[11px] font-medium text-[#2DBCC3]">
                الفريق خلف كفيلي
              </span>

              <h2 className="mt-3 font-['Cairo'] text-[28px] font-black leading-[40px] text-[#0F172A] sm:text-[32px] lg:text-[36px]">
                الفريق وراء كفيلي
              </h2>

              <p className="mt-2 max-w-[650px] font-['Cairo'] text-[13px] font-medium leading-[22px] text-[#64748B] sm:text-[14px]">
                فريق تقني يعمل على تحويل كفيلي من فكرة ناجحة إلى منصة حقيقية قابلة للتجربة والتطوير.
              </p>
            </div>

            {/* Team Grid */}
            <div dir="ltr" className="mx-auto mt-10 grid w-full max-w-[1024px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              {team.map((member, index) => {
                const Icon = member.icon;

                return (
                  <div
                    key={index}
                    dir="rtl"
                    className="flex min-h-[297px] w-full flex-col items-center rounded-[24px] border border-[#E2EBF5] bg-white px-5 pb-4 pt-6 shadow-[0_4px_12px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
                  >
                    {/* Image */}
                    <div className="relative">
                      <div className="h-[145px] w-[145px] overflow-hidden rounded-[24px] border border-white bg-[#F1F5F9] shadow-[0_3px_8px_rgba(15,23,42,0.12)]">
                        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                      </div>

                      {/* Role Icon */}
                      {Icon && (
                        <div className="absolute -bottom-2 -left-2 flex h-[38px] w-[38px] items-center justify-center rounded-full border-[3px] border-white bg-white shadow-[0_3px_8px_rgba(15,23,42,0.12)]">
                          <div
                            className="flex h-full w-full items-center justify-center rounded-full"
                            style={{ backgroundColor: member.iconColor }}
                          >
                            <Icon size={15} color="white" strokeWidth={2.4} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h3 className="mt-5 text-center font-['Cairo'] text-[19px] font-bold leading-[28px] text-[#0F172A]">{member.name}</h3>

                    {/* Role */}
                    <p
                      className="mt-1 max-w-full text-center font-['Cairo'] text-[11px] font-bold leading-[18px]"
                      style={{ color: member.roleColor }}
                    >
                      {member.role}
                    </p>

                    <div className="mt-3 h-px w-full bg-[#EEF2F7]" />

                    {/* Social */}
                    <div className="mt-auto flex items-center gap-4 pt-3">
                      <a
                        href={member.whatsapp}
                        aria-label={`WhatsApp - ${member.name}`}
                        className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#A7F3D0] bg-white text-[#25D366] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#ECFDF5]"
                      >
                        <FaWhatsapp size={17} />
                      </a>

                      <a
                        href={member.linkedin}
                        aria-label={`LinkedIn - ${member.name}`}
                        className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#BFDBFE] bg-white text-[#0A66C2] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EFF6FF]"
                      >
                        <FaLinkedinIn size={16} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= HOW KAFEELI WORKS ================= */}
        <section id="how-kafeeli-works" dir="rtl" className="w-full px-5 py-10 sm:px-8 sm:py-12 lg:px-8 lg:py-16">
          <div className="relative mx-auto flex min-h-[364px] w-full max-w-[960px] items-center justify-center overflow-hidden rounded-[24px] border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img src={kafeeliOrphans} alt="منظومة كفيلي لرعاية الأيتام" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[rgba(4,23,48,0.55)]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(4,23,48,0.95)] via-[rgba(13,75,142,0.72)] to-[rgba(4,23,48,0.80)]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex w-full max-w-[672px] flex-col items-center px-5 py-14 text-center sm:px-8">
              {/* Icon */}
              <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[16px] border border-white/10 bg-white/10 shadow-[0_4px_12px_rgba(45,188,195,0.18)] backdrop-blur-sm">
                <RiHandHeartFill size={27} color="#2DBCC3" />
              </div>

              {/* Title */}
              <h2 className="mt-5 font-['Cairo'] text-[32px] font-extrabold leading-[1.35] tracking-[-0.5px] text-white sm:text-[40px] sm:leading-[1.35] lg:text-[48px] lg:leading-[1.35]">
                نبني رحلة كفالة أكثر وضوحًا
              </h2>

              {/* Description */}
              <p className="mt-3 font-['Cairo'] text-[13px] font-medium leading-[22px] text-white/85 sm:text-[15px] sm:leading-[24px] lg:text-[16px] lg:leading-[24px]">
                تعرف على طريقة عمل كفيلي ودور كل طرف داخل المنصة.
              </p>

              {/* Buttons */}
              <div className="mt-8 flex w-full flex-col items-center justify-center gap-2 sm:w-auto sm:flex-row">
                <div className="mt-8 flex w-full flex-row items-center justify-center gap-2">
                  <button
                    type="button"
                    className="inline-flex h-[48px] w-[199px] shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[12px] bg-[#2DBCC3] px-[32px] font-['Cairo'] text-[14px] font-extrabold leading-[20px] text-[#0F172A] shadow-[0_8px_15px_-3px_rgba(45,188,195,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#35C8CE]"
                  >
                    <span className="whitespace-nowrap">كيف تعمل كفيلي</span>
                    <FiArrowLeft size={18} strokeWidth={2.5} />
                  </button>

                  <button
                    type="button"
                    className="inline-flex h-[48px] w-[161px] shrink-0 flex-row items-center justify-center gap-2 whitespace-nowrap rounded-[12px] border border-white/20 bg-white/10 px-[32px] font-['Cairo'] text-[14px] font-extrabold leading-[20px] text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/15"
                  >
                    <FiMail size={16} strokeWidth={2.5} className="shrink-0 text-[#2DBCC3]" />
                    <span className="whitespace-nowrap">تواصل معنا</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}
