import { useRef, type CSSProperties } from 'react';
import heroLogo from '@/assets/logo-white.png.asset.json';
import { ArrowRight } from 'lucide-react';
import { BOOKING_HREF } from '@/data/content';
import { HERO_VIDEO_SRC } from '@/data/photos';
import useHeroVideoScrub from '@/hooks/useHeroVideoScrub';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const CHAPTER_HEADLINE = 'text-[clamp(36px,5.6vw,76px)] font-medium leading-[1.05] tracking-[-0.02em] text-on-media';
const CHAPTER_SUPPORT = 'mt-7 text-lg leading-[1.5] text-on-media/85 lg:text-xl';
const CHAPTER_CHANNEL = 'col-start-1 row-start-1 will-change-[opacity,transform]';

const CTA_CLASS =
  'group mt-10 inline-flex h-12 items-center gap-3 bg-stone-100 px-6 text-sm font-medium text-ink-900 transition-colors duration-200 hover:bg-stone-200 active:bg-stone-300';

// Opening items start hidden for the brand reveal; the scroll hook fades them in.
const REVEAL_HIDDEN = { opacity: 0, transform: 'translate3d(0, 12px, 0)' } as const;
const REVEAL_SHOWN = { opacity: 1, transform: 'none' } as const;

function CtaLink({ children, reveal }: { children: string; reveal?: { index: number; style: CSSProperties } }) {
  return (
    <a href={BOOKING_HREF} className={CTA_CLASS} data-reveal={reveal?.index} style={reveal?.style}>
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
  const logoRef = useRef<HTMLDivElement>(null);
  const revealStyle = reduceMotion ? REVEAL_SHOWN : REVEAL_HIDDEN;

  useHeroVideoScrub({
    sectionRef,
    videoRef,
    progressRef,
    chapterRefs: [openingRef, characterRef, invitationRef],
    logoRef,
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
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-scrim/15" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/10 to-transparent"
        />

        {!reduceMotion && (
          <div
            ref={logoRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-[opacity]"
          >
            <img src={heroLogo.url} alt="" width={600} height={200} decoding="async" className="h-auto w-[70vw] max-w-none md:w-[380px] lg:w-[440px]" />
          </div>
        )}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>

        <div className="relative flex h-full items-end">
          <div className="mx-auto grid w-full max-w-[1440px] px-6 pb-14 pt-32 lg:px-12 lg:pb-24">
            <div ref={openingRef} className={`${CHAPTER_CHANNEL} max-w-[880px]`}>
              <p data-reveal={0} style={revealStyle} className="text-xs font-medium uppercase tracking-[0.18em] text-on-media/75">
                АРКА 123 · MINSK · 123 М²
              </p>
              <h1 data-reveal={1} style={revealStyle} className={`mt-6 text-balance ${CHAPTER_HEADLINE}`}>
                АРКА 123 — пространство для встреч, которые имеют значение.
              </h1>
              <p data-reveal={2} style={revealStyle} className={CHAPTER_SUPPORT}>
                Встречаемся напротив Библиотеки.
              </p>
              <CtaLink reveal={{ index: 3, style: revealStyle }}>Забронировать пространство</CtaLink>
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
