import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaFlag,
  FaEye,
  FaWhatsapp,
  FaLinkedinIn,
  FaArrowLeft,
  FaInfoCircle,
  FaLock,
  FaUsers,
  FaBuilding,
  FaHandHoldingHeart,
  FaShieldAlt,
  FaMailBulk,
  FaHeart,
} from "react-icons/fa";
import {
  FiChevronLeft,
  FiInfo,
  FiHome,
  FiUserCheck,
  FiUsers,
  FiCheckCircle,
  FiArrowLeft,
  FiMail,
} from "react-icons/fi";
import { LuSparkles, LuZap, LuShieldCheck, LuLightbulb, LuPalette, LuCode } from "react-icons/lu";
import { BsLightbulbFill } from "react-icons/bs";
import { MdFamilyRestroom } from "react-icons/md";
import { RiShieldCheckLine, RiHandHeartFill } from "react-icons/ri";
import { IoEye } from "react-icons/io5";
import { AiFillFileText } from "react-icons/ai";
import { BiSolidShield } from "react-icons/bi";

import Header from "./header";
import Footer from "./Footer";

import aboutHeroBg from "../assets/about.png";
import backendImg from "../assets/backendimg.png";
import frontendImg from "../assets/frontimg.png";
import kafeeliOrphans from "../assets/kaf.png";

export default function About() {
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
      linkedin:
        "https://www.linkedin.com/in/ameer-saqer?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    },
    {
      name: "محمود ماجد العجرمي",
      role: "Backend Developer & System Analyst",
      roleColor: "#07579F",
      iconColor: "#07579F",
      icon: LuCode,
      image: backendImg,
      whatsapp: "#",
      linkedin:
        "https://www.linkedin.com/in/mahmoud-ajrami?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
    {
      name: "شيماء أحمد الرياطي",
      role: "Frontend Engineer",
      roleColor: "#C96A16",
      iconColor: "#E5A72D",
      icon: LuCode,
      image: frontendImg,
      whatsapp: "#",
      linkedin:
        "https://www.linkedin.com/in/shima-al-riyati-8b0573253?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAFBFD] flex flex-col font-['Cairo',sans-serif] overflow-x-hidden text-right selection:bg-[#2DBCC3] selection:text-white"
    >
      <Header />

      <main className="flex-grow">
        {/* =========================================================
            SECTION 1: HERO SECTION
        ========================================================= */}
        <section
          id="about"
          className="relative min-h-[100svh] min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden"
        >
          {/* Background Image with Dark Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={aboutHeroBg}
              alt="كفيلي — عن المنصة"
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Dark Blue Rich Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(4, 23, 48, 0) 0%, rgba(7, 43, 83, 0.5) 55%, rgba(4, 23, 48, 0.96) 100%)",
              }}
            />
          </div>

          {/* Glowing Orbs */}
          <div className="absolute top-12 right-12 w-96 h-96 rounded-full bg-[#2DBCC3]/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#0D4B8E]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center lg:text-right my-auto">
            <div className="max-w-3xl mx-auto lg:mx-0">
              {/* Pill Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-[#09233F]/90 border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg mb-6"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#2DBCC3] animate-pulse" />
                <span>عن كفيلي</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.25] mb-6 tracking-tight"
              >
                بدأنا من مشكلة حقيقية:
                <br />
                <span className="text-[#3BD4DC]">رحلة كفالة تحتاج إلى وضوح أكبر</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/90 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 font-normal"
              >
                كفيلي منصة رقمية تنظّم رحلة الكفالة بين المؤسسة والكفيل والوصي، وتجمع
                الإجراءات والدفعات والتحديثات ضمن رحلة واحدة واضحة وقابلة للمتابعة.
              </motion.p>

              {/* Call to Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-12"
              >
                <a
                  href="#why-kafeeli"
                  className="inline-flex items-center gap-2.5 bg-[#2DBCC3] hover:bg-[#25B2B9] text-[#041730] px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-[#2DBCC3]/30 active:scale-95"
                >
                  <span>تعرّف على طريقة عملنا</span>
                  <FiChevronLeft size={18} strokeWidth={2.5} />
                </a>

                <a
                  href="#vision"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-7 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition-all duration-200 active:scale-95"
                >
                  <FiInfo size={16} className="text-[#3BD4DC]" />
                  <span>رسالتنا وأهدافنا</span>
                </a>
              </motion.div>

              {/* Hero Key Value Points */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-white/90 text-xs sm:text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <FaCheckCircle size={15} />
                  </span>
                  <span>100% شفافية وتنسيق بين كافة الأطراف</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#2DBCC3]/20 text-[#3BD4DC]">
                    <FaCheckCircle size={15} />
                  </span>
                  <span>أثر رقمي مستدام</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#D9A441]/20 text-[#D9A441]">
                    <FaCheckCircle size={15} />
                  </span>
                  <span>منظومة موثوقة لحماية حقوق الأيتام</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: WHY WE STARTED KAFEELI?
        ========================================================= */}
        <section
          id="why-kafeeli"
          className="py-16 lg:py-24 bg-white border-b border-gray-100"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block bg-[#D9A441]/10 text-[#D99A27] border border-[#D9A441]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
                قصة المنصة
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
                لماذا بدأنا كفيلي؟
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                إدارة الكفالة لا تنتهي عند تسجيل الحالة أو دفع الكفالة، هناك مسؤولية
                تجاه الحالة، ومسؤولية عن الإجراءات المتعلقة بالحالة. وعندما تكون هذه
                الرحلة موزعة بين ملفات ومحادثات وإجراءات مختلفة، تصبح المتابعة والتوثيق أكثر صعوبة.
              </p>
            </div>

            {/* 3 Pillars Cards (المؤسسة | الكفيل | الوصي) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Institution Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-b from-[#EFF6FF]/70 to-[#EFF6FF]/20 border-2 border-[#CFE0F5] rounded-2xl p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0D4B8E] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#0D4B8E]/20 group-hover:scale-110 transition-transform">
                    <FiHome size={26} strokeWidth={2} />
                  </div>

                  <h3 className="font-black text-[#0F172A] text-xl mb-1">المؤسسة</h3>

                  <p className="text-[#0D4B8E] text-xs sm:text-sm font-bold mb-3">
                    نظام دقيق ومراجعة مركزية للبيانات والدفعات
                  </p>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    تدير المؤسسة العملية بالكامل، تراجع المستندات الرسمية، وتضمن
                    الشفافية في كل خطوة ومرحلة.
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-[#CFE0F5]/80">
                  <span className="inline-block bg-[#0D4B8E]/10 text-[#0D4B8E] text-xs font-bold px-3.5 py-1.5 rounded-full">
                    صلاحيات إدارية كاملة
                  </span>
                </div>
              </motion.div>

              {/* Sponsor Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-b from-[#F0FDFA]/70 to-[#F0FDFA]/20 border-2 border-[#BFECEF] rounded-2xl p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#2DBCC3] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#2DBCC3]/20 group-hover:scale-110 transition-transform">
                    <FiUserCheck size={26} strokeWidth={2} />
                  </div>

                  <h3 className="font-black text-[#0F172A] text-xl mb-1">الكفيل</h3>

                  <p className="text-[#1EA4AB] text-xs sm:text-sm font-bold mb-3">
                    رؤية واضحة لأثر العطاء ومتابعة مباشرة للحالة
                  </p>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    يبدأ الكفيل بسهولة، ويوثق الكفالة الشهريّة، ويستقبل التحديثات
                    الدورية الموثقة والتقارير التي تهمه.
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-[#BFECEF]/80">
                  <span className="inline-block bg-[#2DBCC3]/10 text-[#1EA4AB] text-xs font-bold px-3.5 py-1.5 rounded-full">
                    متابعة شفافة ومباشرة
                  </span>
                </div>
              </motion.div>

              {/* Guardian Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-b from-[#FFFBEB]/70 to-[#FFFBEB]/20 border-2 border-[#F6D98E] rounded-2xl p-7 text-center flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#E5A72D] text-white flex items-center justify-center mb-5 shadow-lg shadow-[#E5A72D]/20 group-hover:scale-110 transition-transform">
                    <FiUsers size={26} strokeWidth={2} />
                  </div>

                  <h3 className="font-black text-[#0F172A] text-xl mb-1">الوصي</h3>

                  <p className="text-[#A6400E] text-xs sm:text-sm font-bold mb-3">
                    جمع المستندات وتأكيد الاستلام والتحديثات الدورية
                  </p>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    مسؤول عن رعاية اليتيم، يرفع الأوراق الرسمية المعتمدة، ويوثق
                    استلام المبالغ ويشارك التحديثات باطمئنان وكرامة.
                  </p>
                </div>

                <div className="w-full pt-4 border-t border-[#F6D98E]/80">
                  <span className="inline-block bg-[#E5A72D]/10 text-[#A6400E] text-xs font-bold px-3.5 py-1.5 rounded-full">
                    توثيق بكرامة واطمئنان
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Conclusion Banner */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#0D4B8E] to-[#0F5A9F] rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 text-right">
                <div className="w-14 h-14 rounded-2xl bg-[#2DBCC3]/20 border border-[#2DBCC3]/30 text-[#2DBCC3] flex items-center justify-center shrink-0">
                  <BsLightbulbFill size={24} />
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-black text-[#3BD4DC] mb-1">
                    من هنا جاءت فكرة كفيلي:
                  </h4>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl font-normal">
                    منصة رقمية تساعد على تنظيم رحلة الكفالة وتوثيقها من كافة الجوانب وعلى أعلى درجات الموثوقية.
                  </p>
                </div>
              </div>

              <a
                href="/how-it-works"
                className="bg-white hover:bg-gray-100 text-[#0D4B8E] px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 shrink-0"
              >
                اكتشف كيف نعمل
              </a>
            </motion.div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: MISSION & VISION
        ========================================================= */}
        <section
          id="vision"
          className="py-16 lg:py-24 bg-gradient-to-b from-[#0F172A] via-[#0D3B73] to-[#051E3A] text-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block bg-[#2DBCC3]/10 text-[#3BD4DC] border border-[#2DBCC3]/30 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
                الرؤية والتوجه
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
                رسالتنا ورؤيتنا لمستقبل الكفالة
              </h2>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                نعمل بشغف على نقل العمل الخيري إلى آفاق التنظيم والشفافية الرقمية العالمية.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1: Mission */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 border border-white/15 hover:bg-white/15 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-[#2DBCC3]/15 text-[#3BD4DC] border border-[#2DBCC3]/30 text-xs font-bold px-3 py-1 rounded-md">
                      رسالتنا
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-[#2DBCC3] text-white flex items-center justify-center shadow-lg shadow-[#2DBCC3]/30">
                      <FaFlag size={20} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                    تمكين المنظومة الخيرية رقمياً
                  </h3>

                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
                    تطوير بيئة رقمية تساعد المؤسسات على إدارة الكفالات بشكل أكثر تنظيمًا، وتمنح الكفيل والوصي تجربة واضحة للمتابعة والتوثيق.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/15 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#3BD4DC]">
                  <FaCheckCircle size={16} />
                  <span>تنظيم مؤسسي • تجربة كفيل ووصي واضحة</span>
                </div>
              </motion.div>

              {/* Card 2: Vision */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/10 border border-white/15 hover:bg-white/15 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-[#D9A441]/15 text-[#D9A441] border border-[#D9A441]/30 text-xs font-bold px-3 py-1 rounded-md">
                      رؤيتنا
                    </span>

                    <div className="w-12 h-12 rounded-xl bg-[#D9A441] text-white flex items-center justify-center shadow-lg shadow-[#D9A441]/30">
                      <FaEye size={20} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white mb-4">
                    بناء الثقة عبر الشفافية التقنية
                  </h3>

                  <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8">
                    أن تصبح إدارة الكفالات أكثر تنظيمًا ووضوحًا، وأن تساعد التقنية في بناء رحلة يمكن للأطراف المعنية متابعتها والثقة بإجراءاتها.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/15 flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D9A441]">
                  <RiShieldCheckLine size={18} />
                  <span>وضوح الإجراءات • تعزيز الموثوقية والأثر</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: WORK PILLARS / VALUES
        ========================================================= */}
        <section id="pillars" className="py-16 lg:py-24 bg-[#FAFBFD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block bg-[#0D4B8E]/10 text-[#0D4B8E] border border-[#0D4B8E]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
                ركائز العمل
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
                ما الذي نبني عليه كفيلي؟
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                مبادئ محورية توجه قراراتنا الهندسية والتصميمية لتقديم أعلى درجات الموثوقية والسهولة.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: الوضوح */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-100 hover:border-[#0D4B8E]/30 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EEF6FF] text-[#0D4B8E] flex items-center justify-center mb-5 font-bold">
                    <IoEye size={24} />
                  </div>

                  <h3 className="font-black text-[#0F172A] text-xl mb-2">الوضوح</h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    نجعل حالة الإجراءات ومراحلها واضحة ومباشرة لكل طرف معني بالعملية.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 text-xs font-bold text-[#0D4B8E]">
                  ● متابعة حية في كل خطوة
                </div>
              </motion.div>

              {/* Card 2: التوثيق */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-gray-100 hover:border-[#2DBCC3]/30 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EAF9F7] text-[#2DBCC3] flex items-center justify-center mb-5 font-bold">
                    <AiFillFileText size={24} />
                  </div>

                  <h3 className="font-black text-[#0F172A] text-xl mb-2">التوثيق</h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    نربط المستندات والدفعات والتحديثات برحلة الكفالة دون أي فقدان للبيانات.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 text-xs font-bold text-[#2DBCC3]">
                  ● أرشيف رقمي موثق
                </div>
              </motion.div>

              {/* Card 3: الخصوصية */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-gray-100 hover:border-[#D9A441]/30 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FFF8E8] text-[#D9A441] flex items-center justify-center mb-5 font-bold">
                    <BiSolidShield size={24} />
                  </div>

                  <h3 className="font-black text-[#0F172A] text-xl mb-2">الخصوصية</h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    نتعامل مع البيانات الحساسة وفق أعلى معايير الخصوصية والأدوار المعتمدة.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 text-xs font-bold text-[#D9A441]">
                  ● أمان وحماية بيانات
                </div>
              </motion.div>

              {/* Card 4: سهولة الاستخدام */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-gray-100 hover:border-purple-300 rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#EEF0FF] text-purple-600 flex items-center justify-center mb-5 font-bold">
                    <LuSparkles size={24} />
                  </div>

                  <h3 className="font-black text-[#0F172A] text-xl mb-2">سهولة الاستخدام</h3>

                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6">
                    نبني تجربة واضحة وبسيطة تناسب جميع المستخدمين بدون تعقيد تقني.
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 text-xs font-bold text-purple-600">
                  ● واجهات بديهية وسلسة
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 5: SUPPORTING INSTITUTIONS BANNER
        ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[2.5rem] bg-[#0D4B8E] text-white p-8 sm:p-12 lg:p-16 shadow-2xl"
          >
            {/* Background Orbs */}
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#2DBCC3]/25 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#083463]/60 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl text-right">
              <span className="inline-block bg-white/10 text-[#3BD4DC] border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold mb-4">
                جزء من منظومة كفيلي
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                نحن لا نستبدل المؤسسة،
                <br />
                بل نساعدها على إدارة رحلة الكفالة بشكل أفضل.
              </h2>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                توفر كفيلي البنية الرقمية التي تساعد المؤسسة على تنظيم الحالات والكفالات،
                وربط الكفيل والوصي ضمن رحلة أكثر وضوحًا وقابلية للمتابعة.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-xs font-bold text-white">
                  <FaCheckCircle className="text-[#3BD4DC]" />
                  <span>بنية تحتية للمؤسسات</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-xs font-bold text-white">
                  <FaCheckCircle className="text-[#3BD4DC]" />
                  <span>تنظيم مسارات التوثيق</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-xs font-bold text-white">
                  <FaCheckCircle className="text-[#3BD4DC]" />
                  <span>حلقة وصل رقمية آمنة</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* =========================================================
            SECTION 6: TEAM MEMBERS SECTION
        ========================================================= */}
        <section id="team" className="py-16 lg:py-24 bg-[#FAFBFD]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="inline-block bg-[#2DBCC3]/10 text-[#0D4B8E] border border-[#2DBCC3]/20 px-4 py-1.5 rounded-full text-xs font-bold mb-3">
                الفريق خلف كفيلي
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#0D4B8E] mb-3">
                الفريق وراء كفيلي
              </h2>

              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                فريق تقني يعمل على تحويل كفيلي من فكرة ناجحة إلى منصة حقيقية قابلة للتجربة والتطوير.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => {
                const Icon = member.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white border border-gray-100 rounded-3xl p-6 text-center flex flex-col items-center justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
                  >
                    {/* Avatar Image + Role Icon Badge */}
                    <div className="relative mb-5">
                      <div className="w-36 h-36 rounded-2xl overflow-hidden border-2 border-white bg-gray-100 shadow-md group-hover:scale-105 transition-transform">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {Icon && (
                        <div className="absolute -bottom-2 -left-2 w-10 h-10 rounded-full border-2 border-white bg-white shadow-md flex items-center justify-center">
                          <div
                            className="w-full h-full rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: member.iconColor }}
                          >
                            <Icon size={16} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Member Info */}
                    <h3 className="font-black text-[#0F172A] text-lg mb-1">
                      {member.name}
                    </h3>

                    <p
                      className="text-xs font-bold mb-4 leading-relaxed"
                      style={{ color: member.roleColor }}
                    >
                      {member.role}
                    </p>

                    {/* Social Links Bar */}
                    <div className="w-full pt-4 border-t border-gray-100 flex items-center justify-center gap-3">
                      <a
                        href={member.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp - ${member.name}`}
                        className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        <FaWhatsapp size={16} />
                      </a>

                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn - ${member.name}`}
                        className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FaLinkedinIn size={15} />
                      </a>
                    </div>
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
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={kafeeliOrphans}
                alt="كفيلي"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0D4B8E] via-[#0D4B8E]/90 to-[#0B3A6F]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 text-[#3BD4DC] flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <RiHandHeartFill size={28} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                نبني رحلة كفالة أكثر وضوحاً
              </h2>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-8 font-normal">
                تعرف على طريقة عمل كفيلي ودور كل طرف داخل المنصة.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/how-it-works"
                  className="inline-flex items-center gap-2.5 bg-[#2DBCC3] hover:bg-[#25B2B9] text-[#041730] px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-xl shadow-[#2DBCC3]/30 active:scale-95"
                >
                  <span>كيف تعمل كفيلي</span>
                  <FiArrowLeft size={18} strokeWidth={2.5} />
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-3.5 rounded-xl font-bold text-sm backdrop-blur-md transition-all duration-200 active:scale-95"
                >
                  <FiMail size={16} className="text-[#3BD4DC]" />
                  <span>تواصل معنا</span>
                </a>
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
