import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
  const perPage = Number(req.nextUrl.searchParams.get("perPage") ?? 9);

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const apiRes = await api.get("/stories/my", {
      params: {
        page,
        perPage,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    return NextResponse.json(apiRes.data);
  } catch {
    return NextResponse.json({ error: "Data fetch error" }, { status: 500 });
  }
}
