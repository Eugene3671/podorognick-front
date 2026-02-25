"use client";

import { useEffect } from "react";
import Login from "@/src/components/AuthForms/Login";
import Register from "@/src/components/AuthForms/Registration";
import { useParams, useRouter, notFound } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";

const AuthPage = () => {
  const params = useParams();
  const router = useRouter();
  const authType = params?.authType;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  if (!authType || (authType !== "login" && authType !== "register")) {
    notFound();
  }

  return (
    <div>
      {authType === "login" && <Login />}
      {authType === "register" && <Register />}
    </div>
  );
};

export default AuthPage;
