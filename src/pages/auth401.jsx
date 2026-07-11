import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaHome } from "react-icons/fa";
import titleImg from "../assets/title.png";

const Error401 = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/landing-page");
  };

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/landing-page");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden px-4">
      {/* Blobs */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#2DBCC3] opacity-10 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-[#D9A441] opacity-10 blur-3xl animate-blob [animation-delay:2s]" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#0D4B8E] opacity-10 blur-3xl animate-blob [animation-delay:4s]" />

      {/* Card */}
      <div className="relative z-10 max-w-xl w-full bg-white rounded-2xl shadow-xl p-6 md:p-10 text-center animate-cardIn">
        {/* Logo */}
        <div className="mb-5 flex justify-center">
          <img
            src={titleImg}
            alt="logo"
            className="w-56 h-56 md:w-64 object-contain animate-float"
          />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FDECEC] text-[#C53030] px-4 py-1.5 rounded-full text-sm font-bold mb-5 animate-popIn">
          <FaLock />
          <span>ERROR 401</span>
          <FaLock />
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-[#0D4B8E] mb-3">
          وصول غير مصرح به
        </h1>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base mb-8 leading-loose">
          ليس لديك الصلاحية الكافية للوصول إلى هذه الصفحة. يرجى التأكد من تسجيل
          الدخول أو التواصل مع الإدارة.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleHome}
            className="group flex items-center justify-center gap-2 bg-[#0D4B8E] hover:bg-[#0A3D72] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            <FaHome className="text-lg transition-transform duration-300 group-hover:scale-110" />
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error401;
