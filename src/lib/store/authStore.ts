// import { create } from "zustand";
// import type { User } from "../../types/user";

// type AuthStore = {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   user: User | null;
//   setUser: (user: User) => void;
//   clearIsAuthenticated: () => void;
// };

// export const useAuthStore = create<AuthStore>()((set) => ({
//   isAuthenticated: false,
//   isLoading: false,
//   user: null,

//   setUser: (user: User) => {
//     set(() => ({ user, isAuthenticated: true }));
//   },
//   clearIsAuthenticated: () => {
//     set(() => ({ user: null, isAuthenticated: false }));
//   },
// }));


import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../../types/user";

type AuthStore = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: false,
      user: null,

      setUser: (user: User) =>
        set(() => ({ user, isAuthenticated: true })),

      clearIsAuthenticated: () =>
        set(() => ({ user: null, isAuthenticated: false })),
    }),
    {
      name: "auth",  
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), 
       
    }
  )
);