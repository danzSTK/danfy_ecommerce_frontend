export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "danfy:ACCESS_TOKEN",
  REFRESH_TOKEN: "danfy:REFRESH_TOKEN",
  CART: "danfy:CART_ITEMS",
};

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  MANAGER: "manager",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];
export type UserRoles = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export const COUNTRYS = {
  BRAZIL: "BR",
  USA: "US",
  CANADA: "CA",
  MEXICO: "MX",
  ARGENTINA: "AR",
  CHILE: "CL",
  COLOMBIA: "CO",
  PERU: "PE",
  VENEZUELA: "VE",
  URUGUAY: "UY",
  PARAGUAY: "PY",
  BOLIVIA: "BO",
  ECUADOR: "EC",
  GUYANA: "GY",
  SURINAME: "SR",
  FRENCH_GUIANA: "GF",
} as const;

export type Countrys = (typeof COUNTRYS)[keyof typeof COUNTRYS];
