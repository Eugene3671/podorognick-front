"use client";

import css from "./TravellerInfo.module.css";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/src/lib/api/usersApi";
import { User } from "@/src/types/user";
import Image from "next/image";

// interface TravellerInfoProps {
//   user: User;
// }

export default function TravellerInfo() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Не вдалося завантажити профіль</div>;
  return (
    <div className={css.info}>
      <Image
        src={user.avatarUrl || "/avatar-placeholder.svg"}
        alt={user.name || "User avatar"}
        width={199}
        height={199}
        className={css.avatar}
      />
      <div className={css.info_content}>
        <h2 className={css.info_name}>{user.name}</h2>
        <p className={css.info_text}>{user.description}</p>
      </div>
    </div>
  );
}
