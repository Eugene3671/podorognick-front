import { User } from "@/src/types/user";
import { nextServer } from "./api";

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

export interface AuthResponse {
  status: number;
  message: string;
  data: LoginAndRegisterResponse;
}

interface CheckSessionRequest {
  success: boolean;
  accessToken: string;
}

export async function register(
  data: RegisterRequest,
): Promise<LoginAndRegisterResponse> {
  const res = await nextServer.post<AuthResponse>("/auth/register", data);
  return res.data.data;
}
export async function login(
  data: LoginRequest,
): Promise<LoginAndRegisterResponse> {
  const res = await nextServer.post<AuthResponse>("/auth/login", data);
  return res.data.data;
}

export async function logout(): Promise<void> {
  const res = await nextServer.post("/auth/logout");
  return res.data;
}

export async function checkSession() {
  try {
    const response =
      await nextServer.post<CheckSessionRequest>("/auth/session");
    console.log("checkSession response:", response.data);

    if (response.data.success && response.data.accessToken) {
      return response.data;
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("checkSession error:", error);
    throw error;
  }
}
