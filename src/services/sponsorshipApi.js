import api from "./api";

export const sponsorshipApi = {
  create: async ({ familyId, orphanId, monthlyAmount, numberOfMonths }) => {
    const response = await api.post("/api/v1/sponsorships", {
      familyId,
      orphanId,
      monthlyAmount,
      numberOfMonths,
    });
    return response.data;
  },

  getMine: async () => {
    const response = await api.get("/api/v1/sponsors/me/sponsorships");
    return response.data;
  },

  getById: async (sponsorshipId) => {
    const response = await api.get(`/api/v1/sponsorships/${sponsorshipId}`);
    return response.data;
  },

  getPlatformBankAccounts: async () => {
    const response = await api.get("/api/v1/platform-bank-accounts");
    return response.data;
  },

  uploadPaymentProof: async (
    sponsorshipId,
    { platformBankAccountId, transferReference, paymentProof },
  ) => {
    const formData = new FormData();
    formData.append("PlatformBankAccountId", platformBankAccountId);
    if (transferReference.trim()) {
      formData.append("TransferReference", transferReference.trim());
    }
    formData.append("PaymentProof", paymentProof);

    const response = await api.post(
      `/api/v1/sponsorships/${sponsorshipId}/payment-proof`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": undefined,
        },
      },
    );
    return response.data;
  },
};
