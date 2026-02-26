"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/src/components/ui/EmptyState/EmptyState";
import React from "react";

const ProfileOwnTabPage = () => {
  const router = useRouter();
  const stories: [] = []; // тут буде дані з бекенду

  if (stories.length === 0) {
    return (
      <EmptyState
        title="Ви ще нічого не публікували, поділіться своєю першою історією!"
        buttonText="Опублікувати історію"
        onButtonClick={() => router.push("/stories")}
      />
    );
  }
  return <div>Profile own tab page placeholder</div>; //Тут список історій
};

export default ProfileOwnTabPage;
