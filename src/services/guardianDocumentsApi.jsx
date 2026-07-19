// import api from "./api";

// export const guardianDocumentsApi = {
//   // GET /api/v1/guardians/me/documents
//   // يرجع 4 خانات ثابتة (nationalId, guardianshipDeed, custodyDeclaration,
//   // selfieVideo) + ملخص محسوب + حالة توثيق الوصي العامة
//   getDocuments: async () => {
//     const response = await api.get("/api/v1/guardians/me/documents");
//     return response.data;
//   },

//   // POST /api/v1/guardians/me/documents (multipart/form-data)
//   // DocumentType رقم صحيح (enum) — راجع "documentTypeConfig.js"
//   // NationalId (رقم الهوية كنص) مطلوب فقط لو documentTypeKey === "nationalId"،
//   // ومرفوض (بيرجع خطأ) لباقي الأنواع.
//   uploadDocument: async ({ documentTypeKey, file, nationalId }) => {
//     const formData = new FormData();
//     formData.append("DocumentType", DOCUMENT_TYPE_ENUM[documentTypeKey]);
//     formData.append("File", file);
//     if (documentTypeKey === "nationalId" && nationalId) {
//       formData.append("NationalId", nationalId);
//     }

//     const response = await api.post("/api/v1/guardians/me/documents", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     return response.data;
//   },

//   // GET /api/v1/guardians/me/documents/{documentId}/file
//   getDocumentFile: async (documentId) => {
//     const response = await api.get(
//       `/api/v1/guardians/me/documents/${documentId}/file`,
//       { responseType: "blob" }
//     );
//     return response.data;
//   },
// };

// /**
//  * 🔌 مفاتيحنا الداخلية → قيمة enum الرقمية يلي بيطلبها POST.
//  * ✅ مؤكد من swagger.json الخام: GuardianDocumentType enum = [1, 3, 4, 5] (مش تسلسل عادي!)
//  * ✅ مؤكد بالاختبار: nationalId = 1 (السيرفر قبل الرقم، طاح بخطأ 500 منفصل بمعالجة الهوية نفسها)
//  * ⚠️ لسا ناقص: أي رقم من {3, 4, 5} يقابل guardianshipDeed/custodyDeclaration/selfieVideo بالضبط.
//  * جربي وحدة وحدة (أرقام قليلة، بسرعة بتوصلي) أو اسألي الباك اند مباشرة.
//  */
// export const DOCUMENT_TYPE_ENUM = {
//   nationalId: 1,
//   guardianshipDeed: 3, // ⚠️ تخمين لسا، جربي وصححي لو غلط
//   custodyDeclaration: 4, // ⚠️ تخمين لسا
//   selfieVideo: 5, // ⚠️ تخمين لسا
// };
import api from "./api";

export const guardianDocumentsApi = {
  getDocuments: async () => {
    const response = await api.get("/api/v1/guardians/me/documents");
    return response.data;
  },

  uploadDocument: async ({ documentTypeKey, file, nationalId }) => {
    const formData = new FormData();
    formData.append("DocumentType", DOCUMENT_TYPE_ENUM[documentTypeKey]);
    formData.append("File", file);
    if (documentTypeKey === "nationalId" && nationalId) {
      formData.append("NationalId", nationalId);
    }

    const response = await api.post("/api/v1/guardians/me/documents", formData, {
      headers: { "Content-Type": undefined },
    });
    return response.data;
  },

  getDocumentFile: async (documentId) => {
    const response = await api.get(
      `/api/v1/guardians/me/documents/${documentId}/file`,
      { responseType: "blob" }
    );
    return response.data;
  },
};

export const DOCUMENT_TYPE_ENUM = {
  nationalId: 1,
  guardianshipDeed: 3,
  custodyDeclaration: 5,
  selfieVideo: 4,
};