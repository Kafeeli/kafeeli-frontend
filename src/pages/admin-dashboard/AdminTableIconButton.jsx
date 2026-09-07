const TONE_CLASSES = {
  view: "bg-blue-50 text-blue-700 hover:bg-blue-100",
  edit: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
  suspend: "bg-amber-50 text-amber-700 hover:bg-amber-100",
  reactivate: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  hide: "bg-slate-100 text-slate-700 hover:bg-slate-200",
  approve: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  delete: "bg-red-50 text-red-700 hover:bg-red-100",
};

export default function AdminTableIconButton({
  label,
  tone = "edit",
  className = "",
  children,
  ...buttonProps
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D4B8E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${TONE_CLASSES[tone] || TONE_CLASSES.edit} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
