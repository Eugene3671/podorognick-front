import { NextRequest, NextResponse } from "next/server";
import { api } from "@/src/app/api/api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/src/app/api/_utils/utils";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const category = req.nextUrl.searchParams.get("category") ?? "";
    const page = Number(req.nextUrl.searchParams.get("page") ?? 1);
    const perPage = Number(req.nextUrl.searchParams.get("perPage") ?? 9);
    const sort = req.nextUrl.searchParams.get("sort");

    const params: {
      category?: string;
      sort?: string;
      page?: number;
      perPage?: number;
    } = {};

    if (category) params.category = category;
    if (sort) params.sort = sort;
    if (!isNaN(page)) params.page = page;
    if (!isNaN(perPage)) params.perPage = perPage;

    const res = await api.get("/stories", {
      params,
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

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const formData = await req.formData();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const res = await api.post("/stories", formData, {
      headers: {
        Cookie: cookieStore.toString(),
        Authorization: `Bearer ${token}`,
      },
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
