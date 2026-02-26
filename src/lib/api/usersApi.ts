import { User } from "@/src/types/user";
import { nextServer } from './api'

export interface UserPaginationResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

// Отримати профіль поточного користувача
export const getMe = async (): Promise<User> => {
  const res = await nextServer.get("/users/profile");
  return res.data;
};

// Отримати список усіх користувачів

export const getUsers = async (page = 1, perPage = 12) : Promise<UserPaginationResponse> =>{
  const url = new URL("https://podorognick-back.onrender.com/api/users");
  
  url.searchParams.append("page", page.toString());
  url.searchParams.append("perPage", perPage.toString());
  url.searchParams.append("sortBy", "articlesAmount"); 
  url.searchParams.append("sortOrder", "desc");

  try {
    const res = await fetch(url.toString());
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("Помилка сервера:", errorData);
      throw new Error(errorData.message || "Validation failed");
    }
    
    return await res.json();
  } catch (error) {
    console.error("Помилка при виконанні запиту:", error);
    throw error;
  }
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