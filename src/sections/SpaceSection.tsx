import VenuePhoto from '@/components/VenuePhoto';
import { SPACE_FACTS } from '@/data/content';
import { SPACE_PHOTO } from '@/data/photos';

export default function SpaceSection() {
  return (
    <section id="space" aria-labelledby="space-title" className="section-y bg-ivory text-ink">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <p className="label-mono text-brand lg:col-span-2">02 — Пространство</p>
          <h2 id="space-title" className="display-section max-w-[18ch] lg:col-span-8">
            Универсальная площадка для мероприятий любого формата.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <figure className="lg:col-span-8">
            <VenuePhoto photo={SPACE_PHOTO} sizes="(min-width: 1024px) 66vw, 100vw" />
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-[13px] text-ash">
              <span>Два арочных окна задней стены</span>
              <span className="label-mono">Вид на Библиотеку</span>
            </figcaption>
          </figure>

          <dl className="flex flex-col self-end border-t border-brand lg:col-span-4">
            {SPACE_FACTS.map((fact) => (
              <div key={fact.label} className="grid grid-cols-[96px_1fr] gap-4 border-b border-rule py-5">
                <dt className="label-mono pt-1 text-ash">{fact.label}</dt>
                <dd className="text-[16px] leading-[1.45] lg:text-[17px]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
