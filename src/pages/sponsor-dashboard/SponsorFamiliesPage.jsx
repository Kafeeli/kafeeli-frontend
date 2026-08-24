import { useCallback, useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { MdFamilyRestroom } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { sponsorApi } from "../../services/sponsorApi";
import { EmptyState, ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import SponsorFlowLayout from "./SponsorFlowLayout";
import { formatAmount, getApiErrorMessage, getResultData } from "./sponsorFlowUtils";

export default function SponsorFamiliesPage() {
  const navigate = useNavigate();
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadFamilies = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await sponsorApi.getFamilies();
      const data = getResultData(result, "تعذر تحميل العائلات.");
      setFamilies(Array.isArray(data?.families) ? data.families : []);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, "تعذر تحميل العائلات."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadFamilies, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadFamilies]);

  return (
    <SponsorFlowLayout
      title="العائلات المتاحة للكفالة"
      description="تصفح بيانات العائلات المعتمدة والمتاحة للكفلاء."
    >
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState onRetry={loadFamilies} description={error} />
      ) : families.length === 0 ? (
        <EmptyState
          icon={MdFamilyRestroom}
          title="لا توجد عائلات متاحة حاليًا"
          description="ستظهر هنا العائلات التي يتيحها الخادم للكفالة."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family) => (
            <article
              key={family.familyId}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_2px_10px_rgba(31,41,55,0.06)]"
            >
              <div className="flex h-36 items-center justify-center bg-gradient-to-l from-[#E8F1FA] to-[#F8FAFC]">
                <MdFamilyRestroom className="text-7xl text-[#0D4B8E]/70" />
              </div>
              <div className="p-5">
                <h2 className="text-lg font-extrabold text-[#003469]">
                  {family.headOfHouseholdName || "—"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{family.city || "—"}</p>
                <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-gray-600">
                  {family.description || "—"}
                </p>
                <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-600">
                  الاحتياج الشهري: <strong className="text-[#0D4B8E]">{formatAmount(family.monthlyNeedAmount)}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/sponsor/families/${family.familyId}`)}
                  className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#003469] text-sm font-bold text-white transition hover:bg-[#002850]"
                >
                  <FiEye /> عرض التفاصيل
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </SponsorFlowLayout>
  );
}
