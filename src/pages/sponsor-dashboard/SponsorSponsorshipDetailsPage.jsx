import { useCallback, useEffect, useState } from "react";
import {
  MdAccountBalance,
  MdCloudUpload,
  MdInfoOutline,
  MdVolunteerActivism,
} from "react-icons/md";
import { useParams } from "react-router-dom";
import { sponsorshipApi } from "../../services/sponsorshipApi";
import { ErrorState, LoadingState } from "../admin-dashboard/Adminstates";
import SponsorFlowLayout from "./SponsorFlowLayout";
import {
  formatAmount,
  formatDate,
  getApiErrorMessage,
  getResultData,
} from "./sponsorFlowUtils";
import { localizeStatus } from "../../utils/localization";

const MAX_PAYMENT_PROOF_SIZE = 5 * 1024 * 1024;
const PAYMENT_PROOF_ACCEPT =
  ".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf";
const ALLOWED_PAYMENT_PROOF_EXTENSIONS = ["jpg", "jpeg", "png", "pdf"];
const ALLOWED_PAYMENT_PROOF_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];
const FIXED_BANK_NAME_AR = "بنك فلسطين";
const FIXED_BANK_NAME_EN = "Bank of Palestine";
const FIXED_TRANSFER_NUMBER = "0593205914";
const FIXED_ACCOUNT_HOLDER = "Kafeeli Test Account";
const FIXED_IBAN = "PS00KAFEELI000000000000000000";
const FIXED_CURRENCY = "ILS";

function validatePaymentProof(file) {
  if (!file) return "يرجى اختيار ملف إثبات الدفع.";

  const extension = file.name.split(".").pop()?.toLowerCase();
  const hasAllowedExtension =
    ALLOWED_PAYMENT_PROOF_EXTENSIONS.includes(extension);
  const hasAllowedMimeType = ALLOWED_PAYMENT_PROOF_MIME_TYPES.includes(
    file.type,
  );

  if (!hasAllowedExtension && !hasAllowedMimeType) {
    return "صيغة الملف غير مدعومة. الصيغ المقبولة: JPG وJPEG وPNG وPDF.";
  }

  if (file.size > MAX_PAYMENT_PROOF_SIZE) {
    return "حجم الملف يتجاوز الحد الأقصى المسموح به وهو 5 ميجابايت.";
  }

  return "";
}

function getPaymentProofErrorMessage(error) {
  const body = error?.response?.data;
  const errors = Array.isArray(body?.errors) ? body.errors.filter(Boolean) : [];
  const serverMessage = body?.message || errors.join(" - ");
  if (serverMessage) return serverMessage;

  if (!error?.response && error?.message) return error.message;

  switch (error?.response?.status) {
    case 400:
      return "ملف إثبات الدفع غير صالح أو أن الطلب لا يطابق متطلبات الخادم.";
    case 401:
      return "انتهت صلاحية الجلسة. يرجى تسجيل الدخول والمحاولة مرة أخرى.";
    case 403:
      return "لا تملك صلاحية رفع إثبات دفع لهذه الكفالة.";
    case 404:
      return "لم يتم العثور على الكفالة المطلوبة.";
    case 409:
      return "لا يمكن رفع الإثبات في حالة الكفالة الحالية، أو سبق إرسال إثبات دفع.";
    default:
      return "تعذر رفع إثبات الدفع. يرجى المحاولة مرة أخرى.";
  }
}

export default function SponsorSponsorshipDetailsPage() {
  const { sponsorshipId } = useParams();
  const [sponsorship, setSponsorship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [transferReference, setTransferReference] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [paymentProofInputKey, setPaymentProofInputKey] = useState(0);

  const loadSponsorship = useCallback(async () => {
    setLoading(true);
    setError("");
    setNotFound(false);
    try {
      const result = await sponsorshipApi.getById(sponsorshipId);
      const data = getResultData(result, "تعذر تحميل تفاصيل الكفالة.");
      if (!data) setNotFound(true);
      else setSponsorship(data);
    } catch (requestError) {
      if (requestError?.response?.status === 404) setNotFound(true);
      else
        setError(
          getApiErrorMessage(requestError, "تعذر تحميل تفاصيل الكفالة."),
        );
    } finally {
      setLoading(false);
    }
  }, [sponsorshipId]);

  useEffect(() => {
    const timeoutId = window.setTimeout(loadSponsorship, 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadSponsorship]);

  const handlePaymentProofChange = (event) => {
    const file = event.target.files?.[0] || null;
    setPaymentProof(file);
    setUploadError(file ? validatePaymentProof(file) : "");
    setUploadSuccess("");
  };

  const handlePaymentProofUpload = async () => {
    if (transferReference.length > 200) {
      setUploadError("يجب ألا يتجاوز مرجع التحويل 200 حرف.");
      return;
    }

    const validationError = validatePaymentProof(paymentProof);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      const result = await sponsorshipApi.uploadPaymentProof(sponsorshipId, {
        transferReference,
        paymentProof,
      });
      getResultData(result, "تعذر رفع إثبات الدفع.");
      setPaymentProof(null);
      setTransferReference("");
      setPaymentProofInputKey((currentKey) => currentKey + 1);
      setUploadSuccess(result?.message || "تم رفع إثبات الدفع بنجاح.");
      await loadSponsorship();
    } catch (requestError) {
      setUploadError(getPaymentProofErrorMessage(requestError));
    } finally {
      setUploading(false);
    }
  };

  let content;
  if (loading) content = <LoadingState count={2} columns="md:grid-cols-2" />;
  else if (notFound)
    content = (
      <ErrorState
        onRetry={loadSponsorship}
        title="الكفالة غير موجودة"
        description="لم يعثر الخادم على الكفالة المطلوبة."
      />
    );
  else if (error)
    content = <ErrorState onRetry={loadSponsorship} description={error} />;
  else if (sponsorship) {
    content = (
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#E8F1FA] text-[#0D4B8E]">
                <MdVolunteerActivism className="text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#003469]">
                  {sponsorship.targetDisplayName || "—"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {sponsorship.targetType || "—"} ·{" "}
                  {sponsorship.targetCity || "—"}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-[#E8F1FA] px-3 py-1 text-xs font-bold text-[#0D4B8E]">
              {localizeStatus(sponsorship.statusLabel || sponsorship.status)}
            </span>
          </div>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-gray-500">المبلغ الشهري</dt>
              <dd className="mt-1 font-extrabold">
                {formatAmount(sponsorship.monthlyAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">عدد الأشهر</dt>
              <dd className="mt-1 font-extrabold">
                {sponsorship.numberOfMonths}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">إجمالي الكفالة</dt>
              <dd className="mt-1 font-extrabold text-[#D9A441]">
                {formatAmount(sponsorship.totalAmount)}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-500">تاريخ الإنشاء</dt>
              <dd className="mt-1 font-extrabold">
                {formatDate(sponsorship.createdAt)}
              </dd>
            </div>
          </dl>
        </section>
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-[#003469]">
            الخطوة التالية
          </h2>
          {sponsorship.nextStepInfo ? (
            <p className="mt-3 rounded-lg bg-[#E8F1FA] p-4 text-sm leading-6 text-[#003469]">
              {sponsorship.nextStepInfo}
            </p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-gray-600">
              الكفالة بانتظار الخطوة التالية التي يدعمها الخادم.
            </p>
          )}
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <MdInfoOutline className="mt-0.5 shrink-0 text-lg" />
            <p>
              {sponsorship.paymentRequired
                ? "تتطلب هذه الكفالة استكمال خطوة الدفع وفق تعليمات الخادم."
                : "لا يطلب الخادم دفعة لهذه الكفالة حاليًا."}
            </p>
          </div>
          {!sponsorship.canUploadPayment && (
            <p className="mt-4 rounded-lg bg-gray-100 p-3 text-sm text-gray-600">
              رفع إثبات الدفع غير متاح لهذه الكفالة حاليًا.
            </p>
          )}
          {uploadSuccess && (
            <p
              role="status"
              className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm font-bold text-green-700"
            >
              {uploadSuccess}
            </p>
          )}
          {sponsorship.paymentRequired && sponsorship.canUploadPayment && (
            <section
              className="mt-4 rounded-xl border border-[#B8CCE0] bg-[#F7FAFD] p-4"
              aria-labelledby="payment-proof-title"
            >
              <div className="flex items-center gap-2 text-[#003469]">
                <MdCloudUpload className="text-xl" />
                <h3 id="payment-proof-title" className="font-extrabold">
                  رفع إثبات الدفع
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-700">
                يرجى تحويل مبلغ الكفالة إلى حساب منصة كفيلي الموضح أدناه، ثم رفع
                صورة إثبات التحويل لإكمال عملية الدفع.
              </p>
              <div className="mt-4 rounded-xl border border-[#B8CCE0] bg-white p-4">
                <div className="flex items-center gap-2 font-extrabold text-[#003469]">
                  <MdAccountBalance className="text-xl" />
                  معلومات التحويل
                </div>
                <dl className="mt-3 grid gap-3 text-sm">
                  <div>
                    <dt className="text-gray-500">البنك</dt>
                    <dd className="mt-1 font-extrabold">
                      {FIXED_BANK_NAME_AR}{" "}
                      <span
                        dir="ltr"
                        className="text-xs font-semibold text-gray-500"
                      >
                        ({FIXED_BANK_NAME_EN})
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">اسم صاحب الحساب</dt>
                    <dd dir="ltr" className="mt-1 text-right font-extrabold">
                      {FIXED_ACCOUNT_HOLDER}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">رقم التحويل</dt>
                    <dd
                      dir="ltr"
                      className="mt-1 text-right font-mono text-lg font-extrabold text-[#0D4B8E]"
                    >
                      {FIXED_TRANSFER_NUMBER}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">IBAN</dt>
                    <dd
                      dir="ltr"
                      className="mt-1 break-all text-right font-mono font-extrabold"
                    >
                      {FIXED_IBAN}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">العملة</dt>
                    <dd dir="ltr" className="mt-1 text-right font-extrabold">
                      {FIXED_CURRENCY}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">مبلغ الكفالة</dt>
                    <dd className="mt-1 font-extrabold text-[#D9A441]">
                      {formatAmount(sponsorship.totalAmount)}
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="mt-3 text-xs leading-5 text-gray-600">
                الصيغ المقبولة: JPG وJPEG وPNG وPDF، وبحجم أقصى 5 ميجابايت.
              </p>
              <label
                htmlFor="transfer-reference"
                className="mt-4 block text-sm font-bold text-gray-700"
              >
                مرجع التحويل (اختياري)
              </label>
              <input
                id="transfer-reference"
                type="text"
                value={transferReference}
                maxLength={200}
                onChange={(event) => {
                  setTransferReference(event.target.value);
                  setUploadError("");
                }}
                disabled={uploading}
                className="mt-2 h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#0D4B8E] disabled:cursor-not-allowed disabled:bg-gray-100"
              />
              <label
                htmlFor="payment-proof"
                className="mt-4 block text-sm font-bold text-gray-700"
              >
                ملف إثبات الدفع
              </label>
              <input
                key={paymentProofInputKey}
                id="payment-proof"
                type="file"
                accept={PAYMENT_PROOF_ACCEPT}
                onChange={handlePaymentProofChange}
                disabled={uploading}
                aria-describedby="payment-proof-file payment-proof-error"
                className="mt-2 block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:ml-3 file:border-0 file:bg-[#E8F1FA] file:px-4 file:py-3 file:font-bold file:text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-60"
              />
              <p
                id="payment-proof-file"
                className="mt-2 min-h-5 text-sm text-gray-600"
              >
                {paymentProof
                  ? `الملف المحدد: ${paymentProof.name}`
                  : "لم يتم اختيار ملف."}
              </p>
              {uploadError && (
                <p
                  id="payment-proof-error"
                  role="alert"
                  className="mt-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {uploadError}
                </p>
              )}
              <button
                type="button"
                onClick={handlePaymentProofUpload}
                disabled={
                  uploading ||
                  !paymentProof ||
                  transferReference.length > 200 ||
                  Boolean(validatePaymentProof(paymentProof))
                }
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0D4B8E] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#003469] disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                <MdCloudUpload className="text-lg" />
                {uploading ? "جارٍ رفع الإثبات..." : "رفع إثبات الدفع"}
              </button>
            </section>
          )}
        </aside>
      </div>
    );
  }

  return (
    <SponsorFlowLayout title="تفاصيل الكفالة" backTo="/sponsor/sponsorships">
      {content}
    </SponsorFlowLayout>
  );
}
