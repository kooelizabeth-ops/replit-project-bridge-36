import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_HREF, SITE } from '@/data/content';
import { HERO_POSTER_SRC, HERO_VIDEO_SRC } from '@/data/photos';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduceMotion) {
      video.pause();
      return;
    }
    video.muted = true;
    video.play().catch(() => {
      /* Autoplay blocked: the poster photograph stays visible. */
    });
  }, [reduceMotion]);

  return (
    <section id="top" aria-label="АРКА 123" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-graphite text-paper">
      <video
        ref={videoRef}
        src={HERO_VIDEO_SRC}
        poster={HERO_POSTER_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        aria-hidden
        tabIndex={-1}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Light gradient only behind the text area, keeping the room bright. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-graphite/70 via-graphite/20 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-graphite/45 to-transparent" />

      <div className="relative flex h-full items-end">
        <div className="shell grid w-full gap-8 pb-12 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="hero-in lg:col-span-9">
            <p className="label-mono text-paper/80">{SITE.locationMarker}</p>
            <h1 className="display-hero mt-6 max-w-[14ch] text-paper">
              Пространство для встреч, которые имеют значение.
            </h1>
          </div>
          <div className="hero-in flex lg:col-span-3 lg:justify-end" style={{ animationDelay: '200ms' }}>
            <a
              href={BOOKING_HREF}
              className="group inline-flex h-12 items-center gap-3 bg-paper px-6 text-[14px] text-ink transition-colors duration-300 hover:bg-ivory"
            >
              Забронировать пространство
              <ArrowRight size={16} strokeWidth={1.5} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
