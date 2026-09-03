import { MdClose, MdWarningAmber } from "react-icons/md";

export function AdminDialog({ title, onClose, children, footer, size = "max-w-3xl", closeDisabled = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onMouseDown={closeDisabled ? undefined : onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`max-h-[92vh] w-full overflow-y-auto rounded-2xl bg-white shadow-2xl ${size}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
          <h2 className="text-lg font-extrabold text-[#003469]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={closeDisabled}
            aria-label="إغلاق"
            className="grid h-9 w-9 place-items-center rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <MdClose className="text-xl" />
          </button>
        </header>
        <div className="p-6">{children}</div>
        {footer && <footer className="sticky bottom-0 flex flex-wrap justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">{footer}</footer>}
      </section>
    </div>
  );
}

export function AdminConfirmationDialog({
  title,
  message,
  warning,
  confirmLabel,
  onConfirm,
  onCancel,
  loading,
  danger = false,
  reason,
  onReasonChange,
  reasonLabel = "السبب (اختياري)",
  confirmDisabled = false,
  error = "",
}) {
  return (
    <AdminDialog
      title={title}
      onClose={onCancel}
      closeDisabled={loading}
      size="max-w-lg"
      footer={(
        <>
          <button type="button" onClick={onCancel} disabled={loading} className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-bold text-gray-700 disabled:opacity-50">إلغاء</button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading || confirmDisabled}
            className={`rounded-lg px-5 py-2.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 ${danger ? "bg-red-600 hover:bg-red-700" : "bg-[#0D4B8E] hover:bg-[#003469]"}`}
          >
            {loading ? "جارٍ التنفيذ..." : confirmLabel}
          </button>
        </>
      )}
    >
      <div className="flex gap-3 rounded-xl bg-amber-50 p-4 text-amber-900">
        <MdWarningAmber className="mt-0.5 shrink-0 text-2xl" />
        <div><p className="text-sm font-bold leading-6">{message}</p>{warning && <p className="mt-2 text-sm leading-6">{warning}</p>}</div>
      </div>
      {onReasonChange && (
        <label className="mt-5 block text-sm font-bold text-gray-700">
          {reasonLabel}
          <textarea
            value={reason}
            onChange={(event) => onReasonChange(event.target.value)}
            maxLength={500}
            rows={3}
            disabled={loading}
            className="mt-2 w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-[#0D4B8E] disabled:bg-gray-100"
          />
        </label>
      )}
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-bold leading-6 text-red-700">{error}</p>}
    </AdminDialog>
  );
}
