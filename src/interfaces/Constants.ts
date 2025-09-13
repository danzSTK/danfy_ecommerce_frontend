export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: "danfy:ACCESS_TOKEN",
  REFRESH_TOKEN: "danfy:REFRESH_TOKEN",
  CART: "danfy:CART_ITEMS",
};

export const USER_ROLES = {
  admin: "admin",
  user: "user",
} as const;

export const USER_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];
export type UserRoles = typeof USER_ROLES[keyof typeof USER_ROLES];
