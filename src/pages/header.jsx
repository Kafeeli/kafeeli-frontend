// Header.jsx
import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaCogs,
  FaBuilding,
  FaPhoneAlt,
  FaArrowLeft,
  FaSignInAlt,
  FaUserPlus,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/title.png";

const Header = ({ primaryDestination = "/register" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(href);
      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
    setIsMenuOpen(false);
  };

  // Nav links matching App.jsx routes and Figma design
  const navLinks = [
    { label: "الرئيسية", href: "/landing-page", icon: <FaHome className="text-base" /> },
    { label: "من نحن", href: "/about", icon: <FaInfoCircle className="text-base" /> },
    { label: "كيف يعمل كفيلي", href: "/how-it-works", icon: <FaCogs className="text-base" /> },
    { label: "للمؤسسات", href: "/organizations", icon: <FaBuilding className="text-base" /> },
    { label: "تواصل معنا", href: "/contact", icon: <FaPhoneAlt className="text-base" /> },
  ];

  // Active state checker
  const isActive = (href) => {
    if (href.startsWith("#")) return false;
    const currentPath = location.pathname.toLowerCase();
    const targetPath = href.toLowerCase();

    if (targetPath === "/landing-page" && (currentPath === "/" || currentPath === "/landing-page")) {
      return true;
    }
    if (targetPath === "/organizations" && (currentPath === "/organizations" || currentPath === "/institutions")) {
      return true;
    }
    return currentPath === targetPath;
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
            ? "bg-white/95 backdrop-blur-md border-gray-200/80 shadow-md py-1"
            : "bg-white/90 backdrop-blur-sm border-gray-100/90 shadow-sm py-1.5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Right: Brand Logo & Title */}
            <Link
              to="/landing-page"
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label="العودة إلى الصفحة الرئيسية"
            >
              <div className="relative flex items-center justify-center">
                <img
                  src={logo}
                  alt="كفيلي"
                  className="h-14 lg:h-14 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
              <span className="text-xl lg:text-2xl font-black text-[#0D4B8E] tracking-tight">
                كفيلي
              </span>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative text-sm sm:text-base font-bold transition-all duration-200 py-1 ${active
                        ? "text-[#0D4B8E]"
                        : "text-gray-600 hover:text-[#0D4B8E]"
                      }`}
                  >
                    {link.label}

                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#0D4B8E] rounded-full shadow-sm" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Left: Desktop Action Buttons (Login & Register) */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Login Link */}
              <Link
                to="/login"
                className="text-[#0D4B8E] hover:text-[#083463] font-bold text-sm px-3 py-2 rounded-xl transition-all cursor-pointer"
              >
                تسجيل الدخول
              </Link>

              {/* Get Started / Register Primary Button */}
              <Link
                to={primaryDestination}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0D4B8E] to-[#2DBCC3] hover:from-[#09396C] hover:to-[#25B2B9] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-[#0D4B8E]/20 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 border border-white/10"
              >
                <span>ابدأ الآن</span>
                <FaArrowLeft className="text-xs" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden cursor-pointer p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 hover:text-[#0D4B8E] transition-colors"
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6 text-[#0D4B8E]" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================
          RICH MOBILE RESPONSIVE DRAWER / SIDEBAR (UX ENHANCED)
      ========================================================= */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Backdrop overlay with blur */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sliding Drawer Container */}
        <div
          ref={menuRef}
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out dir-rtl ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Top Drawer Header */}
          <div>
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-[#F8FAFC]">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="كفيلي" className="h-8 w-auto object-contain" />
                <span className="text-xl font-black text-[#0D4B8E]">كفيلي</span>
              </div>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#0D4B8E] hover:border-[#0D4B8E]/30 transition-all cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Nav Links List */}
            <div className="p-4 space-y-1.5">
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">
                التصفح السريع
              </p>

              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${active
                        ? "bg-gradient-to-r from-[#0D4B8E]/10 to-[#2DBCC3]/10 text-[#0D4B8E] border-r-4 border-[#0D4B8E] shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-[#0D4B8E]"
                      }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${active
                          ? "bg-[#0D4B8E] text-white shadow-md shadow-[#0D4B8E]/20"
                          : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom Drawer Actions & Trust Badge */}
          <div className="p-5 border-t border-gray-100 bg-[#FAFBFD] space-y-3">
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={primaryDestination}
              className="w-full bg-gradient-to-r from-[#0D4B8E] to-[#2DBCC3] text-white py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#0D4B8E]/20 active:scale-95 transition-all cursor-pointer"
            >
              <FaUserPlus className="text-xs" />
              <span>ابدأ الآن — تسجيل جديد</span>
              <FaArrowLeft className="text-xs" />
            </Link>

            <Link
              onClick={() => setIsMenuOpen(false)}
              to="/login"
              className="w-full bg-white border border-[#0D4B8E]/30 text-[#0D4B8E] hover:bg-blue-50/50 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FaSignInAlt className="text-xs" />
              <span>تسجيل الدخول</span>
            </Link>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-gray-400 text-xs font-semibold">
              <FaCheckCircle className="text-[#2DBCC3] text-xs" />
              <span>منصة كفيلي — للعمل الإنساني الشفاف</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
