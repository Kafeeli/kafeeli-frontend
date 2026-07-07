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

const TransferDataModal = ({
  mode = "add",
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    iban: "",
    branch: "",
  });

  const [errors, setErrors] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        bankName: initialData.bankName || "",
        accountName: initialData.accountName || "",
        accountNumber: initialData.accountNumber || "",
        iban: initialData.iban || "",
        branch: initialData.branch || "",
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

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.bankName) {
      newErrors.bankName = "يرجى اختيار البنك أو المحفظة";
    }
    if (!formData.accountName.trim()) {
      newErrors.accountName = "يرجى إدخال اسم صاحب الحساب";
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = isWallet(formData.bankName)
        ? "يرجى إدخال رقم الهاتف المرتبط بالمحفظة"
        : "يرجى إدخال رقم الحساب";
    }
    if (!formData.iban.trim()) {
      newErrors.iban = "يرجى إدخال رقم IBAN";
    }
    if (!formData.branch.trim()) {
      newErrors.branch = "يرجى إدخال اسم الفرع";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
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

  const accountNumberPlaceholder = accountIsWallet
    ? "مثال: 0591234567"
    : "أدخل رقم الحساب ";

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 animate-fadeIn"
      onClick={onClose}
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
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition cursor-pointer"
            aria-label="إغلاق"
          >
            <MdClose className="text-[20px]" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5 space-y-5">
          {/* Bank / Wallet Dropdown */}
          <div>
            <label className="block text-right text-[13px] font-bold text-[#003469] mb-2">
              اسم البنك أو المحفظة
            </label>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full h-12 rounded-lg border ${
                  errors.bankName ? "border-red-400" : "border-[#D0D5DD]"
                } bg-white pr-12 pl-4 text-right text-[13px] outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition flex items-center justify-between cursor-pointer`}
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

          {/* Account Name */}
          <div>
            <label className="block text-right text-[13px] font-bold text-[#003469] mb-2">
              اسم صاحب الحساب
            </label>

            <div className="relative">
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => updateField("accountName", e.target.value)}
                placeholder="أدخل الاسم الرباعي كما هو مسجل بالبنك"
                className={`w-full h-12 rounded-lg border ${
                  errors.accountName ? "border-red-400" : "border-[#D0D5DD]"
                } bg-white pr-12 pl-4 text-right text-[13px] text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition`}
              />
              <MdOutlinePerson className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] text-[18px] pointer-events-none" />
            </div>

            {errors.accountName && (
              <p className="mt-1 text-[11px] text-red-500 text-right">
                {errors.accountName}
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
                  placeholder="PS00 0000 0000..."
                  className={`w-full h-12 rounded-lg border ${
                    errors.iban ? "border-red-400" : "border-[#D0D5DD]"
                  } bg-white pr-12 pl-10 text-left dir-ltr text-[13px] font-mono text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition`}
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
                  placeholder={accountNumberPlaceholder}
                  className={`w-full h-12 rounded-lg border ${
                    errors.accountNumber ? "border-red-400" : "border-[#D0D5DD]"
                  } bg-white pr-12 pl-4 text-right text-[13px] text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition`}
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
                value={formData.branch}
                onChange={(e) => updateField("branch", e.target.value)}
                placeholder="مثال: الفرع الرئيسي، أو فرع الرمال"
                className={`w-full h-12 rounded-lg border ${
                  errors.branch ? "border-red-400" : "border-[#D0D5DD]"
                } bg-white pr-12 pl-4 text-right text-[13px] text-[#003469] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition`}
              />
              <MdOutlineLocationOn className="absolute right-4 top-1/2 -translate-y-1/2 text-[#003469] text-[18px] pointer-events-none" />
            </div>

            {errors.branch && (
              <p className="mt-1 text-[11px] text-red-500 text-right">
                {errors.branch}
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
            className="h-[40px] min-w-[100px] px-6 rounded-md border border-[#D0D5DD] bg-white text-[#111827] text-[13px] font-bold hover:bg-gray-50 transition cursor-pointer"
          >
            إلغاء
          </button>

          <button
            onClick={handleSubmit}
            className="h-[40px] min-w-[140px] px-6 rounded-md bg-[#003469] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002b57] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <span>إرسال للمراجعة</span>
            <span className="text-[11px] scale-x-[-1] inline-block">◀</span>
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
