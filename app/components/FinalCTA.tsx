export default function FinalCTA() {
  return (
    <section className="container-section bg-primary">
      <div className="container-wide text-center">
        {/* Заголовок */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Готовы сэкономить 2-3 часа на каждом заключении?
        </h2>

        {/* Подзаголовок */}
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Попробуйте бесплатно 14 дней. Без карты. Отмена в любой момент.
        </p>

        {/* CTA кнопка */}
        <a href="#pricing" className="btn btn-primary-white text-lg px-8 py-4">
          Попробовать бесплатно
        </a>
      </div>
    </section>
  );
}
