import { useState, useRef } from "react";
import { MdClose, MdCloudUpload, MdBadge, MdErrorOutline } from "react-icons/md";

/**
 * مودال رفع/إرفاق وثيقة واحد قابل لإعادة الاستخدام لكل أنواع الوثائق.
 * لو نوع الوثيقة "nationalId" منظهر حقل إضافي "رقم الهوية" فوق منطقة الرفع،
 * أي نوع تاني منعرض منطقة الرفع فقط.
 *
 * onSubmit(payload) — الأب مسؤول عن التصرف بالبيانات (محاكاة محلية هلق، API لاحقًا)
 */
const DocumentUploadModal = ({ doc, onClose, onSubmit }) => {
  const [idNumber, setIdNumber] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const needsIdNumber = doc?.key === "nationalId";
  const acceptAttr = doc?.isVideo
    ? "video/mp4,video/quicktime,video/webm"
    : "image/jpeg,image/png,application/pdf";
  const maxSizeMB = doc?.maxSizeMB || (doc?.isVideo ? 15 : 5);

  const uploadHintTitle = doc?.isVideo
    ? "ارفع الفيديو"
    : needsIdNumber
      ? "ارفع صورة الهوية"
      : "ارفق الوثيقة";

  const validateAndSetFile = (candidateFile) => {
    if (!candidateFile) return;

    const allowedTypes = doc?.isVideo
      ? ["video/mp4", "video/quicktime", "video/webm"]
      : ["image/jpeg", "image/png", "application/pdf"];

    if (!allowedTypes.includes(candidateFile.type)) {
      setError(
        doc?.isVideo
          ? "الصيغ المسموحة فقط: MP4, MOV, WEBM"
          : "الصيغ المسموحة فقط: JPG, PNG, PDF"
      );
      return;
    }

    if (candidateFile.size > maxSizeMB * 1024 * 1024) {
      setError(`الحجم الأقصى المسموح به هو ${maxSizeMB} ميجابايت`);
      return;
    }

    setError("");
    setFile(candidateFile);
  };

  const handleInputChange = (e) => {
    validateAndSetFile(e.target.files?.[0]);
    e.target.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = async () => {
    if (needsIdNumber && !idNumber.trim()) {
      setError("يرجى إدخال رقم الهوية");
      return;
    }
    if (!file) {
      setError("يرجى إرفاق الملف المطلوب");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await onSubmit?.({ file, idNumber: needsIdNumber ? idNumber.trim() : undefined });
    } catch (err) {
      const status = err?.response?.status;
      const apiErrors = err?.response?.data?.errors;
      const apiMessage = err?.response?.data?.message;
      if (status === 400) {
        setError(
          Array.isArray(apiErrors) && apiErrors.length
            ? apiErrors.join(" - ")
            : apiMessage || "تحقق من صحة الملف ورقم الهوية."
        );
      } else if (status === 401) {
        setError("انتهت صلاحية الجلسة، الرجاء تسجيل الدخول من جديد.");
      } else {
        setError("تعذر رفع الملف، حاول مجددًا.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={submitting ? undefined : onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-[440px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E7EB]">
          <button
            onClick={onClose}
            disabled={submitting}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B7280] hover:bg-gray-100 transition cursor-pointer disabled:cursor-not-allowed"
            aria-label="إغلاق"
          >
            <MdClose className="text-[20px]" />
          </button>
          <h2 className="text-[15px] font-bold text-[#003469]">
            تفاصيل الوثيقة
          </h2>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12px] text-red-700">
              <MdErrorOutline className="text-[16px] shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {needsIdNumber && (
            <div>
              <label className="block text-right text-[13px] font-bold text-[#111827] mb-1.5">
                رقم الهوية<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={idNumber}
                  disabled={submitting}
                  onChange={(e) => {
                    setIdNumber(e.target.value);
                    setError("");
                  }}
                  placeholder="رقم الهوية"
                  className="w-full h-11 rounded-lg border border-[#D0D5DD] bg-white pr-10 pl-3 text-right text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#003469] focus:ring-2 focus:ring-blue-100 transition disabled:bg-gray-50"
                />
                <MdBadge className="absolute right-3 top-1/2 -translate-y-1/2 text-[#003469] text-[16px] pointer-events-none" />
              </div>
            </div>
          )}

          {/* منطقة السحب والإفلات */}
          <div
            onDragEnter={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={handleDrop}
            onClick={() => !submitting && fileInputRef.current?.click()}
            className={`rounded-lg border-2 border-dashed ${
              dragActive ? "border-[#003469] bg-[#F5F8FB]" : "border-[#D0D5DD] bg-white"
            } px-4 py-8 flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition`}
          >
            <MdCloudUpload className="text-[28px] text-[#9CA3AF]" />
            <p className="text-[13px] font-bold text-[#003469]">
              {file ? file.name : uploadHintTitle}
            </p>
            <p className="text-[11px] text-[#9CA3AF]">
              {file
                ? "اضغط لاختيار ملف آخر"
                : "اسحب الملف هنا أو انقر لاختياره"}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept={acceptAttr}
              onChange={handleInputChange}
              className="hidden"
            />
          </div>

          <p className="text-[11px] text-[#9CA3AF] text-center leading-5">
            سيخضع الملف لإعادة المراجعة من قبل الإدارة بعد أي تعديل.
          </p>
        </div>

        {/* Footer */}
        <div className="px-5 pb-5 flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 h-11 rounded-md bg-[#003469] text-white text-[13px] font-bold hover:bg-[#002b57] transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "جارٍ الإرفاق..." : "إرفاق"}
          </button>
          <button
            onClick={onClose}
            disabled={submitting}
            className="flex-1 h-11 rounded-md border border-[#D0D5DD] bg-white text-[#111827] text-[13px] font-bold hover:bg-gray-50 transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModal;
