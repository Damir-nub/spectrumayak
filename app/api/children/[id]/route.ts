import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/children/[id] - получить ребёнка по ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const child = await prisma.child.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!child) {
      return NextResponse.json({ error: "Ребёнок не найден" }, { status: 404 });
    }

    // Проверка что ребёнок принадлежит текущему пользователю
    if (child.userId !== session.user.id) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    return NextResponse.json(child);
  } catch (error) {
    console.error("Ошибка при получении ребёнка:", error);
    return NextResponse.json(
      { error: "Ошибка при получении ребёнка" },
      { status: 500 },
    );
  }
}

// PUT /api/children/[id] - обновить ребёнка
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const body = await request.json();
    const { code, ageMonths, gender } = body;

    // Проверка существования ребёнка
    const existingChild = await prisma.child.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!existingChild) {
      return NextResponse.json({ error: "Ребёнок не найден" }, { status: 404 });
    }

    // Проверка прав доступа
    if (existingChild.userId !== session.user.id) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

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

    // Проверка уникальности code (если изменился)
    if (code.trim() !== existingChild.code) {
      const duplicateChild = await prisma.child.findFirst({
        where: {
          userId: session.user.id,
          code: code.trim(),
          id: {
            not: params.id,
          },
        },
      });

      if (duplicateChild) {
        return NextResponse.json(
          { error: "Ребёнок с таким ID уже существует" },
          { status: 400 },
        );
      }
    }

    // Обновление ребёнка
    const child = await prisma.child.update({
      where: {
        id: params.id,
      },
      data: {
        code: code.trim(),
        ageMonths,
        gender,
      },
    });

    return NextResponse.json(child);
  } catch (error) {
    console.error("Ошибка при обновлении ребёнка:", error);
    return NextResponse.json(
      { error: "Ошибка при обновлении ребёнка" },
      { status: 500 },
    );
  }
}

// DELETE /api/children/[id] - удалить ребёнка
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const child = await prisma.child.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!child) {
      return NextResponse.json({ error: "Ребёнок не найден" }, { status: 404 });
    }

    // Проверка прав доступа
    if (child.userId !== session.user.id) {
      return NextResponse.json({ error: "Нет доступа" }, { status: 403 });
    }

    // Удаление ребёнка
    await prisma.child.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при удалении ребёнка:", error);
    return NextResponse.json(
      { error: "Ошибка при удалении ребёнка" },
      { status: 500 },
    );
  }
}
