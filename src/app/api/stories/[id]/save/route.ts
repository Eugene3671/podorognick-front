<<<<<<< HEAD:src/app/api/stories/saved/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/src/app/api/api";
=======
>>>>>>> main:src/app/api/stories/[id]/save/route.ts
import { cookies } from "next/headers";
import { api } from "../../../api";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/src/app/api/_utils/utils";

type Props = { params: Promise<{ id: string }> };

export async function POST(req: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const res = await api.post(`/stories/${id}/save`, null, {
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

export async function DELETE(req: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const res = await api.delete(`/stories/${id}/save`, {
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
