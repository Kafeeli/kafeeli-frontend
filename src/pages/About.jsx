import { motion } from "framer-motion";
import {
  FaFlag,
  FaEye,
  FaHeart,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaUsers,
  FaChartLine,
  FaLock,
  FaHandshake,
  FaEnvelope,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Header from "./header";
import Footer from "./Footer";
import aboutHeroImg from "../assets/smileChildern.jpg";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const values = [
    {
      icon: <FaShieldAlt className="w-6 h-6 text-[#0D4B8E]" />,
      title: "الشفافية المطلقة",
      desc: "نلتزم بنشر التقارير المالية والتحقق المباشر من الحالات لنضمن وصول التبرعات لمستحقيها بالكامل.",
    },
    {
      icon: <FaLock className="w-6 h-6 text-[#2DBCC3]" />,
      title: "الأمان المالي والتقني",
      desc: "نستخدم أفضل البروتوكولات الأمنية والحلول الذكية لضمان سلامة العمليات وخصوصية الكفلاء والأيتام.",
    },
    {
      icon: <FaHeart className="w-6 h-6 text-[#D9A441]" />,
      title: "حفظ الكرامة الإنسانية",
      desc: "نسعى لتقديم الدعم بطريقة تحافظ على عزة نفس اليتيم وعائلته وتغنيهم عن الاستجداء والسؤال.",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-[#0D4B8E]" />,
      title: "التمكين الاجتماعي المستدام",
      desc: "لا نقتصر على تقديم المساعدات النقدية المؤقتة، بل نعمل على تأهيل أسر الأيتام وبناء قدراتهم.",
    },
  ];

  const steps = [
    {
      number: "٠١",
      title: "التسجيل والتحقق الميداني",
      desc: "تقوم أسر الأيتام بتقديم طلبات الكفالة، ثم يتولى فريقنا التحقق الميداني والتدقيق القانوني والاجتماعي للملفات.",
    },
    {
      number: "٠٢",
      title: "عرض الحالات والاحتياجات",
      desc: "تُرفع الحالات المعتمدة على المنصة بشكل يحمي الخصوصية مع إبراز الاحتياجات المادية، التعليمية والصحية لليتيم.",
    },
    {
      number: "٠٣",
      title: "الكفالة والتحويل المباشر",
      desc: "يختار الكفيل اليتيم المناسب ويفعّل الكفالة الشهرية عبر قنوات الدفع الآمنة لتتحول مباشرة إلى حساب عائلة اليتيم.",
    },
    {
      number: "٠٤",
      title: "المتابعة وتقارير الأثر",
      desc: "يستقبل الكفيل تقارير دورية موثقة حول التطور الدراسي والصحي والاجتماعي لليتيم لمشاهدة ثمار كفالته خطوة بخطوة.",
    },
  ];

  const team = [
    {
      name: "أمير سمير صقر",
      role: "UX/UI Designer & Frontend Developer",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      linkedin: "#",
    },
    {
      name: "تالة رأفت أبو شيحة",
      role: "FRONTEND DEVELOPER & API",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400",
      linkedin: "#",
    },
    {
      name: "محمود العجرمي",
      role: "BACKEND DEVELOPER",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      linkedin: "#",
    },
    {
      name: "شيماء الرياطي",
      role: "FRONTEND DEVELOPER",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      linkedin: "#",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FAFBFD] flex flex-col font-[Cairo,sans-serif] overflow-x-hidden"
    >
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0D4B8E]/5 via-[#2DBCC3]/2 to-transparent pt-12 pb-20 lg:py-28 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Text Box */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 text-right"
            >
              <span className="inline-flex items-center gap-2 bg-[#0D4B8E]/5 text-[#0D4B8E] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-5 border border-[#0D4B8E]/10">
                <FaHeart className="w-3.5 h-3.5 text-[#2DBCC3]" />
                تعرّف على كفيلي
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[#0D4B8E] leading-tight mb-6">
                جسر الأمل الموثوق <br />
                بين <span className="text-[#2DBCC3]">قلوب المحسنين</span>{" "}
                والأيتام
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                منصة كفيلي هي أول منصة إلكترونية ذكية مخصصة لتمكين ورعاية
                الأيتام بالاعتماد الكامل على مبادئ الشفافية والتحويل المباشر.
                نسعى لدمج التكنولوجيا الحديثة بالعمل الإنساني لنخلق مستقبلاً
                يحفظ كرامة الطفل وعائلته ويمنح الداعمين الطمأنينة والأثر
                الحقيقي.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="bg-[#0D4B8E] hover:bg-[#09396f] text-white text-[15px] font-bold py-3 px-8 rounded-xl shadow-lg shadow-[#0D4B8E]/10 transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-2"
                >
                  <FaUsers className="w-4 h-4" />
                  انضم إلينا كداعم
                </Link>
                <a
                  href="#mission"
                  className="bg-white border border-gray-200 text-[#0D4B8E] hover:bg-gray-50 text-[15px] font-bold py-3 px-8 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
                >
                  اقرأ عن رؤيتنا
                </a>
              </div>
            </motion.div>

            {/* Image Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="rounded-[2.5rem] border-[6px] border-white shadow-2xl overflow-hidden w-full max-w-[460px] aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
                <img
                  src={aboutHeroImg}
                  alt="منصة كفيلي - أيتام متفائلون"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {/* Background abstract element */}
              <div className="absolute -inset-4 bg-[#2DBCC3]/10 rounded-[3rem] -z-10 blur-2xl opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story & Background Section */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100/60 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Visual Icon List / Graphics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-[#0D4B8E]/5 to-[#2DBCC3]/5 rounded-3xl p-8 border border-gray-100/80">
                <h3 className="text-xl font-extrabold text-[#0D4B8E] mb-6 flex items-center gap-2">
                  <FaChartLine className="text-[#2DBCC3] w-5 h-5" />
                  لماذا منصة كفيلي؟
                </h3>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <FaCheckCircle className="w-5 h-5 text-[#2DBCC3] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                        تحقق شامل للحالات
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        تخضع جميع الملفات لتدقيق معتمد لضمان استحقاق الأسر
                        وكفاءة الدعم.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <FaCheckCircle className="w-5 h-5 text-[#2DBCC3] shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                        تواصل ومتابعة مستمرة
                      </h4>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        تتيح لك المنصة متابعة نتائج كفالتك بالتقارير الموثقة
                        وبناء صلة وصل إنسانية دافئة.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Narrative Box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 order-1 lg:order-2 text-right"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D4B8E] mb-6">
                البداية.. رحلة ولدت من المعاناة والرغبة في التغيير
              </h2>

              <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed mb-6">
                في خضم التحديات الإنسانية الكبيرة التي يعيشها قطاع غزة وفلسطين
                عموماً، لاحظنا أن أنظمة الكفالة التقليدية تعاني من عقبات عديدة
                مثل بطء معالجة المعاملات، وانعدام الشفافية في تتبع مبالغ
                التبرعات، وغياب الاتصال المباشر بين الكفيل واليتيم.
              </p>

              <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed mb-6">
                من هنا ولدت فكرة **كفيلي** كبوابة تقنية متكاملة تتخطى
                البيروقراطية وتعتمد بالكامل على الحلول الذكية والتكامل البرمجي
                لربط قلوب الكفلاء في شتى أنحاء العالم بحاجات الأطفال بشكل فوري،
                آمن، ومباشر.
              </p>

              <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed font-semibold border-r-4 border-[#2DBCC3] pr-4 py-2 bg-gray-50 rounded-l-lg">
                نحن لا نسعى فقط لتقديم كفالة معيشية، بل نهدف إلى كفالة التعليم
                والمستقبل وبناء فرد مؤهل قادر على النهوض بمجتمعه وصناعة فرصه
                بنفسه.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values Section */}
      <section
        id="mission"
        className="bg-[#FAFBFD] py-16 lg:py-24 border-t border-b border-gray-100/50 w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D4B8E] mb-4">
              الوجهة التي تقود قراراتنا وجهودنا اليومية
            </h2>
            <p className="text-[#75777C] text-sm sm:text-base max-w-2xl mx-auto">
              نؤمن بأن العمل الإنساني أمانة عظمى، لذلك تأسست كفيلي على ركائز
              واضحة وأهداف نبيلة تصب في خدمة وتمكين المجتمع.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* Card 1: Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100/80 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-300 flex gap-5 text-right"
            >
              <div className="w-14 h-14 bg-[#0D4B8E]/5 rounded-2xl flex items-center justify-center shrink-0">
                <FaFlag className="w-6 h-6 text-[#0D4B8E]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0D4B8E] mb-3">
                  رسالتنا
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  تمكين ورعاية الأيتام من خلال توفير منصة رقمية فائقة الشفافية
                  تجمع بين الموثوقية التامة والحلول المبتكرة، لنضمن لليتيم
                  تعليماً متميزاً ورعاية صحية شاملة وحياة كريمة ومستقرة.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-2xl p-8 lg:p-10 border border-gray-100/80 hover:shadow-xl hover:shadow-gray-200/20 transition-all duration-300 flex gap-5 text-right"
            >
              <div className="w-14 h-14 bg-[#2DBCC3]/10 rounded-2xl flex items-center justify-center shrink-0">
                <FaEye className="w-6 h-6 text-[#2DBCC3]" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0D4B8E] mb-3">
                  رؤيتنا
                </h3>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  أن نكون البوابة الرقمية الأولى والأكثر أماناً وموثوقية في
                  العالم العربي لكفالة وتأهيل وتمكين الأيتام، واضعين معايير
                  جديدة للشفافية وتصميم المبادرات الإنسانية المبنية على التقنية.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <div className="mt-20">
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D4B8E] text-center mb-12">
              قيمنا الجوهرية
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#0D4B8E]/10 hover:shadow-lg transition-all duration-300 text-center flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 mx-auto mb-5 bg-[#FAFBFD] rounded-xl flex items-center justify-center border border-gray-50">
                      {val.icon}
                    </div>
                    <h4 className="text-base font-bold text-gray-800 mb-2">
                      {val.title}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - The Process */}
      <section className="bg-white py-16 lg:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#2DBCC3] text-sm font-extrabold tracking-widest uppercase">
              دورة حياة الكفالة
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D4B8E] mt-3">
              كيف تضمن كفيلي الشفافية والأمان؟
            </h2>
            <p className="text-[#75777C] text-sm sm:text-base max-w-2xl mx-auto mt-2">
              صممنا نموذج عمل ذكي وشفاف يضمن سلاسة الإجراءات وتوجيه مساهمتك
              بالكامل للأيتام بأعلى معايير الحماية والمتابعة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-[#FAFBFD] rounded-2xl p-6 border border-gray-100 flex flex-col text-right hover:shadow-md transition-all duration-200"
              >
                <div className="text-3xl sm:text-4xl font-black text-[#2DBCC3]/20 mb-4">
                  {step.number}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="bg-white py-16 lg:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0D4B8E] mb-4">
              فريق القيادة والريادة الإنسانية
            </h2>
            <p className="text-[#75777C] text-sm sm:text-base max-w-2xl mx-auto">
              فريق ملتزم ومحترف يعمل بشغف وعلم لضمان تشغيل المنصة بنزاهة وجودة
              رقمية رائدة لتمكين الأطفال وعائلاتهم.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col items-center p-6 text-center"
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 border-4 border-[#0D4B8E]/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-[#2DBCC3] text-sm font-semibold mb-4">
                  {member.role}
                </p>
                <a
                  href={member.linkedin}
                  className="w-8 h-8 rounded-full bg-[#0D4B8E]/5 flex items-center justify-center text-[#0D4B8E] hover:bg-[#0D4B8E] hover:text-white transition-all cursor-pointer"
                  aria-label={`LinkedIn Profile of ${member.name}`}
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-l from-[#0D4B8E] to-[#2DBCC3] rounded-[2.5rem] p-10 sm:p-16 text-center shadow-xl relative overflow-hidden"
        >
          {/* Design Overlay */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight">
              كفالتك تصنع لهم غداً أفضل وعيشاً كريماً
            </h2>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed">
              كل سهم عطاء مهما كان بسيطاً يساهم مباشرة في دفع عجلة التعليم
              ورعاية الأيتام. تفضل بالتسجيل الآن وابدأ رحلتك الإنسانية
              الاستثنائية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-[#0D4B8E] text-[15px] font-black py-3.5 px-10 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
              >
                إنشاء حساب جديد
              </Link>
              <Link
                to="/login"
                className="border border-white hover:bg-white/10 text-white text-[15px] font-bold py-3.5 px-8 rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
