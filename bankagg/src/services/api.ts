import { httpDelete, httpGet, httpPost, httpPut, type HttpResult } from './http';

export type RegisterPayload = {
  Username: string;
  Password: string;
  Roles: string[] | null; 
};

export type LoginPayload = {
  Username: string;
  Password: string;
  MandatoryId?: string;
};

export type LoginResponse = {
  jwttoken: string;
  roles?: string[];     
  username?: string;   
};


export async function registerUser(payload: RegisterPayload) {
  
  return httpPost<{ jwttoken?: string; message?: string }>('/Auth/Register', payload, { skipAuth: true });
}

export async function loginUser(payload: LoginPayload) {
  
  return httpPost<{ jwttoken: string, roles :string[] }>('/Auth/Login', payload, { skipAuth: true });
}

export async function getAccounts() {
  return httpGet<any[]>('/accounts');
}

export async function getBanks() {
  return httpGet<any[]>('/banks');
}


export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;  
  pageSize: number;
  totalPages?: number; 
}

export interface AccountListItemDto {
  accountId: number;
  accountType: number;  
  balance: number;
  bankId: number;
}

export interface User {
  id: number | string;
  userName: string;
  userEmail: string;
  dateofbirth: string; 
  employeeId?: number;
  employeeName?: string;
}

export interface CreateUserRequest {
  userName: string;
  userEmail: string;
  dateofbirth: string; 
  employeeId: number;
  employeeName: string;
}

export interface UpdateUserRequest {
  userName?: string;
  userEmail?: string;
  dateofbirth?: string; 
  employeeId?: number;
  employeeName?: string;
}

export interface Account {
  accountId: number | string;  
  accountType: number;         
  balance: number;
  bankId: number | string;
}

export interface BankUser {
  id?: number | string;        
  mandatoryId: string;         
  bankName: string;
  employeeName: string;
  employeeId: string;
}

export interface CreateBankUserRequest {
  mandatoryId: string;
  bankName: string;
  employeeName: string;
  employeeId: string;
}

export interface UpdateBankUserRequest {
  mandatoryId: string;
  bankName: string;
  employeeName: string;
  employeeId: string;
}

export const userApi = {
  list: (): Promise<HttpResult<User[]>> => httpGet<User[]>('/User'),
  get: (id: string | number): Promise<HttpResult<User>> => httpGet<User>(`/User/${id}`),
  create: (payload: CreateUserRequest): Promise<HttpResult<User>> => httpPost<User>('/User', payload),
  update: (id: string | number, payload: UpdateUserRequest): Promise<HttpResult<User>> =>
    httpPut<User>(`/User/${id}`, payload),
  remove: (id: string | number): Promise<HttpResult<void>> => httpDelete<void>(`/User/${id}`),
  accounts: (id: string | number): Promise<HttpResult<Account[]>> =>
    httpGet<Account[]>(`/User/${id}/accounts`),
};

export const bankUserApi = {
 
  listAll: (): Promise<HttpResult<BankUser[]>> => httpGet<BankUser[]>('/bankusers'),

  getByMandatoryId: (mandatoryId: string): Promise<HttpResult<BankUser | BankUser[]>> =>
    httpGet<BankUser | BankUser[]>(`/bankusers/${mandatoryId}`),


  createForMandatoryId: (payload: CreateBankUserRequest): Promise<HttpResult<BankUser>> =>
    httpPost<BankUser>('/bankusers', payload),

  updateByMandatoryId: (mandatoryId: string, payload: UpdateBankUserRequest): Promise<HttpResult<BankUser>> =>
    httpPut<BankUser>(`/bankusers/${mandatoryId}`, payload),

  removeByMandatoryId: (mandatoryId: string): Promise<HttpResult<void>> =>
    httpDelete<void>(`/bankusers/${mandatoryId}`),}
