import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { signOut } from "@/lib/auth";
import Link from "next/link";

type Child = {
  id: string;
  code: string;
  ageMonths: number;
  gender: string;
  createdAt: string;
};

async function getChildren(): Promise<Child[]> {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/children`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const children = await getChildren();
  const recentChildren = children.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">СпектраМаяк</h1>
            <p className="text-sm text-gray-600">Система диагностики РАС</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{session.user.email}</span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <button type="submit" className="btn-secondary text-sm px-4 py-2">
                Выйти
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome card */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Добро пожаловать в СпектраМаяк!
          </h2>
          <p className="text-gray-600 mb-4">
            Ваша персональная система для диагностики РАС у детей.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Тариф:</span>
            <span className="font-semibold text-blue-600">
              {session.user.subscriptionTier === "free"
                ? "Бесплатный"
                : session.user.subscriptionTier === "basic"
                  ? "Базовый"
                  : "Льготный"}
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/children/new"
            className="card card-hover text-center block"
          >
            <div className="text-4xl mb-4">👶</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Добавить ребёнка
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Создайте профиль ребёнка для проведения диагностики
            </p>
            <div className="btn-primary w-full" disabled>
              Создать профиль
            </div>
          </Link>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Провести диагностику
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Заполните диагностические формы по методикам
            </p>
            <button className="btn-primary w-full" disabled>
              Скоро
            </button>
          </div>

          <div className="card card-hover text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              История обследований
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Просмотрите предыдущие результаты и отчёты
            </p>
            <button className="btn-primary w-full" disabled>
              Скоро
            </button>
          </div>
        </div>

        {/* My Children section */}
        <div className="card mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                Мои дети
              </h3>
              <p className="text-sm text-gray-600">
                {children.length === 0
                  ? "Добавьте первого ребёнка"
                  : `Всего детей: ${children.length}`}
              </p>
            </div>
            <Link
              href="/dashboard/children"
              className="btn-secondary text-sm px-4 py-2"
            >
              Все дети →
            </Link>
          </div>

          {recentChildren.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-4xl mb-2">👶</div>
              <p className="text-gray-600 mb-4">Пока нет детей</p>
              <Link
                href="/dashboard/children/new"
                className="btn-primary text-sm px-4 py-2"
              >
                Добавить ребёнка
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentChildren.map((child) => {
                const years = Math.floor(child.ageMonths / 12);
                const months = child.ageMonths % 12;
                const ageString =
                  years > 0
                    ? `${years} ${years === 1 ? "год" : years < 5 ? "года" : "лет"}${
                        months > 0 ? ` ${months} мес.` : ""
                      }`
                    : `${child.ageMonths} мес.`;

                return (
                  <Link
                    key={child.id}
                    href={`/dashboard/children/${child.id}`}
                    className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">
                        {child.gender === "male" ? "👦" : "👧"}
                      </div>
                      <div>
                        <div className="font-mono font-semibold text-blue-600">
                          {child.code}
                        </div>
                        <div className="text-sm text-gray-600">
                          {ageString} •{" "}
                          {child.gender === "male" ? "Мужской" : "Женский"}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400">→</div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Info card */}
        <div className="card bg-blue-50 border-2 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            ℹ️ Информация о системе
          </h3>
          <p className="text-sm text-blue-800 mb-4">
            Система находится в разработке. Функционал будет добавляться
            постепенно.
          </p>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Регистрация и авторизация пользователей</li>
            <li>✓ Управление профилями детей</li>
            <li>✓ Диагностика по 5 модулям (скоро)</li>
            <li>✓ Генерация отчётов в PDF (скоро)</li>
            <li>✓ Графики и статистика (скоро)</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
