"use client";

import { useAuthStore } from "@/src/lib/store/authStore";
import { User } from "@/src/types/user";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) => {
  const setUser = useAuthStore((state) => state.setUser);
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);
  return <>{children}</>;
};
export default AuthProvider;
