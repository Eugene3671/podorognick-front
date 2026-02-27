import { User } from "@/src/types/user";
import { nextServer } from "./api";

export interface UserPaginationResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}
interface GetUsersParams {
  page: number;
  perPage: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

// Отримати профіль поточного користувача
export const getMe = async (): Promise<User> => {
  const res = await nextServer.get("/users/profile");
  return res.data;
};

// Отримати список усіх користувачів
export const getUsers = async (page = 1, perPage = 4): Promise<UserPaginationResponse> => {
  const res = await nextServer.get<UserPaginationResponse>("/users", {
    params: {
      page,
      perPage,
      sortBy: "articlesAmount",
      sortOrder: "desc",
      search: "",
    },
  });
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

export const updateUserAvatar = async (formData: FormData) => {
  const res = await nextServer.patch(`/users/me/avatar`, formData);
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
