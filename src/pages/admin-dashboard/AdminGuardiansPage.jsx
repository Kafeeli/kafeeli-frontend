import { useCallback, useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi2";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";

import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatArabicDateTime } from "../../utils/date";
import {
  localizeStatus,
  localizeVerificationStatus,
} from "../../utils/localization";

import AdminLayout from "./Adminlayout";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  MiniStatCard,
} from "./Adminstates";

const VERIFICATION_FILTERS = [
  { value: "all", label: "كل حالات التحقق" },
  { value: "Pending", label: "قيد المراجعة" },
  { value: "Approved", label: "موثق" },
  { value: "Rejected", label: "مرفوض" },
  { value: "NeedsUpdate", label: "يحتاج تحديث" },
  { value: "Suspended", label: "معلق" },
];

export default function AdminGuardiansPage() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = unwrapResult(
        await adminApi.getAllGuardians(),
        "تعذر تحميل قائمة الأوصياء.",
      );

      setGuardians(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(
        apiErrorMessage(
          requestError,
          "تعذر تحميل قائمة الأوصياء.",
        ),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);

    return () => window.clearTimeout(timeoutId);
  }, [load]);

  const filteredGuardians = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return guardians.filter((guardian) => {
      const matchesStatus =
        verificationFilter === "all" ||
        guardian.verificationStatus === verificationFilter;

      const matchesSearch =
        !query ||
        [
          guardian.fullName,
          guardian.email,
          guardian.phoneNumber,
          guardian.city,
          guardian.country,
          guardian.guardianId,
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(query),
        );

      return matchesStatus && matchesSearch;
    });
  }, [guardians, searchTerm, verificationFilter]);

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

  return (
    <AdminLayout title="الأوصياء">

      <div className="mx-auto w-full max-w-7xl">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F1FA] text-[#0D4B8E]">
                <HiOutlineIdentification size={23} />
              </div>

              <div>

                <h1 className="text-2xl font-extrabold text-[#003469]">
                  الأوصياء
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  إدارة حسابات الأوصياء ومتابعة حالة التحقق والعائلات المرتبطة.
                </p>

              </div>

            </div>

          </div>

          <Link
            to="/admin-dashboard/guardian-document-reviews"
            className="
              inline-flex
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
              shadow-sm
              transition
              hover:bg-[#003469]
              focus:outline-none
              focus:ring-4
              focus:ring-[#0D4B8E]/20
              sm:w-auto
            "
          >
            <MdDescription size={19} />
            مراجعة وثائق الأوصياء
          </Link>

        </div>

        {/* =====================================================
            STAT
        ====================================================== */}

        <div className="mb-5 max-w-sm">

          <MiniStatCard
            label="إجمالي الأوصياء"
            value={guardians.length}
            icon={HiOutlineIdentification}
            tone="bg-[#E8F1FA] text-[#0D4B8E]"
          />

        </div>

        {/* =====================================================
            SEARCH & FILTER
        ====================================================== */}

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <h2 className="text-sm font-extrabold text-[#003469]">
                البحث والتصفية
              </h2>

              <p className="mt-0.5 text-xs text-gray-400">
                ابحث عن وصي أو اعرض حالات تحقق محددة.
              </p>
            </div>

          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_240px]">

            {/* SEARCH */}

            <label className="relative block">

              <span className="sr-only">
                البحث في الأوصياء
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
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="ابحث بالاسم أو البريد أو الهاتف أو المدينة..."
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
              value={verificationFilter}
              onChange={(event) =>
                setVerificationFilter(
                  event.target.value,
                )
              }
              aria-label="تصفية حسب حالة التحقق"
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

              {VERIFICATION_FILTERS.map(
                (filter) => (
                  <option
                    key={filter.value}
                    value={filter.value}
                  >
                    {filter.label}
                  </option>
                ),
              )}

            </select>

          </div>

        </div>

        {/* =====================================================
            RESULTS COUNT
        ====================================================== */}

        <div className="mb-3 flex items-center justify-between">

          <p className="text-sm font-bold text-gray-600">
            النتائج:
            <span className="mr-1 text-[#0D4B8E]">
              {filteredGuardians.length}
            </span>
          </p>

          {(searchTerm || verificationFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setVerificationFilter("all");
              }}
              className="
                text-xs
                font-bold
                text-gray-500
                transition
                hover:text-[#0D4B8E]
              "
            >
              مسح الفلاتر
            </button>
          )}

        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        {content}

      </div>

    </AdminLayout>
  );
}