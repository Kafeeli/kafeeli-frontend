// Header.jsx
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from "../assets/title.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { label: 'الرئيسية', href: '#', active: true },
    { label: 'من نحن', href: '#about' },
    { label: 'الأيتام', href: '#orphans' },
    { label: 'كيفية العمل', href: '#how-it-works' },
    { label: 'اتصل بنا', href: '#contact' },
  ];

  // إغلاق القائمة لما تضغطي براها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // إغلاق بالـ Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo - كلمة "كفيلي" تختفي بالموبايل */}
            <div className="flex items-center ">
              <img 
                src={logo} 
                alt="كفيلي" 
                className="h-14 w-auto object-contain"
              />
              {/* ✅ hidden على الموبايل، تظهر من md و فوق */}
              <span className="hidden md:inline text-2xl font-bold text-blue-900 tracking-tight">
                كفيلي
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`relative font-medium transition-colors duration-200 ${
                    link.active
                      ? 'text-blue-900 font-semibold'
                      : 'text-gray-600 hover:text-blue-900'
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
              <button className="bg-blue-900 cursor-pointer hover:bg-blue-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-900/20 active:scale-95">
                تبرع الآن
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden cursor-pointer p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Overlay + Side Drawer - من الشمال */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* الـ Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* ✅ القائمة الجانبية - تطلع من الشمال (left-0) */}
        <div
          ref={menuRef}
          className={`absolute top-0 left-0 h-full w-72 max-w-[80vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header القائمة */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-bold text-blue-900">القائمة</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
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
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  link.active
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-blue-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
            <button className=" cursor-pointer w-full bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-base font-semibold transition-all active:scale-[0.98]">
              تبرع الآن
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;