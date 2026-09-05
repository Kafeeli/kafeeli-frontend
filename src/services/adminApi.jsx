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

  updateFamilyStatus: async (familyId, status, reason = null) => {
    const response = await api.patch(
      `/api/v1/admin/families/${familyId}/status`,
      {
        status,
        reason: status === "NeedsUpdate" ? reason?.trim() : null,
      },
    );
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

  getAllGuardianDocuments: async (filters = {}) => {
    const params = Object.fromEntries(
      Object.entries(filters)
        .map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
        .filter(([, value]) => value !== "" && value !== "all" && value != null),
    );
    const response = await api.get("/api/v1/admin/guardian-documents", { params });
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

  updateGuardianDocumentStatus: async (documentId, status, reason = "") => {
    const trimmedReason = typeof reason === "string" ? reason.trim() : "";
    const response = await api.patch(
      `/api/v1/admin/guardian-documents/${documentId}/status`,
      { status, ...(trimmedReason ? { reason: trimmedReason } : {}) },
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

  getAllGuardians: async () => {
    const response = await api.get("/api/v1/admin/guardians");
    return response.data;
  },

  getGuardianDetails: async (guardianId) => {
    const response = await api.get(`/api/v1/admin/guardians/${guardianId}`);
    return response.data;
  },

  updateGuardian: async (guardianId, payload) => {
    const response = await api.patch(`/api/v1/admin/guardians/${guardianId}`, payload);
    return response.data;
  },

  updateGuardianStatus: async (guardianId, isActive, reason = null) => {
    const response = await api.patch(`/api/v1/admin/guardians/${guardianId}/status`, {
      isActive,
      reason: reason?.trim() || null,
    });
    return response.data;
  },

  deleteGuardian: async (guardianId) => {
    const response = await api.delete(`/api/v1/admin/guardians/${guardianId}`);
    return response.data;
  },

  getAllSponsors: async () => {
    const response = await api.get("/api/v1/admin/sponsors");
    return response.data;
  },

  getSponsorDetails: async (sponsorId) => {
    const response = await api.get(`/api/v1/admin/sponsors/${sponsorId}`);
    return response.data;
  },

  updateSponsor: async (sponsorId, payload) => {
    const response = await api.patch(`/api/v1/admin/sponsors/${sponsorId}`, payload);
    return response.data;
  },

  updateSponsorStatus: async (sponsorId, isActive, reason = null) => {
    const response = await api.patch(`/api/v1/admin/sponsors/${sponsorId}/status`, {
      isActive,
      reason: reason?.trim() || null,
    });
    return response.data;
  },

  deleteSponsor: async (sponsorId) => {
    const response = await api.delete(`/api/v1/admin/sponsors/${sponsorId}`);
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
  getAllOrphans: async () => {
    const response = await api.get("/api/v1/admin/orphans");
    return response.data;
  },
  getOrphanDetails: async (orphanId) => {
    const response = await api.get(`/api/v1/admin/orphans/${orphanId}`);
    return response.data;
  },
  updateOrphan: async (orphanId, payload) => {
    const response = await api.patch(`/api/v1/admin/orphans/${orphanId}`, payload);
    return response.data;
  },
  updateOrphanStatus: async (orphanId, status, reason = null) => {
    const statusValues = { Active: 2, Hidden: 3, Suspended: 4 };
    const response = await api.patch(`/api/v1/admin/orphans/${orphanId}/status`, {
      status: statusValues[status],
      reason: reason?.trim() || null,
    });
    return response.data;
  },
  deleteOrphan: async (orphanId) => {
    const response = await api.delete(`/api/v1/admin/orphans/${orphanId}`);
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
  getAllOrphanDocuments: async (filters = {}) => {
    const params = Object.fromEntries(
      Object.entries(filters)
        .map(([key, value]) => [key, typeof value === "string" ? value.trim() : value])
        .filter(([, value]) => value !== "" && value !== "all" && value != null),
    );
    const response = await api.get("/api/v1/admin/orphan-documents", { params });
    return response.data;
  },
  requestOrphanDocumentUpdate: async (documentId, reason) => {
    const response = await api.post(`/api/v1/admin/orphan-documents/${documentId}/needs-update`, { reason });
    return response.data;
  },
  updateOrphanDocumentStatus: async (documentId, status, reason = "") => {
    const trimmedReason = typeof reason === "string" ? reason.trim() : "";
    const response = await api.patch(
      `/api/v1/admin/orphan-documents/${documentId}/status`,
      { status, ...(trimmedReason ? { reason: trimmedReason } : {}) },
    );
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
