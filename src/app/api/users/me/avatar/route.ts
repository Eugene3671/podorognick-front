import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../api";

export async function PATCH(req: NextRequest) {
  try {
    const formData = await req.formData();
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await api.patch("/users/me/avatar", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": req.headers.get("content-type"),
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
