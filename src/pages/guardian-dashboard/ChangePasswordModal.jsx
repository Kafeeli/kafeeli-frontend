import { useState } from "react";
import { MdClose, MdCheckCircle, MdRadioButtonUnchecked, MdErrorOutline } from "react-icons/md";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { authApi } from "../../services/authApi";

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

function PasswordField({
  label,
  value,
  onChange,
  show,
  onToggleShow,
  error,
  disabled,
  autoComplete,
  preventAutofill = false,
}) {
  // حيلة شائعة وموثوقة: الحقل بيبلش readOnly (المتصفح ما بيعبّي حقول readOnly تلقائيًا)،
  // وبيصير قابل للكتابة أول ما المستخدم يضغط عليه فعليًا (onFocus).
  const [locked, setLocked] = useState(preventAutofill);

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
          onFocus={() => setLocked(false)}
          disabled={disabled}
          readOnly={locked}
          autoComplete={autoComplete}
          // بعض المتصفحات (كروم خصوصًا) بتتجاهل autoComplete على حقول
          // كلمة المرور وتعبّي بناءً على اسم الحقل؛ name غير قياسي
          // بيقلل احتمالية هيك تعبئة.
          name={`kafeeli-${autoComplete}-${label}`}
          className={`w-full h-12 rounded-lg border ${
            error ? "border-red-400" : "border-[#D0D5DD]"
          } bg-white px-4 pl-12 text-right text-[14px] text-[#111827] outline-none focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-50 disabled:text-gray-400`}
        />
        <button
          type="button"
          onClick={onToggleShow}
          disabled={disabled}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#003469] transition cursor-pointer disabled:cursor-not-allowed"
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

// يفكك أي شكل أخطاء راجع من الـ API (سواء errors[] أو errors{} أو message واحدة)
function flattenServerErrors(errors) {
  if (!errors) return [];
  if (Array.isArray(errors)) return errors.flatMap(flattenServerErrors);
  if (typeof errors === "object") return Object.values(errors).flatMap(flattenServerErrors);
  return [String(errors)];
}

const ChangePasswordModal = ({ onClose, onSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const allRulesMet = PASSWORD_RULES.every((rule) => rule.test(newPassword));
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const sameAsCurrentPassword =
    newPassword.length > 0 && currentPassword.length > 0 && newPassword === currentPassword;

  const handleSubmit = async () => {
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "يرجى إدخال كلمة المرور الحالية";
    }
    if (!allRulesMet) {
      newErrors.newPassword = "كلمة المرور لا تحقق كل الشروط المطلوبة";
    } else if (sameAsCurrentPassword) {
      newErrors.newPassword = "كلمة المرور الجديدة يجب أن تكون مختلفة عن كلمة المرور الحالية";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "يرجى تأكيد كلمة المرور";
    } else if (!passwordsMatch) {
      newErrors.confirmPassword = "كلمتا المرور غير متطابقتين";
    }

    setErrors(newErrors);
    setServerError(null);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      await authApi.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      onSuccess?.();
      onClose?.();
    } catch (err) {
      const status = err?.response?.status;
      const responseData = err?.response?.data || {};
      const details = [responseData.message, ...flattenServerErrors(responseData.errors)].filter(Boolean);

      if (status === 400) {
        // غالبًا كلمة المرور الحالية غلط أو الجديدة ما بتحقق شروط السيرفر
        setErrors((prev) => ({
          ...prev,
          currentPassword: details.length ? details.join(" - ") : "كلمة المرور الحالية غير صحيحة",
        }));
      } else if (status === 401) {
        setServerError("انتهت صلاحية الجلسة، الرجاء تسجيل الدخول من جديد.");
      } else if (status >= 500) {
        setServerError("حدث خطأ في الخادم، حاول مرة أخرى لاحقًا.");
      } else if (!err?.response) {
        setServerError("تعذر الاتصال بالخادم، تحقق من اتصال الإنترنت.");
      } else {
        setServerError(details.length ? details.join(" - ") : "تعذر تغيير كلمة المرور.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 animate-fadeIn"
      onClick={submitting ? undefined : onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] px-6 py-4 flex items-center justify-between z-10">
          <button
            onClick={onClose}
            disabled={submitting}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition cursor-pointer disabled:cursor-not-allowed"
            aria-label="إغلاق"
          >
            <MdClose className="text-[20px]" />
          </button>

          <h2 className="text-[16px] font-bold text-[#003469] leading-6">
            تحديث كلمة المرور
          </h2>
        </div>

        {/* Body */}
        {/* 
          حقل مخفي إضافي: بعض المتصفحات (خصوصًا كروم) بتحاول تعبئة أول حقل
          type="password" بالفورم بكلمة مرور محفوظة تلقائيًا بغض النظر عن
          autoComplete. هاد الحقل المخفي "يمتص" هالسلوك بدل حقل كلمة المرور
          الحالية الحقيقي.
        */}
        <input
          type="password"
          name="fake-password-trap"
          autoComplete="new-password"
          tabIndex={-1}
          aria-hidden="true"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        <div className="px-6 py-5 space-y-5">
          {serverError && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <MdErrorOutline className="text-lg shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          <PasswordField
            label="كلمة المرور الحالية"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setErrors((prev) => ({ ...prev, currentPassword: null }));
            }}
            show={showCurrent}
            onToggleShow={() => setShowCurrent(!showCurrent)}
            error={errors.currentPassword}
            disabled={submitting}
            // ⚠️ "current-password" فعليًا بيدعو المتصفح يعبّي كلمة مرور محفوظة تلقائيًا.
            // "new-password" بيمنع هالسلوك حتى بحقل مش "جديد" فعليًا (حيلة معروفة ومتعمدة).
            autoComplete="new-password"
            preventAutofill
          />

          <PasswordField
            label="كلمة المرور الجديدة"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrors((prev) => ({ ...prev, newPassword: null }));
            }}
            show={showNew}
            onToggleShow={() => setShowNew(!showNew)}
            error={
              errors.newPassword ||
              (sameAsCurrentPassword
                ? "كلمة المرور الجديدة يجب أن تكون مختلفة عن الحالية"
                : null)
            }
            disabled={submitting}
            autoComplete="new-password"
            preventAutofill
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
            label="تأكيد كلمة المرور الجديدة"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: null }));
            }}
            show={showConfirm}
            onToggleShow={() => setShowConfirm(!showConfirm)}
            error={errors.confirmPassword}
            disabled={submitting}
            autoComplete="new-password"
            preventAutofill
          />
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#E5E7EB] px-6 py-4 flex items-center justify-start gap-3">
          <button
            onClick={onClose}
            disabled={submitting}
            className="h-[40px] min-w-[100px] px-6 rounded-md border border-[#D0D5DD] bg-white text-[#111827] text-[13px] font-bold hover:bg-gray-50 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            إلغاء
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="h-[40px] min-w-[140px] px-6 rounded-md bg-[#003469] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#002b57] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {submitting ? "جارٍ الحفظ..." : "حفظ كلمة المرور"}
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
