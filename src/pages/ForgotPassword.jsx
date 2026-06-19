import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("يرجى إدخال البريد الإلكتروني");
      return;
    }

    setMessage("إذا كان هذا البريد مسجلاً، سيتم إرسال رابط إعادة تعيين كلمة المرور.");
  };

  return (
    <div className="h-screen bg-[#f7f8fc] flex flex-col items-center justify-center px-5 direction-rtl">
      
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[#0b4f93] mt-1 text-[23px] font-bold">كفيلي</h2>
        <p className="text-[#8b95a1] text-sm mt-0">
          استعادة الوصول إلى حسابك بأمان
        </p>
      </div>

      {/* Card */}
      <div className="w-[480px] h-[525px] bg-white border border-[#edf0f5] rounded-lg p-8 text-center">
        
        {/* Icon */}
        <div className="w-[52px] h-[52px] bg-[#58e1df] text-[#0b4f93] rounded-full flex items-center justify-center mx-auto mb-4 text-[22px] font-bold">
          ↻
        </div>

        <h3 className="m-0 text-[#222] text-[20px]">
          هل نسيت كلمة المرور؟
        </h3>

        <p className="text-[#6f7782] text-sm leading-7 my-3 mb-6">
          أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.
        </p>

        <form onSubmit={handleSubmit} className="text-right">
          <label className="block text-[#333] text-[13px] mb-2">
            البريد الإلكتروني
          </label>

          <div className="relative mb-4">
            <input
              type="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[42px] border border-[#dfe4ea] rounded-[5px] outline-none text-sm pr-14 pl-4"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3ad]">
              ✉
            </span>
          </div>

          <button
            type="submit"
            className="w-full h-[44px] bg-[#0b5cab] text-white rounded-[5px] text-[15px] hover:bg-[#084f96] transition"
          >
            إرسال رابط إعادة التعيين
          </button>
        </form>

        {message && (
          <div className="mt-4 p-3 bg-[#eefaf4] text-[#1c7c4c] rounded-[5px] text-[13px] leading-6">
            {message}
          </div>
        )}

        <a href="#" className="block mt-6 text-[#555] no-underline text-sm">
          ← العودة إلى تسجيل الدخول
        </a>
      </div>

      <p className="text-[#56585b] text-xs mt-1">
        © 2026 كفيلي. جميع الحقوق محفوظة.
      </p>
    </div>
  );
}

export default ForgotPassword;