import { PRELOADER_PATHS } from '@/data/preloaderLogo';

interface BrandMarkProps {
  /** Sizing / colour classes; colour is set with a `fill-*` utility. */
  className?: string;
  /** Letter-by-letter entrance used by the preloader. */
  animated?: boolean;
}

/** The original АРКА 123 SVG logo, inlined so its colour follows CSS `fill`. */
export default function BrandMark({ className = '', animated = false }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 1897 632" aria-hidden focusable="false" className={`block h-auto ${className}`}>
      {PRELOADER_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fillRule="evenodd"
          className={animated ? 'preloader-letter motion-reduce:animate-none motion-reduce:opacity-100' : undefined}
          style={animated ? { animationDelay: `${i * 90}ms` } : undefined}
        />
      ))}
    </svg>
  );
}
