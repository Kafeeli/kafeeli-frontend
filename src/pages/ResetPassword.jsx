import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../assets/logo.png";
import Icon from "../assets/Icon.svg";
import securityIcon from "../assets/Icon (2).svg";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { FaCheckCircle } from "react-icons/fa";
import { authApi } from "../services/authApi";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const userIdFromUrl = searchParams.get("userId") || "";
  const tokenFromUrl = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function decodeResetToken(rawToken) {
    if (!rawToken) return "";

    let token = rawToken.replace(/ /g, "+");

    try {
      token = decodeURIComponent(token);
    } catch {
      // token may already be decoded by URLSearchParams
    }

    return token;
  }

  function getApiErrorMessage(error) {
    const data = error.response?.data;

    if (!data) {
      return error.message || "حدث خطأ في الاتصال بالخادم";
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

    return "فشل إعادة تعيين كلمة المرور، حاول مرة أخرى";
  }

  const requirements = [
    { label: "٨ أحرف على الأقل", test: password.length >= 8 },
    { label: "حرف كبير (A-Z)", test: /[A-Z]/.test(password) },
    { label: "حرف صغير (a-z)", test: /[a-z]/.test(password) },
    { label: "رقم أو رمز خاص", test: /[0-9!@#$%^&*]/.test(password) },
  ];

  const allRulesValid = requirements.every((item) => item.test);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    const decodedToken = decodeResetToken(tokenFromUrl);

    if (!userIdFromUrl || !decodedToken) {
      setSuccess(false);
      setMessage("رابط إعادة تعيين كلمة المرور غير صالح أو ناقص");
      return;
    }

    if (!password || !confirmPassword) {
      setSuccess(false);
      setMessage("يرجى تعبئة كلمة المرور وتأكيدها");
      return;
    }

    if (!allRulesValid) {
      setSuccess(false);
      setMessage("كلمة المرور لا تطابق القواعد المطلوبة");
      return;
    }

    if (password !== confirmPassword) {
      setSuccess(false);
      setMessage("كلمة المرور وتأكيد كلمة المرور غير متطابقتين");
      return;
    }

    const payload = {
      userId: userIdFromUrl,
      token: decodedToken,

      password: password,
      confirmPassword: confirmPassword,

      // احتياط لو الباك إند يستخدم newPassword بدل password
      newPassword: password,
    };

    try {
      setIsSubmitting(true);

      console.log("Reset password payload:", {
        userId: userIdFromUrl,
        token: "[hidden]",
        password: "[hidden]",
        confirmPassword: "[hidden]",
      });

      const result = await authApi.resetPassword(payload);

      console.log("Reset password success:", result);

      if (result?.success !== true) {
        const apiMessage =
          Array.isArray(result?.errors) && result.errors.length > 0
            ? result.errors.join("\n")
            : result?.message || "فشل إعادة تعيين كلمة المرور";

        setSuccess(false);
        setMessage(apiMessage);
        return;
      }

      setSuccess(true);
      setMessage(result?.message || "تمت إعادة تعيين كلمة المرور بنجاح.");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log(
        "Backend error:",
        JSON.stringify(error.response?.data, null, 2)
      );

      setSuccess(false);
      setMessage(getApiErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#f6f8fb] flex flex-col">
      <header className="flex items-center justify-between px-8 py-1 bg-gray-50 shadow-sm">
        <div className="w-full h-[79px] flex items-center justify-between px-8">
          <img
            src={logo}
            alt="logo"
            className="w-[109px] h-[55px] object-contain"
          />

          <h1 className="font-[Cairo] font-bold text-2xl leading-6 text-[#0b4f93]">
            كفيلي
          </h1>

          <div className="flex items-center gap-1">
            <img
              src={securityIcon}
              alt="security"
              className="w-[12px] h-[12px] object-contain"
            />

            <span className="font-[Cairo] font-normal text-base leading-6 text-gray-600">
              مركز الأمان والتحقق
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-[520px] bg-white rounded-2xl border border-gray-200 shadow-lg px-12 py-8">
          <div className="flex justify-center mb-4">
            <img
              src={Icon}
              alt="Reset Password Icon"
              className="w-[80px] h-[70px] object-contain"
            />
          </div>

          <h2 className="text-center text-[#0b4f93] text-xl mb-2">
            إعادة تعيين كلمة المرور
          </h2>

          <p className="text-center text-sm text-gray-500 mb-6">
            يرجى اختيار كلمة مرور قوية وفريدة لحماية حسابك.
          </p>

          {message && (
            <div
              className={`mb-4 text-sm rounded-lg p-3 text-center leading-7 whitespace-pre-wrap ${
                success
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <label className="font-[Cairo] font-normal text-base leading-6 text-gray-600">
                  كلمة المرور الجديدة
                </label>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#0b4f93] flex items-center gap-1 disabled:cursor-not-allowed"
                >
                  <span className="font-[Cairo] text-[#0D4B8E]">
                    {showPassword ? "إخفاء" : "إظهار"}
                  </span>

                  {showPassword ? (
                    <HiOutlineEyeOff className="text-[#0D4B8E] text-lg" />
                  ) : (
                    <HiOutlineEye className="text-[#0D4B8E] text-lg" />
                  )}
                </button>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                disabled={isSubmitting}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage("");
                  setSuccess(false);
                }}
                className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-[#0b4f93] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <div className="bg-[#f3f3fb] rounded-lg p-4">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.test ? (
                      <FaCheckCircle className="text-[#0b4f93] text-sm" />
                    ) : (
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-400"></span>
                    )}

                    <span className="font-[Cairo] font-normal text-sm leading-5 text-gray-600">
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2 text-sm">
                <label className="font-[Cairo] font-normal text-base leading-6 text-gray-600">
                  تأكيد كلمة المرور
                </label>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="text-[#0b4f93] flex items-center gap-1 disabled:cursor-not-allowed"
                >
                  <span className="font-[Cairo] text-[#0D4B8E]">
                    {showConfirmPassword ? "إخفاء" : "إظهار"}
                  </span>

                  {showConfirmPassword ? (
                    <HiOutlineEyeOff className="text-[#0D4B8E] text-lg" />
                  ) : (
                    <HiOutlineEye className="text-[#0D4B8E] text-lg" />
                  )}
                </button>
              </div>

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                disabled={isSubmitting}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setMessage("");
                  setSuccess(false);
                }}
                className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-[#0b4f93] disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 bg-[#0b4f93] text-white rounded-lg font-semibold hover:bg-[#083f77] ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {isSubmitting
                ? "جارٍ إعادة تعيين كلمة المرور..."
                : "إعادة تعيين كلمة المرور"}
            </button>
          </form>
        </div>
      </main>

      <footer
        dir="ltr"
        className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-200 gap-3"
      >
        <div className="flex gap-6 order-3 md:order-1">
          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            اتصل بنا
          </a>

          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            الشروط والأحكام
          </a>

          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            سياسة الخصوصية
          </a>
        </div>

        <p className="text-sm text-gray-500 order-2 text-center">
          &copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة
        </p>

        <p className="text-lg font-bold text-blue-900 order-1 md:order-3">
          كفيلي
        </p>
      </footer>
    </div>
  );
}

export default ResetPassword;