"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Нужна ли медицинская лицензия?",
      answer:
        "Нет. СпектраМаяк — это не медицинское диагностическое средство, а инструмент для специалистов. Результаты методик предназначены для использования в рамках комплексной диагностики. Окончательный диагноз устанавливает врач-психиатр.",
    },
    {
      question: "Соответствует ли приложение 152-ФЗ?",
      answer:
        "Да. Мы минимизируем собираемые данные: не храним ФИО детей (только ID), не собираем точные даты рождения. Данные зашифрованы на сервере.",
    },
    {
      question: "Могу ли я отменить подписку?",
      answer:
        "Да, в любой момент. Нет штрафов, неудобных вопросов. Просто нажмите 'Отменить подписку' в настройках.",
    },
    {
      question: "Работает ли без интернета?",
      answer:
        "Нет. СпектраМаяк — это веб-приложение, требуется интернет. Это позволяет автоматически обновлять методики и обеспечивать безопасность данных.",
    },
    {
      question: "Могу ли я использовать методики offline?",
      answer:
        "Да. Вы можете экспортировать результаты в PDF и распечатать. Также можно заполнить на бумаге, а внести данные позже.",
    },
    {
      question: "Какие методики используются?",
      answer:
        "Оригинальная методика 'СпектраМаяк' — 5 модулей, основанных на современных исследованиях РАС. Вдохновлённая ADOS-2, но не копия. 100% легально.",
    },
    {
      question: "Есть ли обучение?",
      answer:
        "Да. У нас есть видео-инструкция, PDF-гайд и Telegram-поддержка. Обучение занимает 10-15 минут.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="container-section bg-background-light">
      <div className="container-wide">
        {/* Заголовок секции */}
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
          Вопросы и ответы
        </h2>

        {/* Аккордеон */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="card">
              {/* Вопрос */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-text pr-4">
                  {faq.question}
                </h3>
                <span
                  className={`text-primary transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Ответ (показываем, если открыт) */}
              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
