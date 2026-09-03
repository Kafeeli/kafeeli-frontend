import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orphanApi } from "../../services/orphanApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import GuardianFlowLayout from "./GuardianFlowLayout";

const EMPTY_FORM = { firstName: "", fatherName: "", grandfatherName: "", nationalId: "", dateOfBirth: "", gender: "", educationStatus: "", caseDescription: "", profileImage: null, birthCertificate: null };

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

  const load = useCallback(async () => {
    if (!editing) return;
    const requestId = ++loadRequestRef.current;
    setLoading(true); setLoadError("");
    setExistingImageUrl("");
    setSelectedImageUrl("");
    try {
      const data = unwrapResult(await orphanApi.getById(orphanId), "تعذر تحميل بيانات اليتيم.");
      if (loadRequestRef.current !== requestId) return;
      setForm({ ...EMPTY_FORM, firstName: data.firstName || "", fatherName: data.fatherName || "", grandfatherName: data.grandfatherName || "", dateOfBirth: data.dateOfBirth?.slice(0, 10) || "", gender: data.gender === "Male" ? "1" : data.gender === "Female" ? "2" : "", educationStatus: data.educationalStatus || "", caseDescription: data.caseDescription || "" });
      if (data.hasProfileImage === true) {
        try {
          const blob = await orphanApi.getProfileImage(orphanId);
          const objectUrl = URL.createObjectURL(blob);
          if (loadRequestRef.current === requestId) setExistingImageUrl(objectUrl);
          else URL.revokeObjectURL(objectUrl);
        } catch {
          if (loadRequestRef.current === requestId) setExistingImageUrl("");
        }
      }
    } catch (requestError) {
      if (loadRequestRef.current === requestId) setLoadError(apiErrorMessage(requestError, "تعذر تحميل بيانات اليتيم."));
    }
    finally { if (loadRequestRef.current === requestId) setLoading(false); }
  }, [editing, orphanId]);
  useEffect(() => { const id = window.setTimeout(load, 0); return () => window.clearTimeout(id); }, [load]);
  useEffect(() => () => { loadRequestRef.current += 1; }, []);
  useEffect(() => () => { if (existingImageUrl) URL.revokeObjectURL(existingImageUrl); }, [existingImageUrl]);
  useEffect(() => () => { if (selectedImageUrl) URL.revokeObjectURL(selectedImageUrl); }, [selectedImageUrl]);

  const change = (event) => {
    const { name, value, files } = event.target;
    const file = files ? files[0] || null : null;
    setForm((current) => ({ ...current, [name]: files ? file : value }));
    if (editing && name === "profileImage") setSelectedImageUrl(file ? URL.createObjectURL(file) : "");
  };
  const submit = async (event) => {
    event.preventDefault(); setSubmitting(true); setError("");
    try {
      const result = editing ? await orphanApi.update(orphanId, form) : await orphanApi.create(familyId, form);
      const data = unwrapResult(result, editing ? "تعذر تحديث بيانات اليتيم." : "تعذر إضافة اليتيم.");
      navigate(`/guardian/orphans/${data.orphanId}`);
    } catch (requestError) { setError(apiErrorMessage(requestError, "تعذر حفظ بيانات اليتيم.")); }
    finally { setSubmitting(false); }
  };
  if (loading) return <GuardianFlowLayout title="بيانات اليتيم"><LoadingState count={2} columns="md:grid-cols-2" /></GuardianFlowLayout>;
  if (loadError) return <GuardianFlowLayout title="بيانات اليتيم"><ErrorState onRetry={load} description={loadError} /></GuardianFlowLayout>;
  return <GuardianFlowLayout title={editing ? "تعديل بيانات اليتيم" : "إضافة يتيم"} description={editing ? "يجب إعادة إدخال رقم الهوية الكامل؛ يعرض الخادم الرقم المقنّع فقط." : "إضافة يتيم إلى العائلة النشطة"}>
    <form onSubmit={submit} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-3">
        {[['firstName','الاسم الأول',150],['fatherName','اسم الأب',150],['grandfatherName','اسم الجد',150],['nationalId','رقم الهوية',9],['educationStatus','الحالة التعليمية',100]].map(([name,label,maxLength]) => <label key={name} className="text-sm font-bold">{label}<input name={name} value={form[name]} onChange={change} required maxLength={maxLength} minLength={name === 'nationalId' ? 9 : undefined} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>)}
        <label className="text-sm font-bold">تاريخ الميلاد<input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={change} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
        <label className="text-sm font-bold">الجنس<select name="gender" value={form.gender} onChange={change} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2"><option value="">غير محدد</option><option value="1">ذكر</option><option value="2">أنثى</option></select></label>
        <div className="text-sm font-bold">
          <label htmlFor="profileImage">الصورة الشخصية</label>
          {editing && <div className="mt-2 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            {selectedImageUrl || existingImageUrl
              ? <img src={selectedImageUrl || existingImageUrl} onError={() => { if (selectedImageUrl) setSelectedImageUrl(""); else setExistingImageUrl(""); }} alt="الصورة الشخصية لليتيم" className="h-48 w-full object-cover" />
              : <div className="flex h-48 flex-col items-center justify-center gap-2 text-gray-400" role="img" aria-label="لا توجد صورة شخصية">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-12 w-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0" /></svg>
                <span className="text-xs font-medium">لا توجد صورة متاحة</span>
              </div>}
          </div>}
          <input id="profileImage" type="file" name="profileImage" onChange={change} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" />
          {editing && <span className="mt-2 block text-xs font-normal text-gray-500">يفضل استخدام صورة واضحة.</span>}
        </div>
        {!editing && <label className="text-sm font-bold">شهادة الميلاد<input type="file" name="birthCertificate" onChange={change} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>}
      </div>
      <label className="mt-5 block text-sm font-bold">وصف الحالة<textarea name="caseDescription" value={form.caseDescription} onChange={change} required maxLength={1000} rows={5} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={submitting} className="mt-5 rounded-lg bg-[#008C78] px-6 py-3 font-bold text-white disabled:bg-gray-400">{submitting ? "جارٍ الحفظ..." : "حفظ وإرسال للمراجعة"}</button>
    </form>
  </GuardianFlowLayout>;
}
