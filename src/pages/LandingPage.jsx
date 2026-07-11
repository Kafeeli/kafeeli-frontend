// LandingPage.jsx
import Header from "./header";
import Footer from "./Footer";
import heroImage from "../assets/smileChildern.jpg";
import orphan1 from "../assets/orphan1.jpg";
import orphan2 from "../assets/orphan2.jpg";
import orphan3 from "../assets/orphan3.jpg";
import orphan4 from "../assets/orphan4.jpg";
import { FaHandHoldingHeart } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaUsers, FaEye, FaShieldAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-right">
            <span className="inline-flex items-center gap-2 bg-[#0D4B8E]/[0.05] text-[#0D4B8E] px-6 py-2.5 rounded-full text-sm font-bold mb-6 border border-[#0D4B8E]/[0.10]">
              <FaHandHoldingHeart className="w-4 h-4" />
              بوابة العطاء الموثوقة
            </span>

            <h1 className="text-4xl lg:text-3xl xl:text-6xl font-bold text-blue-900 leading-tight mb-6">
              معاً لنمنحهم <span className="text-[#2DBCC3]">الأمان </span>والأمل
            </h1>

            <p className="text-[#424750] text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              انضم إلينا في رحلة صناعة الأثر من خلال كفيلي. يمكنك توفير مستقبل
              مشرق لليتيم وتأمين احتياجاته الأساسية بكل شفافية وحب.
            </p>

            <div className="flex  flex-col sm:flex-row gap-4 justify-center lg:justify-start items-stretch sm:items-center">
              <button className="cursor-pointer bg-[#2DBCC3] hover:bg-[#2DBCC3]/90 text-white text-lg font-semibold transition-all active:scale-95 py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl shadow-lg shadow-[#2DBCC3]/20 w-full sm:w-auto">
                ابدأ الكفالة الآن
              </button>

              <button className="bg-white cursor-pointer hover:bg-gray-50 text-[#0D4B8E] text-lg font-semibold transition-all active:scale-95 py-3 sm:py-3.5 px-6 sm:px-10 rounded-xl border-2 border-[#0D4B8E]/10 w-full sm:w-auto whitespace-nowrap">
                تعرف علينا
              </button>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div
              className="rounded-3xl border-[3px] border-white shadow-2xl overflow-hidden"
              style={{ transform: "rotate(-2deg)" }}
            >
              <img
                src={heroImage}
                alt="طفل سعيد"
                className="w-full h-auto object-cover"
                style={{ transform: "rotate(2deg) scale(1.05)" }}
              />
            </div>
            <div
              className="absolute -inset-4 bg-blue-50/50 rounded-[2rem] -z-10 blur-2xl"
              style={{ transform: "rotate(-2deg)" }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-20"
      >
        <div className="lg:bg-[#0D4B8E] lg:rounded-2xl lg:rounded-3xl lg:p-8 lg:p-12 lg:shadow-xl lg:shadow-[#0D4B8E]/20 relative lg:overflow-hidden">
          <div className="hidden lg:block absolute top-0 right-1/4 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2" />

          <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-8 relative lg:z-10">
            {/* 5000+ */}
            <div className="text-center py-2 lg:py-4">
              <div className="flex items-center justify-center gap-0" dir="ltr">
                <span className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-[#0D4B8E] lg:text-white">
                  +
                </span>
                <span className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-[#0D4B8E] lg:text-white">
                  {count3}
                </span>
              </div>
              <div className="text-[#0D4B8E]/70 lg:text-white/80 text-xs sm:text-sm lg:text-base mt-1">
                يتيم مكفول
              </div>
            </div>

            {/* M2+ */}
            <div className="text-center py-2 lg:py-4 border-r border-[#0D4B8E]/10 lg:border-r lg:border-white/20">
              <div className="flex items-center justify-center gap-0" dir="ltr">
                <span className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-[#0D4B8E] lg:text-white">
                  +{count2}
                </span>
                <span className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-[#0D4B8E] lg:text-white">
                  M
                </span>
              </div>
              <div className="text-[#0D4B8E]/70 lg:text-white/80 text-xs sm:text-sm lg:text-base mt-1">
                تبرعات (دولار)
              </div>
            </div>

            {/* 10+ */}
            <div className="text-center py-2 lg:py-4 border-r border-[#0D4B8E]/10 lg:border-r lg:border-white/20">
              <div className="flex items-center justify-center gap-0" dir="ltr">
                <span className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-[#0D4B8E] lg:text-white">
                  +
                </span>
                <span className="text-lg sm:text-xl lg:text-4xl xl:text-5xl font-bold text-[#0D4B8E] lg:text-white">
                  {count1}
                </span>
              </div>
              <div className="text-[#0D4B8E]/70 lg:text-white/80 text-xs sm:text-sm lg:text-base mt-1">
                دول حول العالم
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#F8F9FA] py-10 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* العنوان */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0D4B8E] mb-4">
              لماذا تختار منصة كفيلي؟
            </h2>
            <p className="text-[#424750] text-lg max-w-2xl mx-auto">
              نحن نؤمن بأن الصدقة أمانة، لذلك صممنا نظامنا ليكون الأكثر شفافية
              وأماناً في العالم العربي.
            </p>
          </div>

          {/* الكروت - RTL: الأمان على اليمين */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 lg:p-10 text-center border border-[#C2C6D2] hover:shadow-lg transition-shadow duration-300"
              >
                {/* الأيقونة */}
                <div className="w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center">
                  {feature.icon}
                </div>

                {/* العنوان */}
                <h3 className="text-xl lg:text-2xl font-bold text-[#191C1D] font-semibold mb-4">
                  {feature.title}
                </h3>

                {/* الوصف */}
                <p className="text-[#424750] text-sm lg:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-10 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* العنوان */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
            <div className="text-center lg:text-right mb-6 lg:mb-0">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D4B8E] mb-2">
                أيتام ينتظرون كفالتك
              </h2>
              <p className="text-[#424750] text-lg">
                بضغطة زر واحدة، يمكنك تغيير مسار حياة إنسان بالكامل.
              </p>
            </div>

            <a
              href="#all-orphans"
              className="flex items-center justify-center gap-2 text-[#0D4B8E] font-semibold hover:text-[#2DBCC3] transition-colors"
            >
              عرض كافة الحالات
              <FaArrowLeft className="w-4 h-4" />
            </a>
          </div>

          {/* الكروت */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {orphans.map((orphan) => (
              <div
                key={orphan.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#C2C6D2] hover:shadow-xl transition-shadow duration-300"
              >
                {/* الصورة */}
                <div className="relative h-64 sm:h-72">
                  <img
                    src={orphan.image}
                    alt={orphan.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Badge الموقع */}
                  <span className="absolute top-4 right-4 bg-[#0D4B8E] text-white text-sm px-3 py-1 rounded-full">
                    {orphan.location}
                  </span>
                </div>

                {/* المحتوى */}
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-[#0D4B8E] mb-1">
                    {orphan.name}
                  </h3>
                  <p className="text-[#424750] text-sm mb-6">
                    العمر: {orphan.age}
                  </p>

                  <button className="w-full bg-[#0D4B8E] hover:bg-[#0D4B8E]/90 text-white py-3 rounded-xl font-semibold transition-all active:scale-95 cursor-pointer">
                    اكفلني الآن
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#F8F9FA] py-10 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* العنوان */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0D4B8E]">
              رحلة الكفالة في 3 خطوات
            </h2>
          </div>

          {/* الخطوات */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* الدائرة */}
                <div
                  className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-6 rounded-full flex items-center border border-[#0D4B8E1A] justify-center text-2xl lg:text-3xl font-bold shadow-lg ${step.color}`}
                >
                  {step.number}
                </div>

                {/* العنوان */}
                <h3 className="text-xl lg:text-2xl text-[#191C1D] mb-3 font-semibold">
                  {step.title}
                </h3>

                {/* الوصف */}
                <p className="text-[#424750] text-sm lg:text-base leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#0D4B8E] py-10 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* الأيقونة */}
          <div className="mb-6">
            <FaQuoteRight className="w-10 h-10 lg:w-12 lg:h-12 text-amber-400 mx-auto" />
          </div>

          {/* الاقتباس */}
          <p className="text-white text-2xl lg:text-3xl xl:text-4xl font-bold leading-relaxed mb-10">
            "أنت لا تقدم فقط مالاً، بل تبني إنساناً وتعيد له إيمانه بالمستقبل
            انضم إلينا إلى عائلة كفيلي اليوم"
          </p>

          {/* الأزرار */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <button className="cursor-pointer bg-[#D9A441] hover:bg-[#e5a021] text-white font-bold py-3 px-8 rounded-xl transition-all active:scale-95">
              انضم إلينا الآن
            </button>

            <button className="cursor-pointer bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-xl border border-white/30 transition-all active:scale-95">
              شاهد قصص النجاح
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
