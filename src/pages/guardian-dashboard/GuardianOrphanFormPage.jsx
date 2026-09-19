import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orphanApi } from "../../services/orphanApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import GuardianFlowLayout from "./GuardianFlowLayout";
import {
  FiUser,
  FiFileText,
  FiUploadCloud,
  FiCheckCircle,
  FiAlertCircle,
  FiPaperclip,
} from "react-icons/fi";
import { MdChildCare } from "react-icons/md";

const EMPTY_FORM = {
  firstName: "",
  fatherName: "",
  grandfatherName: "",
  nationalId: "",
  dateOfBirth: "",
  gender: "",
  educationStatus: "",
  caseDescription: "",
  profileImage: null,
  birthCertificate: null,
};

export default function GuardianOrphanFormPage({ mode }) {
  const { familyId, orphanId } = useParams();
  const navigate = useNavigate();
  const editing = mode === "edit";
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(editing);
  const [loadError, setLoadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const loadRequestRef = useRef(0);
  const submitRequestRef = useRef(false);

  const load = useCallback(async () => {
    if (!editing) return;
    const requestId = ++loadRequestRef.current;
    setLoading(true);
    setLoadError("");
    setExistingImageUrl("");
    setSelectedImageUrl("");
    try {
      const data = unwrapResult(
        await orphanApi.getById(orphanId),
        "تعذر تحميل بيانات اليتيم."
      );
      if (loadRequestRef.current !== requestId) return;
      setForm({
        ...EMPTY_FORM,
        firstName: data.firstName || "",
        fatherName: data.fatherName || "",
        grandfatherName: data.grandfatherName || "",
        nationalId: data.nationalId || "",
        dateOfBirth: data.dateOfBirth?.slice(0, 10) || "",
        gender: data.gender === "Male" ? "1" : data.gender === "Female" ? "2" : "",
        educationStatus: data.educationalStatus || "",
        caseDescription: data.caseDescription || "",
      });
      if (data.hasProfileImage === true) {
        try {
          const objectUrl = URL.createObjectURL(
            await orphanApi.getProfileImage(orphanId)
          );
          if (loadRequestRef.current === requestId) setExistingImageUrl(objectUrl);
          else URL.revokeObjectURL(objectUrl);
        } catch {
          if (loadRequestRef.current === requestId) setExistingImageUrl("");
        }
      }
    } catch (requestError) {
      if (loadRequestRef.current === requestId) {
        setLoadError(apiErrorMessage(requestError, "تعذر تحميل بيانات اليتيم."));
      }
    } finally {
      if (loadRequestRef.current === requestId) setLoading(false);
    }
  }, [editing, orphanId]);

  useEffect(() => {
    const id = window.setTimeout(load, 0);
    return () => window.clearTimeout(id);
  }, [load]);

  useEffect(() => () => {
    loadRequestRef.current += 1;
  }, []);

  useEffect(
    () => () => {
      if (existingImageUrl) URL.revokeObjectURL(existingImageUrl);
    },
    [existingImageUrl]
  );

  useEffect(
    () => () => {
      if (selectedImageUrl) URL.revokeObjectURL(selectedImageUrl);
    },
    [selectedImageUrl]
  );

  const change = (event) => {
    const { name, value, files } = event.target;
    const file = files ? files[0] || null : null;
    setForm((current) => ({ ...current, [name]: files ? file : value }));
    if (name === "profileImage") {
      setSelectedImageUrl(file ? URL.createObjectURL(file) : "");
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submitRequestRef.current) return;
    submitRequestRef.current = true;
    setSubmitting(true);
    setError("");
    try {
      const result = editing
        ? await orphanApi.update(orphanId, form)
        : await orphanApi.create(familyId, form);
      const data = unwrapResult(
        result,
        editing ? "تعذر تحديث بيانات اليتيم." : "تعذر إضافة اليتيم."
      );
      navigate(`/guardian/orphans/${data.orphanId}`);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر حفظ بيانات اليتيم."));
    } finally {
      submitRequestRef.current = false;
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <GuardianFlowLayout title="بيانات اليتيم">
        <LoadingState count={2} columns="md:grid-cols-2" />
      </GuardianFlowLayout>
    );

  if (loadError)
    return (
      <GuardianFlowLayout title="بيانات اليتيم">
        <ErrorState onRetry={load} description={loadError} />
      </GuardianFlowLayout>
    );

  const previewUrl = selectedImageUrl || existingImageUrl;

  return (
    <GuardianFlowLayout
      title={editing ? "تعديل بيانات اليتيم" : "إضافة يتيم جديد"}
      description={
        editing
          ? "قم بتحديث بيانات اليتيم والمستندات المطلوبة"
          : "أدخل معلومات اليتيم بعناية لإرساله للمراجعة واعتماده"
      }
    >
      <form onSubmit={submit} className="mx-auto max-w-4xl space-y-6 pb-12 font-[Cairo]">
        {/* Card 1: البيانات الشخصية */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008C78]/10 text-[#008C78]">
              <FiUser className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">البيانات الشخصية</h2>
              <p className="text-xs font-normal text-gray-500">
                الأسماء ورقم الهوية والحالة التعليمية
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            <div>
              <label htmlFor="firstName" className="block text-xs font-semibold text-gray-700 mb-1.5">
                الاسم الأول <span className="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={change}
                required
                maxLength={150}
                placeholder="أدخل الاسم الأول"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
              />
            </div>

            <div>
              <label htmlFor="fatherName" className="block text-xs font-semibold text-gray-700 mb-1.5">
                اسم الأب <span className="text-red-500">*</span>
              </label>
              <input
                id="fatherName"
                name="fatherName"
                type="text"
                value={form.fatherName}
                onChange={change}
                required
                maxLength={150}
                placeholder="أدخل اسم الأب"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
              />
            </div>

            <div>
              <label htmlFor="grandfatherName" className="block text-xs font-semibold text-gray-700 mb-1.5">
                اسم الجد <span className="text-red-500">*</span>
              </label>
              <input
                id="grandfatherName"
                name="grandfatherName"
                type="text"
                value={form.grandfatherName}
                onChange={change}
                required
                maxLength={150}
                placeholder="أدخل اسم الجد"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
              />
            </div>

            <div>
              <label htmlFor="nationalId" className="block text-xs font-semibold text-gray-700 mb-1.5">
                رقم الهوية (9 أرقام) <span className="text-red-500">*</span>
              </label>
              <input
                id="nationalId"
                name="nationalId"
                type="text"
                value={form.nationalId}
                onChange={change}
                required
                maxLength={9}
                minLength={9}
                placeholder="مثال: 900123456"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth" className="block text-xs font-semibold text-gray-700 mb-1.5">
                تاريخ الميلاد
              </label>
              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={form.dateOfBirth}
                onChange={change}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm font-normal text-gray-900 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-xs font-semibold text-gray-700 mb-1.5">
                الجنس
              </label>
              <select
                id="gender"
                name="gender"
                value={form.gender}
                onChange={change}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm font-normal text-gray-900 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
              >
                <option value="">اختر الجنس</option>
                <option value="1">ذكر</option>
                <option value="2">أنثى</option>
              </select>
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <label htmlFor="educationStatus" className="block text-xs font-semibold text-gray-700 mb-1.5">
                الحالة التعليمية <span className="text-red-500">*</span>
              </label>
              <input
                id="educationStatus"
                name="educationStatus"
                type="text"
                value={form.educationStatus}
                onChange={change}
                required
                maxLength={100}
                placeholder="مثال: طالب بالمرحلة الابتدائية - الصف الثالث"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-3.5 py-2.5 text-sm font-normal text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
              />
            </div>
          </div>
        </section>

        {/* Card 2: الصورة الشخصية والوثائق */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008C78]/10 text-[#008C78]">
              <FiUploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">الصورة الشخصية والمستندات</h2>
              <p className="text-xs font-normal text-gray-500">
                صورة اليتيم وشهادة الميلاد الرسمية
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* profileImage */}
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4 transition-all hover:bg-gray-50">
              <label htmlFor="profileImage" className="block text-xs font-semibold text-gray-700 mb-2">
                الصورة الشخصية لليتيم
              </label>

              <div className="flex flex-col items-center justify-center gap-3">
                {previewUrl ? (
                  <div className="relative group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm w-full h-44">
                    <img
                      src={previewUrl}
                      onError={() => {
                        if (selectedImageUrl) setSelectedImageUrl("");
                        else setExistingImageUrl("");
                      }}
                      alt="الصورة الشخصية لليتيم"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs text-white font-medium bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                        تغيير الصورة
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-36 w-full flex-col items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-400">
                    <MdChildCare className="h-10 w-10 text-gray-300" />
                    <span className="mt-1 text-xs font-normal text-gray-400">لا توجد صورة شخصية محددة</span>
                  </div>
                )}

                <div className="w-full">
                  <input
                    id="profileImage"
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={change}
                    className="block w-full text-xs font-normal text-gray-500 file:mr-0 file:ml-3 file:rounded-lg file:border-0 file:bg-[#008C78]/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#008C78] hover:file:bg-[#008C78]/20"
                  />
                  {editing && (
                    <span className="mt-1.5 block text-[11px] font-normal text-gray-400">
                      اترك الحقل فارغًا للاحتفاظ بالصورة الحالية.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* birthCertificate */}
            {!editing ? (
              <div className="flex flex-col justify-between rounded-xl border border-dashed border-gray-200 bg-gray-50/60 p-4 transition-all hover:bg-gray-50">
                <div>
                  <label htmlFor="birthCertificate" className="block text-xs font-semibold text-gray-700 mb-2">
                    شهادة الميلاد <span className="text-red-500">*</span>
                  </label>
                  <p className="text-xs font-normal text-gray-500 mb-4 leading-relaxed">
                    يرجى إرفاق صورة أو ملف PDF ملون وواضح لشهادة الميلاد الرسمية الخاص باليتيم.
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <FiPaperclip className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block truncate text-xs font-medium text-gray-800">
                        {form.birthCertificate ? form.birthCertificate.name : "لم يتم اختيار ملف بعد"}
                      </span>
                      <span className="block text-[11px] text-gray-400">
                        {form.birthCertificate
                          ? `${(form.birthCertificate.size / 1024 / 1024).toFixed(2)} MB`
                          : "PDF, JPG, PNG"}
                      </span>
                    </div>
                  </div>

                  <input
                    id="birthCertificate"
                    type="file"
                    name="birthCertificate"
                    onChange={change}
                    required
                    className="mt-3 block w-full text-xs font-normal text-gray-500 file:mr-0 file:ml-3 file:rounded-lg file:border-0 file:bg-[#008C78]/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#008C78] hover:file:bg-[#008C78]/20"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-right">
                <div className="flex items-center gap-2 text-emerald-700 mb-1">
                  <FiCheckCircle className="h-5 w-5 shrink-0" />
                  <span className="text-xs font-semibold">شهادة الميلاد مرفوعة</span>
                </div>
                <p className="text-xs font-normal text-gray-500 leading-relaxed">
                  شهادة الميلاد محفوظة مسبقاً في النظام.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Card 3: وصف الحالة */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008C78]/10 text-[#008C78]">
                <FiFileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900">وصف الحالة</h2>
                <p className="text-xs font-normal text-gray-500">
                  شرح وضع اليتيم والاحتياجات الأساسية
                </p>
              </div>
            </div>
            <span className="text-xs font-medium text-gray-400">
              {form.caseDescription.length} / 1000
            </span>
          </div>

          <div>
            <textarea
              id="caseDescription"
              name="caseDescription"
              value={form.caseDescription}
              onChange={change}
              required
              maxLength={1000}
              rows={5}
              placeholder="اكتب وصفاً مفصلاً وموضحاً لحالة اليتيم وااحتياجاته المعيشية والتعليمية..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-sm font-normal text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-[#008C78] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#008C78]/10"
            />
          </div>
        </section>

        {/* Error notification */}
        {error && (
          <div role="alert" className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-4 text-sm font-medium text-red-700">
            <FiAlertCircle className="h-5 w-5 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 active:scale-95"
          >
            إلغاء
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#008C78] px-8 py-3 text-sm font-semibold text-white shadow-md shadow-[#008C78]/20 transition-all hover:bg-[#007566] active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            {submitting ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>جارٍ الحفظ...</span>
              </>
            ) : (
              <>
                <FiCheckCircle className="h-4 w-4" />
                <span>{editing ? "حفظ التعديلات" : "حفظ وإرسال للمراجعة"}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </GuardianFlowLayout>
  );
}
