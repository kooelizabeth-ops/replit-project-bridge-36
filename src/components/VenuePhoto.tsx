import type { PhotoAspect, VenuePhoto as VenuePhotoData } from '@/data/photos';

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
}

export default function VenuePhoto({ photo, sizes, className = '' }: VenuePhotoProps) {
  return (
    <div
      style={{ aspectRatio: ASPECT_RATIO[photo.aspect] }}
      className={`relative w-full overflow-hidden bg-slate-900 ${className}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover saturate-[0.92] contrast-[1.03]"
        style={{ objectPosition: photo.objectPosition ?? 'center' }}
      />
    </div>
  );
}
