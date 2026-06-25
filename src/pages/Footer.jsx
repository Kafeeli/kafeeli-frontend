// Footer.jsx
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from "../assets/title.png";

export default function Footer() {
  const quickLinks = [
    { label: 'من نحن', href: '#about' },
    { label: 'الأسئلة الشائعة', href: '#faq' },
    { label: 'سياسة الخصوصية', href: '#privacy' },
    { label: 'اتصل بنا', href: '#contact' },
  ];

  return (
    <footer dir="rtl" className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8">
          
          {/* About */}
          <div className="text-center md:text-right">
            <div className="flex flex-col items-center md:items-start">
              <img 
                src={logo} 
                alt="كفيلي" 
                className="h-16 w-auto object-contain mb-4"
              />
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                منصة "كفيلي" هي جسر الثقة الذي يجمع بين قلوب المحسنين وحاجات الأيتام. نسعى لتمكين الجيل القادم بحب وكرامة.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-blue-900 font-bold text-lg mb-6">المنصة</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-blue-900 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-blue-900 font-bold text-lg mb-6">تواصل مباشر</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                <FaMapMarkerAlt className="text-teal-500 flex-shrink-0" />
                <span>قطاع غزة-فلسطين</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                <FaPhone className="text-teal-500 flex-shrink-0" />
                <span dir="ltr">+970 ###########</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
                <FaEnvelope className="text-teal-500 flex-shrink-0" />
                <span>contact@kafeeli.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
}