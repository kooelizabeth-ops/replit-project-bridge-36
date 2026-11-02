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
}

const SEEK_TOLERANCE_SECONDS = 0.03;
const CHAPTER_BOUNDARIES = [1 / 3, 2 / 3] as const;
const CROSSFADE_WIDTH = 0.12;
const CHAPTER_SHIFT_PX = 16;
const HIDDEN_OPACITY = 0.01;

function ramp(value: number, start: number, end: number): number {
  return Math.min(Math.max((value - start) / (end - start), 0), 1);
}

function chapterOpacities(progress: number): [number, number, number] {
  const [first, second] = CHAPTER_BOUNDARIES;
  const half = CROSSFADE_WIDTH / 2;
  const toSecond = ramp(progress, first - half, first + half);
  const toThird = ramp(progress, second - half, second + half);
  return [1 - toSecond, toSecond * (1 - toThird), toThird];
}

export default function useHeroVideoScrub({ sectionRef, videoRef, chapterRefs, progressRef }: HeroVideoScrubRefs) {
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
  }, [sectionRef, videoRef, chapterRefs, progressRef]);
}
