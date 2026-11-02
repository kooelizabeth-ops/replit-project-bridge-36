import type { PhotoAspect, VenuePhoto as VenuePhotoData } from '@/data/photos';
import useReveal from '@/hooks/useReveal';

const ASPECT_RATIO: Record<PhotoAspect, string> = {
  landscape: '3 / 2',
  portrait: '4 / 5',
  square: '1 / 1',
  wide: '16 / 9',
};

interface VenuePhotoProps {
  photo: VenuePhotoData;
  sizes: string;
  className?: string;
  aspect?: PhotoAspect;
  eager?: boolean;
}

export default function VenuePhoto({ photo, sizes, className = '', aspect, eager = false }: VenuePhotoProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ aspectRatio: ASPECT_RATIO[aspect ?? photo.aspect] }}
      className={`reveal relative w-full overflow-hidden bg-rule ${className}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        sizes={sizes}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: photo.objectPosition ?? 'center' }}
      />
    </div>
  );
}
