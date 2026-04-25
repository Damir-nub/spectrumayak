"use client";

import { useState } from "react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly",
  );

  const plans = [
    {
      name: "Бесплатный тариф",
      price: "0 ₽/месяц",
      period: "навсегда",
      features: [
        "1 методика (коммуникация)",
        "Неограниченное количество детей",
        "Базовые отчёты",
      ],
      cta: "Попробовать бесплатно",
      highlighted: false,
    },
    {
      name: "Льготный тариф",
      price: "500 ₽/месяц",
      period: "",
      features: [
        "Все 5 методик",
        "Продвинутые отчёты",
        "Экспорт в PDF",
        "Приоритетная поддержка",
      ],
      note: "Для студентов, родителей детей-инвалидов, специалистов из регионов",
      cta: "Оформить льготу",
      highlighted: false,
    },
    {
      name: "Базовая подписка",
      price: "1 500 ₽/месяц",
      period: "",
      features: [
        "Все 5 методик",
        "Продвинутые отчёты",
        "Экспорт в PDF",
        "Приоритетная поддержка",
        "Ранний доступ к новым функциям",
      ],
      cta: "Попробовать 14 дней бесплатно",
      highlighted: true,
    },
  ];

  return (
    <section id="pricing" className="container-section bg-white">
      <div className="container-wide">
        {/* Заголовок секции */}
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
          Выберите тариф
        </h2>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card relative ${
                plan.highlighted
                  ? "border-2 border-primary shadow-bumaga-lg scale-105"
                  : ""
              }`}
            >
              {/* Рекомендуемый бейдж */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                  РЕКОМЕНДУЕМ
                </div>
              )}

              {/* Название тарифа */}
              <h3 className="text-2xl font-bold text-text mb-2">{plan.name}</h3>

              {/* Цена */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-text">{plan.price}</p>
                {plan.period && (
                  <p className="text-text-muted text-sm">{plan.period}</p>
                )}
              </div>

              {/* Примечание (для льготного тарифа) */}
              {plan.note && (
                <p className="text-text-muted text-sm mb-4 italic">
                  {plan.note}
                </p>
              )}

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">✓</span>
                    <span className="text-text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA кнопка */}
              <button
                className={`btn w-full ${
                  plan.highlighted ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
