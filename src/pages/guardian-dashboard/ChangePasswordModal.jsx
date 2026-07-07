import { useState } from "react";
import { MdClose, MdCheckCircle, MdRadioButtonUnchecked } from "react-icons/md";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

/* ========================================================================== */
/*                    شروط قوة كلمة المرور (قابلة لإعادة الاستخدام)            */
/* ========================================================================== */

const PASSWORD_RULES = [
  { key: "minLength", label: "8 أحرف على الأقل", test: (v) => v.length >= 8 },
  { key: "upper", label: "أحرف كبيرة (A-Z)", test: (v) => /[A-Z]/.test(v) },
  { key: "lower", label: "أحرف صغيرة (a-z)", test: (v) => /[a-z]/.test(v) },
  {
    key: "special",
    label: "أرقام أو رموز خاصة",
    test: (v) => /[0-9!@#$%^&*(),.?":{}|<>]/.test(v),
  },
];

function RuleItem({ label, met }) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <MdCheckCircle className="text-[#018B8F] text-[16px] shrink-0" />
      ) : (
        <MdRadioButtonUnchecked className="text-[#C2C6D2] text-[16px] shrink-0" />
      )}
      <span
        className={`text-[13px] ${
          met ? "text-[#018B8F] font-bold" : "text-[#6B7280]"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggleShow, error }) {
  return (
    <div>
      <label className="block text-right text-[14px] font-bold text-[#111827] mb-2">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`w-full h-12 rounded-lg border ${
            error ? "border-red-400" : "border-[#D0D5DD]"
          } bg-white px-4 pl-12 text-right text-[14px] text-[#111827] outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#003469] transition cursor-pointer"
        >
          {show ? (
            <HiOutlineEyeOff className="text-[20px]" />
          ) : (
            <HiOutlineEye className="text-[20px]" />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-[11px] text-red-500 text-right">{error}</p>
      )}
    </div>
  );
}

/* ========================================================================== */
/*                         Modal: تغيير كلمة المرور                            */
/* ========================================================================== */

const ChangePasswordModal = ({ onClose, onSubmit }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});

  const allRulesMet = PASSWORD_RULES.every((rule) => rule.test(newPassword));
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  const handleSubmit = () => {
    const newErrors = {};

    if (!allRulesMet) {
      newErrors.newPassword = "كلمة المرور لا تحقق كل الشروط المطلوبة";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
    } else if (!passwordsMatch) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(newPassword);
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition cursor-pointer"
            aria-label="إغلاق"
          >
            <MdClose className="text-[20px]" />
          </button>

          <h2 className="text-[16px] font-bold text-[#003469] leading-6">
            تحديث كلمة المرور
          </h2>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          <PasswordField
            label="كلمة المرور"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrors((prev) => ({ ...prev, newPassword: null }));
            }}
            show={showNew}
            onToggleShow={() => setShowNew(!showNew)}
            error={errors.newPassword}
          />

          {/* متطلبات كلمة المرور */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
            <p className="text-[13px] font-bold text-[#003469] mb-3 text-right">
              متطلبات كلمة المرور:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {PASSWORD_RULES.map((rule) => (
                <RuleItem
                  key={rule.key}
                  label={rule.label}
                  met={rule.test(newPassword)}
                />
              ))}
            </div>
          </div>

          <PasswordField
            label="تأكيد كلمة المرور"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: null }));
            }}
            show={showConfirm}
            onToggleShow={() => setShowConfirm(!showConfirm)}
            error={errors.confirmPassword}
          />
        </div>

        {/* Footer */}
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
            حفظ كلمة المرور
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

export default ChangePasswordModal;
