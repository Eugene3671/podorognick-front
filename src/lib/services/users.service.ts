import nextServer from "../axios";

export async function getMe() {
  const res = await nextServer.get("/users/profile", {
    withCredentials: true,
  });
  return res.data;
}
