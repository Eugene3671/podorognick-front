// app/api/stories/saved/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "../../api";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await api.patch(`/stories/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(res.data);
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
