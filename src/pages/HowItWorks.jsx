import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUserPlus, 
  FaSearch, 
  FaFileInvoiceDollar, 
  FaFileUpload, 
  FaShieldAlt, 
  FaHandHoldingHeart, 
  FaFileAlt, 
  FaChevronDown, 
  FaCheckCircle,
  FaLock,
  FaChartLine,
  FaGlobe
} from "react-icons/fa";

import Header from "./header";
import Footer from "./Footer";

export default function HowItWorks() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // 7 Steps Timeline
  const steps = [
    {
      number: "1",
      title: "التسجيل",
      desc: "ملء بياناتك وتفعيل حساب كفيل بشكل آمن وسهل.",
      icon: <FaUserPlus className="w-5 h-5 text-white" />
    },
    {
      number: "2",
      title: "التصفح",
      desc: "استعراض ملفات الحالات المعتمدة واحتياجات الأيتام.",
      icon: <FaSearch className="w-5 h-5 text-white" />
    },
    {
      number: "3",
      title: "التحويل",
      desc: "اختيار اليتيم وتحديد مبلغ وقناة الكفالة المفضلة.",
      icon: <FaFileInvoiceDollar className="w-5 h-5 text-white" />
    },
    {
      number: "4",
      title: "ربط الإيصال",
      desc: "تحميل إثبات التحويل إذا كان الدفع عبر تحويل بنكي.",
      icon: <FaFileUpload className="w-5 h-5 text-white" />
    },
    {
      number: "5",
      title: "التحقق",
      desc: "مراجعة وتدقيق المعاملة وتوثيقها من الإدارة.",
      icon: <FaShieldAlt className="w-5 h-5 text-white" />
    },
    {
      number: "6",
      title: "التنفيذ",
      desc: "إيصال الكفالة مباشرة لحساب عائلة اليتيم دون اقتطاعات.",
      icon: <FaHandHoldingHeart className="w-5 h-5 text-white" />
    },
    {
      number: "7",
      title: "التقارير",
      desc: "تلقّي تحديثات وتقارير دورية موثقة عن حالة اليتيم.",
      icon: <FaFileAlt className="w-5 h-5 text-white" />
    }
  ];

  // Why Choose Us list
  const reasons = [
    {
      title: "الشفافية المطلقة",
      desc: "نشارك معك كل تفصيل يخص كفالتك وحركة المبالغ المستلمة والتقارير المالية.",
      icon: <FaGlobe className="w-6 h-6 text-[#0D4B8E]" />
    },
    {
      title: "أمان البيانات",
      desc: "تشفير وحماية لكافة البيانات والتحويلات المالية مع سرية تامة لملفات الأيتام.",
      icon: <FaLock className="w-6 h-6 text-[#2DBCC3]" />
    },
    {
      title: "تقارير ذكية",
      desc: "لوحة تحكم متطورة وتنبيهات مستمرة تضعك في قلب أثر كفالتك خطوة بخطوة.",
      icon: <FaChartLine className="w-6 h-6 text-[#0D4B8E]" />
    },
    {
      title: "توثيق رسمي",
      desc: "عقود كفالات وضمانات تضمن استمرار الدعم للفئات المستهدفة تحت مظلة قانونية.",
      icon: <FaCheckCircle className="w-6 h-6 text-[#2DBCC3]" />
    }
  ];

  // FAQ List
  const faqs = [
    {
      q: "كيف أضمن وصول مبالغ الكفالة للمستفيدين؟",
      a: "تعتمد كفيلي على التحويل المالي المباشر إلى الحسابات البنكية المعتمدة لعائلات الأيتام أو عبر المحافظ الرقمية المرخصة، دون أي وسيط أو عمولات مخفية. ويتم التحقق من كل عملية وتوثيقها فورياً في لوحة تحكم الكفيل."
    },
    {
      q: "هل يمكنني التواصل مع اليتيم أو ولي أمره؟",
      a: "نعم، تتيح المنصة إرسال الرسائل وبطاقات المعايدة الإلكترونية لليتيم عبر لوحة التحكم تحت إشراف فريق العمل الاجتماعي بالمنصة، بما يحفظ كرامة اليتيم وخصوصية العائلة ويحقق الأثر الوجداني المطلوب."
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#FAFBFD] flex flex-col font-[Cairo,sans-serif] overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0D4B8E]/5 via-[#2DBCC3]/2 to-transparent pt-12 pb-20 lg:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Right Side Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 text-right"
            >
              <span className="inline-flex items-center gap-2 bg-[#2DBCC3]/10 text-[#0D4B8E] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-5 border border-[#2DBCC3]/20">
                فهم آلية عمل التطبيق
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0D4B8E] leading-tight mb-6">
                شفافية تقنية، <br />
                <span className="text-[#2DBCC3]">رحمة إنسانية</span>
              </h1>

              <p className="text-[#75777C] text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
                منصة كفيلي توفر نظاماً بيئياً آمناً ومباشراً يربط قلوب الكفلاء بملفات الأيتام والعائلات الأكثر احتياجاً. باستخدام التكنولوجيا الذكية، نضمن معالجة الكفالات وتوثيق الأثر بأقصى سرعة وشفافية ودون اقتطاعات.
              </p>

              <div className="inline-flex items-center gap-2.5 bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#2DBCC3]/10 flex items-center justify-center text-[#2DBCC3] font-bold">
                  ٣
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-gray-800 text-sm">خطوات بسيطة لتغيير حياة طفل</h4>
                  <p className="text-xs text-gray-500 mt-0.5">تسجيل، تصفح، وتبرع آمن ومباشر.</p>
                </div>
              </div>
            </motion.div>

            {/* Left Side Infographic Illustration (CSS Mockup) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 flex justify-center relative"
            >
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border-[1.5px] border-[#0D4B8E]/15 flex items-center justify-center p-8 bg-white/20 backdrop-blur-md shadow-2xl">
                
                {/* Rotating ring */}
                <div className="absolute inset-4 rounded-full border border-dashed border-[#2DBCC3]/30 animate-[spin_40s_linear_infinite]" />
                
                {/* Central Circle */}
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-[#0D4B8E] flex flex-col items-center justify-center text-center shadow-xl shadow-[#0D4B8E]/25 text-white z-10 border-4 border-white">
                  <FaHandHoldingHeart className="w-8 h-8 sm:w-12 sm:h-12 text-[#2DBCC3] animate-pulse" />
                  <span className="font-black text-xs sm:text-sm mt-2 tracking-wide">نظام كفيلي</span>
                </div>

                {/* Floating Orbiting elements */}
                <div className="absolute top-2 right-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#0D4B8E]">
                  <FaUserPlus className="w-5 h-5" />
                </div>
                <div className="absolute bottom-2 right-1/2 translate-x-1/2 translate-y-1/2 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#2DBCC3]">
                  <FaSearch className="w-5 h-5" />
                </div>
                <div className="absolute left-2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#0D4B8E]">
                  <FaFileInvoiceDollar className="w-5 h-5" />
                </div>
                <div className="absolute right-2 top-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-md flex items-center justify-center text-[#2DBCC3]">
                  <FaShieldAlt className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7 Steps Timeline */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100/60 w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D4B8E] mb-3">
              رحلة الكفيل خطوة بخطوة
            </h2>
            <p className="text-[#75777C] text-sm sm:text-base max-w-xl mx-auto">
              نحن نسهل عليك مسار الخير ونضمن الشفافية والوصول المباشر.
            </p>
          </div>

          {/* Timeline Process */}
          <div className="relative flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-4 mt-8">
            
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-[28px] right-8 left-8 h-[2px] bg-gray-100 -z-0" />

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative flex flex-row lg:flex-col items-start lg:items-center text-right lg:text-center gap-4 lg:gap-3 flex-1 z-10 w-full"
              >
                {/* Step Circle with Icon */}
                <div className="w-14 h-14 rounded-full bg-[#0D4B8E] border-4 border-white shadow-md flex items-center justify-center shrink-0">
                  {step.icon}
                  
                  {/* Step Number Badge */}
                  <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-[#2DBCC3] border border-white text-white text-[10px] font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Text Block */}
                <div>
                  <h4 className="font-extrabold text-gray-800 text-base mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed lg:max-w-[150px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Architecture */}
      <section className="bg-[#FAFBFD] py-16 lg:py-24 border-t border-b border-gray-100/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D4B8E] mb-3">
              هندسة النظام البيئي
            </h2>
            <p className="text-[#75777C] text-sm sm:text-base max-w-xl mx-auto">
              قنوات آمنة، بيانات تحقق، وتأثير مباشر للأطفال وعائلاتهم.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Right two cards */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-2 lg:order-1">
              {/* Card 1 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-right"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0D4B8E]/5 flex items-center justify-center mb-4 text-[#0D4B8E]">
                  <FaFileInvoiceDollar className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-base mb-1">تحقق مالي</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">كشوفات وتقارير مالية دورية مدققة بنسبة 100% لمتابعة تبرعاتك.</p>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-right"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2DBCC3]/10 flex items-center justify-center mb-4 text-[#2DBCC3]">
                  <FaLock className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-base mb-1">البيانات الآمنة</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">تشفير وحماية قصوى لبيانات الكفلاء وهوية الأطفال لضمان سرية كاملة.</p>
              </motion.div>
            </div>

            {/* Central Graphic */}
            <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
              <div className="relative w-48 h-48 rounded-full border-4 border-dashed border-[#2DBCC3]/30 flex items-center justify-center bg-white shadow-xl">
                <div className="w-36 h-36 rounded-full bg-[#0D4B8E] text-white flex flex-col items-center justify-center text-center p-3 border-[6px] border-[#2DBCC3]/10">
                  <span className="font-black text-sm text-center">كفيلي الذكي</span>
                  <span className="text-[10px] text-white/70 mt-1 font-semibold">تأثير رقمي مباشر</span>
                </div>
                {/* Small indicator dots */}
                <div className="absolute top-2 right-4 w-3.5 h-3.5 rounded-full bg-[#2DBCC3] animate-ping" />
              </div>
            </div>

            {/* Left two cards */}
            <div className="lg:col-span-4 flex flex-col gap-6 order-3">
              {/* Card 3 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-right"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0D4B8E]/5 flex items-center justify-center mb-4 text-[#0D4B8E]">
                  <FaChartLine className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-base mb-1">إشعار دائم للأثر</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">تحديثات فورية وتقارير ربع سنوية عن اليتيم تعليمياً وصحياً ونفسياً.</p>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-right"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2DBCC3]/10 flex items-center justify-center mb-4 text-[#2DBCC3]">
                  <FaSearch className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-gray-800 text-base mb-1">البحث والفرز الذكي</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">تصفية وبحث متقدم للوصول للحالات الأكثر احتياجاً بكفاءة بالغة.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 lg:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D4B8E] mb-3">
              لماذا تختار كفيلي؟
            </h2>
            <p className="text-[#75777C] text-sm sm:text-base max-w-xl mx-auto">
              مزايا فريدة صممت خصيصاً لأمان معاملتك وراحة كفالتك.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="w-14 h-14 bg-[#FAFBFD] rounded-xl flex items-center justify-center mb-5 border border-gray-50 shadow-xs">
                  {item.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-[#FAFBFD] py-16 lg:py-24 border-t border-b border-gray-100/50 w-full">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0D4B8E] mb-3">
              هل لديك استفسارات؟
            </h2>
            <p className="text-[#75777C] text-sm sm:text-base max-w-xl mx-auto">
              إليك إجابات لأكثر الأسئلة شيوعاً حول عمل المنصة.
            </p>
          </div>

          {/* Accordion list */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-shadow"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-right font-extrabold text-sm sm:text-base text-gray-800 hover:text-[#0D4B8E] transition-colors cursor-pointer gap-4"
                  >
                    <span>{faq.q}</span>
                    <FaChevronDown 
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#0D4B8E]" : ""
                      }`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-gray-500 text-xs sm:text-sm leading-relaxed border-t border-gray-50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6 leading-tight animate-pulse">
              كن غيثاً يحيي الأمل في نفوسهم
            </h2>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-10 leading-relaxed">
              بمساهمتك المباشرة، تصنع فارقاً حقيقياً في تعليم وصحة أيتام فلسطين.
            </p>
            <div className="flex justify-center">
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-[#0D4B8E] text-[15px] font-black py-3.5 px-10 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-md"
              >
                ابدأ كفالتك الآن
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
