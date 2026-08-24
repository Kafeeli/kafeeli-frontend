import { useCallback, useEffect, useState } from "react";
import { MdChildCare } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { sponsorApi } from "../../services/sponsorApi";
import { sponsorshipApi } from "../../services/sponsorshipApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import SponsorFlowLayout from "./SponsorFlowLayout";
import { formatAmount } from "./sponsorFlowUtils";

export default function SponsorOrphanDetailsPage() {
  const { orphanId } = useParams();
  const navigate = useNavigate();
  const [orphan, setOrphan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [numberOfMonths, setNumberOfMonths] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = unwrapResult(await sponsorApi.getOrphan(orphanId), "تعذر تحميل تفاصيل اليتيم.");
      setOrphan(data);
      setMonthlyAmount(String(data.monthlyNeedAmount ?? ""));
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل تفاصيل اليتيم."));
    } finally { setLoading(false); }
  }, [orphanId]);

  useEffect(() => { const id = window.setTimeout(load, 0); return () => window.clearTimeout(id); }, [load]);

  useEffect(() => {
    if (!orphan?.hasProfileImage || !orphan.canAccessProfileImage) return undefined;
    let objectUrl = "";
    let active = true;
    sponsorApi.getOrphanProfileImage(orphanId).then((blob) => {
      objectUrl = URL.createObjectURL(blob);
      if (active) setImageUrl(objectUrl);
    }).catch(() => {});
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [orphan?.canAccessProfileImage, orphan?.hasProfileImage, orphanId]);

  const createSponsorship = async (event) => {
    event.preventDefault();
    setSubmitting(true); setActionError("");
    try {
      const data = unwrapResult(await sponsorshipApi.create({ orphanId, monthlyAmount: Number(monthlyAmount), numberOfMonths: Number(numberOfMonths) }), "تعذر إنشاء الكفالة.");
      navigate(`/sponsor/sponsorships/${data.sponsorshipId}`);
    } catch (requestError) { setActionError(apiErrorMessage(requestError, "تعذر إنشاء الكفالة.")); }
    finally { setSubmitting(false); }
  };

  let content;
  if (loading) content = <LoadingState count={2} columns="md:grid-cols-2" />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (orphan) content = (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">{imageUrl ? <img src={imageUrl} alt={orphan.displayName || "صورة اليتيم"} className="h-16 w-16 rounded-full object-cover" /> : <div className="grid h-14 w-14 place-items-center rounded-full bg-[#E8F1FA] text-[#0D4B8E]"><MdChildCare className="text-3xl" /></div>}<div><h2 className="text-xl font-extrabold text-[#003469]">{orphan.displayName || "—"}</h2><p className="text-sm text-gray-500">{orphan.city || "—"}</p></div></div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2"><div><dt className="text-sm text-gray-500">العمر</dt><dd className="font-bold">{orphan.age}</dd></div><div><dt className="text-sm text-gray-500">الجنس</dt><dd className="font-bold">{orphan.gender || "—"}</dd></div><div><dt className="text-sm text-gray-500">الحالة التعليمية</dt><dd className="font-bold">{orphan.educationalStatus || "—"}</dd></div><div><dt className="text-sm text-gray-500">الاحتياج الشهري</dt><dd className="font-bold text-[#D9A441]">{formatAmount(orphan.monthlyNeedAmount)}</dd></div></dl>
        <p className="mt-5 rounded-lg bg-gray-50 p-4 text-sm leading-7 text-gray-700">{orphan.caseDescription || "—"}</p>
      </section>
      <form onSubmit={createSponsorship} className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-extrabold text-[#003469]">إنشاء كفالة</h2>
        <label className="mt-4 block text-sm font-bold">المبلغ الشهري<input type="number" step="0.01" required value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
        <label className="mt-4 block text-sm font-bold">عدد الأشهر<input type="number" required value={numberOfMonths} onChange={(e) => setNumberOfMonths(e.target.value)} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
        {orphan.isSponsored && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">{orphan.sponsorshipBadge || "هذه الحالة مكفولة حاليًا."}</p>}
        {actionError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
        <button disabled={submitting || orphan.isSponsored} className="mt-5 w-full rounded-lg bg-[#0D4B8E] px-4 py-3 font-bold text-white disabled:bg-gray-400">{submitting ? "جارٍ الإنشاء..." : "بدء الكفالة"}</button>
      </form>
    </div>
  );
  return <SponsorFlowLayout title="تفاصيل اليتيم" backTo="/sponsor/orphans">{content}</SponsorFlowLayout>;
}
