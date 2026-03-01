import { cookies } from "next/headers";
import { nextServer } from "../api";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  if (!token) return null;

  try {
    const res = await nextServer.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch {
    return null;
  }
}
