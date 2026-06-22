import { useState } from "react";
import { useNavigate } from "react-router-dom";
import kafeeli from "../assets/kafeeli.png";
import securityIcon from "../assets/Icon (1).svg";
import { MdOutlineMailOutline } from "react-icons/md";
import { LuLockKeyhole } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";
import { TbShieldCheck, TbScan } from "react-icons/tb";
import { FaArrowRightToBracket } from "react-icons/fa6";
import financialIcon from "../assets/Icon (4).svg";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorType, setErrorType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!email || !password) {
    setErrorType("empty");
    return;
  }

  let response;

if (email === "sponsor@gmail.com" && password === "123456") {
  response = {
    success: true,
    role: "Sponsor",
    error: null,
  };
} else if (email === "guardian@gmail.com" && password === "123456") {
  response = {
    success: true,
    role: "Guardian",
    error: null,
  };
} else if (email === "admin@gmail.com" && password === "123456") {
  response = {
    success: true,
    role: "Admin",
    error: null,
  };
} else if (email === "verify@gmail.com") {
  response = {
    success: false,
    role: null,
    error: "unverified_email",
  };
} else if (email === "inactive@gmail.com") {
  response = {
    success: false,
    role: null,
    error: "inactive_account",
  };
} else {
  response = {
    success: false,
    role: null,
    error: "invalid_credentials",
  };
}}
  //   const handleSubmit = (e) => {
  //     e.preventDefault();

  //     if (!email || !password) {
  //       setErrorType("empty");
  //       return;
  //     }

  //     const response = {
  //       success: true,
  //       role: "Sponsor",
  //       error: null,
  //     };

  //     setErrorType("");

  //     if (response.role === "Sponsor") {
  //       navigate("/sponsor-dashboard");
  //     } else if (response.role === "Guardian") {
  //       navigate("/guardian-dashboard");
  //     } else if (response.role === "Admin") {
  //       navigate("/admin-dashboard");
  //     }
  //   };

  return (
    <div className="min-h-screen w-full flex flex-row max-md:flex-col font-[Cairo,sans-serif]">
      {/* الصورة شمال */}
      <div
        className="w-[640px] h-[1024px] max-md:w-full max-md:min-h-[350px] bg-cover bg-center relative flex justify-center items-center"
        style={{ backgroundImage: `url(${kafeeli})` }}
      >
        <div className="absolute inset-0 bg-[rgba(0,52,105,0.75)]"></div>

        <div className="relative z-10 text-white text-center w-[70%]">
          <h1 className="pb-5 mb-[15px] text-white font-[Cairo] font-bold text-[48px] leading-[60px] text-center">
            كفيلي
          </h1>

          <p className="mb-[30px] text-white font-[Cairo] font-normal text-[18px] leading-[28px] text-center">
            منصة رائدة تدمج التكنولوجيا بالعمل الإنساني، نضمن فيها وصول دعمكم
            للأيتام بكل شفافية وموثوقية.
          </p>

          <div className="flex justify-center gap-[15px]">
            <div className="flex justify-center gap-[15px]">
              <div className="w-[81px] h-[89px] p-4 flex flex-col justify-center items-center gap-2 rounded-[12px] border border-cyan-200/25 bg-white/10 backdrop-blur-md">
                <img
                  src={financialIcon}
                  alt="financial icon"
                  className="w-6 h-6 mb-[5px]"
                />
                <span className="text-xs text-white">الشفافية المالية</span>
              </div>

              <div className="w-[81px] h-[89px] p-4 flex flex-col justify-center items-center gap-2 rounded-[12px] border border-cyan-200/25 bg-white/10 backdrop-blur-md">
                <img
                  src={securityIcon}
                  alt="security icon"
                  className="w-6 h-6"
                />
                <span className="text-xs text-white">أمان تام</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الفورم يمين */}
      <div
        dir="rtl"
        className="w-1/2 max-md:w-full bg-[#f5f6f8] flex justify-center items-center"
      >
        <div className="w-[448px] max-w-[448px] h-[603px] bg-white rounded-xl px-[38px] py-9 shadow-[0_8px_25px_rgba(0,0,0,0.06)] flex flex-col gap-8 max-md:w-[90%] max-md:h-auto max-md:my-[30px]">
          <h2 className="text-[#003469] mb-2 font-[Cairo] font-semibold text-[24px] leading-[32px] text-right">
            تسجيل الدخول
          </h2>

          <p className="mb-5 font-[Cairo] font-normal text-[16px] leading-[24px] text-right text-[#424750]">
            الرجاء إدخال بياناتك للوصول إلى لوحة التحكم
          </p>

          <form onSubmit={handleSubmit}>
            <label className="block text-right mb-2 text-[#555] font-[Cairo] font-medium text-[14px] leading-[20px]">
              البريد الإلكتروني
            </label>
            <div className="relative mb-[18px]">
              <input
                type="email"
                placeholder="example@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 border border-[#d8dbe2] rounded-md bg-[#f5f6fa] pr-[45px] pl-[45px] outline-none focus:border-[#003469]"
              />
              <MdOutlineMailOutline className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#737782] w-4 h-6" />
            </div>

            <label className="block text-right mb-2 text-[#555] font-[Cairo] font-medium text-[14px] leading-[20px]">
              كلمة المرور
            </label>

            <div className="relative mb-[18px]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 border border-[#d8dbe2] rounded-md bg-[#f5f6fa] pr-[45px] pl-[45px] outline-none focus:border-[#003469]"
              />

              <LuLockKeyhole className="absolute right-[15px] top-1/2 -translate-y-1/2 text-[#737782] w-4 h-6" />

              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-[15px] top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <HiOutlineEyeOff className="text-[#0D4B8E] text-lg" />
                ) : (
                  <HiOutlineEye className="text-[#0D4B8E] text-lg" />
                )}
              </div>
            </div>
<a
  href="/forgot-password"
  className="text-[#008b8b] text-[13px] no-underline"
>
  نسيت كلمة المرور؟
</a>

{errorType === "empty" && (
  <div className="mt-3 bg-red-100 text-red-600 p-3 rounded-md text-sm">
    الرجاء تعبئة جميع الحقول
  </div>
)}

{errorType === "invalid" && (
  <div className="mt-3 bg-red-100 text-red-600 p-3 rounded-md text-sm">
    البريد الإلكتروني أو كلمة المرور غير صحيحة
  </div>
)}

{errorType === "unverified" && (
  <div className="mt-3 bg-yellow-100 text-yellow-700 p-3 rounded-md text-sm">
    <p>يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.</p>

    <button
      type="button"
      className="mt-2 text-[#003469] font-semibold underline"
    >
      إعادة إرسال رابط تحقق
    </button>
  </div>
)}

{errorType === "inactive" && (
  <div className="mt-3 bg-gray-100 text-gray-700 p-3 rounded-md text-sm">
    حسابك غير نشط.
  </div>
)}

<button
  type="submit"
  className="w-full max-w-[366px] h-[48px] mx-auto mt-[18px] rounded-[8px] bg-[#003469] text-white text-[15px] flex items-center justify-center gap-2 cursor-pointer hover:bg-[#002850]"
>
  <FaArrowRightToBracket className="w-[18px] h-[18px]" />
  تسجيل الدخول
</button>
          </form>

          <div className="text-center mt-[25px] text-[#666] font-[Cairo] font-normal text-[16px] leading-[24px]">
            ليس لديك حساب؟{" "}
            <a
              href="#"
              className="text-[#008b8b] no-underline font-bold text-[16px] leading-[24px] font-[Cairo] inline-block"
            >
              أنشئ حساباً جديداً
            </a>
          </div>

          <div className="mt-[30px] pt-5 border-t border-[#ececec] flex justify-center gap-[15px] flex-wrap">
            <a href="#" className="no-underline text-[#9b9b9b] text-xs">
              سياسة الخصوصية
            </a>
            <a href="#" className="no-underline text-[#9b9b9b] text-xs">
              الشروط والأحكام
            </a>
            <a href="#" className="no-underline text-[#9b9b9b] text-xs">
              اتصل بنا
            </a>
          </div>
        </div>
      </div>
    </div>
  );

}
export default Login;
