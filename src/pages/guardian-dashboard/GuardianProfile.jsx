import { useState, useEffect, useRef } from "react";
import ChangePasswordModal from "./ChangePasswordModal";
import { bankAccountApi } from "../../services/bankAccountApi";

import {
  // إدارة القوائم والهيدر
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

  // أيقونات الحقول والتوثيق
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
  MdErrorOutline,
} from "react-icons/md";

import { LuPencil } from "react-icons/lu";
import { FaRestroom } from "react-icons/fa";
import { IoEarthSharp } from "react-icons/io5";

// استيراد الملفات الخارجية المنفصلة التابعة لمشروعك
import Sidebar from "./Sidebar";
import TransferDataSection from "./TransferDataSection";
import TransferDataModal from "./TransferDataModal";

import personalImage from "../../assets/personal.jpg";

/* ========================================================================== */
/* ⚙️ أدوات مساعدة لتحويل شكل بيانات الـ API إلى شكل الفورم والعكس         */
/* ========================================================================== */
const INITIAL_TRANSFER_STATUS = "empty";

// الشكل الفعلي لـ GET بيكون { data: { payoutAccount: {...} | null } }، بينما استجابة
// POST/PUT ممكن ترجع الحساب مباشرة جوه data. هاي الدالة بتتعامل مع الشكلين.
function extractBankAccount(responseData) {
  if (!responseData) return null;
  if (responseData.payoutAccount !== undefined) return responseData.payoutAccount;
  if (responseData.bankAccountId) return responseData;
  return null;
}

// يحوّل verificationStatus الراجع من GET /api/v1/guardians/me/bank-accounts
// إلى الحالة يلي بيفهمها TransferDataSection/TransferDataModal
function mapBankAccountStatus(apiStatus) {
  switch (apiStatus) {
    case "Pending":
      return "pendingReview";
    case "NeedsUpdate":
      return "needsUpdate";
    case "Verified":
    case "Approved":
      return "approved";
    default:
      return "empty";
  }
}

// الجنس بالـ API بيجي/بيتبعت كـ "Male" أو "Female"، وبالفورم منعرضه بالعربي
const GENDER_OPTIONS = [
  { value: "Male", label: "ذكر" },
  { value: "Female", label: "أنثى" },
];

// نفس قائمة المدن المستخدمة بصفحة الكفيل
const CITY_OPTIONS = [
  "غزة",
  "خان يونس",
  "بيت لاهيا",
  "بيت حانون",
  "نصيرات",
  "دير البلح",
  "رفح",
  "جباليا",
];

const VERIFICATION_LABELS = {
  Verified: { text: "موثق", className: "bg-teal-50 text-teal-700" },
  Pending: { text: "قيد المراجعة", className: "bg-amber-50 text-amber-700" },
  Rejected: { text: "مرفوض", className: "bg-red-50 text-red-700" },
};

// يحول تاريخ ISO كامل (زي joinedAt) إلى شكل عربي مقروء
function formatJoinDate(isoString) {
  if (!isoString) return "—";
  try {
    return new Date(isoString).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return isoString;
  }
}

// يحول أي شكل تاريخ راجع من السيرفر إلى yyyy-MM-dd المطلوب لحقل <input type="date">
function toDateInputValue(dateString) {
  if (!dateString) return "";
  return dateString.split("T")[0];
}

// يبني formData الأولي من استجابة GET /api/v1/guardians/me
function mapProfileToFormData(profile) {
  return {
    fullName: profile.fullName ?? "",
    email: profile.email ?? "",
    phoneNumber: profile.phoneNumber ?? "",
    gender: profile.gender ?? "Male",
    city: profile.city ?? "",
    country: profile.country ?? "",
    dateOfBirth: toDateInputValue(profile.dateOfBirth),
    joinedAt: profile.joinedAt ?? "",
    profileImageUrl: profile.profileImageUrl ?? "",
    hasProfileImage: profile.hasProfileImage ?? false,
    verificationStatus: profile.verificationStatus ?? "Pending",
  };
}

function GuardianProfile() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [transferStatus, setTransferStatus] = useState(INITIAL_TRANSFER_STATUS);
  const [transferData, setTransferData] = useState(null);
  const [transferReviewReason, setTransferReviewReason] = useState("");
  const [transferAccountId, setTransferAccountId] = useState(null);
  const [transferLoading, setTransferLoading] = useState(true);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // حالات جلب البيانات من الـ API
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // حالات التحكم بالتعديل والحفظ
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);

  // صورة البروفايل الجديدة (ملف) ومعاينتها
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  /* ---------------------------- جلب بيانات الوصي ---------------------------- */
  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      setLoading(true);
      setLoadError(null);
      try {
        const res = await guardianApi.getProfile();
        if (cancelled) return;
        const mapped = mapProfileToFormData(res.data);
        setFormData(mapped);
        setOriginalData(mapped);
      } catch (err) {
        if (cancelled) return;
        if (err?.response?.status === 401) {
          setLoadError("انتهت صلاحية الجلسة، الرجاء تسجيل الدخول من جديد.");
        } else if (err?.response?.status === 403) {
          setLoadError("هذا الحساب غير مسجل كوصي.");
        } else if (err?.response?.status === 404) {
          setLoadError("لم يتم العثور على ملف الوصي.");
        } else {
          setLoadError("حدث خطأ أثناء جلب بيانات الملف الشخصي، حاول مجددًا.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------------------------- جلب بيانات التحويل (حساب الدفع) ---------------------------- */
  useEffect(() => {
    let cancelled = false;

    const fetchBankAccount = async () => {
      setTransferLoading(true);
      try {
        const res = await bankAccountApi.getBankAccount();
        if (cancelled) return;
        // الشكل الفعلي: { data: { payoutAccount: {...} | null, canAddAccount: bool } }
        const account = extractBankAccount(res?.data);

        if (!account) {
          setTransferStatus("empty");
          setTransferData(null);
          setTransferAccountId(null);
          setTransferReviewReason("");
        } else {
          setTransferStatus(mapBankAccountStatus(account.verificationStatus));
          setTransferData({
            bankName: account.bankName,
            isWalletProvider: account.isWalletProvider,
            accountHolderName: account.accountHolderName,
            accountNumberMasked: account.accountNumberMasked,
            ibanMasked: account.ibanMasked,
            branchName: account.branchName,
            canEdit: Boolean(account.canEdit),
          });
          setTransferAccountId(account.bankAccountId);
          setTransferReviewReason(account.reviewReason || "");
        }
      } catch (err) {
        if (cancelled) return;
        // 404 يعني ببساطة ما في حساب مضاف بعد
        if (err?.response?.status === 404) {
          setTransferStatus("empty");
          setTransferData(null);
          setTransferAccountId(null);
        }
        // بقية الأخطاء (401/403/500) منتجاهلها هون بصمت ونسيب حالة "غير مضافة"،
        // القسم مو حرج بما يكفي إنه يوقف عرض باقي الصفحة
      } finally {
        if (!cancelled) setTransferLoading(false);
      }
    };

    fetchBankAccount();
    return () => {
      cancelled = true;
    };
  }, []);

  // تنظيف رابط المعاينة المؤقت عند تغييره أو إغلاق الصفحة، لتفادي تسريب الذاكرة
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  /* ---------------------------- التعامل مع تغيير المدخلات ---------------------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePencilClick = () => {
    if (!isEditing) return;
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // تحقق سريع من النوع والحجم قبل الإرسال (نفس الشروط المذكورة بالـ API)
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setFieldErrors((prev) => ({
        ...prev,
        profileImage: "الصيغ المسموحة فقط: JPG, PNG, WEBP.",
      }));
      e.target.value = "";
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFieldErrors((prev) => ({
        ...prev,
        profileImage: "الحجم الأقصى المسموح به هو 2 ميجابايت.",
      }));
      e.target.value = "";
      return;
    }

    if (imagePreview) URL.revokeObjectURL(imagePreview);

    setFieldErrors((prev) => ({ ...prev, profileImage: undefined }));
    setNewProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  /* ---------------------------- إلغاء التعديل ---------------------------- */
  const handleCancel = () => {
    setFormData(originalData);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setNewProfileImage(null);
    setImagePreview(null);
    setFieldErrors({});
    setSaveError(null);
    setIsEditing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ---------------------------- حفظ التعديل ---------------------------- */
  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);
    setFieldErrors({});

    try {
      const res = await guardianApi.updateProfile({
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        city: formData.city,
        profileImage: newProfileImage,
      });

      const mapped = mapProfileToFormData(res.data);
      setFormData(mapped);
      setOriginalData(mapped);
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setNewProfileImage(null);
      setImagePreview(null);
      setIsEditing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400) {
        // الـ API بيرجع أخطاء تفصيلية لكل حقل ضمن errors[]
        const apiErrors = err?.response?.data?.errors;
        if (Array.isArray(apiErrors) && apiErrors.length > 0) {
          setSaveError(apiErrors.join(" — "));
        } else {
          setSaveError("تحقق من صحة البيانات المدخلة وحاول مجددًا.");
        }
      } else if (status === 401) {
        setSaveError("انتهت صلاحية الجلسة، الرجاء تسجيل الدخول من جديد.");
      } else if (status === 403) {
        setSaveError("لا تملك صلاحية تعديل هذا الملف.");
      } else if (status === 404) {
        setSaveError("لم يتم العثور على ملف الوصي.");
      } else {
        setSaveError("حدث خطأ غير متوقع أثناء الحفظ، حاول مجددًا.");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleAddTransfer = () => {
    setModalMode("add");
    setShowTransferModal(true);
  };
  const handleEditTransfer = () => {
    setModalMode("edit");
    setShowTransferModal(true);
  };

  // بيترمى الخطأ للمودال نفسه يعرضه (TransferDataModal بيلتقطه بـ try/catch)
  const handleSubmitTransfer = async (formData) => {
    let res;
    if (modalMode === "add") {
      res = await bankAccountApi.createBankAccount(formData);
    } else {
      res = await bankAccountApi.updateBankAccount(transferAccountId, formData);
    }

    const account = extractBankAccount(res?.data);
    if (account) {
      setTransferStatus(mapBankAccountStatus(account.verificationStatus));
      setTransferData({
        bankName: account.bankName,
        isWalletProvider: account.isWalletProvider,
        accountHolderName: account.accountHolderName,
        accountNumberMasked: account.accountNumberMasked,
        ibanMasked: account.ibanMasked,
        branchName: account.branchName,
        canEdit: Boolean(account.canEdit),
      });
      setTransferAccountId(account.bankAccountId);
      setTransferReviewReason(account.reviewReason || "");
    }
    setShowTransferModal(false);
  };

  const menuItems = [
    { title: "لوحة التحكم", icon: <MdDashboard />, active: false },
    { title: "ملفي الشخصي", icon: <MdPerson />, active: true },
    { title: "وثائقي", icon: <MdDescription />, active: false },
    { title: "العائلات", icon: <MdFamilyRestroom />, active: false },
    { title: "الأيتام", icon: <MdSentimentSatisfiedAlt />, active: false },
    { title: "المحفظة", icon: <MdAccountBalanceWallet />, active: false },
    { title: "المدفوعات", icon: <MdPayments />, active: false },
    {
      title: "التحديثات الدورية",
      icon: <MdPublishedWithChanges />,
      active: false,
    },
    { title: "التنبيهات", icon: <MdNotificationsNone />, active: false },
    { title: "الإعدادات", icon: <MdSettings />, active: false },
  ];

  /* ---------------------------- حالات التحميل والخطأ العامة ---------------------------- */
  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-[Cairo,sans-serif]"
      >
        <p className="text-[#003469] font-bold text-sm animate-pulse">
          جارٍ تحميل بيانات الملف الشخصي...
        </p>
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#f8fafc] flex items-center justify-center font-[Cairo,sans-serif] p-4"
      >
        <div className="bg-white border border-red-200 rounded-xl p-6 max-w-md text-center space-y-3">
          <MdErrorOutline className="text-red-500 text-4xl mx-auto" />
          <p className="text-[#111827] font-bold text-sm">{loadError}</p>
        </div>
      </div>
    );
  }

  const verification =
    VERIFICATION_LABELS[formData.verificationStatus] ||
    VERIFICATION_LABELS.Pending;

  const avatarSrc = imagePreview || formData.profileImageUrl || personalImage;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f8fafc] flex overflow-x-hidden font-[Cairo,sans-serif] text-right"
    >
      {/* ============================== Sidebar ============================== */}
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

      {/* ====================== Main Content Body ======================== */}
      <div className="flex-1 min-w-0 w-full lg:mr-[255px] flex flex-col justify-between">
        {/* ---------------------------- Top Navbar ---------------------------- */}
        <header className="w-full h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 z-20 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenSidebar(true)}
              className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#424750] hover:bg-gray-50 transition shrink-0 cursor-pointer"
            >
              <MdMenu className="text-2xl" />
            </button>
            <h1 className="font-bold text-[16px] text-[#003469] truncate">
              ملفي الشخصي - الوصي
            </h1>
          </div>

          <div dir="ltr" className="flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2.5">
              <img
                src={avatarSrc}
                alt="صورة المستخدم"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div dir="rtl" className="text-right hidden sm:block">
                <h3 className="font-bold text-[13px] text-[#111827] leading-tight">
                  {formData.fullName}
                </h3>
                <p className="text-[11px] text-gray-500">وصي معتمد</p>
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
              {/* العمود الأيمن (كارت التعريف المحدث + كارت الأمان) */}
              <div className="flex flex-col gap-5 order-2 lg:order-1 h-full">
                {/* 🌟 كارت الهوية والتعريف */}
                <section className="w-full bg-white rounded-[12px] border border-[#C2C6D2] shadow-sm overflow-hidden shrink-0">
                  <div className="h-[96px] bg-[#003469]" />
                  <div className="px-5 pb-6 text-center -mt-12">
                    <div className="relative w-[92px] mx-auto">
                      <img
                        src={avatarSrc}
                        alt="Avatar"
                        className="w-[92px] h-[92px] mx-auto rounded-full border-4 border-white shadow-sm object-cover bg-white"
                      />
                      <button
                        type="button"
                        onClick={handlePencilClick}
                        disabled={!isEditing}
                        title={isEditing ? "تغيير الصورة الشخصية" : "فعّل وضع التعديل أولاً لتغيير الصورة"}
                        className={`absolute bottom-0 left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition ${
                          isEditing
                            ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <LuPencil className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {fieldErrors.profileImage && (
                      <p className="text-[11px] text-red-600 mt-2">
                        {fieldErrors.profileImage}
                      </p>
                    )}
                    <h3 className="mt-3.5 font-bold text-[16px] text-[#111827]">
                      {formData.fullName}
                    </h3>
                    <p className="mt-1 text-[13px] text-gray-500 leading-relaxed">
                      وصي معتمد على منصة كفيلي
                    </p>

                    {/* قائمة البيانات المنظمة على شكل صفوف أنيقة بخلفيات خفيفة */}
                    <div className="mt-5 flex flex-col gap-2 text-[13px]">
                      {/* صف حالة الحساب */}
                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium">
                          حالة التوثيق
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[12px] ${verification.className}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current ml-1" />{" "}
                          {verification.text}
                        </span>
                      </div>

                      {/* صف البريد الإلكتروني */}
                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium">
                          البريد الإلكتروني
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003469] font-bold text-[12px]">
                          <MdCheckCircle className="text-blue-500" />{" "}
                          {formData.email}
                        </span>
                      </div>

                      {/* صف تاريخ الانضمام */}
                      <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                        <span className="text-gray-500 font-medium flex items-center gap-1">
                          <MdStars className="text-amber-500 text-base" />{" "}
                          الانضمام
                        </span>
                        <span className="font-bold text-gray-700 text-[12px]">
                          {formatJoinDate(formData.joinedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* كارت أمن الحساب */}
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

              {/* العمود الأيسر (الفورم) */}
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

                  <div className="p-6 space-y-5 flex-1">
                    {saveError && (
                      <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        <MdErrorOutline className="text-lg shrink-0" />
                        <p>{saveError}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#424750]">
                          الاسم الكامل (غير قابل للتعديل)
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.fullName}
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
                            name="phoneNumber"
                            dir="ltr"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition text-left ${
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
                            {GENDER_OPTIONS.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                          <FaRestroom className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-base" />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-bold text-[#003469]">
                          الدولة (غير قابلة للتعديل)
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
                            {CITY_OPTIONS.map((city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            ))}
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
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
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
                        سيتم تدقيق البيانات المحدثة من قبل فريقنا لضمان دقة
                        معلومات الكفالة.
                      </p>
                    </div>

                    {/* أزرار الحفظ والإلغاء للديسكتوب */}
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
                        <MdSave /> {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
                      </button>
                      <button
                        onClick={handleCancel}
                        disabled={!isEditing || saving}
                        className={`h-9 px-5 rounded-md border text-[13px] font-bold transition ${
                          isEditing && !saving
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

            <div className="w-full">
              <TransferDataSection
                status={transferStatus}
                data={transferData}
                reviewReason={transferReviewReason}
                onAdd={handleAddTransfer}
                onEdit={handleEditTransfer}
              />
            </div>
          </div>
        </main>

        {/* =================================================================== */}
        {/* 📱 MOBILE VIEW */}
        {/* =================================================================== */}
        <main className="lg:hidden p-4 space-y-5 flex-1 bg-[#f8fafc]">
          {/* 🌟 كارت التعريف للموبايل */}
          <section className="w-full bg-white rounded-xl border border-[#C2C6D2] shadow-sm overflow-hidden">
            <div className="h-24 bg-[#003469]" />
            <div className="px-5 pb-5 text-center -mt-11">
              <div className="relative w-[92px] mx-auto">
                <img
                  src={avatarSrc}
                  alt="Avatar Mobile"
                  className="w-[92px] h-[92px] mx-auto rounded-full border-4 border-white shadow-sm object-cover bg-white"
                />
                <button
                  type="button"
                  onClick={handlePencilClick}
                  disabled={!isEditing}
                  title={isEditing ? "تغيير الصورة الشخصية" : "فعّل وضع التعديل أولاً لتغيير الصورة"}
                  className={`absolute bottom-0 left-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm transition ${
                    isEditing
                      ? "bg-[#003469] text-white hover:bg-[#002b57] cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <LuPencil className="w-3.5 h-3.5" />
                </button>
              </div>
              {fieldErrors.profileImage && (
                <p className="text-[11px] text-red-600 mt-2">
                  {fieldErrors.profileImage}
                </p>
              )}
              <h3 className="mt-3 font-bold text-[16px] text-[#111827]">
                {formData.fullName}
              </h3>
              <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">
                وصي معتمد على منصة كفيلي
              </p>

              <div className="mt-4 flex flex-col gap-2 text-[13px] text-right">
                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium">حالة التوثيق</span>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[12px] ${verification.className}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current ml-1" />{" "}
                    {verification.text}
                  </span>
                </div>

                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium">
                    البريد الإلكتروني
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[#003469] font-bold text-[12px]">
                    <MdCheckCircle className="text-blue-500" />
                  </span>
                </div>

                <div className="flex items-center justify-between w-full bg-[#F8FAFC] rounded-lg p-2.5 border border-[#E2E8F0]">
                  <span className="text-gray-500 font-medium flex items-center gap-1">
                    <MdStars className="text-amber-500 text-base" /> الانضمام
                  </span>
                  <span className="font-bold text-gray-700 text-[12px]">
                    {formatJoinDate(formData.joinedAt)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* كارت أمن الحساب للموبايل */}
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

          <div className="w-full">
            <TransferDataSection
              status={transferStatus}
              data={transferData}
              reviewReason={transferReviewReason}
              onAdd={handleAddTransfer}
              onEdit={handleEditTransfer}
            />
          </div>

          {/* نموذج البيانات الشخصية للموبايل */}
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

            {saveError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <MdErrorOutline className="text-lg shrink-0" />
                <p>{saveError}</p>
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
                    value={formData.fullName}
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
                    name="phoneNumber"
                    dir="ltr"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`w-full h-11 rounded-lg border px-4 pr-10 text-sm outline-none transition text-left ${
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
                      {GENDER_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
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
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
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
                  <label className="block text-[13px] font-bold text-[#003469]">
                    الدولة (غير قابلة للتعديل)
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
                      {CITY_OPTIONS.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    <MdOutlineLocationOn className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#003469] text-lg" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 rounded-lg border border-[#9EE8E8] bg-[#DDFBFB] px-4 py-3 text-sm text-[#006B70] leading-relaxed">
                <MdInfoOutline className="text-lg shrink-0 mt-0.5" />
                <p>
                  سيتم تدقيق البيانات المحدثة من قبل فريقنا لضمان دقة معلومات
                  الكفالة.
                </p>
              </div>

              {/* أزرار الحفظ والإلغاء للموبايل */}
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
                  <MdSave /> {saving ? "جارٍ الحفظ..." : "حفظ التغييرات"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={!isEditing || saving}
                  className={`h-11 px-5 rounded-lg border text-[13px] font-bold transition ${
                    isEditing && !saving
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

        {/* ---------------------------- Global Footer ---------------------------- */}
        <footer className="w-full h-[54px] bg-white border-t border-[#E5E7EB] flex items-center justify-center px-4 shrink-0 z-10">
          <p className="text-[12px] text-center text-gray-400">
            © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
          </p>
        </footer>
      </div>

      {/* ============================== Overlay Modal Component ============================== */}
      {showTransferModal && (
        <TransferDataModal
          mode={modalMode}
          onClose={() => setShowTransferModal(false)}
          onSubmit={handleSubmitTransfer}
          initialData={modalMode === "edit" ? transferData : null}
        />
      )}

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

export default GuardianProfile;
