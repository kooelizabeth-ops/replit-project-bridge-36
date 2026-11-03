import VenuePhoto from '@/components/VenuePhoto';
import { ARCHITECTURE_PHOTOS } from '@/data/photos';

export default function ArchitectureSection() {
  return (
    <section id="architecture" aria-labelledby="architecture-title" className="bg-ink-900 py-28 text-stone-100 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-[720px]">
          <p className="eyebrow text-stone-400">02 / Архитектура</p>
          <h2 id="architecture-title" className="mt-6 text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.2] tracking-[-0.015em]">
            Архитектура задаёт настроение.
          </h2>
          <p className="mt-8 text-base leading-[1.5] text-stone-300 lg:text-lg">
            Арочные окна, выразительная геометрия и естественный свет формируют характер пространства. Здесь архитектура
            становится частью каждого события.
          </p>
        </div>

        <div className="mt-20 grid gap-16 lg:mt-28 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-24">
          {ARCHITECTURE_PHOTOS.map((item, index) => (
            <figure key={item.src} className={`flex flex-col gap-5 ${item.className}`}>
              <VenuePhoto photo={item} sizes="(min-width: 1024px) 66vw, 100vw" />
              <figcaption className="flex items-baseline gap-4 border-t border-ink-700 pt-4 text-sm text-stone-300">
                <span className="tabular-nums text-stone-500">0{index + 1}</span>
                <span>{item.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
