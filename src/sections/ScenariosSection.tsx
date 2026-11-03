import { useEffect, useRef, useState } from 'react';
import floristry from '@/assets/scenario-floristry.webp.asset.json';
import lecture from '@/assets/scenario-lecture.webp.asset.json';
import quiz from '@/assets/scenario-quiz.webp.asset.json';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  const visible = reduce || shown;
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Photo({ src, alt, ratio, eager }: { src: string; alt: string; ratio: string; eager?: boolean }) {
  return (
    <div className={`group overflow-hidden bg-stone-200 ${ratio}`}>
      <img
        src={src}
        alt={alt}
        width={1679}
        height={937}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015] motion-reduce:transition-none"
      />
    </div>
  );
}

function Caption({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div className="border-t border-stone-300 pt-5">
      <p className="eyebrow text-stone-600">{label}</p>
      <h3 className="mt-4 text-[clamp(22px,2.2vw,30px)] font-medium leading-[1.2] tracking-[-0.01em]">{title}</h3>
      <p className="mt-3 text-base leading-[1.5] text-stone-700">{text}</p>
    </div>
  );
}

export default function ScenariosSection() {
  return (
    <section id="scenarios" aria-labelledby="scenarios-title" className="overflow-hidden bg-stone-50 py-28 text-charcoal lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-brand">АРКА 123 / Пространство</p>
            <h2
              id="scenarios-title"
              className="mt-6 text-[clamp(32px,4.6vw,64px)] font-medium uppercase leading-[1.05] tracking-[-0.02em]"
            >
              Одно пространство.
              <br />
              Разные сценарии.
            </h2>
          </div>
          <p className="self-end text-base leading-[1.5] text-stone-700 lg:col-span-4 lg:col-start-9 lg:text-lg">
            Архитектура, которая адаптируется под характер вашего события.
          </p>
        </Reveal>

        {/* 01 — main frame */}
        <div className="mt-16 grid gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-x-12">
          <Reveal className="lg:col-span-9">
            <Photo src={floristry.url} alt="Флористический мастер-класс в пространстве АРКА 123" ratio="aspect-[16/9]" />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-3 lg:self-end">
            <Caption label="01 / Творческие встречи" title="Пространство для идей" text="Творческие встречи и мастер-классы." />
          </Reveal>
        </div>

        {/* 02 + 03 — asymmetric pair */}
        <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-x-8 lg:mt-32 lg:gap-x-12">
          <Reveal className="flex flex-col gap-6 md:col-span-7">
            <Photo src={lecture.url} alt="Лекция и презентация в пространстве АРКА 123" ratio="aspect-[3/2]" />
            <Caption label="02 / Обучение" title="Пространство для знаний" text="Лекции, презентации и экспертные встречи." />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6 md:col-span-5 md:mt-40">
            <Photo src={quiz.url} alt="Командное мероприятие в пространстве АРКА 123" ratio="aspect-[4/3]" />
            <Caption
              label="03 / Командные события"
              title="Пространство для команды"
              text="Квизы, командные игры и корпоративные события."
            />
          </Reveal>
        </div>

        <Reveal className="mt-24 grid gap-6 border-t border-stone-300 pt-8 lg:mt-32 lg:grid-cols-12 lg:gap-x-12">
          <p className="text-lg leading-[1.4] lg:col-span-6 lg:text-xl">
            АРКА 123 — 123 м² для событий, у которых есть свой характер.
          </p>
          <div className="text-sm leading-[1.6] text-stone-600 lg:col-span-4 lg:col-start-9">
            <p className="eyebrow">Мстиславца, 10 · Минск</p>
            <p className="mt-2">Встречаемся напротив Библиотеки.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
