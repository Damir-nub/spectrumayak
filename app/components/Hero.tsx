export default function Hero() {
  return (
    <section className="container-section bg-white">
      <div className="container-wide text-center">
        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6">
          СпектраМаяк — автоматизация диагностики РАС в 10 раз быстрее
        </h1>

        {/* Подзаголовок */}
        <p className="text-lg md:text-xl text-text-muted mb-8 max-w-3xl mx-auto">
          Помогает дефектологам, логопедам и психологам формировать заключения
          за 15 минут вместо 2-3 часов
        </p>

        {/* CTA кнопка */}
        <div className="flex flex-col items-center space-y-4">
          <a href="#pricing" className="btn btn-primary text-lg px-8 py-4">
            Попробовать бесплатно 14 дней
          </a>

          {/* Мелкий текст под кнопкой */}
          <small className="text-text-muted">
            Бесплатный тариф: 1 методика навсегда • Без карты • Отмена в любой
            момент
          </small>
        </div>
      </div>
    </section>
  );
}
