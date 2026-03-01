import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "@/src/app/api/api";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await api.get("/users/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: "Faild to fetch user" }, { status: 401 });
  }
}
