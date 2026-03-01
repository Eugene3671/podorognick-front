import { NextRequest, NextResponse } from "next/server";
import { api } from "@/src/app/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/src/app/api/_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const search = req.nextUrl.searchParams.get("search") ?? "";
    const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
    const perPage = Number(req.nextUrl.searchParams.get("perPage") ?? 10);
    const sortBy = req.nextUrl.searchParams.get("sortBy") ?? "_id";
    const sortOrder = req.nextUrl.searchParams.get("sortOrder") ?? "asc";

    const res = await api.get("/users", {
      params: { search, page, perPage, sortBy, sortOrder },
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
