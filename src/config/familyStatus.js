// 🔌 خريطة أرقام enum FamilyStatus (من الـ API) → مفاتيحنا الداخلية.
// ⚠️ الأرقام هون افتراضية لحد ما يرد الباك اند بالمقابلة الصحيحة (سألناهم، بانتظار الجواب).
// عدّل هاد الكائن بس، وكل الصفحات (List/Details/Edit) بتتحدث تلقائيًا.
export const FAMILY_STATUS_MAP = {
  1: "active",
  2: "pending",
  3: "needsEdit",
  4: "hidden",
  5: "stopped",
};

export function mapFamilyStatus(apiStatusNumber) {
  return FAMILY_STATUS_MAP[apiStatusNumber] || "pending";
}

// إعدادات إضافية خاصة بكروت صفحة القائمة (ManagingFamilyCards) — تصميمها أغنى
// من مجرد بادج (رأس متدرّج، أيقونة كبيرة، ملاحظة/سبب حسب الحالة).
export const FAMILY_CARD_STYLE = {
  active: {
    headerClass: "bg-gradient-to-l from-[#003469] to-[#0D5FA8]",
    borderClass: "border-[#D6E2F0]",
    cardBg: "bg-white",
    iconClass: "text-[#007B83]",
    note: "تم قبول العائلة المعتمدة ويمكنك البدء بدعمها من قبل الإدارة.",
  },
  pending: {
    headerClass: "bg-gradient-to-l from-[#7A5200] to-[#D9A23B]",
    borderClass: "border-[#D6E2F0]",
    cardBg: "bg-white",
    iconClass: "text-[#6B4A00]",
  },
  hidden: {
    headerClass: "bg-[#C9CDD8]",
    borderClass: "border-[#D6E2F0]",
    cardBg: "bg-[#F7F8FA]",
    iconClass: "text-[#8E96A3]",
  },
  needsEdit: {
    headerClass: "bg-[#EFEFEF]",
    borderClass: "border-[#F4B4B4]",
    cardBg: "bg-white",
    iconClass: "text-[#D11F1F]",
  },
  stopped: {
    headerClass: "bg-gradient-to-l from-[#D11F1F] to-[#F7B8B8]",
    borderClass: "border-[#D11F1F]",
    cardBg: "bg-white",
    iconClass: "text-[#D11F1F]",
  },
};

import {
  MdCheckCircle,
  MdHourglassBottom,
  MdWarningAmber,
  MdVisibilityOff,
  MdBlock,
} from "react-icons/md";

// الإعدادات البصرية المشتركة لكل حالة — نفس الكائن يستخدمه
// FamilyCard و FamilyDetailsPage و FamilyEditPage، فمفيش تكرار ألوان/نصوص.
export const FAMILY_STATUS_CONFIG = {
  active: {
    badgeLabel: "نشطة",
    badgeClass: "bg-[#D9F7F1] text-[#008C78]",
    banner: {
      icon: MdCheckCircle,
      bgClass: "bg-[#D9F7F1]",
      borderClass: "border-[#008C78]",
      iconWrapClass: "bg-white/70",
      iconClass: "text-[#008C78]",
      titleClass: "text-[#00695C]",
      descClass: "text-[#00695C]",
      title: "حالة العائلة: نشطة ومكتملة",
      description:
        "تم التحقق من كافة المستندات المطلوبة، والعائلة مؤهلة للحصول على الدعم الدوري.",
    },
  },
  pending: {
    badgeLabel: "قيد المراجعة",
    badgeClass: "bg-[#DCEBFF] text-[#003469]",
    banner: {
      icon: MdHourglassBottom,
      bgClass: "bg-[#D5E7FF]",
      borderClass: "border-[#2563EB]",
      iconWrapClass: "bg-white/65",
      iconClass: "text-[#003469]",
      titleClass: "text-[#003469]",
      descClass: "text-[#4B5563]",
      title: "حالة العائلة: قيد المراجعة",
      description:
        "جاري التحقق من المستندات والبيانات المقدمة من قبل فريق الإشراف.",
    },
  },
  needsEdit: {
    badgeLabel: "تحتاج تعديل",
    badgeClass: "bg-[#FEE2E2] text-[#D11F1F]",
    banner: {
      icon: MdWarningAmber,
      bgClass: "bg-[#FFDADA]",
      borderClass: "border-[#D11F1F]",
      iconWrapClass: "bg-white/65",
      iconClass: "text-[#D11F1F]",
      titleClass: "text-[#B91C1C]",
      descClass: "text-[#B91C1C]",
      title: "حالة العائلة: تحتاج تعديل",
      description:
        "يرجى مراجعة الملاحظات وتحديث البيانات المطلوبة لاستكمال الملف.",
    },
  },
  hidden: {
    badgeLabel: "مخفية",
    badgeClass: "bg-[#D9E5F7] text-[#6B7280]",
    banner: {
      icon: MdVisibilityOff,
      bgClass: "bg-[#D5E7FF]",
      borderClass: "border-[#7E8EA6]",
      iconWrapClass: "bg-white/65",
      iconClass: "text-[#6B7280]",
      titleClass: "text-[#374151]",
      descClass: "text-[#6B7280]",
      title: "حالة العائلة: مخفية",
      description:
        "تم إخفاء بيانات هذه العائلة من القوائم العامة، ولا يمكن الوصول إليها إلا من قبل المسؤولين المخولين.",
    },
  },
  stopped: {
    badgeLabel: "موقوفة",
    badgeClass: "bg-[#FEE2E2] text-[#D11F1F]",
    banner: {
      icon: MdBlock,
      bgClass: "bg-[#FFDADA]",
      borderClass: "border-[#D11F1F]",
      iconWrapClass: "bg-white/65",
      iconClass: "text-[#D11F1F]",
      titleClass: "text-[#B91C1C]",
      descClass: "text-[#B91C1C]",
      title: "حالة العائلة: موقوفة",
      description:
        "تم إيقاف الدعم مؤقتًا بسبب استيفاء الشروط أو انتهاء صلاحية المستندات.",
    },
  },
};
