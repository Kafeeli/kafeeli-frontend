
import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiFilter,
  FiExternalLink,
} from "react-icons/fi";
import { TbArrowsSort } from "react-icons/tb";
import {
  HiOutlineBuildingLibrary,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import {
  MdOutlineAccountBalanceWallet,
  MdWarningAmber,
  MdRefresh,
} from "react-icons/md";
import AdminLayout from "./Adminlayout";
import TransferDetailsModal from "./Transferdetailsmodal";
import { adminApi } from "../../services/adminApi";

const cardShadow = "shadow-[0_2px_10px_rgba(31,41,55,0.06)]";
const ITEMS_PER_PAGE = 4;

const STATUS_LABELS = {
  Pending: "بانتظار المراجعة",
  PendingReview: "بانتظار المراجعة",
  Approved: "معتمد",
  NeedsUpdate: "بحاجة لتحديث",
  Rejected: "مرفوض",
};

function statusLabel(status) {
  return STATUS_LABELS[status] || status || "—";
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

function avatarUrlFor(name) {
  const safeName = encodeURIComponent(name || "Guardian");
  return `https://ui-avatars.com/api/?name=${safeName}&background=0D4B8E&color=fff`;
}

// تحويل عنصر القائمة (بقيم مقنّعة) إلى شكل موحّد يستخدمه العرض
function mapListItem(raw) {
  return {
    id: raw.bankAccountId,
    guardianId: raw.guardianId,
    name: raw.guardianFullName || "—",
    email: raw.guardianEmail || "—",
    accountOwner: raw.accountHolderName || "—",
    bankName: raw.bankName || "—",
    accountNumber: raw.accountNumberMasked || "—",
    accountNumberMasked: raw.accountNumberMasked,
    fieldLabel: "رقم الحساب / الآيبان",
    branch: raw.branchName || "—",
    branchName: raw.branchName,
    iban: raw.ibanMasked || "—",
    ibanMasked: raw.ibanMasked,
    accountOrPhone: raw.accountNumberMasked || "—",
    date: formatDate(raw.createdAt),
    createdAt: raw.createdAt,
    status: statusLabel(raw.verificationStatus),
    verificationStatus: raw.verificationStatus,
    rejectionReason: raw.rejectionReason,
    needsUpdateReason: raw.needsUpdateReason,
    reviewedAt: raw.reviewedAt,
    avatar: avatarUrlFor(raw.guardianFullName),
  };
}

// تحويل استجابة التفاصيل الكاملة (endpoint /{id}) لنفس الشكل، بقيم غير مقنّعة
function mapDetailItem(raw) {
  return {
    id: raw.bankAccountId,
    guardianId: raw.guardianId,
    guardianFullName: raw.guardianFullName,
    guardianEmail: raw.guardianEmail,
    name: raw.guardianFullName || "—",
    email: raw.guardianEmail || "—",
    accountHolderName: raw.accountHolderName,
    accountOwner: raw.accountHolderName || "—",
    bankName: raw.bankName || "—",
    accountNumber: raw.accountNumber,
    branchName: raw.branchName,
    branch: raw.branchName || "—",
    iban: raw.iban,
    createdAt: raw.createdAt,
    verificationStatus: raw.verificationStatus,
    rejectionReason: raw.rejectionReason,
    needsUpdateReason: raw.needsUpdateReason,
    reviewedAt: raw.reviewedAt,
  };
}

function getErrorMessage(error, fallback) {
  const status = error?.response?.status;
  const responseData = error?.response?.data || {};
  const serverMessage =
    responseData.message || responseData.title || responseData.detail;

  if (status === 401) return "انتهت الجلسة، الرجاء تسجيل الدخول من جديد";
  if (status === 403) return "غير مصرح لك بتنفيذ هذا الإجراء";
  if (status === 404) return "لم يتم العثور على هذا الطلب";
  if (status >= 500) return "حدث خطأ في الخادم، حاول مرة أخرى لاحقًا";
  if (!error?.response) return "تعذر الاتصال بالخادم، تحقق من اتصال الإنترنت";

  return serverMessage || fallback;
}

/* ============================== حالات العرض ============================== */

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-[#E5E7EB] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-4 w-16 rounded bg-gray-200" />
        <div className="h-10 w-10 rounded-full bg-gray-200" />
      </div>
      <div className="mb-2 h-3 w-3/4 rounded bg-gray-200" />
      <div className="mb-4 h-3 w-1/2 rounded bg-gray-200" />
      <div className="flex gap-2">
        <div className="h-8 w-16 rounded-md bg-gray-200" />
        <div className="h-8 w-16 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-300 bg-white/40 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#F3F4F5] text-[#9CA3AF]">
        <MdOutlineAccountBalanceWallet className="text-3xl" />
      </div>
      <div>
        <h4 className="text-lg font-extrabold text-[#1F2937]">
          لا توجد بيانات تحويل بانتظار المراجعة
        </h4>
        <p className="mt-2 max-w-md text-sm text-gray-400">
          تمت مراجعة جميع بيانات التحويل المرسلة حاليًا. يمكنك العودة لاحقًا أو
          التحقق من سجل الأرشيف.
        </p>
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-red-100 bg-red-50/40 px-6 py-16 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-red-100 text-red-500">
        <MdWarningAmber className="text-3xl" />
      </div>
      <div>
        <h4 className="text-lg font-extrabold text-red-600">
          حدث خطأ في جلب البيانات
        </h4>
        <p className="mt-2 max-w-md text-sm text-[#6B7280]">
          {message ||
            "نواجه صعوبات تقنية في الاتصال بالخادم الرئيسي حاليًا. قد يكون ذلك بسبب ضعف شبكة الإنترنت أو صيانة دورية للنظام."}
        </p>
      </div>
      <button
        onClick={onRetry}
        className="mt-2 flex items-center gap-2 rounded-md bg-[#003469] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#002850] cursor-pointer"
      >
        <MdRefresh className="text-lg" />
        إعادة المحاولة
      </button>
    </div>
  );
}

/* ============================== مكونات القائمة ============================== */

function MiniStatCard({ label, value, icon: Icon, tone }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 ${cardShadow}`}
    >
      <div className="text-right">
        <p className="mb-1 text-sm text-[#6B7280]">{label}</p>
        <strong className="text-lg font-extrabold text-[#1F2937]">
          {value}
        </strong>
      </div>
      <div
        className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${tone}`}
      >
        <Icon className="text-2xl" />
      </div>
    </div>
  );
}

function Field({ label, value, mono = false }) {
  return (
    <div className="flex flex-col items-start gap-1 text-right min-w-0 w-full">
      <span className="text-xs text-[#9CA3AF]">{label}</span>
      <span
        dir={mono ? "ltr" : "rtl"}
        className={`w-full truncate text-sm font-bold text-[#003469] ${
          mono ? "text-right font-mono tracking-wide" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ReviewRow({ item, onReview, reviewLoadingId }) {
  const isLoadingThis = reviewLoadingId === item.id;

  return (
    <div
      dir="rtl"
      className={`flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between ${cardShadow}`}
    >
      <div className="flex items-center gap-3 lg:w-[220px] lg:shrink-0">
        <img
          src={item.avatar}
          alt={item.name}
          className="h-11 w-11 shrink-0 rounded-full object-cover"
        />
        <div className="text-right">
          <h4 className="text-sm font-bold text-[#111827]">{item.name}</h4>
          <p className="text-xs text-gray-500">{item.email}</p>
          <span className="mt-1 inline-block rounded-full bg-[#FFE7B8] px-2 py-0.5 text-[11px] font-bold text-[#9A6700]">
            {item.status}
          </span>
        </div>
      </div>

      <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-4">
        <Field label="تاريخ الإضافة" value={item.date} />
        <Field label="صاحب الحساب" value={item.accountOwner} />
        <Field label={item.fieldLabel} value={item.accountNumber} mono />
        <Field label="البنك / المحفظة" value={item.bankName} />
      </div>

      <button
        onClick={() => onReview(item)}
        disabled={isLoadingThis}
        className="flex h-10 w-full shrink-0 items-center justify-center gap-2 rounded-md border-2 border-[#0D4B8E] px-4 text-sm font-bold text-[#0D4B8E] transition hover:bg-[#0D4B8E] hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
      >
        <FiExternalLink />
        {isLoadingThis ? "جاري التحميل..." : "مراجعة بيانات التحويل"}
      </button>
    </div>
  );
}

export default function TransferReviewList() {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [page, setPage] = useState(1);

  /* status: "loading" | "success" | "empty" | "error" */
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState(null);
  const [reviewItems, setReviewItems] = useState([]);

  // حالات خاصة بجلب التفاصيل الكاملة قبل فتح المودال
  const [reviewLoadingId, setReviewLoadingId] = useState(null);

  // حالات خاصة بتنفيذ إجراء الاعتماد/طلب التعديل
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const fetchReviewItems = useCallback(async () => {
    setStatus("loading");
    setErrorMessage(null);

    try {
      const response = await adminApi.getPendingBankAccounts();

      if (!response?.success) {
        setErrorMessage(response?.message || "تعذر تحميل بيانات المراجعة");
        setStatus("error");
        return;
      }

      const mapped = (response.data || []).map(mapListItem);
      setReviewItems(mapped);
      setStatus(mapped.length === 0 ? "empty" : "success");
      setPage(1);
    } catch (error) {
      setErrorMessage(getErrorMessage(error, "تعذر تحميل بيانات المراجعة"));
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchReviewItems();
  }, [fetchReviewItems]);

  const totalPages = Math.ceil(reviewItems.length / ITEMS_PER_PAGE) || 1;

  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return reviewItems.slice(start, start + ITEMS_PER_PAGE);
  }, [page, reviewItems]);

  // عند الضغط على "مراجعة بيانات التحويل": نجيب التفاصيل الكاملة (IBAN ورقم الحساب غير مقنّعين) أولاً
  const handleReviewClick = async (item) => {
    setActionError(null);
    setReviewLoadingId(item.id);

    try {
      const response = await adminApi.getBankAccountDetails(item.id);

      if (!response?.success) {
        setActionError(response?.message || "تعذر جلب تفاصيل الطلب");
        setReviewLoadingId(null);
        return;
      }

      setSelectedItem(mapDetailItem(response.data));
    } catch (error) {
      setActionError(getErrorMessage(error, "تعذر جلب تفاصيل الطلب"));
    } finally {
      setReviewLoadingId(null);
    }
  };

  const runVerifyAction = async (item, action, reason) => {
    setActionLoading(true);
    setActionError(null);

    try {
      const response = await adminApi.verifyBankAccount(item.id, {
        action,
        reason,
      });

      if (!response?.success) {
        setActionError(response?.message || "تعذر تنفيذ الإجراء");
        return;
      }

      // نجاح: نغلق المودال ونحدّث القائمة لتعكس الحالة الجديدة
      setSelectedItem(null);
      await fetchReviewItems();
    } catch (error) {
      setActionError(getErrorMessage(error, "تعذر تنفيذ الإجراء"));
    } finally {
      setActionLoading(false);
    }
  };

  const handleApprove = (item) => {
    runVerifyAction(item, "Approve");
  };

  const handleRequestEdit = (item, reason) => {
    runVerifyAction(item, "NeedsUpdate", reason);
  };

  return (
    <AdminLayout title="أهلاً بك Admin في لوحة إدارة منصة كفيلي">
      {/* Breadcrumb */}
      <div className="mb-3 flex items-center gap-2 text-sm text-[#6B7280]">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="hover:text-[#0D4B8E] transition cursor-pointer"
        >
          الرئيسية
        </button>
        <span>/</span>
        <span className="font-bold text-[#0D4B8E]">مراجعة بيانات التحويل</span>
      </div>

      <h1 className="mb-2 text-xl font-extrabold text-[#0D4B8E] sm:text-2xl">
        مراجعة بيانات التحويل
      </h1>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-[#6B7280]">
        استعراض كافة الحالات والتحويلات المالية التي تتطلب مراجعة إدارية قبل
        الاعتماد.
      </p>

      {status === "loading" && <LoadingState />}

      {status === "error" && (
        <ErrorState message={errorMessage} onRetry={fetchReviewItems} />
      )}

      {status === "empty" && <EmptyState />}

      {status === "success" && (
        <>
          {/* Mini stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MiniStatCard
              label="محافظ إلكترونية"
              value={`${
                reviewItems.filter((i) =>
                  (i.bankName || "").toLowerCase().includes("pay")
                ).length
              } محافظ`}
              icon={MdOutlineAccountBalanceWallet}
              tone="bg-[#7DDCE0]/30 text-[#0F8E94]"
            />
            <MiniStatCard
              label="حسابات بنكية"
              value={`${
                reviewItems.filter(
                  (i) => !(i.bankName || "").toLowerCase().includes("pay")
                ).length
              } حسابات`}
              icon={HiOutlineBuildingLibrary}
              tone="bg-[#0D4B8E]/10 text-[#0D4B8E]"
            />
            <MiniStatCard
              label="طلبات معلقة"
              value={`${reviewItems.length} طلب`}
              icon={HiOutlineClipboardDocumentList}
              tone="bg-[#F0C86A]/50 text-[#B07B11]"
            />
          </div>

          {/* عنوان القائمة + أدوات */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-[#08386B]">
              قائمة المراجعة (قيد الانتظار)
            </h3>
            <div className="flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D4B8E] hover:text-[#0D4B8E] transition cursor-pointer">
                <TbArrowsSort />
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D4B8E] hover:text-[#0D4B8E] transition cursor-pointer">
                <FiFilter />
              </button>
            </div>
          </div>

          {actionError && !selectedItem && (
            <div
              dir="rtl"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-right text-sm text-red-700"
            >
              {actionError}
            </div>
          )}

          {/* القائمة */}
          <div className="space-y-4">
            {pageItems.map((item) => (
              <ReviewRow
                key={item.id}
                item={item}
                onReview={handleReviewClick}
                reviewLoadingId={reviewLoadingId}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#E5E7EB] pt-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:border-[#0D4B8E] hover:text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                <FiChevronRight />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`h-9 w-9 rounded-lg text-sm font-bold transition cursor-pointer ${
                      page === num
                        ? "bg-[#0D4B8E] text-white"
                        : "border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D4B8E] hover:text-[#0D4B8E]"
                    }`}
                  >
                    {num}
                  </button>
                ),
              )}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="grid h-9 w-9 place-items-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:border-[#0D4B8E] hover:text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
              >
                <FiChevronLeft />
              </button>
            </div>

            <p className="text-xs text-[#9CA3AF]">
              عرض {(page - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(page * ITEMS_PER_PAGE, reviewItems.length)} من أصل{" "}
              {reviewItems.length} طلب مراجعة
            </p>
          </div>
        </>
      )}

      {selectedItem && (
        <TransferDetailsModal
          data={selectedItem}
          onClose={() => {
            setSelectedItem(null);
            setActionError(null);
          }}
          onApprove={handleApprove}
          onRequestEdit={handleRequestEdit}
          actionLoading={actionLoading}
          actionError={actionError}
        />
      )}
    </AdminLayout>
  );
}
