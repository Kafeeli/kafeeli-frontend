/**
 * @typedef {Object} AuditActor
 * @property {string} adminId
 * @property {string} name
 * @property {string} email
 */

/**
 * @typedef {Object} AuditAction
 * @property {string} code
 * @property {string} label
 */

/**
 * @typedef {Object} AuditTarget
 * @property {string} type
 * @property {string} id
 * @property {string | null} displayName
 */

/**
 * @typedef {Object} AdminAuditLog
 * @property {string} id
 * @property {AuditActor} actor
 * @property {AuditAction} action
 * @property {AuditTarget} target
 * @property {string} description
 * @property {string | null} reason
 * @property {string | null} details
 * @property {string} createdAt
 * @property {string} adminId
 * @property {string} adminName
 * @property {string} adminEmail
 * @property {string} actionType
 * @property {string} targetType
 * @property {string} targetId
 */

const targetTypeLabels = {
  Family: "عائلة",
  Guardian: "وصي",
  GuardianDocument: "مستند وصي",
  Orphan: "يتيم",
  OrphanDocument: "مستند يتيم",
  Sponsor: "كفيل",
  Payment: "دفعة",
  Payout: "تحويل مالي",
  Sponsorship: "كفالة",
  GuardianBankAccount: "حساب بنكي للوصي",
};

export function getAuditTargetTypeLabel(targetType) {
  return targetTypeLabels[targetType] || targetType || "غير معروف";
}

/**
 * Prefer the new nested response while retaining flat-field fallbacks for older records.
 * @param {Partial<AdminAuditLog>} log
 * @returns {AdminAuditLog}
 */
export function normalizeAdminAuditLog(log = {}) {
  const actor = log.actor || {};
  const action = log.action || {};
  const target = log.target || {};

  const adminId = actor.adminId || log.adminId || "";
  const adminName = actor.name || log.adminName || "";
  const adminEmail = actor.email || log.adminEmail || "";
  const actionType = action.code || log.actionType || "";
  const targetType = target.type || log.targetType || "";
  const targetId = target.id || log.targetId || "";

  return {
    ...log,
    id: log.id || "",
    actor: { adminId, name: adminName, email: adminEmail },
    action: { code: actionType, label: action.label || actionType },
    target: {
      type: targetType,
      id: targetId,
      displayName: target.displayName || null,
    },
    description: log.description || "",
    reason: log.reason || null,
    details: log.details || null,
    createdAt: log.createdAt || "",
    adminId,
    adminName,
    adminEmail,
    actionType,
    targetType,
    targetId,
  };
}
