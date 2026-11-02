import VenuePhoto from '@/components/VenuePhoto';
import { SITE } from '@/data/content';
import { ABOUT_PHOTO } from '@/data/photos';

export default function AboutSection() {
  return (
    <section id="space" aria-labelledby="about-title" className="bg-stone-100 py-28 text-ink-900 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
        <VenuePhoto photo={ABOUT_PHOTO} sizes="(min-width: 1024px) 58vw, 100vw" className="lg:col-span-7" />

        <div className="flex flex-col justify-center lg:col-span-4 lg:col-start-9">
          <p className="eyebrow text-stone-600">Пространство</p>
          <h2 id="about-title" className="mt-6 text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.2] tracking-[-0.015em]">
            Пространство, в котором встречаются идеи.
          </h2>
          <p className="mt-8 text-base leading-[1.5] text-stone-700 lg:text-lg">
            АРКА 123 — камерное архитектурное пространство в Минске для событий, общения и новых впечатлений. 123 м², в
            которых легко создать собственную атмосферу встречи.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-stone-300 pt-8">
            <div>
              <dt className="eyebrow text-stone-600">Площадь</dt>
              <dd className="mt-3 text-2xl font-medium">{SITE.area}</dd>
            </div>
            <div>
              <dt className="eyebrow text-stone-600">Адрес</dt>
              <dd className="mt-3 text-base font-medium leading-[1.5]">{SITE.address}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
