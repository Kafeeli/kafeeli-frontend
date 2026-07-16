import { useState, useEffect, useRef } from "react";
import {
  MdOutlinePerson,
  MdOutlinePhone,
  MdOutlineLocationOn,
  MdInfoOutline,
  MdClose,
  MdAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineContentCopy,
  MdKeyboardArrowDown,
  MdCheckCircle,
  MdErrorOutline,
} from "react-icons/md";

export const BANK_OPTIONS = [
  "بنك فلسطين",
  "البنك الإسلامي العربي",
  "البنك الإسلامي الفلسطيني",
  "بنك القاهرة عمان",
  "بنك القدس",
  "محفظة PalPay",
  "محفظة JawwalPay",
  "محفظة Maalchat",
];

const WALLET_KEYWORDS = ["PalPay", "JawwalPay", "Maalchat", "محفظة"];

export const isWallet = (bankName) => {
  if (!bankName) return false;
  return WALLET_KEYWORDS.some((kw) => bankName.includes(kw));
};

// يفكك أي شكل أخطاء راجع من الـ API
function flattenServerErrors(errors) {
  if (!errors) return [];
  if (Array.isArray(errors)) return errors.flatMap(flattenServerErrors);
  if (typeof errors === "object") return Object.values(errors).flatMap(flattenServerErrors);
  return [String(errors)];
}

const TransferDataModal = ({
  mode = "add",
  onClose,
  onSubmit, // async (formData) => يرمي error لو فشل، الأب مسؤول عن استدعاء الـ API الفعلي
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    iban: "",
    branchName: "",
  });

  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // ⚠️ accountNumber و iban ما بيترجعوا من السيرفر إلا مقنّعين (مثلاً "**** 456")
      // فما منقدر نعبّي فيهم القيمة الحقيقية. منسيبهم فاضيين ونطلب من المستخدم
      // يدخل القيمة الكاملة من جديد، ومنعرض القيمة المقنّعة كتلميح (placeholder) بس.
      setFormData({
        bankName: initialData.bankName || "",
        accountHolderName: initialData.accountHolderName || "",
        accountNumber: "",
        iban: "",
        branchName: initialData.branchName || "",
      });
    }
  }, [mode, initialData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [dropdownOpen]);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.bankName) {
      newErrors.bankName = "يرجى اختيار البنك أو المحفظة";
    }
    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "يرجى إدخال اسم صاحب الحساب";
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = isWallet(formData.bankName)
        ? "يرجى إدخال رقم الهاتف المرتبط بالمحفظة"
        : "يرجى إدخال رقم الحساب";
    }
    if (!formData.iban.trim()) {
      newErrors.iban = "يرجى إدخال رقم IBAN";
    }
    if (!formData.branchName.trim()) {
      newErrors.branchName = "يرجى إدخال اسم الفرع";
    }

    setErrors(newErrors);
    setServerError(null);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit?.(formData);
      // النجاح يُغلق المودال، هذا مسؤولية الأب (بيستدعي onClose بعد نجاح الـ API)
    } catch (err) {
      const status = err?.response?.status;
      const responseData = err?.response?.data || {};
      const details = [responseData.message, ...flattenServerErrors(responseData.errors)].filter(Boolean);

      if (status === 400) {
        setServerError(details.length ? details.join(" - ") : "تحقق من صحة البيانات المدخلة.");
      } else if (status === 401) {
        setServerError("انتهت صلاحية الجلسة، الرجاء تسجيل الدخول من جديد.");
      } else if (status === 403) {
        setServerError("لا يمكن تعديل هذا الحساب حاليًا (مسموح فقط عندما تطلب الإدارة التعديل).");
      } else if (status === 404) {
        setServerError("لم يتم العثور على حساب التحويل.");
      } else {
        setServerError(details.length ? details.join(" - ") : "تعذر حفظ بيانات التحويل، حاول مجددًا.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const title =
    mode === "add" ? "إضافة بيانات التحويل" : "تعديل بيانات التحويل";

  const accountIsWallet = isWallet(formData.bankName);

  const accountNumberLabel = accountIsWallet
    ? "رقم الهاتف المرتبط بالمحفظة"
    : "رقم الحساب";

  const accountNumberPlaceholder =
    mode === "edit" && initialData?.accountNumberMasked
      ? `الحالي: ${initialData.accountNumberMasked} — أدخل الرقم الكامل الجديد`
      : accountIsWallet
        ? "مثال: 0591234567"
        : "أدخل رقم الحساب ";

  const ibanPlaceholder =
    mode === "edit" && initialData?.ibanMasked
      ? `الحالي: ${initialData.ibanMasked}`
      : "PS00 0000 0000...";

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 animate-fadeIn"
      onClick={submitting ? undefined : onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-[520px] max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-[16px] font-bold text-[#003469] leading-6">
            {title}
          </h2>
          <button
            onClick={onClose}
            disabled={submitting}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition cursor-pointer disabled:cursor-not-allowed"
            aria-label="إغلاق"
          >
            <MdClose className="text-[20px]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {serverError && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <MdErrorOutline className="text-lg shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          {/* Bank / Wallet Dropdown */}
          <div>
            <label className="block text-right text-[13px] font-bold text-[#003469] mb-2">
              اسم البنك أو المحفظة
            </label>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                disabled={submitting}
                className={`w-full h-12 rounded-lg border ${
                  errors.bankName ? "border-red-400" : "border-[#D0D5DD]"
                } bg-white pr-12 pl-4 text-right text-[13px] outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition flex items-center justify-between cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-50`}
              >
                <span
                  className={
                    formData.bankName ? "text-[#003469]" : "text-[#9CA3AF]"
                  }
                >
                  {formData.bankName || "اختر البنك أو المحفظة"}
                </span>

                <MdKeyboardArrowDown
                  className={`text-[#003469] text-xl transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] pointer-events-none">
                {accountIsWallet ? (
                  <MdOutlineAccountBalanceWallet className="text-[18px]" />
                ) : (
                  <MdAccountBalance className="text-[18px]" />
                )}
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 left-0 top-full mt-1 bg-white border border-[#D0D5DD] rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto animate-fadeIn w-full">
                  {BANK_OPTIONS.map((option) => {
                    const selected = formData.bankName === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          updateField("bankName", option);
                          setDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-right text-[13px] hover:bg-[#F3F4F5] transition flex items-center justify-between border-b border-[#F3F4F5] last:border-b-0 cursor-pointer ${
                          selected
                            ? "bg-[#DDFBFB] text-[#018B8F] font-bold"
                            : "text-[#003469]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isWallet(option) ? (
                            <MdOutlineAccountBalanceWallet className="text-[14px]" />
                          ) : (
                            <MdAccountBalance className="text-[14px]" />
                          )}
                          <span>{option}</span>
                        </div>

                        {selected && (
                          <MdCheckCircle className="text-[#018B8F]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {errors.bankName && (
              <p className="mt-1 text-[11px] text-red-500 text-right">
                {errors.bankName}
              </p>
            )}
          </div>

          {/* Account Holder Name */}
          <div>
            <label className="block text-right text-[13px] font-bold text-[#003469] mb-2">
              اسم صاحب الحساب
            </label>

            <div className="relative">
              <input
                type="text"
                value={formData.accountHolderName}
                onChange={(e) => updateField("accountHolderName", e.target.value)}
                disabled={submitting}
                placeholder="أدخل الاسم الرباعي كما هو مسجل بالبنك"
                className={`w-full h-12 rounded-lg border ${
                  errors.accountHolderName ? "border-red-400" : "border-[#D0D5DD]"
                } bg-white pr-12 pl-4 text-right text-[13px] text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-50`}
              />
              <MdOutlinePerson className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] text-[18px] pointer-events-none" />
            </div>

            {errors.accountHolderName && (
              <p className="mt-1 text-[11px] text-red-500 text-right">
                {errors.accountHolderName}
              </p>
            )}
          </div>

          {/* IBAN & Account Number Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* IBAN */}
            <div>
              <label className="block text-right text-[13px] font-bold text-[#003469] mb-2">
                رقم الآيبان (IBAN)
              </label>

              <div className="relative">
                <input
                  type="text"
                  value={formData.iban}
                  onChange={(e) => updateField("iban", e.target.value)}
                  disabled={submitting}
                  placeholder={ibanPlaceholder}
                  className={`w-full h-12 rounded-lg border ${
                    errors.iban ? "border-red-400" : "border-[#D0D5DD]"
                  } bg-white pr-12 pl-10 text-left dir-ltr text-[13px] font-mono text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-50`}
                />
                <MdAccountBalance className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] text-[18px] pointer-events-none" />
                <MdOutlineContentCopy className="absolute left-4 top-1/2 -translate-y-1/2 text-[#003469] text-[16px] cursor-pointer hover:text-[#018B8F] transition" />
              </div>

              {errors.iban && (
                <p className="mt-1 text-[11px] text-red-500 text-right">
                  {errors.iban}
                </p>
              )}
            </div>

            {/* Account Number or Phone */}
            <div>
              <label className="block text-right text-[13px] font-bold text-[#003469] mb-2">
                {accountNumberLabel}
              </label>

              <div className="relative">
                <input
                  type="text"
                  inputMode={accountIsWallet ? "tel" : "numeric"}
                  value={formData.accountNumber}
                  onChange={(e) => updateField("accountNumber", e.target.value)}
                  disabled={submitting}
                  placeholder={accountNumberPlaceholder}
                  className={`w-full h-12 rounded-lg border ${
                    errors.accountNumber ? "border-red-400" : "border-[#D0D5DD]"
                  } bg-white pr-12 pl-4 text-right text-[13px] text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-50`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] font-bold text-[14px] pointer-events-none">
                  {accountIsWallet ? (
                    <MdOutlinePhone className="text-[18px]" />
                  ) : (
                    "#"
                  )}
                </span>
              </div>

              {errors.accountNumber && (
                <p className="mt-1 text-[11px] text-red-500 text-right">
                  {errors.accountNumber}
                </p>
              )}
            </div>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-right text-[13px] font-bold text-[#003469] mb-2">
              اسم الفرع
            </label>

            <div className="relative">
              <input
                type="text"
                value={formData.branchName}
                onChange={(e) => updateField("branchName", e.target.value)}
                disabled={submitting}
                placeholder="مثال: الفرع الرئيسي، أو فرع الرمال"
                className={`w-full h-12 rounded-lg border ${
                  errors.branchName ? "border-red-400" : "border-[#D0D5DD]"
                } bg-white pr-12 pl-4 text-right text-[13px] text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-50`}
              />
              <MdOutlineLocationOn className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] text-[18px] pointer-events-none" />
            </div>

            {errors.branchName && (
              <p className="mt-1 text-[11px] text-red-500 text-right">
                {errors.branchName}
              </p>
            )}
          </div>

          {/* Info Notice */}
          <div className="rounded-lg border border-[#FFE7B8] bg-[#FFF8E6] px-4 py-3 flex items-start gap-2">
            <MdInfoOutline className="text-[#9A6700] text-[18px] shrink-0 mt-0.5" />
            <p className="text-[12px] leading-[20px] text-[#7A5500] text-right flex-1">
              يرجى التأكد من رقم الحساب أو رقم الهاتف المرتبط بالمحفظة قبل
              الإرسال، لأن أي خطأ قد يؤخر عملية التحويل المالي بشكل كبير.
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-start gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="h-[40px] min-w-[100px] px-6 rounded-md border border-[#D0D5DD] bg-white text-[#111827] text-[13px] font-bold hover:bg-gray-50 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            إلغاء
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="h-[40px] min-w-[140px] px-6 rounded-md bg-[#003469] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002b57] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <span>{submitting ? "جارٍ الإرسال..." : "إرسال للمراجعة"}</span>
            {!submitting && (
              <span className="text-[11px] scale-x-[-1] inline-block">◀</span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn  { animation: fadeIn 0.2s ease-out both; }
        .animate-slideUp { animation: slideUp 0.3s ease-out both; }
      `}</style>
    </div>
  );
};

export default TransferDataModal;
