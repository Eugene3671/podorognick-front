import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "@/src/app/api/api";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(null, { status: 200 });
    }

    const res = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
