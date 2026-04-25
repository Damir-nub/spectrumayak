"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered") === "true";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setError("Заполните все поля");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Неверный email или пароль");
        setLoading(false);
        return;
      }

      // Успешный вход - редирект на dashboard
      router.push("/dashboard");
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

        {/* Success message after registration */}
        {registered && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mb-6">
            <p className="text-sm text-green-700">
              ✓ Регистрация успешна! Теперь войдите в систему.
            </p>
          </div>
        )}

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
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="bumaga-input w-full"
              placeholder="Введите ваш пароль"
              disabled={loading}
            />
          </div>

          {/* Forgot password link (placeholder) */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Забыли пароль?
            </Link>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        {/* Register link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Зарегистрироваться
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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-12">
          <div className="bumaga-page w-full max-w-md text-center">
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
