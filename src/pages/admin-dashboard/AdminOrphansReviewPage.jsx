import { useCallback, useEffect, useMemo, useState } from "react";

import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiEye,
  FiFileText,
  FiMapPin,
  FiSearch,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";

import {
  MdChildCare,
  MdDescription,
} from "react-icons/md";

import { adminApi } from "../../services/adminApi";
import {
  apiErrorMessage,
  openProtectedBlob,
  unwrapResult,
} from "../../utils/apiUi";

import { formatArabicDateTime } from "../../utils/date";

import {
  localizeDocumentType,
  localizeStatus,
} from "../../utils/localization";

import AdminLayout from "./Adminlayout";

import {
  EmptyState,
  ErrorState,
  LoadingState,
  MiniStatCard,
} from "./Adminstates";


/* =========================================================
   FILTERS
========================================================= */

const ORPHAN_STATUS_FILTERS = [
  {
    value: "all",
    label: "كل الحالات",
  },
  {
    value: "PendingReview",
    label: "قيد المراجعة",
  },
  {
    value: "NeedsUpdate",
    label: "يحتاج تحديث",
  },
  {
    value: "Active",
    label: "نشط",
  },
  {
    value: "Hidden",
    label: "مخفي",
  },
  {
    value: "Suspended",
    label: "معلق",
  },
];


/* =========================================================
   STATUS BADGE
========================================================= */

function getOrphanStatusStyle(status) {
  switch (status) {
    case "Active":
      return {
        wrapper:
          "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
        icon: FiCheckCircle,
      };

    case "PendingReview":
      return {
        wrapper:
          "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
        icon: FiClock,
      };

    case "NeedsUpdate":
      return {
        wrapper:
          "bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-200",
        icon: FiAlertCircle,
      };

    case "Suspended":
      return {
        wrapper:
          "bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
        icon: FiAlertCircle,
      };

    case "Hidden":
      return {
        wrapper:
          "bg-gray-100 text-gray-600 ring-1 ring-inset ring-gray-200",
        icon: FiEye,
      };

    default:
      return {
        wrapper:
          "bg-[#E8F1FA] text-[#0D4B8E] ring-1 ring-inset ring-[#C7DCEE]",
        icon: FiClock,
      };
  }
}


/* =========================================================
   DOCUMENT ERROR
========================================================= */

function documentFileErrorMessage(error) {
  const status = error?.response?.status;

  if (status === 401) {
    return "انتهت صلاحية الجلسة. يرجى تسجيل الدخول مرة أخرى.";
  }

  if (status === 403) {
    return "ليس لديك صلاحية لعرض هذا المستند.";
  }

  if (status === 404) {
    return "المستند غير موجود.";
  }

  return apiErrorMessage(
    error,
    "تعذر فتح المستند. حاول مرة أخرى.",
  );
}


/* =========================================================
   STATUS BADGE COMPONENT
========================================================= */

function StatusBadge({ status }) {
  const style = getOrphanStatusStyle(status);
  const Icon = style.icon;

  return (
    <span
      className={`
        inline-flex
        min-w-[105px]
        items-center
        justify-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        px-3
        py-1.5
        text-xs
        font-bold
        ${style.wrapper}
      `}
    >
      <Icon size={13} />
      {localizeStatus(status)}
    </span>
  );
}


/* =========================================================
   MAIN PAGE
========================================================= */

export default function AdminOrphansReviewPage() {
  const [allOrphans, setAllOrphans] = useState([]);
  const [pendingOrphans, setPendingOrphans] = useState([]);
  const [documents, setDocuments] = useState([]);

  const [activeTab, setActiveTab] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selected, setSelected] = useState(null);
  const [selectedForReview, setSelectedForReview] =
    useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [reason, setReason] = useState("");
  const [documentReason, setDocumentReason] =
    useState("");

  const [busy, setBusy] = useState("");


  /* =========================================================
     LOAD DATA
  ========================================================= */

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [
        allResult,
        pendingResult,
        documentResult,
      ] = await Promise.all([
        adminApi.getAllOrphans(),
        adminApi.getPendingOrphans(),
        adminApi.getPendingOrphanDocuments(),
      ]);

      setAllOrphans(
        unwrapResult(
          allResult,
          "تعذر تحميل جميع الأيتام.",
        ) || [],
      );

      setPendingOrphans(
        unwrapResult(
          pendingResult,
          "تعذر تحميل الأيتام المعلقين.",
        ) || [],
      );

      setDocuments(
        (
          unwrapResult(
            documentResult,
            "تعذر تحميل الوثائق المعلقة.",
          ) || []
        ).map((item) => ({
          ...item,
          arabicLabel:
            item.arabicLabel ||
            localizeDocumentType(
              item.documentType,
            ),
        })),
      );
    } catch (requestError) {
      setError(
        apiErrorMessage(
          requestError,
          "تعذر تحميل بيانات الأيتام.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    const timeoutId = window.setTimeout(
      load,
      0,
    );

    return () =>
      window.clearTimeout(timeoutId);
  }, [load]);


  /* =========================================================
     FILTER
  ========================================================= */

  const filteredOrphans = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    return allOrphans.filter((orphan) => {
      const matchesStatus =
        statusFilter === "all" ||
        orphan.orphanStatus ===
          statusFilter;

      const matchesSearch =
        !query ||
        [
          orphan.fullName,
          orphan.nationalId,
          orphan.familyHeadOfHouseholdName,
          orphan.guardianFullName,
          orphan.orphanId,
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query),
        );

      return (
        matchesStatus &&
        matchesSearch
      );
    });
  }, [
    allOrphans,
    searchTerm,
    statusFilter,
  ]);


  /* =========================================================
     OPEN ORPHAN
  ========================================================= */

  const showOrphan = async (
    orphanId,
    forReview = false,
  ) => {
    setBusy(`detail-${orphanId}`);
    setActionError("");

    try {
      const data = unwrapResult(
        await adminApi.getOrphanDetails(
          orphanId,
        ),
        "تعذر تحميل تفاصيل اليتيم.",
      );

      setSelected(data);
      setSelectedForReview(
        forReview,
      );
      setReason("");
    } catch (requestError) {
      setActionError(
        apiErrorMessage(
          requestError,
          "تعذر تحميل تفاصيل اليتيم.",
        ),
      );
    } finally {
      setBusy("");
    }
  };


  /* =========================================================
     ACTION
  ========================================================= */

  const act = async (
    key,
    request,
  ) => {
    setBusy(key);
    setActionError("");

    try {
      unwrapResult(
        await request(),
        "تعذر تنفيذ الإجراء.",
      );

      setSelected(null);
      setSelectedForReview(false);

      setReason("");

      await load();
    } catch (requestError) {
      setActionError(
        apiErrorMessage(
          requestError,
          "تعذر تنفيذ الإجراء.",
        ),
      );
    } finally {
      setBusy("");
    }
  };


  /* =========================================================
     VIEW FILE
  ========================================================= */

  const viewBlob = async (
    key,
    request,
  ) => {
    setBusy(key);
    setActionError("");

    try {
      openProtectedBlob(
        await request(),
      );
    } catch (requestError) {
      setActionError(
        documentFileErrorMessage(
          requestError,
        ),
      );
    } finally {
      setBusy("");
    }
  };


  /* =========================================================
     SELECT TAB
  ========================================================= */

  const selectTab = (tab) => {
    setActiveTab(tab);

    setSelected(null);
    setSelectedForReview(false);

    setActionError("");
  };


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };


  /* =========================================================
     SELECTED DOCUMENTS
  ========================================================= */

  const birthCertificate =
    selected?.requiredDocuments?.find(
      (document) =>
        document.documentType ===
        "BirthCertificate",
    );

  const hasBirthCertificate =
    Boolean(
      birthCertificate?.documentId &&
        birthCertificate.hasCurrentDocument !==
          false &&
        birthCertificate.canView !==
          false,
    );

  const hasFatherDeathCertificate =
    Boolean(
      selected?.familyId &&
        selected.familyFatherDeathCertificateAccessEndpoint,
    );


  /* =========================================================
     TAB CONTENT
  ========================================================= */

  let tabContent;


  /* =========================================================
     ALL ORPHANS
  ========================================================= */

  if (activeTab === "all") {
    if (allOrphans.length === 0) {
      tabContent = (
        <EmptyState
          icon={MdChildCare}
          title="لا يوجد أيتام"
          description="لم يُرجع الخادم أي سجلات أيتام حتى الآن."
        />
      );
    } else if (
      filteredOrphans.length === 0
    ) {
      tabContent = (
        <EmptyState
          icon={FiSearch}
          title="لا توجد نتائج مطابقة"
          description="جرّب تعديل عبارة البحث أو حالة اليتيم."
        />
      );
    } else {
      tabContent = (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* TABLE HEADER */}

          <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-base font-extrabold text-[#003469]">
                جميع الأيتام
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                قائمة الحالات المسجلة في النظام
              </p>
            </div>

            <div className="flex items-center gap-2">

              <span className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                {filteredOrphans.length} نتيجة
              </span>

            </div>

          </div>


          {/* DESKTOP */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full min-w-[1250px] text-right">

              <thead>
                <tr className="border-b border-gray-100 bg-[#F8FAFC]">

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    اليتيم
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    رقم الهوية
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    العمر
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    الجنس
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    العائلة
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    الوصي
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    الحالة
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    تاريخ الإنشاء
                  </th>

                  <th className="px-5 py-4 text-xs font-extrabold text-gray-500">
                    الإجراء
                  </th>

                </tr>
              </thead>


              <tbody className="divide-y divide-gray-100">

                {filteredOrphans.map(
                  (orphan) => (

                    <tr
                      key={
                        orphan.orphanId
                      }
                      className="group transition-colors hover:bg-[#F8FAFC]"
                    >

                      {/* NAME */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FA] font-extrabold text-[#0D4B8E]">

                            {(
                              orphan.fullName ||
                              "ي"
                            ).charAt(0)}

                          </div>

                          <div className="min-w-0">

                            <p className="max-w-[180px] truncate text-sm font-extrabold text-[#003469]">
                              {orphan.fullName ||
                                "—"}
                            </p>

                            <p className="mt-0.5 text-[10px] text-gray-400">
                              ID:{" "}
                              {orphan.orphanId ||
                                "—"}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* NATIONAL ID */}

                      <td
                        dir="ltr"
                        className="whitespace-nowrap px-5 py-4 text-right text-sm text-gray-600"
                      >
                        {orphan.nationalId ||
                          "—"}
                      </td>


                      {/* AGE */}

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {orphan.age ??
                          "—"}
                      </td>


                      {/* GENDER */}

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600">
                        {localizeStatus(
                          orphan.gender,
                        )}
                      </td>


                      {/* FAMILY */}

                      <td className="px-5 py-4">

                        <p className="max-w-[150px] truncate text-sm font-semibold text-gray-700">
                          {orphan.familyHeadOfHouseholdName ||
                            "—"}
                        </p>

                      </td>


                      {/* GUARDIAN */}

                      <td className="px-5 py-4">

                        <p className="max-w-[150px] truncate text-sm font-semibold text-gray-700">
                          {orphan.guardianFullName ||
                            "—"}
                        </p>

                      </td>


                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <StatusBadge
                          status={
                            orphan.orphanStatus
                          }
                        />

                      </td>


                      {/* DATE */}

                      <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                        {formatArabicDateTime(
                          orphan.createdAt,
                        )}
                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-4">

                        <button
                          type="button"
                          disabled={
                            busy ===
                            `detail-${orphan.orphanId}`
                          }
                          onClick={() =>
                            showOrphan(
                              orphan.orphanId,
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            gap-2
                            whitespace-nowrap
                            rounded-xl
                            bg-[#E8F1FA]
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-[#0D4B8E]
                            transition
                            hover:bg-[#DCEBF8]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                          "
                        >
                          <FiEye
                            size={15}
                          />

                          عرض التفاصيل
                        </button>

                      </td>

                    </tr>
                  ),
                )}

              </tbody>

            </table>

          </div>


          {/* MOBILE */}

          <div className="divide-y divide-gray-100 lg:hidden">

            {filteredOrphans.map(
              (orphan) => (

                <div
                  key={
                    orphan.orphanId
                  }
                  className="p-4"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FA] font-extrabold text-[#0D4B8E]">
                        {(
                          orphan.fullName ||
                          "ي"
                        ).charAt(0)}
                      </div>

                      <div className="min-w-0">

                        <p className="truncate font-extrabold text-[#003469]">
                          {orphan.fullName ||
                            "—"}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {orphan.guardianFullName ||
                            "لا يوجد وصي"}
                        </p>

                      </div>

                    </div>

                    <StatusBadge
                      status={
                        orphan.orphanStatus
                      }
                    />

                  </div>


                  <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-3">

                    <div>
                      <p className="text-[11px] text-gray-400">
                        رقم الهوية
                      </p>

                      <p
                        dir="ltr"
                        className="mt-1 text-right text-xs font-semibold text-gray-700"
                      >
                        {orphan.nationalId ||
                          "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-[11px] text-gray-400">
                        العمر
                      </p>

                      <p className="mt-1 text-xs font-semibold text-gray-700">
                        {orphan.age ??
                          "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-[11px] text-gray-400">
                        العائلة
                      </p>

                      <p className="mt-1 truncate text-xs font-semibold text-gray-700">
                        {orphan.familyHeadOfHouseholdName ||
                          "—"}
                      </p>
                    </div>


                    <div>
                      <p className="text-[11px] text-gray-400">
                        الجنس
                      </p>

                      <p className="mt-1 text-xs font-semibold text-gray-700">
                        {localizeStatus(
                          orphan.gender,
                        )}
                      </p>
                    </div>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      showOrphan(
                        orphan.orphanId,
                      )
                    }
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#0D4B8E]
                      px-4
                      py-2.5
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    <FiEye />
                    عرض التفاصيل
                  </button>

                </div>

              ),
            )}

          </div>

        </div>
      );
    }
  }


  /* =========================================================
     PENDING
  ========================================================= */

  else if (
    activeTab === "pending"
  ) {
    tabContent = pendingOrphans.length ? (

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {pendingOrphans.map(
          (orphan) => (

            <article
              key={orphan.orphanId}
              className="
                group
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:border-[#C7DCEE]
                hover:shadow-md
              "
            >

              <div className="flex items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 font-extrabold text-amber-700">
                    {(
                      orphan.fullName ||
                      "ي"
                    ).charAt(0)}
                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate font-extrabold text-[#003469]">
                      {orphan.fullName ||
                        "—"}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-400">
                      {orphan.orphanId ||
                        "—"}
                    </p>

                  </div>

                </div>

                <StatusBadge
                  status={
                    orphan.orphanStatus
                  }
                />

              </div>


              <div className="mt-4 space-y-2 rounded-xl bg-gray-50 p-3">

                <div className="flex items-center gap-2 text-xs">

                  <FiUsers className="text-gray-400" />

                  <span className="text-gray-400">
                    العائلة
                  </span>

                  <span className="mr-auto truncate font-semibold text-gray-700">
                    {orphan.familyHeadOfHouseholdName ||
                      "—"}
                  </span>

                </div>


                <div className="flex items-center gap-2 text-xs">

                  <FiUser className="text-gray-400" />

                  <span className="text-gray-400">
                    الوصي
                  </span>

                  <span className="mr-auto truncate font-semibold text-gray-700">
                    {orphan.guardianFullName ||
                      "—"}
                  </span>

                </div>

              </div>


              <button
                type="button"
                disabled={
                  busy ===
                  `detail-${orphan.orphanId}`
                }
                onClick={() =>
                  showOrphan(
                    orphan.orphanId,
                    true,
                  )
                }
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#0D4B8E]
                  px-4
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  transition
                  hover:bg-[#003469]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                <FiEye />
                عرض ومراجعة
              </button>

            </article>

          ),
        )}

      </div>

    ) : (

      <EmptyState
        icon={MdChildCare}
        title="لا توجد حالات معلقة"
        description="لا توجد حالات أيتام بانتظار المراجعة."
      />

    );
  }


  /* =========================================================
     DOCUMENTS
  ========================================================= */

  else {
    tabContent = documents.length ? (

      <div className="space-y-5">

        {/* DOCUMENT REASON */}

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-3">

            <h2 className="text-sm font-extrabold text-[#003469]">
              طلب تحديث وثيقة
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              اكتب سبب طلب التحديث ليظهر للوصي.
            </p>

          </div>

          <textarea
            value={documentReason}
            onChange={(event) =>
              setDocumentReason(
                event.target.value,
              )
            }
            maxLength={500}
            rows={3}
            placeholder="مثال: يرجى رفع نسخة أوضح من الوثيقة..."
            className="
              w-full
              resize-none
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              p-3
              text-sm
              text-gray-700
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-[#0D4B8E]
              focus:bg-white
              focus:ring-4
              focus:ring-[#0D4B8E]/10
            "
          />

          <p className="mt-2 text-left text-[11px] text-gray-400">
            {documentReason.length}/500
          </p>

        </div>


        {/* DOCUMENTS */}

        <div className="grid gap-4 md:grid-cols-2">

          {documents.map(
            (document) => (

              <article
                key={
                  document.documentId
                }
                className="
                  rounded-2xl
                  border
                  border-gray-200
                  bg-white
                  p-5
                  shadow-sm
                  transition
                  hover:border-[#C7DCEE]
                  hover:shadow-md
                "
              >

                <div className="flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FA] text-[#0D4B8E]">
                    <FiFileText
                      size={20}
                    />
                  </div>

                  <div className="min-w-0">

                    <h3 className="truncate font-extrabold text-[#003469]">
                      {document.arabicLabel ||
                        document.documentType ||
                        "وثيقة"}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {document.orphanFullName ||
                        "—"}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-gray-400">
                      {document.displayFileName ||
                        "ملف مرفق"}
                    </p>

                  </div>

                </div>


                <div className="mt-4 flex flex-wrap gap-2">

                  <button
                    type="button"
                    disabled={
                      Boolean(busy)
                    }
                    onClick={() =>
                      viewBlob(
                        `doc-${document.documentId}`,
                        () =>
                          adminApi.getOrphanDocumentFile(
                            document.documentId,
                          ),
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-[#E8F1FA]
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-[#0D4B8E]
                      disabled:opacity-50
                    "
                  >
                    <FiEye />

                    {busy ===
                    `doc-${document.documentId}`
                      ? "جارٍ الفتح..."
                      : "عرض الملف"}
                  </button>


                  <button
                    type="button"
                    disabled={
                      Boolean(busy)
                    }
                    onClick={() =>
                      act(
                        `approve-${document.documentId}`,
                        () =>
                          adminApi.approveOrphanDocument(
                            document.documentId,
                          ),
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-emerald-600
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-white
                      disabled:opacity-50
                    "
                  >
                    <FiCheckCircle />

                    اعتماد
                  </button>


                  <button
                    type="button"
                    disabled={
                      Boolean(busy) ||
                      !documentReason.trim()
                    }
                    onClick={() =>
                      act(
                        `update-${document.documentId}`,
                        () =>
                          adminApi.requestOrphanDocumentUpdate(
                            document.documentId,
                            documentReason,
                          ),
                      )
                    }
                    className="
                      inline-flex
                      items-center
                      gap-2
                      rounded-xl
                      bg-amber-500
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-white
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <FiAlertCircle />

                    طلب تحديث
                  </button>

                </div>

              </article>

            ),
          )}

        </div>

      </div>

    ) : (

      <EmptyState
        icon={MdDescription}
        title="لا توجد وثائق معلقة"
        description="لا توجد وثائق أيتام بانتظار المراجعة."
      />

    );
  }


  /* =========================================================
     PAGE CONTENT
  ========================================================= */

  let content;

  if (loading) {
    content = <LoadingState />;
  }

  else if (error) {
    content = (
      <ErrorState
        onRetry={load}
        description={error}
      />
    );
  }

  else {
    content = (

      <div className="space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F1FA] text-[#0D4B8E]">
              <MdChildCare
                size={25}
              />
            </div>

            <div>

              <h1 className="text-2xl font-extrabold tracking-tight text-[#003469]">
                إدارة الأيتام
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                إدارة الحالات ومراجعة الوثائق والتحقق من بيانات الأيتام.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">

            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span className="text-xs font-bold text-gray-600">
              النظام يعمل بشكل طبيعي
            </span>

          </div>

        </div>


        {/* =====================================================
            STATS
        ====================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

          <MiniStatCard
            label="إجمالي الأيتام"
            value={allOrphans.length}
            icon={MdChildCare}
            tone="bg-[#E8F1FA] text-[#0D4B8E]"
          />

          <MiniStatCard
            label="بانتظار المراجعة"
            value={
              pendingOrphans.length
            }
            icon={FiClock}
            tone="bg-amber-50 text-amber-700"
          />

          <MiniStatCard
            label="وثائق معلقة"
            value={documents.length}
            icon={MdDescription}
            tone="bg-orange-50 text-orange-700"
          />

        </div>


        {/* =====================================================
            TABS
        ====================================================== */}

        <div className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">

          <div className="grid gap-2 sm:grid-cols-3">

            {[
              {
                key: "all",
                label: "جميع الأيتام",
                count:
                  allOrphans.length,
                icon: MdChildCare,
              },

              {
                key: "pending",
                label: "بانتظار المراجعة",
                count:
                  pendingOrphans.length,
                icon: FiClock,
              },

              {
                key: "documents",
                label: "الوثائق المعلقة",
                count:
                  documents.length,
                icon: MdDescription,
              },
            ].map((tab) => {

              const Icon = tab.icon;

              const active =
                activeTab ===
                tab.key;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() =>
                    selectTab(
                      tab.key,
                    )
                  }
                  className={`
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-4
                    py-3
                    text-sm
                    font-extrabold
                    transition
                    ${
                      active
                        ? "bg-[#0D4B8E] text-white shadow-sm"
                        : "text-gray-500 hover:bg-[#F5F8FB] hover:text-[#0D4B8E]"
                    }
                  `}
                >

                  <Icon size={18} />

                  <span>
                    {tab.label}
                  </span>

                  <span
                    className={`
                      rounded-full
                      px-2
                      py-0.5
                      text-[10px]
                      ${
                        active
                          ? "bg-white/15 text-white"
                          : "bg-gray-100 text-gray-500"
                      }
                    `}
                  >
                    {tab.count}
                  </span>

                </button>
              );
            })}

          </div>

        </div>


        {/* =====================================================
            SEARCH
        ====================================================== */}

        {activeTab ===
          "all" && (

          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <h2 className="text-sm font-extrabold text-[#003469]">
                  البحث والتصفية
                </h2>

                <p className="mt-1 text-xs text-gray-400">
                  ابحث بالاسم أو رقم الهوية أو العائلة أو الوصي.
                </p>

              </div>


              {(searchTerm ||
                statusFilter !==
                  "all") && (

                <button
                  type="button"
                  onClick={
                    clearFilters
                  }
                  className="text-xs font-bold text-[#0D4B8E] hover:underline"
                >
                  مسح الفلاتر
                </button>

              )}

            </div>


            <div className="grid gap-3 md:grid-cols-[1fr_230px]">

              {/* SEARCH */}

              <label className="relative block">

                <span className="sr-only">
                  البحث في الأيتام
                </span>

                <FiSearch
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                  size={18}
                />

                <input
                  value={
                    searchTerm
                  }
                  onChange={(
                    event,
                  ) =>
                    setSearchTerm(
                      event.target
                        .value,
                    )
                  }
                  placeholder="ابحث بالاسم أو الهوية أو العائلة أو الوصي..."
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    pr-10
                    pl-4
                    text-sm
                    text-gray-700
                    outline-none
                    transition
                    placeholder:text-gray-400
                    hover:border-gray-300
                    focus:border-[#0D4B8E]
                    focus:bg-white
                    focus:ring-4
                    focus:ring-[#0D4B8E]/10
                  "
                />

              </label>


              {/* FILTER */}

              <select
                value={
                  statusFilter
                }
                onChange={(
                  event,
                ) =>
                  setStatusFilter(
                    event.target
                      .value,
                  )
                }
                aria-label="تصفية حسب حالة اليتيم"
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  bg-gray-50
                  px-4
                  text-sm
                  font-semibold
                  text-gray-700
                  outline-none
                  transition
                  hover:border-gray-300
                  focus:border-[#0D4B8E]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#0D4B8E]/10
                "
              >

                {ORPHAN_STATUS_FILTERS.map(
                  (filter) => (
                    <option
                      key={
                        filter.value
                      }
                      value={
                        filter.value
                      }
                    >
                      {
                        filter.label
                      }
                    </option>
                  ),
                )}

              </select>

            </div>

          </div>
        )}


        {/* =====================================================
            RESULTS
        ====================================================== */}

        {activeTab ===
          "all" && (

          <div className="flex items-center justify-between">

            <p className="text-sm font-bold text-gray-600">

              النتائج

              <span className="mr-1 text-[#0D4B8E]">
                {filteredOrphans.length}
              </span>

            </p>

            <p className="text-xs text-gray-400">
              من أصل{" "}
              {allOrphans.length}
            </p>

          </div>
        )}


        {/* =====================================================
            TAB CONTENT
        ====================================================== */}

        {tabContent}


        {/* =====================================================
            ACTION ERROR
        ====================================================== */}

        {actionError && (

          <div
            role="alert"
            className="
              flex
              items-start
              gap-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-4
              text-sm
              font-semibold
              text-red-700
            "
          >

            <FiAlertCircle
              className="mt-0.5 shrink-0"
            />

            <span>
              {actionError}
            </span>

          </div>

        )}

      </div>
    );
  }


  /* =========================================================
     RETURN + MODAL
  ========================================================= */

  return (
    <AdminLayout title="إدارة الأيتام">

      {content}


      {/* =====================================================
          ORPHAN DETAILS MODAL
      ====================================================== */}

      {selected && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#001A33]/50
            p-4
            backdrop-blur-sm
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelected(null);
              setSelectedForReview(
                false,
              );
            }
          }}
        >

          <section
            className="
              flex
              max-h-[92vh]
              w-full
              max-w-4xl
              flex-col
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl
            "
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">

              <div className="flex min-w-0 items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F1FA] font-extrabold text-[#0D4B8E]">
                  {(
                    selected.fullName ||
                    "ي"
                  ).charAt(0)}
                </div>

                <div className="min-w-0">

                  <h2 className="truncate text-lg font-extrabold text-[#003469]">
                    {selected.fullName ||
                      "تفاصيل اليتيم"}
                  </h2>

                  <p className="mt-0.5 text-xs text-gray-400">
                    تفاصيل الحالة والمستندات
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setSelectedForReview(
                    false,
                  );
                }}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-lg
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                "
                aria-label="إغلاق"
              >
                <FiX size={20} />
              </button>

            </div>


            {/* MODAL BODY */}

            <div className="overflow-y-auto p-5">

              {/* STATUS */}

              <div className="flex flex-wrap items-center gap-2">

                <StatusBadge
                  status={
                    selected.orphanStatus
                  }
                />

                {selected.familyStatus && (

                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                    <FiUsers size={13} />
                    {localizeStatus(
                      selected.familyStatus,
                    )}
                  </span>

                )}

              </div>


              {/* INFORMATION GRID */}

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FiFileText />
                    رقم الهوية
                  </div>

                  <p
                    dir="ltr"
                    className="mt-2 text-right text-sm font-extrabold text-gray-700"
                  >
                    {selected.nationalId ||
                      "—"}
                  </p>

                </div>


                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FiCalendar />
                    العمر
                  </div>

                  <p className="mt-2 text-sm font-extrabold text-gray-700">
                    {selected.age ??
                      "—"}
                  </p>

                </div>


                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FiUser />
                    الجنس
                  </div>

                  <p className="mt-2 text-sm font-extrabold text-gray-700">
                    {localizeStatus(
                      selected.gender,
                    )}
                  </p>

                </div>


                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">

                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FiUsers />
                    الوصي
                  </div>

                  <p className="mt-2 truncate text-sm font-extrabold text-gray-700">
                    {selected.guardianFullName ||
                      "—"}
                  </p>

                </div>

              </div>


              {/* FAMILY */}

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

                  <p className="text-xs font-bold text-gray-400">
                    العائلة
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#003469]">
                    {selected.familyHeadOfHouseholdName ||
                      "—"}
                  </p>

                </div>


                <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">

                  <p className="text-xs font-bold text-gray-400">
                    الحالة التعليمية
                  </p>

                  <p className="mt-2 text-sm font-extrabold text-[#003469]">
                    {localizeStatus(
                      selected.educationalStatus,
                    ) || "—"}
                  </p>

                </div>

              </div>


              {/* LOCATION */}

              {selected.city && (

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-4 py-3 text-sm">

                  <FiMapPin className="text-[#0D4B8E]" />

                  <span className="text-gray-400">
                    المدينة
                  </span>

                  <span className="font-bold text-gray-700">
                    {selected.city}
                  </span>

                </div>

              )}


              {/* CASE DESCRIPTION */}

              <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-4">

                <div className="flex items-center gap-2">

                  <FiFileText className="text-[#0D4B8E]" />

                  <h3 className="text-sm font-extrabold text-[#003469]">
                    وصف الحالة
                  </h3>

                </div>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
                  {selected.caseDescription ||
                    "لا يوجد وصف للحالة."}
                </p>

              </div>


              {/* DOCUMENTS */}

              <div className="mt-5 rounded-2xl border border-[#D7E2EE] bg-[#F8FAFC] p-4">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-sm font-extrabold text-[#003469]">
                      مستندات الحالة
                    </h3>

                    <p className="mt-1 text-xs text-gray-400">
                      المستندات المتاحة للمراجعة
                    </p>

                  </div>

                  <FiFileText className="text-[#0D4B8E]" />

                </div>


                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                  {/* BIRTH CERTIFICATE */}

                  <div className="rounded-xl border border-gray-200 bg-white p-4">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-sm font-extrabold text-gray-700">
                          شهادة ميلاد اليتيم
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Birth Certificate
                        </p>

                      </div>

                      {hasBirthCertificate && (

                        <FiCheckCircle className="text-emerald-600" />

                      )}

                    </div>


                    <button
                      type="button"
                      disabled={
                        Boolean(
                          busy,
                        ) ||
                        !hasBirthCertificate
                      }
                      onClick={() =>
                        viewBlob(
                          "birth-certificate",
                          () =>
                            adminApi.getOrphanDocumentFile(
                              birthCertificate.documentId,
                            ),
                        )
                      }
                      className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#E8F1FA]
                        px-3
                        py-2.5
                        text-xs
                        font-bold
                        text-[#0D4B8E]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >

                      <FiEye />

                      {busy ===
                      "birth-certificate"
                        ? "جارٍ الفتح..."
                        : "عرض الوثيقة"}

                    </button>


                    {!hasBirthCertificate && (

                      <p className="mt-2 text-[11px] font-semibold text-red-600">
                        الوثيقة غير متوفرة.
                      </p>

                    )}

                  </div>


                  {/* FATHER DEATH */}

                  <div className="rounded-xl border border-gray-200 bg-white p-4">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <p className="text-sm font-extrabold text-gray-700">
                          شهادة وفاة الأب
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Father Death Certificate
                        </p>

                      </div>

                      {hasFatherDeathCertificate && (

                        <FiCheckCircle className="text-emerald-600" />

                      )}

                    </div>


                    <button
                      type="button"
                      disabled={
                        Boolean(
                          busy,
                        ) ||
                        !hasFatherDeathCertificate
                      }
                      onClick={() =>
                        viewBlob(
                          "father-death-certificate",
                          () =>
                            adminApi.getFamilyFatherDeathCertificate(
                              selected.familyId,
                            ),
                        )
                      }
                      className="
                        mt-4
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#E8F1FA]
                        px-3
                        py-2.5
                        text-xs
                        font-bold
                        text-[#0D4B8E]
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >

                      <FiEye />

                      {busy ===
                      "father-death-certificate"
                        ? "جارٍ الفتح..."
                        : "عرض الوثيقة"}

                    </button>


                    {!hasFatherDeathCertificate && (

                      <p className="mt-2 text-[11px] font-semibold text-red-600">
                        الوثيقة غير متوفرة.
                      </p>

                    )}

                  </div>

                </div>

              </div>


              {/* REVIEW */}

              {selectedForReview && (

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/60 p-5">

                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <FiAlertCircle />
                    </div>

                    <div>

                      <h3 className="text-sm font-extrabold text-amber-800">
                        مراجعة حالة اليتيم
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-amber-700">
                        يمكنك اعتماد الحالة أو طلب تحديث البيانات.
                      </p>

                    </div>

                  </div>


                  <label className="mt-4 block">

                    <span className="text-xs font-bold text-gray-700">
                      سبب طلب التحديث
                    </span>

                    <textarea
                      value={reason}
                      onChange={(
                        event,
                      ) =>
                        setReason(
                          event.target
                            .value,
                        )
                      }
                      rows={3}
                      maxLength={500}
                      placeholder="اكتب سبب طلب التحديث..."
                      className="
                        mt-2
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-amber-200
                        bg-white
                        p-3
                        text-sm
                        outline-none
                        focus:border-amber-500
                        focus:ring-4
                        focus:ring-amber-500/10
                      "
                    />

                  </label>


                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">

                    <button
                      type="button"
                      disabled={
                        Boolean(
                          busy,
                        )
                      }
                      onClick={() =>
                        act(
                          "approve-orphan",
                          () =>
                            adminApi.approveOrphan(
                              selected.orphanId,
                            ),
                        )
                      }
                      className="
                        inline-flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-emerald-600
                        px-5
                        py-3
                        text-sm
                        font-extrabold
                        text-white
                        transition
                        hover:bg-emerald-700
                        disabled:opacity-50
                      "
                    >

                      <FiCheckCircle />

                      اعتماد اليتيم

                    </button>


                    <button
                      type="button"
                      disabled={
                        Boolean(
                          busy,
                        ) ||
                        !reason.trim()
                      }
                      onClick={() =>
                        act(
                          "update-orphan",
                          () =>
                            adminApi.requestOrphanUpdate(
                              selected.orphanId,
                              reason,
                            ),
                        )
                      }
                      className="
                        inline-flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-amber-500
                        px-5
                        py-3
                        text-sm
                        font-extrabold
                        text-white
                        transition
                        hover:bg-amber-600
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >

                      <FiAlertCircle />

                      طلب تحديث

                    </button>

                  </div>

                </div>

              )}

            </div>


            {/* MODAL FOOTER */}

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-5 py-3">

              <p className="text-[11px] text-gray-400">
                تم إنشاء الحالة:{" "}
                {formatArabicDateTime(
                  selected.createdAt,
                )}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSelected(null);
                  setSelectedForReview(
                    false,
                  );
                }}
                className="
                  rounded-xl
                  bg-white
                  px-4
                  py-2
                  text-xs
                  font-bold
                  text-gray-600
                  shadow-sm
                  ring-1
                  ring-inset
                  ring-gray-200
                  hover:bg-gray-100
                "
              >
                إغلاق
              </button>

            </div>

          </section>

        </div>

      )}

    </AdminLayout>
  );
}