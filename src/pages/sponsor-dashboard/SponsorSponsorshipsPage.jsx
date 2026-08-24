import { useCallback, useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { MdVolunteerActivism } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { sponsorshipApi } from "../../services/sponsorshipApi";
import { EmptyState, ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import SponsorFlowLayout from "./SponsorFlowLayout";
import { formatAmount, formatDate, getApiErrorMessage, getResultData } from "./sponsorFlowUtils";

export default function SponsorSponsorshipsPage() {
  const navigate = useNavigate();
  const [sponsorships, setSponsorships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadSponsorships = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await sponsorshipApi.getMine();
      const data = getResultData(result, "تعذر تحميل كفالاتك.");
      setSponsorships(Array.isArray(data?.sponsorships) ? data.sponsorships : []);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "تعذر تحميل كفالاتك."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadSponsorships, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadSponsorships]);

  return (
    <SponsorFlowLayout title="كفالاتي" description="تابع الكفالات التي أنشأتها وحالتها الحالية.">
      {loading ? <LoadingState /> : error ? <ErrorState onRetry={loadSponsorships} description={error} /> : sponsorships.length === 0 ? (
        <EmptyState icon={MdVolunteerActivism} title="لا توجد كفالات بعد" description="ابدأ بتصفح العائلات المتاحة وأنشئ أول كفالة." />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {sponsorships.map((item) => (
            <article key={item.sponsorshipId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div><h2 className="font-extrabold text-[#003469]">{item.targetDisplayName || "—"}</h2><p className="mt-1 text-sm text-gray-500">{item.targetType || "—"} · {item.targetCity || "—"}</p></div>
                <span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs font-bold text-[#0D4B8E]">{item.statusLabel || "—"}</span>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div><dt className="text-gray-500">المبلغ الشهري</dt><dd className="mt-1 font-bold">{formatAmount(item.monthlyAmount)}</dd></div>
                <div><dt className="text-gray-500">عدد الأشهر</dt><dd className="mt-1 font-bold">{item.numberOfMonths}</dd></div>
                <div><dt className="text-gray-500">الإجمالي</dt><dd className="mt-1 font-bold text-[#D9A441]">{formatAmount(item.totalAmount)}</dd></div>
                <div><dt className="text-gray-500">تاريخ الإنشاء</dt><dd className="mt-1 font-bold">{formatDate(item.createdAt)}</dd></div>
              </dl>
              <button type="button" onClick={() => navigate(`/sponsor/sponsorships/${item.sponsorshipId}`)} className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg border-2 border-[#0D4B8E] text-sm font-bold text-[#0D4B8E] hover:bg-[#0D4B8E] hover:text-white">
                <FiEye /> عرض التفاصيل
              </button>
            </article>
          ))}
        </div>
      )}
    </SponsorFlowLayout>
  );
}
