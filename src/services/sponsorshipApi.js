import api from "./api";

const FIXED_PLATFORM_BANK_ACCOUNT_ID =
  "8E9F3A2D-71B4-4C68-9A25-1F0D6E7B3C91";

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

  uploadPaymentProof: async (
    sponsorshipId,
    { transferReference, paymentProof },
  ) => {
    const formData = new FormData();
    formData.append("PlatformBankAccountId", FIXED_PLATFORM_BANK_ACCOUNT_ID);
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
