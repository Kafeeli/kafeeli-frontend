const pageTitles = {
  "/": "تسجيل الدخول",
  "/login": "تسجيل الدخول",
  "/register": "إنشاء حساب جديد",
  "/verify-email": "تأكيد البريد الإلكتروني",
  "/email-verified": "تم تأكيد البريد الإلكتروني",
  "/email-verified-success": "تم تأكيد البريد الإلكتروني",
  "/forgot-password": "نسيت كلمة المرور",
  "/reset-password": "إعادة تعيين كلمة المرور",
  "/invalid-Email": "بريد إلكتروني غير صالح",
  "/invalid-email": "بريد إلكتروني غير صالح",

  "/landing-page": "الصفحة الرئيسية",

  // Sponsor
  "/main": "نظرة عامة",
  "/sponsorProfile": "الملف الشخصي",
  "/sponsor-dashboard": "نظرة عامة",
  "/sponsor/families": "العائلات",
  "/sponsor/families/:familyId": "تفاصيل العائلة",
  "/sponsor/sponsorships": "كفالاتي",
  "/sponsor/sponsorships/:sponsorshipId": "تفاصيل الكفالة",
  "/sponsor/orphans": "الأيتام المتاحون للكفالة",
  "/sponsor/orphans/:orphanId": "تفاصيل اليتيم",

  // Guardian - Families
  "/families": "العائلات",
  "/families/add": "إضافة عائلة",
  "/families/manage": "إدارة العائلات",
  "/families/access-pending": "بانتظار صلاحية الوصول",
  "/families/active-details": "تفاصيل عائلة نشطة",
  "/families/edit": "تعديل بيانات العائلة",
  "/families/needs-edit/edit": "تعديل مطلوب - تحرير",
  "/families/stopped-details": "تفاصيل عائلة موقوفة",
  "/families/pending-details": "عائلة قيد المراجعة",
  "/families/hidden-details": "تفاصيل عائلة مخفية",
  "/families/needs-edit-details": "عائلة تحتاج تعديل",
  "/families/error": "حدث خطأ",
  "/families/details": "تفاصيل العائلة",
  "/families/:familyId": "تفاصيل العائلة",
  "/families/:familyId/edit": "تعديل بيانات العائلة",

  "/guardian-dashboard": "نظرة عامة",
  "/guardian-profile": "الملف الشخصي",
  "/guardian-documents": "الوثائق",
  "/guardian/orphans": "الأيتام",
  "/guardian/orphans/:orphanId": "تفاصيل اليتيم",
  "/guardian/orphans/:orphanId/edit": "تعديل بيانات اليتيم",
  "/families/:familyId/orphans/add": "إضافة يتيم",
  "/guardian/payouts": "التحويلات",

  // Admin
  "/admin-dashboard": "نظرة عامة",
  "/admin-dashboard/transfer-review": "مراجعة التحويلات البنكية",
  "/admin-dashboard/families": "إدارة العائلات",
  "/admin-dashboard/guardians": "الأوصياء",
  "/admin-dashboard/sponsors": "الكفلاء",
  "/admin-dashboard/guardian-document-reviews": "مراجعة وثائق الأوصياء",
  "/admin-dashboard/orphans": "إدارة الأيتام",
  "/admin-dashboard/payments": "مراجعة المدفوعات",
  "/admin-dashboard/payouts": "دفعات الأوصياء",

  // Errors
  "/error-404": "الصفحة غير موجودة",
  "/auth-401": "غير مصرح بالدخول",
};

export function getPageTitle(pathname) {
  const exactTitle = pageTitles[pathname];
  if (exactTitle) return exactTitle;

  return Object.entries(pageTitles).find(([pattern]) => {
    if (!pattern.includes(":")) return false;
    const expression = pattern
      .split("/")
      .map((segment) => (segment.startsWith(":") ? "[^/]+" : segment))
      .join("/");
    return new RegExp(`^${expression}$`).test(pathname);
  })?.[1] || "كفيلي";
}

export default pageTitles;
