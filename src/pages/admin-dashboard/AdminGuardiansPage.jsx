import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit2, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdDescription, MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatArabicDateTime } from "../../utils/date";
import {
  localizeStatus,
  localizeVerificationStatus,
} from "../../utils/localization";

import AdminLayout from "./Adminlayout";
import { AdminConfirmationDialog, AdminDialog } from "./AdminManagementDialogs";
import { EmptyState, ErrorState, LoadingState, MiniStatCard } from "./Adminstates";

const VERIFICATION_FILTERS = [
  { value: "all", label: "كل حالات التحقق" },
  { value: "Pending", label: "قيد المراجعة" },
  { value: "Approved", label: "موثق" },
  { value: "Rejected", label: "مرفوض" },
  { value: "NeedsUpdate", label: "يحتاج تحديث" },
  { value: "Suspended", label: "معلق" },
];

const ACCOUNT_FILTERS = [
  { value: "all", label: "كل حالات الحساب" },
  { value: "Active", label: "نشط" },
  { value: "Suspended", label: "معلّق" },
];

function accountStatusLabel(status) {
  return status === "Active" ? "نشط" : status === "Suspended" ? "معلّق" : status || "—";
}

function accountStatusClasses(status) {
  return status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700";
}

function toDateInputValue(value) {
  return value ? String(value).slice(0, 10) : "";
}

function guardianForm(details) {
  return {
    firstName: details.firstName || "",
    fatherName: details.fatherName || "",
    grandfatherName: details.grandfatherName || "",
    familyName: details.familyName || "",
    phoneNumber: details.phoneNumber || "",
    dateOfBirth: toDateInputValue(details.dateOfBirth),
    gender: details.gender === "Female" ? "2" : "1",
    address: details.address || "",
    city: details.city || "",
    country: details.country || "",
    occupation: details.occupation || "",
  };
}

function DetailItem({ label, value, dir }) {
  return <div><dt className="text-xs font-bold text-gray-500">{label}</dt><dd dir={dir} className="mt-1 break-words text-sm font-bold text-gray-900">{value ?? "—"}</dd></div>;
}

export default function AdminGuardiansPage() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [dialogMode, setDialogMode] = useState("");
  const [editForm, setEditForm] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState("");

  const load = useCallback(async ({ silent = false } = {}) => {
    if (!silent) setLoading(true);
    setError("");

    try {
      const data = unwrapResult(await adminApi.getAllGuardians(), "تعذر تحميل قائمة الأوصياء.");
      setGuardians(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(
        apiErrorMessage(
          requestError,
          "تعذر تحميل قائمة الأوصياء.",
        ),
      );
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);

    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const fetchDetails = useCallback(async (guardianId) => (
    unwrapResult(await adminApi.getGuardianDetails(guardianId), "تعذر تحميل تفاصيل الوصي.")
  ), []);

  const openGuardian = async (guardianId, mode = "details") => {
    if (busy) return;
    setBusy(`details-${guardianId}`);
    setActionError("");
    setSuccessMessage("");
    try {
      const details = await fetchDetails(guardianId);
      setSelected(details);
      setEditForm(guardianForm(details));
      setDialogMode(mode);
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحميل تفاصيل الوصي."));
    } finally {
      setBusy("");
    }
  };

  const openDelete = async (guardianId) => {
    if (busy) return;
    setBusy(`delete-details-${guardianId}`);
    setActionError("");
    setSuccessMessage("");
    try {
      const details = await fetchDetails(guardianId);
      setConfirmation({ type: "delete", guardian: details });
      setReason("");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر التحقق من إمكانية حذف الوصي."));
    } finally {
      setBusy("");
    }
  };

  const refreshDetailsIfOpen = async (guardianId) => {
    if (selected?.guardianId !== guardianId) return;
    const details = await fetchDetails(guardianId);
    setSelected(details);
    setEditForm(guardianForm(details));
  };

  const submitEdit = async (event) => {
    event.preventDefault();
    if (busy || !selected || !editForm) return;
    setBusy("edit");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.updateGuardian(selected.guardianId, {
        ...editForm,
        gender: Number(editForm.gender),
      }), "تعذر تحديث بيانات الوصي.");
      await load({ silent: true });
      const details = await fetchDetails(selected.guardianId);
      setSelected(details);
      setEditForm(guardianForm(details));
      setDialogMode("details");
      setSuccessMessage("تم تحديث بيانات الوصي بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحديث بيانات الوصي."));
    } finally {
      setBusy("");
    }
  };

  const confirmStatus = async () => {
    if (busy || confirmation?.type !== "status") return;
    const { guardian, isActive } = confirmation;
    setBusy("status");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.updateGuardianStatus(guardian.guardianId, isActive, reason), "تعذر تحديث حالة حساب الوصي.");
      setConfirmation(null);
      setReason("");
      await load({ silent: true });
      await refreshDetailsIfOpen(guardian.guardianId);
      setSuccessMessage(isActive ? "تمت إعادة تفعيل حساب الوصي بنجاح." : "تم تعليق حساب الوصي بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحديث حالة حساب الوصي."));
    } finally {
      setBusy("");
    }
  };

  const confirmDelete = async () => {
    if (busy || confirmation?.type !== "delete" || !confirmation.guardian.canDelete) return;
    const guardianId = confirmation.guardian.guardianId;
    setBusy("delete");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.deleteGuardian(guardianId), "تعذر حذف حساب الوصي.");
      setConfirmation(null);
      if (selected?.guardianId === guardianId) {
        setSelected(null);
        setDialogMode("");
      }
      await load({ silent: true });
      setSuccessMessage("تم حذف حساب الوصي نهائيًا بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر حذف حساب الوصي."));
    } finally {
      setBusy("");
    }
  };

  const filteredGuardians = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return guardians.filter((guardian) => {
      const matchesVerification = verificationFilter === "all" || guardian.verificationStatus === verificationFilter;
      const matchesAccount = accountFilter === "all" || guardian.accountStatus === accountFilter;
      const matchesSearch = !query || [guardian.fullName, guardian.email, guardian.phoneNumber]
        .some((value) => String(value || "").toLowerCase().includes(query));
      return matchesVerification && matchesAccount && matchesSearch;
    });
  }, [accountFilter, guardians, searchTerm, verificationFilter]);

  const showStatusConfirmation = (guardian, isActive) => {
    setConfirmation({ type: "status", guardian, isActive });
    setReason("");
    setActionError("");
    setSuccessMessage("");
  };

  /*
   * ---------------------------------------------------------
   * Verification Badge Styles
   * ---------------------------------------------------------
   */

  const getVerificationStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200";

      case "Pending":
        return "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200";

      case "Rejected":
        return "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200";

      case "NeedsUpdate":
        return "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200";

      case "Suspended":
        return "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200";

      default:
        return "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200";
    }
  };

  /*
   * ---------------------------------------------------------
   * Family Status Styles
   * ---------------------------------------------------------
   */

  const getFamilyStyle = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700";

      case "Pending":
        return "bg-amber-50 text-amber-700";

      case "Inactive":
        return "bg-gray-100 text-gray-600";

      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  /*
   * ---------------------------------------------------------
   * Content
   * ---------------------------------------------------------
   */

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (guardians.length === 0) content = <EmptyState icon={HiOutlineIdentification} title="لا يوجد أوصياء" description="لم يُرجع الخادم أي حسابات أوصياء حتى الآن." />;
  else if (filteredGuardians.length === 0) content = <EmptyState icon={FiSearch} title="لا توجد نتائج مطابقة" description="جرّب تعديل البحث أو عوامل التصفية." />;
  else content = (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto"><table className="w-full min-w-[1280px] text-right text-sm">
        <thead className="bg-[#F5F7FA] text-[#374151]"><tr><th className="px-4 py-3 font-extrabold">الاسم</th><th className="px-4 py-3 font-extrabold">البريد الإلكتروني</th><th className="px-4 py-3 font-extrabold">الهاتف</th><th className="px-4 py-3 font-extrabold">الموقع</th><th className="px-4 py-3 font-extrabold">التحقق</th><th className="px-4 py-3 font-extrabold">الحساب</th><th className="px-4 py-3 font-extrabold">العائلة</th><th className="px-4 py-3 font-extrabold">الإجراءات</th></tr></thead>
        <tbody className="divide-y divide-gray-100">{filteredGuardians.map((guardian) => (
          <tr key={guardian.guardianId} className="hover:bg-gray-50/70">
            <td className="px-4 py-4 font-bold text-[#003469]">{guardian.fullName || "—"}</td><td className="px-4 py-4 text-gray-600">{guardian.email || "—"}</td><td dir="ltr" className="px-4 py-4 text-right text-gray-600">{guardian.phoneNumber || "—"}</td><td className="px-4 py-4">{[guardian.city, guardian.country].filter(Boolean).join("، ") || "—"}</td><td className="px-4 py-4"><span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs font-bold text-[#0D4B8E]">{localizeVerificationStatus(guardian.verificationStatus)}</span></td><td className="px-4 py-4"><span className={`rounded-full px-3 py-1 text-xs font-bold ${accountStatusClasses(guardian.accountStatus)}`}>{accountStatusLabel(guardian.accountStatus)}</span></td><td className="px-4 py-4">{guardian.hasFamily ? localizeStatus(guardian.familyStatus) : "لا توجد عائلة"}</td>
            <td className="px-4 py-4"><div className="flex flex-wrap gap-2"><button type="button" disabled={Boolean(busy)} onClick={() => openGuardian(guardian.guardianId)} className="inline-flex items-center gap-1 rounded-md bg-[#E8F1FA] px-3 py-2 text-xs font-bold text-[#0D4B8E] disabled:opacity-50"><FiEye />عرض التفاصيل</button><button type="button" disabled={Boolean(busy)} onClick={() => openGuardian(guardian.guardianId, "edit")} className="inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-2 text-xs font-bold text-gray-700 disabled:opacity-50"><FiEdit2 />تعديل</button>{guardian.canSuspend && <button type="button" disabled={Boolean(busy)} onClick={() => showStatusConfirmation(guardian, false)} className="inline-flex items-center gap-1 rounded-md bg-amber-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"><MdPauseCircleOutline />تعليق الحساب</button>}{guardian.canReactivate && <button type="button" disabled={Boolean(busy)} onClick={() => showStatusConfirmation(guardian, true)} className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-2 text-xs font-bold text-white disabled:opacity-50"><MdPlayCircleOutline />إعادة تفعيل الحساب</button>}<button type="button" disabled={Boolean(busy)} onClick={() => openDelete(guardian.guardianId)} className="inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-xs font-bold text-red-700 disabled:opacity-50"><FiTrash2 />حذف نهائي</button></div></td>
          </tr>
        ))}</tbody>
      </table></div>
    </div>
  );

  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */

  return (
    <AdminLayout title="الأوصياء"><div className="mx-auto w-full max-w-7xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-extrabold text-[#003469]">إدارة الأوصياء</h1><p className="mt-1 text-sm text-gray-500">عرض بيانات الأوصياء وتعديلها وإدارة حالة الحساب بأمان.</p></div><Link to="/admin-dashboard/guardian-document-reviews" className="inline-flex items-center gap-2 rounded-lg bg-[#0D4B8E] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#003469]"><MdDescription />مراجعة وثائق الأوصياء</Link></div>
      <div className="mb-5 max-w-sm"><MiniStatCard label="إجمالي الأوصياء" value={guardians.length} icon={HiOutlineIdentification} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
      <div className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 lg:grid-cols-[1fr_220px_220px]"><label className="relative"><span className="sr-only">البحث في الأوصياء</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو البريد أو الهاتف" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label><select value={verificationFilter} onChange={(event) => setVerificationFilter(event.target.value)} aria-label="تصفية حسب حالة التحقق" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{VERIFICATION_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select><select value={accountFilter} onChange={(event) => setAccountFilter(event.target.value)} aria-label="تصفية حسب حالة الحساب" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{ACCOUNT_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select></div>
      {actionError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}
      {successMessage && <p role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{successMessage}</p>}
      <p className="mb-3 text-sm font-bold text-gray-600">النتائج: {filteredGuardians.length}</p>{content}
    </div>

    {selected && dialogMode === "details" && <AdminDialog title="تفاصيل الوصي" onClose={() => { setSelected(null); setDialogMode(""); }} footer={<><button type="button" onClick={() => setDialogMode("edit")} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white">تعديل</button>{selected.canSuspend && <button type="button" onClick={() => showStatusConfirmation(selected, false)} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white">تعليق الحساب</button>}{selected.canReactivate && <button type="button" onClick={() => showStatusConfirmation(selected, true)} className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white">إعادة تفعيل الحساب</button>}<button type="button" onClick={() => setConfirmation({ type: "delete", guardian: selected })} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-700">حذف نهائي</button></>}>
      <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><DetailItem label="الاسم الكامل" value={selected.fullName} /><DetailItem label="البريد الإلكتروني" value={selected.email} /><DetailItem label="رقم الهاتف" value={selected.phoneNumber} dir="ltr" /><DetailItem label="رقم الهوية" value={selected.nationalId} dir="ltr" /><DetailItem label="تاريخ الميلاد" value={toDateInputValue(selected.dateOfBirth)} /><DetailItem label="الجنس" value={localizeStatus(selected.gender)} /><DetailItem label="العنوان" value={selected.address} /><DetailItem label="المدينة" value={selected.city} /><DetailItem label="الدولة" value={selected.country} /><DetailItem label="المهنة" value={selected.occupation} /><DetailItem label="الدخل الشهري" value={selected.monthlyIncome} /><DetailItem label="عدد أفراد العائلة" value={selected.familyMembersCount} /><DetailItem label="حالة التحقق" value={localizeVerificationStatus(selected.verificationStatus)} /><DetailItem label="حالة الحساب" value={accountStatusLabel(selected.accountStatus)} /><DetailItem label="تاريخ الانضمام" value={formatArabicDateTime(selected.joinedAt)} /><DetailItem label="صورة ملف شخصي" value={selected.hasProfileImage ? "متوفرة" : "غير متوفرة"} /><DetailItem label="عدد العائلات" value={selected.familyCount} /><DetailItem label="عدد الأيتام" value={selected.orphanCount} /><DetailItem label="عدد الكفالات" value={selected.sponsorshipCount} /><DetailItem label="عدد الدفعات" value={selected.payoutCount} /><DetailItem label="معرّف الوصي" value={selected.guardianId} dir="ltr" /><DetailItem label="معرّف المستخدم" value={selected.userId} dir="ltr" /><DetailItem label="إمكانية التعليق" value={selected.canSuspend ? "متاحة" : "غير متاحة"} /><DetailItem label="إمكانية إعادة التفعيل" value={selected.canReactivate ? "متاحة" : "غير متاحة"} /><DetailItem label="إمكانية الحذف" value={selected.canDelete ? "متاح" : "غير متاح لوجود بيانات مرتبطة"} /></dl>
    </AdminDialog>}

    {selected && dialogMode === "edit" && editForm && <AdminDialog title="تعديل بيانات الوصي" onClose={() => setDialogMode("details")} closeDisabled={busy === "edit"} footer={<><button type="button" onClick={() => setDialogMode("details")} disabled={busy === "edit"} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold">إلغاء</button><button type="submit" form="guardian-edit-form" disabled={busy === "edit"} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy === "edit" ? "جارٍ الحفظ..." : "حفظ التعديلات"}</button></>}>
      <form id="guardian-edit-form" onSubmit={submitEdit} className="grid gap-4 sm:grid-cols-2">{actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700 sm:col-span-2">{actionError}</p>}{[["firstName", "الاسم الأول"], ["fatherName", "اسم الأب"], ["grandfatherName", "اسم الجد"], ["familyName", "اسم العائلة"], ["phoneNumber", "رقم الهاتف"], ["city", "المدينة"], ["country", "الدولة"]].map(([name, label]) => <label key={name} className="text-sm font-bold text-gray-700">{label}<input name={name} value={editForm[name]} onChange={(event) => setEditForm({ ...editForm, [name]: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#0D4B8E]" /></label>)}<label className="text-sm font-bold text-gray-700">تاريخ الميلاد<input type="date" value={editForm.dateOfBirth} onChange={(event) => setEditForm({ ...editForm, dateOfBirth: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><label className="text-sm font-bold text-gray-700">الجنس<select value={editForm.gender} onChange={(event) => setEditForm({ ...editForm, gender: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5"><option value="1">ذكر</option><option value="2">أنثى</option></select></label><label className="text-sm font-bold text-gray-700 sm:col-span-2">العنوان<input value={editForm.address} onChange={(event) => setEditForm({ ...editForm, address: event.target.value })} maxLength={300} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><label className="text-sm font-bold text-gray-700 sm:col-span-2">المهنة<input value={editForm.occupation} onChange={(event) => setEditForm({ ...editForm, occupation: event.target.value })} maxLength={100} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label></form>
    </AdminDialog>}

    {confirmation?.type === "status" && <AdminConfirmationDialog title={confirmation.isActive ? "إعادة تفعيل حساب الوصي" : "تعليق حساب الوصي"} message={confirmation.isActive ? "هل تريد إعادة تفعيل هذا الحساب؟" : "هل أنت متأكد من تعليق هذا الحساب؟"} confirmLabel={confirmation.isActive ? "إعادة التفعيل" : "تأكيد التعليق"} onConfirm={confirmStatus} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "status"} reason={reason} onReasonChange={setReason} error={actionError} />}
    {confirmation?.type === "delete" && <AdminConfirmationDialog title="حذف حساب الوصي نهائيًا" message="هذا الإجراء نهائي ولا يمكن التراجع عنه." warning={confirmation.guardian.canDelete ? "سيُرسل طلب الحذف إلى الخادم بعد التأكيد." : "لا يمكن حذف هذا الوصي حاليًا لوجود بيانات مرتبطة به. يمكنك تعليق الحساب بدلًا من ذلك."} confirmLabel="حذف نهائي" danger onConfirm={confirmDelete} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "delete"} confirmDisabled={!confirmation.guardian.canDelete} error={actionError} />}
    </AdminLayout>
  );
}