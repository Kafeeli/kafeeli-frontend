export const DOCUMENT_STATUS_FILTERS = [
  { value: "", label: "كل الحالات" },
  { value: 1, key: "Pending", label: "قيد المراجعة" },
  { value: 2, key: "Approved", label: "معتمدة" },
  { value: 3, key: "Rejected", label: "مرفوضة" },
  { value: 4, key: "Expired", label: "منتهية الصلاحية" },
  { value: 5, key: "NeedsUpdate", label: "تحتاج تحديث" },
];

export const GUARDIAN_DOCUMENT_TYPE_FILTERS = [
  { value: "", label: "كل أنواع الوثائق" },
  { value: 1, key: "NationalId", label: "الهوية الوطنية" },
  { value: 3, key: "GuardianshipProof", label: "إثبات الوصاية" },
  { value: 4, key: "SelfieVideoWithId", label: "فيديو التحقق مع الهوية" },
  { value: 5, key: "CustodyDocument", label: "وثيقة الحضانة" },
];

export const ORPHAN_DOCUMENT_TYPE_FILTERS = [
  { value: "", label: "كل أنواع الوثائق" },
  { value: 1, key: "BirthCertificate", label: "شهادة الميلاد" },
  { value: 2, key: "FatherDeathCertificate", label: "شهادة وفاة الأب" },
  { value: 3, key: "MotherDeathCertificate", label: "شهادة وفاة الأم" },
  { value: 4, key: "CaseReport", label: "تقرير الحالة" },
  { value: 5, key: "RecentPhoto", label: "صورة حديثة" },
  { value: 6, key: "OrphanNationalId", label: "هوية اليتيم" },
  { value: 7, key: "MedicalReport", label: "تقرير طبي" },
  { value: 8, key: "EducationProof", label: "إثبات التعليم" },
  { value: 9, key: "Other", label: "وثيقة أخرى" },
];

const statusLabels = Object.fromEntries(
  DOCUMENT_STATUS_FILTERS.filter((item) => item.key).map((item) => [item.key, item.label]),
);

const documentTypeLabels = Object.fromEntries(
  [...GUARDIAN_DOCUMENT_TYPE_FILTERS, ...ORPHAN_DOCUMENT_TYPE_FILTERS]
    .filter((item) => item.key)
    .map((item) => [item.key, item.label]),
);

export function adminDocumentStatusLabel(status) {
  return statusLabels[status] || "—";
}

export function adminDocumentTypeLabel(type, fallback = "وثيقة") {
  return documentTypeLabels[type] || fallback;
}

export function adminDocumentStatusClasses(status) {
  if (status === "Approved") return "bg-emerald-50 text-emerald-700";
  if (status === "Rejected") return "bg-red-50 text-red-700";
  if (status === "Expired") return "bg-slate-100 text-slate-700";
  if (status === "NeedsUpdate") return "bg-blue-50 text-blue-700";
  return "bg-amber-50 text-amber-700";
}
