import { api } from './api';
import type { LoginRequest, AuthResponse } from '../types';
const TOKEN_KEY= import.meta.env.VITE_TOKEN_KEY;
export const apiLogin = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const { data } = await api.post<AuthResponse>(
    '/Accounts/authenticate',
    credentials
  );
  return data;
};

export const apiLogout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const isAuthenticated = (): boolean => {
 if (getToken()) return true;
 else return false;
};
