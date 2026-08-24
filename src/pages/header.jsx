// Header.jsx
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from "../assets/title.png";

const Header = ({ primaryDestination = "/register" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'الرئيسية', href: '#top', active: true },
    { label: 'من نحن', href: '#about' },
    { label: 'الأيتام', href: '#orphans' },
    { label: 'كيفية العمل', href: '#how-it-works' },
    { label: 'اتصل بنا', href: '#contact' },
  ];

  // إغلاق القائمة عند الضغط خارجها
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

  // إغلاق القائمة بالـ Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo - كلمة "كفيلي" تختفي بالموبايل */}
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, "#top")}
              className="flex items-center"
              aria-label="العودة إلى أعلى الصفحة"
            >
              <img
                src={logo}
                alt="كفيلي"
                className="h-14 w-auto object-contain"
              />

              <span className="hidden md:inline text-2xl font-bold text-blue-900 tracking-tight">
                كفيلي
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative font-medium transition-colors duration-200 ${
                    link.active
                      ? "text-blue-900 font-semibold"
                      : "text-gray-600 hover:text-blue-900"
                  }`}
                >
                  {link.label}

                  {link.active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-900 rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Link
                to={primaryDestination}
                className="block bg-blue-900 cursor-pointer hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 active:scale-95"
              >
                تبرع الآن
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden cursor-pointer p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Side Drawer */}
        <div
          ref={menuRef}
          className={`absolute top-0 left-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-bold text-blue-900">القائمة</span>

            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="إغلاق القائمة"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <div className="p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  link.active
                    ? "bg-blue-50 text-blue-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            <Link
              onClick={() => setIsMenuOpen(false)}
              to={primaryDestination}
              className="block cursor-pointer w-full bg-blue-900 hover:bg-blue-800 text-center text-white px-6 py-3 rounded-lg text-base font-semibold transition-all active:scale-[0.98]"
            >
              تبرع الآن
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;