import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
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

export default async function ChildrenPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const children = await getChildren();

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
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              В панель
            </Link>
            <span className="text-sm text-gray-700">{session.user.email}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bumaga-page">
          {/* Page header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Мои дети
              </h2>
              <p className="text-gray-600">
                Управление профилями детей для проведения диагностики
              </p>
            </div>
            <Link
              href="/dashboard/children/new"
              className="btn-primary flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              Добавить ребёнка
            </Link>
          </div>

          {/* Children list */}
          {children.length === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-6xl mb-4">👶</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Пока нет детей
              </h3>
              <p className="text-gray-600 mb-6">
                Создайте первый профиль ребёнка для начала работы
              </p>
              <Link href="/dashboard/children/new" className="btn-primary">
                Создать профиль
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      ID ребёнка
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Возраст
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Пол
                    </th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900">
                      Дата создания
                    </th>
                    <th className="text-right py-4 px-4 font-semibold text-gray-900">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {children.map((child) => (
                    <tr
                      key={child.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <span className="font-mono font-semibold text-blue-600">
                          {child.code}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {child.ageMonths} мес
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {child.gender === "male" ? "Мужской" : "Женский"}
                      </td>
                      <td className="py-4 px-4 text-gray-700">
                        {new Date(child.createdAt).toLocaleDateString("ru-RU")}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/dashboard/children/${child.id}`}
                            className="btn-secondary text-sm px-3 py-1"
                          >
                            Открыть
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
