import { SITE } from '@/data/content';

interface BrandLogoProps {
  width: number;
  className?: string;
}

export default function BrandLogo({ width, className = '' }: BrandLogoProps) {
  return (
    <img
      src={SITE.logoSrc}
      alt={SITE.name}
      width={400}
      height={156}
      decoding="async"
      style={{ width }}
      className={`h-auto max-w-none ${className}`}
    />
  );
}
