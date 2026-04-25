"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Валидация
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Заполните все поля");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Пароль должен содержать минимум 8 символов");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Ошибка при регистрации");
        setLoading(false);
        return;
      }

      // Успешная регистрация - редирект на страницу входа
      setLoading(false);
      router.push("/login?registered=true");
      router.refresh();
    } catch (err) {
      setError("Ошибка соединения с сервером");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="bumaga-page w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">СпектраМаяк</h1>
          <p className="text-gray-600">Система диагностики РАС</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Email field */}
          <div className="bumaga-section">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bumaga-input w-full"
              placeholder="example@mail.ru"
              disabled={loading}
            />
          </div>

          {/* Password field */}
          <div className="bumaga-section">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bumaga-input w-full"
              placeholder="Минимум 8 символов"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1 italic">
              Минимум 8 символов
            </p>
          </div>

          {/* Confirm password field */}
          <div className="bumaga-section">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Подтверждение пароля
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bumaga-input w-full"
              placeholder="Введите пароль ещё раз"
              disabled={loading}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        {/* Login link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Войти
            </Link>
          </p>
        </div>

        {/* Security notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            🔒 Защищено 152-ФЗ. Данные обрабатываются в соответствии с
            законодательством РФ.
          </p>
        </div>
      </div>
    </div>
  );
}
