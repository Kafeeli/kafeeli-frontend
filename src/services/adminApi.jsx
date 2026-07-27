// import api from "./api";

// export const adminApi = {
//   // GET /api/v1/admin/guardian-bank-accounts/pending
//   getPendingBankAccounts: async () => {
//     const response = await api.get("/api/v1/admin/guardian-bank-accounts/pending");
//     return response.data;
//   },

//   // GET /api/v1/admin/guardian-bank-accounts/{id}
//   getBankAccountDetails: async (id) => {
//     const response = await api.get(`/api/v1/admin/guardian-bank-accounts/${id}`);
//     return response.data;
//   },

//   // POST /api/v1/admin/guardian-bank-accounts/{id}/verify
//   // action: "Approve" أو "NeedsUpdate"
//   // reason/rejectionReason: مطلوب لو action === "NeedsUpdate"
//   verifyBankAccount: async (id, { action, reason }) => {
//     const response = await api.post(
//       `/api/v1/admin/guardian-bank-accounts/${id}/verify`,
//       {
//         action,
//         reason: action === "NeedsUpdate" ? reason : undefined,
//         rejectionReason: action === "NeedsUpdate" ? reason : undefined,
//       }
//     );
//     return response.data;
//   },
// };
// //////////////////////////////////////////////////
// import api from "./api";

// export const adminApi = {
//   // GET /api/v1/admin/guardian-bank-accounts/pending
//   // القائمة: قيم مقنّعة (accountNumberMasked, ibanMasked)
//   getPendingBankAccounts: async () => {
//     const response = await api.get("/api/v1/admin/guardian-bank-accounts/pending");
//     return response.data;
//   },

//   // GET /api/v1/admin/guardian-bank-accounts/{id}
//   // التفاصيل: قيم كاملة (accountNumber, iban)
//   getBankAccountDetails: async (id) => {
//     const response = await api.get(`/api/v1/admin/guardian-bank-accounts/${id}`);
//     return response.data;
//   },

//   // POST /api/v1/admin/guardian-bank-accounts/{id}/verify
//   // action: "Approve" أو "NeedsUpdate"
//   // reason مطلوب فقط لو action === "NeedsUpdate"
//   verifyBankAccount: async (id, { action, reason }) => {
//     const response = await api.post(
//       `/api/v1/admin/guardian-bank-accounts/${id}/verify`,
//       {
//         action,
//         reason: action === "NeedsUpdate" ? reason : undefined,
//         rejectionReason: action === "NeedsUpdate" ? reason : undefined,
//       }
//     );
//     return response.data;
//   },
// };
import api from "./api";

export const adminApi = {
  // GET /api/v1/admin/guardian-bank-accounts/pending
  getPendingBankAccounts: async () => {
    const response = await api.get("/api/v1/admin/guardian-bank-accounts/pending");
    return response.data;
  },

  // GET /api/v1/admin/guardian-bank-accounts/{id}
  getBankAccountDetails: async (id) => {
    const response = await api.get(`/api/v1/admin/guardian-bank-accounts/${id}`);
    return response.data;
  },

  // POST /api/v1/admin/guardian-bank-accounts/{id}/verify
  verifyBankAccount: async (id, { action, reason }) => {
    const response = await api.post(
      `/api/v1/admin/guardian-bank-accounts/${id}/verify`,
      {
        action,
        reason: action === "NeedsUpdate" ? reason : undefined,
        rejectionReason: action === "NeedsUpdate" ? reason : undefined,
      }
    );
    return response.data;
  },

  // ============ مراجعة وثائق الأوصياء ============

  // GET /api/v1/admin/guardian-documents/pending
  getPendingDocuments: async () => {
    const response = await api.get("/api/v1/admin/guardian-documents/pending");
    return response.data;
  },

  // GET /api/v1/admin/guardian-documents/{documentId}/file
  getDocumentFile: async (documentId) => {
    const response = await api.get(
      `/api/v1/admin/guardian-documents/${documentId}/file`,
      { responseType: "blob" }
    );
    return response.data;
  },

  // POST /api/v1/admin/guardian-documents/{id}/approve
  approveDocument: async (id) => {
    const response = await api.post(
      `/api/v1/admin/guardian-documents/${id}/approve`
    );
    return response.data;
  },

  // POST /api/v1/admin/guardian-documents/{id}/needs-update
  requestDocumentUpdate: async (id, reason) => {
    const response = await api.post(
      `/api/v1/admin/guardian-documents/${id}/needs-update`,
      { reason }
    );
    return response.data;
  },
  // ============ توثيق الوصي (الحساب ككل) ============

  // GET /api/v1/admin/guardians/{guardianId}/verification
  getGuardianVerification: async (guardianId) => {
    const response = await api.get(
      `/api/v1/admin/guardians/${guardianId}/verification`
    );
    return response.data;
  },

  // PUT /api/v1/admin/guardians/{guardianId}/verification/approve
  approveGuardian: async (guardianId) => {
    const response = await api.put(
      `/api/v1/admin/guardians/${guardianId}/verification/approve`
    );
    return response.data;
  },

  // PUT /api/v1/admin/guardians/{guardianId}/verification/reject
  rejectGuardian: async (guardianId, rejectionReason) => {
    const response = await api.put(
      `/api/v1/admin/guardians/${guardianId}/verification/reject`,
      { rejectionReason }
    );
    return response.data;
  },

  // PUT /api/v1/admin/guardians/{guardianId}/verification/recalculate
  recalculateGuardianStatus: async (guardianId) => {
    const response = await api.put(
      `/api/v1/admin/guardians/${guardianId}/verification/recalculate`
    );
    return response.data;
  },
};