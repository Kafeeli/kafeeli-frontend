import { MdClose, MdWarningAmber } from "react-icons/md";

export function AdminDialog({ title, onClose, children, footer, size = "max-w-3xl", closeDisabled = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001D3D]/65 px-4 py-6 backdrop-blur-[2px]" onMouseDown={closeDisabled ? undefined : onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`max-h-[92vh] w-full overflow-y-auto rounded-3xl border border-white/70 bg-[#F8FAFC] shadow-2xl ${size}`}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-[#D7E2EE] bg-white/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center gap-3"><span className="h-7 w-1 rounded-full bg-[#47DBE0]" aria-hidden="true" /><h2 className="text-lg font-extrabold text-[#003469]">{title}</h2></div>
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
        <div className="p-4 sm:p-6">{children}</div>
        {footer && <footer className="sticky bottom-0 flex flex-wrap justify-end gap-3 border-t border-[#D7E2EE] bg-white/95 px-6 py-4 backdrop-blur">{footer}</footer>}
      </section>
    </div>
  );
}

export function AdminDetailsHero({ icon: Icon, eyebrow, title, subtitle, badges = [], children }) {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#003469] via-[#0D4B8E] to-[#1766A6] p-5 text-white shadow-lg shadow-[#003469]/10 sm:p-6">
      <div className="absolute -left-10 -top-14 h-40 w-40 rounded-full bg-[#47DBE0]/15" aria-hidden="true" />
      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/15 text-3xl text-[#FFDEAA] shadow-inner">
            {Icon && <Icon aria-hidden="true" />}
          </div>
          <div className="min-w-0">
            {eyebrow && <p className="text-xs font-bold text-[#A9F0F2]">{eyebrow}</p>}
            <h3 className="mt-1 truncate text-xl font-extrabold sm:text-2xl">{title || "—"}</h3>
            {subtitle && <p className="mt-1 break-words text-sm text-white/75">{subtitle}</p>}
            {badges.length > 0 && <div className="mt-3 flex flex-wrap gap-2">{badges.map((badge) => <span key={`${badge.label}-${badge.value}`} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold"><span className="text-white/65">{badge.label}: </span>{badge.value || "—"}</span>)}</div>}
          </div>
        </div>
        {children && <div className="shrink-0">{children}</div>}
      </div>
    </section>
  );
}

export function AdminDetailsSection({ title, icon: Icon, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-[#D7E2EE] bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-5 flex items-center gap-3 border-b border-[#E8EEF5] pb-3">
        {Icon && <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#E8F7F8] text-lg text-[#007F82]"><Icon aria-hidden="true" /></span>}
        <h3 className="text-base font-extrabold text-[#003469]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

export function AdminDetailItem({ label, value, dir, wide = false }) {
  const hasValue = value !== null && value !== undefined && value !== "";
  return (
    <div className={`min-w-0 rounded-xl bg-[#F8FAFC] px-4 py-3 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="text-[11px] font-bold text-slate-500">{label}</dt>
      <dd dir={dir} className={`mt-1 break-words text-sm font-extrabold ${hasValue ? "text-slate-800" : "text-slate-400"}`}>{hasValue ? value : "—"}</dd>
    </div>
  );
}

export function AdminDetailStat({ label, value }) {
  return <div className="rounded-2xl border border-[#D7E2EE] bg-white p-4 text-center shadow-sm"><strong className="block text-2xl font-extrabold text-[#0D4B8E]">{value ?? 0}</strong><span className="mt-1 block text-xs font-bold text-slate-500">{label}</span></div>;
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
