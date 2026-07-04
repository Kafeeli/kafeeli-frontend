import { motion } from "framer-motion";
import {
  FiBell,
  FiCheckCircle,
  FiClock,
  FiShield,
  FiUser,
} from "react-icons/fi";
import {
  HiOutlineBuildingLibrary,
  HiOutlineDocumentText,
  HiOutlineIdentification,
  HiOutlineUsers,
} from "react-icons/hi2";
import {
  MdDashboard,
  MdOutlineFamilyRestroom,
  MdOutlineVolunteerActivism,
} from "react-icons/md";
import { PiBaby, PiFileText, PiMoneyWavy, PiUsersThree } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "./sideBar";

const cardShadow = "shadow-[0_2px_10px_rgba(31,41,55,0.06)]";

const overviewCards = [
  {
    title: "إجمالي الأوصياء",
    value: "1,284",
    icon: HiOutlineIdentification,
    tone: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
  },
  {
    title: "إجمالي الكفلاء",
    value: "3,542",
    icon: MdOutlineVolunteerActivism,
    tone: "bg-[#7DDCE0] text-[#0F8E94]",
  },
  {
    title: "مراجعة المستندات",
    value: "42 معلق",
    icon: HiOutlineDocumentText,
    tone: "bg-[#F0C86A]/50 text-[#B07B11]",
    warning: true,
  },
  {
    title: "عائلات قيد المراجعة",
    value: "15 حالة",
    icon: PiUsersThree,
    tone: "bg-[#F0C86A]/50 text-[#B07B11]",
    warning: true,
  },
  {
    title: "أيتام قيد المراجعة",
    value: "28 معلق",
    icon: PiBaby,
    tone: "bg-[#F0C86A]/50 text-[#B07B11]",
    warning: true,
  },
  {
    title: "مدفوعات قيد التأكيد",
    value: "10 عمليات",
    icon: PiMoneyWavy,
    tone: "bg-[#F0C86A]/50 text-[#B07B11]",
    warning: true,
  },
];

const queues = [
  {
    title: "وثائق الأوصياء",
    subtitle: "التحقق من الهوية وشهادات الوفاة",
    count: "42",
    meta: "طلب جديد",
    icon: FiShield,
    iconTone: "bg-[#0D4B8E]/10 text-[#0D4B8E]",
  },
  {
    title: "الحسابات البنكية",
    subtitle: "مطابقة بيانات IBAN والتحقق البنكي",
    count: "08",
    meta: "قيد التدقيق",
    icon: HiOutlineBuildingLibrary,
    iconTone: "bg-[#7DDCE0]/30 text-[#0F8E94]",
  },
  {
    title: "التحديثات الدورية",
    subtitle: "التقارير الصحية والدراسية للأيتام",
    count: "56",
    meta: "تحتاج مراجعة",
    icon: TbReportAnalytics,
    iconTone: "bg-[#F0C86A]/30 text-[#B07B11]",
  },
];

const quickActions = [
  { label: "مراجعة الوثائق", icon: PiFileText },
  { label: "مراجعة العائلات", icon: PiUsersThree },
  { label: "مراجعة الأيتام", icon: PiBaby },
  { label: "تأكيد المدفوعات", icon: PiMoneyWavy },
  { label: "سجلات النظام", icon: FiClock },
  { label: "إدارة المشرفين (SuperAdmin)", icon: FiShield, featured: true },
];

const logs = [
  {
    manager: "أحمد سامي",
    avatar: "AS",
    event: 'تم قبول وثائق الوصي "سارة محمود"',
    time: "اليوم، 10:45 ص",
    status: "مكتمل",
    statusClass: "bg-[#22C55E]/15 text-green-700",
  },
  {
    manager: "خالد محمود",
    avatar: "KM",
    event: "تم رفض عملية دفع (طلب رقم #12402)",
    time: "اليوم، 09:12 ص",
    status: "مرفوض",
    statusClass: "bg-[#EF4444]/15 text-red-700",
  },
  {
    manager: "محمد علي",
    avatar: "MA",
    event: 'تحديث بيانات اليتيم "عمر يوسف"',
    time: "أمس، 04:30 م",
    status: "تعديل",
    statusClass: "bg-[#2DBCC3]/20 text-[#0F8E94]",
  },
];

function SectionTitle({ children }) {
  return (
    <h3 className="mb-6 text-right text-lg font-extrabold text-[#08386B]">
      {children}
    </h3>
  );
}

function StatCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`relative flex min-h-[162px] flex-col items-center justify-center rounded-lg border bg-white p-5 text-center ${cardShadow} ${
        card.warning ? "border-[#F0C86A]" : "border-[#E5E7EB]"
      }`}
    >
      {card.warning && (
        <span className="absolute right-6 top-9 h-2.5 w-2.5 rounded-full bg-[#B07B11]" />
      )}
      <div
        className={`mb-5 grid h-10 w-10 place-items-center rounded-md ${card.tone}`}
      >
        <card.icon className="text-2xl" />
      </div>
      <p className="mb-2 text-[15px] leading-6 text-[#6B7280]">{card.title}</p>
      <strong className="text-lg font-extrabold text-[#1F2937]">
        {card.value}
      </strong>
    </motion.div>
  );
}

function QueueCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-lg border border-gray-300 bg-white p-6 ${cardShadow}`}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="text-right">
          <h4 className="text-xl font-extrabold text-[#1F2937]">
            {item.title}
          </h4>
          <p className="mt-1 text-sm text-[#6B7280]">{item.subtitle}</p>
        </div>
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${item.iconTone}`}
        >
          <item.icon className="text-2xl" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-end gap-3">
          <span className="text-sm text-[#6B7280]">{item.meta}</span>
          <strong className="text-3xl font-extrabold text-[#1F2937]">
            {item.count}
          </strong>
        </div>
        <button className="rounded-md bg-[#0D4B8E] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#08386B] cursor-pointer">
          عرض التفاصيل
        </button>
      </div>
    </motion.article>
  );
}

function FamilyCard() {
  return (
    <article
      className={`rounded-lg border border-gray-300 bg-white p-6 ${cardShadow}`}
    >
      <div className="mb-7 flex items-start justify-between gap-4">
        <div className="text-right">
          <h4 className="text-xl font-extrabold text-[#1F2937]">
            ملفات العائلات
          </h4>
          <p className="mt-1 text-sm text-[#6B7280]">
            مراجعة الوضع الاجتماعي والاقتصادي الشامل
          </p>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-full bg-gray-200 text-[#1F2937]">
          <HiOutlineUsers className="text-2xl" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex -space-x space-x-reverse">
          {["GA", "SK", "+12"].map((label, index) => (
            <span
              key={label}
              className={`grid h-8 w-8 place-items-center rounded-full border-2 border-white text-[10px] font-bold ${
                index === 2
                  ? "bg-[#0D4B8E] text-white"
                  : "bg-gray-200 text-[#6B7280]"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <button className="rounded-md border-2 border-[#0D4B8E] px-7 py-2.5 text-sm font-extrabold text-[#0D4B8E] transition hover:bg-[#0D4B8E] hover:text-white cursor-pointer">
          عرض القائمة
        </button>
      </div>
    </article>
  );
}

function EmptyCard() {
  return (
    <div className="grid min-h-[176px] place-items-center rounded-lg border border-dashed border-gray-300 bg-white/40 p-6 text-center">
      <div>
        <FiCheckCircle className="mx-auto mb-4 text-4xl text-gray-400" />
        <h4 className="text-lg font-extrabold text-[#1F2937]">
          لا توجد طلبات أيتام معلقة
        </h4>
        <p className="mt-2 text-sm text-gray-400">
          تم إكمال مراجعة كافة ملفات الأيتام المسجلة حالياً
        </p>
      </div>
    </div>
  );
}

function QuickActions() {
  return (
    <section className="mt-20">
      <SectionTitle>الإجراءات السريعة</SectionTitle>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className={`flex min-h-12 items-center justify-center gap-3 rounded-lg border px-5 py-3 text-base font-extrabold cursor-pointer ${cardShadow} transition ${
              action.featured
                ? "border-[#2DBCC3] bg-[#7DDCE0] text-[#08386B] hover:bg-[#2DBCC3]"
                : "border-gray-300 bg-white text-[#1F2937] hover:border-[#0D4B8E] hover:text-[#0D4B8E]"
            } ${action.featured ? "sm:col-span-2 lg:col-start-2" : ""}`}
          >
            <span>{action.label}</span>
            <action.icon className="text-2xl text-[#0D4B8E]" />
          </button>
        ))}
      </div>
    </section>
  );
}

function LogsTable() {
  return (
    <section
      className={`mt-20 overflow-hidden rounded-lg border border-gray-300 bg-white ${cardShadow}`}
    >
      <div className="flex items-center justify-between px-6 py-6">
        <button className="font-extrabold text-[#08386B] transition hover:text-[#0D4B8E]">
          تحميل التقرير الكامل
        </button>
        <h3 className="text-lg font-extrabold text-[#08386B]">
          آخر سجلات النظام
        </h3>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[760px] text-right">
          <thead className="bg-gray-100 text-sm text-[#1F2937]">
            <tr>
              <th className="px-6 py-4 font-extrabold">المدير</th>
              <th className="px-6 py-4 font-extrabold">الحدث</th>
              <th className="px-6 py-4 font-extrabold">التوقيت</th>
              <th className="px-6 py-4 font-extrabold">الحالة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {logs.map((log) => (
              <tr key={log.event} className="text-sm">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-[#0D4B8E]/10 text-xs font-extrabold text-[#0D4B8E]">
                      {log.avatar}
                    </span>
                    <strong className="whitespace-nowrap text-base text-[#1F2937]">
                      {log.manager}
                    </strong>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#1F2937]">{log.event}</td>
                <td className="px-6 py-5 text-[#6B7280]">{log.time}</td>
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex rounded-full px-4 py-1.5 text-sm font-extrabold ${log.statusClass}`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]" dir="rtl">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpen={() => setSidebarOpen(true)}
      />
      {/* Main */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Header */}
        <header className="h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 bg-white border-b border-[#E5E7EB] sticky top-0 z-20">
          <button
            className="lg:hidden grid h-9 w-9 place-items-center rounded-full hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu className="text-xl text-[#0D4B8E]" />
          </button>

          <h2 className="text-[12px] sm:text-lg font-bold text-[#0D4B8E] truncate">
            اهلاً بك Admin في لوحة التحكم
          </h2>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full hover:bg-gray-100">
              <FiBell className="text-lg sm:text-xl" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </button>
            <div className="hidden sm:block text-right">
              <p className="font-bold text-sm">أحمد محمد</p>
              <p className="text-xs text-gray-500">مدير النظام الأعلى</p>
            </div>
            <div className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border rounded-full border-[#0D4B8E]">
              <FiUser />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0D4B8E]">
              نظرة عامة على النظام
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              آخر تحديث: منذ دقيقتين
            </p>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 sm:gap-6">
            {overviewCards.map((card, index) => (
              <StatCard key={card.title} card={card} index={index} />
            ))}
          </section>

          <section className="mt-10">
            <SectionTitle>طوابير المراجعة النشطة</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {queues.map((item, index) => (
                <QueueCard key={item.title} item={item} index={index} />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FamilyCard />
              <EmptyCard />
            </div>
          </section>

          <QuickActions />
          <LogsTable />

          <footer className="mt-20 py-2 border-t border-[#E5E7EB] text-center">
            <p className="text-sm text-[#6B7280] mt-4">
              © 2026 كفيلي - منصة رعاية الأيتام . جميع الحقوق محفوظة
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
