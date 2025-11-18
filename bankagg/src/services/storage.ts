export const TOKEN_KEY = 'auth_token';
export const MANDATORY_ID_KEY = 'mandatory_id';

export const saveToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);


export const saveMandatoryId = (id: string) => localStorage.setItem(MANDATORY_ID_KEY, id ?? '');
export const getMandatoryId = () => localStorage.getItem(MANDATORY_ID_KEY); // returns string or null
export const clearMandatoryId = () => localStorage.removeItem(MANDATORY_ID_KEY);
