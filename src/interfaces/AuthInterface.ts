import { type UserRoles, type UserStatus } from "./Constants";

export interface ILoginResponse {
  acessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRoles;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}
