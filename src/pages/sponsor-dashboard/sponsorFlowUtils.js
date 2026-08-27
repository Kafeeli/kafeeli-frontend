export function getResultData(result, fallbackMessage) {
  if (result?.success !== true) {
    const errors = Array.isArray(result?.errors) ? result.errors.filter(Boolean) : [];
    const message = [result?.message, ...errors].find((value) => typeof value === "string" && /[\u0600-\u06ff]/.test(value));
    throw new Error(message || fallbackMessage);
  }

  return result.data;
}

export function getApiErrorMessage(error, fallbackMessage) {
  const body = error?.response?.data;
  const errors = Array.isArray(body?.errors) ? body.errors.filter(Boolean) : [];
  return [body?.message, ...errors, error?.message].find((value) => typeof value === "string" && /[\u0600-\u06ff]/.test(value)) || fallbackMessage;
}

export function formatAmount(value) {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("ar-EG", { maximumFractionDigits: 2 }).format(value);
}

export function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
