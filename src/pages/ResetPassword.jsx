import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
// import { TbShieldCheck } from "react-icons/tb";
import Icon from "../assets/Icon.svg";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
// import securityIcon from "../assets/Icon (2).svg";
// import { FaCheckCircle } from "react-icons/fa";
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const requirements = [
    { label: "٨ أحرف على الأقل", test: password.length >= 8 },
    { label: "حرف كبير (A-Z)", test: /[A-Z]/.test(password) },
    { label: "حرف صغير (a-z)", test: /[a-z]/.test(password) },
    { label: "رقم أو رمز خاص", test: /[0-9!@#$%^&*]/.test(password) },
  ];

  const allRulesValid = requirements.every((item) => item.test);

  const handleSubmit = (e) => {
    e.preventDefault();

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

    setSuccess(true);
    setMessage("تمت إعادة تعيين كلمة المرور بنجاح.");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

return (
  <div dir="rtl" className="min-h-screen bg-[#f6f8fb] flex flex-col">
    {/* <header className="w-full bg-white border-b border-gray-200 flex justify-center">
      <div className="w-full max-w-[1280px] h-[79px] flex items-center justify-between px-8">
        <img
  src={logo}
  alt="logo"
  className="w-[109px] h-[55px] object-contain"
/>

        <h1 className="font-[Cairo] font-bold text-2xl leading-6 text-[#0b4f93]">
  كفيلي
           </h1>
<div className="text-xs text-gray-500 flex items-center gap-1">
  <img
    src={securityIcon}
    alt="security"
    className="w-[12px] h-[12px] object-contain"
  />
  مركز الأمان والتحقق
</div>
      </div>
    </header> */}
       <header className="w-full bg-white border-b border-gray-200 flex justify-center">
  <div className="w-full max-w-[1280px] h-[79px] flex items-center justify-between px-8">
    
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

        <h2 className="text-center text-[#0b4f93] text-xl  mb-2">
          إعادة تعيين كلمة المرور
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          يرجى اختيار كلمة مرور قوية وفريدة لحماية حسابك.
        </p>

        {message && (
          <div
            className={`mb-4 text-sm rounded-lg p-3 text-center ${
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
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#0b4f93] flex items-center gap-1"
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-[#0b4f93]"
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-[#0b4f93] flex items-center gap-1"
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-lg px-4 outline-none focus:border-[#0b4f93]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-[#0b4f93] text-white rounded-lg font-semibold hover:bg-[#083f77]"
          >
            إعادة تعيين كلمة المرور
          </button>
        </form>
      </div>
    </main>

    <footer dir="ltr" className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-200 gap-3 ">
    <div className="flex gap-6 order-3 md:order-1">
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">اتصل بنا</a>
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">الشروط والأحكام</a>
      <a href="#" className="text-sm text-gray-500 hover:text-blue-700">سياسة الخصوصية</a>
    </div>
    <p className="text-sm text-gray-500 order-2 text-center">&copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة</p>
    <p className="text-lg font-bold text-blue-900 order-1 md:order-3">كفيلي</p>
</footer>
  </div>
);
}

export default ResetPassword;