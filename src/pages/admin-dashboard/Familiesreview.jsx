import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
} from "react-icons/fi";
import {
  MdOutlineFamilyRestroom,
  MdOutlineCheckCircle,
  MdOutlineCancel,
  MdOutlineVerified,
} from "react-icons/md";
import { HiOutlineIdentification, HiOutlineUsers } from "react-icons/hi2";
import AdminLayout from "./Adminlayout";
import {
  MiniStatCard,
  LoadingState,
  EmptyState,
  ErrorState,
} from "./Adminstates";
import { STATUS_MAP } from "./Adminstates";
import FamilyDetailsModal from "./modals/FamilyDetailsModal";

const cardShadow = "shadow-[0_2px_10px_rgba(31,41,55,0.06)]";
const ITEMS_PER_PAGE = 6;

/* 🧪 بيانات تجريبية — استبدلها لاحقاً بالبيانات القادمة من الـ API */
const MOCK_FAMILIES = [
  {
    id: 1,
    familyNumber: "FAM-2026-0891",
    familyName: "عائلة الأصقاع",
    headName: "سارة عبد العزيز",
    email: "sara.az@email.com",
    phone: "+966 50 123 4567",
    city: "غزة",
    orphansCount: 3,
    addedDate: "12 أكتوبر 2023",
    docsStatus: "موثقة",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    familyNumber: "FAM-2026-0892",
    familyName: "عائلة سليم أحمد",
    headName: "سليم أحمد",
    email: "s.hamdan@email.com",
    phone: "+966 59 000 1234",
    city: "خان يونس",
    orphansCount: 2,
    addedDate: "24 أغسطس 2024",
    docsStatus: "قيد التحقق",
    status: "pending",
    image:
      "https://images.unsplash.com/photo-1509390144018-eeaf65052242?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    familyNumber: "FAM-2026-0893",
    familyName: "عائلة أحمد تمر",
    headName: "أحمد محمود",
    email: "m.mahmoud@email.com",
    phone: "+966 55 987 6543",
    city: "رفح",
    orphansCount: 4,
    addedDate: "5 يوليو 2023",
    docsStatus: "موثقة",
    status: "active",
    image:
      "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    familyNumber: "FAM-2026-0894",
    familyName: "عائلة مريم السعيد",
    headName: "مريم السعيد",
    email: "m.saeed@email.com",
    phone: "+966 56 222 3344",
    city: "دير البلح",
    orphansCount: 1,
    addedDate: "13 أغسطس 2023",
    docsStatus: "غير مكتملة",
    status: "rejected",
    rejectionReason:
      "بيانات الهوية غير مكتملة أو غير واضحة، يرجى إعادة رفع صورة أوضح.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    familyNumber: "FAM-2026-0895",
    familyName: "عائلة بن عبد الله",
    headName: "فؤاد علي",
    email: "f.aoudy@email.com",
    phone: "+966 54 111 8899",
    city: "غزة",
    orphansCount: 5,
    addedDate: "15 يونيو 2023",
    docsStatus: "موثقة",
    status: "suspended",
    image:
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    familyNumber: "FAM-2026-0896",
    familyName: "عائلة أبو فهد",
    headName: "لمياء أبو فهد",
    email: "l.abufahad@email.com",
    phone: "+966 53 444 5566",
    city: "طولكرم",
    orphansCount: 2,
    addedDate: "19 يناير 2024",
    docsStatus: "موثقة",
    status: "hidden",
    image:
      "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?w=400&h=400&fit=crop",
  },
];

function StatusBadge({ status }) {
  const info = STATUS_MAP[status];
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
      <div className="relative h-40 overflow-hidden bg-gray-200">
        <img
          src={family.image}
          alt={family.familyName}
          className="h-full w-full object-cover"
        />
        <div className="absolute right-3 top-3">
          <StatusBadge status={family.status} />
        </div>
      </div>

      <div dir="rtl" className="p-4 text-right">
        <h3 className="mb-1 text-base font-bold text-[#003469]">
          {family.familyName}
        </h3>
        <p className="mb-3 text-xs text-gray-500">{family.headName}</p>

        <div className="mb-4 grid grid-cols-2 gap-2 border-b border-gray-100 pb-3 text-xs text-gray-600">
          <span>
            الأيتام:{" "}
            <strong className="text-[#0D4B8E]">{family.orphansCount}</strong>
          </span>
          <span>
            المدينة: <strong className="text-[#0D4B8E]">{family.city}</strong>
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

/* جدول مصغّر يعرض فقط الطلبات "قيد المراجعة" لتسريع اتخاذ القرار */
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
              <th className="px-6 py-3 font-extrabold">رقم العائلة</th>
              <th className="px-6 py-3 font-extrabold">الاسم</th>
              <th className="px-6 py-3 font-extrabold">التاريخ</th>
              <th className="px-6 py-3 font-extrabold">الحالة</th>
              <th className="px-6 py-3 font-extrabold">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {items.map((f) => (
              <tr key={f.id} className="text-sm">
                <td
                  dir="ltr"
                  className="px-6 py-4 text-left font-mono text-[#6B7280]"
                >
                  {f.familyNumber}
                </td>
                <td className="px-6 py-4 font-bold text-[#1F2937]">
                  {f.familyName}
                </td>
                <td className="px-6 py-4 text-[#6B7280]">{f.addedDate}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={f.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(f)}
                      title="عرض التفاصيل"
                      className="grid h-8 w-8 place-items-center rounded-lg text-[#0D4B8E] hover:bg-[#0D4B8E]/10 transition cursor-pointer"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => onView(f)}
                      title="قبول سريع"
                      className="grid h-8 w-8 place-items-center rounded-lg text-green-600 hover:bg-green-50 transition cursor-pointer"
                    >
                      <MdOutlineCheckCircle />
                    </button>
                    <button
                      onClick={() => onView(f)}
                      title="رفض سريع"
                      className="grid h-8 w-8 place-items-center rounded-lg text-red-600 hover:bg-red-50 transition cursor-pointer"
                    >
                      <MdOutlineCancel />
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
  const [status, setStatus] = useState("loading"); // loading | success | empty | error
  const [families, setFamilies] = useState([]);
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const fetchFamilies = useCallback(async () => {
    setStatus("loading");
    try {
      // TODO: استبدل هذا بنداء API فعلي
      await new Promise((resolve) => setTimeout(resolve, 800));
      const data = MOCK_FAMILIES;
      setFamilies(data);
      setStatus(data.length === 0 ? "empty" : "success");
      setPage(1);
    } catch (err) {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchFamilies();
  }, [fetchFamilies]);

  const filtered = useMemo(() => {
    return families.filter((f) => {
      const matchesSearch =
        !searchTerm ||
        f.familyName.includes(searchTerm) ||
        f.headName.includes(searchTerm) ||
        f.email.includes(searchTerm);
      const matchesStatus = statusFilter === "all" || f.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [families, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const pendingItems = useMemo(
    () => families.filter((f) => f.status === "pending"),
    [families],
  );

  const handleDecision = (family, decisionType, reason) => {
    // TODO: نداء API فعلي حسب decisionType (approve/reject/suspend/hide) مع إرسال reason إذا وجد
    const nextStatusMap = {
      approve: "active",
      reject: "rejected",
      suspend: "suspended",
      hide: "hidden",
    };
    setFamilies((prev) =>
      prev.map((f) =>
        f.id === family.id
          ? {
              ...f,
              status: nextStatusMap[decisionType] || f.status,
              rejectionReason:
                decisionType === "reject" ? reason : f.rejectionReason,
            }
          : f,
      ),
    );
    setSelectedFamily(null);
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
        <span className="font-bold text-[#0D4B8E]">مراجعة العائلات</span>
      </div>

      <h1 className="mb-2 text-xl font-extrabold text-[#0D4B8E] sm:text-2xl">
        مراجعة العائلات
      </h1>
      <p className="mb-6 max-w-2xl text-sm leading-6 text-[#6B7280]">
        راجع طلبات العائلات المسجّلة واتخذ القرار المناسب: قبول، رفض، إيقاف
        مؤقت، أو إخفاء من النظام.
      </p>

      {status === "loading" && <LoadingState count={6} />}

      {status === "error" && <ErrorState onRetry={fetchFamilies} />}

      {status === "empty" && (
        <EmptyState
          icon={MdOutlineFamilyRestroom}
          title="لا توجد عائلات مسجّلة حاليًا"
          description="لم يتم إضافة أي عائلة بعد. بمجرد تسجيل عائلة جديدة ستظهر هنا للمراجعة."
        />
      )}

      {status === "success" && (
        <>
          {/* Mini stats */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MiniStatCard
              label="إجمالي العائلات"
              value={families.length}
              icon={HiOutlineUsers}
              tone="bg-[#0D4B8E]/10 text-[#0D4B8E]"
            />
            <MiniStatCard
              label="عائلات نشطة"
              value={families.filter((f) => f.status === "active").length}
              icon={MdOutlineVerified}
              tone="bg-green-100 text-green-700"
            />
            <MiniStatCard
              label="طلبات قيد المراجعة"
              value={pendingItems.length}
              icon={HiOutlineIdentification}
              tone="bg-[#F0C86A]/50 text-[#B07B11]"
            />
          </div>

          {/* بحث + فلترة */}
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
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  placeholder="ابحث باسم العائلة أو اسم الوصي أو البريد الإلكتروني"
                  className="h-11 w-full rounded-lg border border-[#D0D5DD] bg-[#F8FAFC] pr-10 pl-4 text-sm text-right outline-none focus:border-[#0D4B8E] transition"
                />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                  className="h-11 w-full appearance-none rounded-lg border border-[#D0D5DD] bg-[#F8FAFC] px-4 text-sm text-right outline-none focus:border-[#0D4B8E] transition"
                >
                  <option value="all">كل الحالات</option>
                  <option value="pending">قيد المراجعة</option>
                  <option value="active">معتمدة ونشطة</option>
                  <option value="rejected">تم الرفض</option>
                  <option value="suspended">موقوفة</option>
                  <option value="hidden">مخفية</option>
                </select>
                <FiChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* عدد النتائج */}
          <p dir="rtl" className="mb-4 text-right text-sm text-[#6B7280]">
            عدد النتائج:{" "}
            <strong className="text-[#1F2937]">{filtered.length}</strong>
          </p>

          {/* الشبكة أو حالة عدم وجود نتائج بحث */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={MdOutlineFamilyRestroom}
              title="لا توجد نتائج مطابقة"
              description="جرّب تعديل كلمات البحث أو تغيير فلتر الحالة."
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((family) => (
                  <FamilyCard
                    key={family.id}
                    family={family}
                    onView={setSelectedFamily}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
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
              )}
            </>
          )}

          {/* جدول الطلبات قيد المراجعة */}
          <PendingRequestsTable
            items={pendingItems}
            onView={setSelectedFamily}
          />
        </>
      )}

      {selectedFamily && (
        <FamilyDetailsModal
          family={selectedFamily}
          onClose={() => setSelectedFamily(null)}
          onDecision={handleDecision}
        />
      )}

      <footer className="mt-20 py-2 border-t border-[#E5E7EB] text-center">
        <p className="text-sm text-[#6B7280] mt-4">
          © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
        </p>
      </footer>
    </AdminLayout>
  );
}
