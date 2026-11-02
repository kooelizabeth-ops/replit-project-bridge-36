import VenuePhoto from '@/components/VenuePhoto';
import { ARCHITECTURE_LANDSCAPE, ARCHITECTURE_MAIN, ARCHITECTURE_PORTRAIT } from '@/data/photos';

function Caption({ index, text }: { index: string; text: string }) {
  return (
    <figcaption className="mt-4 flex items-baseline gap-4 border-t border-rule-dark pt-4 text-[13px] text-mist">
      <span className="label-mono">{index}</span>
      <span>{text}</span>
    </figcaption>
  );
}

export default function ArchitectureSection() {
  return (
    <section id="architecture" aria-labelledby="architecture-title" className="section-y bg-graphite-deep text-paper">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <p className="label-mono text-mist lg:col-span-2">04 — Архитектура</p>
          <h2 id="architecture-title" className="display-section max-w-[14ch] lg:col-span-6">
            Архитектура задаёт настроение.
          </h2>
          <p className="text-[16px] leading-[1.6] text-mist lg:col-span-3 lg:col-start-10 lg:self-end lg:text-[17px]">
            Свет, пространство и внимание к деталям создают атмосферу для продуктивной работы и вдохновляющих событий.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-x-6 lg:mt-24 lg:gap-x-10 lg:gap-y-20">
          <figure className="md:col-span-12 lg:col-span-8">
            <VenuePhoto photo={ARCHITECTURE_MAIN} sizes="(min-width: 1024px) 66vw, 100vw" />
            <Caption index="A" text={ARCHITECTURE_MAIN.caption} />
          </figure>
          <figure className="md:col-span-5 lg:col-span-4 lg:mt-40">
            <VenuePhoto photo={ARCHITECTURE_PORTRAIT} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 42vw, 100vw" />
            <Caption index="B" text={ARCHITECTURE_PORTRAIT.caption} />
          </figure>
          <figure className="md:col-span-7 lg:col-span-6 lg:col-start-3">
            <VenuePhoto photo={ARCHITECTURE_LANDSCAPE} sizes="(min-width: 1024px) 50vw, (min-width: 768px) 58vw, 100vw" />
            <Caption index="C" text={ARCHITECTURE_LANDSCAPE.caption} />
          </figure>
        </div>
      </div>
    </section>
  );
}
