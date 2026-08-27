import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiSearch,
} from "react-icons/fi";
import {
  MdOutlineCheckCircle,
  MdOutlineEditNote,
  MdOutlineFamilyRestroom,
  MdOutlineVerified,
} from "react-icons/md";
import { HiOutlineIdentification, HiOutlineUsers } from "react-icons/hi2";
import AdminLayout from "./Adminlayout";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  MiniStatCard,
} from "./Adminstates";
import { STATUS_MAP } from "./Familystatus";
import FamilyDetailsModal from "./modals/Familydetailsmodal";
import { adminApi } from "../../services/adminApi";
import { mapFamilyStatus } from "../../config/familyStatus";

const cardShadow = "shadow-[0_2px_10px_rgba(31,41,55,0.06)]";
const ITEMS_PER_PAGE = 6;

function getApiErrorMessage(error, fallback) {
  const responseData = error?.response?.data || {};
  const errors = Array.isArray(responseData.errors)
    ? responseData.errors.filter(Boolean)
    : [];

  return responseData.message || errors.join(" - ") || error?.message || fallback;
}

async function loadFamilies() {
  const result = await adminApi.getFamilies();
  if (result?.success === false) {
    throw new Error(
      result.message || result.errors?.join(" - ") || "تعذر تحميل العائلات.",
    );
  }
  return Array.isArray(result?.data) ? result.data : [];
}

async function loadPendingFamilies() {
  const result = await adminApi.getPendingFamilies();
  if (result?.success === false) {
    throw new Error(
      result.message || result.errors?.join(" - ") || "تعذر تحميل طلبات العائلات.",
    );
  }
  return Array.isArray(result?.data) ? result.data : [];
}

async function loadAdminFamilies() {
  const [families, pendingFamilies] = await Promise.all([
    loadFamilies(),
    loadPendingFamilies(),
  ]);
  return { families, pendingFamilies };
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatAmount(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("ar-EG", {
    maximumFractionDigits: 2,
  }).format(value);
}

function StatusBadge({ status }) {
  const info = STATUS_MAP[mapFamilyStatus(status)] || STATUS_MAP.pending;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${info.className}`}
    >
      {info.label}
    </span>
  );
}

function FamilyCard({ family, onView }) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:shadow-lg ${cardShadow}`}
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-l from-[#E8F1FA] to-[#F8FAFC]">
        <MdOutlineFamilyRestroom className="text-7xl text-[#0D4B8E]/70" />
        <div className="absolute right-3 top-3">
          <StatusBadge status={family.status} />
        </div>
      </div>

      <div dir="rtl" className="p-4 text-right">
        <h3 className="mb-1 text-base font-bold text-[#003469]">
          {family.headOfHouseholdName || "—"}
        </h3>
        <p className="mb-3 text-xs text-gray-500">
          الوصي: {family.guardianFullName || "—"}
        </p>

        <div className="mb-4 grid grid-cols-2 gap-2 border-b border-gray-100 pb-3 text-xs text-gray-600">
          <span>
            الاحتياج: {" "}
            <strong className="text-[#0D4B8E]">
              {formatAmount(family.monthlyNeedAmount)}
            </strong>
          </span>
          <span>
            المدينة: {" "}
            <strong className="text-[#0D4B8E]">{family.city || "—"}</strong>
          </span>
        </div>

        <button
          onClick={() => onView(family)}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md border-2 border-[#0D4B8E] text-sm font-bold text-[#0D4B8E] transition hover:bg-[#0D4B8E] hover:text-white cursor-pointer"
        >
          <FiEye />
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
}

function PendingRequestsTable({ items, onView }) {
  if (items.length === 0) return null;

  return (
    <section
      className={`mt-10 overflow-hidden rounded-lg border border-gray-300 bg-white ${cardShadow}`}
    >
      <div className="px-6 py-5">
        <h3 className="text-lg font-extrabold text-[#08386B]">
          طلبات تحتاج مراجعة
        </h3>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table dir="rtl" className="w-full min-w-[640px] text-right">
          <thead className="bg-gray-100 text-sm text-[#1F2937]">
            <tr>
              <th className="px-6 py-3 font-extrabold">معرّف العائلة</th>
              <th className="px-6 py-3 font-extrabold">اسم رب الأسرة</th>
              <th className="px-6 py-3 font-extrabold">التاريخ</th>
              <th className="px-6 py-3 font-extrabold">الحالة</th>
              <th className="px-6 py-3 font-extrabold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {items.map((family) => (
              <tr key={family.familyId} className="text-sm">
                <td
                  dir="ltr"
                  className="px-6 py-4 text-left font-mono text-xs text-[#6B7280]"
                >
                  {family.familyId}
                </td>
                <td className="px-6 py-4 font-bold text-[#1F2937]">
                  {family.headOfHouseholdName || "—"}
                </td>
                <td className="px-6 py-4 text-[#6B7280]">
                  {formatDate(family.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={family.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(family)}
                      title="عرض التفاصيل"
                      className="grid h-8 w-8 place-items-center rounded-lg text-[#0D4B8E] hover:bg-[#0D4B8E]/10 transition cursor-pointer"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => onView(family)}
                      title="اعتماد الطلب"
                      className="grid h-8 w-8 place-items-center rounded-lg text-green-600 hover:bg-green-50 transition cursor-pointer"
                    >
                      <MdOutlineCheckCircle />
                    </button>
                    <button
                      onClick={() => onView(family)}
                      title="طلب تحديث البيانات"
                      className="grid h-8 w-8 place-items-center rounded-lg text-amber-700 hover:bg-amber-50 transition cursor-pointer"
                    >
                      <MdOutlineEditNote />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function FamiliesReview() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [families, setFamilies] = useState([]);
  const [pendingFamilies, setPendingFamilies] = useState([]);
  const [activeSection, setActiveSection] = useState("pending");
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loadError, setLoadError] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [certificateLoading, setCertificateLoading] = useState(false);
  const certificateUrlRef = useRef(null);
  const certificateTimerRef = useRef(null);

  const fetchFamilies = useCallback(async () => {
    setStatus("loading");
    setLoadError("");
    try {
      const data = await loadAdminFamilies();
      setFamilies(data.families);
      setPendingFamilies(data.pendingFamilies);
      setStatus(data.families.length === 0 ? "empty" : "success");
      setPage(1);
      return data;
    } catch (error) {
      setLoadError(getApiErrorMessage(error, "تعذر تحميل العائلات."));
      setStatus("error");
      return false;
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialFamilies() {
      try {
        const data = await loadAdminFamilies();
        if (cancelled) return;
        setFamilies(data.families);
        setPendingFamilies(data.pendingFamilies);
        setStatus(data.families.length === 0 ? "empty" : "success");
        setPage(1);
      } catch (error) {
        if (cancelled) return;
        setLoadError(getApiErrorMessage(error, "تعذر تحميل العائلات."));
        setStatus("error");
      }
    }

    loadInitialFamilies();
    return () => {
      cancelled = true;
      if (certificateTimerRef.current) clearTimeout(certificateTimerRef.current);
      if (certificateUrlRef.current) URL.revokeObjectURL(certificateUrlRef.current);
    };
  }, []);

  const filtered = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const source = activeSection === "pending" ? pendingFamilies : families;
    return source.filter((family) => {
      const matchesStatus =
        activeSection === "pending" ||
        statusFilter === "all" ||
        mapFamilyStatus(family.status) === statusFilter;
      const matchesQuery =
        !query ||
        [
          family.familyId,
          family.headOfHouseholdName,
          family.guardianFullName,
          family.guardianEmail,
          family.city,
        ].some((value) => String(value || "").toLowerCase().includes(query));
      return matchesStatus && matchesQuery;
    });
  }, [activeSection, families, pendingFamilies, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleDecision = async (family, targetStatus, reason) => {
    if (actionLoading) return false;

    setActionLoading(true);
    setActionError("");
    setSuccessMessage("");
    try {
      const result = await adminApi.updateFamilyStatus(
        family.familyId,
        targetStatus,
        reason,
      );

      if (result?.success === false) {
        throw new Error(
          result.message || result.errors?.join(" - ") || "تعذر تنفيذ الإجراء.",
        );
      }

      const backendUpdatedFamily = result?.data?.familyId ? result.data : null;
      const message =
        result?.message || "تم حفظ حالة العائلة بنجاح.";

      setSuccessMessage(message);
      if (backendUpdatedFamily) setSelectedFamily(backendUpdatedFamily);

      const refreshed = await fetchFamilies();
      if (refreshed) {
        const refreshedFamily = [
          ...refreshed.families,
          ...refreshed.pendingFamilies,
        ].find((item) => item.familyId === family.familyId);

        if (refreshedFamily) {
          setSelectedFamily(refreshedFamily);
        } else if (!backendUpdatedFamily) {
          setSelectedFamily(null);
        }
      }
      return true;
    } catch (error) {
      setActionError(getApiErrorMessage(error, "تعذر تنفيذ الإجراء."));
      return false;
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewCertificate = async (family) => {
    if (certificateLoading || !family?.hasFatherDeathCertificate) return;

    setCertificateLoading(true);
    setActionError("");
    try {
      const blob = await adminApi.getFamilyFatherDeathCertificate(
        family.familyId,
      );

      if (certificateTimerRef.current) clearTimeout(certificateTimerRef.current);
      if (certificateUrlRef.current) URL.revokeObjectURL(certificateUrlRef.current);

      const objectUrl = URL.createObjectURL(blob);
      certificateUrlRef.current = objectUrl;
      window.open(objectUrl, "_blank", "noopener,noreferrer");
      certificateTimerRef.current = setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
        if (certificateUrlRef.current === objectUrl) {
          certificateUrlRef.current = null;
        }
      }, 60000);
    } catch (error) {
      setActionError(getApiErrorMessage(error, "تعذر فتح شهادة الوفاة."));
    } finally {
      setCertificateLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-3 flex items-center gap-2 text-sm text-[#6B7280]">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="hover:text-[#0D4B8E] transition cursor-pointer"
        >
          الرئيسية
        </button>
        <span>/</span>
        <span className="font-bold text-[#0D4B8E]">إدارة العائلات</span>
      </div>

      <h1 className="mb-2 text-xl font-extrabold text-[#0D4B8E] sm:text-2xl">
        إدارة العائلات
      </h1>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-[#6B7280]">
        اعرض جميع العائلات وحالتها الحالية، وراجع الطلبات التي تنتظر قرار الإدارة.
      </p>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200" role="tablist" aria-label="أقسام إدارة العائلات">
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === "pending"}
          onClick={() => {
            setActiveSection("pending");
            setStatusFilter("all");
            setPage(1);
          }}
          className={`border-b-2 px-5 py-3 text-sm font-bold transition ${activeSection === "pending" ? "border-[#0D4B8E] text-[#0D4B8E]" : "border-transparent text-gray-500 hover:text-[#0D4B8E]"}`}
        >
          قيد المراجعة ({pendingFamilies.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeSection === "all"}
          onClick={() => {
            setActiveSection("all");
            setStatusFilter("all");
            setPage(1);
          }}
          className={`border-b-2 px-5 py-3 text-sm font-bold transition ${activeSection === "all" ? "border-[#0D4B8E] text-[#0D4B8E]" : "border-transparent text-gray-500 hover:text-[#0D4B8E]"}`}
        >
          جميع العائلات ({families.length})
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-right text-sm font-bold text-green-700">
          {successMessage}
        </div>
      )}

      {status === "loading" && <LoadingState count={6} />}

      {status === "error" && (
        <ErrorState onRetry={fetchFamilies} description={loadError} />
      )}

      {status === "empty" && (
        <EmptyState
          icon={MdOutlineFamilyRestroom}
          title="لا توجد عائلات"
          description="لا توجد عائلات مسجلة في المنصة حاليًا."
        />
      )}

      {status === "success" && (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MiniStatCard
              label={activeSection === "pending" ? "إجمالي الطلبات" : "إجمالي العائلات"}
              value={activeSection === "pending" ? pendingFamilies.length : families.length}
              icon={HiOutlineUsers}
              tone="bg-[#0D4B8E]/10 text-[#0D4B8E]"
            />
            <MiniStatCard
              label="شهادات وفاة مرفوعة"
              value={(activeSection === "pending" ? pendingFamilies : families).filter((family) => family.hasFatherDeathCertificate).length}
              icon={MdOutlineVerified}
              tone="bg-green-100 text-green-700"
            />
            <MiniStatCard
              label="طلبات قيد المراجعة"
              value={pendingFamilies.length}
              icon={HiOutlineIdentification}
              tone="bg-[#F0C86A]/50 text-[#B07B11]"
            />
          </div>

          <div
            className={`mb-6 rounded-xl border border-[#E5E7EB] bg-white p-4 ${cardShadow}`}
          >
            <div
              dir="rtl"
              className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_220px]"
            >
              <div className="relative">
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setPage(1);
                  }}
                  placeholder="ابحث باسم رب الأسرة أو الوصي أو البريد الإلكتروني"
                  className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-[#F8FAFC] pr-10 pl-4 text-sm text-right outline-none focus:border-[#0D4B8E] transition"
                />
              </div>

              <div className="relative">
                <select
                  value={activeSection === "pending" ? "pending" : statusFilter}
                  onChange={(event) => {
                    setStatusFilter(event.target.value);
                    setPage(1);
                  }}
                  disabled={activeSection === "pending"}
                  className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-[#F8FAFC] px-4 text-sm text-right text-[#6B7280] outline-none focus:border-[#0D4B8E] disabled:cursor-not-allowed"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="active">نشطة</option>
                  <option value="hidden">مخفية</option>
                  <option value="stopped">موقوفة</option>
                  <option value="needsEdit">تحتاج تعديل</option>
                </select>
                <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          <p dir="rtl" className="mb-4 text-right text-sm text-[#6B7280]">
            عدد النتائج: {" "}
            <strong className="text-[#1F2937]">{filtered.length}</strong>
          </p>

          {filtered.length === 0 ? (
            <EmptyState
              icon={MdOutlineFamilyRestroom}
              title={activeSection === "pending" && !searchTerm.trim() ? "لا توجد طلبات عائلات قيد المراجعة" : "لا توجد نتائج مطابقة"}
              description={activeSection === "pending" && !searchTerm.trim() ? "ستظهر هنا الطلبات الجديدة عندما تصبح جاهزة للمراجعة." : "جرّب تعديل كلمات البحث أو مرشح الحالة."}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((family) => (
                  <FamilyCard
                    key={family.familyId}
                    family={family}
                    onView={(item) => {
                      setActionError("");
                      setSuccessMessage("");
                      setSelectedFamily(item);
                    }}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage((current) => Math.max(1, current - 1))}
                    disabled={page === 1}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:border-[#0D4B8E] hover:text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                  >
                    <FiChevronRight />
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => setPage(number)}
                        className={`h-9 w-9 rounded-lg text-sm font-bold transition cursor-pointer ${
                          page === number
                            ? "bg-[#0D4B8E] text-white"
                            : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D4B8E] hover:text-[#0D4B8E]"
                        }`}
                      >
                        {number}
                      </button>
                    ),
                  )}
                  <button
                    onClick={() =>
                      setPage((current) => Math.min(totalPages, current + 1))
                    }
                    disabled={page === totalPages}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:border-[#0D4B8E] hover:text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                  >
                    <FiChevronLeft />
                  </button>
                </div>
              )}
            </>
          )}

          {activeSection === "pending" && (
            <PendingRequestsTable
              items={pendingFamilies}
              onView={(item) => {
                setActionError("");
                setSuccessMessage("");
                setSelectedFamily(item);
              }}
            />
          )}
        </>
      )}

      {selectedFamily && (
        <FamilyDetailsModal
          family={selectedFamily}
          onClose={() => {
            if (!actionLoading) setSelectedFamily(null);
          }}
          onDecision={handleDecision}
          actionLoading={actionLoading}
          actionError={actionError}
          actionSuccess={successMessage}
          onViewCertificate={handleViewCertificate}
          certificateLoading={certificateLoading}
        />
      )}

    </AdminLayout>
  );
}
