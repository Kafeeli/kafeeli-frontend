import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import logo from "../assets/title.png";
import { authApi } from "../services/authApi";

function InvalidEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromUrl = searchParams.get("email") || "";
  const emailFromStorage = localStorage.getItem("pendingVerificationEmail") || "";

  const [email, setEmail] = useState(emailFromUrl || emailFromStorage);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

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

    return "فشل إرسال رابط التحقق، حاول مرة أخرى";
  }

  async function handleResend() {
    if (cooldown > 0 || isSubmitting) return;

    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("يرجى إدخال البريد الإلكتروني لإعادة إرسال رابط التحقق");
      setMessageType("error");
      return;
    }

    const payload = {
      email: email.trim(),
    };

    try {
      setIsSubmitting(true);

      console.log("Resend email confirmation payload:", JSON.stringify(payload, null, 2));

      const result = await authApi.sendResendEmailConfirmation(payload);

      console.log("Resend email confirmation success:", result);

      if (result?.success === false) {
        const apiMessage =
          Array.isArray(result.errors) && result.errors.length > 0
            ? result.errors.join("\n")
            : result.message || "فشل إرسال رابط التحقق";

        setMessage(apiMessage);
        setMessageType("error");
        return;
      }

      localStorage.setItem("pendingVerificationEmail", email.trim());

      setMessage(
        result?.message ||
          "تم إرسال رابط التحقق بنجاح. يرجى فحص بريدك الإلكتروني."
      );
      setMessageType("success");
      setCooldown(30);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log(
        "Backend error:",
        JSON.stringify(error.response?.data, null, 2)
      );

      setMessage(getApiErrorMessage(error));
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (cooldown === 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-4 md:px-8 py-1 bg-gray-50 shadow-sm">
        <a href="/">
          <img src={logo} alt="logo" className="w-20 h-19" />
        </a>

        <h1 className="text-lg md:text-2xl font-bold text-[#003469] hidden md:block">
          كفيلي
        </h1>

        <a href="/login">
          <p className="text-navy-800 font-medium text-sm md:text-base">
            تسجيل دخول
          </p>
        </a>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="flex flex-col items-center text-center max-w-lg w-full gap-6">
          <h1
            className="text-2xl md:text-4xl font-bold text-[#0e3460] leading-relaxed"
            dir="rtl"
          >
            رابط التحقق غير صالح أو منتهي الصلاحية. يرجى طلب رابط تحقق جديد.
          </h1>

          <p
            className="text-gray-500 text-xs md:text-sm leading-relaxed"
            dir="rtl"
          >
            نعتذر عن الإزعاج. يبدو أن الرابط الذي استخدمته لم يعد متاحاً. قد
            يكون ذلك بسبب انتهاء الوقت المحدد للرابط أو استخدامه مسبقاً.
          </p>

          <div dir="rtl" className="w-full text-right">
            <label className="block text-sm text-gray-600 mb-2">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              disabled={isSubmitting}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
                setMessageType("");
              }}
              placeholder="example@domain.com"
              className="w-full border border-gray-200 rounded-xl p-3 text-right outline-none focus:border-[#0D4B8E] disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {message && (
            <div
              dir="rtl"
              className={`w-full rounded-xl px-4 py-3 text-right text-sm leading-7 whitespace-pre-wrap ${
                messageType === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-3 w-full" dir="rtl">
            <button
              onClick={() => navigate("/register")}
              disabled={isSubmitting}
              className="flex-1 border border-[#0e3460] text-[#0e3460] py-3 rounded-xl flex items-center cursor-pointer justify-center gap-2 hover:bg-gray-100 transition text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <FiUserPlus className="text-xl" />
              الرجوع إلى تسجيل جديد
            </button>

            <button
              onClick={handleResend}
              disabled={isSubmitting || cooldown > 0}
              className={`flex-1 bg-[#0e3460] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition text-sm md:text-base ${
                isSubmitting || cooldown > 0
                  ? "opacity-70 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              <MdEmail className="text-xl" />
              {isSubmitting
                ? "جارٍ الإرسال..."
                : cooldown > 0
                  ? `إعادة الإرسال بعد ${cooldown} ثانية`
                  : "إعادة إرسال رابط تحقق"}
            </button>
          </div>
        </div>
      </div>

      <footer
        dir="ltr"
        className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-4 border-t border-gray-200 gap-3"
      >
        <div className="flex gap-4 md:gap-6 order-3 md:order-1 flex-wrap justify-center">
          <a
            href="#"
            className="text-xs md:text-sm text-gray-500 hover:text-blue-700"
          >
            اتصل بنا
          </a>

          <a
            href="#"
            className="text-xs md:text-sm text-gray-500 hover:text-blue-700"
          >
            الشروط والأحكام
          </a>

          <a
            href="#"
            className="text-xs md:text-sm text-gray-500 hover:text-blue-700"
          >
            سياسة الخصوصية
          </a>
        </div>

        <p className="text-xs md:text-sm text-gray-500 order-2 text-center">
          &copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة
        </p>

        <p className="text-base md:text-lg font-bold text-blue-900 order-1 md:order-3">
          كفيلي
        </p>
      </footer>
    </div>
  );
}

export default InvalidEmail;