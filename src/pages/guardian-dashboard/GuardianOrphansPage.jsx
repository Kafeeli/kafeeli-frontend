import { useCallback, useEffect, useState } from "react";
import { MdChildCare } from "react-icons/md";
import { Link } from "react-router-dom";
import { orphanApi } from "../../services/orphanApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { EmptyState, ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import GuardianFlowLayout from "./GuardianFlowLayout";
import { localizeDisplayFields } from "../../utils/localization";

export default function GuardianOrphansPage() {
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const load = useCallback(async () => {
    setLoading(true); setError("");
    try { const data = unwrapResult(await orphanApi.getMine(), "تعذر تحميل الأيتام."); setOrphans((data?.orphans || []).map((item) => localizeDisplayFields(item, ["orphanStatus"]))); }
    catch (requestError) { setError(apiErrorMessage(requestError, "تعذر تحميل الأيتام.")); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { const id = window.setTimeout(load, 0); return () => window.clearTimeout(id); }, [load]);

  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (!orphans.length) content = <EmptyState icon={MdChildCare} title="لا يوجد أيتام مسجلون" description="يمكن إضافة يتيم من صفحة عائلة نشطة." />;
  else content = <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{orphans.map((orphan) => <article key={orphan.orphanId} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"><div className="flex items-start justify-between"><MdChildCare className="text-3xl text-[#0D4B8E]" /><span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs font-bold text-[#0D4B8E]">{orphan.orphanStatus || "—"}</span></div><h2 className="mt-4 text-lg font-extrabold text-[#003469]">{orphan.fullName || "—"}</h2><p className="mt-1 text-sm text-gray-500">{orphan.headOfHouseholdName || "—"}</p><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-gray-500">العمر</dt><dd className="font-bold">{orphan.age}</dd></div><div><dt className="text-gray-500">رقم الهوية</dt><dd className="font-bold">{orphan.maskedNationalId || "—"}</dd></div></dl><Link to={`/guardian/orphans/${orphan.orphanId}`} className="mt-5 block rounded-lg bg-[#0D4B8E] px-4 py-2.5 text-center text-sm font-bold text-white">عرض التفاصيل</Link></article>)}</div>;
  return <GuardianFlowLayout title="الأيتام" description="متابعة حالات الأيتام والوثائق المطلوبة">{content}</GuardianFlowLayout>;
}
