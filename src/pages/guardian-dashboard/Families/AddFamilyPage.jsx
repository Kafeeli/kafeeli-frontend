import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import { familyApi } from "../../../services/familyApi";

import {
  MdMenu,
  MdNotificationsNone,
  MdPerson,
  MdKeyboardArrowLeft,
  MdLocationOn,
  MdOutlineUploadFile,
  MdSend,
  MdErrorOutline,
} from "react-icons/md";

function TopNavbar({ setOpenSidebar }) {
  return (
    <header className="min-h-[60px] bg-white border-b border-[#DDE2EA] shadow-sm flex items-center justify-between gap-3 px-4 py-2 sm:px-6">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={() => setOpenSidebar(true)}
          className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-[#003469] hover:bg-gray-100 transition shrink-0"
          aria-label="فتح القائمة"
        >
          <MdMenu className="text-2xl" />
        </button>

        <h1 className="font-[Cairo] text-[14px] sm:text-[18px] lg:text-[20px] font-bold text-[#003469] truncate">
          عائلاتي
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[#003469] hover:bg-gray-100 transition"
        >
          <MdNotificationsNone className="text-[18px] sm:text-[20px]" />
          <span className="absolute top-[7px] right-[7px] w-2 h-2 rounded-full bg-red-500 border border-white" />
        </button>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right leading-tight">
            <p className="font-[Cairo] text-[13px] lg:text-[14px] font-bold text-[#003469]">
              أحمد العلي
            </p>
            <p className="font-[Cairo] text-[10px] lg:text-[11px] text-gray-500">
              كفيل معتمد
            </p>
          </div>

          <div className="w-9 h-9 rounded-full border border-[#C2C6D2] bg-gray-100 overflow-hidden flex items-center justify-center">
            <MdPerson className="text-gray-500 text-xl" />
          </div>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center justify-start gap-1 text-[12px] sm:text-[13px] font-[Cairo]">
      <span className="text-[#6B7280]">الرئيسية</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#6B7280]">العائلات</span>
      <MdKeyboardArrowLeft className="text-[#9CA3AF] text-lg" />
      <span className="text-[#003469] font-bold">إضافة عائلة جديدة</span>
    </div>
  );
}

function FieldLabel({ children, required }) {
  return (
    <label className="block mb-2 font-[Cairo] text-[13px] font-bold text-[#374151]">
      {children}
      {required && <span className="text-[#D11F1F] mr-1">*</span>}
    </label>
  );
}

function TextInput({ name, value, onChange, placeholder, icon, error, type = "text", min, disabled }) {
  return (
    <div>
      <div className="relative">
        <input
          name={name}
          type={type}
          min={min}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full h-[48px] rounded-[8px] border bg-white px-4 text-right font-[Cairo] text-[13px] text-[#374151] placeholder:text-[#9CA3AF] outline-none transition focus:ring-2 disabled:bg-gray-50 ${
            error
              ? "border-[#D11F1F] focus:border-[#D11F1F] focus:ring-[#D11F1F]/10"
              : "border-[#CBD5E1] focus:border-[#003469] focus:ring-[#003469]/10"
          }`}
        />

        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280] text-xl">
            {icon}
          </span>
        )}
      </div>

      {error && (
        <p className="mt-1 font-[Cairo] text-[12px] text-[#D11F1F]">{error}</p>
      )}
    </div>
  );
}

function SelectInput({ name, value, onChange, error, disabled }) {
  return (
    <div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full h-[48px] rounded-[8px] border bg-white px-4 font-[Cairo] text-[13px] text-[#374151] outline-none transition focus:ring-2 disabled:bg-gray-50 ${
          error
            ? "border-[#D11F1F] focus:border-[#D11F1F] focus:ring-[#D11F1F]/10"
            : "border-[#CBD5E1] focus:border-[#003469] focus:ring-[#003469]/10"
        }`}
      >
        <option value="">اختر المدينة</option>
        <option value="غزة">غزة</option>
        <option value="رفح">رفح</option>
        <option value="خان يونس">خان يونس</option>
        <option value="دير البلح">دير البلح</option>
      </select>

      {error && (
        <p className="mt-1 font-[Cairo] text-[12px] text-[#D11F1F]">{error}</p>
      )}
    </div>
  );
}

function TextArea({ name, value, onChange, error, disabled }) {
  return (
    <div>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        rows={5}
        placeholder="اكتب تفاصيل عن وضع العائلة المعيشي وعدد الأفراد..."
        className={`w-full min-h-[120px] resize-none rounded-[8px] border bg-white px-4 py-3 text-right font-[Cairo] text-[13px] text-[#374151] placeholder:text-[#9CA3AF] outline-none transition focus:ring-2 disabled:bg-gray-50 ${
          error
            ? "border-[#D11F1F] focus:border-[#D11F1F] focus:ring-[#D11F1F]/10"
            : "border-[#CBD5E1] focus:border-[#003469] focus:ring-[#003469]/10"
        }`}
      />

      {error && (
        <p className="mt-1 font-[Cairo] text-[12px] text-[#D11F1F]">{error}</p>
      )}
    </div>
  );
}

function UploadBox({ file, onChange, error, disabled }) {
  return (
    <div>
      <label
        className={`h-[150px] rounded-[10px] border bg-white hover:bg-[#F8FBFF] transition cursor-pointer flex flex-col items-center justify-center text-center px-4 ${
          error ? "border-[#D11F1F]" : "border-[#BFD0E6]"
        } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
      >
        <input
          type="file"
          className="hidden"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={onChange}
          disabled={disabled}
        />

        <div className="w-[56px] h-[56px] rounded-full bg-[#D9FBF4] flex items-center justify-center mb-3">
          <MdOutlineUploadFile className="text-[#009688] text-[30px]" />
        </div>

        <p className="font-[Cairo] text-[13px] font-bold text-[#007B83] max-w-full truncate">
          {file ? file.name : "اسحب الملف هنا أو انقر للاختيار"}
        </p>

        <p className="mt-1 font-[Cairo] text-[11px] text-[#6B7280]">
          PDF, JPG, PNG - الحد الأقصى 5MB
        </p>
      </label>

      {error && (
        <p className="mt-1 font-[Cairo] text-[12px] text-[#D11F1F]">{error}</p>
      )}
    </div>
  );
}

function AddFamilyForm() {
  const navigate = useNavigate();

  // 🔌 أسماء الحقول هون صارت مطابقة تمامًا لحقول POST /api/v1/guardians/me/families
  const [formData, setFormData] = useState({
    headOfHouseholdName: "",
    city: "",
    monthlyNeedAmount: "",
    address: "",
    caseDescription: "",
    fatherDeathCertificate: null,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  function handleFileChange(event) {
    const file = event.target.files[0];

    setFormData((prevData) => ({
      ...prevData,
      fatherDeathCertificate: file || null,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      fatherDeathCertificate: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.headOfHouseholdName.trim()) {
      newErrors.headOfHouseholdName = "اسم رب الأسرة مطلوب";
    }

    if (!formData.city) {
      newErrors.city = "المدينة مطلوبة";
    }

    if (!formData.monthlyNeedAmount.toString().trim()) {
      newErrors.monthlyNeedAmount = "الاحتياج الشهري مطلوب";
    }

    if (!formData.address.trim()) {
      newErrors.address = "العنوان مطلوب";
    }

    if (!formData.caseDescription.trim()) {
      newErrors.caseDescription = "وصف الحالة مطلوب";
    }

    if (!formData.fatherDeathCertificate) {
      newErrors.fatherDeathCertificate = "شهادة وفاة رب الأسرة مطلوبة";
    }

    if (formData.fatherDeathCertificate) {
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

      if (!allowedTypes.includes(formData.fatherDeathCertificate.type)) {
        newErrors.fatherDeathCertificate = "نوع الملف يجب أن يكون PDF أو JPG أو PNG";
      }

      if (formData.fatherDeathCertificate.size > maxSize) {
        newErrors.fatherDeathCertificate = "حجم الملف يجب ألا يتجاوز 5MB";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);
    setServerError(null);

    try {
      const res = await familyApi.createFamily(formData);
      const newFamilyId = res?.data?.familyId;
      // بعد الإرسال الناجح، العائلة بتصير Pending تلقائيًا — نوجّه لصفحة تفاصيلها
      navigate(newFamilyId ? `/families/${newFamilyId}` : "/families");
    } catch (err) {
      const status = err?.response?.status;
      const apiErrors = err?.response?.data?.errors;
      if (status === 400) {
        setServerError(
          Array.isArray(apiErrors) && apiErrors.length ? apiErrors.join(" - ") : "تحقق من صحة البيانات المدخلة."
        );
      } else if (status === 403) {
        setServerError("حسابك غير مؤهل لإضافة عائلة حاليًا.");
      } else {
        setServerError("تعذر إرسال بيانات العائلة، حاول مجددًا.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-7 bg-white border border-[#CBD5E1] rounded-[10px] shadow-[0_1px_3px_rgba(16,24,40,0.04)] p-5 sm:p-7 lg:p-8"
    >
      {serverError && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <MdErrorOutline className="text-lg shrink-0" />
          <p>{serverError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <FieldLabel required>اسم رب الأسرة المتوفي </FieldLabel>
          <TextInput
            name="headOfHouseholdName"
            value={formData.headOfHouseholdName}
            onChange={handleChange}
            placeholder="الاسم الرباعي كما هو في الهوية"
            error={errors.headOfHouseholdName}
            disabled={submitting}
          />
        </div>

        <div>
          <FieldLabel required>المدينة</FieldLabel>
          <SelectInput
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            disabled={submitting}
          />
        </div>

        <div>
          <FieldLabel required>الاحتياج الشهري المقدّر (شيكل)</FieldLabel>
          <TextInput
            name="monthlyNeedAmount"
            type="number"
            min="0"
            value={formData.monthlyNeedAmount}
            onChange={handleChange}
            placeholder="مثال: 3500"
            error={errors.monthlyNeedAmount}
            disabled={submitting}
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel required>العنوان</FieldLabel>
          <TextInput
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="الحي، الشارع، رقم المنزل"
            icon={<MdLocationOn />}
            error={errors.address}
            disabled={submitting}
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel required>وصف الحالة</FieldLabel>
          <TextArea
            name="caseDescription"
            value={formData.caseDescription}
            onChange={handleChange}
            error={errors.caseDescription}
            disabled={submitting}
          />
        </div>

        <div className="md:col-span-2">
          <FieldLabel required>شهادة وفاة رب الأسرة</FieldLabel>
          <UploadBox
            file={formData.fatherDeathCertificate}
            onChange={handleFileChange}
            error={errors.fatherDeathCertificate}
            disabled={submitting}
          />
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => navigate("/families")}
          disabled={submitting}
          className="h-[52px] rounded-[9px] bg-[#D7E7FF] text-[#374151] font-[Cairo] text-[15px] font-bold hover:bg-[#C9DCF7] transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          إلغاء
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="h-[52px] rounded-[9px] bg-[#003469] text-white font-[Cairo] text-[15px] font-bold hover:bg-[#053c74] transition shadow-[0_6px_14px_rgba(0,62,168,0.18)] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <MdSend className="text-[20px]" />
          {submitting ? "جارٍ الإرسال..." : "حفظ وإرسال للمراجعة"}
        </button>
      </div>
    </form>
  );
}

function AddFamilyPage() {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div dir="rtl" className="min-h-screen bg-[#F6F7F9] font-[Cairo]">
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="العائلات"
      />

      <div className="min-h-screen lg:mr-[256px] flex flex-col">
        <TopNavbar setOpenSidebar={setOpenSidebar} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <div className="w-full max-w-[900px] mx-auto">
            <Breadcrumb />

            <div className="mt-8 text-right">
              <h2 className="font-[Cairo] text-[26px] sm:text-[32px] font-bold text-[#111827]">
                إضافة عائلة
              </h2>

              <p className="mt-3 font-[Cairo] text-[13px] sm:text-[15px] leading-7 text-[#6B7280]">
                أدخل بيانات العائلة وارفع شهادة وفاة رب الأسرة ليتم مراجعتها من
                الإدارة، يرجى التأكد من دقة البيانات المرفوعة.
              </p>
            </div>

            <AddFamilyForm />
          </div>
        </main>

        <footer className="mt-10 sm:mt-14 lg:mt-20 border-t border-[#E5E7EB] text-center px-4">
          <p className="text-xs sm:text-sm text-[#6B7280] mt-4 mb-4">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}

export default AddFamilyPage;
