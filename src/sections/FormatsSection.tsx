import { ArrowUpRight } from 'lucide-react';
import { BOOKING_HREF, EVENT_FORMATS } from '@/data/content';

export default function FormatsSection() {
  return (
    <section id="formats" aria-labelledby="formats-title" className="bg-ink-900 py-28 text-stone-100 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-stone-400">Форматы</p>
          <h2 id="formats-title" className="mt-6 text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.2] tracking-[-0.015em]">
            Один зал. Четыре формата.
          </h2>
        </div>

        <ol className="border-t border-ink-700 lg:col-span-7 lg:col-start-6">
          {EVENT_FORMATS.map((format, index) => (
            <li key={format.id} className="border-b border-ink-700">
              <a
                href={BOOKING_HREF}
                className="group flex items-center justify-between gap-6 py-8 transition-colors duration-200 hover:text-stone-50 lg:py-10"
              >
                <span className="flex items-baseline gap-5 lg:gap-8">
                  <span className="text-xs tabular-nums text-stone-500">0{index + 1}</span>
                  <span className="text-[clamp(22px,2.6vw,32px)] font-medium leading-[1.2] text-stone-100">{format.title}</span>
                </span>
                <ArrowUpRight
                  size={22}
                  strokeWidth={1.5}
                  aria-hidden
                  className="shrink-0 text-stone-500 transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-stone-100"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
