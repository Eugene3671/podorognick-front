import { cookies } from "next/headers";
import { nextServer } from "./api";

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
