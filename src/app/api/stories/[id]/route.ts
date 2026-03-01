// app/api/stories/saved/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await api.get(`/stories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const formData = await req.formData();
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await api.patch(`/stories/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("PATCH ERROR:", error?.response?.data || error);
    return NextResponse.json(
      { error: error?.response?.data || "Update failed" },
      { status: error?.response?.status || 500 },
    );
  }
}
