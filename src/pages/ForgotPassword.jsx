import { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("يرجى إدخال البريد الإلكتروني");
      return;
    }

    setMessage(
      "إذا كان هذا البريد مسجلاً، سيتم إرسال رابط إعادة تعيين كلمة المرور.",
    );
  };

  return (
    <div className="h-screen bg-[#f7f8fc] flex flex-col items-center justify-center px-5 direction-rtl">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="text-[#003469] mt-1 text-[32px] font-bold mb-2">
          كفيلي
        </h2>
        <p className="text-[#424750] text-sm mt-0">
          استعادة الوصول إلى حسابك بكل أمان
        </p>
      </div>

      {/* Card */}
      <div className="w-[480px] h-[525px] bg-white border border-[#edf0f5] rounded-lg p-8 text-center">
        {/* Icon */}
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[42px] border border-[#C2C6D2] rounded-[5px] outline-none text-sm pr-14 pl-4"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C2C6D2] text-[22px]">
              <MdOutlineMail />
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-[44px] bg-[#0D4B8E] text-white rounded-[5px] text-[15px] hover:bg-[#0b62b9] transition cursor-pointer"
          >
            إرسال رابط إعادة التعيين
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-red-100 text-red-600 rounded-[5px] text-[13px] leading-6">
            {message}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 mt-6 text-[#424750] text-sm hover:text-[#0D4B8E] hover:underline w-fit cursor-pointer"
          >
            <FaArrowRight />
            العودة إلى تسجيل الدخول
          </button>
        </div>
      </div>

      <p className="text-[#C2C6D2] text-xs mt-3">
        © 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة{" "}
      </p>
    </div>
  );
}

export default ForgotPassword;
