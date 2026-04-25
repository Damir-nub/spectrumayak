"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Child = {
  id: string;
  code: string;
  ageMonths: number;
  gender: string;
  createdAt: string;
};

export default function ChildPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchChild();
  }, [params.id]);

  const fetchChild = async () => {
    try {
      const res = await fetch(`/api/children/${params.id}`);

      if (!res.ok) {
        if (res.status === 404) {
          setError("Ребёнок не найден");
        } else if (res.status === 403) {
          setError("Нет доступа");
        } else {
          setError("Ошибка при загрузке данных");
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      setChild(data);
      setLoading(false);
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Произошла ошибка. Попробуйте снова.");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/children/${params.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Ошибка при удалении");
        setDeleteLoading(false);
        setShowDeleteDialog(false);
        return;
      }

      router.push("/dashboard/children");
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Произошла ошибка. Попробуйте снова.");
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">СпектраМаяк</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bumaga-page">
            <div className="text-center py-16">
              <div className="text-gray-400">Загрузка...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !child) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">СпектраМаяк</h1>
          </div>
        </header>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bumaga-page">
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😕</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Ошибка</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link href="/dashboard/children" className="btn-primary">
                Вернуться к списку
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const years = Math.floor(child.ageMonths / 12);
  const months = child.ageMonths % 12;
  const ageString =
    years > 0
      ? `${years} ${years === 1 ? "год" : years < 5 ? "года" : "лет"}${
          months > 0 ? ` ${months} мес.` : ""
        }`
      : `${child.ageMonths} мес.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">СпектраМаяк</h1>
          <p className="text-sm text-gray-600">Система диагностики РАС</p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bumaga-page">
          {/* Breadcrumb */}
          <Link
            href="/dashboard/children"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            ← Назад к списку
          </Link>

          {/* Page header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Профиль ребёнка
            </h2>
            <p className="text-gray-600">
              Просмотр и управление профилем ребёнка
            </p>
          </div>

          {/* Child info */}
          <div className="bumaga-section">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  ID ребёнка
                </label>
                <p className="font-mono text-xl text-blue-600 font-semibold">
                  {child.code}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Возраст
                </label>
                <p className="text-xl text-gray-900">{ageString}</p>
                <p className="text-sm text-gray-600">
                  {child.ageMonths} месяцев
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Пол
                </label>
                <p className="text-xl text-gray-900">
                  {child.gender === "male" ? "Мужской" : "Женский"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1">
                  Профиль создан
                </label>
                <p className="text-xl text-gray-900">
                  {new Date(child.createdAt).toLocaleDateString("ru-RU")}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/dashboard/children/${child.id}/edit`}
                className="btn-primary"
              >
                ✏️ Редактировать
              </Link>

              <button
                onClick={() => setShowDeleteDialog(true)}
                className="btn-secondary"
              >
                🗑️ Удалить
              </button>

              <button className="btn-primary" disabled title="Скоро">
                📋 Провести диагностику (скоро)
              </button>
            </div>

            <div className="text-sm text-gray-600">
              <p>💡 После создания профиля вы сможете:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Проводить диагностику по 5 модулям</li>
                <li>Получать автоматические расчёты</li>
                <li>Генерировать отчёты в PDF</li>
                <li>Смотреть историю обследований</li>
              </ul>
            </div>
          </div>

          {/* Delete confirmation dialog */}
          {showDeleteDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Подтверждение удаления
                </h3>
                <p className="text-gray-600 mb-6">
                  Вы уверены, что хотите удалить профиль ребёнка "
                  <span className="font-semibold">{child.code}</span>"? Это
                  действие нельзя отменить.
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowDeleteDialog(false)}
                    className="btn-secondary"
                    disabled={deleteLoading}
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleDelete}
                    className="btn-primary bg-red-600 hover:bg-red-700"
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? "Удаление..." : "Удалить"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
