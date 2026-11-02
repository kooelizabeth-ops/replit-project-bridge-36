export default function StatementSection() {
  return (
    <section id="about" aria-labelledby="statement-title" className="section-y bg-graphite text-paper">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-2">
          <p className="label-mono text-mist">01 — О нас</p>
        </div>
        <h2 id="statement-title" className="display-section max-w-[16ch] lg:col-span-6">
          Встречаемся напротив Библиотеки.
        </h2>
        <div className="border-t border-rule-dark pt-8 lg:col-span-3 lg:col-start-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
          <p className="text-[16px] leading-[1.6] text-mist lg:text-[17px]">
            Современное пространство для событий в самом сердце Минска. Стильная архитектура, продуманная атмосфера и
            безупречный сервис.
          </p>
        </div>
      </div>
    </section>
  );
}
