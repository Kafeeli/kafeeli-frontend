import logo from '../assets/kafeeli-logo.png'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailImg from "../assets/email-verify.png"; // حط صورة الظرف هون
export default function EmailVerification() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = () => {
    if (cooldown > 0) return;

    setSent(true);
    setTimeout(() => setSent(false), 3000);

    setCooldown(30);
  };

  useEffect(() => {
    if (cooldown === 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return (
    <>
    <header className="bg-white border-b border-gray-200 px-8 py-4 " dir="rtl">
        
      <div className="w-full mx-auto flex items-center justify-between">
        <a href=""><img src={logo} alt="logo" /></a>
        <h1 className="text-[24px] font-bold text-[#003469] hidden md:block">كفيلي</h1>
        <nav className="flex items-center gap-6 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-gray-800 transition-colors">الرئيسية</span>
          <span className="cursor-pointer hover:text-gray-800 transition-colors">عن المنصة</span>
        </nav>
      </div>
    </header>
    <div className="max-h-full bg-gray-50" dir="rtl">
          <div className="flex items-center justify-center min-h-screen px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-[80%] mt-10">
    
              {/* Right - Content */}
              <div className="flex-1 max-w-md">
    
                {/* Tag */}
                <div className="flex mb-4">
                  <span className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    تفعيل الحساب
                  </span>
                </div>
    
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 text-right mb-3">
                  تحقق من بريدك الإلكتروني
                </h1>
    
                {/* Subtitle */}
                <p className="text-gray-500 text-sm leading-relaxed text-right mb-8">
                  أرسلنا رابط تحقق إلى بريدك الإلكتروني. يرجى فتح البريد والضغط على رابط التحقق لتفعيل حسابك.
                </p>
    
                {/* Resend Button */}
                <button
                  onClick={handleResend}
                  disabled={cooldown > 0}
                  className={`w-full flex items-center justify-center gap-2 text-white text-sm font-semibold py-3.5 rounded-xl mb-3 transition-colors ${
                    cooldown > 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-[#0D4B8E] hover:bg-[#0a3d77]"
                  }`}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h11a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14l3 3-3 3M21 17h-6"></path>
</svg>
                  {sent
                    ? "تم الإرسال ✓"
                    : cooldown > 0
                    ? `إعادة الإرسال بعد ${cooldown} ثانية`
                    : "إعادة إرسال رابط تحقق"}
                </button>
                {/* Back Button */}
                <button
  onClick={() => navigate("/")}
  className="w-full flex items-center justify-center gap-2 border border-[#00696E] text-gray-700 hover:bg-gray-100 text-sm font-semibold py-3.5 rounded-xl mb-6 transition-colors"
>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
</svg>
  <span className='text-[#00696E]'>الرجوع إلى تسجيل جديد</span>
</button>
    
                {/* Help Box */}
                <div className="flex items-start gap-3 bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800 mb-0.5">هل تواجه مشكلة؟</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      تأكد من مجلد الرسائل غير المرغوب فيها (Spam) أو تواصل معنا.
                    </p>
                  </div>
                </div>
    
              </div>
    
              {/* Left - Illustration */}
              <div className="hidden md:flex flex-col items-center justify-center w-80 min-h-96 bg-white border border-gray-200 rounded-2xl p-8 gap-5">
                <img src={emailImg} alt="email verification" className="w-60 h-52 object-cover" />
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-[#0D4B8E] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-800">أمان عال</p>
                    <p className="text-xs text-gray-400">بياناتك في حفظ وأمان</p>
                  </div>
                </div>
              </div>
    
            </div>
          </div>
        </div>
        <footer dir="ltr" className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-200 gap-3 ">
    <div className="flex gap-6 order-3 md:order-1">
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">اتصل بنا</a>
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">الشروط والأحكام</a>
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">سياسة الخصوصية</a>
    </div>
    <p className="text-sm text-gray-500 order-2 text-center">&copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة</p>
    <p className="text-lg font-bold text-blue-900 order-1 md:order-3">كفيلي</p>
</footer>
    </>
  );
}
