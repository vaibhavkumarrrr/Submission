import { httpGet, httpPost } from './http';

export type RegisterPayload = {
  Username: string;
  Password: string;
  Roles: string[] | null; // per your backend
};

export type LoginPayload = {
  Username: string;
  Password: string;
  MandatoryId?: string;
};

export type LoginResponse = {
  jwttoken: string;
  roles?: string[];     
  username?: string;    // optional if your API also returns it
};


export async function registerUser(payload: RegisterPayload) {
  // public: no auth header
  return httpPost<{ jwttoken?: string; message?: string }>('/Auth/Register', payload, { skipAuth: true });
}

export async function loginUser(payload: LoginPayload) {
  // public: no auth header
  return httpPost<{ jwttoken: string, roles :string[] }>('/Auth/Login', payload, { skipAuth: true });
}

export async function getAccounts() {
  return httpGet<any[]>('/accounts');
}

export async function getBanks() {
  return httpGet<any[]>('/banks');
}
