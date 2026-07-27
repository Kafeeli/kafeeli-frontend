// /**
//  * 🔌 خريطة اسم نوع الوثيقة الراجع من GET (documentType كنص) → مفتاحنا الداخلي.
//  * ⚠️ "NationalIdImage" مؤكد من وصف الـ POST endpoint نفسه. باقي الأسماء الثلاثة
//  * تخمين منطقي (نمط تسمية مشابه) — تأكدي منهم أول ما توصلك استجابة GET حقيقية
//  * فيها وثيقة مرفوعة فعليًا، وعدّلي هالكائن لو الأسماء مختلفة.
//  */
// export const DOCUMENT_TYPE_NAME_TO_KEY = {
//   NationalIdImage: "nationalId",
//   GuardianshipDeed: "guardianshipDeed",
//   CustodyDocument: "custodyDeclaration",      // كان CustodyDeclaration
//   SelfieVideoWithId: "selfieVideo",            // كان SelfieVideo
// };

// /**
//  * خريطة verificationStatus (نص راجع من GET) → حالتنا الداخلية.
//  * ⚠️ نفس الملاحظة: تأكدي من الأسماء الفعلية أول ما يكون عندك مستند حقيقي مرفوع.
//  */
// export const VERIFICATION_STATUS_TO_KEY = {
//   Pending: "pendingReview",
//   Approved: "approved",
//   NeedsUpdate: "needsUpdate",
// };

// لو hasCurrentDocument=false، معناها الوثيقة أصلاً ما انرفعت — مفيش verificationStatus فعلي
// export function mapDocumentStatus(hasCurrentDocument, verificationStatus) {
//   if (!hasCurrentDocument) return "notUploaded";
//   return VERIFICATION_STATUS_TO_KEY[verificationStatus] || "pendingReview";
// }
/**
 * 🔌 خريطة اسم نوع الوثيقة الراجع من GET (documentType كنص) → مفتاحنا الداخلي.
 * ✅ مؤكدة الآن من استجابة GET /api/v1/guardians/me/documents حقيقية:
 *    [{"type":"NationalId",...}, {"type":"GuardianshipProof",...},
 *     {"type":"CustodyDocument",...}, {"type":"SelfieVideoWithId",...}]
 */
export const DOCUMENT_TYPE_NAME_TO_KEY = {
  NationalId: "nationalId",              // كانت "NationalIdImage" بالغلط
  GuardianshipProof: "guardianshipDeed", // كانت "GuardianshipDeed" بالغلط
  CustodyDocument: "custodyDeclaration",
  SelfieVideoWithId: "selfieVideo",
};
 
/**
 * خريطة verificationStatus (نص راجع من GET) → حالتنا الداخلية.
 * مؤكدة من نفس الاستجابة: كل الوثائق المرفوعة حديثًا رجعت status: "Pending".
 */
export const VERIFICATION_STATUS_TO_KEY = {
  Pending: "pendingReview",
  Approved: "approved",
  NeedsUpdate: "needsUpdate",
};
 
// لو has=false، معناها الوثيقة أصلاً ما انرفعت — مفيش verificationStatus فعلي
export function mapDocumentStatus(hasCurrentDocument, verificationStatus) {
  if (!hasCurrentDocument) return "notUploaded";
  return VERIFICATION_STATUS_TO_KEY[verificationStatus] || "pendingReview";
}
 
