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
  // ============ مراجعة العائلات ============

  getFamilies: async () => {
    const response = await api.get("/api/v1/admin/families");
    return response.data;
  },

  getPendingFamilies: async () => {
    const response = await api.get("/api/v1/admin/families/pending");
    return response.data;
  },

  approveFamily: async (id) => {
    const response = await api.post(`/api/v1/admin/families/${id}/approve`);
    return response.data;
  },

  requestFamilyUpdate: async (id, reason) => {
    const response = await api.post(
      `/api/v1/admin/families/${id}/needs-update`,
      { reason },
    );
    return response.data;
  },

  hideFamily: async (id) => {
    const response = await api.post(`/api/v1/admin/families/${id}/hide`);
    return response.data;
  },

  suspendFamily: async (id) => {
    const response = await api.post(`/api/v1/admin/families/${id}/suspend`);
    return response.data;
  },

  getFamilyFatherDeathCertificate: async (id) => {
    const response = await api.get(
      `/api/v1/admin/families/${id}/father-death-certificate`,
      { responseType: "blob" },
    );
    return response.data;
  },

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

  getPendingOrphans: async () => {
    const response = await api.get("/api/v1/admin/orphans/pending");
    return response.data;
  },
  getOrphanDetails: async (orphanId) => {
    const response = await api.get(`/api/v1/admin/orphans/${orphanId}`);
    return response.data;
  },
  approveOrphan: async (orphanId) => {
    const response = await api.post(`/api/v1/admin/orphans/${orphanId}/approve`);
    return response.data;
  },
  requestOrphanUpdate: async (orphanId, reason) => {
    const response = await api.post(`/api/v1/admin/orphans/${orphanId}/needs-update`, { reason });
    return response.data;
  },
  getPendingOrphanDocuments: async () => {
    const response = await api.get("/api/v1/admin/orphan-documents/pending");
    return response.data;
  },
  approveOrphanDocument: async (documentId) => {
    const response = await api.post(`/api/v1/admin/orphan-documents/${documentId}/approve`);
    return response.data;
  },
  requestOrphanDocumentUpdate: async (documentId, reason) => {
    const response = await api.post(`/api/v1/admin/orphan-documents/${documentId}/needs-update`, { reason });
    return response.data;
  },
  getOrphanDocumentFile: async (documentId) => {
    const response = await api.get(`/api/v1/admin/orphan-documents/${documentId}/file`, {
      responseType: "blob",
    });
    return response.data;
  },
  getOrphanProfileImage: async (orphanId) => {
    const response = await api.get(`/api/v1/admin/orphans/${orphanId}/profile-image`, {
      responseType: "blob",
    });
    return response.data;
  },

  getPendingPayments: async () => {
    const response = await api.get("/api/v1/admin/payments/pending");
    return response.data;
  },
  getPaymentDetails: async (paymentId) => {
    const response = await api.get(`/api/v1/admin/payments/${paymentId}`);
    return response.data;
  },
  getPaymentProof: async (paymentId) => {
    const response = await api.get(`/api/v1/admin/payments/${paymentId}/proof`, {
      responseType: "blob",
    });
    return response.data;
  },
  approvePayment: async (paymentId) => {
    const response = await api.post(`/api/v1/admin/payments/${paymentId}/approve`);
    return response.data;
  },
  rejectPayment: async (paymentId, reason) => {
    const response = await api.post(`/api/v1/admin/payments/${paymentId}/reject`, { reason });
    return response.data;
  },

  createPayout: async (sponsorshipId, notes) => {
    const response = await api.post(`/api/v1/admin/sponsorships/${sponsorshipId}/payout`, {
      notes: notes || null,
    });
    return response.data;
  },
  getPendingPayouts: async () => {
    const response = await api.get("/api/v1/admin/payouts/pending");
    return response.data;
  },
  getEligiblePayouts: async () => {
    const response = await api.get("/api/v1/admin/payouts/eligible");
    return response.data;
  },
  getPayoutDetails: async (payoutId) => {
    const response = await api.get(`/api/v1/admin/payouts/${payoutId}`);
    return response.data;
  },
  completePayout: async (payoutId, transferReference) => {
    const response = await api.post(`/api/v1/admin/payouts/${payoutId}/complete`, { transferReference });
    return response.data;
  },
  failPayout: async (payoutId, reason) => {
    const response = await api.post(`/api/v1/admin/payouts/${payoutId}/fail`, { reason });
    return response.data;
  },
};
