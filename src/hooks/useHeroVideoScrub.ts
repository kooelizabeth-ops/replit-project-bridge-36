import { useEffect, type RefObject } from 'react';

type ChapterRefs = readonly [
  RefObject<HTMLDivElement | null>,
  RefObject<HTMLDivElement | null>,
  RefObject<HTMLDivElement | null>,
];

interface HeroVideoScrubRefs {
  sectionRef: RefObject<HTMLElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
  chapterRefs: ChapterRefs;
  progressRef: RefObject<HTMLDivElement | null>;
  /** Centred brand logo shown before the opening text (brand reveal). */
  logoRef?: RefObject<HTMLElement | null>;
}

const SEEK_TOLERANCE_SECONDS = 0.03;
const CHAPTER_BOUNDARIES = [1 / 3, 2 / 3] as const;
const CROSSFADE_WIDTH = 0.12;
const CHAPTER_SHIFT_PX = 16;
const HIDDEN_OPACITY = 0.01;

function ramp(value: number, start: number, end: number): number {
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

// Brand reveal inside the opening chapter (progress units of the existing scene):
// the centred logo fades out first, then the opening items appear one by one.
const LOGO_FADE = [0.005, 0.06] as const;
const REVEAL_STARTS = [0.065, 0.085, 0.105, 0.125] as const;
const REVEAL_LENGTH = 0.045;
const REVEAL_SHIFT_PX = 12;

function chapterOpacities(progress: number): [number, number, number] {
  const [first, second] = CHAPTER_BOUNDARIES;
  const half = CROSSFADE_WIDTH / 2;
  const toSecond = ramp(progress, first - half, first + half);
  const toThird = ramp(progress, second - half, second + half);
  return [1 - toSecond, toSecond * (1 - toThird), toThird];
}

export default function useHeroVideoScrub({
  sectionRef,
  videoRef,
  chapterRefs,
  progressRef,
  logoRef,
}: HeroVideoScrubRefs) {
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const progressBar = progressRef.current;
    const chapters = chapterRefs.map((ref) => ref.current);
    if (!section || !video || !progressBar || chapters.some((chapter) => !chapter)) return;

    let frame = 0;

    const render = () => {
      frame = 0;
      const scrollable = section.offsetHeight - window.innerHeight;
      const raw = scrollable > 0 ? -section.getBoundingClientRect().top / scrollable : 0;
      const progress = Math.min(Math.max(raw, 0), 1);

      progressBar.style.transform = `scaleX(${progress})`;

      chapterOpacities(progress).forEach((opacity, index) => {
        const chapter = chapters[index];
        if (!chapter) return;
        chapter.style.opacity = String(opacity);
        chapter.style.transform = `translate3d(0, ${(1 - opacity) * CHAPTER_SHIFT_PX}px, 0)`;
        chapter.style.visibility = opacity < HIDDEN_OPACITY ? 'hidden' : 'visible';
      });

      // Brand reveal: only while the centred logo is rendered (not with reduced motion).
      const logo = logoRef?.current ?? null;
      const revealItems = chapters[0]?.querySelectorAll<HTMLElement>('[data-reveal]') ?? [];
      if (logo) logo.style.opacity = String(1 - ramp(progress, LOGO_FADE[0], LOGO_FADE[1]));
      revealItems.forEach((item) => {
        const index = Number(item.dataset['reveal']) || 0;
        const start = REVEAL_STARTS[Math.min(index, REVEAL_STARTS.length - 1)] ?? 0;
        const opacity = logo ? ramp(progress, start, start + REVEAL_LENGTH) : 1;
        item.style.opacity = String(opacity);
        item.style.transform = `translate3d(0, ${(1 - opacity) * REVEAL_SHIFT_PX}px, 0)`;
        item.style.pointerEvents = opacity < HIDDEN_OPACITY ? 'none' : '';
      });

      const duration = video.duration;
      if (Number.isFinite(duration) && duration > 0) {
        const targetTime = progress * duration;
        if (Math.abs(video.currentTime - targetTime) > SEEK_TOLERANCE_SECONDS) {
          video.currentTime = targetTime;
        }
      }
    };

    const requestRender = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    video.addEventListener('loadedmetadata', requestRender);
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    requestRender();

    return () => {
      cancelAnimationFrame(frame);
      video.removeEventListener('loadedmetadata', requestRender);
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
    };
  }, [sectionRef, videoRef, chapterRefs, progressRef, logoRef]);
}
