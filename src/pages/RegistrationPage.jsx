import { useState } from "react";
import { FaCheckCircle, FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import logo from "../assets/title.png";
import guardianIcon from "../assets/guardian-icon.png";
import sponsorIcon from "../assets/sponsor-icon.png";
import sideIcon from "../assets/hand.png";
import checkIcon from "../assets/check-icon.png";
import reportIcon from "../assets/report-icon.png";

function FieldLabel({ children, required }) {
  return (
    <label className="text-sm text-gray-600 text-right">
      {children}
      {required && <span className="text-red-600 mr-1">*</span>}
    </label>
  );
}

function FieldError({ message }) {
  if (!message) return null;

  return <p className="text-xs text-red-600 text-right mt-1">{message}</p>;
}

function inputClass(error) {
  return `border rounded-lg p-2 text-right outline-none transition ${
    error
      ? "border-red-500 focus:border-red-500"
      : "border-gray-200 focus:border-blue-400"
  }`;
}

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState("");
  const [roleError, setRoleError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    fatherName: "",
    grandFatherName: "",
    familyName: "",
    email: "",
    phone: "",
    city: "",
    gender: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const roles = [
    {
      id: "guardian",
      title: "وصي / مسؤول",
      desc: "أقوم بإدارة معلومات الأيتام أو الأسر",
      icon: guardianIcon,
      color: "guardian",
    },
    {
      id: "sponsor",
      title: "كفيل / متبرع",
      desc: "أريد دعم الأيتام أو الأسر",
      icon: sponsorIcon,
      color: "sponsor",
    },
  ];

  const colorStyles = {
    guardian: {
      border: "border-[#2DBCC3]",
      text: "text-[#2DBCC3]",
      icon: "text-[#2DBCC3]",
    },
    sponsor: {
      border: "border-[#0D4B8E]",
      text: "text-[#0D4B8E]",
      icon: "text-[#0D4B8E]",
    },
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!selected) {
      setRoleError("يرجى اختيار نوع الحساب");
    } else {
      setRoleError("");
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "الاسم الأول مطلوب";
    }

    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "اسم الأب مطلوب";
    }

    if (!formData.grandFatherName.trim()) {
      newErrors.grandFatherName = "اسم الجد مطلوب";
    }

    if (!formData.familyName.trim()) {
      newErrors.familyName = "اسم العائلة مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    }

    if (!formData.city) {
      newErrors.city = "المدينة مطلوبة";
    }

    if (!formData.gender) {
      newErrors.gender = "الجنس مطلوب";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "تاريخ الميلاد مطلوب";
    }

    if (!formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
    } else if (formData.password.length < 8) {
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        "كلمة المرور وتأكيد كلمة المرور غير متطابقتين";
    }

    setErrors(newErrors);

    return selected && Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    navigate("/verify-email");
  }

  return (
    <>
      <header className="flex items-center justify-between px-8 py-1 bg-gray-50 shadow-sm">
        <button onClick={() => navigate("/")} className="cursor-pointer">
          <img src={logo} alt="logo" className="w-20 h-19" />
        </button>

        <h1 className="text-[24px] font-bold text-[#003469] hidden md:block">
          كفيلي
        </h1>

        <button onClick={() => navigate("/")} className="cursor-pointer">
          <p className="text-navy-800 font-medium md:text-[16px]">تسجيل دخول</p>
        </button>
      </header>

      <main>
        <section className="mx-auto max-w-lg text-center mb-2 mt-10">
          <p className="text-[#0D4B8E] text-2xl mb-2 font-bold md:text-4xl">
            إنشاء حساب جديد
          </p>

          <p className="text-[#191C20]">
            انضم إلى مجتمع كفيلي للمساهمة في رعاية وتمكين الأيتام في فلسطين
            وتوفير حياة كريمة لهم.
          </p>
        </section>

        <section className="w-[80%] mx-auto flex justify-center min-h-screen gap-5 mt-8">
          <div id="Rdiv">
            <div
              className="hidden lg:flex flex-col justify-center p-4 h-full rounded-r-lg gap-4"
              style={{ backgroundColor: "rgba(13, 75, 142, 1)" }}
            >
              <img src={sideIcon} alt="icon" className="w-12" />

              <h2 className="text-white text-3xl font-bold leading-loose text-right">
                خطوة واحدة لنصنع <br /> الفرق
              </h2>

              <p className="text-blue-200 text-sm leading-loose max-w-xs">
                من خلال تسجيلك، تفتح أبواب الأمل لآلاف الأطفال الذين ينتظرون يد
                العون.
              </p>

              <div className="flex items-center gap-2">
                <img src={checkIcon} alt="check" className="w-5 h-5" />
                <span className="text-blue-200 text-sm">تحقق أمني عالي</span>
              </div>

              <div className="flex items-center gap-2">
                <img src={reportIcon} alt="report" className="w-5 h-5" />
                <span className="text-blue-200 text-sm">
                  تقارير دورية شفافة
                </span>
              </div>
            </div>
          </div>

          <div id="Ldiv" className="w-full max-w-lg">
            <div className="flex flex-col sm:flex-row gap-4 mx-auto max-w-lg w-full">
              {roles.map((role) => {
                const isSelected = selected === role.id;
                const colors = colorStyles[role.color];

                return (
                  <button
                    type="button"
                    key={role.id}
                    onClick={() => {
                      setSelected(role.id);
                      setRoleError("");
                    }}
                    className={`flex-1 rounded-xl p-5 cursor-pointer relative transition-all text-right ${
                      isSelected
                        ? `border-2 ${colors.border}`
                        : "border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {isSelected && (
                      <FaCheckCircle
                        className={`absolute top-3 left-3 text-xl ${colors.icon}`}
                      />
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      <img src={role.icon} alt={role.title} />

                      <span
                        className={`font-semibold ${
                          isSelected ? colors.text : "text-gray-700"
                        }`}
                      >
                        {role.title}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500">{role.desc}</p>
                  </button>
                );
              })}
            </div>

            {roleError && (
              <p className="mt-2 text-sm text-red-600 text-right">
                {roleError}
              </p>
            )}

            <hr className="mt-4 border-gray-200" />

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto max-w-lg mt-6">
                <div className="flex flex-col gap-1">
                  <FieldLabel required>الاسم الأول</FieldLabel>
                  <input
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="محمد"
                    className={inputClass(errors.firstName)}
                  />
                  <FieldError message={errors.firstName} />
                </div>

                <div className="flex flex-col gap-1">
                  <FieldLabel required>اسم الأب</FieldLabel>
                  <input
                    name="fatherName"
                    type="text"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="أحمد"
                    className={inputClass(errors.fatherName)}
                  />
                  <FieldError message={errors.fatherName} />
                </div>

                <div className="flex flex-col gap-1">
                  <FieldLabel required>اسم الجد</FieldLabel>
                  <input
                    name="grandFatherName"
                    type="text"
                    value={formData.grandFatherName}
                    onChange={handleChange}
                    placeholder="محمود"
                    className={inputClass(errors.grandFatherName)}
                  />
                  <FieldError message={errors.grandFatherName} />
                </div>

                <div className="flex flex-col gap-1">
                  <FieldLabel required>اسم العائلة</FieldLabel>
                  <input
                    name="familyName"
                    type="text"
                    value={formData.familyName}
                    onChange={handleChange}
                    placeholder="الأسعد"
                    className={inputClass(errors.familyName)}
                  />
                  <FieldError message={errors.familyName} />
                </div>

                <div className="flex flex-col gap-1">
                  <FieldLabel required>البريد الإلكتروني</FieldLabel>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    className={inputClass(errors.email)}
                  />
                  <FieldError message={errors.email} />
                </div>

                <div className="flex flex-col gap-1">
                  <FieldLabel required>رقم الهاتف</FieldLabel>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+970"
                    className={inputClass(errors.phone)}
                  />
                  <FieldError message={errors.phone} />
                </div>

                <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <FieldLabel>الدولة</FieldLabel>
                    <input
                      type="text"
                      value="فلسطين"
                      disabled
                      className="w-full border border-gray-200 rounded-lg p-2 text-right bg-gray-100 text-gray-500 h-12"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <FieldLabel required>المدينة - قطاع غزة</FieldLabel>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full ${inputClass(errors.city)}`}
                    >
                      <option value="">اختر المدينة</option>
                      <option value="غزة">غزة</option>
                      <option value="خان يونس">خان يونس</option>
                      <option value="بيت لاهيا">بيت لاهيا</option>
                      <option value="بيت حانون">بيت حانون</option>
                      <option value="نصيرات">نصيرات</option>
                      <option value="دير البلح">دير البلح</option>
                      <option value="رفح">رفح</option>
                      <option value="جباليا">جباليا</option>
                    </select>
                    <FieldError message={errors.city} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <FieldLabel required>الجنس</FieldLabel>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full ${inputClass(errors.gender)}`}
                    >
                      <option value="">اختر</option>
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">أنثى</option>
                    </select>
                    <FieldError message={errors.gender} />
                  </div>
                </div>

                <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                  <FieldLabel required>تاريخ الميلاد</FieldLabel>
                  <input
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={inputClass(errors.birthDate)}
                  />
                  <FieldError message={errors.birthDate} />
                </div>
              </div>

              <hr className="mt-4 border-gray-200" />

              <div className="flex flex-col gap-1 max-w-lg mx-auto w-full mt-4">
                <FieldLabel required>كلمة المرور</FieldLabel>

                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full ${inputClass(errors.password)}`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 cursor-pointer text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <FieldError message={errors.password} />
              </div>

              <div className="flex flex-col gap-1 max-w-lg mx-auto w-full mt-4">
                <FieldLabel required>تأكيد كلمة المرور</FieldLabel>

                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full ${inputClass(errors.confirmPassword)}`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute left-3 top-3 cursor-pointer text-gray-400"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <FieldError message={errors.confirmPassword} />
              </div>

              <div className="mt-4 max-w-lg mx-auto w-full">
                <button
                  type="submit"
                  className="w-full bg-[#0D4B8E] text-white rounded-lg cursor-pointer p-3 font-bold flex items-center hover:bg-[#1b5695] justify-center gap-2 shadow-[0_4px_6px_-4px_rgba(13,75,142,0.2),0_10px_15px_-3px_rgba(13,75,142,0.2)]"
                >
                  إنشاء حساب
                  <FaArrowLeft />
                </button>

                <p className="text-center text-sm text-gray-500 mt-3">
                  بنقرك على "إنشاء حساب"، أنت توافق على{" "}
                  <a href="#" className="text-[#0D4B8E] font-bold">
                    الشروط والأحكام
                  </a>{" "}
                  و{" "}
                  <a href="#" className="text-[#0D4B8E] font-bold">
                    سياسة الخصوصية
                  </a>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer
        dir="ltr"
        className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t border-gray-200 gap-3 mt-10"
      >
        <div className="flex gap-6 order-3 md:order-1">
          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            اتصل بنا
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            الشروط والأحكام
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-blue-700">
            سياسة الخصوصية
          </a>
        </div>

        <p className="text-sm text-gray-500 order-2 text-center">
          &copy; 2026 كفيلي - منصة رعاية الأيتام. جميع الحقوق محفوظة
        </p>

        <p className="text-lg font-bold text-blue-900 order-1 md:order-3">
          كفيلي
        </p>
      </footer>
    </>
  );
}
