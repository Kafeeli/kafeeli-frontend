import { FiChevronLeft, FiHome } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function AdminBreadcrumbs({ items }) {
  return (
    <nav aria-label="مسار التنقل" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm font-bold text-slate-500">
        <li><Link to="/admin-dashboard" aria-label="لوحة المراجعة" className="grid h-8 w-8 place-items-center rounded-lg text-[#0D4B8E] transition hover:bg-[#E8F1FA]"><FiHome aria-hidden="true" /></Link></li>
        {items.map((item, index) => <li key={`${item.label}-${index}`} className="flex items-center gap-1.5"><FiChevronLeft className="text-slate-300" aria-hidden="true" />{item.to ? <Link to={item.to} className="rounded-md px-1.5 py-1 text-[#0D4B8E] transition hover:bg-[#E8F1FA] hover:text-[#003469]">{item.label}</Link> : <span aria-current="page" className="px-1.5 py-1 text-slate-700">{item.label}</span>}</li>)}
      </ol>
    </nav>
  );
}
