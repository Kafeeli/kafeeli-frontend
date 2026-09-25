// Footer.jsx
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import logo from "../assets/title.png";

export default function Footer() {
  const quickLinks = [
    { label: "كيف يعمل كفيلي", href: "/how-it-works" },
    { label: "المؤسسات", href: "/organizations" },
    { label: "تسجيل الدخول", href: "/login" },
  ];

  return (
    <footer
      id="contact"
      dir="rtl"
      className="w-full border-t-2 border-[#2DBCC3] bg-[#0D4B8E] text-white"
    >
      {/* Main Footer */}
      <div className="mx-auto w-full max-w-[1216px] px-6 py-8 sm:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* ================= المنصة ================= */}
          <div className="text-right">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#2DBCC3]/10 border border-[#2DBCC3]/20 backdrop-blur-sm">
                <img
                  src={logo}
                  alt="كفيلي"
                  className="h-12 w-auto object-contain"
                />
              </div>

              <h2 className="font-['Cairo'] text-2xl font-black text-white">
                كفيلي
              </h2>
            </div>

            <p className="max-w-[330px] font-['Cairo'] text-sm font-medium leading-7 text-white/75">
              منصة رقمية لإدارة وتنظيم رحلة الكفالة، تربط المؤسسة والكفيل
              والوصي ضمن تجربة واضحة وموثقة وقابلة للمتابعة.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2DBCC3]/15 px-3 py-1.5">
              <span className="text-xs text-[#B9F1F3] whitespace-nowrap">
                كفيلي — حلول تقنية لدعم العمل الخيري والإنساني
              </span>
            </div>
          </div>

          {/* ================= المنصة ================= */}
          <div className="text-right">
            <h3 className="mb-5 font-['Cairo'] text-lg font-bold text-white">
              المنصة
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-['Cairo'] text-sm text-white/70 transition-colors duration-200 hover:text-[#2DBCC3]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= عن كفيلي ================= */}
          <div className="text-right">
            <h3 className="mb-5 font-['Cairo'] text-lg font-bold text-white">
              عن كفيلي
            </h3>

            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="font-['Cairo'] text-sm text-white/70 transition-colors hover:text-[#2DBCC3]"
                >
                  من نحن
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  className="font-['Cairo'] text-sm text-white/70 transition-colors hover:text-[#2DBCC3]"
                >
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>

          {/* ================= تواصل ================= */}
          <div className="min-w-0 text-right">
            <h3 className="mb-5 font-['Cairo'] text-lg font-bold text-white">
              تواصل
            </h3>

            <ul className="space-y-4">
              {/* Email */}
              <li className="flex min-w-0 items-start gap-3">
                <FaEnvelope
                  className="mt-1 shrink-0 text-[#2DBCC3]"
                  size={15}
                />

                <a
                  href="mailto:kafeeli.team@outlook.com"
                  dir="ltr"
                  className="min-w-0 break-all text-left font-['Cairo'] text-sm leading-6 text-white/75 transition-colors hover:text-[#2DBCC3]"
                >
                  kafeeli.team@outlook.com
                </a>
              </li>

              {/* Location */}
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt
                  className="mt-1 shrink-0 text-[#2DBCC3]"
                  size={15}
                />

                <span className="font-['Cairo'] text-sm leading-6 text-white/75">
                  قطاع غزة - فلسطين
                </span>
              </li>

              {/* Phone */}
              <li className="flex items-start gap-3">
                <FaPhone className="mt-1 shrink-0 text-[#2DBCC3]" size={14} />

                <a
                  href="tel:+970594828270"
                  dir="ltr"
                  className="font-['Cairo'] text-sm text-white/75 transition-colors hover:text-[#2DBCC3]"
                >
                  +970594828270
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= Bottom ================= */}
        <div className="mt-8 border-t border-white/10 pt-4">
          <div className="flex flex-col gap-3 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-right">© 2026 كفيلي - جميع الحقوق محفوظة</p>

            <p className="text-right">
              صُمم بعناية لخدمة الكفالات الإنسانية الشفافة
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
