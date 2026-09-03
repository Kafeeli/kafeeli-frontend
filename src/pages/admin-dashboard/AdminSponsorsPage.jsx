import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit2, FiEye, FiInfo, FiMapPin, FiSearch, FiTrash2, FiUser } from "react-icons/fi";
import { MdOutlineVolunteerActivism, MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatArabicDateTime } from "../../utils/date";
import { localizeStatus } from "../../utils/localization";
import AdminLayout from "./Adminlayout";
import {
  AdminConfirmationDialog,
  AdminDetailItem,
  AdminDetailsHero,
  AdminDetailsSection,
  AdminDetailStat,
  AdminDialog,
} from "./AdminManagementDialogs";
import { EmptyState, ErrorState, LoadingState, MiniStatCard } from "./Adminstates";
import AdminTableIconButton from "./AdminTableIconButton";

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

function sponsorForm(details) {
  return {
    firstName: details.firstName || "",
    fatherName: details.fatherName || "",
    grandfatherName: details.grandfatherName || "",
    familyName: details.familyName || "",
    phoneNumber: details.phoneNumber || "",
    dateOfBirth: toDateInputValue(details.dateOfBirth),
    gender: details.gender === "Female" ? "2" : "1",
    city: details.city || "",
    country: details.country || "",
  };
}

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
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
      const data = unwrapResult(await adminApi.getAllSponsors(), "تعذر تحميل قائمة الكفلاء.");
      setSponsors(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل قائمة الكفلاء."));
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const fetchDetails = useCallback(async (sponsorId) => (
    unwrapResult(await adminApi.getSponsorDetails(sponsorId), "تعذر تحميل تفاصيل الكفيل.")
  ), []);

  const openSponsor = async (sponsorId, mode = "details") => {
    if (busy) return;
    setBusy(`details-${sponsorId}`);
    setActionError("");
    setSuccessMessage("");
    try {
      const details = await fetchDetails(sponsorId);
      setSelected(details);
      setEditForm(sponsorForm(details));
      setDialogMode(mode);
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحميل تفاصيل الكفيل."));
    } finally {
      setBusy("");
    }
  };

  const openDelete = async (sponsorId) => {
    if (busy) return;
    setBusy(`delete-details-${sponsorId}`);
    setActionError("");
    setSuccessMessage("");
    try {
      const details = await fetchDetails(sponsorId);
      setConfirmation({ type: "delete", sponsor: details });
      setReason("");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر التحقق من إمكانية حذف الكفيل."));
    } finally {
      setBusy("");
    }
  };

  const refreshDetailsIfOpen = async (sponsorId) => {
    if (selected?.sponsorId !== sponsorId) return;
    const details = await fetchDetails(sponsorId);
    setSelected(details);
    setEditForm(sponsorForm(details));
  };

  const submitEdit = async (event) => {
    event.preventDefault();
    if (busy || !selected || !editForm) return;
    setBusy("edit");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.updateSponsor(selected.sponsorId, {
        ...editForm,
        gender: Number(editForm.gender),
      }), "تعذر تحديث بيانات الكفيل.");
      await load({ silent: true });
      const details = await fetchDetails(selected.sponsorId);
      setSelected(details);
      setEditForm(sponsorForm(details));
      setDialogMode("details");
      setSuccessMessage("تم تحديث بيانات الكفيل بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحديث بيانات الكفيل."));
    } finally {
      setBusy("");
    }
  };

  const confirmStatus = async () => {
    if (busy || confirmation?.type !== "status") return;
    const { sponsor, isActive } = confirmation;
    setBusy("status");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.updateSponsorStatus(sponsor.sponsorId, isActive, reason), "تعذر تحديث حالة حساب الكفيل.");
      setConfirmation(null);
      setReason("");
      await load({ silent: true });
      await refreshDetailsIfOpen(sponsor.sponsorId);
      setSuccessMessage(isActive ? "تمت إعادة تفعيل حساب الكفيل بنجاح." : "تم تعليق حساب الكفيل بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر تحديث حالة حساب الكفيل."));
    } finally {
      setBusy("");
    }
  };

  const confirmDelete = async () => {
    if (busy || confirmation?.type !== "delete" || !confirmation.sponsor.canDelete) return;
    const sponsorId = confirmation.sponsor.sponsorId;
    setBusy("delete");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.deleteSponsor(sponsorId), "تعذر حذف حساب الكفيل.");
      setConfirmation(null);
      if (selected?.sponsorId === sponsorId) {
        setSelected(null);
        setDialogMode("");
      }
      await load({ silent: true });
      setSuccessMessage("تم حذف حساب الكفيل نهائيًا بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError, "تعذر حذف حساب الكفيل."));
    } finally {
      setBusy("");
    }
  };

  const filteredSponsors = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return sponsors.filter((sponsor) => {
      const matchesAccount = accountFilter === "all" || sponsor.accountStatus === accountFilter;
      const matchesSearch = !query || [sponsor.fullName, sponsor.email, sponsor.phoneNumber]
        .some((value) => String(value || "").toLowerCase().includes(query));
      return matchesAccount && matchesSearch;
    });
  }, [accountFilter, searchTerm, sponsors]);

  const showStatusConfirmation = (sponsor, isActive) => {
    setConfirmation({ type: "status", sponsor, isActive });
    setReason("");
    setActionError("");
    setSuccessMessage("");
  };

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (sponsors.length === 0) content = <EmptyState icon={MdOutlineVolunteerActivism} title="لا يوجد كفلاء" description="لم يُرجع الخادم أي حسابات كفلاء حتى الآن." />;
  else if (filteredSponsors.length === 0) content = <EmptyState icon={FiSearch} title="لا توجد نتائج مطابقة" description="جرّب تعديل البحث أو حالة الحساب." />;
  else content = (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[960px] text-right text-xs">
      <thead className="bg-[#F5F7FA] text-[11px] text-[#374151]"><tr><th className="whitespace-nowrap px-3 py-3 font-extrabold">الاسم</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">البريد الإلكتروني</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الهاتف</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الموقع</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الحساب</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">عدد الكفالات</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الإجراءات</th></tr></thead>
      <tbody className="divide-y divide-gray-100">{filteredSponsors.map((sponsor) => <tr key={sponsor.sponsorId} className="hover:bg-gray-50/70"><td title={sponsor.fullName || undefined} className="max-w-[170px] truncate px-3 py-3 font-bold text-[#003469]">{sponsor.fullName || "—"}</td><td title={sponsor.email || undefined} className="max-w-[210px] truncate px-3 py-3 text-[11px] text-gray-600">{sponsor.email || "—"}</td><td dir="ltr" className="whitespace-nowrap px-3 py-3 text-right text-[11px] text-gray-600">{sponsor.phoneNumber || "—"}</td><td title={[sponsor.city, sponsor.country].filter(Boolean).join("، ") || undefined} className="max-w-[140px] truncate px-3 py-3">{[sponsor.city, sponsor.country].filter(Boolean).join("، ") || "—"}</td><td className="whitespace-nowrap px-3 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${accountStatusClasses(sponsor.accountStatus)}`}>{accountStatusLabel(sponsor.accountStatus)}</span></td><td className="px-3 py-3 font-extrabold text-[#0D4B8E]">{sponsor.totalSponsorships ?? 0}</td><td className="px-3 py-3"><div className="flex items-center gap-1 whitespace-nowrap"><AdminTableIconButton label="عرض التفاصيل" tone="view" disabled={Boolean(busy)} onClick={() => openSponsor(sponsor.sponsorId)}><FiEye aria-hidden="true" /></AdminTableIconButton><AdminTableIconButton label="تعديل" disabled={Boolean(busy)} onClick={() => openSponsor(sponsor.sponsorId, "edit")}><FiEdit2 aria-hidden="true" /></AdminTableIconButton>{sponsor.canSuspend && <AdminTableIconButton label="تعليق الحساب" tone="suspend" disabled={Boolean(busy)} onClick={() => showStatusConfirmation(sponsor, false)}><MdPauseCircleOutline aria-hidden="true" /></AdminTableIconButton>}{sponsor.canReactivate && <AdminTableIconButton label="إعادة تفعيل الحساب" tone="reactivate" disabled={Boolean(busy)} onClick={() => showStatusConfirmation(sponsor, true)}><MdPlayCircleOutline aria-hidden="true" /></AdminTableIconButton>}<AdminTableIconButton label="حذف نهائي" tone="delete" disabled={Boolean(busy)} onClick={() => openDelete(sponsor.sponsorId)}><FiTrash2 aria-hidden="true" /></AdminTableIconButton></div></td></tr>)}</tbody>
    </table></div></div>
  );

  return (
    <AdminLayout title="الكفلاء"><div className="mx-auto w-full max-w-7xl">
      <div className="mb-6"><h1 className="text-2xl font-extrabold text-[#003469]">إدارة الكفلاء</h1><p className="mt-1 text-sm text-gray-500">عرض بيانات الكفلاء وتعديلها وإدارة حالة الحساب بأمان.</p></div>
      <div className="mb-5 max-w-sm"><MiniStatCard label="إجمالي الكفلاء" value={sponsors.length} icon={MdOutlineVolunteerActivism} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
      <div className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-[1fr_220px]"><label className="relative"><span className="sr-only">البحث في الكفلاء</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو البريد أو الهاتف" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label><select value={accountFilter} onChange={(event) => setAccountFilter(event.target.value)} aria-label="تصفية حسب حالة الحساب" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{ACCOUNT_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select></div>
      {actionError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}{successMessage && <p role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{successMessage}</p>}<p className="mb-3 text-sm font-bold text-gray-600">النتائج: {filteredSponsors.length}</p>{content}
    </div>

    {selected && dialogMode === "details" && <AdminDialog title="تفاصيل الكفيل" size="max-w-5xl" onClose={() => { setSelected(null); setDialogMode(""); }} footer={<><button type="button" onClick={() => setDialogMode("edit")} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white">تعديل</button>{selected.canSuspend && <button type="button" onClick={() => showStatusConfirmation(selected, false)} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white">تعليق الحساب</button>}{selected.canReactivate && <button type="button" onClick={() => showStatusConfirmation(selected, true)} className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white">إعادة تفعيل الحساب</button>}<button type="button" onClick={() => setConfirmation({ type: "delete", sponsor: selected })} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-700">حذف نهائي</button></>}>
      <div className="space-y-5">
        <AdminDetailsHero icon={MdOutlineVolunteerActivism} eyebrow="ملف الكفيل" title={selected.fullName} subtitle={selected.email} badges={[{ label: "الحساب", value: accountStatusLabel(selected.accountStatus) }, { label: "الموقع", value: [selected.city, selected.country].filter(Boolean).join("، ") }]} />
        <div className="grid grid-cols-3 gap-3"><AdminDetailStat label="الكفالات" value={selected.sponsorshipCount} /><AdminDetailStat label="المدفوعات" value={selected.paymentCount} /><AdminDetailStat label="الشهادات" value={selected.certificateCount} /></div>
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminDetailsSection title="البيانات الشخصية" icon={FiUser}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="رقم الهاتف" value={selected.phoneNumber} dir="ltr" /><AdminDetailItem label="تاريخ الميلاد" value={toDateInputValue(selected.dateOfBirth)} /><AdminDetailItem label="الجنس" value={localizeStatus(selected.gender)} /><AdminDetailItem label="صورة الملف الشخصي" value={selected.hasProfileImage ? "متوفرة" : "غير متوفرة"} /><AdminDetailItem label="تاريخ الانضمام" value={formatArabicDateTime(selected.joinedAt)} wide /></dl></AdminDetailsSection>
          <AdminDetailsSection title="الموقع وحالة الحساب" icon={FiMapPin}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="المدينة" value={selected.city} /><AdminDetailItem label="الدولة" value={selected.country} /><AdminDetailItem label="حالة الحساب" value={accountStatusLabel(selected.accountStatus)} /><AdminDetailItem label="إمكانية الحذف" value={selected.canDelete ? "متاحة" : "غير متاحة لوجود بيانات مرتبطة"} /><AdminDetailItem label="إمكانية التعليق" value={selected.canSuspend ? "متاحة" : "غير متاحة"} /><AdminDetailItem label="إمكانية إعادة التفعيل" value={selected.canReactivate ? "متاحة" : "غير متاحة"} /></dl></AdminDetailsSection>
        </div>
        <AdminDetailsSection title="المعرّفات التقنية" icon={FiInfo}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="معرّف الكفيل" value={selected.sponsorId} dir="ltr" /><AdminDetailItem label="معرّف المستخدم" value={selected.userId} dir="ltr" /></dl></AdminDetailsSection>
      </div>
    </AdminDialog>}

    {selected && dialogMode === "edit" && editForm && <AdminDialog title="تعديل بيانات الكفيل" onClose={() => setDialogMode("details")} closeDisabled={busy === "edit"} footer={<><button type="button" onClick={() => setDialogMode("details")} disabled={busy === "edit"} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold">إلغاء</button><button type="submit" form="sponsor-edit-form" disabled={busy === "edit"} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy === "edit" ? "جارٍ الحفظ..." : "حفظ التعديلات"}</button></>}>
      <form id="sponsor-edit-form" onSubmit={submitEdit} className="grid gap-4 sm:grid-cols-2">{actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700 sm:col-span-2">{actionError}</p>}{[["firstName", "الاسم الأول"], ["fatherName", "اسم الأب"], ["grandfatherName", "اسم الجد"], ["familyName", "اسم العائلة"], ["phoneNumber", "رقم الهاتف"], ["city", "المدينة"], ["country", "الدولة"]].map(([name, label]) => <label key={name} className="text-sm font-bold text-gray-700">{label}<input name={name} value={editForm[name]} onChange={(event) => setEditForm({ ...editForm, [name]: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#0D4B8E]" /></label>)}<label className="text-sm font-bold text-gray-700">تاريخ الميلاد<input type="date" value={editForm.dateOfBirth} onChange={(event) => setEditForm({ ...editForm, dateOfBirth: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><label className="text-sm font-bold text-gray-700">الجنس<select value={editForm.gender} onChange={(event) => setEditForm({ ...editForm, gender: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5"><option value="1">ذكر</option><option value="2">أنثى</option></select></label></form>
    </AdminDialog>}

    {confirmation?.type === "status" && <AdminConfirmationDialog title={confirmation.isActive ? "إعادة تفعيل حساب الكفيل" : "تعليق حساب الكفيل"} message={confirmation.isActive ? "هل تريد إعادة تفعيل هذا الحساب؟" : "هل أنت متأكد من تعليق هذا الحساب؟"} confirmLabel={confirmation.isActive ? "إعادة التفعيل" : "تأكيد التعليق"} onConfirm={confirmStatus} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "status"} reason={reason} onReasonChange={setReason} error={actionError} />}
    {confirmation?.type === "delete" && <AdminConfirmationDialog title="حذف حساب الكفيل نهائيًا" message="هذا الإجراء نهائي ولا يمكن التراجع عنه." warning={confirmation.sponsor.canDelete ? "سيُرسل طلب الحذف إلى الخادم بعد التأكيد." : "لا يمكن حذف هذا الكفيل حاليًا لوجود كفالات أو مدفوعات أو سجل مرتبط. يمكنك تعليق الحساب بدلًا من ذلك."} confirmLabel="حذف نهائي" danger onConfirm={confirmDelete} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "delete"} confirmDisabled={!confirmation.sponsor.canDelete} error={actionError} />}
    </AdminLayout>
  );
}
