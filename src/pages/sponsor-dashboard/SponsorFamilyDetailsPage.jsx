import { useCallback, useEffect, useMemo, useState } from "react";
import { MdFamilyRestroom, MdLocationOn } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { sponsorApi } from "../../services/sponsorApi";
import { sponsorshipApi } from "../../services/sponsorshipApi";
import { ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import SponsorFlowLayout from "./SponsorFlowLayout";
import { formatAmount, formatDate, getApiErrorMessage, getResultData } from "./sponsorFlowUtils";

const MIN_MONTHLY_AMOUNT = 50;
const MAX_MONTHLY_AMOUNT_LABEL = "9999999999999999.99";
const MAX_MONTHLY_AMOUNT = Number(MAX_MONTHLY_AMOUNT_LABEL);
const MIN_MONTHS = 1;
const MAX_MONTHS = 24;

export default function SponsorFamilyDetailsPage() {
  const { familyId } = useParams();
  const navigate = useNavigate();
  const [family, setFamily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [numberOfMonths, setNumberOfMonths] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadFamily = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotFound(false);
    try {
      const result = await sponsorApi.getFamily(familyId);
      const data = getResultData(result, "تعذر تحميل تفاصيل العائلة.");
      if (!data) {
        setNotFound(true);
      } else {
        setFamily(data);
      }
    } catch (requestError) {
      if (requestError?.response?.status === 404) setNotFound(true);
      else setError(getApiErrorMessage(requestError, "تعذر تحميل تفاصيل العائلة."));
    } finally {
      setLoading(false);
    }
  }, [familyId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadFamily, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadFamily]);

  const estimatedTotal = useMemo(() => {
    const amount = Number(monthlyAmount);
    const months = Number(numberOfMonths);
    return amount > 0 && Number.isInteger(months) && months > 0 ? amount * months : null;
  }, [monthlyAmount, numberOfMonths]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = Number(monthlyAmount);
    const months = Number(numberOfMonths);

    if (!Number.isFinite(amount) || amount < MIN_MONTHLY_AMOUNT || amount > MAX_MONTHLY_AMOUNT) {
      setFormError(`يجب أن يكون المبلغ الشهري بين ${MIN_MONTHLY_AMOUNT} و${MAX_MONTHLY_AMOUNT_LABEL}.`);
      return;
    }
    if (!Number.isInteger(months) || months < MIN_MONTHS || months > MAX_MONTHS) {
      setFormError(`يجب أن تكون المدة عددًا صحيحًا من ${MIN_MONTHS} إلى ${MAX_MONTHS} شهرًا.`);
      return;
    }

    setSubmitting(true);
    setFormError("");
    try {
      const result = await sponsorshipApi.create({ familyId, monthlyAmount: amount, numberOfMonths: months });
      const data = getResultData(result, "تعذر إنشاء الكفالة.");
      if (!data?.sponsorshipId) throw new Error("لم يُرجع الخادم معرّف الكفالة.");
      navigate(`/sponsor/sponsorships/${data.sponsorshipId}`);
    } catch (requestError) {
      setFormError(getApiErrorMessage(requestError, "تعذر إنشاء الكفالة."));
    } finally {
      setSubmitting(false);
    }
  };

  let content;
  if (loading) content = <LoadingState count={2} columns="md:grid-cols-2" />;
  else if (notFound) content = <ErrorState onRetry={loadFamily} title="العائلة غير موجودة" description="لم يعثر الخادم على العائلة المطلوبة أو لم تعد متاحة." />;
  else if (error) content = <ErrorState onRetry={loadFamily} description={error} />;
  else if (family) {
    content = (
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4 border-b border-gray-100 pb-5">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#E8F1FA] text-[#0D4B8E]">
              <MdFamilyRestroom className="text-4xl" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#003469]">{family.headOfHouseholdName || "—"}</h2>
              <p className="mt-1 flex items-center gap-1 text-sm text-gray-500"><MdLocationOn /> {family.city || "—"}</p>
            </div>
          </div>
          <h3 className="font-bold text-[#1F2937]">وصف الحالة</h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-600">{family.description || "—"}</p>
          <dl className="mt-6 grid gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
            <div><dt className="text-xs text-gray-500">الاحتياج الشهري</dt><dd className="mt-1 font-bold text-[#0D4B8E]">{formatAmount(family.monthlyNeedAmount)}</dd></div>
            <div><dt className="text-xs text-gray-500">تاريخ إضافة الحالة</dt><dd className="mt-1 font-bold text-gray-700">{formatDate(family.createdAt)}</dd></div>
          </dl>
        </section>

        <form onSubmit={handleSubmit} className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-[#003469]">إنشاء كفالة للعائلة</h2>
          <p className="mt-1 text-sm text-gray-500">أدخل قيمة الكفالة الشهرية ومدتها.</p>
          <label className="mt-5 block text-sm font-bold text-gray-700" htmlFor="monthlyAmount">المبلغ الشهري</label>
          <input id="monthlyAmount" type="number" min={MIN_MONTHLY_AMOUNT} max={MAX_MONTHLY_AMOUNT_LABEL} step="0.01" value={monthlyAmount} onChange={(event) => setMonthlyAmount(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-3 outline-none focus:border-[#0D4B8E]" required />
          <p className="mt-1 text-xs text-gray-500">الحد الأدنى: {MIN_MONTHLY_AMOUNT}</p>
          <label className="mt-4 block text-sm font-bold text-gray-700" htmlFor="numberOfMonths">عدد الأشهر</label>
          <input id="numberOfMonths" type="number" min={MIN_MONTHS} max={MAX_MONTHS} step="1" value={numberOfMonths} onChange={(event) => setNumberOfMonths(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-gray-300 px-3 outline-none focus:border-[#0D4B8E]" required />
          <p className="mt-1 text-xs text-gray-500">من {MIN_MONTHS} إلى {MAX_MONTHS} شهرًا</p>
          <div className="mt-5 rounded-lg bg-[#E8F1FA] p-4 text-sm text-[#003469]">
            الإجمالي التقديري: <strong>{estimatedTotal === null ? "—" : formatAmount(estimatedTotal)}</strong>
            <p className="mt-1 text-xs text-gray-500">القيمة النهائية يحددها الخادم.</p>
          </div>
          {formError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{formError}</p>}
          <button type="submit" disabled={submitting} className="mt-5 h-11 w-full rounded-lg bg-[#D9A441] font-bold text-white transition hover:bg-[#c28f31] disabled:cursor-not-allowed disabled:opacity-60">
            {submitting ? "جارٍ إنشاء الكفالة..." : "تأكيد إنشاء الكفالة"}
          </button>
        </form>
      </div>
    );
  }

  return <SponsorFlowLayout title="تفاصيل العائلة" backTo="/sponsor/families">{content}</SponsorFlowLayout>;
}
