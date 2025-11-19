// src/services/http.ts
import { getToken, clearToken } from './storage';

export const API_BASE = 'https://localhost:7000/api';

export type HttpOk<T> = { ok: true; status: number; data: T };
export type HttpNotFound = { ok: false; status: 404; error: 'This AccountType does not Exist' };
export type HttpError = { ok: false; status: number; error: string };
export type HttpResult<T> = HttpOk<T> | HttpNotFound | HttpError;

type ExtraInit = RequestInit & { skipAuth?: boolean };

async function parseBody(res: Response) {
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    try { return await res.json(); } catch { return undefined; }
  }
  try { return await res.text(); } catch { return ''; }
}

function buildHeaders(init?: ExtraInit): Headers {
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  if (!init?.skipAuth) {
    const token = getToken();
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}

async function handle<T>(res: Response): Promise<HttpResult<T>> {
  const body = await parseBody(res);

  if (res.ok) {
    return { ok: true, status: res.status, data: body as T };
  }


  if (res.status === 404) {
    return { ok: false, status: 404, error: 'This Data donot exist' };
  }

 
  if (res.status === 401) {
    clearToken();
    return { ok: false, status: 401, error: (body as any)?.message || 'Unauthorized' };
  }

  const msg =
    (body as any)?.message ||
    (body as any)?.error ||
    (typeof body === 'string' ? body : 'Request failed');
  return { ok: false, status: res.status, error: msg };
}

export async function httpGet<T>(path: string, init?: ExtraInit): Promise<HttpResult<T>> {
  const res = await fetch(`${API_BASE}${path}`, { ...init, method: 'GET', headers: buildHeaders(init) });
  return handle<T>(res);
}

export async function httpPost<T>(path: string, body?: unknown, init?: ExtraInit): Promise<HttpResult<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init, method: 'POST', headers: buildHeaders(init),
    body: body !== undefined ? JSON.stringify(body) : null
  });
  return handle<T>(res);
}

export async function httpPatch<T>(path: string, body?: unknown, init?: ExtraInit): Promise<HttpResult<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init, method: 'PATCH', headers: buildHeaders(init),
    body: body !== undefined ? JSON.stringify(body) : null
  });
  return handle<T>(res);
}

export async function httpPut<T>(path: string, body?: unknown, init?: ExtraInit): Promise<HttpResult<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init, method: 'PUT', headers: buildHeaders({ ...init, method: 'PUT' }),
    body: body !== undefined ? JSON.stringify(body) : null
  });
  return handle<T>(res);
}
export async function httpDelete<T>(path: string, init?: ExtraInit): Promise<HttpResult<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init, method: 'DELETE', headers: buildHeaders({ ...init, method: 'DELETE' })
  });
  return handle<T>(res);
}
