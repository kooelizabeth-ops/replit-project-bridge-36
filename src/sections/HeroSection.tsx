import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_HREF } from '@/data/content';
import { HERO_VIDEO_SRC } from '@/data/photos';
import useHeroVideoScrub from '@/hooks/useHeroVideoScrub';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const CHAPTER_HEADLINE = 'text-[clamp(38px,5.6vw,76px)] font-medium leading-[1.2] tracking-[-0.02em] text-stone-50';
const CHAPTER_SUPPORT = 'mt-6 text-lg leading-[1.5] text-stone-200 lg:text-xl';
const CHAPTER_CHANNEL = 'col-start-1 row-start-1 will-change-[opacity,transform]';

const CTA_CLASS =
  'group mt-10 inline-flex h-12 items-center gap-3 bg-stone-100 px-6 text-sm font-medium text-ink-900 transition-colors duration-200 hover:bg-stone-200 active:bg-stone-300';

function CtaLink({ children }: { children: string }) {
  return (
    <a href={BOOKING_HREF} className={CTA_CLASS}>
      {children}
      <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  );
}

export default function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);

  useHeroVideoScrub({
    sectionRef,
    videoRef,
    progressRef,
    chapterRefs: [openingRef, characterRef, invitationRef],
  });

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="АРКА 123"
      className={`relative bg-ink-900 ${reduceMotion ? 'h-[100svh]' : 'h-[250svh] md:h-[300svh]'}`}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <video
          ref={videoRef}
          src={HERO_VIDEO_SRC}
          preload="auto"
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent"
        />

        <div className="relative flex h-full items-end">
          <div className="mx-auto grid w-full max-w-[1440px] px-6 pb-14 pt-32 lg:px-12 lg:pb-24">
            <div ref={openingRef} className={`${CHAPTER_CHANNEL} max-w-[640px]`}>
              <p className="eyebrow text-stone-300">АРКА 123 · MINSK · 123 M²</p>
              <h1 className={`mt-6 ${CHAPTER_HEADLINE}`}>Пространство для встреч, которые имеют значение.</h1>
              <p className={CHAPTER_SUPPORT}>Встречаемся напротив Библиотеки.</p>
              <CtaLink>Забронировать пространство</CtaLink>
            </div>

            {!reduceMotion && (
              <>
                <div ref={characterRef} className={`${CHAPTER_CHANNEL} max-w-[640px]`} style={{ opacity: 0 }}>
                  <h2 className={CHAPTER_HEADLINE}>Больше, чем просто пространство.</h2>
                  <p className={CHAPTER_SUPPORT}>Место для идей, диалога и новых впечатлений.</p>
                </div>

                <div ref={invitationRef} className={`${CHAPTER_CHANNEL} max-w-[640px]`} style={{ opacity: 0 }}>
                  <h2 className={CHAPTER_HEADLINE}>Встречаемся напротив Библиотеки.</h2>
                  <p className={CHAPTER_SUPPORT}>123 м² для вашего следующего события.</p>
                  <CtaLink>Обсудить мероприятие</CtaLink>
                </div>
              </>
            )}
          </div>
        </div>

        {!reduceMotion && (
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-stone-100/20">
            <div ref={progressRef} className="h-full origin-left bg-stone-100" style={{ transform: 'scaleX(0)' }} />
          </div>
        )}
      </div>
    </section>
  );
}
