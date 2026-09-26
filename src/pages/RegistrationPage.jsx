import { useState, useMemo } from "react";
import { FaCheckCircle, FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FiCheck, FiShield, FiBarChart2, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { authApi } from "../services/authApi";
import { PALESTINIAN_CITIES } from "../config/cities";

import logo from "../assets/title.png";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import guardianIcon from "../assets/guardian-icon.png";
import sponsorIcon from "../assets/sponsor-icon.png";

/* ─────────────────── Helpers ─────────────────── */

function FieldLabel({ children, required }) {
  return (
    <label className="block text-sm font-semibold text-slate-700 mb-1.5 text-right">
      {children}
      {required && <span className="text-red-500 mx-1">*</span>}
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 text-right mt-1.5 font-medium">{message}</p>;
}

function inputClass(error) {
  return `w-full border-2 rounded-xl p-3 text-sm text-slate-800 bg-white outline-none transition-all duration-200 ${error
    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
    : "border-slate-200 focus:border-[#1565c0] focus:ring-4 focus:ring-[#1565c0]/10"
    }`;
}

/* ─────────────────── Steps Config ─────────────────── */

const STEPS = [
  { id: 1, label: "نوع الحساب" },
  { id: 2, label: "المعلومات الشخصية" },
  { id: 3, label: "كلمة المرور" },
];

/* ─────────────────── Components ─────────────────── */


function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative z-20 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm sm:h-20 sm:px-8">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-3 rounded-xl outline-none transition-opacity hover:opacity-80 focus-visible:ring-4 focus-visible:ring-[#1258a6]/10"
        aria-label="العودة إلى الصفحة الرئيسية"
      >
        <img
          src={logo}
          alt="شعار كفيلي"
          className="h-20 object-contain sm:h-18"
        />

        <span className="hidden text-xl font-extrabold text-[#1258a6] sm:block sm:text-2xl">
          كفيلي
        </span>
      </button>

      <div className="flex items-center gap-2.5 sm:gap-4">
        <span className="hidden text-sm font-semibold text-slate-500 md:block">
          لديك حساب بالفعل؟
        </span>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#1258a6]/10 px-3.5 py-2 text-xs font-bold text-[#1258a6] transition-all hover:bg-[#1258a6]/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1258a6]/10 sm:px-5 sm:py-2.5 sm:text-sm"
        >
          تسجيل الدخول
          <FaArrowLeft className="text-[11px] sm:text-xs" />
        </button>
      </div>
    </header>
  );
}

function Sidebar() {
  const features = [
    {
      icon: <FiShield />,
      title: "تحقق أمني عالي",
      desc: "هوية موثقة ومعتمدة بالكامل لضمان الأمان والنزاهة",
      iconColor: "text-teal-300",
    },
    {
      icon: <FiBarChart2 />,
      title: "تقارير دورية شفافة",
      desc: "تابع أثر دعمك مع توثيق مستمر وواضح",
      iconColor: "text-blue-300",
    },
  ];

  return (
    <aside
      className="
        relative w-full shrink-0 overflow-hidden
        bg-gradient-to-br from-[#071e35] via-[#0a3259] to-[#0d4b8e]
        lg:h-full lg:w-[400px] xl:w-[400px]
      "
    >
      {/* Background Overlays */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_15%_85%,rgba(45,188,195,0.16)_0%,transparent_48%),radial-gradient(ellipse_at_85%_10%,rgba(99,102,241,0.12)_0%,transparent_45%),radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.035)_0%,transparent_68%)]
        "
      />

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -right-20 top-1/3 h-56 w-56 rounded-full bg-[#2DBCC3]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#1565c0]/15 blur-3xl" />

      <div
        className="
          relative z-10 mx-auto flex w-full max-w-7xl flex-col
          px-5 py-6 sm:px-7 sm:py-8
          lg:h-full lg:px-8 lg:py-8
          xl:px-9 xl:py-9
        "
      >
        {/* =========================
            BRAND
        ========================== */}
        <div className="shrink-0">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div
              className="
                flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl
                border border-white/15 bg-white/10 p-2.5
                shadow-lg shadow-black/10 backdrop-blur-md
                sm:h-14 sm:w-14 
              "
            >
              <img
                src={logo}
                alt="شعار كفيلي"
                className=" h-full w-full object-contain scale-170"
              />
            </div>

            <div className="min-w-0">
              <span className="block text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                كفيلي
              </span>

              <span className="mt-3 block text-[11px] font-medium text-white/55 sm:text-xs">
                منصة رعاية الأيتام
              </span>
            </div>
          </div>

          {/* Badge */}
          <div
            className="
              mt-5 inline-flex items-center gap-2 rounded-full
              border border-white/10 bg-white/[0.07]
              px-3.5 py-1.5
              text-[11px] font-semibold text-white/85
              backdrop-blur-md sm:text-xs
            "
          >
            <span
              className="
                h-2 w-2 shrink-0 rounded-full bg-emerald-400
                animate-pulse
                shadow-[0_0_10px_rgba(52,211,153,0.55)]
              "
            />

            مساحة آمنة وموثوقة للكفالة
          </div>
        </div>

        {/* =========================
            MAIN MESSAGE
        ========================== */}
        <div
          className="
            py-7 sm:py-8
            lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:py-10
          "
        >
          <div className="max-w-xl lg:max-w-none">
            <h2
              className="
                text-[27px] font-extrabold leading-[1.35] text-white
                sm:text-3xl
                xl:text-[34px]
              "
            >
              خطوة واحدة
              <br />

              <span
                className="
                  bg-gradient-to-r from-teal-300 via-teal-400 to-emerald-400
                  bg-clip-text text-transparent
                "
              >
                لنصنع الفرق
              </span>
            </h2>

            <p
              className="
                mt-3.5 max-w-md
                text-[13px] font-medium leading-7 text-white/65
                sm:text-sm
              "
            >
              انضم إلى آلاف الكفلاء الذين يمنحون الأيتام في فلسطين حياة كريمة
              ومستقبلاً أكثر أمانًا.
            </p>
          </div>
        </div>

        {/* =========================
            FEATURES
        ========================== */}
        <div
          className="
            grid shrink-0 grid-cols-1 gap-3
            sm:grid-cols-3 sm:gap-3
            lg:grid-cols-1 lg:gap-3.5
          "
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25 + i * 0.1,
                duration: 0.45,
              }}
              className="
                group flex min-w-0 items-center gap-3
                rounded-2xl border border-white/10
                bg-white/[0.055] p-3
                backdrop-blur-sm
                transition-all duration-300

                hover:-translate-y-0.5
                hover:border-white/20
                hover:bg-white/[0.09]

                sm:flex-col sm:items-start sm:p-3.5
                lg:flex-row lg:items-center lg:p-3.5
              "
            >
              <div
                className={`
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl bg-white/[0.08]
                  text-lg ${f.iconColor}
                  transition-transform duration-300
                  group-hover:scale-105
                `}
              >
                {f.icon}
              </div>

              <div className="min-w-0">
                <h4
                  className="
                    text-xs font-extrabold text-white
                    sm:text-[13px]
                    lg:text-sm
                  "
                >
                  {f.title}
                </h4>

                <p
                  className="
                    mt-0.5 text-[10px] font-medium
                    leading-5 text-white/50
                    sm:text-[10px]
                    lg:text-[11px]
                  "
                >
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* =========================
            BOTTOM MICRO UI
        ========================== */}
        <div
          className="
            mt-4 hidden shrink-0 items-center gap-2
            border-t border-white/10 pt-4
            lg:flex
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#2DBCC3]" />

          <span className="text-[11px] font-medium text-white/45">
            خصوصية • وضوح • متابعة
          </span>
        </div>
      </div>
    </aside>
  );
}

function Stepper({ current, completedSteps }) {
  return (
    <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto mb-10 z-0 px-2">
      <div className="absolute top-1/2 right-0 left-0 h-[2px] bg-slate-200 -z-10 -translate-y-1/2" />
      {STEPS.map((step) => {
        const isCompleted = completedSteps.includes(step.id);
        const isCurrent = current === step.id;

        return (
          <div key={step.id} className="flex items-center gap-2 sm:gap-3 bg-white px-1 sm:px-3 z-10">
            <div
              className={`flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-full text-sm sm:text-base font-bold shrink-0 transition-all duration-300 ${isCurrent
                ? "bg-[#1258a6] text-white ring-[6px] ring-[#1258a6]/20"
                : isCompleted
                  ? "bg-emerald-500 text-white ring-[6px] ring-emerald-500/20"
                  : "border-2 border-slate-300 text-slate-400 bg-white"
                }`}
            >
              {isCompleted ? <FiCheck strokeWidth={3} /> : step.id}
            </div>
            <span
              className={`text-xs sm:text-sm md:text-base font-bold whitespace-nowrap transition-colors duration-300 hidden sm:block ${isCurrent ? "text-slate-800" : isCompleted ? "text-emerald-600" : "text-slate-400"
                }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────── MAIN COMPONENT ─────────────────── */

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selected, setSelected] = useState("");
  const [roleError, setRoleError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandFatherName: "",
    familyName: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const passwordVal = formData.password || "";
  const hasMinLength = passwordVal.length >= 8;
  const hasUppercase = /[A-Z]/.test(passwordVal);
  const hasLowercase = /[a-z]/.test(passwordVal);
  const hasNumberOrSpecial = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(passwordVal);

  const accountTypeMap = {
    sponsor: 1,
    guardian: 2,
  };

  const roles = [
    {
      id: "sponsor",
      title: "كفيل / متبرع",
      desc: "أريد دعم الأيتام والأسر المحتاجة",
      icon: sponsorIcon,
      tags: ["كفالة شهرية", "متابعة اليتيم", "تقارير دورية"],
    },
    {
      id: "guardian",
      title: "وصي / مسؤول",
      desc: "أقوم بإدارة بيانات الأيتام أو الأسر",
      icon: guardianIcon,
      tags: ["إدارة الملفات", "متابعة التبرعات", "إصدار التقارير"],
    },
  ];

  const completedSteps = useMemo(() => {
    const done = [];
    if (selected) done.push(1);
    if (
      formData.firstName &&
      formData.fatherName &&
      formData.grandFatherName &&
      formData.familyName &&
      formData.email &&
      formData.phone &&
      formData.city &&
      formData.gender &&
      formData.birthDate
    )
      done.push(2);
    return done;
  }, [selected, formData]);

  /* ── handlers ── */

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "", api: "" }));
  }

  function validateStep1() {
    if (!selected) {
      setRoleError("يرجى اختيار نوع الحساب");
      return false;
    }
    setRoleError("");
    return true;
  }

  function validateStep2() {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "الاسم الأول مطلوب";
    if (!formData.fatherName.trim()) newErrors.fatherName = "اسم الأب مطلوب";
    if (!formData.grandFatherName.trim()) newErrors.grandFatherName = "اسم الجد مطلوب";
    if (!formData.familyName.trim()) newErrors.familyName = "اسم العائلة مطلوب";
    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!/^\+9705[69]\d{7}$/.test(formData.phone.trim())) {
      newErrors.phone = "يجب أن يكون بالصيغة +97056XXXXXXX أو +97059XXXXXXX";
    }
    if (!formData.city) newErrors.city = "المدينة مطلوبة";
    if (!formData.gender) newErrors.gender = "الجنس مطلوب";
    if (!formData.birthDate) newErrors.birthDate = "تاريخ الميلاد مطلوب";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep3() {
    const newErrors = {};
    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumberOrSpecial) {
      newErrors.password = "كلمة المرور يجب أن تستوفي جميع المتطلبات الموضحة";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور وتأكيد كلمة المرور غير متطابقتين";
    }
    if (!acceptTerms) {
      newErrors.acceptTerms = "يجب الموافقة على الشروط والأحكام وسياسة الخصوصية للمتابعة";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, 3));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  /* ── submit ── */

  function extractErrors(data) {
    if (!data) return "";
    if (Array.isArray(data.errors) && data.errors.length > 0) return data.errors.join("\n");
    if (data.errors && typeof data.errors === "object") return Object.values(data.errors).flat().join("\n");
    if (typeof data.errors === "string") return data.errors;
    if (data.message) return data.message;
    if (data.title) return data.title;
    return "";
  }

  function getApiErrorMessage(error) {
    const data = error.response?.data;
    if (!data) return error.message || "حدث خطأ في الاتصال بالخادم";
    return extractErrors(data) || "فشل إنشاء الحساب، حاول مرة أخرى";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrors((prev) => ({ ...prev, api: "" }));

    if (!validateStep3()) return;

    const accountType = accountTypeMap[selected];
    if (!accountType) {
      setRoleError("نوع الحساب غير صحيح");
      setStep(1);
      return;
    }

    const registerPayload = {
      accountType,
      firstName: formData.firstName.trim(),
      fatherName: formData.fatherName.trim(),
      grandfatherName: formData.grandFatherName.trim(),
      familyName: formData.familyName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone.trim(),
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      dateOfBirth: `${formData.birthDate}T00:00:00`,
      gender: formData.gender === "ذكر" ? 1 : 2,
      city: formData.city,
      country: "فلسطين",
    };

    try {
      setIsSubmitting(true);
      const result = await authApi.register(registerPayload);

      if (result?.success !== true) {
        setErrors((prev) => ({
          ...prev,
          api: extractErrors(result) || "فشل إنشاء الحساب",
        }));
        return;
      }

      localStorage.setItem("pendingVerificationEmail", formData.email.trim());
      navigate("/verify-email", { state: { email: formData.email.trim() } });
    } catch (error) {
      setErrors((prev) => ({ ...prev, api: getApiErrorMessage(error) }));
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ── animation variants ── */

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const stepSubtitles = {
    1: "اختر نوع حسابك للبدء",
    2: "أدخل معلوماتك الشخصية بدقة",
    3: "أنشئ كلمة مرور آمنة لحسابك",
  };

  /* ─────────────────── RENDER ─────────────────── */

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-cairo lg:h-screen" dir="rtl">

      {/* ═══ Global Header ═══ */}
      <Header />

      {/* ═══ Main Layout ═══ */}
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row lg:overflow-hidden">

        {/* ═══ Right Side: Sidebar ═══ */}
        <Sidebar />

        {/* ═══ Left Side: Scrollable Form ═══ */}
        <main className="flex min-w-0 flex-1 flex-col bg-white p-4 sm:p-6 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:p-8">

          <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-2 sm:py-4 lg:py-6">

            {/* Form Header */}
            <div className="text-center mb-8">
              <motion.h1
                key={step}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2"
              >
                إنشاء حساب جديد
              </motion.h1>
              <motion.p
                key={`sub-${step}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 font-medium"
              >
                {stepSubtitles[step]}
              </motion.p>
            </div>

            {/* Stepper */}
            <Stepper current={step} completedSteps={completedSteps} />

            {/* Form Content */}
            <form onSubmit={handleSubmit} noValidate className="w-full">
              <AnimatePresence mode="wait" custom={direction}>

                {/* ═══ Step 1: Account Type ═══ */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col gap-4"
                  >
                    <p className="font-semibold text-slate-700 text-base">من أنت؟ اختر الوصف الذي ينطبق عليك:</p>

                    <div className="flex flex-col gap-4">
                      {roles.map((role) => {
                        const isSelected = selected === role.id;
                        return (
                          <button
                            type="button"
                            key={role.id}
                            onClick={() => {
                              setSelected(role.id);
                              setRoleError("");
                              setErrors((prev) => ({ ...prev, api: "" }));
                            }}
                            className={`flex flex-col gap-3 p-5 sm:p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 relative text-right ${isSelected
                              ? "border-[#1565c0] bg-blue-50/50 shadow-lg shadow-blue-900/5 scale-[1.02]"
                              : "border-slate-200 bg-white hover:border-[#1565c0]/40 hover:-translate-y-1 hover:shadow-md"
                              }`}
                          >
                            <div className="flex items-center gap-4">
                              <img src={role.icon} alt={role.title} className="w-10 h-10 object-contain" />
                              <span className="text-lg font-bold text-slate-800 flex-1">{role.title}</span>
                              <div
                                className={`w-6 h-6 rounded-full border-[2.5px] flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-[#1565c0]" : "border-slate-300"
                                  }`}
                              >
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-3 h-3 rounded-full bg-[#1565c0]"
                                  />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-slate-500 font-medium">{role.desc}</p>
                            <div className="flex gap-2 flex-wrap mt-1">
                              {role.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-xs px-3 py-1 rounded-full font-bold border transition-colors ${isSelected
                                    ? "bg-[#1565c0]/10 text-[#1565c0] border-[#1565c0]/20"
                                    : "bg-slate-50 text-slate-500 border-slate-200"
                                    }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {roleError && <p className="text-sm text-red-500 font-bold mt-2">{roleError}</p>}
                  </motion.div>
                )}

                {/* ═══ Step 2: Personal Info ═══ */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>الاسم الأول</FieldLabel>
                        <input
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="محمد"
                          className={inputClass(errors.firstName)}
                          disabled={isSubmitting}
                        />
                        <FieldError message={errors.firstName} />
                      </div>
                      <div>
                        <FieldLabel required>اسم الأب</FieldLabel>
                        <input
                          name="fatherName"
                          type="text"
                          value={formData.fatherName}
                          onChange={handleChange}
                          placeholder="أحمد"
                          className={inputClass(errors.fatherName)}
                          disabled={isSubmitting}
                        />
                        <FieldError message={errors.fatherName} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>اسم الجد</FieldLabel>
                        <input
                          name="grandFatherName"
                          type="text"
                          value={formData.grandFatherName}
                          onChange={handleChange}
                          placeholder="محمود"
                          className={inputClass(errors.grandFatherName)}
                          disabled={isSubmitting}
                        />
                        <FieldError message={errors.grandFatherName} />
                      </div>
                      <div>
                        <FieldLabel required>اسم العائلة</FieldLabel>
                        <input
                          name="familyName"
                          type="text"
                          value={formData.familyName}
                          onChange={handleChange}
                          placeholder="الأسعد"
                          className={inputClass(errors.familyName)}
                          disabled={isSubmitting}
                        />
                        <FieldError message={errors.familyName} />
                      </div>
                    </div>

                    <div>
                      <FieldLabel required>البريد الإلكتروني</FieldLabel>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                        className={inputClass(errors.email)}
                        disabled={isSubmitting}
                      />
                      <FieldError message={errors.email} />
                    </div>

                    <div>
                      <FieldLabel required>رقم الهاتف</FieldLabel>
                      <div
                        className={`flex items-stretch border-2 rounded-xl overflow-hidden transition-all duration-200 bg-white ${errors.phone
                          ? "border-red-400 focus-within:border-red-500 focus-within:ring-4 focus-within:ring-red-500/10"
                          : "border-slate-200 focus-within:border-[#1565c0] focus-within:ring-4 focus-within:ring-[#1565c0]/10"
                          }`}
                      >
                        <span className="flex items-center justify-center px-4 bg-slate-50 border-l-2 border-slate-200 text-slate-500 font-bold text-sm select-none shrink-0">
                          +970
                        </span>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="591234567"
                          className="flex-1 p-3 text-sm text-slate-800 outline-none w-full"
                          disabled={isSubmitting}
                        />
                      </div>
                      <FieldError message={errors.phone} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel required>تاريخ الميلاد</FieldLabel>
                        <input
                          name="birthDate"
                          type="date"
                          value={formData.birthDate}
                          onChange={handleChange}
                          className={inputClass(errors.birthDate)}
                          disabled={isSubmitting}
                        />
                        <FieldError message={errors.birthDate} />
                      </div>
                      <div>
                        <FieldLabel required>الجنس</FieldLabel>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={inputClass(errors.gender)}
                          disabled={isSubmitting}
                        >
                          <option value="" hidden>اختر</option>
                          <option value="ذكر">ذكر</option>
                          <option value="أنثى">أنثى</option>
                        </select>
                        <FieldError message={errors.gender} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <FieldLabel>الدولة</FieldLabel>
                        <input
                          type="text"
                          value="فلسطين"
                          disabled
                          className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm text-slate-400 bg-slate-50 cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <FieldLabel required>المدينة - قطاع غزة</FieldLabel>
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={inputClass(errors.city)}
                          disabled={isSubmitting}
                        >
                          <option value="" hidden>اختر المدينة</option>
                          {PALESTINIAN_CITIES.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                        <FieldError message={errors.city} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ═══ Step 3: Password ═══ */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="flex flex-col gap-6"
                  >
                    <div>
                      <FieldLabel required>كلمة المرور</FieldLabel>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="أدخل كلمة مرور قوية"
                          className={`${inputClass(errors.password)} pl-11`}
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors"
                          disabled={isSubmitting}
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <FieldError message={errors.password} />

                      {/* Password requirements */}
                      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-bold text-slate-700 mb-3">متطلبات كلمة المرور:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            { ok: hasMinLength, text: "8 أحرف على الأقل" },
                            { ok: hasUppercase, text: "أحرف كبيرة (A-Z)" },
                            { ok: hasLowercase, text: "أحرف صغيرة (a-z)" },
                            { ok: hasNumberOrSpecial, text: "أرقام أو رموز خاصة" },
                          ].map((req) => (
                            <div key={req.text} className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                              {req.ok ? (
                                <FaCheckCircle className="text-emerald-500 text-sm shrink-0" />
                              ) : (
                                <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 bg-white shrink-0" />
                              )}
                              <span className={req.ok ? "text-emerald-700" : ""}>
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <FieldLabel required>تأكيد كلمة المرور</FieldLabel>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          type={showConfirm ? "text" : "password"}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="أعد كتابة كلمة المرور"
                          className={`${inputClass(errors.confirmPassword)} pl-11`}
                          disabled={isSubmitting}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors"
                          disabled={isSubmitting}
                        >
                          {showConfirm ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      <FieldError message={errors.confirmPassword} />
                    </div>

                    {/* Account summary */}
                    <div className="border-2 border-slate-200 rounded-xl overflow-hidden mt-2">
                      <div className="flex items-center justify-between p-3.5 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-sm font-bold text-slate-800">ملخص الحساب</h3>
                        <button
                          type="button"
                          onClick={() => { setDirection(-1); setStep(1); }}
                          className="text-xs font-bold text-[#1565c0] hover:text-blue-900 underline transition-colors"
                        >
                          تعديل
                        </button>
                      </div>
                      <div className="flex flex-col gap-2 p-4 text-sm bg-white">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="text-slate-500 font-semibold min-w-[110px]">نوع الحساب:</span>
                          <span className="text-slate-800 font-bold">
                            {selected === "sponsor" ? "كفيل / متبرع" : "وصي / مسؤول"}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="text-slate-500 font-semibold min-w-[110px]">الاسم:</span>
                          <span className="text-slate-800 font-bold">
                            {formData.firstName} {formData.fatherName} {formData.familyName}
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="text-slate-500 font-semibold min-w-[110px]">البريد الإلكتروني:</span>
                          <span className="text-slate-800 font-bold">{formData.email}</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="text-slate-500 font-semibold min-w-[110px]">الهاتف:</span>
                          <span className="text-slate-800 font-bold" dir="ltr">+970 {formData.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="mt-2">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          checked={acceptTerms}
                          onChange={(e) => {
                            setAcceptTerms(e.target.checked);
                            if (e.target.checked) setErrors((prev) => ({ ...prev, acceptTerms: "" }));
                          }}
                          className="mt-1 w-4 h-4 text-[#1565c0] border-gray-300 rounded focus:ring-[#1565c0] cursor-pointer shrink-0"
                        />
                        <label htmlFor="acceptTerms" className="text-sm text-slate-600 font-medium cursor-pointer leading-relaxed select-none">
                          أوافق على{" "}
                          <button
                            type="button"
                            onClick={() => setShowPrivacyModal(true)}
                            className="text-[#1565c0] font-bold hover:underline mx-1"
                          >
                            الشروط والأحكام
                          </button>{" "}
                          و{" "}
                          <button
                            type="button"
                            onClick={() => setShowPrivacyModal(true)}
                            className="text-[#1565c0] font-bold hover:underline mx-1"
                          >
                            سياسة الخصوصية
                          </button>
                        </label>
                      </div>
                      <FieldError message={errors.acceptTerms} />
                    </div>

                    {errors.api && (
                      <pre className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-4 whitespace-pre-wrap font-cairo">
                        {errors.api}
                      </pre>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ═══ Navigation Buttons ═══ */}
              <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-10">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={goBack}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-slate-600 bg-white border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all"
                    disabled={isSubmitting}
                  >
                    <FaArrowRight className="text-sm" />
                    رجوع
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-l from-[#1258a6] to-[#1565c0] shadow-lg shadow-[#1565c0]/20 hover:shadow-xl hover:shadow-[#1565c0]/30 hover:-translate-y-0.5 transition-all"
                  >
                    التالي
                    <FaArrowLeft className="text-sm" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full sm:flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-l from-[#1258a6] to-[#1565c0] transition-all ${isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "shadow-lg shadow-[#1565c0]/20 hover:shadow-xl hover:shadow-[#1565c0]/30 hover:-translate-y-0.5"
                      }`}
                  >
                    {isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
                    {!isSubmitting && <FiCheck className="text-lg" />}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Footer */}
          <footer className="mt-6 flex flex-col items-center gap-3 border-t border-slate-100 pt-5 sm:mt-8 sm:pt-6">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-xs font-semibold text-slate-400 hover:text-[#1565c0] transition-colors">اتصل بنا</a>
              <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-xs font-semibold text-slate-400 hover:text-[#1565c0] transition-colors">
                الشروط والأحكام
              </button>
              <button type="button" onClick={() => setShowPrivacyModal(true)} className="text-xs font-semibold text-slate-400 hover:text-[#1565c0] transition-colors">
                سياسة الخصوصية
              </button>
            </div>
            <p className="text-xs text-slate-400">
              &copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة
            </p>
          </footer>
        </main>
      </div>

      {/* Privacy Modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
        onAccept={() => {
          setAcceptTerms(true);
          setErrors((prev) => ({ ...prev, acceptTerms: "" }));
        }}
      />
    </div>
  );
}