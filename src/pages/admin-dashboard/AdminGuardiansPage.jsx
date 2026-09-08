import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiEdit2,
  FiEye,
  FiFileText,
  FiMapPin,
  FiSearch,
  FiTrash2,
  FiUser,
  FiXCircle,
} from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import {
  MdDescription,
  MdOutlineFamilyRestroom,
  MdPauseCircleOutline,
  MdPlayCircleOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";

import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatArabicDateTime } from "../../utils/date";
import {
  localizeStatus,
  localizeVerificationStatus,
  verificationStatusMeta,
} from "../../utils/localization";

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

const VERIFICATION_FILTERS = [
  { value: "all", label: "كل حالات التحقق" },
  ...["Pending", "Approved", "Rejected", "NeedsUpdate", "Suspended"].map((value) => ({
    value,
    label: verificationStatusMeta(value).label,
  })),
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

function VerificationStatusBadge({ status }) {
  const { label, className } = verificationStatusMeta(status);

  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-[10px] font-bold ${className}`}>
      {label}
    </span>
  );
}

function localizeDocumentType(type) {
  switch (type) {
    case "NationalId":
      return "الهوية الشخصية";
    case "CustodyDocument":
      return "حجة الحضانة";
    case "SelfieVideoWithId":
      return "فيديو سيلفي مع الهوية";
    case "GuardianshipProof":
      return "إثبات الوصاية";
    default:
      return type || "وثيقة";
  }
}

function localizeDocumentStatus(status) {
  switch (status) {
    case "Approved":
      return "معتمدة";
    case "Pending":
      return "قيد المراجعة";
    case "Rejected":
      return "مرفوضة";
    case "NeedsUpdate":
      return "تحتاج تحديث";
    default:
      return status || "—";
  }
}

function documentStatusBadgeStyle(status) {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Rejected":
      return "bg-red-50 text-red-700 border-red-200";
    case "NeedsUpdate":
      return "bg-orange-50 text-orange-700 border-orange-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
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

  // الوثائق للمودال
  const [guardianDocuments, setGuardianDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [docActionModal, setDocActionModal] = useState(null);
  const [docReason, setDocReason] = useState("");

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

  const fetchGuardianDocs = useCallback(async (guardianId) => {
    setLoadingDocs(true);
    try {
      const response = await adminApi.getAllGuardianDocuments();
      const docs = Array.isArray(response) ? response : (response?.data || []);
      const myDocs = docs.filter(
        (doc) => String(doc.guardianId || doc.guardian_id) === String(guardianId)
      );
      setGuardianDocuments(myDocs);
    } catch (err) {
      console.error("Error fetching guardian documents:", err);
      setGuardianDocuments([]);
    } finally {
      setLoadingDocs(false);
    }
  }, []);

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
      await fetchGuardianDocs(guardianId);
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

  // إجراءات التوثيق والوثائق
  const handleViewDocument = async (doc) => {
    const docId = doc.id || doc.documentId;
    if (!docId) return;
    setBusy(`doc-view-${docId}`);
    setActionError("");
    try {
      const blob = await adminApi.getDocumentFile(docId);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (err) {
      setActionError(apiErrorMessage(err, "تعذر فتح ملف الوثيقة."));
    } finally {
      setBusy("");
    }
  };

  const handleApproveDocument = async (doc) => {
    const docId = doc.id || doc.documentId;
    if (!docId) return;
    setBusy(`doc-approve-${docId}`);
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.approveDocument(docId), "تعذر اعتماد الوثيقة.");
      setSuccessMessage("تم اعتماد الوثيقة بنجاح.");
      if (selected?.guardianId) {
        await fetchGuardianDocs(selected.guardianId);
        await refreshDetailsIfOpen(selected.guardianId);
      }
    } catch (err) {
      setActionError(apiErrorMessage(err, "تعذر اعتماد الوثيقة."));
    } finally {
      setBusy("");
    }
  };

  const handleRequestDocumentUpdate = async () => {
    if (!docActionModal?.doc) return;
    const docId = docActionModal.doc.id || docActionModal.doc.documentId;
    if (!docId) return;
    setBusy(`doc-update-${docId}`);
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(
        await adminApi.requestDocumentUpdate(docId, docReason),
        "تعذر طلب تعديل الوثيقة."
      );
      setSuccessMessage("تم طلب تعديل الوثيقة بنجاح.");
      setDocActionModal(null);
      setDocReason("");
      if (selected?.guardianId) {
        await fetchGuardianDocs(selected.guardianId);
        await refreshDetailsIfOpen(selected.guardianId);
      }
    } catch (err) {
      setActionError(apiErrorMessage(err, "تعذر طلب تعديل الوثيقة."));
    } finally {
      setBusy("");
    }
  };

  const confirmGuardianApprove = async () => {
    if (!selected) return;
    setBusy("guardian-approve");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.approveGuardian(selected.guardianId), "تعذر اعتماد توثيق الوصي.");
      setSuccessMessage("تم اعتماد توثيق الوصي بنجاح.");
      await load({ silent: true });
      await refreshDetailsIfOpen(selected.guardianId);
    } catch (err) {
      setActionError(apiErrorMessage(err, "تعذر اعتماد توثيق الوصي."));
    } finally {
      setBusy("");
    }
  };

  const confirmGuardianReject = async () => {
    if (!selected || confirmation?.type !== "rejectGuardian") return;
    setBusy("guardian-reject");
    setActionError("");
    setSuccessMessage("");
    try {
      unwrapResult(await adminApi.rejectGuardian(selected.guardianId, reason), "تعذر رفض توثيق الوصي.");
      setConfirmation(null);
      setReason("");
      setSuccessMessage("تم رفض توثيق الوصي.");
      await load({ silent: true });
      await refreshDetailsIfOpen(selected.guardianId);
    } catch (err) {
      setActionError(apiErrorMessage(err, "تعذر رفض توثيق الوصي."));
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

  const approvedDocsCount = useMemo(() => (
    guardianDocuments.filter((doc) => doc.status === "Approved").length
  ), [guardianDocuments]);

  const pendingDocsCount = useMemo(() => (
    guardianDocuments.filter((doc) => doc.status === "Pending").length
  ), [guardianDocuments]);

  const rejectedDocsCount = useMemo(() => (
    guardianDocuments.filter((doc) => doc.status === "Rejected" || doc.status === "NeedsUpdate").length
  ), [guardianDocuments]);

  // شرط تفعيل زر اعتماد توثيق الوصي: أن يتوفر وثائق وأن تكون جميع الوثائق المرفوعة حائزة على حالة Approved
  const canApproveGuardian = useMemo(() => (
    guardianDocuments.length > 0 &&
    guardianDocuments.every((doc) => doc.status === "Approved")
  ), [guardianDocuments]);

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
      <div className="overflow-x-auto"><table className="w-full min-w-[1080px] text-right text-xs">
        <thead className="bg-[#F5F7FA] text-[11px] text-[#374151]"><tr><th className="whitespace-nowrap px-3 py-3 font-extrabold">الاسم</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">البريد الإلكتروني</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الهاتف</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الموقع</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">حالة التحقق</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">حالة الحساب</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">العائلة</th><th className="whitespace-nowrap px-3 py-3 font-extrabold">الإجراءات</th></tr></thead>
        <tbody className="divide-y divide-gray-100">{filteredGuardians.map((guardian) => (
          <tr key={guardian.guardianId} className="hover:bg-gray-50/70">
            <td title={guardian.fullName || undefined} className="max-w-[170px] truncate px-3 py-3 font-bold text-[#003469]">{guardian.fullName || "—"}</td><td title={guardian.email || undefined} className="max-w-[210px] truncate px-3 py-3 text-[11px] text-gray-600">{guardian.email || "—"}</td><td dir="ltr" className="whitespace-nowrap px-3 py-3 text-right text-[11px] text-gray-600">{guardian.phoneNumber || "—"}</td><td title={[guardian.city, guardian.country].filter(Boolean).join("، ") || undefined} className="max-w-[140px] truncate px-3 py-3">{[guardian.city, guardian.country].filter(Boolean).join("، ") || "—"}</td><td className="whitespace-nowrap px-3 py-3"><VerificationStatusBadge status={guardian.verificationStatus} /></td><td className="whitespace-nowrap px-3 py-3"><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${accountStatusClasses(guardian.accountStatus)}`}>{accountStatusLabel(guardian.accountStatus)}</span></td><td className="max-w-[130px] truncate px-3 py-3">{guardian.hasFamily ? localizeStatus(guardian.familyStatus) : "لا توجد عائلة"}</td>
            <td className="px-3 py-3">
              <div className="flex items-center gap-1 whitespace-nowrap">
                <AdminTableIconButton label="عرض التفاصيل" tone="view" disabled={Boolean(busy)} onClick={() => openGuardian(guardian.guardianId)}><FiEye aria-hidden="true" /></AdminTableIconButton>
                <AdminTableIconButton label="تعديل" disabled={Boolean(busy)} onClick={() => openGuardian(guardian.guardianId, "edit")}><FiEdit2 aria-hidden="true" /></AdminTableIconButton>
                {guardian.canSuspend && (
                  <AdminTableIconButton
                    label="تعليق الحساب"
                    tone="suspend"
                    disabled={Boolean(busy) || guardian.verificationStatus !== "Approved"}
                    onClick={() => showStatusConfirmation(guardian, false)}
                  >
                    <MdPauseCircleOutline aria-hidden="true" />
                  </AdminTableIconButton>
                )}
                {guardian.canReactivate && (
                  <AdminTableIconButton label="إعادة تفعيل الحساب" tone="reactivate" disabled={Boolean(busy)} onClick={() => showStatusConfirmation(guardian, true)}><MdPlayCircleOutline aria-hidden="true" /></AdminTableIconButton>
                )}
                <AdminTableIconButton label="حذف نهائي" tone="delete" disabled={Boolean(busy)} onClick={() => openDelete(guardian.guardianId)}><FiTrash2 aria-hidden="true" /></AdminTableIconButton>
              </div>
            </td>
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
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-extrabold text-[#003469]">إدارة الأوصياء</h1><p className="mt-1 text-sm text-gray-500">عرض بيانات الأوصياء وتعديلها وإدارة حالة الحساب بأمان.</p></div><Link to="/admin-dashboard/guardian-document-reviews" className="inline-flex items-center gap-2 rounded-lg bg-[#0D4B8E] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#003469]"><MdDescription />وثائق الأوصياء</Link></div>
      <div className="mb-5 max-w-sm"><MiniStatCard label="إجمالي الأوصياء" value={guardians.length} icon={HiOutlineIdentification} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
      <div className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 lg:grid-cols-[1fr_220px_220px]"><label className="relative"><span className="sr-only">البحث في الأوصياء</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو البريد أو الهاتف" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label><select value={verificationFilter} onChange={(event) => setVerificationFilter(event.target.value)} aria-label="تصفية حسب حالة التحقق" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{VERIFICATION_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select><select value={accountFilter} onChange={(event) => setAccountFilter(event.target.value)} aria-label="تصفية حسب حالة الحساب" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{ACCOUNT_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select></div>
      {actionError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}
      {successMessage && <p role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{successMessage}</p>}
      <p className="mb-3 text-sm font-bold text-gray-600">النتائج: {filteredGuardians.length}</p>{content}
    </div>

    {selected && dialogMode === "details" && <AdminDialog title="تفاصيل الوصي" size="max-w-5xl" onClose={() => { setSelected(null); setDialogMode(""); }} footer={<>
      {(selected.verificationStatus === "Pending" || selected.verificationStatus === "ReadyForApproval" || selected.verificationStatus === "NeedsUpdate") && (
        <>
          <button
            type="button"
            onClick={confirmGuardianApprove}
            disabled={!canApproveGuardian || Boolean(busy)}
            title={!canApproveGuardian ? "يجب اعتماد جميع الوثائق أولاً لتفعيل زر اعتماد الوصي" : undefined}
            className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            اعتماد توثيق الوصي
          </button>
          <button type="button" onClick={() => setConfirmation({ type: "rejectGuardian" })} disabled={Boolean(busy)} className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50">رفض توثيق الوصي</button>
        </>
      )}
      <button type="button" onClick={() => setDialogMode("edit")} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#003469]">تعديل</button>
      {selected.canSuspend && (
        <button
          type="button"
          onClick={() => showStatusConfirmation(selected, false)}
          disabled={Boolean(busy) || selected.verificationStatus !== "Approved"}
          title={selected.verificationStatus !== "Approved" ? "يمكن تعليق الحساب فقط بعد اعتماده" : undefined}
          className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          تعليق الحساب
        </button>
      )}
      {selected.canReactivate && <button type="button" onClick={() => showStatusConfirmation(selected, true)} className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700">إعادة تفعيل الحساب</button>}
      <button type="button" onClick={() => setConfirmation({ type: "delete", guardian: selected })} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-700 hover:bg-red-50">حذف نهائي</button>
    </>}>
      <div className="space-y-5">
        <AdminDetailsHero icon={HiOutlineIdentification} eyebrow="ملف الوصي" title={selected.fullName} subtitle={selected.email} badges={[{ label: "التحقق", value: localizeVerificationStatus(selected.verificationStatus) }, { label: "الحساب", value: accountStatusLabel(selected.accountStatus) }]} />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><AdminDetailStat label="العائلات" value={selected.familyCount} /><AdminDetailStat label="الأيتام" value={selected.orphanCount} /><AdminDetailStat label="الكفالات" value={selected.sponsorshipCount} /><AdminDetailStat label="الدفعات" value={selected.payoutCount} /></div>
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminDetailsSection title="البيانات الشخصية" icon={FiUser}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="رقم الهوية" value={selected.nationalId} dir="ltr" /><AdminDetailItem label="رقم الهاتف" value={selected.phoneNumber} dir="ltr" /><AdminDetailItem label="تاريخ الميلاد" value={toDateInputValue(selected.dateOfBirth)} /><AdminDetailItem label="الجنس" value={localizeStatus(selected.gender)} /><AdminDetailItem label="صورة الملف الشخصي" value={selected.hasProfileImage ? "متوفرة" : "غير متوفرة"} /><AdminDetailItem label="تاريخ الانضمام" value={formatArabicDateTime(selected.joinedAt)} /></dl></AdminDetailsSection>
          <AdminDetailsSection title="السكن والعمل" icon={FiMapPin}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="المدينة" value={selected.city} /><AdminDetailItem label="الدولة" value={selected.country} /><AdminDetailItem label="العنوان" value={selected.address} wide /><AdminDetailItem label="المهنة" value={selected.occupation} /><AdminDetailItem label="الدخل الشهري" value={selected.monthlyIncome} /></dl></AdminDetailsSection>
        </div>
        <AdminDetailsSection title="بيانات العائلة والصلاحيات" icon={MdOutlineFamilyRestroom}><dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><AdminDetailItem label="عدد أفراد العائلة" value={selected.familyMembersCount} /><AdminDetailItem label="إمكانية التعليق" value={selected.canSuspend ? "متاحة" : "غير متاحة"} /><AdminDetailItem label="إمكانية إعادة التفعيل" value={selected.canReactivate ? "متاحة" : "غير متاحة"} /><AdminDetailItem label="إمكانية الحذف" value={selected.canDelete ? "متاحة" : "غير متاحة لوجود بيانات مرتبطة"} /></dl></AdminDetailsSection>

        {/* قسم الوثائق المرفوعة في التفاصيل */}
        <AdminDetailsSection title="الوثائق المرفوعة وحالة التدقيق" icon={FiFileText}>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-emerald-50 p-3 text-center text-emerald-800">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                <FiCheckCircle />
                وثائق مقبولة
              </div>
              <p className="mt-1 text-xl font-extrabold">{approvedDocsCount}</p>
            </div>
            <div className="rounded-xl bg-amber-50 p-3 text-center text-amber-800">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                <FiClock />
                قيد المراجعة
              </div>
              <p className="mt-1 text-xl font-extrabold">{pendingDocsCount}</p>
            </div>
            <div className="rounded-xl bg-red-50 p-3 text-center text-red-800">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                <FiXCircle />
                تتطلب تعديل / مرفوضة
              </div>
              <p className="mt-1 text-xl font-extrabold">{rejectedDocsCount}</p>
            </div>
          </div>

          {loadingDocs ? (
            <div className="py-6 text-center text-sm font-bold text-gray-500">
              جارٍ تحميل الوثائق...
            </div>
          ) : guardianDocuments.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-400">
              لا توجد وثائق مرفوعة لهذا الوصي حتى الآن.
            </div>
          ) : (
            <div className="space-y-3">
              {guardianDocuments.map((doc) => {
                const docId = doc.id || doc.documentId;
                const isApproved = doc.status === "Approved";
                return (
                  <div
                    key={docId}
                    className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FA] text-[#003469]">
                        <FiFileText size={20} />
                      </div>
                      <div>
                        <p className="font-extrabold text-[#003469]">
                          {localizeDocumentType(doc.documentType)}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <span
                            className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${documentStatusBadgeStyle(
                              doc.status
                            )}`}
                          >
                            {localizeDocumentStatus(doc.status)}
                          </span>
                          {doc.rejectionReason && (
                            <span className="text-xs text-red-600">
                              السبب: {doc.rejectionReason}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewDocument(doc)}
                        disabled={Boolean(busy)}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#003469] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#0D4B8E] disabled:opacity-50"
                      >
                        <FiEye />
                        عرض الوثيقة
                      </button>

                      {!isApproved && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApproveDocument(doc)}
                            disabled={Boolean(busy)}
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                          >
                            <FiCheckCircle />
                            اعتماد
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setDocActionModal({ doc, action: "needsUpdate" });
                              setDocReason("");
                            }}
                            disabled={Boolean(busy)}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                          >
                            <FiXCircle />
                            طلب تعديل / رفض
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </AdminDetailsSection>
      </div>
    </AdminDialog>}

    {selected && dialogMode === "edit" && editForm && <AdminDialog title="تعديل بيانات الوصي" onClose={() => setDialogMode("details")} closeDisabled={busy === "edit"} footer={<><button type="button" onClick={() => setDialogMode("details")} disabled={busy === "edit"} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold">إلغاء</button><button type="submit" form="guardian-edit-form" disabled={busy === "edit"} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">{busy === "edit" ? "جارٍ الحفظ..." : "حفظ التعديلات"}</button></>}>
      <form id="guardian-edit-form" onSubmit={submitEdit} className="grid gap-4 sm:grid-cols-2">{actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700 sm:col-span-2">{actionError}</p>}{[["firstName", "الاسم الأول"], ["fatherName", "اسم الأب"], ["grandfatherName", "اسم الجد"], ["familyName", "اسم العائلة"], ["phoneNumber", "رقم الهاتف"], ["city", "المدينة"], ["country", "الدولة"]].map(([name, label]) => <label key={name} className="text-sm font-bold text-gray-700">{label}<input name={name} value={editForm[name]} onChange={(event) => setEditForm({ ...editForm, [name]: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#0D4B8E]" /></label>)}<label className="text-sm font-bold text-gray-700">تاريخ الميلاد<input type="date" value={editForm.dateOfBirth} onChange={(event) => setEditForm({ ...editForm, dateOfBirth: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><label className="text-sm font-bold text-gray-700">الجنس<select value={editForm.gender} onChange={(event) => setEditForm({ ...editForm, gender: event.target.value })} required className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5"><option value="1">ذكر</option><option value="2">أنثى</option></select></label><label className="text-sm font-bold text-gray-700 sm:col-span-2">العنوان<input value={editForm.address} onChange={(event) => setEditForm({ ...editForm, address: event.target.value })} maxLength={300} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label><label className="text-sm font-bold text-gray-700 sm:col-span-2">المهنة<input value={editForm.occupation} onChange={(event) => setEditForm({ ...editForm, occupation: event.target.value })} maxLength={100} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label></form>
    </AdminDialog>}

    {docActionModal && (
      <AdminConfirmationDialog
        title="طلب تعديل الوثيقة"
        message={`هل تريد طلب تعديل وثيقة (${localizeDocumentType(docActionModal.doc.documentType)})؟`}
        warning="سيتم إرسال سبب التعديل للوصي لإعادة رفع الوثيقة بالشكل الصحيح."
        confirmLabel="إرسال طلب التعديل"
        danger
        onConfirm={handleRequestDocumentUpdate}
        onCancel={() => {
          if (!busy) {
            setDocActionModal(null);
            setDocReason("");
          }
        }}
        loading={Boolean(busy.startsWith("doc-update-"))}
        reason={docReason}
        onReasonChange={setDocReason}
        reasonLabel="سبب طلب التعديل أو الرفض"
        error={actionError}
      />
    )}

    {confirmation?.type === "rejectGuardian" && (
      <AdminConfirmationDialog
        title="رفض توثيق الوصي"
        message="هل أنت متأكد من رفض طلب توثيق هذا الوصي؟"
        warning="سيتم تغيير حالة التحقق إلى (مرفوض)."
        confirmLabel="تأكيد الرفض"
        danger
        onConfirm={confirmGuardianReject}
        onCancel={() => {
          if (!busy) setConfirmation(null);
        }}
        loading={busy === "guardian-reject"}
        reason={reason}
        onReasonChange={setReason}
        reasonLabel="سبب الرفض (مطلوب)"
        confirmDisabled={!reason.trim()}
        error={actionError}
      />
    )}

    {confirmation?.type === "status" && <AdminConfirmationDialog title={confirmation.isActive ? "إعادة تفعيل حساب الوصي" : "تعليق حساب الوصي"} message={confirmation.isActive ? "هل تريد إعادة تفعيل هذا الحساب؟" : "هل أنت متأكد من تعليق هذا الحساب؟"} confirmLabel={confirmation.isActive ? "إعادة التفعيل" : "تأكيد التعليق"} onConfirm={confirmStatus} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "status"} reason={reason} onReasonChange={setReason} error={actionError} />}
    {confirmation?.type === "delete" && <AdminConfirmationDialog title="حذف حساب الوصي نهائيًا" message="هذا الإجراء نهائي ولا يمكن التراجع عنه." warning={confirmation.guardian.canDelete ? "سيُرسل طلب الحذف إلى الخادم بعد التأكيد." : "لا يمكن حذف هذا الوصي حاليًا لوجود بيانات مرتبطة به. يمكنك تعليق الحساب بدلًا من ذلك."} confirmLabel="حذف نهائي" danger onConfirm={confirmDelete} onCancel={() => { if (!busy) setConfirmation(null); }} loading={busy === "delete"} confirmDisabled={!confirmation.guardian.canDelete} error={actionError} />}
    </AdminLayout>
  );
}
