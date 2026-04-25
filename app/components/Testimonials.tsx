export default function Testimonials() {
  const testimonials = [
    {
      name: "Елена",
      role: "дефектолог, Москва",
      text: "Раньше я тратила 2-3 часа на оформление одного заключения. Теперь — 15 минут. Освободившееся время трачу на детей, а не на бумажную работу.",
    },
    {
      name: "Ольга",
      role: "логопед, Санкт-Петербург",
      text: "Наконец-то всё в одном месте! Раньше приходилось использовать 3 разных источника. Теперь — только СпектраМаяк.",
    },
  ];

  return (
    <section className="container-section bg-background-light">
      <div className="container-wide">
        {/* Заголовок секции */}
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">
          Кто уже использует СпектраМаяк
        </h2>

        {/* Отзывы */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card card-hover">
              {/* Аватар (заглушка) */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-text-muted text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Цитата */}
              <p className="text-text-muted leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Социальное доказательство */}
        <div className="text-center">
          <p className="text-lg text-text-muted mb-4">
            30+ специалистов по всей России уже используют СпектраМаяк
          </p>
          <a href="#pricing" className="btn btn-primary">
            Присоединиться
          </a>
        </div>
      </div>
    </section>
  );
}
