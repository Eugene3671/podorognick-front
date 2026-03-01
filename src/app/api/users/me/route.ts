import { NextResponse } from "next/server";
import { api } from "@/src/app/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/src/app/api/_utils/utils";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) return NextResponse.json(null, { status: 200 });

    const res = await api.get("/users/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(null, { status: 200 });
    }
    return NextResponse.json(null, { status: 200 });
  }
}

export async function PATCH(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await api.patch("/users/me", body, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.response?.data?.error ?? error.message },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}