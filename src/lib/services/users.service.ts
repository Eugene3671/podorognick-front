// users.service.ts
import { User } from "@/src/types/user";
import nextServer from "../axios";

interface UserPaginationResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  user: User[];
}

// Отримати профіль поточного користувача
export const getMe = async (): Promise<User> => {
  const res = await nextServer.get("/users/profile");
  return res.data;
};

// Отримати список усіх користувачів
export const getUsers = async (): Promise<UserPaginationResponse> => {
  const res = await nextServer.get<UserPaginationResponse>("/users");
  return res.data;
};

// Отримати одного користувача за ID
export const getUserById = async (id: string): Promise<User> => {
  const res = await nextServer.get<User>(`/users/${id}`);
  return res.data;
};

// Створити нового користувача
export const createUser = async (data: Partial<User>): Promise<User> => {
  const res = await nextServer.post("/users", data);
  return res.data;
};

// Оновити існуючого користувача
export const updateUser = async (
  id: string,
  data: Partial<User>,
): Promise<User> => {
  const res = await nextServer.put(`/users/${id}`, data);
  return res.data;
};

// Видалити користувача
export const deleteUser = async (id: string): Promise<void> => {
  const res = await nextServer.delete(`/users/${id}`);
  return res.data;
};
