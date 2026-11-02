import { useEffect, useState } from 'react';
import { PRELOADER_PATHS } from '@/data/preloaderLogo';

const MIN_VISIBLE_MS = 700;
const MAX_VISIBLE_MS = 2800;
const FADE_MS = 450;

/** Branded overlay shown once per fresh page load; independent of the hero. */
export default function SitePreloader() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'gone'>('visible');

  useEffect(() => {
    const start = performance.now();
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start));
      window.setTimeout(() => {
        html.style.overflow = previousOverflow;
        setPhase('fading');
        window.setTimeout(() => setPhase('gone'), FADE_MS);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const cap = window.setTimeout(finish, MAX_VISIBLE_MS);

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(cap);
      html.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div
      role="status"
      aria-label="АРКА 123"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-stone-100 transition-opacity ease-out ${
        phase === 'fading' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="flex w-[min(72vw,420px)] flex-col gap-6">
        <svg viewBox="0 0 1897 632" aria-hidden focusable="false" className="h-auto w-full fill-brand">
          {PRELOADER_PATHS.map((d, i) => (
            <path
              key={i}
              d={d}
              fillRule="evenodd"
              className="preloader-letter motion-reduce:animate-none motion-reduce:opacity-100"
              style={{ animationDelay: `${i * 90}ms` }}
            />
          ))}
        </svg>
        <div className="mx-[6%] h-px bg-stone-300">
          <div className="preloader-line h-px bg-brand motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}
