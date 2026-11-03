import photo0 from '@/assets/images-web-0.jpg';
import photo04 from '@/assets/images-web-04.jpg';
import photo05 from '@/assets/images-web-05.jpg';
import photo06 from '@/assets/images-web-06.jpg';
import photo07 from '@/assets/images-web-07.jpg';
import photo08 from '@/assets/images-web-08.jpg';
import photo09 from '@/assets/images-web-09.jpg';
import heroVideo from '@/assets/videos-final-compressed.mp4';

export type PhotoAspect = 'landscape' | 'portrait' | 'square' | 'wide';

export interface VenuePhoto {
  src: string;
  alt: string;
  aspect: PhotoAspect;
  objectPosition?: string;
}

export const HERO_VIDEO_SRC = heroVideo;

export const ABOUT_PHOTO: VenuePhoto = {
  src: photo09,
  alt: 'Интерьер АРКА 123 с двумя арочными окнами на задней стене',
  aspect: 'portrait',
  objectPosition: '62% 50%',
};

export const LOCATION_PHOTO: VenuePhoto = {
  src: photo0,
  alt: 'Улица Мстиславца с видом на Национальную библиотеку Беларуси',
  aspect: 'landscape',
};

export const ARCHITECTURE_PHOTOS: ReadonlyArray<VenuePhoto & { caption: string; className: string }> = [
  {
    src: photo08,
    alt: 'Два арочных окна на задней стене пространства АРКА 123',
    aspect: 'landscape',
    caption: 'Арочные окна задней стены.',
    className: 'lg:col-span-8',
  },
  {
    src: photo04,
    alt: 'Интерьер АРКА 123 с линейным светом под потолком',
    aspect: 'portrait',
    caption: 'Линейный свет и фактура потолка.',
    className: 'lg:col-span-4 lg:mt-48',
  },
];

export const GALLERY_PHOTOS: ReadonlyArray<VenuePhoto & { className: string }> = [
  {
    src: photo05,
    alt: 'Пространство АРКА 123, общий вид зала',
    aspect: 'wide',
    className: 'md:col-span-12 lg:col-span-8',
  },
  {
    src: photo06,
    alt: 'Интерьер АРКА 123, деталь пространства',
    aspect: 'portrait',
    className: 'md:col-span-6 lg:col-span-4 lg:mt-24',
  },
  {
    src: photo07,
    alt: 'Интерьер АРКА 123, фактура стен и света',
    aspect: 'landscape',
    className: 'md:col-span-6 lg:col-span-7',
  },
  {
    src: photo09,
    alt: 'Арочные окна задней стены АРКА 123',
    aspect: 'square',
    className: 'md:col-span-12 lg:col-span-5 lg:mt-16',
  },
];
