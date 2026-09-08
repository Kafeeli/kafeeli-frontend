const PAGE_SIZES = [10, 20, 50, 100];

export default function AdminPagination({ pagination, onPageChange, onPageSizeChange }) {
  const {
    page = 1,
    pageSize = 20,
    totalCount = 0,
    totalPages = 0,
    hasPreviousPage = false,
    hasNextPage = false,
    isLegacyArray = false,
  } = pagination || {};

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2 text-gray-600">
        <span>إجمالي النتائج: <strong className="text-[#003469]">{totalCount}</strong></span>
        {!isLegacyArray && totalPages > 0 && <span>· الصفحة {page} من {totalPages}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 text-gray-600">
          <span>لكل صفحة</span>
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-2 py-2"
          >
            {PAGE_SIZES.map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <button
          type="button"
          disabled={isLegacyArray || !hasPreviousPage}
          onClick={() => onPageChange(page - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-40"
        >
          السابق
        </button>
        <button
          type="button"
          disabled={isLegacyArray || !hasNextPage}
          onClick={() => onPageChange(page + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 font-bold text-[#0D4B8E] disabled:cursor-not-allowed disabled:opacity-40"
        >
          التالي
        </button>
      </div>
    </div>
  );
}
