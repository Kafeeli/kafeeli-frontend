import { useState } from "react";
import { useNavigate } from "react-router-dom";
import kafeeli from "../assets/kafeeli.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { TbShieldCheck, TbScan } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FiRefreshCw } from "react-icons/fi";
import { authApi } from "../services/authApi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingVerification, setIsSendingVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function extractMessage(data) {
    if (!data) return "";
    if (data.message) return data.message;
    if (Array.isArray(data.errors) && data.errors.length > 0) return data.errors.join("\n");
    if (data.errors && typeof data.errors === "object") return Object.values(data.errors).flat().join("\n");
    return "";
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!email || !password) {
  //     setErrorMessage("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
  //     return;
  //   }

  //   setErrorMessage("");
  //   setIsSubmitting(true);

  //   try {
  //     const response = await authApi.login({ email, password });

  //     if (response?.success) {
  //       navigate("/landing-page");
  //     } else if (response?.code === "EMAIL_NOT_VERIFIED" || response?.message?.toLowerCase().includes("verify")) {
  //       // إذا البريد غير مفعل، ارسل مباشرة لصفحة email-verified
  //       navigate(`/email-verified?email=${encodeURIComponent(email)}`);
  //     } else {
  //       setErrorMessage(extractMessage(response));
  //     }
  //   } catch (err) {
  //     setErrorMessage(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setErrorMessage("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
    return;
  }

  setErrorMessage("");
  setIsSubmitting(true);

  try {
    const response = await authApi.login({ email, password });

    if (response?.success) {
      // حفظ بيانات الجلسة بالـ localStorage
      // localStorage.setItem("token", response.data.accessToken);
      // localStorage.setItem("refreshToken", response.data.refreshToken);
      // localStorage.setItem("user", JSON.stringify(response.data));

      // const role = response.data?.role?.toLowerCase(); // "guardian" أو "sponsor"

      // if (role === "guardian") {
      //   navigate("/guardian-profile");
      // } else if (role === "sponsor") {
      //   navigate("/main");
      // } else {
      //   navigate("/landing-page");
      // }
      localStorage.setItem("token", response.data.accessToken);
localStorage.setItem("refreshToken", response.data.refreshToken);
localStorage.setItem("user", JSON.stringify(response.data));

// التوجيه حسب نوع الحساب
const role = response.data.role;

if (role === "SuperAdmin" || role === "Admin") {
  navigate("/admin-dashboard/transfer-review");
} else if (role === "Guardian") {
  navigate("/guardian-profile");
} else if (role === "Sponsor") {
  navigate("/sponsorProfile");
} else {
  navigate("/landing-page");
}
    } else if (response?.code === "EMAIL_NOT_VERIFIED" || response?.message?.toLowerCase().includes("verify")) {
      navigate(`/email-verified?email=${encodeURIComponent(email)}`);
    } else {
      setErrorMessage(extractMessage(response));
    }
  } catch (err) {
    setErrorMessage(err.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول، حاول مرة أخرى");
  } finally {
    setIsSubmitting(false);
  }
};
  const handleResendVerification = async () => {
    if (!email) return;
    setIsSendingVerification(true);
    setErrorMessage("");

    try {
      const res = await authApi.sendResendEmailConfirmation({ email });
      setErrorMessage(res?.message || "تم إرسال رابط التحقق بنجاح.");
      setNeedsVerification(false);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "حدث خطأ أثناء إرسال رابط التحقق");
    } finally {
      setIsSendingVerification(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-y-auto">
      <div
        className="hidden md:flex w-1/2 max-md:w-full max-md:min-h-[350px] bg-cover bg-center relative justify-center items-center"
        style={{ backgroundImage: `url(${kafeeli})` }}
      >
        <div className="absolute inset-0 bg-[rgba(0,52,105,0.75)]"></div>
        <div className="relative z-10 text-white text-center w-[70%]">
          <h1 className="text-[40px] pb-5 mb-[15px] text-white font-bold">كفيلي</h1>
          <p className="leading-[1.8] mb-[30px]">
            منصة رائدة تخدم التكنولوجيا والأعمال المستقلة، وتضمن لك أعلى درجات الشفافية والموثوقية.
          </p>
          <div className="flex justify-center gap-[15px]">
            <div className="w-[120px] h-[75px] flex flex-col justify-center items-center rounded-[10px] bg-white/10 border border-cyan-200/25 backdrop-blur-md">
              <TbScan className="text-2xl text-[#5ef0ff] mb-[5px]" />
              <span className="text-xs text-white">الشفافية المالية</span>
            </div>
            <div className="w-[120px] h-[75px] flex flex-col justify-center items-center rounded-[10px] bg-white/10 border border-cyan-200/25 backdrop-blur-md">
              <TbShieldCheck className="text-2xl text-[#5ef0ff] mb-[5px]" />
              <span className="text-xs text-white">أمان تام</span>
            </div>
          </div>
        </div>
      </div>

      <div
        dir="rtl"
        className="w-full md:w-1/2 bg-[#f5f6f8] flex justify-center items-center pt-18 md:pt-0"
      >
        <div className="w-full max-w-[450px] bg-white rounded-2xl px-8 py-10 shadow-lg">
          <h2 className="text-center text-[#003469] mb-2 text-2xl font-bold">تسجيل الدخول</h2>
          <p className="text-center text-[#777] text-[13px] mb-5">
            الرجاء إدخال بياناتك للوصول إلى لوحة التحكم
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-right mb-2 text-[#555] text-sm">البريد الإلكتروني</label>
            <div className="relative mb-[18px]">
              <input
                type="email"
                placeholder="example@domain.com"
                value={email}
                disabled={isSubmitting || isSendingVerification}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                  setNeedsVerification(false);
                }}
                className="w-full h-12 border border-[#d8dbe2] rounded-md bg-[#f5f6fa] pr-[45px] pl-[45px] outline-none focus:border-[#003469] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <MdOutlineMailOutline className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#7d8492] text-lg" />
            </div>

            <label className="block text-right mb-2 text-[#555] text-sm">كلمة المرور</label>
            <div className="relative mb-[18px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                disabled={isSubmitting || isSendingVerification}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                  setNeedsVerification(false);
                }}
                className="w-full h-12 border border-[#d8dbe2] rounded-md bg-[#f5f6fa] pr-[45px] pl-[45px] outline-none focus:border-[#003469] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <LuLock className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#7d8492] text-lg" />
              <button
                type="button"
                disabled={isSubmitting || isSendingVerification}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#7d8492] text-lg cursor-pointer disabled:cursor-not-allowed"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-[#00696E] text-[14px] hover:text-[#008b8b] duration-200 cursor-pointer mb-3"
            >
              نسيت كلمة المرور؟
            </button>

            {needsVerification && (
              <button
                type="button"
                onClick={handleResendVerification}
                disabled={isSendingVerification}
                className="w-full mb-3 h-[45px] bg-blue-600 text-white rounded-md hover:opacity-90 flex items-center justify-center gap-2"
              >
                <FiRefreshCw className="text-xl" />
                {isSendingVerification ? "جارٍ إرسال رابط التحقق..." : "إعادة إرسال رابط التحقق"}
              </button>
            )}

            {errorMessage && (
              <div
                dir="rtl"
                className={`mt-3 border p-3 rounded-md text-sm leading-7 whitespace-pre-wrap text-right ${
                  needsVerification
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-red-50 border-red-200 text-red-600"
                }`}
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isSendingVerification}
              className={`w-full mt-[18px] h-[45px] border-none rounded-md bg-[#003469] text-white text-[15px] hover:bg-[#002850] ${
                isSubmitting || isSendingVerification ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          <div className="text-center mt-[25px] text-[#666]">
            ليس لديك حساب ؟
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[#00696E] font-semibold hover:text-[#008b8b] duration-200 ml-[5px] cursor-pointer"
            >
              أنشئ حساباً جديداً
            </button>
          </div>

          <div className="mt-[30px] pt-5 border-t border-[#ececec] flex justify-center gap-[15px] flex-wrap">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
              الشروط والأحكام
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;