import React, { useEffect, useState } from "react";

import {
  FiBarChart2,
  FiUserCheck,
  FiBell,
  FiLock,
  FiCreditCard,
  FiFileText,
  FiClipboard,
  FiSearch,
  FiUsers,
  FiHome,
  FiAlertTriangle,
  FiSun,
  FiRefreshCw,
  FiStar,
  FiTarget,
  FiMenu,
  FiX,
} from "react-icons/fi";
function KafeeliPresentation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showFeatures, setShowFeatures] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowFeatures(true);
        }
      },
      {
        threshold: 0.2,
      },
    );

    const section = document.getElementById("features");

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);
  const menuItems = [
    {
      id: "home",
      name: "الرئيسية",
      icon: FiHome,
    },
    {
      id: "problem",
      name: "المشكلة",
      icon: FiAlertTriangle,
    },
    {
      id: "solution",
      name: "الحل",
      icon: FiSun,
    },
    {
      id: "how",
      name: "كيف يعمل؟",
      icon: FiRefreshCw,
    },
    {
      id: "features",
      name: "المميزات",
      icon: FiStar,
    },
    {
      id: "target",
      name: "الفئة المستهدفة",
      icon: FiTarget,
    },
    {
      id: "criteria",
      name: "معايير الاستهداف",
      icon: FiTarget,
    },
  ];
  return (
    <div className="min-h-screen bg-[#E8F0EF]">
      <button
        onClick={() => setIsMenuOpen(true)}
        className="
          fixed
          right-5
          top-5
          z-[60]
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-[#345653]
          text-white
          shadow-lg
          md:hidden
        "
      >
        <FiMenu size={24} />
      </button>
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            md:hidden
          "
        />
      )}
      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-[280px]
          bg-[#345653]
          transition-all
          duration-500
          ease-in-out
overflow-y-auto
          ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "-translate-x-full opacity-0 md:translate-x-0 md:opacity-100"
          }
        `}
      >
        {" "}
        <div className="mb-6 flex justify-end px-4 pt-4 md:hidden">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white/10
              text-white
            "
          >
            <FiX size={22} />
          </button>
        </div>{" "}
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-[#D9A441] bg-white">
            <img
              src="/logo_square.png"
              alt="Kafeeli Logo"
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className="mt-3 text-lg font-semibold text-white">Kafeeli</h2>

          <p className="mt-1 text-xs text-gray-300">kafeeli@example.com</p>
        </div>
        <nav className="mt-8 flex flex-col gap-1 px-4">
          <a
            href="#home"
            className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 ${
              activeSection === "home"
                ? "bg-[#F2F4F0] text-[#345653]"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            <FiHome size={20} />
            <span>الرئيسية</span>
          </a>{" "}
          <a
            href="#problem"
            className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 ${
              activeSection === "problem"
                ? "bg-[#F2F4F0] text-[#345653]"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            <FiAlertTriangle size={20} />
            <span>المشكلة</span>
          </a>{" "}
          <a
            href="#solution"
            className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 ${
              activeSection === "solution"
                ? "bg-[#F2F4F0] text-[#345653]"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            <FiSun size={20} />
            <span>الحل</span>
          </a>{" "}
          <a
            href="#how"
            className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 ${
              activeSection === "how"
                ? "bg-[#F2F4F0] text-[#345653]"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            <FiRefreshCw size={20} />
            <span>كيف يعمل؟</span>
          </a>{" "}
          <a
            href="#features"
            className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 ${
              activeSection === "features"
                ? "bg-[#F2F4F0] text-[#345653]"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            <FiStar size={20} />
            <span>المميزات</span>
          </a>{" "}
          <a
            href="#target"
            className={`flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-300 ${
              activeSection === "target"
                ? "bg-[#F2F4F0] text-[#345653]"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            <FiTarget size={20} />
            <span>الفئة المستهدفة</span>
          </a>
          <a
            href="#criteria"
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center gap-3 rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
              activeSection === "criteria"
                ? "bg-[#F2F4F0] text-[#345653]"
                : "text-gray-200 hover:bg-white/10"
            }`}
          >
            <FiTarget size={18} />
            <span>معايير الاستهداف</span>
          </a>
        </nav>
      </aside>
      <main
        className="
          min-h-screen
          px-5
          pt-20
          md:ml-[310px]
          md:px-10
          md:pt-10
        "
      >
        <section
          id="home"
          className="
            flex
            min-h-screen
            items-center
            px-2
            py-16
            md:px-10
          "
        >
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold leading-tight text-[#345653]">
              كفيلي
              <br />
              الشفافية تبدأ من هنا
            </h1>

            <p className="mt-6 text-xl leading-8 text-gray-600">
              من الكفيل إلى الوصي، بوضوح وثقة.
            </p>

            <p className="mt-4 max-w-2xl leading-7 text-gray-500">
              منصة تهدف إلى تنظيم رحلة الكفالة وربط الكفيل والوصي بطريقة أوضح
              وأكثر شفافية.
            </p>
          </div>
        </section>{" "}
        <section
          id="problem"
          className="flex min-h-screen items-center px-6 py-16 md:px-10"
        >
          <div className="w-full max-w-5xl">
            <h2 className="text-4xl font-bold text-[#345653]">أين المشكلة؟</h2>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="text-[#D9A441]">
                  <FiClipboard size={32} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#345653]">
                  البيانات المتفرقة
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  صعوبة تنظيم بيانات الكفالات والمتابعة عندما تكون المعلومات
                  موزعة بين أكثر من وسيلة.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="text-[#D9A441]">
                  <FiSearch size={32} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#345653]">
                  ضعف المتابعة
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  صعوبة متابعة رحلة الكفالة ومعرفة تفاصيلها بشكل واضح ومنظم.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="text-[#D9A441]">
                  <FiUsers size={32} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#345653]">
                  الحاجة للثقة
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  الكفيل يحتاج إلى تجربة أوضح ومعلومات منظمة تساعده على بناء
                  الثقة.
                </p>
              </div>
            </div>
          </div>
        </section>{" "}
        {/* Solution Section */}
        <section
          id="solution"
          className="flex min-h-screen items-center bg-[#DDE9E7] px-6 py-16 md:px-10"
        >
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold text-[#345653] md:text-4xl">
              كفيلي
            </h2>

            <p className="mt-6 text-xl leading-9 text-gray-600">
              منصة رقمية تعمل كوسيط منظم بين الكفيل والوصي، وتهدف إلى جعل رحلة
              الكفالة أكثر وضوحًا وتنظيمًا.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {/* وضوح */}
              <div className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="mb-4 text-[#D9A441]">
                  <FiSun size={30} />
                </div>

                <h3 className="text-xl font-bold text-[#345653]">وضوح</h3>

                <p className="mt-2 text-gray-500">
                  عرض المعلومات المتعلقة بالكفالة بطريقة منظمة.
                </p>
              </div>

              {/* تنظيم */}
              <div className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="mb-4 text-[#D9A441]">
                  <FiRefreshCw size={30} />
                </div>

                <h3 className="text-xl font-bold text-[#345653]">تنظيم</h3>

                <p className="mt-2 text-gray-500">
                  تنظيم رحلة الكفالة ومتابعتها من مكان واحد.
                </p>
              </div>

              {/* توثيق */}
              <div className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="mb-4 text-[#D9A441]">
                  <FiFileText size={30} />
                </div>

                <h3 className="text-xl font-bold text-[#345653]">توثيق</h3>

                <p className="mt-2 text-gray-500">
                  توثيق المعلومات والعمليات المتعلقة بالكفالة.
                </p>
              </div>

              {/* ثقة */}
              <div className="rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="mb-4 text-[#D9A441]">
                  <FiUserCheck size={30} />
                </div>

                <h3 className="text-xl font-bold text-[#345653]">ثقة</h3>

                <p className="mt-2 text-gray-500">
                  تجربة أكثر وضوحًا تساعد على تعزيز الثقة.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* How It Works Section */}
        <section
          id="how"
          className="flex min-h-screen items-center px-6 py-16 md:px-10"
        >
          <div className="w-full max-w-5xl">
            <h2 className="text-3xl font-bold text-[#345653] md:text-4xl">
              كيف يعمل كفيلي؟
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-4">
              {/* Step 1 */}
              <div className="text-center transition-all duration-500 hover:-translate-y-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#345653] text-xl text-white">
                  1
                </div>

                <h3 className="mt-5 font-bold text-[#345653]">
                  اختيار الكفالة
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  يطّلع الكفيل على الحالات المتاحة.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center transition-all duration-500 hover:-translate-y-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#345653] text-xl text-white">
                  2
                </div>

                <h3 className="mt-5 font-bold text-[#345653]">إنشاء الكفالة</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  يختار الكفيل الحالة ويبدأ إجراءات الكفالة.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center transition-all duration-500 hover:-translate-y-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#345653] text-xl text-white">
                  3
                </div>

                <h3 className="mt-5 font-bold text-[#345653]">التوثيق</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  يتم توثيق معلومات وعمليات الكفالة.
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center transition-all duration-500 hover:-translate-y-2">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#345653] text-xl text-white">
                  4
                </div>

                <h3 className="mt-5 font-bold text-[#345653]">المتابعة</h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  يمكن متابعة رحلة الكفالة بشكل أوضح.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="flex min-h-screen items-center bg-[#DDE9E7] px-6 py-16 md:px-10"
        >
          <div className="w-full max-w-5xl">
            <h2 className="text-3xl font-bold text-[#345653] md:text-4xl">
              ماذا يقدم كفيلي؟
            </h2>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {/* حسابات المستخدمين */}
              <div
                className={`rounded-3xl bg-white p-6 shadow-sm transition-all duration-700 ease-out ${
                  showFeatures
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-[#D9A441]">
                  <FiUsers size={36} />
                </div>

                <h3 className="mt-4 font-bold text-[#345653]">
                  حسابات المستخدمين
                </h3>

                <p className="mt-2 text-gray-500">
                  تجربة منظمة للمستخدمين حسب أدوارهم.
                </p>
              </div>

              {/* المتابعة */}
              <div
                className={`rounded-3xl bg-white p-6 shadow-sm transition-all duration-700 delay-100 ease-out ${
                  showFeatures
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-[#D9A441]">
                  <FiBarChart2 size={36} />
                </div>

                <h3 className="mt-4 font-bold text-[#345653]">المتابعة</h3>

                <p className="mt-2 text-gray-500">
                  متابعة الكفالات والبيانات المتعلقة بها.
                </p>
              </div>

              {/* التوثيق */}
              <div
                className={`rounded-3xl bg-white p-6 shadow-sm transition-all duration-700 delay-200 ease-out ${
                  showFeatures
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-[#D9A441]">
                  <FiLock size={36} />
                </div>

                <h3 className="mt-4 font-bold text-[#345653]">التوثيق</h3>

                <p className="mt-2 text-gray-500">
                  تنظيم وتوثيق المعلومات والعمليات.
                </p>
              </div>

              {/* توثيق الدفعات */}
              <div
                className={`rounded-3xl bg-white p-6 shadow-sm transition-all duration-700 delay-300 ease-out ${
                  showFeatures
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-[#D9A441]">
                  <FiCreditCard size={36} />
                </div>

                <h3 className="mt-4 font-bold text-[#345653]">توثيق الدفعات</h3>

                <p className="mt-2 text-gray-500">
                  تنظيم المعلومات المتعلقة بالدفعات.
                </p>
              </div>

              {/* الإشعارات */}
              <div
                className={`rounded-3xl bg-white p-6 shadow-sm transition-all duration-700 delay-[400ms] ease-out ${
                  showFeatures
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-[#D9A441]">
                  <FiBell size={36} />
                </div>

                <h3 className="mt-4 font-bold text-[#345653]">الإشعارات</h3>

                <p className="mt-2 text-gray-500">
                  تسهيل متابعة المستجدات المهمة.
                </p>
              </div>

              {/* التقارير */}
              <div
                className={`rounded-3xl bg-white p-6 shadow-sm transition-all duration-700 delay-[500ms] ease-out ${
                  showFeatures
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <div className="text-[#D9A441]">
                  <FiFileText size={36} />
                </div>

                <h3 className="mt-4 font-bold text-[#345653]">التقارير</h3>

                <p className="mt-2 text-gray-500">
                  عرض البيانات بصورة منظمة تساعد على المتابعة.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="target"
          className="flex min-h-screen items-center px-6 py-16 md:px-10"
        >
          <div className="w-full max-w-5xl">
            <h2 className="text-3xl font-bold text-[#345653] md:text-4xl">
              لمن صُمم كفيلي؟
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              نركز على المؤسسات التي تدير عددًا كبيرًا من حالات الكفالة، وتحتاج
              إلى طريقة أكثر تنظيمًا ووضوحًا لإدارة رحلة الكفيل والوصي.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {/* المؤسسات */}
              <div className="rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDE9E7] text-[#345653]">
                  <FiHome size={24} />
                </div>

                <h3 className="text-xl font-bold text-[#345653]">المؤسسات</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  المؤسسات والجمعيات التي تدير برامج كفالة وتحتاج إلى تنظيم
                  البيانات والمتابعة والتوثيق بطريقة أكثر كفاءة.
                </p>
              </div>

              {/* الكفلاء */}
              <div className="rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDE9E7] text-[#345653]">
                  <FiUserCheck size={24} />
                </div>

                <h3 className="text-xl font-bold text-[#345653]">الكفلاء</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  الكفلاء الذين يريدون تجربة أكثر وضوحًا، ومتابعة أفضل، ومعرفة
                  أين وصلت رحلة الكفالة الخاصة بهم.
                </p>
              </div>

              {/* الأوصياء */}
              <div className="rounded-3xl bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDE9E7] text-[#345653]">
                  <FiUsers size={24} />
                </div>

                <h3 className="text-xl font-bold text-[#345653]">الأوصياء</h3>

                <p className="mt-3 leading-7 text-gray-600">
                  الأوصياء الذين يحتاجون إلى وسيلة منظمة للتواصل وتوثيق
                  المعلومات المتعلقة بحالة الكفالة.
                </p>
              </div>
            </div>

            {/* البداية */}
            <div className="mt-8 rounded-[30px] bg-[#345653] p-8 text-white">
              <h3 className="text-2xl font-bold">نبدأ بشكل بسيط</h3>

              <p className="mt-4 max-w-3xl leading-8 text-gray-200">
                نبدأ مع مؤسسة واحدة وعدد محدود من الحالات، نختبر المنصة، نقيس
                النتائج، ثم نطوّر بناءً على احتياج حقيقي من السوق.
              </p>
            </div>
          </div>
        </section>
        {/* Targeting Criteria */}
        <section
          id="criteria"
          className="flex min-h-screen items-center bg-[#DDE9E7] px-6 py-16 md:px-10"
        >
          <div className="w-full max-w-5xl">
            {/* Header */}
            <div className="mb-10">
              <p className="text-sm font-medium text-[#D9A441]">
                04 / معايير الاستهداف
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#345653] md:text-4xl">
                معايير الاستهداف
              </h2>
            </div>

            {/* Criteria */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* 01 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#345653]">01</span>

                <p className="text-right leading-7 text-gray-600">
                  مؤسسة عندها عدد كويس من الحالات والكفالات.
                </p>
              </div>

              {/* 02 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#D9A441]">02</span>

                <p className="text-right leading-7 text-gray-600">
                  بدها تسهل وتنظم شغلها.
                </p>
              </div>

              {/* 03 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#345653]">03</span>

                <p className="text-right leading-7 text-gray-600">
                  مهتمة تزيد الثقة والشفافية عند الكفلاء.
                </p>
              </div>

              {/* 04 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#D9A441]">04</span>

                <p className="text-right leading-7 text-gray-600">
                  مستعدة تستخدم نظام رقمي.
                </p>
              </div>

              {/* 05 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#345653]">05</span>

                <p className="text-right leading-7 text-gray-600">
                  سهل نوصل لصاحب القرار فيها.
                </p>
              </div>

              {/* 06 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#D9A441]">06</span>

                <p className="text-right leading-7 text-gray-600">
                  عندها قدرة تدفع.
                </p>
              </div>

              {/* 07 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#345653]">07</span>

                <p className="text-right leading-7 text-gray-600">
                  مستعدة تجرب Pilot.
                </p>
              </div>

              {/* 08 */}
              <div className="flex items-center justify-between rounded-3xl bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl font-bold text-[#D9A441]">08</span>

                <p className="text-right leading-7 text-gray-600">
                  احتياجاتها قريبة من الـ MVP الحالي.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default KafeeliPresentation;
