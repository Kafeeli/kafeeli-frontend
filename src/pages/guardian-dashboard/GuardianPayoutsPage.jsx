import { useCallback, useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import { payoutApi } from "../../services/payoutApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../admin-dashboard/Adminstates";
import {
  formatAmount,
  formatDate,
} from "../sponsor-dashboard/sponsorFlowUtils";
import GuardianFlowLayout from "./GuardianFlowLayout";
import { localizeDisplayFields } from "../../utils/localization";

export default function GuardianPayoutsPage() {
  const [payouts, setPayouts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detailError, setDetailError] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const items =
        unwrapResult(await payoutApi.getMine(), "تعذر تحميل التحويلات.") || [];
      setPayouts(
        items.map((item) => localizeDisplayFields(item, ["payoutStatus"])),
      );
    } catch (requestError) {
      setError(apiErrorMessage(requestError, "تعذر تحميل التحويلات."));
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const id = window.setTimeout(load, 0);
    return () => window.clearTimeout(id);
  }, [load]);
  const showDetails = async (payoutId) => {
    setDetailError("");
    try {
      setSelected(
        localizeDisplayFields(
          unwrapResult(
            await payoutApi.getMineById(payoutId),
            "تعذر تحميل تفاصيل التحويل.",
          ),
          ["payoutStatus"],
        ),
      );
    } catch (requestError) {
      setDetailError(
        apiErrorMessage(requestError, "تعذر تحميل تفاصيل التحويل."),
      );
    }
  };
  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (!payouts.length)
    content = (
      <EmptyState
        icon={MdPayments}
        title="لا توجد دفعات"
        description="لم يسجل الخادم دفعات خاصة بك حتى الآن."
      />
    );
  else
    content = (
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-3">
          {payouts.map((payout) => (
            <button
              key={payout.payoutId}
              type="button"
              onClick={() => showDetails(payout.payoutId)}
              className="w-full rounded-xl border border-gray-200 bg-white p-5 text-right shadow-sm hover:border-[#0D4B8E]"
            >
              <div className="flex justify-between gap-3">
                <strong className="text-[#003469]">
                  {payout.targetDisplayName || "—"}
                </strong>
                <span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs font-bold text-[#0D4B8E]">
                  {payout.payoutStatus || "—"}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {formatAmount(payout.amount)} {payout.currency || ""}
              </p>
            </button>
          ))}
        </div>
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="font-extrabold text-[#003469]">تفاصيل الدفعة</h2>
          {detailError && (
            <p className="mt-3 text-sm text-red-600">{detailError}</p>
          )}
          {selected ? (
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">الحالة</dt>
                <dd className="font-bold">{selected.payoutStatus || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">المبلغ</dt>
                <dd className="font-bold">
                  {formatAmount(selected.amount)} {selected.currency || ""}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">مرجع التحويل</dt>
                <dd className="font-bold">
                  {selected.transferReference || "—"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">التاريخ</dt>
                <dd className="font-bold">{formatDate(selected.createdAt)}</dd>
              </div>
              {selected.failureReason && (
                <div>
                  <dt className="text-gray-500">سبب التعثر</dt>
                  <dd className="font-bold text-red-700">
                    {selected.failureReason}
                  </dd>
                </div>
              )}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              اختر دفعة لعرض تفاصيلها.
            </p>
          )}
        </aside>
      </div>
    );
  return (
    <GuardianFlowLayout title="الدفعات" description="سجل الدفعات المحولة إليك">
      {content}
    </GuardianFlowLayout>
  );
}
