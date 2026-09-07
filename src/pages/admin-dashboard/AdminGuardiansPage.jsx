import { useCallback, useEffect, useMemo, useState } from "react";
import { FiEdit2, FiEye, FiInfo, FiMapPin, FiSearch, FiTrash2, FiUser } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdDescription, MdOutlineFamilyRestroom, MdPauseCircleOutline, MdPlayCircleOutline } from "react-icons/md";
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
  EmptyState,
  ErrorState,
  LoadingState,
  MiniStatCard,
} from "./Adminstates";
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiFileText,
  FiEye,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiTrash2
} from "react-icons/fi";  

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
  const [selectedGuardian, setSelectedGuardian] = useState(null);
const [guardianDocuments, setGuardianDocuments] = useState([]);
const [detailsLoading, setDetailsLoading] = useState(false);
const approvedDocs = guardianDocuments.filter(
  (doc) => doc.status === "Approved"
).length;

const pendingDocs = guardianDocuments.filter(
  (doc) => doc.status === "Pending"
).length;

const rejectedDocs = guardianDocuments.filter(
  (doc) => doc.status === "Rejected"
).length;
const localizeDocumentType = (type) => {
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
      return type;
  }
};
const localizeDocumentStatus = (status) => {
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
      return status;
  }
};


  const load = useCallback(async () => {
    setLoading(true);
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
 const openGuardianDetails = async (guardian) => {
  setSelectedGuardian(guardian);
  setDetailsLoading(true);

  try {

    const response =
      await adminApi.getAllGuardianDocuments();

    const docs =
      response.data || response;


    const myDocs = docs.filter(
      (doc) =>
        doc.guardianId === guardian.guardianId
    );


    setGuardianDocuments(myDocs);


  } catch (error) {

    console.error(
      "Documents Error:",
      error
    );

    setGuardianDocuments([]);

  } finally {

    setDetailsLoading(false);

  }
};

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
   * Content
   * ---------------------------------------------------------
   */

  let content;

  if (loading) {
    content = <LoadingState />;
  } else if (error) {
    content = (
      <ErrorState
        onRetry={load}
        description={error}
      />
    );
  } else if (guardians.length === 0) {
    content = (
      <EmptyState
        icon={HiOutlineIdentification}
        title="لا يوجد أوصياء"
        description="لم يُرجع الخادم أي حسابات أوصياء حتى الآن."
      />
    );
  } else if (filteredGuardians.length === 0) {
    content = (
      <EmptyState
        icon={FiSearch}
        title="لا توجد نتائج مطابقة"
        description="جرّب تعديل عبارة البحث أو حالة التحقق."
      />
    );
  } else {
    content = (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* =====================================================
            TABLE HEADER
        ====================================================== */}

        <div className="flex flex-col gap-3 border-b border-gray-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-base font-extrabold text-[#003469]">
              قائمة الأوصياء
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              بيانات الحسابات وحالة التحقق والعائلة المرتبطة
            </p>
          </div>

          <div className="inline-flex w-fit items-center rounded-full bg-[#E8F1FA] px-3 py-1.5 text-xs font-bold text-[#0D4B8E]">
            {filteredGuardians.length} وصي
          </div>

        </div>

        {/* =====================================================
            DESKTOP TABLE
        ====================================================== */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[1150px] border-collapse text-right">

            <thead>
              <tr className="border-b border-gray-100 bg-[#F8FAFC]">

                <th className="w-[190px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  الوصي
                </th>

                <th className="w-[235px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  البريد الإلكتروني
                </th>

                <th className="w-[155px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  رقم الهاتف
                </th>

                <th className="w-[115px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  المدينة
                </th>

                <th className="w-[115px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  الدولة
                </th>

                <th className="w-[150px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  حالة التحقق
                </th>

                <th className="w-[150px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  حالة العائلة
                </th>

                <th className="w-[170px] px-5 py-4 text-xs font-extrabold text-gray-500">
                  تاريخ الانضمام
                </th>
                <th className="w-[120px] px-5 py-4 text-xs font-extrabold text-gray-500">
                   الإجراءات
                  </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredGuardians.map((guardian) => (

                <tr
                  key={guardian.guardianId}
                  className="group transition-colors duration-150 hover:bg-[#F8FAFC]"
                >

                  {/* =================================================
                      NAME
                  ================================================== */}

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FA] text-sm font-extrabold text-[#0D4B8E]">

                        {(guardian.fullName || "و").charAt(0)}

                      </div>

                      <div className="min-w-0">

                        <p className="truncate font-extrabold text-[#003469]">
                          {guardian.fullName || "—"}
                        </p>

                        <p className="mt-1 truncate text-[10px] text-gray-400">
                          ID: {guardian.guardianId || "—"}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* =================================================
                      EMAIL
                  ================================================== */}

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {guardian.email || "—"}
                  </td>

                  {/* =================================================
                      PHONE
                  ================================================== */}

                  <td
                    dir="ltr"
                    className="whitespace-nowrap px-5 py-4 text-right text-sm text-gray-600"
                  >
                    {guardian.phoneNumber || "—"}
                  </td>

                  {/* =================================================
                      CITY
                  ================================================== */}

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {guardian.city || "—"}
                  </td>

                  {/* =================================================
                      COUNTRY
                  ================================================== */}

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                    {guardian.country || "—"}
                  </td>

                  {/* =================================================
                      VERIFICATION
                  ================================================== */}

                  <td className="px-5 py-4">

                    <span
                      className={`
                        inline-flex
                        min-w-[110px]
                        items-center
                        justify-center
                        whitespace-nowrap
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        ${getVerificationStyle(
                          guardian.verificationStatus,
                        )}
                      `}
                    >
                      {localizeVerificationStatus(
                        guardian.verificationStatus,
                      )}
                    </span>

                  </td>

                  {/* =================================================
                      FAMILY
                  ================================================== */}

                  <td className="px-5 py-4">

                    {guardian.hasFamily ? (

                      <span
                        className={`
                          inline-flex
                          items-center
                          justify-center
                          whitespace-nowrap
                          rounded-full
                          px-3
                          py-1.5
                          text-xs
                          font-bold
                          ${getFamilyStyle(
                            guardian.familyStatus,
                          )}
                        `}
                      >
                        {localizeStatus(
                          guardian.familyStatus,
                        )}
                      </span>

                    ) : (

                      <span className="whitespace-nowrap text-xs font-semibold text-gray-400">
                        لا توجد عائلة
                      </span>

                    )}

                  </td>

                  {/* =================================================
                      DATE
                  ================================================== */}

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                    {formatArabicDateTime(
                      guardian.joinedAt,
                    )}
                  </td>
                      <td className="px-5 py-4">

  <button
    onClick={() => openGuardianDetails(guardian)}
    className="
      rounded-lg
      bg-[#003469]
      px-4
      py-2
      text-xs
      font-bold
      text-white
      hover:bg-[#0D4B8E]
    "
  >
    التفاصيل
  </button>

</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* =====================================================
            MOBILE CARDS
        ====================================================== */}

        <div className="divide-y divide-gray-100 lg:hidden">

          {filteredGuardians.map((guardian) => (

            <div
              key={guardian.guardianId}
              className="p-4 transition-colors hover:bg-gray-50"
            >

              {/* TOP */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FA] text-sm font-extrabold text-[#0D4B8E]">
                    {(guardian.fullName || "و").charAt(0)}
                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-extrabold text-[#003469]">
                      {guardian.fullName || "—"}
                    </p>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {guardian.email || "—"}
                    </p>

                  </div>

                </div>

                <span
                  className={`
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    whitespace-nowrap
                    rounded-full
                    px-3
                    py-1.5
                    text-[11px]
                    font-bold
                    ${getVerificationStyle(
                      guardian.verificationStatus,
                    )}
                  `}
                >
                  {localizeVerificationStatus(
                    guardian.verificationStatus,
                  )}
                </span>

              </div>

              {/* INFORMATION */}

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3">

                <div>
                  <p className="text-[11px] text-gray-400">
                    رقم الهاتف
                  </p>

                  <p
                    dir="ltr"
                    className="mt-1 text-right text-xs font-semibold text-gray-700"
                  >
                    {guardian.phoneNumber || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    المدينة
                  </p>

                  <p className="mt-1 text-xs font-semibold text-gray-700">
                    {guardian.city || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    الدولة
                  </p>

                  <p className="mt-1 text-xs font-semibold text-gray-700">
                    {guardian.country || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400">
                    حالة العائلة
                  </p>

                  {guardian.hasFamily ? (

                    <span
                      className={`
                        mt-1
                        inline-flex
                        whitespace-nowrap
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-bold
                        ${getFamilyStyle(
                          guardian.familyStatus,
                        )}
                      `}
                    >
                      {localizeStatus(
                        guardian.familyStatus,
                      )}
                    </span>

                  ) : (

                    <p className="mt-1 text-xs font-semibold text-gray-400">
                      لا توجد عائلة
                    </p>

                  )}

                </div>

              </div>

              {/* DATE */}

              <div className="mt-3 flex items-center justify-between text-[11px]">

                <span className="text-gray-400">
                  تاريخ الانضمام
                </span>

                <span className="font-semibold text-gray-600">
                  {formatArabicDateTime(
                    guardian.joinedAt,
                  )}
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>
    );
  }

  /*
   * ---------------------------------------------------------
   * PAGE
   * ---------------------------------------------------------
   */
 const openDocument = async (id) => {
  try {

    const file = await adminApi.getDocumentFile(id);

    const url = URL.createObjectURL(file);

    window.open(url, "_blank");

  } catch(error){

    console.error(error);

  }
};
  return (
    <AdminLayout title="الأوصياء"><div className="mx-auto w-full max-w-7xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4"><div><h1 className="text-2xl font-extrabold text-[#003469]">إدارة الأوصياء</h1><p className="mt-1 text-sm text-gray-500">عرض بيانات الأوصياء وتعديلها وإدارة حالة الحساب بأمان.</p></div><Link to="/admin-dashboard/guardian-document-reviews" className="inline-flex items-center gap-2 rounded-lg bg-[#0D4B8E] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#003469]"><MdDescription />وثائق الأوصياء</Link></div>
      <div className="mb-5 max-w-sm"><MiniStatCard label="إجمالي الأوصياء" value={guardians.length} icon={HiOutlineIdentification} tone="bg-[#E8F1FA] text-[#0D4B8E]" /></div>
      <div className="mb-6 grid gap-3 rounded-xl border border-gray-200 bg-white p-4 lg:grid-cols-[1fr_220px_220px]"><label className="relative"><span className="sr-only">البحث في الأوصياء</span><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="ابحث بالاسم أو البريد أو الهاتف" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm outline-none focus:border-[#0D4B8E]" /></label><select value={verificationFilter} onChange={(event) => setVerificationFilter(event.target.value)} aria-label="تصفية حسب حالة التحقق" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{VERIFICATION_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select><select value={accountFilter} onChange={(event) => setAccountFilter(event.target.value)} aria-label="تصفية حسب حالة الحساب" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm">{ACCOUNT_FILTERS.map((filter) => <option key={filter.value} value={filter.value}>{filter.label}</option>)}</select></div>
      {actionError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm font-bold text-red-700">{actionError}</p>}
      {successMessage && <p role="status" className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm font-bold text-emerald-700">{successMessage}</p>}
      <p className="mb-3 text-sm font-bold text-gray-600">النتائج: {filteredGuardians.length}</p>{content}
    </div>

    {selected && dialogMode === "details" && <AdminDialog title="تفاصيل الوصي" size="max-w-5xl" onClose={() => { setSelected(null); setDialogMode(""); }} footer={<><button type="button" onClick={() => setDialogMode("edit")} className="rounded-lg bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white">تعديل</button>{selected.canSuspend && <button type="button" onClick={() => showStatusConfirmation(selected, false)} className="rounded-lg bg-amber-600 px-5 py-2.5 text-sm font-bold text-white">تعليق الحساب</button>}{selected.canReactivate && <button type="button" onClick={() => showStatusConfirmation(selected, true)} className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white">إعادة تفعيل الحساب</button>}<button type="button" onClick={() => setConfirmation({ type: "delete", guardian: selected })} className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-bold text-red-700">حذف نهائي</button></>}>
      <div className="space-y-5">
        <AdminDetailsHero icon={HiOutlineIdentification} eyebrow="ملف الوصي" title={selected.fullName} subtitle={selected.email} badges={[{ label: "التحقق", value: localizeVerificationStatus(selected.verificationStatus) }, { label: "الحساب", value: accountStatusLabel(selected.accountStatus) }]} />
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><AdminDetailStat label="العائلات" value={selected.familyCount} /><AdminDetailStat label="الأيتام" value={selected.orphanCount} /><AdminDetailStat label="الكفالات" value={selected.sponsorshipCount} /><AdminDetailStat label="الدفعات" value={selected.payoutCount} /></div>
        <div className="grid gap-5 lg:grid-cols-2">
          <AdminDetailsSection title="البيانات الشخصية" icon={FiUser}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="رقم الهوية" value={selected.nationalId} dir="ltr" /><AdminDetailItem label="رقم الهاتف" value={selected.phoneNumber} dir="ltr" /><AdminDetailItem label="تاريخ الميلاد" value={toDateInputValue(selected.dateOfBirth)} /><AdminDetailItem label="الجنس" value={localizeStatus(selected.gender)} /><AdminDetailItem label="صورة الملف الشخصي" value={selected.hasProfileImage ? "متوفرة" : "غير متوفرة"} /><AdminDetailItem label="تاريخ الانضمام" value={formatArabicDateTime(selected.joinedAt)} /></dl></AdminDetailsSection>
          <AdminDetailsSection title="السكن والعمل" icon={FiMapPin}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="المدينة" value={selected.city} /><AdminDetailItem label="الدولة" value={selected.country} /><AdminDetailItem label="العنوان" value={selected.address} wide /><AdminDetailItem label="المهنة" value={selected.occupation} /><AdminDetailItem label="الدخل الشهري" value={selected.monthlyIncome} /></dl></AdminDetailsSection>
        </div>
        <AdminDetailsSection title="بيانات العائلة والصلاحيات" icon={MdOutlineFamilyRestroom}><dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><AdminDetailItem label="عدد أفراد العائلة" value={selected.familyMembersCount} /><AdminDetailItem label="إمكانية التعليق" value={selected.canSuspend ? "متاحة" : "غير متاحة"} /><AdminDetailItem label="إمكانية إعادة التفعيل" value={selected.canReactivate ? "متاحة" : "غير متاحة"} /><AdminDetailItem label="إمكانية الحذف" value={selected.canDelete ? "متاحة" : "غير متاحة لوجود بيانات مرتبطة"} /></dl></AdminDetailsSection>
        <AdminDetailsSection title="المعرّفات التقنية" icon={FiInfo}><dl className="grid gap-3 sm:grid-cols-2"><AdminDetailItem label="معرّف الوصي" value={selected.guardianId} dir="ltr" /><AdminDetailItem label="معرّف المستخدم" value={selected.userId} dir="ltr" /></dl></AdminDetailsSection>
      </div>
          {selectedGuardian && (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" dir="rtl">

  <div className="
    w-full
    max-w-3xl
    max-h-[90vh]
    overflow-hidden
    rounded-3xl
    bg-white
    shadow-2xl
  ">


    {/* Header */}

    <div className="
      flex
      items-center
      justify-between
      border-b
      px-6
      py-5
    ">


      <div className="flex items-center gap-3">

        <div className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-[#E8F1FA]
          text-[#003469]
        ">
          <FiUser size={28}/>
        </div>


        <div>

          <h2 className="
            text-xl
            font-extrabold
            text-[#003469]
          ">
            تفاصيل الوصي
          </h2>

          <p className="text-sm text-gray-400">
            مراجعة بيانات ووثائق الوصي
          </p>

        </div>

      </div>



      <button
        onClick={()=>setSelectedGuardian(null)}
        className="
          rounded-xl
          bg-gray-100
          p-2
          text-gray-500
          hover:bg-red-50
          hover:text-red-600
        "
      >
        <FiX size={22}/>
      </button>


    </div>





    <div className="
      max-h-[65vh]
      overflow-y-auto
      p-6
    ">


      {/* معلومات الوصي */}

      <div className="
        rounded-2xl
        bg-[#F8FAFC]
        p-5
      ">


        <div className="
          grid
          grid-cols-2
          gap-4
        ">


          <InfoCard
            icon={<FiUser/>}
            title="الاسم"
            value={selectedGuardian.fullName}
          />


          <InfoCard
            icon={<FiMail/>}
            title="البريد الإلكتروني"
            value={selectedGuardian.email}
          />


          <InfoCard
            icon={<FiPhone/>}
            title="الهاتف"
            value={selectedGuardian.phoneNumber}
          />


          <InfoCard
            icon={<FiShield/>}
            title="حالة الحساب"
            value={localizeVerificationStatus(
              selectedGuardian.verificationStatus
            )}
          />


        </div>

      </div>






      {/* الاحصائيات */}

      <div className="
        mt-5
        grid
        grid-cols-3
        gap-4
      ">


        <StatCard
          number={approvedDocs}
          title="وثائق مقبولة"
          color="green"
          icon={<FiCheckCircle/>}
        />


        <StatCard
          number={pendingDocs}
          title="قيد المراجعة"
          color="yellow"
          icon={<FiClock/>}
        />


        <StatCard
          number={rejectedDocs}
          title="مرفوضة"
          color="red"
          icon={<FiXCircle/>}
        />


      </div>







      {/* الوثائق */}

      <div className="mt-6">


        <div className="
          mb-4
          flex
          items-center
          justify-between
        ">


          <h3 className="
            text-lg
            font-extrabold
            text-[#003469]
          ">
            الوثائق المرفوعة
          </h3>


          <span className="
            rounded-full
            bg-[#E8F1FA]
            px-4
            py-1
            text-xs
            font-bold
            text-[#003469]
          ">
            {guardianDocuments.length} وثائق
          </span>


        </div>




        <div className="space-y-3">


        {guardianDocuments.map((doc)=>(


          <div
            key={doc.id}
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-4
              shadow-sm
            "
          >


            <div className="flex items-center gap-3">


              <div className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-[#E8F1FA]
                text-[#003469]
              ">
                <FiFileText/>
              </div>



              <div>

                <p className="font-extrabold">
                  {localizeDocumentType(doc.documentType)}
                </p>


                <p className="
                  text-xs
                  text-gray-500
                ">
                  {localizeDocumentStatus(doc.status)}
                </p>

              </div>


            </div>




            <button
              onClick={()=>openDocument(doc.id)}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-[#003469]
                px-4
                py-2
                text-xs
                font-bold
                text-white
              "
            >
              <FiEye/>
              عرض
            </button>


          </div>


        ))}


        </div>


      </div>


    </div>






    {/* Footer */}

    <div className="
      flex
      gap-3
      border-t
      p-5
    ">


      <button
        className="
          flex-1
          rounded-xl
          bg-green-600
          py-3
          font-extrabold
          text-white
        "
      >
        <FiCheckCircle className="inline ml-2"/>
        اعتماد الحساب
      </button>



      <button
        className="
          flex-1
          rounded-xl
          bg-red-600
          py-3
          font-extrabold
          text-white
        "
      >
        <FiTrash2 className="inline ml-2"/>
        رفض الحساب
      </button>


    </div>


  </div>

</div>

)}
    </AdminLayout>
    
  );
  function InfoCard({ icon, title, value }) {
  return (
    <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100">

      <div className="flex items-center gap-2 text-xs text-gray-400">
        {icon}
        <span>{title}</span>
      </div>

      <p className="mt-2 font-bold text-gray-800 truncate">
        {value || "-"}
      </p>

    </div>
  );
}



function StatCard({ number, title, color, icon }) {

  const colors = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };


  return (
    <div
      className={`
        rounded-2xl
        p-4
        text-center
        ${colors[color]}
      `}
    >

      <div className="mb-2 flex justify-center text-xl">
        {icon}
      </div>


      <p className="text-3xl font-extrabold">
        {number}
      </p>


      <p className="mt-1 text-xs font-bold">
        {title}
      </p>


    </div>
  );
}
}
