import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import logo from '../assets/kafeeli-logo.png'

function InvalidEmail() {
  const navigate = useNavigate();

  return (
    <>
     <header className="flex items-center justify-between px-8 py-4 bg-gray-50 shadow-sm">
          <a href=""><img src={logo} alt="logo"  /></a>
          <h1 className="text-[24px] font-bold text-[#003469] hidden md:block">كفيلي</h1>
          <a href="/"><p className="text-navy-800 font-medium md:text[16px]">تسجيل دخول </p></a>
        </header>
    <div className="min-h-screen flex items-center justify-center ">
      <div className="flex flex-col items-center text-center px-6 max-w-lg gap-6">
        
        {/* النص الرئيسي */}
        <h1 className="text-4xl font-bold text-[#0e3460] leading-relaxed" dir="rtl">
          رابط التحقق غير صالح أو منتهي الصلاحية. يرجى طلب رابط تحقق جديد.
        </h1>

        {/* النص الثانوي */}
        <p className="text-gray-500 text-sm leading-relaxed" dir="rtl">
          نعتذر عن الإزعاج. يبدو أن الرابط الذي استخدمته لم يعد متاحاً. قد يكون ذلك بسبب انتهاء الوقت المحدد للرابط أو استخدامه مسبقاً.
        </p>

        {/* الأزرار */}
        <div className="flex gap-4 w-full" dir="rtl">
          

          <button
            onClick={() => navigate("/register")}
            className="flex-1 border border-[#0e3460] text-[#0e3460] py-3 rounded-xl flex items-center cursor-pointer  justify-center gap-2 hover:bg-gray-50 transition"
          >
            <FiUserPlus />
            الرجوع إلى تسجيل جديد
          </button>
          <button
            onClick={() => navigate("/verify-email")}
            className="flex-1 bg-[#0e3460] text-white py-3 cursor-pointer rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            <MdEmail />
            إعادة إرسال رابط تحقق
          </button>
        </div>

      </div>
      
</div>
    <footer dir="ltr" className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-200 gap-3 mt-10">
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

export default InvalidEmail;