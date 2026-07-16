import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authApi } from "../services/authApi";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" أو "error"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!email.trim()) {
      setMessage("يرجى إدخال البريد الإلكتروني");
      setMessageType("error");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await authApi.forgetPassword({ email: email.trim() });

      if (res?.success === false) {
        setMessage(res?.message || "فشل إرسال رابط إعادة التعيين");
        setMessageType("error");
      } else {
        setMessage(
          res?.message ||
            "إذا كان البريد الإلكتروني مسجلاً، سيتم إرسال تعليمات إعادة تعيين كلمة المرور إليه."
        );
        setMessageType("success");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setMessage(
        error.response?.data?.message ||
          "حدث خطأ أثناء إرسال رابط إعادة التعيين"
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="h-screen bg-[#f7f8fc] flex flex-col items-center justify-center px-5"
    >
      <div className="text-center mb-5">
        <h2 className="text-[#003469] mt-1 text-[32px] font-bold mb-2">
          كفيلي
        </h2>
        <p className="text-[#424750] text-sm mt-0">
          استعادة الوصول إلى حسابك بكل أمان
        </p>
      </div>

      <div className="w-[480px] max-w-full min-h-[525px] bg-white border border-[#edf0f5] rounded-lg p-8 text-center">
        <div className="w-[52px] h-[52px] bg-[#58e1df] text-[#0b4f93] rounded-full flex items-center justify-center mx-auto mb-4 text-[22px] font-bold">
          ↻
        </div>

        <h3 className="m-0 text-[#222] text-[20px]">هل نسيت كلمة المرور؟</h3>

        <p className="text-[#424750] text-sm leading-7 my-3 mb-6">
          أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لضبط كلمة مرور جديدة.
        </p>

        <form onSubmit={handleSubmit} className="text-right">
          <label className="block text-[#424750] text-[14px] mb-2">
            البريد الإلكتروني
          </label>

          <div className="relative mb-4">
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              disabled={isSubmitting}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[42px] border border-[#C2C6D2] rounded-[5px] outline-none text-sm pr-14 pl-4 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C2C6D2] text-[22px]">
              <MdOutlineMail />
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-[44px] bg-[#0D4B8E] text-white rounded-[5px] text-[15px] hover:bg-[#0b62b9] transition ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isSubmitting ? "جارٍ الإرسال..." : "إرسال رابط إعادة التعيين"}
          </button>
        </form>

        {message && (
          <pre
            className={`mt-4 p-3 rounded-[5px] text-[13px] leading-6 whitespace-pre-wrap text-right ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {message}
          </pre>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 mt-6 text-[#424750] text-sm hover:text-[#0D4B8E] hover:underline w-fit cursor-pointer"
          >
            <FaArrowRight />
            العودة إلى تسجيل الدخول
          </button>
        </div>
      </div>

      <p className="text-[#C2C6D2] text-xs mt-3">
        © 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة
      </p>
    </div>
  );
}

export default ForgotPassword;