import axios, { AxiosResponse } from 'axios';

interface AuthResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    fullName?: string;
    accountType?: 'individual' | 'business';
    username?: string;
    organization?: string;
  };
  error?: string;
}

interface UserData {
  fullName: string;
  organization?: string;
  email: string;
  username: string;
  password: string;
  accountType: 'individual' | 'business';
}

const API_URL = 'http://localhost:3001/api/auth';

export const loginUser = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const registerUser = async (userData: UserData): Promise<AxiosResponse<AuthResponse>> => {
  return axios.post(`${API_URL}/register`, userData);
};