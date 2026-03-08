import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { api } from "@/src/app/api/api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "@/src/app/api/_utils/utils";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const sessionId = cookieStore.get("sessionId")?.value;
    if (accessToken) {
      return NextResponse.json({ accessToken, success: true });
    }
    if (!refreshToken && !sessionId) {
      return NextResponse.json({ success: false }, { status: 401 });
    }
    if (refreshToken) {
      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const apiRes = await api.post(
        "/auth/refresh",
        {},
        {
          headers: {
            Cookie: cookieHeader,
          },
        },
      );

      const setCookie = apiRes.headers["set-cookie"];

      if (setCookie) {
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);
          console.log(parsed);
          const options = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed["Max-Age"]),
          };

          if (parsed.accessToken)
            cookieStore.set("accessToken", parsed.accessToken, options);
          if (parsed.refreshToken)
            cookieStore.set("refreshToken", parsed.refreshToken, options);
          if (parsed.sessionId)
            cookieStore.set("sessionId", parsed.sessionId, options);
        }
        return NextResponse.json(
          { accessToken: apiRes.data.accessToken, success: true },
          { status: 200 },
        );
      }
    }

    return NextResponse.json({ success: false }, { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ success: false }, { status: 200 });
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
