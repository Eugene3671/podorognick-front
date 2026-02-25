import css from "./TravellerInfo.module.css";
import { User } from "@/src/types/user";
import Image from "next/image";

//  { id: 1, name: "Анастасія Олійник", description: "Експертка з гірських походів. Знає кожен таємний куточок Карпат.", img: "/anastasia-oliinyk.png" },

interface TravellerInfoProps {
  user: User;
}

export default function TravellerInfo({ user }: TravellerInfoProps) {
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
