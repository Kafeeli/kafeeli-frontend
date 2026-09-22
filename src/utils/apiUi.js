export function unwrapResult(result, fallbackMessage = "تعذر إكمال العملية.") {
  if (result?.success !== true) {
    const errors = Array.isArray(result?.errors)
      ? result.errors.filter(Boolean).join(" - ")
      : typeof result?.errors === "string"
      ? result.errors
      : "";
    const msg = result?.message || errors || fallbackMessage;
    throw new Error(msg);
  }
  return result.data;
}

export function apiErrorMessage(error, fallbackMessage = "تعذر إكمال العملية.") {
  const body = error?.response?.data;
  if (!body) {
    return error?.message || fallbackMessage;
  }

  const message = body.message || body.title;
  let errors = "";
  if (Array.isArray(body.errors)) {
    errors = body.errors.filter(Boolean).join(" - ");
  } else if (typeof body.errors === "object" && body.errors !== null) {
    errors = Object.values(body.errors).flat().filter(Boolean).join(" - ");
  } else if (typeof body.errors === "string") {
    errors = body.errors;
  }

  return message || errors || error?.message || fallbackMessage;
}

export function openProtectedBlob(blob) {
  const objectUrl = URL.createObjectURL(blob);
  window.open(objectUrl, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
}
