import { useCallback, useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import { adminApi } from "../../services/adminApi";
import { apiErrorMessage, openProtectedBlob, unwrapResult } from "../../utils/apiUi";
import { formatAmount, formatDate } from "../sponsor-dashboard/sponsorFlowUtils";
import AdminLayout from "./Adminlayout";
import { EmptyState, ErrorState, LoadingState } from "./Adminstates";
import { localizeDisplayFields } from "../../utils/localization";

export default function AdminPaymentsReviewPage() {
  const [payments, setPayments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [reason, setReason] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => { setLoading(true); setError(""); try { const items = unwrapResult(await adminApi.getPendingPayments(), "تعذر تحميل المدفوعات.") || []; setPayments(items.map((item) => localizeDisplayFields(item, ["paymentStatus"]))); } catch (requestError) { setError(apiErrorMessage(requestError)); } finally { setLoading(false); } }, []);
  useEffect(() => { const id = window.setTimeout(load, 0); return () => window.clearTimeout(id); }, [load]);
  const showDetails = async (paymentId) => { if (busy) return; setBusy(true); setActionError(""); try { setSelected(localizeDisplayFields(unwrapResult(await adminApi.getPaymentDetails(paymentId), "تعذر تحميل تفاصيل الدفعة."), ["paymentStatus"])); } catch (requestError) { setActionError(apiErrorMessage(requestError)); } finally { setBusy(false); } };
  const viewProof = async () => { if (busy || !selected) return; setBusy(true); setActionError(""); try { openProtectedBlob(await adminApi.getPaymentProof(selected.paymentId)); } catch (requestError) { setActionError(apiErrorMessage(requestError, "تعذر فتح إثبات الدفع.")); } finally { setBusy(false); } };
  const review = async (action) => { if (busy || !selected || (action === "reject" && !reason.trim())) return; setBusy(true); setActionError(""); try { const result = action === "approve" ? await adminApi.approvePayment(selected.paymentId) : await adminApi.rejectPayment(selected.paymentId, reason.trim()); unwrapResult(result, "تعذر مراجعة الدفعة."); setSelected(null); setReason(""); await load(); } catch (requestError) { setActionError(apiErrorMessage(requestError)); } finally { setBusy(false); } };
  let content;
  if (loading) content = <LoadingState />;
  else if (error) content = <ErrorState onRetry={load} description={error} />;
  else if (!payments.length) content = <EmptyState icon={MdPayments} title="لا توجد مدفوعات معلقة" description="لا توجد إثباتات دفع بانتظار المراجعة." />;
  else content = <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]"><div className="space-y-3">{payments.map((payment) => <button key={payment.paymentId} type="button" disabled={busy} onClick={() => showDetails(payment.paymentId)} className="w-full rounded-xl border border-gray-200 bg-white p-5 text-right shadow-sm hover:border-[#0D4B8E] disabled:opacity-60"><div className="flex justify-between gap-3"><strong>{payment.sponsorFullName || "—"}</strong><span className="rounded-full bg-[#FFF4D6] px-3 py-1 text-xs font-bold text-[#8A641A]">{payment.paymentStatus || "—"}</span></div><p className="mt-2 text-sm text-gray-500">{payment.targetDisplayName || "—"} · {formatAmount(payment.amount)} {payment.currency || ""}</p></button>)}</div><aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold text-[#003469]">تفاصيل مراجعة التحويل البنكي</h2>{selected ? <><dl className="mt-4 grid gap-3 text-sm"><div><dt className="text-gray-500">الكفيل</dt><dd className="font-bold">{selected.sponsor?.fullName || "—"}</dd></div><div><dt className="text-gray-500">الحالة</dt><dd className="font-bold">{selected.paymentStatus || "—"}</dd></div><div><dt className="text-gray-500">المبلغ</dt><dd className="font-bold">{formatAmount(selected.amount)} {selected.currency || ""}</dd></div><div><dt className="text-gray-500">مرجع التحويل</dt><dd className="font-bold">{selected.transferReference || "—"}</dd></div><div><dt className="text-gray-500">تاريخ الإرسال</dt><dd className="font-bold">{formatDate(selected.submittedAt)}</dd></div></dl>{selected.hasPaymentProof && <button type="button" disabled={busy} onClick={viewProof} className="mt-4 w-full rounded-lg bg-[#E8F1FA] px-4 py-2.5 text-sm font-bold text-[#0D4B8E] disabled:opacity-60">عرض إثبات الدفع</button>}<label className="mt-4 block text-sm font-bold">سبب الرفض<textarea value={reason} maxLength={500} disabled={busy} onChange={(event) => setReason(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-gray-300 p-3 disabled:bg-gray-100" /></label><div className="mt-4 grid grid-cols-2 gap-3"><button type="button" disabled={busy} onClick={() => review("approve")} className="rounded-lg bg-[#008C78] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">اعتماد</button><button type="button" disabled={busy || !reason.trim()} onClick={() => review("reject")} className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-bold text-white disabled:bg-gray-400">رفض</button></div></> : <p className="mt-4 text-sm text-gray-500">اختر دفعة لعرض تفاصيلها.</p>}{actionError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{actionError}</p>}</aside></div>;
  return <AdminLayout title="مراجعة المدفوعات">{content}</AdminLayout>;
}
