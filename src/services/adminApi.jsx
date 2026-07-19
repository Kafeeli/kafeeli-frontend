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
import api from "./api";

export const adminApi = {
  // GET /api/v1/admin/guardian-bank-accounts/pending
  // القائمة: قيم مقنّعة (accountNumberMasked, ibanMasked)
  getPendingBankAccounts: async () => {
    const response = await api.get("/api/v1/admin/guardian-bank-accounts/pending");
    return response.data;
  },

  // GET /api/v1/admin/guardian-bank-accounts/{id}
  // التفاصيل: قيم كاملة (accountNumber, iban)
  getBankAccountDetails: async (id) => {
    const response = await api.get(`/api/v1/admin/guardian-bank-accounts/${id}`);
    return response.data;
  },

  // POST /api/v1/admin/guardian-bank-accounts/{id}/verify
  // action: "Approve" أو "NeedsUpdate"
  // reason مطلوب فقط لو action === "NeedsUpdate"
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
};
