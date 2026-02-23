// users.service.ts
import nextServer from "../axios"; // твій axios.ts

// Тип користувача (можна розширити під проект)
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

// Отримати профіль поточного користувача
export const getMe = async (): Promise<User> => {
  try {
    const res = await nextServer.get("/users/profile", {
      withCredentials: true,
    });
    return res.data;
  } catch (error: any) {
    console.error("Помилка при отриманні профілю користувача:", error);
    throw error;
  }
};

// Отримати список усіх користувачів
export const getUsers = async (): Promise<User[]> => {
  try {
    const res = await nextServer.get("/users");
    return res.data;
  } catch (error: any) {
    console.error("Помилка при отриманні користувачів:", error);
    throw error;
  }
};

// Отримати одного користувача за ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const res = await nextServer.get(`/users/${id}`);
    return res.data;
  } catch (error: any) {
    console.error(`Помилка при отриманні користувача ${id}:`, error);
    throw error;
  }
};

// Створити нового користувача
export const createUser = async (data: Partial<User>): Promise<User> => {
  try {
    const res = await nextServer.post("/users", data);
    return res.data;
  } catch (error: any) {
    console.error("Помилка при створенні користувача:", error);
    throw error;
  }
};

// Оновити існуючого користувача
export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  try {
    const res = await nextServer.put(`/users/${id}`, data);
    return res.data;
  } catch (error: any) {
    console.error(`Помилка при оновленні користувача ${id}:`, error);
    throw error;
  }
};

// Видалити користувача
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await nextServer.delete(`/users/${id}`);
  } catch (error: any) {
    console.error(`Помилка при видаленні користувача ${id}:`, error);
    throw error;
  }
};