export function unwrapResult(result, fallbackMessage = "تعذر إكمال العملية.") {
  if (result?.success !== true) {
    const errors = Array.isArray(result?.errors) ? result.errors.filter(Boolean) : [];
    throw new Error(result?.message || errors.join(" - ") || fallbackMessage);
  }
  return result.data;
}

export function apiErrorMessage(error, fallbackMessage = "تعذر إكمال العملية.") {
  const body = error?.response?.data;
  const errors = Array.isArray(body?.errors) ? body.errors.filter(Boolean) : [];
  return body?.message || errors.join(" - ") || error?.message || fallbackMessage;
}

export function openProtectedBlob(blob) {
  const objectUrl = URL.createObjectURL(blob);
  window.open(objectUrl, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
}
