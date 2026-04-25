export default function Solution() {
  const solutions = [
    {
      title: "Автоматический расчёт",
      description:
        "Вводите данные — получайте готовые результаты. Никакой математики, никаких ошибок.",
      highlight: "→ 15 минут вместо 2-3 часов",
      icon: "⚡",
    },
    {
      title: "Все методики в одном месте",
      description:
        "5 модулей диагностики РАС в единой системе. Коммуникация, речь, игра, стереотипии, адаптация.",
      highlight: "→ Полная картина развития ребёнка",
      icon: "📊",
    },
    {
      title: "Профессиональные отчёты",
      description:
        "Заключения с графиками, рекомендациями и интерпретацией результатов. Экспорт в PDF.",
      highlight: "→ Готово для показа родителям",
      icon: "📄",
    },
  ];

  return (
    <section className="container-section bg-white">
      <div className="container-wide">
        {/* Заголовок секции */}
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
          СпектраМаяк решает эти проблемы
        </h2>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div key={index} className="card card-hover text-center">
              {/* Иконка */}
              <div className="text-4xl mb-4">{solution.icon}</div>

              {/* Заголовок карточки */}
              <h3 className="text-xl font-semibold text-text mb-4">
                {solution.title}
              </h3>

              {/* Описание */}
              <p className="text-text-muted leading-relaxed mb-4">
                {solution.description}
              </p>

              {/* Выделенное преимущество */}
              <p className="text-primary font-semibold text-sm">
                {solution.highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
