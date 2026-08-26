/*
  ✅ مصدر واحد لخريطة الحالات — أي ملف بحاجة نص أو لون حالة العائلة
  (البطاقات، الجدول، المودال) بيستورد من هون، بدل ما نكرر نفس
  الخريطة بأكثر من مكان.
*/
export const STATUS_MAP = {
  pending: {
    label: "قيد المراجعة",
    className: "bg-[#FFE7B8] text-[#9A6700]",
  },
  active: {
    label: "معتمدة ونشطة",
    className: "bg-green-100 text-green-700",
  },
  rejected: {
    label: "تم الرفض",
    className: "bg-red-100 text-red-700",
  },
  hidden: {
    label: "مخفية",
    className: "bg-gray-200 text-gray-600",
  },
  suspended: {
    label: "موقوفة",
    className: "bg-orange-100 text-orange-700",
  },
  stopped: {
    label: "موقوفة",
    className: "bg-orange-100 text-orange-700",
  },
  needsEdit: {
    label: "تحتاج تعديل",
    className: "bg-red-100 text-red-700",
  },
};

// الإجراءات التي تسمح بها واجهة الإدارة في الخادم لكل FamilyStatus مطبّع.
// الحالات النهائية لا تملك مسارات عكسية في الـ API الحالي.
export const FAMILY_STATUS_ACTIONS = {
  pending: ["approve", "needsUpdate"],
  active: ["hide", "suspend"],
  hidden: [],
  stopped: [],
  needsEdit: [],
};
