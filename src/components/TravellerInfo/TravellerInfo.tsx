"use client";

import css from "./TravellerInfo.module.css";
import { useQuery } from "@tanstack/react-query";
import { getMe, getUserById } from "@/src/lib/api/usersApi";
import Image from "next/image";
import LoaderEl from "../LoaderEl/LoaderEl";
import { User } from "@/src/types/user";

interface TravellerInfoProps {
  travellerId?: string;
}

export default function TravellerInfo({ travellerId }: TravellerInfoProps) {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>({
    queryKey: ["user", travellerId || "me"],
    queryFn: async () => {
      if (travellerId) {
        const response = await getUserById(travellerId, {
          page: 1,
          perPage: 1,
        });
        return response.user;
      }
      return await getMe();
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div>
        <LoaderEl />
      </div>
    );
  if (isError || !user)
    return (
      <div>
        <LoaderEl />
      </div>
    );
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
