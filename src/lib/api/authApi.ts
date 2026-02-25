import { User } from "@/src/types/user";
import { nextServer } from './api'

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

interface LoginAndRegisterResponse {
  accessToken: string;
  user: User;
}

interface CheckSessionRequest {
  success: boolean;
};


export async function register(
  data: RegisterRequest,
): Promise<LoginAndRegisterResponse> {
  const res = await nextServer.post<LoginAndRegisterResponse>(
    "/auth/register",
    data,
  );
  return res.data;
}
export async function login(
  data: LoginRequest,
): Promise<LoginAndRegisterResponse> {
  const res = await nextServer.post<LoginAndRegisterResponse>(
    "/auth/login",
    data,
  );
  return res.data;
}

export async function logout(): Promise<void> {
  const res = await nextServer.post("/auth/logout");
  return res.data;
}

export async function checkSession() {
  const response = await nextServer.get<CheckSessionRequest>('/auth/session');
  return response.data.success;
};