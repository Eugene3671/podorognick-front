"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/src/components/ui/EmptyState/EmptyState";
import React from "react";

const ProfileSavedTabPage = () => {
  const router = useRouter();
  const stories: [] = []; // тут буде дані з бекенду

  if (stories.length === 0) {
    return (
      <EmptyState
        title="У вас ще немає збережених історій, мершій збережіть вашу першу історію!"
        buttonText="До історій"
        onButtonClick={() => router.push("/stories")}
      />
    );
  }
  return <div>Profile saved tab page placeholder</div>;
};

export default ProfileSavedTabPage;
