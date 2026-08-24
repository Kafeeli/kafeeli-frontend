import { useCallback, useEffect, useMemo, useState } from "react";
import { MdAccountBalance, MdAccountBalanceWallet } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatAmount, formatDate } from "../sponsor-dashboard/sponsorFlowUtils";
import AdminLayout from "./Adminlayout";
import { ErrorState, LoadingState } from "./Adminstates";

function CandidateDetails({ candidate }) {
  if (!candidate) return null;
  const account = candidate.guardianPayoutAccount;
  return (
    <div className="mt-4 grid gap-4 rounded-xl border border-[#B8CCE0] bg-[#F7FAFD] p-4 text-sm md:grid-cols-2">
      <div>
        <h3 className="font-extrabold text-[#003469]">بيانات الكفالة والوصي</h3>
        <dl className="mt-3 space-y-2 text-gray-600">
          <div><dt className="inline">معرّف الكفالة: </dt><dd dir="ltr" className="inline break-all font-mono text-xs font-bold">{candidate.sponsorshipId}</dd></div>
          <div><dt className="inline">الهدف: </dt><dd className="inline font-bold">{candidate.targetDisplayName || "—"} ({candidate.targetType || "—"})</dd></div>
          <div><dt className="inline">الوصي: </dt><dd className="inline font-bold">{candidate.guardian?.fullName || "—"}</dd></div>
          <div><dt className="inline">البريد: </dt><dd className="inline font-bold">{candidate.guardian?.email || "—"}</dd></div>
          <div><dt className="inline">الهاتف: </dt><dd dir="ltr" className="inline font-bold">{candidate.guardian?.phoneNumber || "—"}</dd></div>
          <div><dt className="inline">المبلغ: </dt><dd className="inline font-bold">{formatAmount(candidate.amount)} {candidate.currency || ""}</dd></div>
          <div><dt className="inline">حالة الكفالة: </dt><dd className="inline font-bold">{candidate.sponsorshipStatus || "—"}</dd></div>
        </dl>
      </div>
      <div>
        <h3 className="flex items-center gap-2 font-extrabold text-[#003469]"><MdAccountBalance />حساب التحويل المعتمد</h3>
        <dl className="mt-3 space-y-2 text-gray-600">
          <div><dt className="inline">البنك: </dt><dd className="inline font-bold">{account?.bankName || "—"}</dd></div>
          <div><dt className="inline">صاحب الحساب: </dt><dd className="inline font-bold">{account?.accountHolderName || "—"}</dd></div>
          <div><dt className="inline">رقم الحساب: </dt><dd dir="ltr" className="inline break-all font-bold">{account?.accountNumber || "—"}</dd></div>
          <div><dt className="inline">IBAN: </dt><dd dir="ltr" className="inline break-all font-bold">{account?.iban || "—"}</dd></div>
          <div><dt className="inline">الفرع: </dt><dd className="inline font-bold">{account?.branchName || "—"}</dd></div>
          <div><dt className="inline">حالة التحقق: </dt><dd className="inline font-bold">{account?.verificationStatus || "—"}</dd></div>
        </dl>
      </div>
    </div>
  );
}

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState([]);
  const [eligibleCandidates, setEligibleCandidates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [reference, setReference] = useState("");
  const [reason, setReason] = useState("");
  const [sponsorshipId, setSponsorshipId] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const selectedCandidate = useMemo(
    () => eligibleCandidates.find((item) => item.sponsorshipId === sponsorshipId) || null,
    [eligibleCandidates, sponsorshipId],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [pendingResult, eligibleResult] = await Promise.all([
        adminApi.getPendingPayouts(),
        adminApi.getEligiblePayouts(),
      ]);
      setPayouts(unwrapResult(pendingResult, "تعذر تحميل التحويلات.") || []);
      setEligibleCandidates(
        unwrapResult(eligibleResult, "تعذر تحميل الكفالات المؤهلة للتحويل.") || [],
      );
    } catch (requestError) {
      setError(apiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = window.setTimeout(load, 0);
    return () => window.clearTimeout(id);
  }, [load]);

  const showDetails = async (payoutId) => {
    setBusy(true);
    setActionError("");
    try {
      setSelected(unwrapResult(await adminApi.getPayoutDetails(payoutId), "تعذر تحميل التفاصيل."));
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  };

  const create = async (event) => {
    event.preventDefault();
    if (!selectedCandidate) {
      setActionError("يرجى اختيار كفالة مؤهلة للتحويل.");
      return;
    }
    setBusy(true);
    setActionError("");
    setSuccessMessage("");
    try {
      const result = await adminApi.createPayout(selectedCandidate.sponsorshipId, notes);
      unwrapResult(result, "تعذر إنشاء التحويل.");
      setSponsorshipId("");
      setNotes("");
      setSelected(null);
      setReference("");
      setReason("");
      await load();
      setSuccessMessage(result?.message || "تم إنشاء التحويل بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  };

  const finish = async (action) => {
    setBusy(true);
    setActionError("");
    setSuccessMessage("");
    try {
      const result = action === "complete"
        ? await adminApi.completePayout(selected.payoutId, reference)
        : await adminApi.failPayout(selected.payoutId, reason);
      unwrapResult(result, "تعذر تحديث التحويل.");
      setSelected(null);
      setReference("");
      setReason("");
      await load();
      setSuccessMessage(result?.message || "تم تحديث التحويل بنجاح.");
    } catch (requestError) {
      setActionError(apiErrorMessage(requestError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AdminLayout title="تحويلات الأوصياء">
      <div className="space-y-6">
        {loading ? <LoadingState /> : error ? <ErrorState onRetry={load} description={error} /> : (
          <>
            <form onSubmit={create} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-2 font-extrabold text-[#003469]"><MdAccountBalanceWallet />الكفالات المؤهلة للتحويل</h2>
              {eligibleCandidates.length === 0 ? (
                <p className="mt-4 rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">لا توجد كفالات مؤهلة لإنشاء تحويل حاليًا.</p>
              ) : (
                <>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                    <select value={sponsorshipId} onChange={(event) => { setSponsorshipId(event.target.value); setActionError(""); setSuccessMessage(""); }} required disabled={busy} className="rounded-lg border border-gray-300 bg-white px-3 py-2">
                      <option value="">اختر كفالة مؤهلة</option>
                      {eligibleCandidates.map((candidate) => (
                        <option key={candidate.sponsorshipId} value={candidate.sponsorshipId}>
                          {candidate.targetDisplayName || "—"} · {candidate.guardian?.fullName || "—"} · {formatAmount(candidate.amount)} {candidate.currency || ""}
                        </option>
                      ))}
                    </select>
                    <input value={notes} onChange={(event) => setNotes(event.target.value)} maxLength={500} disabled={busy} placeholder="ملاحظات اختيارية" className="rounded-lg border border-gray-300 px-3 py-2" />
                    <button disabled={busy || !selectedCandidate} className="rounded-lg bg-[#0D4B8E] px-5 py-2 font-bold text-white disabled:bg-gray-400">{busy ? "جارٍ الإنشاء..." : "إنشاء"}</button>
                  </div>
                  <CandidateDetails candidate={selectedCandidate} />
                </>
              )}
            </form>

            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <section className="space-y-3">
                {payouts.map((payout) => (
                  <button key={payout.payoutId} type="button" disabled={busy} onClick={() => showDetails(payout.payoutId)} className="w-full rounded-xl border border-gray-200 bg-white p-5 text-right shadow-sm disabled:opacity-60">
                    <div className="flex justify-between"><strong>{payout.targetDisplayName || "—"}</strong><span className="text-xs font-bold text-[#0D4B8E]">{payout.payoutStatus || "—"}</span></div>
                    <p className="mt-2 text-sm text-gray-500">{payout.guardian?.fullName || "—"} · {formatAmount(payout.amount)} {payout.currency || ""}</p>
                  </button>
                ))}
                {!payouts.length && <p className="rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">لا توجد تحويلات معلقة.</p>}
              </section>
              <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h2 className="font-extrabold text-[#003469]">تفاصيل التحويل</h2>
                {selected ? <>
                  <dl className="mt-4 space-y-3 text-sm"><div><dt className="text-gray-500">الوصي</dt><dd className="font-bold">{selected.guardian?.fullName || "—"}</dd></div><div><dt className="text-gray-500">المبلغ</dt><dd className="font-bold">{formatAmount(selected.amount)} {selected.currency || ""}</dd></div><div><dt className="text-gray-500">تاريخ الإنشاء</dt><dd className="font-bold">{formatDate(selected.createdAt)}</dd></div></dl>
                  <label className="mt-4 block text-sm font-bold">مرجع التحويل<input value={reference} onChange={(event) => setReference(event.target.value)} maxLength={200} disabled={busy} className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2" /></label>
                  <button type="button" disabled={busy || !reference.trim()} onClick={() => finish("complete")} className="mt-3 w-full rounded-lg bg-[#008C78] px-4 py-2.5 font-bold text-white disabled:bg-gray-400">تسجيل كمكتمل</button>
                  <label className="mt-4 block text-sm font-bold">سبب التعثر<textarea value={reason} onChange={(event) => setReason(event.target.value)} maxLength={500} rows={3} disabled={busy} className="mt-2 w-full rounded-lg border border-gray-300 p-3" /></label>
                  <button type="button" disabled={busy || !reason.trim()} onClick={() => finish("fail")} className="mt-3 w-full rounded-lg bg-red-600 px-4 py-2.5 font-bold text-white disabled:bg-gray-400">تسجيل كمتعثر</button>
                </> : <p className="mt-4 text-sm text-gray-500">اختر تحويلاً لعرض تفاصيله.</p>}
              </aside>
            </div>
          </>
        )}
        {successMessage && <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-bold text-green-700">{successMessage}</p>}
        {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
      </div>
    </AdminLayout>
  );
}
