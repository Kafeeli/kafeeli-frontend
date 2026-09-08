const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;

export function buildAdminQuery(filters = {}) {
  return Object.fromEntries(
    Object.entries(filters)
      .map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
      .filter(([, value]) => (
        value !== undefined
        && value !== null
        && value !== ""
        && value !== "all"
      )),
  );
}

export function normalizePagedData(data, requested = {}) {
  const requestedPage = Number(requested.page) || DEFAULT_PAGE;
  const requestedPageSize = Number(requested.pageSize) || DEFAULT_PAGE_SIZE;

  if (Array.isArray(data)) {
    return {
      items: data,
      page: 1,
      pageSize: requestedPageSize,
      totalCount: data.length,
      totalPages: data.length ? 1 : 0,
      hasPreviousPage: false,
      hasNextPage: false,
      isLegacyArray: true,
    };
  }

  const items = Array.isArray(data?.items) ? data.items : [];
  const page = Number(data?.page) || requestedPage;
  const pageSize = Number(data?.pageSize) || requestedPageSize;
  const totalCount = Number.isFinite(Number(data?.totalCount))
    ? Number(data.totalCount)
    : items.length;
  const totalPages = Number.isFinite(Number(data?.totalPages))
    ? Number(data.totalPages)
    : (totalCount ? Math.ceil(totalCount / pageSize) : 0);

  return {
    items,
    page,
    pageSize,
    totalCount,
    totalPages,
    hasPreviousPage: typeof data?.hasPreviousPage === "boolean"
      ? data.hasPreviousPage
      : page > 1,
    hasNextPage: typeof data?.hasNextPage === "boolean"
      ? data.hasNextPage
      : page < totalPages,
    isLegacyArray: false,
  };
}

export const emptyPagedData = normalizePagedData([], {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
});
