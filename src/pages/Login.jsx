import { useState } from "react";
import { useNavigate } from "react-router-dom";
import kafeeli from "../assets/kafeeli.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuLock } from "react-icons/lu";
import { TbShieldCheck, TbScan } from "react-icons/tb";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { authApi } from "../services/authApi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function getApiErrorMessage(error) {
    const data = error.response?.data;

    if (!data) {
      return "حدث خطأ في الاتصال بالخادم";
    }

    if (Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors.join("\n");
    }

    if (data.errors && typeof data.errors === "object") {
      return Object.values(data.errors).flat().join("\n");
    }

    if (typeof data.errors === "string") {
      return data.errors;
    }

    if (data.message) {
      return data.message;
    }

    if (data.title) {
      return data.title;
    }

    return "فشل تسجيل الدخول، تأكد من البريد الإلكتروني وكلمة المرور";
  }

  function getResultErrorMessage(result) {
    if (Array.isArray(result?.errors) && result.errors.length > 0) {
      return result.errors.join("\n");
    }

    if (result?.errors && typeof result.errors === "object") {
      return Object.values(result.errors).flat().join("\n");
    }

    if (typeof result?.errors === "string") {
      return result.errors;
    }

    if (result?.message) {
      return result.message;
    }

    return "فشل تسجيل الدخول، تأكد من البريد الإلكتروني وكلمة المرور";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("الرجاء تعبئة جميع الحقول");
      return;
    }

    const loginPayload = {
      email: email.trim(),
      password: password,
    };

    try {
      setIsSubmitting(true);

      console.log("Login payload:", JSON.stringify(loginPayload, null, 2));

      const result = await authApi.login(loginPayload);

      console.log("Login response:", result);

      if (result?.success !== true) {
        setErrorMessage(getResultErrorMessage(result));
        return;
      }

      const token =
        result?.data?.token ||
        result?.data?.accessToken ||
        result?.data?.access_token ||
        result?.token ||
        result?.accessToken ||
        result?.access_token;

      const refreshToken =
        result?.data?.refreshToken ||
        result?.data?.refresh_token ||
        result?.refreshToken ||
        result?.refresh_token;

      const user =
        result?.data?.user ||
        result?.user ||
        result?.data;

      if (!token) {
        setErrorMessage("تم تسجيل الدخول بنجاح لكن لم يتم استلام رمز الدخول من الخادم");
        return;
      }

      localStorage.setItem("token", token);

      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      navigate("/landing-page");
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log(
        "Backend error:",
        JSON.stringify(error.response?.data, null, 2)
      );

      setErrorMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-[40px] pb-5 mb-[15px] text-white font-bold">
            كفيلي
          </h1>

          <p className="leading-[1.8] mb-[30px]">
            منصة رائدة تخدم التكنولوجيا والأعمال المستقلة، وتضمن لك أعلى درجات
            الشفافية والموثوقية.
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
          <h2 className="text-center text-[#003469] mb-2 text-2xl font-bold">
            تسجيل الدخول
          </h2>

          <p className="text-center text-[#777] text-[13px] mb-5">
            الرجاء إدخال بياناتك للوصول إلى لوحة التحكم
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-right mb-2 text-[#555] text-sm">
              البريد الإلكتروني
            </label>

            <div className="relative mb-[18px]">
              <input
                type="email"
                placeholder="example@domain.com"
                value={email}
                disabled={isSubmitting}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full h-12 border border-[#d8dbe2] rounded-md bg-[#f5f6fa] pr-[45px] pl-[45px] outline-none focus:border-[#003469] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              <MdOutlineMailOutline className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#7d8492] text-lg" />
            </div>

            <label className="block text-right mb-2 text-[#555] text-sm">
              كلمة المرور
            </label>

            <div className="relative mb-[18px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                disabled={isSubmitting}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
                className="w-full h-12 border border-[#d8dbe2] rounded-md bg-[#f5f6fa] pr-[45px] pl-[45px] outline-none focus:border-[#003469] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />

              <LuLock className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#7d8492] text-lg" />

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-[15px] top-1/2 -translate-y-1/2 text-[#7d8492] text-lg cursor-pointer disabled:cursor-not-allowed"
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>
            </div>

            <a
              href="/forgot-password"
              className="text-[#00696E] text-[14px] no-underline hover:text-[#008b8b] duration-200"
            >
              نسيت كلمة المرور؟
            </a>

            {errorMessage && (
              <div
                dir="rtl"
                className="mt-3 bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm leading-7 whitespace-pre-wrap text-right"
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-[18px] h-[45px] border-none rounded-md bg-[#003469] text-white text-[15px] hover:bg-[#002850] ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
            </button>
          </form>

          <div className="text-center mt-[25px] text-[#666]">
            ليس لديك حساب ؟
            <a
              href="/register"
              className="text-[#00696E] no-underline font-semibold hover:cursor-pointer hover:text-[#008b8b] duration-200 ml-[5px]"
            >
              أنشئ حساباً جديداً
            </a>
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