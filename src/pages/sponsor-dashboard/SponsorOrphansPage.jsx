import { useCallback, useEffect, useState } from "react";
import { MdChildCare } from "react-icons/md";
import { Link } from "react-router-dom";
import { sponsorApi } from "../../services/sponsorApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { EmptyState, ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import SponsorFlowLayout from "./SponsorFlowLayout";
import { formatAmount } from "./sponsorFlowUtils";
import SponsorOrphanProfileImage from "../../components/sponsor/SponsorOrphanProfileImage";

export default function SponsorOrphansPage() {
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = unwrapResult(await sponsorApi.getOrphans(), "تعذر تحميل الأيتام.");
      setOrphans(data?.orphans || []);
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل الأيتام."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(load, 0);
    return () => window.clearTimeout(timeoutId);
  }, [load]);

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (orphans.length === 0) content = <EmptyState icon={MdChildCare} title="لا توجد حالات أيتام متاحة" description="لا يعرض الخادم حالات متاحة للكفالة حاليًا." />;
  else content = (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {orphans.map((orphan) => (
        <article key={orphan.orphanId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <SponsorOrphanProfileImage orphan={orphan} />
            {orphan.sponsorshipBadge && <span className="rounded-full bg-[#FFF4D6] px-3 py-1 text-xs font-bold text-[#8A641A]">{orphan.sponsorshipBadge}</span>}
          </div>
          <h2 className="mt-4 text-lg font-extrabold text-[#003469]">{orphan.displayName || "—"}</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-gray-500">العمر</dt><dd className="font-bold">{orphan.age}</dd></div><div><dt className="text-gray-500">الجنس</dt><dd className="font-bold">{orphan.gender || "—"}</dd></div><div><dt className="text-gray-500">المدينة</dt><dd className="font-bold">{orphan.city || "—"}</dd></div><div><dt className="text-gray-500">الاحتياج الشهري</dt><dd className="font-bold">{formatAmount(orphan.monthlyNeedAmount)}</dd></div></dl>
          <Link to={`/sponsor/orphans/${orphan.orphanId}`} className="mt-5 block rounded-lg bg-[#0D4B8E] px-4 py-2.5 text-center text-sm font-bold text-white hover:bg-[#003469]">عرض التفاصيل</Link>
        </article>
      ))}
    </div>
  );

  return <SponsorFlowLayout title="الأيتام المتاحون للكفالة" description="بيانات آمنة يعرضها الخادم للكفيل">{content}</SponsorFlowLayout>;
}
