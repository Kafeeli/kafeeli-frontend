import api from "./api";

export const familyApi = {
  // GET /api/v1/guardians/me/families
  // يرجع { families: [...], totalCount }
  getFamilies: async () => {
    const response = await api.get("/api/v1/guardians/me/families");
    return response.data;
  },

  // GET /api/v1/guardians/me/families/{familyId}
  getFamily: async (familyId) => {
    const response = await api.get(`/api/v1/guardians/me/families/${familyId}`);
    return response.data;
  },

  // POST /api/v1/guardians/me/families (multipart/form-data)
  createFamily: async ({
    headOfHouseholdName,
    city,
    address,
    caseDescription,
    monthlyNeedAmount,
    fatherDeathCertificate,
  }) => {
    const formData = new FormData();
    formData.append("headOfHouseholdName", headOfHouseholdName);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("caseDescription", caseDescription); // required
    if (monthlyNeedAmount !== undefined) {
      formData.append("monthlyNeedAmount", monthlyNeedAmount);
    }
    if (fatherDeathCertificate) {
      formData.append("fatherDeathCertificate", fatherDeathCertificate);
    }

    const response = await api.post("/api/v1/guardians/me/families", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // PUT /api/v1/families/{familyId} (multipart/form-data)
  // ⚠️ فقط لو الحالة Active أو NeedsUpdate — بيرجعها Pending تلقائيًا بعد التعديل
  updateFamily: async (
    familyId,
    { headOfHouseholdName, city, address, description, monthlyNeedAmount, fatherDeathCertificate }
  ) => {
    const formData = new FormData();
    formData.append("headOfHouseholdName", headOfHouseholdName);
    formData.append("city", city);
    formData.append("address", address);
    if (description !== undefined) formData.append("description", description);
    if (monthlyNeedAmount !== undefined) {
      formData.append("monthlyNeedAmount", monthlyNeedAmount);
    }
    if (fatherDeathCertificate) {
      formData.append("fatherDeathCertificate", fatherDeathCertificate);
    }

    const response = await api.put(`/api/v1/families/${familyId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // GET /api/v1/guardians/me/families/{familyId}/father-death-certificate
  getFatherDeathCertificate: async (familyId) => {
    const response = await api.get(
      `/api/v1/guardians/me/families/${familyId}/father-death-certificate`,
      { responseType: "blob" }
    );
    return response.data;
  },
};
