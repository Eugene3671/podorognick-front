"use client";

import { useRouter } from "next/navigation";
import EmptyState from "@/src/components/ui/EmptyState/EmptyState";
import React from "react";

const TravellerPage = () => {
  const router = useRouter();
  const stories: [] = []; // тут буде дані з бекенду

  if (stories.length === 0) {
    return (
      <EmptyState
        title="Цей користувач ще не публікував історій"
        buttonText="Назад до історій"
        onButtonClick={() => router.push("/stories")}
      />
    );
  }
  return <div>Traveller page placeholder</div>; //Тут список історій
};

export default TravellerPage;
