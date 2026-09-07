# Kafeeli endpoint coverage

Contract audited from backend `main` at `195061b72a0492433f8f9c6c113a99fe5919a486` on 2026-09-03. `Integrated` means a real service call is connected to a screen, action, route guard, or authentication infrastructure. No endpoint listed below is inferred.

| Endpoint | Role | Frontend service | UI/action | Status |
|---|---|---|---|---|
| `GET /api/health` | Public | — | Deployment health probe | Internal/backend-only |
| `POST /api/v1/auth/change-password` | Authenticated | `authApi.changePassword` | Profile password modal | Integrated |
| `POST /api/v1/auth/forgot-password` | Public | `authApi.forgetPassword` | Forgot-password page | Integrated |
| `POST /api/v1/auth/login` | Public | `authApi.login` | Login page | Integrated |
| `POST /api/v1/auth/logout` | Authenticated | `authApi.logout` | Role sidebars | Integrated |
| `POST /api/v1/auth/refresh-token` | Public | `authApi.refreshToken` / interceptor | Automatic token refresh | Integrated |
| `POST /api/v1/auth/register` | Public | `authApi.register` | Registration page | Integrated |
| `POST /api/v1/auth/reset-password` | Public | `authApi.resetPassword` | Reset-password page | Integrated |
| `POST /api/v1/auth/send-email-confirmation` | Public | `authApi.sendResendEmailConfirmation` | Email verification/resend | Integrated |
| `POST /api/v1/auth/verify-email` | Public | `authApi.verifyEmail` | Email verification page | Integrated |
| `GET /api/v1/dashboard/me` | Authenticated | `dashboardApi.getMine` | Sponsor, Guardian, Admin dashboards | Integrated |
| `GET /api/v1/users/me` | Authenticated | `currentUserApi.getSession` | Server-backed route/session verification | Integrated |
| `GET /api/v1/sponsors/me` | Sponsor | `sponsorApi.getProfile` | Sponsor profile | Integrated |
| `PUT /api/v1/sponsors/me` | Sponsor | `sponsorApi.updateProfile` | Sponsor profile edit | Integrated |
| `GET /api/v1/guardians/me` | Guardian | `guardianApi.getProfile` | Guardian profile/documents | Integrated |
| `PUT /api/v1/guardians/me` | Guardian | `guardianApi.updateProfile` | Guardian profile edit | Integrated |
| `GET /api/v1/guardians/me/payouts` | Guardian | `payoutApi.getMine` | Guardian payouts page | Integrated |
| `GET /api/v1/guardians/me/payouts/{payoutId}` | Guardian | `payoutApi.getMineById` | Guardian payout details | Integrated |
| `POST /api/v1/guardians/me/national-id/check-availability` | Guardian | `guardianApi.checkNationalIdAvailability` | National-ID document upload | Integrated |
| `GET /api/v1/guardians/me/documents` | Guardian | `guardianDocumentsApi.getDocuments` | Guardian documents page | Integrated |
| `POST /api/v1/guardians/me/documents` | Guardian | `guardianDocumentsApi.uploadDocument` | Upload/reupload modal | Integrated |
| `GET /api/v1/guardians/me/documents/{documentId}/file` | Guardian | `guardianDocumentsApi.getDocumentFile` | Authenticated blob viewer | Integrated |
| `GET /api/v1/guardians/me/bank-accounts` | Guardian | `bankAccountApi.getBankAccount` | Guardian payout-account section | Integrated |
| `POST /api/v1/guardians/me/bank-accounts` | Guardian | `bankAccountApi.createBankAccount` | Add payout-account modal | Integrated |
| `PUT /api/v1/guardians/me/bank-accounts/{id}` | Guardian | `bankAccountApi.updateBankAccount` | Backend-state-driven account edit | Integrated |
| `GET /api/v1/guardians/me/families` | Guardian | `familyApi.getFamilies` | Guardian families page | Integrated |
| `POST /api/v1/guardians/me/families` | Guardian | `familyApi.createFamily` | Add-family page | Integrated |
| `GET /api/v1/families/{familyId}` | Sponsor | `sponsorApi.getFamily` | Sponsor family details | Integrated |
| `PUT /api/v1/families/{familyId}` | Guardian | `familyApi.updateFamily` | Family edit page | Integrated |
| `GET /api/v1/guardians/me/families/{familyId}` | Guardian | `familyApi.getFamily` | Guardian family details | Integrated |
| `POST /api/v1/guardians/me/families/{familyId}/orphans` | Guardian | `orphanApi.create` | Add-orphan page | Integrated |
| `GET /api/v1/guardians/me/families/{familyId}/father-death-certificate` | Guardian | `familyApi.getFatherDeathCertificate` | Authenticated certificate viewer | Integrated |
| `GET /api/v1/admin/families/pending` | Admin/SuperAdmin | `adminApi.getPendingFamilies` | Family review queue | Integrated |
| `POST /api/v1/admin/families/{id}/approve` | Admin/SuperAdmin | `adminApi.approveFamily` | Family approval action | Integrated |
| `POST /api/v1/admin/families/{id}/hide` | Admin/SuperAdmin | `adminApi.hideFamily` | No safe active-family source | Blocked by backend list gap |
| `POST /api/v1/admin/families/{id}/needs-update` | Admin/SuperAdmin | `adminApi.requestFamilyUpdate` | Family needs-update action | Integrated |
| `POST /api/v1/admin/families/{id}/suspend` | Admin/SuperAdmin | `adminApi.suspendFamily` | No safe active-family source | Blocked by backend list gap |
| `GET /api/v1/admin/families/{id}/father-death-certificate` | Admin/SuperAdmin | `adminApi.getFamilyFatherDeathCertificate` | Authenticated review viewer | Integrated |
| `GET /api/v1/guardians/me/orphans` | Guardian | `orphanApi.getMine` | Guardian orphan list/family details | Integrated |
| `GET /api/v1/guardians/me/orphans/{orphanId}` | Guardian | `orphanApi.getById` | Orphan details/edit | Integrated |
| `PUT /api/v1/guardians/me/orphans/{orphanId}` | Guardian | `orphanApi.update` | Orphan edit page | Integrated |
| `GET /api/v1/guardians/me/orphans/{orphanId}/documents` | Guardian | `orphanApi.getDocuments` | Orphan document checklist | Integrated |
| `POST /api/v1/guardians/me/orphans/{orphanId}/documents` | Guardian | `orphanApi.reuploadDocument` | Backend-enabled reupload action | Integrated |
| `POST /api/v1/guardians/me/orphans/{orphanId}/resubmit` | Guardian | `orphanApi.resubmit` | Backend-enabled resubmit action | Integrated |
| `GET /api/v1/guardians/me/orphans/{orphanId}/documents/{documentId}/file` | Guardian | `orphanApi.getDocumentFile` | Authenticated blob viewer | Integrated |
| `GET /api/v1/guardians/me/orphans/{orphanId}/profile-image` | Guardian | `orphanApi.getProfileImage` | Authenticated image blob | Integrated |
| `GET /api/v1/admin/orphan-documents/pending` | Admin/SuperAdmin | `adminApi.getPendingOrphanDocuments` | Admin orphan review page | Integrated |
| `GET /api/v1/admin/orphans/pending` | Admin/SuperAdmin | `adminApi.getPendingOrphans` | Admin orphan queue | Integrated |
| `GET /api/v1/admin/orphans` | Admin/SuperAdmin | `adminApi.getAllOrphans` | Admin orphan management | Integrated |
| `GET /api/v1/admin/orphans/{orphanId}` | Admin/SuperAdmin | `adminApi.getOrphanDetails` | Admin orphan details | Integrated |
| `PATCH /api/v1/admin/orphans/{orphanId}` | Admin/SuperAdmin | `adminApi.updateOrphan` | Admin orphan edit | Integrated |
| `PATCH /api/v1/admin/orphans/{orphanId}/status` | Admin/SuperAdmin | `adminApi.updateOrphanStatus` | Active/Hidden/Suspended management | Integrated |
| `DELETE /api/v1/admin/orphans/{orphanId}` | Admin/SuperAdmin | `adminApi.deleteOrphan` | Confirmed permanent delete | Integrated |
| `POST /api/v1/admin/orphan-documents/{documentId}/needs-update` | Admin/SuperAdmin | `adminApi.requestOrphanDocumentUpdate` | Document update request | Integrated |
| `POST /api/v1/admin/orphans/{id}/approve` | Admin/SuperAdmin | `adminApi.approveOrphan` | Atomic orphan and current-document approval | Integrated |
| `POST /api/v1/admin/orphans/{id}/needs-update` | Admin/SuperAdmin | `adminApi.requestOrphanUpdate` | Orphan update request | Integrated |
| `GET /api/v1/admin/orphan-documents/{documentId}/file` | Admin/SuperAdmin | `adminApi.getOrphanDocumentFile` | Authenticated blob viewer | Integrated |
| `GET /api/v1/admin/orphans/{orphanId}/profile-image` | Admin/SuperAdmin | `adminApi.getOrphanProfileImage` | Authenticated image blob | Integrated |
| `GET /api/v1/families` | Sponsor | `sponsorApi.getFamilies` | Sponsor family browser | Integrated |
| `GET /api/v1/orphans` | Sponsor | `sponsorApi.getOrphans` | Sponsor orphan browser | Integrated |
| `GET /api/v1/orphans/{id}` | Sponsor | `sponsorApi.getOrphan` | Sponsor orphan details | Integrated |
| `GET /api/v1/orphans/{id}/profile-image` | Sponsor | `sponsorApi.getOrphanProfileImage` | Authenticated image blob | Integrated |
| `GET /api/v1/sponsors/me/sponsorships` | Sponsor | `sponsorshipApi.getMine` | Sponsor sponsorship list/dashboard | Integrated |
| `GET /api/v1/platform-bank-accounts` | Sponsor | `sponsorshipApi.getPlatformBankAccounts` | Bank-transfer instructions and account selection | Integrated |
| `GET /api/v1/sponsorships/{id}` | Sponsor/Admin/SuperAdmin | `sponsorshipApi.getById` | Sponsor details; admin review DTOs embed required context | Integrated |
| `POST /api/v1/admin/sponsorships/{sponsorshipId}/payout` | Admin/SuperAdmin | `adminApi.createPayout` | Admin payout creation form | Integrated; no candidate list |
| `POST /api/v1/sponsorships` | Sponsor | `sponsorshipApi.create` | Family/orphan sponsorship actions | Integrated |
| `POST /api/v1/sponsorships/{sponsorshipId}/payment-proof` | Sponsor | `sponsorshipApi.uploadPaymentProof` | Sponsorship details upload | Integrated to formal schema; contract blocker noted below |
| `GET /api/v1/admin/guardian-bank-accounts/pending` | Admin/SuperAdmin | `adminApi.getPendingBankAccounts` | Bank-account review queue | Integrated |
| `GET /api/v1/admin/guardian-documents/pending` | Admin/SuperAdmin | `adminApi.getPendingDocuments` | Guardian-document queue | Integrated |
| `GET /api/v1/admin/payments/pending` | Admin/SuperAdmin | `adminApi.getPendingPayments` | Payment review queue | Integrated |
| `GET /api/v1/admin/payouts/pending` | Admin/SuperAdmin | `adminApi.getPendingPayouts` | Payout queue | Integrated |
| `GET /api/v1/admin/guardian-bank-accounts/{id}` | Admin/SuperAdmin | `adminApi.getBankAccountDetails` | Bank-account details modal | Integrated |
| `GET /api/v1/admin/guardians/{guardianId}/verification` | Admin/SuperAdmin | `adminApi.getGuardianVerification` | Guardian verification review | Integrated |
| `GET /api/v1/admin/guardians` | Admin/SuperAdmin | `adminApi.getAllGuardians` | Guardian management list | Integrated |
| `GET /api/v1/admin/guardians/{guardianId}` | Admin/SuperAdmin | `adminApi.getGuardianDetails` | Guardian management details | Integrated |
| `PATCH /api/v1/admin/guardians/{guardianId}` | Admin/SuperAdmin | `adminApi.updateGuardian` | Guardian edit | Integrated |
| `PATCH /api/v1/admin/guardians/{guardianId}/status` | Admin/SuperAdmin | `adminApi.updateGuardianStatus` | Suspend/reactivate Guardian | Integrated |
| `DELETE /api/v1/admin/guardians/{guardianId}` | Admin/SuperAdmin | `adminApi.deleteGuardian` | Confirmed permanent delete | Integrated |
| `GET /api/v1/admin/sponsors` | Admin/SuperAdmin | `adminApi.getAllSponsors` | Sponsor management list | Integrated |
| `GET /api/v1/admin/sponsors/{sponsorId}` | Admin/SuperAdmin | `adminApi.getSponsorDetails` | Sponsor management details | Integrated |
| `PATCH /api/v1/admin/sponsors/{sponsorId}` | Admin/SuperAdmin | `adminApi.updateSponsor` | Sponsor edit | Integrated |
| `PATCH /api/v1/admin/sponsors/{sponsorId}/status` | Admin/SuperAdmin | `adminApi.updateSponsorStatus` | Suspend/reactivate Sponsor | Integrated |
| `DELETE /api/v1/admin/sponsors/{sponsorId}` | Admin/SuperAdmin | `adminApi.deleteSponsor` | Confirmed permanent delete | Integrated |
| `GET /api/v1/admin/payments/{paymentId}` | Admin/SuperAdmin | `adminApi.getPaymentDetails` | Payment details pane | Integrated |
| `GET /api/v1/admin/payments/{paymentId}/proof` | Admin/SuperAdmin | `adminApi.getPaymentProof` | Authenticated proof blob | Integrated |
| `GET /api/v1/admin/payouts/{payoutId}` | Admin/SuperAdmin | `adminApi.getPayoutDetails` | Payout details pane | Integrated |
| `POST /api/v1/admin/payouts/{payoutId}/complete` | Admin/SuperAdmin | `adminApi.completePayout` | Complete payout action | Integrated |
| `POST /api/v1/admin/payouts/{payoutId}/fail` | Admin/SuperAdmin | `adminApi.failPayout` | Fail payout action | Integrated |
| `PUT /api/v1/admin/guardian-documents/{documentId}/review` | Admin/SuperAdmin | — | Same Approved/NeedsUpdate workflow as dedicated actions | Redundant alternative endpoint |
| `PUT /api/v1/admin/guardians/{guardianId}/verification/approve` | Admin/SuperAdmin | `adminApi.approveGuardian` | Guardian approval | Integrated |
| `PUT /api/v1/admin/guardians/{guardianId}/verification/recalculate` | Admin/SuperAdmin | `adminApi.recalculateGuardianStatus` | Verification recalculation | Integrated |
| `PUT /api/v1/admin/guardians/{guardianId}/verification/reject` | Admin/SuperAdmin | `adminApi.rejectGuardian` | Guardian rejection | Integrated |
| `POST /api/v1/admin/guardian-bank-accounts/{id}/verify` | Admin/SuperAdmin | `adminApi.verifyBankAccount` | Approve/NeedsUpdate action | Integrated |
| `POST /api/v1/admin/guardian-documents/{id}/approve` | Admin/SuperAdmin | `adminApi.approveDocument` | Document approval | Integrated |
| `POST /api/v1/admin/guardian-documents/{id}/needs-update` | Admin/SuperAdmin | `adminApi.requestDocumentUpdate` | Document update request | Integrated |
| `POST /api/v1/admin/payments/{paymentId}/approve` | Admin/SuperAdmin | `adminApi.approvePayment` | Payment approval | Integrated |
| `POST /api/v1/admin/payments/{paymentId}/reject` | Admin/SuperAdmin | `adminApi.rejectPayment` | Payment rejection | Integrated |
| `GET /api/v1/admin/guardian-documents/{documentId}/download` | Admin/SuperAdmin | — | Compatibility alias of preferred `/file` route | Redundant compatibility alias |
| `GET /api/v1/admin/guardian-documents/{documentId}/file` | Admin/SuperAdmin | `adminApi.getDocumentFile` | Authenticated blob viewer | Integrated |

## Current blockers

1. Payout creation is connected, but the backend exposes no Admin list of payout-eligible Active sponsorships. The UI therefore requires a known sponsorship UUID and clearly identifies that limitation.
2. No wallet, periodic-update, notification, audit-log, or SuperAdmin-management endpoints exist in the current contract.
