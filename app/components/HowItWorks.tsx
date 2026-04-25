export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Создайте профиль ребёнка",
      description:
        "Введите ID, возраст и пол. Не нужно ФИО — мы соблюдаем 152-ФЗ.",
      time: "← 1 минута",
    },
    {
      number: 2,
      title: "Проведите диагностику",
      description:
        "Отвечайте на вопросы по 5 модулям. Интерфейс как бумажная форма — ничему не нужно учиться.",
      time: "← 10-15 минут",
    },
    {
      number: 3,
      title: "Получите заключение",
      description:
        "Автоматический расчёт + графики + рекомендации. Экспорт в PDF.",
      time: "← Мгновенно",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="container-section bg-background-light"
    >
      <div className="container-wide">
        {/* Заголовок секции */}
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
          Как это работает
        </h2>

        {/* Шаги */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Карточка шага */}
              <div className="card card-hover">
                {/* Номер шага */}
                <div className="flex items-center justify-center w-12 h-12 bg-primary text-white rounded-full text-xl font-bold mb-4">
                  {step.number}
                </div>

                {/* Заголовок */}
                <h3 className="text-xl font-semibold text-text mb-4">
                  {step.title}
                </h3>

                {/* Описание */}
                <p className="text-text-muted leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Время */}
                <p className="text-primary font-semibold text-sm">
                  {step.time}
                </p>
              </div>

              {/* Стрелка между шагами (только на десктопе, не после последнего) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
