import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiCheckCircle,
  FiFileText,
  FiHash,
  FiUpload,
  FiUser,
} from "react-icons/fi";

import { orphanApi } from "../../services/orphanApi";
import {
  apiErrorMessage,
  unwrapResult,
} from "../../utils/apiUi";

import {
  ErrorState,
  LoadingState,
} from "../admin-dashboard/Adminstates";

import GuardianFlowLayout from "./GuardianFlowLayout";


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

    </div>
  );
}


/* =========================================================
   PAGE
========================================================= */

export default function GuardianOrphanFormPage({
  mode,
}) {
  const {
    familyId,
    orphanId,
  } = useParams();

  const navigate = useNavigate();

  const editing =
    mode === "edit";


  /* =========================================================
     STATE
  ========================================================= */

  const [form, setForm] =
    useState({
      ...EMPTY_FORM,
    });

  const [loading, setLoading] =
    useState(editing);

  const [loadError, setLoadError] =
    useState("");

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [fieldErrors, setFieldErrors] =
    useState({});


  /* =========================================================
     LOAD ORPHAN
  ========================================================= */

  const load = useCallback(
    async () => {
      if (!editing) return;

      setLoading(true);
      setLoadError("");

      try {
        const data =
          unwrapResult(
            await orphanApi.getById(
              orphanId,
            ),
            "تعذر تحميل بيانات اليتيم.",
          );

        setForm({
          ...EMPTY_FORM,

          firstName:
            data.firstName || "",

          fatherName:
            data.fatherName || "",

          grandfatherName:
            data.grandfatherName || "",

          /*
           * إذا الـAPI لا يعيد الهوية الكاملة
           * سيبقى الحقل فارغًا.
           */
          nationalId:
            data.nationalId || "",

          dateOfBirth:
            data.dateOfBirth?.slice(
              0,
              10,
            ) || "",

          gender:
            data.gender === "Male"
              ? "1"
              : data.gender === "Female"
                ? "2"
                : "",

          educationStatus:
            data.educationalStatus ||
            "",

          caseDescription:
            data.caseDescription ||
            "",
        });

      } catch (requestError) {

        setLoadError(
          apiErrorMessage(
            requestError,
            "تعذر تحميل بيانات اليتيم.",
          ),
        );

      } finally {
        setLoading(false);
      }
    },
    [
      editing,
      orphanId,
    ],
  );


  useEffect(() => {
    const id =
      window.setTimeout(
        load,
        0,
      );

    return () =>
      window.clearTimeout(id);
  }, [load]);


  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const change = (event) => {
    const {
      name,
      value,
      files,
    } = event.target;

    const newValue = files
      ? files[0] || null
      : value;

    setForm((current) => ({
      ...current,
      [name]: newValue,
    }));


    /*
     * عند تعديل الحقل نحذف الخطأ الخاص فيه
     */

    setFieldErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const updated = {
        ...current,
      };

      delete updated[name];

      return updated;
    });

    setError("");
  };


  /* =========================================================
     NATIONAL ID CHANGE
  ========================================================= */

  const changeNationalId = (
    event,
  ) => {
    const value =
      event.target.value.replace(
        /\D/g,
        "",
      );

    setForm((current) => ({
      ...current,
      nationalId: value,
    }));

    setFieldErrors((current) => {
      if (!current.nationalId) {
        return current;
      }

      const updated = {
        ...current,
      };

      delete updated.nationalId;

      return updated;
    });

    setError("");
  };


  /* =========================================================
     CLIENT VALIDATION
  ========================================================= */

  const validateForm = () => {
    const errors = {};


    /* -----------------------------------------
       FIRST NAME
    ------------------------------------------ */

    if (
      !String(
        form.firstName || "",
      ).trim()
    ) {
      errors.firstName =
        "يرجى إدخال الاسم الأول.";
    }


    /* -----------------------------------------
       FATHER
    ------------------------------------------ */

    if (
      !String(
        form.fatherName || "",
      ).trim()
    ) {
      errors.fatherName =
        "يرجى إدخال اسم الأب.";
    }


    /* -----------------------------------------
       GRANDFATHER
    ------------------------------------------ */

    if (
      !String(
        form.grandfatherName || "",
      ).trim()
    ) {
      errors.grandfatherName =
        "يرجى إدخال اسم الجد.";
    }


    /* -----------------------------------------
       NATIONAL ID
    ------------------------------------------ */

    const nationalId =
      String(
        form.nationalId || "",
      ).trim();

    if (!nationalId) {

      errors.nationalId =
        "يرجى إدخال رقم الهوية.";

    } else if (
      !/^\d{9}$/.test(
        nationalId,
      )
    ) {

      errors.nationalId =
        "رقم الهوية يجب أن يتكون من 9 أرقام.";

    }


    /* -----------------------------------------
       DATE OF BIRTH
    ------------------------------------------ */

    if (!form.dateOfBirth) {

      errors.dateOfBirth =
        "يرجى إدخال تاريخ الميلاد.";

    } else {

      const age =
        calculateAge(
          form.dateOfBirth,
        );

      if (age === null) {

        errors.dateOfBirth =
          "تاريخ الميلاد غير صحيح.";

      } else if (age < 0) {

        errors.dateOfBirth =
          "تاريخ الميلاد لا يمكن أن يكون في المستقبل.";

      } else if (age > 18) {

        errors.dateOfBirth =
          "عمر اليتيم يجب ألا يتجاوز 18 سنة.";
      }
    }


    /* -----------------------------------------
       EDUCATION
    ------------------------------------------ */

    if (
      !String(
        form.educationStatus || "",
      ).trim()
    ) {
      errors.educationStatus =
        "يرجى إدخال الحالة التعليمية.";
    }


    /* -----------------------------------------
       CASE DESCRIPTION
    ------------------------------------------ */

    if (
      !String(
        form.caseDescription || "",
      ).trim()
    ) {
      errors.caseDescription =
        "يرجى إدخال وصف الحالة.";
    }


    /* -----------------------------------------
       BIRTH CERTIFICATE
    ------------------------------------------ */

    if (
      !editing &&
      !form.birthCertificate
    ) {
      errors.birthCertificate =
        "يرجى رفع شهادة الميلاد.";
    }


    return errors;
  };


  /* =========================================================
     FOCUS FIRST ERROR
  ========================================================= */

  const focusFirstError = (
    errors,
  ) => {
    const firstErrorField =
      Object.keys(errors)[0];

    if (!firstErrorField) return;

    window.setTimeout(() => {

      const element =
        document.querySelector(
          `[name="${firstErrorField}"]`,
        );

      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      element.focus();

    }, 100);
  };


  /* =========================================================
     SUBMIT
  ========================================================= */

  const submit = async (
    event,
  ) => {
    event.preventDefault();

    setError("");
    setFieldErrors({});


    /* -----------------------------------------
       FRONTEND VALIDATION
    ------------------------------------------ */

    const clientErrors =
      validateForm();

    if (
      Object.keys(
        clientErrors,
      ).length > 0
    ) {

      setFieldErrors(
        clientErrors,
      );

      setError(
        "يرجى مراجعة الحقول المحددة وتصحيح البيانات.",
      );

      focusFirstError(
        clientErrors,
      );

      return;
    }


    /* -----------------------------------------
       SUBMIT
    ------------------------------------------ */

    setSubmitting(true);

    try {

      const result =
        editing
          ? await orphanApi.update(
              orphanId,
              form,
            )
          : await orphanApi.create(
              familyId,
              form,
            );


      const data =
        unwrapResult(
          result,
          editing
            ? "تعذر تحديث بيانات اليتيم."
            : "تعذر إضافة اليتيم.",
        );


      navigate(
        `/guardian/orphans/${data.orphanId}`,
      );

    } catch (requestError) {

      console.error(
        "ORPHAN FORM ERROR:",
        requestError,
      );


      /* -----------------------------------------
         EXTRACT BACKEND ERRORS
      ------------------------------------------ */

      const backendErrors =
        extractValidationErrors(
          requestError,
        );


      /* -----------------------------------------
         FIELD ERRORS FOUND
      ------------------------------------------ */

      if (
        Object.keys(
          backendErrors,
        ).length > 0
      ) {

        setFieldErrors(
          backendErrors,
        );

        setError(
          "لم يتم حفظ البيانات. يرجى تصحيح الأخطاء الموضحة في الحقول.",
        );

        focusFirstError(
          backendErrors,
        );

        return;
      }


      /* -----------------------------------------
         FALLBACK:
         SHOW API ERRORS ARRAY
      ------------------------------------------ */

      const responseData =
        requestError?.response?.data ||
        requestError?.data ||
        requestError ||
        {};

      const backendErrorsList =
        Array.isArray(
          responseData?.errors,
        )
          ? responseData.errors
          : [];


      if (
        backendErrorsList.length > 0
      ) {

        setError(
          backendErrorsList.join(
            " ",
          ),
        );

        return;
      }


      /* -----------------------------------------
         FALLBACK MESSAGE
      ------------------------------------------ */

      setError(
        responseData?.message ||
          apiErrorMessage(
            requestError,
            "تعذر حفظ بيانات اليتيم. يرجى المحاولة مرة أخرى.",
          ),
      );

    } finally {
      setSubmitting(false);
    }
  };


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <GuardianFlowLayout
        title="بيانات اليتيم"
      >
        <LoadingState
          count={2}
          columns="md:grid-cols-2"
        />
      </GuardianFlowLayout>
    );
  }


  /* =========================================================
     LOAD ERROR
  ========================================================= */

  if (loadError) {
    return (
      <GuardianFlowLayout
        title="بيانات اليتيم"
      >
        <ErrorState
          onRetry={load}
          description={
            loadError
          }
        />
      </GuardianFlowLayout>
    );
  }


  /* =========================================================
     UI
  ========================================================= */

  return (
    <GuardianFlowLayout
      title={
        editing
          ? "تعديل بيانات اليتيم"
          : "إضافة يتيم"
      }
      description={
        editing
          ? "قم بمراجعة بيانات اليتيم وتحديث المعلومات المطلوبة."
          : "أدخل بيانات اليتيم بدقة، ثم أرسلها للمراجعة."
      }
    >

      <form
        onSubmit={submit}
        noValidate
        className="mx-auto w-full max-w-5xl"
      >

        {/* ===================================================
            ERROR SUMMARY
        ==================================================== */}

        {error && (

          <div
            role="alert"
            className="
              mb-5
              flex
              items-start
              gap-3
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-4
              shadow-sm
            "
          >

            <div className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-red-100
              text-red-600
            ">
              <FiAlertCircle
                size={20}
              />
            </div>

            <div className="min-w-0">

              <p className="text-sm font-extrabold text-red-700">
                تعذر حفظ البيانات
              </p>

              <p className="mt-1 text-xs leading-5 text-red-600">
                {error}
              </p>

            </div>

          </div>
        )}


        {/* ===================================================
            PERSONAL INFORMATION
        ==================================================== */}

        <section className="
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
        ">

          <SectionHeader
            icon={FiUser}
            title="البيانات الشخصية"
            description="أدخل البيانات الأساسية لليتيم."
          />


          <div className="
            grid
            gap-5
            p-5
            md:grid-cols-3
          ">

            {/* FIRST NAME */}

            <label className="
              text-sm
              font-bold
              text-gray-700
            ">

              الاسم الأول

              <input
                name="firstName"
                value={
                  form.firstName
                }
                onChange={change}
                required
                maxLength={150}
                placeholder="مثال: محمد"
                className={inputClass(
                  fieldErrors.firstName,
                )}
              />

              <FieldError
                message={
                  fieldErrors.firstName
                }
              />

            </label>


            {/* FATHER NAME */}

            <label className="
              text-sm
              font-bold
              text-gray-700
            ">

              اسم الأب

              <input
                name="fatherName"
                value={
                  form.fatherName
                }
                onChange={change}
                required
                maxLength={150}
                placeholder="مثال: أحمد"
                className={inputClass(
                  fieldErrors.fatherName,
                )}
              />

              <FieldError
                message={
                  fieldErrors.fatherName
                }
              />

            </label>


            {/* GRANDFATHER */}

            <label className="
              text-sm
              font-bold
              text-gray-700
            ">

              اسم الجد

              <input
                name="grandfatherName"
                value={
                  form.grandfatherName
                }
                onChange={change}
                required
                maxLength={150}
                placeholder="مثال: محمود"
                className={inputClass(
                  fieldErrors.grandfatherName,
                )}
              />

              <FieldError
                message={
                  fieldErrors.grandfatherName
                }
              />

            </label>


            {/* NATIONAL ID */}

            <label className="
              text-sm
              font-bold
              text-gray-700
            ">

              رقم الهوية

              <div className="relative">

                <FiHash
                  size={17}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  name="nationalId"
                  value={
                    form.nationalId
                  }
                  onChange={
                    changeNationalId
                  }
                  required
                  maxLength={9}
                  inputMode="numeric"
                  dir="ltr"
                  placeholder="123456789"
                  className={`
                    ${inputClass(
                      fieldErrors.nationalId,
                    )}
                    pr-10
                    text-right
                  `}
                />

              </div>

              <p className="mt-2 text-[11px] text-gray-400">
                يجب أن يتكون رقم الهوية من 9 أرقام.
              </p>

              <FieldError
                message={
                  fieldErrors.nationalId
                }
              />

            </label>


            {/* DATE OF BIRTH */}

            <label className="
              text-sm
              font-bold
              text-gray-700
            ">

              تاريخ الميلاد

              <div className="relative">

                <FiCalendar
                  size={17}
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  name="dateOfBirth"
                  type="date"
                  value={
                    form.dateOfBirth
                  }
                  onChange={change}
                  required
                  className={`
                    ${inputClass(
                      fieldErrors.dateOfBirth,
                    )}
                    pr-10
                  `}
                />

              </div>

              <FieldError
                message={
                  fieldErrors.dateOfBirth
                }
              />

            </label>


            {/* GENDER */}

            <label className="
              text-sm
              font-bold
              text-gray-700
            ">

              الجنس

              <select
                name="gender"
                value={
                  form.gender
                }
                onChange={change}
                className={inputClass(
                  fieldErrors.gender,
                )}
              >

                <option value="">
                  اختر الجنس
                </option>

                <option value="1">
                  ذكر
                </option>

                <option value="2">
                  أنثى
                </option>

              </select>

              <FieldError
                message={
                  fieldErrors.gender
                }
              />

            </label>


            {/* EDUCATION */}

            <label className="
              text-sm
              font-bold
              text-gray-700
              md:col-span-3
            ">

              الحالة التعليمية

              <input
                name="educationStatus"
                value={
                  form.educationStatus
                }
                onChange={change}
                required
                maxLength={100}
                placeholder="مثال: طالب في المرحلة الأساسية"
                className={inputClass(
                  fieldErrors.educationStatus,
                )}
              />

              <FieldError
                message={
                  fieldErrors.educationStatus
                }
              />

            </label>

          </div>

        </section>


        {/* ===================================================
            DOCUMENTS
        ==================================================== */}

        <section className="
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
        ">

          <SectionHeader
            icon={FiUpload}
            title="الوثائق"
            description="ارفع الوثائق المطلوبة للتحقق من الحالة."
          />


          <div className="
            grid
            gap-5
            p-5
            md:grid-cols-2
          ">

            {/* PROFILE IMAGE */}

            <label className="
              text-sm
              font-bold
              text-gray-700
            ">

              الصورة الشخصية

              <div className={`
                mt-2
                rounded-xl
                border
                border-dashed
                p-4
                transition
                ${
                  fieldErrors.profileImage
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300 bg-gray-50 hover:border-[#0D4B8E]"
                }
              `}>

                <input
                  type="file"
                  name="profileImage"
                  onChange={change}
                  accept="image/*"
                  className="
                    w-full
                    cursor-pointer
                    text-xs
                    text-gray-500
                  "
                />

              </div>

              <p className="mt-2 text-[11px] text-gray-400">
                يفضل استخدام صورة واضحة.
              </p>

              <FieldError
                message={
                  fieldErrors.profileImage
                }
              />

            </label>


            {/* BIRTH CERTIFICATE */}

            {!editing && (

              <label className="
                text-sm
                font-bold
                text-gray-700
              ">

                شهادة الميلاد

                <div className={`
                  mt-2
                  rounded-xl
                  border
                  border-dashed
                  p-4
                  transition
                  ${
                    fieldErrors.birthCertificate
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300 bg-gray-50 hover:border-[#0D4B8E]"
                  }
                `}>

                  <input
                    type="file"
                    name="birthCertificate"
                    onChange={change}
                    required
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="
                      w-full
                      cursor-pointer
                      text-xs
                      text-gray-500
                    "
                  />

                </div>

                <p className="mt-2 text-[11px] text-gray-400">
                  PDF أو JPG أو PNG.
                </p>

                <FieldError
                  message={
                    fieldErrors.birthCertificate
                  }
                />

              </label>

            )}

          </div>

        </section>


        {/* ===================================================
            CASE DESCRIPTION
        ==================================================== */}

        <section className="
          mt-5
          overflow-hidden
          rounded-2xl
          border
          border-gray-200
          bg-white
          shadow-sm
        ">

          <SectionHeader
            icon={FiFileText}
            title="وصف الحالة"
            description="اكتب وصفًا واضحًا ومختصرًا للحالة."
          />


          <div className="p-5">

            <textarea
              name="caseDescription"
              value={
                form.caseDescription
              }
              onChange={change}
              required
              maxLength={1000}
              rows={6}
              placeholder="اكتب تفاصيل الحالة هنا..."
              className={`
                ${inputClass(
                  fieldErrors.caseDescription,
                )}
                resize-none
              `}
            />


            <div className="
              mt-2
              flex
              items-start
              justify-between
              gap-3
            ">

              <FieldError
                message={
                  fieldErrors.caseDescription
                }
              />

              <span className="
                mr-auto
                shrink-0
                text-[11px]
                text-gray-400
              ">
                {String(
                  form.caseDescription ||
                    "",
                ).length}
                /1000
              </span>

            </div>

          </div>

        </section>


        {/* ===================================================
            ACTIONS
        ==================================================== */}

        <div className="
          mt-5
          flex
          flex-col-reverse
          gap-3
          sm:flex-row
          sm:justify-end
        ">

          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            disabled={submitting}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-6
              py-3
              text-sm
              font-bold
              text-gray-600
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <FiArrowRight
              size={16}
            />

            إلغاء

          </button>


          <button
            type="submit"
            disabled={submitting}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#0D4B8E]
              px-7
              py-3
              text-sm
              font-extrabold
              text-white
              shadow-lg
              shadow-[#0D4B8E]/15
              transition
              hover:bg-[#003469]
              focus:outline-none
              focus:ring-4
              focus:ring-[#0D4B8E]/20
              disabled:cursor-not-allowed
              disabled:bg-gray-400
              disabled:shadow-none
            "
          >

            {submitting ? (

              <>
                <span className="
                  h-4
                  w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                " />

                جارٍ الحفظ...

              </>

            ) : (

              <>
                <FiCheckCircle
                  size={17}
                />

                حفظ وإرسال للمراجعة

              </>

            )}

          </button>

        </div>

      </form>

    </GuardianFlowLayout>
  );
}