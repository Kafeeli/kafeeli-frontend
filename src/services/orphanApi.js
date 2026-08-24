import api from "./api";

function appendOrphanFields(formData, values) {
  formData.append("firstName", values.firstName);
  formData.append("fatherName", values.fatherName);
  formData.append("grandfatherName", values.grandfatherName);
  formData.append("nationalId", values.nationalId);
  if (values.dateOfBirth) formData.append("dateOfBirth", values.dateOfBirth);
  if (values.gender) formData.append("gender", values.gender);
  formData.append("educationStatus", values.educationStatus);
  formData.append("caseDescription", values.caseDescription);
  if (values.profileImage) formData.append("profileImage", values.profileImage);
}

export const orphanApi = {
  getMine: async () => {
    const response = await api.get("/api/v1/guardians/me/orphans");
    return response.data;
  },
  getById: async (orphanId) => {
    const response = await api.get(`/api/v1/guardians/me/orphans/${orphanId}`);
    return response.data;
  },
  create: async (familyId, values) => {
    const formData = new FormData();
    appendOrphanFields(formData, values);
    formData.append("birthCertificate", values.birthCertificate);
    const response = await api.post(`/api/v1/guardians/me/families/${familyId}/orphans`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  update: async (orphanId, values) => {
    const formData = new FormData();
    appendOrphanFields(formData, values);
    const response = await api.put(`/api/v1/guardians/me/orphans/${orphanId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  getDocuments: async (orphanId) => {
    const response = await api.get(`/api/v1/guardians/me/orphans/${orphanId}/documents`);
    return response.data;
  },
  reuploadDocument: async (orphanId, documentType, file) => {
    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("file", file);
    const response = await api.post(`/api/v1/guardians/me/orphans/${orphanId}/documents`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  resubmit: async (orphanId) => {
    const response = await api.post(`/api/v1/guardians/me/orphans/${orphanId}/resubmit`);
    return response.data;
  },
  getDocumentFile: async (orphanId, documentId) => {
    const response = await api.get(`/api/v1/guardians/me/orphans/${orphanId}/documents/${documentId}/file`, {
      responseType: "blob",
    });
    return response.data;
  },
  getProfileImage: async (orphanId) => {
    const response = await api.get(`/api/v1/guardians/me/orphans/${orphanId}/profile-image`, {
      responseType: "blob",
    });
    return response.data;
  },
};
