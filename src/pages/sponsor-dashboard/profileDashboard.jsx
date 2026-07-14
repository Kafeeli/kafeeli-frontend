import { useState, useEffect, useCallback, useRef } from "react";
import { sponsorApi } from "../../services/sponsorApi";
import ChangePasswordModal from "../guardian-dashboard/ChangePasswordModal";

import {
  MdMenu,
  MdDashboard,
  MdPerson,
  MdDescription,
  MdFamilyRestroom,
  MdSettings,
  MdNotificationsNone,
  MdAccountBalanceWallet,
  MdPayments,
  MdPublishedWithChanges,
  MdSentimentSatisfiedAlt,
  MdCheckCircle,
  MdStars,
  MdLockReset,
  MdLock,
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdOutlineCalendarToday,
  MdInfoOutline,
  MdSave,
} from "react-icons/md";

import { LuPencil } from "react-icons/lu";
import { FaRestroom, FaUserTie } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";

import Sidebar from "./Sidebar";
import personalImage from "../../assets/personal.jpg";

function getApiBody(response) {
  if (!response || typeof response !== "object") return response;

  const axiosBody = response.data;
  if (
    axiosBody &&
    typeof axiosBody === "object" &&
    ("success" in axiosBody ||
      "succeeded" in axiosBody ||
      "isSuccess" in axiosBody ||
      "fullName" in axiosBody ||
      "phoneNumber" in axiosBody ||
      "errors" in axiosBody)
  ) {
    return axiosBody;
  }

  return response;
}

function normalizeApiResponse(response) {
  const body = getApiBody(response) || {};
  const explicitSuccess = body.success ?? body.succeeded ?? body.isSuccess;
  const data = body.data ?? body.result ?? body;

  return {
    success: explicitSuccess !== false && Boolean(data),
    data,
    message: body.message || body.title || "",
  };
}

function flattenServerErrors(errors) {
  if (!errors) return [];

  if (Array.isArray(errors)) {
    return errors.flatMap((item) => flattenServerErrors(item));
  }

  if (typeof errors === "object") {
    return Object.values(errors).flatMap((item) => flattenServerErrors(item));
  }

  return [String(errors)];
}

function getRequestErrorMessage(error, fallbackMessage) {
  const status = error?.response?.status;
  const responseData = error?.response?.data || {};
  const serverMessage = responseData.message || responseData.title;
  const serverErrors = flattenServerErrors(responseData.errors);
  const details = [serverMessage, ...serverErrors].filter(Boolean);

  if (status === 400) {
    return details.length ? details.join(" - ") : "بيانات غير صالحة";
  }

  if (status === 401) {
    return "انتهت الجلسة، الرجاء تسجيل الدخول من جديد";
  }

  if (status === 403) {
    return "غير مصرح لك بتنفيذ هذه العملية";
  }

  if (status === 404) {
    return "لا يوجد ملف شخصي لهذا الحساب";
  }

  if (status === 409) {
    return details.length ? details.join(" - ") : "تعارض في البيانات، أعد المحاولة";
  }

  if (status === 422) {
    return details.length ? details.join(" - ") : "تعذر التحقق من البيانات المدخلة";
  }

  if (status >= 500) {
    return "حدث خطأ في الخادم، حاول مرة أخرى لاحقًا";
  }

  if (!error?.response) {
    return "تعذر الاتصال بالخادم، تحقق من اتصال الإنترنت";
  }

  return details.length ? details.join(" - ") : fallbackMessage;
}

function normalizeGender(gender) {
  if (gender === 1 || gender === "1" || gender === "ذكر" || gender === "Male") {
    return "ذكر";
  }

  if (gender === 2 || gender === "2" || gender === "أنثى" || gender === "Female") {
    return "أنثى";
  }

  return "";
}

const CITY_ALIASES = {
  "خانيونس": "خان يونس",
  "خان يونس": "خان يونس",
};

function normalizeCity(city) {
  if (!city) return "";

  const trimmedCity = String(city).trim();
  return CITY_ALIASES[trimmedCity] || trimmedCity;
}

function normalizeCityForApi(city) {
  return normalizeCity(city);
}

function formatDateOnly(value) {
  if (!value) return "";
  return String(value).split("T")[0];
}

function formatJoinDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// أنواع/حجم الصور المسموحة حسب توثيق الـ API
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE_MB = 2;

function validateImageFile(file) {
  if (!file) return "";

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "صيغة الصورة غير مدعومة، الرجاء اختيار JPG أو PNG أو WEBP";
  }

  if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
    return `حجم الصورة يجب ألا يتجاوز ${MAX_IMAGE_SIZE_MB} ميجابايت`;
  }

  return "";
}

function mapProfileData(profile) {
  return {
    name: profile?.fullName || profile?.name || "",
    email: profile?.email || "",
    phone: profile?.phoneNumber || profile?.phone || "",
    gender: normalizeGender(profile?.gender),
    country: profile?.country || "",
    city: normalizeCity(profile?.city),
    birthDate: formatDateOnly(profile?.dateOfBirth || profile?.birthDate),
    joinDate: formatJoinDate(profile?.joinedAt || profile?.joinDate),
    accountStatus: profile?.accountStatus || "",
    emailVerificationStatus: profile?.emailVerificationStatus || "",
    // نضيف طابع زمني لكسر الكاش، وإلا المتصفح ممكن يعرض نفس الصورة القديمة المخزنة لنفس الرابط
    profileImageUrl: profile?.profileImageUrl
      ? `${profile.profileImageUrl}${profile.profileImageUrl.includes("?") ? "&" : "?"}t=${Date.now()}`
      : null,
    hasProfileImage: Boolean(profile?.hasProfileImage),
  };
}

function validateProfile(formData) {
  const phone = formData.phone.trim();

  if (!phone) return "رقم الهاتف مطلوب";
  if (!/^[+\d\s\-()]{7,20}$/.test(phone)) {
    return "رقم الهاتف غير صالح";
  }

  if (!formData.gender) return "يرجى اختيار الجنس";
  if (!formData.city) return "يرجى اختيار المدينة";
  if (!formData.birthDate) return "تاريخ الميلاد مطلوب";

  const birthDate = new Date(`${formData.birthDate}T00:00:00`);
  if (Number.isNaN(birthDate.getTime())) return "تاريخ الميلاد غير صالح";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (birthDate > today) return "تاريخ الميلاد لا يمكن أن يكون في المستقبل";

  return "";
}

function SponsorProfile() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // حالة إظهار مودال تحديث كلمة المرور
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // حالات خاصة برفع الصورة الشخصية
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const fetchProfile = useCallback(async ({ showLoader = true, clearError = true } = {}) => {
    if (showLoader) setLoading(true);
    if (clearError) setErrorMsg(null);

    try {
      const response = await sponsorApi.getProfile();
      const result = normalizeApiResponse(response);

      if (!result.success) {
        setErrorMsg(result.message || "تعذر تحميل البيانات");
        return false;
      }

      const mapped = mapProfileData(result.data);
      setFormData({ ...mapped });
      setOriginalData({ ...mapped });
      return true;
    } catch (error) {
      const status = error?.response?.status;

      if (status === 403) {
        setErrorMsg("هذا الحساب ليس حساب كفيل");
      } else {
        setErrorMsg(getRequestErrorMessage(error, "حدث خطأ أثناء تحميل البيانات"));
      }

      return false;
    } finally {
      if (showLoader) setLoading(false);
    }
  }, []);

  /* ==================== جلب بيانات البروفايل عند فتح الصفحة ==================== */
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // تنظيف رابط المعاينة المؤقت عند إزالته أو إغلاق الصفحة، لتفادي تسريب الذاكرة
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMsg) setErrorMsg(null);
  };

  const handlePencilClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setErrorMsg(validationError);
      event.target.value = "";
      return;
    }

    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);

    setSelectedImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    setErrorMsg(null);
  };

  const handleCancel = () => {
    setFormData(originalData ? { ...originalData } : null);
    setIsEditing(false);
    setErrorMsg(null);

    if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    setImagePreviewUrl(null);
    setSelectedImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    if (!formData || saving) return;

    const validationError = validateProfile(formData);
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setSaving(true);
    setErrorMsg(null);

    try {
      const genderValue = formData.gender === "ذكر" ? 1 : 2;
      const cleanedFormData = {
        ...formData,
        phone: formData.phone.trim(),
        city: normalizeCityForApi(formData.city),
      };

      const payload = {
        phoneNumber: cleanedFormData.phone,
        gender: genderValue,
        city: cleanedFormData.city,
        dateOfBirth: cleanedFormData.birthDate,
        profileImage: selectedImageFile || undefined,
      };

      const response = await sponsorApi.updateProfile(payload);
      const result = normalizeApiResponse(response);

      if (!result.success) {
        setErrorMsg(result.message || "تعذر حفظ التعديلات");
        return;
      }

      setFormData({ ...cleanedFormData });
      setOriginalData({ ...cleanedFormData });
      setIsEditing(false);
      setSelectedImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      // مزامنة صامتة مع السيرفر أولاً، ونبقي المعاينة المحلية ظاهرة لحين وصول
      // رابط الصورة الجديد من السيرفر، فما يصير "ارتداد" لحظي للصورة القديمة.
      await fetchProfile({ showLoader: false, clearError: false });

      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
        setImagePreviewUrl(null);
      }
    } catch (error) {
      setErrorMsg(getRequestErrorMessage(error, "حدث خطأ أثناء حفظ التعديلات"));
    } finally {
      setSaving(false);
    }
  };

  const menuItems = [
    { title: "لوحة التحكم", icon: <MdDashboard />, active: false },
    { title: "ملفي الشخصي", icon: <MdPerson />, active: true },
    { title: "الأيتام المكفولين", icon: <MdSentimentSatisfiedAlt />, active: false },
    { title: "المحفظة والدفعات", icon: <MdAccountBalanceWallet />, active: false },
    { title: "التقارير الدورية", icon: <MdDescription />, active: false },
    { title: "التنبيهات", icon: <MdNotificationsNone />, active: false },
    { title: "الإعدادات", icon: <MdSettings />, active: false },
  ];

  /* ==================== حالات التحميل والخطأ قبل عرض الصفحة ==================== */
  if (loading) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-[#003469] font-bold text-lg">...جاري تحميل البيانات</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-red-600 font-bold text-lg">
          {errorMsg || "تعذر تحميل البيانات"}
        </p>
      </div>
    );
  }

  // مصدر الصورة الظاهرة: المعاينة المحلية أولاً (لو المستخدم اختار صورة جديدة)، ثم صورة السيرفر، وإلا الصورة الافتراضية
  const avatarSrc = imagePreviewUrl || formData.profileImageUrl || personalImage;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8fafc] flex overflow-x-hidden font-[Cairo,sans-serif] text-right"
    >
      <Sidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeItem="ملفي الشخصي"
        menuItems={menuItems}
      />

      {/* input الملف مخفي، عام لكل الصفحة، وتشغله أيقونة القلم */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="flex-1 min-w-0 w-full lg:mr-[255px] flex flex-col justify-between">
        <header className="w-full h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#424750] hover:bg-gray-50 transition shrink-0 cursor-pointer"
            >
              <MdMenu className="text-2xl" />
            </button>
            <h1 className="font-bold text-[16px] text-[#003469] truncate">
              ملفي الشخصي - الكفيل
            </h1>
          </div>

          <div dir="ltr" className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src={avatarSrc}
                alt="صورة الكفيل"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div dir="rtl" className="text-right hidden sm:block">
                <h3 className="font-bold text-[13px] text-[#111827] leading-tight">
                  {formData.name}
                </h3>
                <p className="text-[11px] text-gray-500">كفيل معتمد</p>
              </div>
            </div>
            <div className="w-px h-6 bg-[#D8DEE8]" />
            <button className="relative w-8 h-8 flex items-center justify-center text-[#111827] hover:bg-gray-50 rounded-lg transition cursor-pointer">
              <MdNotificationsNone className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>
          </div>
        </header>

        {/* =================================================================== */}
        {/* 🖥️ DESKTOP VIEW */}
        {/* =================================================================== */}
        <main className="hidden lg:block p-6 flex-1">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-[309px_1fr] gap-6 items-stretch">
              <div className="flex flex-col gap-5 order-2 lg:order-1 h-full">
                <section className="w-full bg-white rounded-[12px] border border-[#C2C6D2] shadow-sm overflow-hidden shrink-0">
                  <div className="h-[96px] bg-[#003469]" />
                  <div className="px-5 pb-6 text-center -mt-12">
                    <div className="relative w-[92px] mx-auto">
                      <img
                        src={avatarSrc}
                        alt="Sponsor Avatar"
                        className="w-[92px] h-[92px] mx-auto rounded-full border-4 border-white shadow-sm object-cover bg-white"
                      />
                      <button
                        type="button"
                        onClick={handlePencilClick}
                        disabled={!isEditing}
                        title={isEditing ? "تغيير الصورة الشخصية" : "فعّلي وضع التعديل أولاً لتغيير الصورة"}
                        className={`absolute bottom-0 left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition ${
                          isEditing
                            ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <LuPencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="mt-3.5 font-bold text-[16px] text-[#111827]">
                      {formData.name}
                    </h3>
                    <p className="mt-1 text-[13px] text-gray-500 leading-relaxed">
                      عضو في كفيلي منذ عامين، ساهم في كفالة 5 أطفال
                    </p>

                    <div className="mt-5 flex flex-col gap-2 text-[13px]">
                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium">حالة الحساب</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold text-[12px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-1" />
                          {formData.accountStatus || "نشط"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium">البريد الإلكتروني</span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003469] font-bold text-[12px]">
                          <MdCheckCircle className="text-blue-500" />
                          {formData.emailVerificationStatus || "موثق"}
                        </span>
                      </div>

                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium flex items-center gap-1">
                          <MdStars className="text-amber-500 text-base" /> الانضمام
                        </span>
                        <span className="font-bold text-gray-700 text-[12px]">
                          {formData.joinDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="w-full bg-white rounded-[12px] border border-[#C2C6D2] shadow-sm p-6 flex flex-col justify-center flex-1">
                  <div className="space-y-4">
                    <h3 className="font-bold text-[16px] text-[#003469] flex items-center gap-2">
                      <MdLockReset className="text-xl" /> أمن الحساب
                    </h3>
                    <p className="text-[13px] text-gray-600 leading-relaxed">
                      ينصح بتغيير كلمة المرور كل 3 أشهر لضمان أعلى درجات الأمان.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="w-full mt-6 py-2.5 border border-[#003469] text-[#003469] rounded-lg font-bold text-[14px] hover:bg-[#003469] hover:text-white transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MdLock /> تحديث كلمة المرور
                  </button>
                </section>
              </div>

              <div className="order-1 lg:order-2 h-full">
                <section className="w-full h-full bg-white rounded-xl border border-[#D8DEE8] overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="w-full bg-[#F3F4F5] border-b border-[#D8DEE8] px-6 py-4 flex items-center justify-between shrink-0">
                    <div>
                      <h3 className="text-[16px] font-bold text-[#003469]">
                        تعديل البيانات الشخصية
                      </h3>
                      <p className="text-[12px] text-[#6B7280] mt-0.5">
                        تحديث معلومات التواصل ومكان الإقامة
                      </p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="h-9 px-4 bg-[#003469] text-white rounded-md flex items-center gap-2 text-[13px] font-medium hover:bg-[#002b57] transition cursor-pointer"
                      >
                        <span>تعديل البيانات</span>
                        <LuPencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {errorMsg && (
                    <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-2.5">
                      {errorMsg}
                    </div>
                  )}

                  <div className="p-6 space-y-5 flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#424750]">
                          الاسم الكامل (غير قابل للتعديل)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.name}
                            readOnly
                            disabled
                            className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none cursor-not-allowed"
                          />
                          <MdOutlinePerson className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#424750]">
                          البريد الإلكتروني (غير قابل للتعديل)
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            value={formData.email}
                            readOnly
                            disabled
                            dir="ltr"
                            className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] pl-10 pr-10 text-left text-sm text-gray-500 outline-none cursor-not-allowed"
                          />
                          <MdOutlineEmail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          رقم الهاتف
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          />
                          <MdOutlinePhone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          الجنس
                        </label>
                        <div className="relative">
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none appearance-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <option value="" hidden>
                              اختر الجنس
                            </option>
                            <option value="ذكر">ذكر</option>
                            <option value="أنثى">أنثى</option>
                          </select>
                          <FaRestroom className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#424750]">
                          الدولة (غير قابل للتعديل)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.country}
                            readOnly
                            disabled
                            className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none cursor-not-allowed"
                          />
                          <IoEarthSharp className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          المدينة
                        </label>
                        <div className="relative">
                          <select
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none appearance-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <option value="" hidden>
                              اختر المدينة
                            </option>
                            <option value="غزة">غزة</option>
                            <option value="خان يونس">خان يونس</option>
                            <option value="بيت لاهيا">بيت لاهيا</option>
                            <option value="بيت حانون">بيت حانون</option>
                            <option value="نصيرات">نصيرات</option>
                            <option value="دير البلح">دير البلح</option>
                            <option value="رفح">رفح</option>
                            <option value="جباليا">جباليا</option>
                          </select>
                          <MdOutlineLocationOn className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          تاريخ الميلاد
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                              isEditing
                                ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                                : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                            }`}
                          />
                          <MdOutlineCalendarToday className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 text-sm text-[#006B70]">
                      <MdInfoOutline className="text-lg shrink-0" />
                      <p>
                        سيتم تدقيق البيانات المحدثة من قبل فريقنا لضمان دقة معلومات الكفالة.
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5E7EB] flex items-center gap-3">
                      <button
                        onClick={handleSave}
                        disabled={!isEditing || saving}
                        className={`h-9 px-5 rounded-md text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm transition ${
                          isEditing && !saving
                            ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                            : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                      >
                        <MdSave /> {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={!isEditing || saving}
                        className={`h-9 px-5 rounded-md border text-[13px] font-bold transition ${
                          isEditing
                            ? "border-[#D0D5DD] bg-white text-slate-600 hover:bg-gray-50 cursor-pointer"
                            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        إلغاء
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>

        {/* =================================================================== */}
        {/* 📱 MOBILE VIEW */}
        {/* =================================================================== */}
        <main className="lg:hidden p-4 space-y-5 flex-1 bg-[#f8fafc]">
          <section className="w-full bg-white rounded-xl border border-[#C2C6D2] shadow-sm overflow-hidden">
            <div className="h-24 bg-[#003469]" />
            <div className="px-5 pb-5 text-center -mt-11">
              <div className="relative w-[92px] mx-auto">
                <img
                  src={avatarSrc}
                  alt="Sponsor Avatar Mobile"
                  className="w-[92px] h-[92px] mx-auto rounded-full border-4 border-white shadow-sm object-cover bg-white"
                />
                <button
                  type="button"
                  onClick={handlePencilClick}
                  disabled={!isEditing}
                  title={isEditing ? "تغيير الصورة الشخصية" : "فعّلي وضع التعديل أولاً لتغيير الصورة"}
                  className={`absolute bottom-0 left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition ${
                    isEditing
                      ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <LuPencil className="w-3.5 h-3.5" />
                </button>
              </div>
              <h3 className="mt-3 font-bold text-[16px] text-[#111827]">
                {formData.name}
              </h3>
              <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                عضو في كفيلي منذ عامين، ساهم في كفالة 5 أطفال
              </p>

              <div className="mt-4 flex flex-col gap-2 text-[13px] text-right">
                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium">حالة الحساب</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 font-bold text-[12px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 ml-1" />
                    {formData.accountStatus || "نشط"}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium">البريد الإلكتروني</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003469] font-bold text-[12px]">
                    <MdCheckCircle className="text-blue-500" />
                    {formData.emailVerificationStatus || "موثق"}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <MdStars className="text-amber-500 text-base" /> الانضمام
                  </span>
                  <span className="font-bold text-gray-700 text-[12px]">
                    {formData.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-white rounded-xl border border-[#C2C6D2] p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-[15px] text-[#003469] flex items-center gap-2">
              <MdLockReset className="text-xl" /> أمن الحساب
            </h3>
            <p className="text-[12px] text-gray-600 leading-relaxed">
              ينصح بتغيير كلمة المرور كل 3 أشهر لحماية حسابك.
            </p>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full py-2 border border-[#003469] text-[#003469] rounded-lg font-bold text-[13px] hover:bg-[#003469] hover:text-white transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MdLock /> تحديث كلمة المرور
            </button>
          </section>

          <section className="w-full bg-white rounded-xl border border-[#D8DEE8] p-5 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[16px] text-[#003469]">
                  تعديل البيانات الشخصية
                </h3>
                <p className="text-[12px] text-[#6B7280] mt-0.5">
                  تحديث معلومات التواصل والإقامة
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[13px] font-bold text-[#003469] flex items-center gap-1 cursor-pointer"
                >
                  <LuPencil /> تعديل
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm px-4 py-2.5">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#424750]">
                  الاسم الكامل (غير قابل للتعديل)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    readOnly
                    disabled
                    className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500 outline-none"
                  />
                  <MdOutlinePerson className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#424750]">
                  البريد الإلكتروني (غير قابل للتعديل)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    readOnly
                    disabled
                    className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] pl-10 pr-10 text-left text-sm text-gray-500 outline-none"
                    dir="ltr"
                  />
                  <MdOutlineEmail className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-bold text-[#003469]">
                  رقم الهاتف
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                      isEditing
                        ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                        : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                    }`}
                  />
                  <MdOutlinePhone className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#003469]">
                    الجنس
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none appearance-none transition ${
                        isEditing
                          ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                          : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <option value="" hidden>
                        اختر الجنس
                      </option>
                      <option value="ذكر">ذكر</option>
                      <option value="أنثى">أنثى</option>
                    </select>
                    <FaRestroom className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#003469]">
                    تاريخ الميلاد
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition ${
                        isEditing
                          ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                          : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                      }`}
                    />
                    <MdOutlineCalendarToday className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#424750]">
                    الدولة (غير قابل للتعديل)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.country}
                      readOnly
                      disabled
                      className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-[#F9FAFB] px-4 pr-10 text-sm text-gray-500"
                    />
                    <IoEarthSharp className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[13px] font-bold text-[#003469]">
                    المدينة
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none appearance-none transition ${
                        isEditing
                          ? "border-[#D0D5DD] bg-white focus:border-[#003469]"
                          : "border-gray-200 bg-gray-50/80 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <option value="" hidden>
                        اختر المدينة
                      </option>
                      <option value="غزة">غزة</option>
                      <option value="خان يونس">خان يونس</option>
                      <option value="بيت لاهيا">بيت لاهيا</option>
                      <option value="بيت حانون">بيت حانون</option>
                      <option value="نصيرات">نصيرات</option>
                      <option value="دير البلح">دير البلح</option>
                      <option value="رفح">رفح</option>
                      <option value="جباليا">جباليا</option>
                    </select>
                    <MdOutlineLocationOn className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 text-sm text-[#006B70] leading-relaxed">
                <MdInfoOutline className="text-lg shrink-0 mt-0.5" />
                <p>
                  سيتم تدقيق البيانات المحدثة من قبل فريقنا لضمان دقة معلومات الكفالة.
                </p>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  onClick={handleSave}
                  disabled={!isEditing || saving}
                  className={`flex-1 h-11 rounded-lg text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm transition ${
                    isEditing && !saving
                      ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                      : "bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  }`}
                >
                  <MdSave /> {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={!isEditing || saving}
                  className={`h-11 px-5 rounded-lg border text-[13px] font-bold transition ${
                    isEditing
                      ? "border-[#D0D5DD] bg-white text-slate-600 hover:bg-gray-50 cursor-pointer"
                      : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  إلغاء
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="w-full h-[54px] bg-white border-t border-[#E5E7EB] flex items-center justify-center px-4 shrink-0 z-10">
          <p className="text-[12px] text-center text-gray-400">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>

      {/* ============================== Overlay Modal Component ============================== */}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => {
            // المودال بيسكر حاله بنفسه بعد النجاح، هون فقط لو بدك تعرض توست/رسالة نجاح
          }}
        />
      )}
    </div>
  );
}

export default SponsorProfile;
