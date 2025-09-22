import { Countrys, type UserRoles, type UserStatus } from "./Constants";

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  isEmailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationTokenExpiresAt: Date | null;
  passwordHash: string;
  phone: string | null;
  isPhoneVerified: boolean;
  acceptsEmailMarketing: boolean;
  acceptsSmsMarketing: boolean;
  acceptsWhatsappMarketing: boolean;
  acceptsTerms: boolean;
  acceptsPrivacy: boolean;
  acceptedTermsAt: Date | null;
  acceptedPrivacyAt: Date | null;
  lastLoginAt: Date | null;
  locale: string;
  currency: string;
  country: Countrys | null;
  state: string | null;
  role: UserRoles;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export type ICretedUserRequest = Omit<
  IUser,
  | "id"
  | "role"
  | "status"
  | "createdAt"
  | "updatedAt"
  | "deletedAt"
  | "isEmailVerified"
  | "emailVerificationToken"
  | "emailVerificationTokenExpiresAt"
  | "passwordHash"
  | "isPhoneVerified"
  | "acceptedTermsAt"
  | "acceptedPrivacyAt"
  | "lastLoginAt"
> & { password: string };
