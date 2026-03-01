import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "@/src/app/api/api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/src/app/api/_utils/utils";

export async function PATCH(req: Request) {
  try {
    const formData = await req.formData();
    const cookieStore = await cookies();

    
    const token = cookieStore.get("accessToken")?.value;

    const headers: Record<string, string> = {
      Cookie: cookieStore.toString(),
    };

    const contentType = req.headers.get("content-type");
    if (contentType) headers["Content-Type"] = contentType;
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await api.patch("/users/me/avatar", formData, { headers });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.response?.data?.error ?? error.message },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
