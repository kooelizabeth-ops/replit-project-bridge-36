import { ArrowUpRight } from 'lucide-react';
import { BOOKING_HREF, EVENT_FORMATS } from '@/data/content';

export default function FormatsSection() {
  return (
    <section id="formats" aria-labelledby="formats-title" className="section-y bg-paper text-ink">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-4">
          <p className="label-mono text-brand">03 — Форматы</p>
          <h2 id="formats-title" className="display-section mt-6 max-w-[10ch]">
            Один зал. Четыре формата.
          </h2>
        </div>

        <ol className="border-t border-ink lg:col-span-7 lg:col-start-6">
          {EVENT_FORMATS.map((format, index) => (
            <li key={format.id} className="border-b border-rule">
              <a
                href={BOOKING_HREF}
                className="group flex items-center justify-between gap-6 py-7 transition-colors duration-300 lg:py-9"
              >
                <span className="flex items-baseline gap-6 lg:gap-10">
                  <span className="label-mono text-ash transition-colors duration-300 group-hover:text-brand">
                    0{index + 1}
                  </span>
                  <span className="display-sub transition-colors duration-300 group-hover:text-brand">{format.title}</span>
                </span>
                <ArrowUpRight
                  size={20}
                  strokeWidth={1.25}
                  aria-hidden
                  className="shrink-0 text-ash transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
