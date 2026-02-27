// app/api/categories/route.ts

import { NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../_utils/utils";

export async function GET() {
  try {
    // Робимо запит на бекенд для отримання категорій
    const res = await api.get("/categories");

    // Повертаємо відповідь бекенду
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    // Якщо помилка axios
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status ?? 500 },
      );
    }

    // Якщо невідома помилка
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
