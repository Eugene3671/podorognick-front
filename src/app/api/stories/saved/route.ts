// app/api/stories/saved/route.ts

import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
    const perPage = Number(req.nextUrl.searchParams.get("perPage") ?? 10);

    const res = await api.get("/stories/saved", {
      params: { page, perPage },
      headers: { Cookie: cookieStore.toString() },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
