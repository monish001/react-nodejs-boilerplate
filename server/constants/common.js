const CONSTANTS = {
  BCRYPT_ROUNDS: 8,
  ROLES_ADMIN: "ADMIN",
  ROLES_USER_MANAGER: "USER_MANAGER",
  ROLES_REGULAR_USER: "REGULAR_USER",
  GUID_REGEX: /^[-0-9a-fA-F]{36}$/,
  ISO_DATE_REGEX: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
};

module.exports = CONSTANTS;
