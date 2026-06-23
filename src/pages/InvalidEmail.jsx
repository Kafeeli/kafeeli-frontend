import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import logo from "../assets/title.png";

function InvalidEmail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-8 py-1 bg-gray-50 shadow-sm">
        <a href="">
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

      {/* المحتوى */}
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

          {/* الأزرار */}
          <div className="flex flex-col md:flex-row gap-3 w-full" dir="rtl">
            <button
              onClick={() => navigate("/register")}
              className="flex-1 border border-[#0e3460] text-[#0e3460] py-3 rounded-xl flex items-center cursor-pointer justify-center gap-2 hover:bg-gray-100 transition text-sm md:text-base"
            >
              <FiUserPlus className="text-xl" />
              الرجوع إلى تسجيل جديد
            </button>
            <button
              onClick={() => navigate("/verify-email")}
              className="flex-1 bg-[#0e3460] text-white py-3 cursor-pointer rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition text-sm md:text-base"
            >
              <MdEmail className="text-xl" />
              إعادة إرسال رابط تحقق
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
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
