import api from "./api";

export const bankAccountApi = {
  // GET /api/v1/guardians/me/bank-accounts
  // يرجع ملخص حساب التحويل الحالي (القيم الحساسة مقنّعة: accountNumberMasked, ibanMasked)
  getBankAccount: async () => {
    const response = await api.get("/api/v1/guardians/me/bank-accounts");
    return response.data;
  },

  // POST /api/v1/guardians/me/bank-accounts
  // بينشئ حساب التحويل الوحيد المسموح للوصي. يبدأ الحساب دائمًا بحالة "Pending"
  createBankAccount: async ({ bankName, accountHolderName, accountNumber, iban, branchName }) => {
    const response = await api.post("/api/v1/guardians/me/bank-accounts", {
      bankName,
      accountHolderName,
      accountNumber,
      iban,
      branchName,
    });
    return response.data;
  },

  // PUT /api/v1/guardians/me/bank-accounts/{id}
  // مسموح فقط إذا كانت حالة الحساب الحالية "NeedsUpdate" (طلب تعديل من الإدارة).
  // بعد التعديل، يعود الحساب تلقائيًا إلى حالة "Pending".
  updateBankAccount: async (id, { bankName, accountHolderName, accountNumber, iban, branchName }) => {
    const response = await api.put(`/api/v1/guardians/me/bank-accounts/${id}`, {
      bankName,
      accountHolderName,
      accountNumber,
      iban,
      branchName,
    });
    return response.data;
  },
};
