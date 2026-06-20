import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaHandHoldingHeart, FaShieldAlt } from "react-icons/fa";

function EmailVerificationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f4ff] relative overflow-hidden">

      {/* كونفيتي فوق الكارد */}
<div className="absolute inset-0 pointer-events-none">
  {/* فوق الكارد */}
  <div className="absolute top-[8%] left-[28%] w-3 h-3 bg-pink-400 rotate-45"></div>
  <div className="absolute top-[6%] left-[38%] w-3 h-3 bg-purple-600 rotate-12"></div>
  <div className="absolute top-[5%] right-[35%] w-2 h-2 bg-red-400 rotate-45"></div>
  <div className="absolute top-[7%] right-[28%] w-2 h-2 bg-cyan-400"></div>
  <div className="absolute top-[4%] right-[20%] w-2 h-2 bg-blue-500 rotate-12"></div>
  <div className="absolute top-[9%] left-[45%] w-2 h-2 bg-green-500 rotate-45"></div>

  {/* يمين الكارد */}
  <div className="absolute top-[20%] right-[18%] w-2 h-2 bg-blue-400"></div>
  <div className="absolute top-[30%] right-[15%] w-2 h-2 bg-green-400 rotate-45"></div>

  {/* يسار الكارد */}
  <div className="absolute top-[20%] left-[18%] w-3 h-3 bg-pink-500 rotate-12"></div>
  <div className="absolute top-[32%] left-[15%] w-2 h-2 bg-blue-600 rotate-45"></div>
</div>

      {/* الكارد */}
      <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center gap-5 w-full max-w-sm text-center z-10 relative">
        <div className="absolute top-[20%] left-[18%] w-3 h-3 bg-pink-500 rotate-12"></div>
  <div className="absolute top-[32%] left-[15%] w-2 h-2 bg-blue-600 rotate-45"></div>
  <div className="absolute top-[20%] right-[18%] w-2 h-2 bg-blue-400"></div>
  <div className="absolute top-[30%] right-[15%] w-2 h-2 bg-green-400 rotate-45"></div>


        {/* الأيقونات فوق */}
        <div className="relative flex items-center justify-center w-28 h-28">
          {/* أيقونة القلب يمين */}
          <div className="absolute -top-2 -right-2 text-cyan-400 text-xl">
            <FaHandHoldingHeart />
          </div>
          {/* الدائرة الخضراء */}
          <div className="w-20 h-20 rounded-full bg-[#73F2F9] flex items-center justify-center text-white text-4xl shadow-md z-10">
            <FaCheckCircle className="text-[#00696E]" />
          </div>
          {/* أيقونة الإيميل تحت */}
          <div className="absolute -bottom-2 -left-2 text-gray-300 text-2xl">
            <FaEnvelope />
          </div>
        </div>

        {/* النص */}
        <h2 className="text-3xl font-bold text-[#0e3460] leading-relaxed mt-2" dir="rtl">
          تم تأكيد بريدك الإلكتروني بنجاح.
        </h2>

        {/* الزر */}
        <button
        onClick={() => navigate("/")}
        className="w-full bg-[#0e3460] text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition text-base font-medium"
        >
        <span>الذهاب إلى تسجيل الدخول</span>
        <span className="text-3xl">←</span>
        </button>

        {/* تأمين */}
        <p className="text-gray-400 text-xs flex items-center gap-1" dir="rtl">
          <FaShieldAlt className="text-gray-400" />
          تم تأمين حسابك بالكامل
        </p>
      </div>
    </div>
  );
}

export default EmailVerificationSuccess;