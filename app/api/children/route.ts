import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/children - получить список детей текущего пользователя
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const children = await prisma.child.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(children);
  } catch (error) {
    console.error("Ошибка при получении списка детей:", error);
    return NextResponse.json(
      { error: "Ошибка при получении списка детей" },
      { status: 500 },
    );
  }
}

// POST /api/children - создать нового ребёнка
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const body = await request.json();
    const { code, ageMonths, gender } = body;

    // Валидация
    if (!code || typeof code !== "string" || code.trim() === "") {
      return NextResponse.json(
        { error: "ID ребёнка обязателен" },
        { status: 400 },
      );
    }

    if (!ageMonths || typeof ageMonths !== "number" || ageMonths <= 0) {
      return NextResponse.json(
        { error: "Возраст должен быть положительным числом" },
        { status: 400 },
      );
    }

    if (!gender || (gender !== "male" && gender !== "female")) {
      return NextResponse.json(
        { error: "Пол должен быть указан (male/female)" },
        { status: 400 },
      );
    }

    // Проверка уникальности code для пользователя
    const existingChild = await prisma.child.findFirst({
      where: {
        userId: session.user.id,
        code: code.trim(),
      },
    });

    if (existingChild) {
      return NextResponse.json(
        { error: "Ребёнок с таким ID уже существует" },
        { status: 400 },
      );
    }

    // Создание ребёнка
    const child = await prisma.child.create({
      data: {
        userId: session.user.id,
        code: code.trim(),
        ageMonths,
        gender,
      },
    });

    return NextResponse.json(child, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании ребёнка:", error);
    return NextResponse.json(
      { error: "Ошибка при создании ребёнка" },
      { status: 500 },
    );
  }
}
