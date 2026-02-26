// src/app/(main)/stories/create/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";
import AddStoryForm from "@/src/components/AddStoryForm/AddStoryForm";

export default function AddStoryPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return <AddStoryForm />;
}
