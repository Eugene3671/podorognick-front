import { create } from "zustand";
import type { User } from "../../types/user";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User, token?: string) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,

  setUser: (user: User, token?: string) => {
    if (token) {
      localStorage.setItem("accessToken", token);
    }
    set(() => ({ user, isAuthenticated: true }));
  },
  clearIsAuthenticated: () => {
    localStorage.removeItem("accessToken");
    set(() => ({ user: null, isAuthenticated: false  }));
  },
}));
