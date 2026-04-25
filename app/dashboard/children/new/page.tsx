"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewChildPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    code: "",
    ageMonths: "",
    gender: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const ageMonthsNum = parseInt(formData.ageMonths);

      if (!formData.code.trim()) {
        setError("Введите ID ребёнка");
        setLoading(false);
        return;
      }

      if (!ageMonthsNum || ageMonthsNum <= 0) {
        setError("Возраст должен быть положительным числом");
        setLoading(false);
        return;
      }

      if (!formData.gender) {
        setError("Укажите пол ребёнка");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/children", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: formData.code.trim(),
          ageMonths: ageMonthsNum,
          gender: formData.gender,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка при создании ребёнка");
        setLoading(false);
        return;
      }

      router.push(`/dashboard/children/${data.id}`);
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Произошла ошибка. Попробуйте снова.");
      setLoading(false);
    }
  };

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
              Новый ребёнок
            </h2>
            <p className="text-gray-600">
              Создайте профиль ребёнка для проведения диагностики
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-800">
                ⚠️ {error}
              </div>
            )}

            {/* ID ребёнка */}
            <div className="bumaga-section">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                ID ребёнка <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                className="bumaga-input w-full"
                placeholder="Например: И001"
                disabled={loading}
              />
              <p className="text-sm text-gray-600 mt-2">
                Уникальный идентификатор ребёнка (не ФИО!)
              </p>
            </div>

            {/* Возраст */}
            <div className="bumaga-section">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Возраст (в месяцах) <span className="text-red-600">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={formData.ageMonths}
                  onChange={(e) =>
                    setFormData({ ...formData, ageMonths: e.target.value })
                  }
                  className="bumaga-input w-32"
                  min="1"
                  max="216"
                  placeholder="36"
                  disabled={loading}
                />
                <span className="text-gray-700">месяцев</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Возраст ребёнка на момент проведения диагностики
              </p>
            </div>

            {/* Пол */}
            <div className="bumaga-section">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Пол <span className="text-red-600">*</span>
              </label>
              <div className="space-y-3">
                <label
                  className={`bumaga-radio flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    formData.gender === "male"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-3"
                    disabled={loading}
                  />
                  <span className="text-gray-900">Мужской</span>
                </label>

                <label
                  className={`bumaga-radio flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                    formData.gender === "female"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="mr-3"
                    disabled={loading}
                  />
                  <span className="text-gray-900">Женский</span>
                </label>
              </div>
            </div>

            {/* Info note */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                ⚠️ Не указывайте ФИО ребёнка. Используйте только уникальный ID
                для соблюдения требований 152-ФЗ.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4">
              <Link
                href="/dashboard/children"
                className="btn-secondary"
                tabIndex={loading ? -1 : 0}
              >
                Отмена
              </Link>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Создание..." : "Создать профиль"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
