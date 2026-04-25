export default function Problem() {
  const problems = [
    {
      title: "2-3 часа на одно заключение",
      description:
        "Ручной расчёт результатов, заполнение таблиц, оформление отчётов. Время уходит на рутину, а не на детей.",
    },
    {
      title: "Разрозненные методики",
      description:
        "Одна методика в PDF, другая в Excel, третья на бумаге. Никакой единой системы.",
    },
    {
      title: "Ошибка в расчётах = проблемы",
      description:
        "Небольшая ошибка в подсчётах может привести к неправильной интерпретации результатов.",
    },
  ];

  return (
    <section className="container-section bg-background-light">
      <div className="container-wide">
        {/* Заголовок секции */}
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
          Знакомо?
        </h2>

        {/* Карточки */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="card card-hover">
              {/* Заголовок карточки */}
              <h3 className="text-xl font-semibold text-text mb-4">
                {problem.title}
              </h3>

              {/* Описание */}
              <p className="text-text-muted leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
