import { useEffect, useState } from 'react';
import BrandMark from '@/components/BrandMark';

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

  // Logo box mirrors the hero's centred logo (same width, centre and offset),
  // so fading this layer reveals the identical logo underneath without a jump.
  return (
    <div
      role="status"
      aria-label="АРКА 123"
      className={`fixed inset-0 z-[100] bg-ink-900 transition-opacity ease-out ${
        phase === 'fading' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="absolute inset-x-0 top-0 flex h-[100svh] items-center justify-center">
        <div className="relative w-[70vw] -translate-y-[2.5svh] md:w-[380px] lg:w-[440px]">
          <BrandMark animated className="w-full fill-on-media" />
          <div className="absolute inset-x-[6%] top-[calc(100%+24px)] h-px bg-on-media/20">
            <div className="preloader-line h-px bg-on-media/75 motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
