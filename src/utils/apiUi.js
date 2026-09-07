function arabicMessage(candidates, fallbackMessage) {
  const messages = candidates
    .flat()
    .filter((value) => typeof value === "string" && value.trim())
    .map((value) => value.trim());
  return messages.find((value) => /[\u0600-\u06ff]/.test(value)) || messages[0] || fallbackMessage;
}

export function unwrapResult(result, fallbackMessage = "تعذر إكمال العملية.") {
  if (result?.success !== true) {
    const errors = Array.isArray(result?.errors) ? result.errors.filter(Boolean) : [];
    throw new Error(arabicMessage([result?.message, errors], fallbackMessage));
  }
  return result.data;
}

export function apiErrorMessage(error, fallbackMessage = "تعذر إكمال العملية.") {
  const body = error?.response?.data;
  const errors = Array.isArray(body?.errors) ? body.errors.filter(Boolean) : [];
  return arabicMessage([body?.message, errors, error?.message], fallbackMessage);
}

export function openProtectedBlob(blob) {
  const objectUrl = URL.createObjectURL(blob);
  window.open(objectUrl, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
}
