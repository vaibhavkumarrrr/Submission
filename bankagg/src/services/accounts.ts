// src/services/accounts.ts
import { httpGet, httpPost, httpPatch } from './http';

export type AccountTypeCode = 1 | 2 | 3; // 1=Current, 2=Savings, 3=FD

/** List item shape from GET /accounts/{id} */
export type AccountListItem = {
  accountId: number;
  accountType: AccountTypeCode;
  balance: number;
  bankId: number;
};

export type Paginated<T> = {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
};

/** PATCH response shapes (examples from your samples) */
export type PatchCurrentSavingsResponse = {
  withDrawAmount?: number;
  depositAmt?: number;
  accountId: number;
  accountType: AccountTypeCode;
  balance: number;
  userId?: number;
  bankId?: number;
};

export type PatchFDResponse = {
  rateOfInterest?: number;
  maturityDate?: string; // ISO date
};

/** Create payloads */
export type CreateCurrentPayload = {
  userId: string;     // mandatoryId from login
  bankId: number;
  openingBalance: number;
  overdraftLimit?: number;
};
export type CreateSavingsPayload = {
  userId: string;
  bankId: number;
  openingBalance: number;
  interestRate?: number;
};
export type CreateFDPayload = {
  userId: string;
  bankId: number;
  principal: number;
  interestRate?: number;
  tenureMonths?: number;
};

/** Update (PATCH) payloads */
export type PatchCurrentPayload = {
  userId: string;
  depositAmt?: number;
  withDrawAmount?: number;
  overdraftLimit?: number;
};

export type PatchSavingsPayload = {
  userId: string;
  depositAmt?: number;
  withDrawAmount?: number;
  interestRate?: number;
};

export type PatchFDPayload = {
  userId: string;
  principal?: number;
  interestRate?: number;
  tenureMonths?: number;
};

/** Helper: map numeric type to label */
export function labelForType(t: AccountTypeCode) {
  switch (t) {
    case 1: return 'Current';
    case 2: return 'Savings';
    case 3: return 'Fixed Deposit';
    default: return 'Unknown';
  }
}

/** ------- GET lists (use mandatoryId in path) ------- */
export async function getAllAccounts(userId: string, pageNumber = 1, pageSize = 20) {
  // If backend supports pagination via query params:
  const qp = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return httpGet<Paginated<AccountListItem>>(`/accounts/${encodeURIComponent(userId)}`);
}

export async function getCurrentAccounts(userId: string, pageNumber = 1, pageSize = 20) {
  const qp = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return httpGet<Paginated<AccountListItem>>(`/accounts/current/${encodeURIComponent(userId)}`);
}

export async function getSavingsAccounts(userId: string, pageNumber = 1, pageSize = 20) {
  const qp = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return httpGet<Paginated<AccountListItem>>(`/accounts/saving/${encodeURIComponent(userId)}`);
}

export async function getFDAccounts(userId: string, pageNumber = 1, pageSize = 20) {
  const qp = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
  return httpGet<Paginated<AccountListItem>>(`/accounts/FixedDeposit/${encodeURIComponent(userId)}`);
}
export async function createCurrentAccount(payload: CreateCurrentPayload) {
  return httpPost<AccountListItem>(`/accounts/Current`, payload, {
    headers: { 'X-Mandatory-Id': payload.userId }
  });
}
 
export async function createSavingsAccount(payload: CreateSavingsPayload) {
  return httpPost<AccountListItem>(`/accounts/Savings`, payload, {
    headers: { 'X-Mandatory-Id': payload.userId }
  });
}
 
export async function createFDAccount(payload: CreateFDPayload) {
  return httpPost<AccountListItem>(`/accounts/FD`, payload, {
    headers: { 'X-Mandatory-Id': payload.userId }
  });
}

/** ------- PATCH updates (account id in path; include mandatoryId too) ------- */
export async function patchCurrentAccount(accountId: number, payload: PatchCurrentPayload) {
  return httpPatch<PatchCurrentSavingsResponse>(`/accounts/Current/${accountId}`, payload, {
    headers: { 'X-Mandatory-Id': payload.userId }
  });
}

export async function patchSavingsAccount(accountId: number, payload: PatchSavingsPayload) {
  return httpPatch<PatchCurrentSavingsResponse>(`/accounts/Savings/${accountId}`, payload, {
    headers: { 'X-Mandatory-Id': payload.userId }
  });
}

export async function patchFDAccount(accountId: number, payload: PatchFDPayload) {
  return httpPatch<PatchFDResponse>(`/accounts/FD/${accountId}`, payload, {
    headers: { 'X-Mandatory-Id': payload.userId }
  });
}