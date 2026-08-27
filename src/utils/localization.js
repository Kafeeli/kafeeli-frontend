export const ROLE_LABELS = {
  Sponsor: "كفيل",
  Guardian: "وصي",
  Admin: "مدير النظام",
  SuperAdmin: "مدير النظام الرئيسي",
};

export const STATUS_LABELS = {
  Active: "نشطة",
  Inactive: "غير نشطة",
  Pending: "قيد المراجعة",
  PendingReview: "قيد المراجعة",
  UnderReview: "قيد المراجعة",
  Approved: "معتمدة",
  Rejected: "مرفوضة",
  NeedsUpdate: "يحتاج تعديل",
  NeedsEdit: "يحتاج تعديل",
  Hidden: "مخفية",
  Suspended: "معلقة",
  Stopped: "متوقفة",
  Verified: "موثقة",
  Unverified: "غير موثقة",
  Paid: "مدفوعة",
  Unpaid: "غير مدفوعة",
  Completed: "مكتملة",
  Failed: "فشلت",
  Cancelled: "ملغاة",
  Canceled: "ملغاة",
  Processing: "قيد المعالجة",
  AwaitingPayment: "بانتظار الدفع",
  AwaitingPaymentProof: "بانتظار إثبات الدفع",
  Created: "منشأة",
  Submitted: "مرسلة",
  Transferred: "محوّلة",
  Eligible: "مؤهلة",
  NotEligible: "غير مؤهلة",
  Male: "ذكر",
  Female: "أنثى",
  Family: "عائلة",
  Orphan: "يتيم",
  Monthly: "شهرية",
  OneTime: "لمرة واحدة",
  Draft: "مسودة",
  Confirmed: "مؤكدة",
  AwaitingReview: "بانتظار المراجعة",
  PendingPayment: "بانتظار الدفع",
  PaymentProofUploaded: "تم رفع إثبات الدفع",
  Preschool: "رياض الأطفال",
  Primary: "المرحلة الابتدائية",
  Preparatory: "المرحلة الإعدادية",
  Secondary: "المرحلة الثانوية",
  University: "المرحلة الجامعية",
  NotEnrolled: "غير ملتحق بالتعليم",
  DroppedOut: "منقطع عن التعليم",
  Graduated: "متخرج",
};

export const DOCUMENT_TYPE_LABELS = {
  NationalId: "الهوية الوطنية",
  NationalIdImage: "صورة الهوية الوطنية",
  GuardianshipProof: "وثيقة الوصاية",
  GuardianshipDeed: "وثيقة الوصاية",
  CustodyDocument: "إقرار الحضانة",
  SelfieVideoWithId: "فيديو التحقق مع الهوية",
  BirthCertificate: "شهادة الميلاد",
  FatherDeathCertificate: "شهادة وفاة الأب",
  MotherDeathCertificate: "شهادة وفاة الأم",
  CaseReport: "تقرير الحالة",
  RecentPhoto: "صورة حديثة",
  OrphanNationalId: "هوية اليتيم",
  MedicalReport: "تقرير طبي",
  EducationProof: "إثبات التعليم",
  Other: "وثيقة أخرى",
};

const VERIFICATION_STATUS_LABELS = {
  Pending: "قيد المراجعة",
  Approved: "موثق",
  Rejected: "مرفوض",
  Suspended: "معلق",
  NeedsUpdate: "يحتاج تحديث",
};

export function localizeRole(role) {
  if (Array.isArray(role)) return role.map(localizeRole).join("، ");
  return ROLE_LABELS[role] || role || "";
}

export function localizeStatus(status, fallback = "—") {
  if (status == null || status === "") return fallback;
  return STATUS_LABELS[status] || status;
}

export function localizeDocumentType(type, fallback = "وثيقة") {
  return DOCUMENT_TYPE_LABELS[type] || fallback;
}

export function localizeVerificationStatus(status, fallback = "—") {
  if (status == null || status === "") return fallback;
  return VERIFICATION_STATUS_LABELS[status] || localizeStatus(status, fallback);
}

export function localizeDisplayFields(record, fields) {
  if (!record || typeof record !== "object") return record;
  return fields.reduce(
    (localized, field) => ({ ...localized, [field]: localizeStatus(localized[field]) }),
    record,
  );
}
