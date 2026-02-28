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

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get("/users/profile");
  return res.data;
};

export const getUsers = async (
  params: GetUsersParams,
): Promise<UserPaginationResponse> => {
  const res = await nextServer.get<UserPaginationResponse>("/users", {
    params,
  });
  return res.data;
};

export const getUserById = async (id: string): Promise<User> => {
  const res = await nextServer.get<User>(`/users/${id}`);
  return res.data;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  const res = await nextServer.post("/users", data);
  return res.data;
};

export const updateUserAvatar = async (formData: FormData) => {
  const res = await nextServer.patch(`/users/me/avatar`, formData);
  return res.data;
};

export const updateUser = async (
  id: string,
  data: Partial<User>,
): Promise<User> => {
  const res = await nextServer.put(`/users/${id}`, data);
  return res.data;
};