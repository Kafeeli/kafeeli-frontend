import { useCallback, useEffect, useMemo, useState } from "react";
import { MdAccountBalance, MdAccountBalanceWallet } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import useDebouncedValue from "../../hooks/useDebouncedValue";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, unwrapResult } from "../../utils/apiUi";
import { formatAmount, formatDate } from "../sponsor-dashboard/sponsorFlowUtils";
import AdminLayout from "./Adminlayout";
import { ErrorState, LoadingState } from "./Adminstates";
import { localizeDisplayFields } from "../../utils/localization";
import { emptyPagedData, normalizePagedData } from "../../utils/adminPagination";
import AdminPagination from "./AdminPagination";

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
  const [searchInput, setSearchInput] = useState("");
  const search = useDebouncedValue(searchInput.trim());
  const [guardianId, setGuardianId] = useState("");
  const [sponsorId, setSponsorId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [filterSponsorshipId, setFilterSponsorshipId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [pagination, setPagination] = useState(emptyPagedData);

  const selectedCandidate = useMemo(
    () => eligibleCandidates.find((item) => item.sponsorshipId === sponsorshipId) || null,
    [eligibleCandidates, sponsorshipId],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const query = { page, pageSize, search, guardianId, sponsorId, sponsorshipId: filterSponsorshipId, minAmount, maxAmount, dateFrom, dateTo };
      const [pendingResult, eligibleResult] = await Promise.all([
        adminApi.getPendingPayouts(query),
        adminApi.getEligiblePayouts({ page: 1, pageSize: 100, search }),
      ]);
      const normalizedPending = normalizePagedData(unwrapResult(pendingResult, "تعذر تحميل التحويلات."), query);
      setPayouts(normalizedPending.items.map((item) => localizeDisplayFields(item, ["payoutStatus"])));
      setPagination(normalizedPending);
      const normalizedEligible = normalizePagedData(unwrapResult(eligibleResult, "تعذر تحميل الكفالات المؤهلة للتحويل."), { pageSize: 100 });
      setEligibleCandidates(
        normalizedEligible.items.map((item) => ({
          ...localizeDisplayFields(item, ["sponsorshipStatus", "targetType"]),
          guardianPayoutAccount: localizeDisplayFields(item.guardianPayoutAccount, ["verificationStatus"]),
        })),
      );
    } catch (requestError) {
      setError(apiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo, filterSponsorshipId, guardianId, maxAmount, minAmount, page, pageSize, search, sponsorId]);

  useEffect(() => {
    const id = window.setTimeout(load, 0);
    return () => window.clearTimeout(id);
  }, [load]);

  const showDetails = async (payoutId) => {
    setBusy(true);
    setActionError("");
    try {
      setSelected(localizeDisplayFields(unwrapResult(await adminApi.getPayoutDetails(payoutId), "تعذر تحميل التفاصيل."), ["payoutStatus"]));
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
            <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-5">
              <label className="relative sm:col-span-2"><FiSearch className="absolute right-3 top-3 text-gray-400" /><input value={searchInput} onChange={(event) => { setSearchInput(event.target.value); setPage(1); }} placeholder="ابحث في دفعات الأوصياء" aria-label="البحث في الدفعات" className="w-full rounded-lg border border-gray-300 py-2.5 pr-10 pl-3 text-sm" /></label>
              <input value={guardianId} onChange={(event) => { setGuardianId(event.target.value); setPage(1); }} placeholder="معرّف الوصي" aria-label="معرّف الوصي" dir="ltr" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
              <input value={sponsorId} onChange={(event) => { setSponsorId(event.target.value); setPage(1); }} placeholder="معرّف الكفيل" aria-label="معرّف الكفيل" dir="ltr" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
              <input value={filterSponsorshipId} onChange={(event) => { setFilterSponsorshipId(event.target.value); setPage(1); }} placeholder="معرّف الكفالة" aria-label="معرّف الكفالة" dir="ltr" className="rounded-lg border border-gray-300 px-3 py-2.5 text-sm" />
              <div className="grid grid-cols-2 gap-2"><input type="number" min="0" value={minAmount} onChange={(event) => { setMinAmount(event.target.value); setPage(1); }} placeholder="أدنى مبلغ" aria-label="أدنى مبلغ" className="min-w-0 rounded-lg border border-gray-300 px-2 py-2.5 text-sm" /><input type="number" min="0" value={maxAmount} onChange={(event) => { setMaxAmount(event.target.value); setPage(1); }} placeholder="أعلى مبلغ" aria-label="أعلى مبلغ" className="min-w-0 rounded-lg border border-gray-300 px-2 py-2.5 text-sm" /></div>
              <label className="text-xs font-bold text-gray-600">من تاريخ<input type="datetime-local" value={dateFrom} onChange={(event) => { setDateFrom(event.target.value); setPage(1); }} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
              <label className="text-xs font-bold text-gray-600">إلى تاريخ<input type="datetime-local" value={dateTo} onChange={(event) => { setDateTo(event.target.value); setPage(1); }} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" /></label>
            </div>
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
            <AdminPagination pagination={pagination} onPageChange={setPage} onPageSizeChange={(value) => { setPageSize(value); setPage(1); }} />
          </>
        )}
        {successMessage && <p role="status" className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-bold text-green-700">{successMessage}</p>}
        {actionError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}
      </div>
    </AdminLayout>
  );
}
