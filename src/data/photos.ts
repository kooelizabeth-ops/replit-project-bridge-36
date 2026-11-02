import photo0 from '@/assets/images-web-0.jpg.asset.json';
import photo04 from '@/assets/images-web-04.jpg.asset.json';
import photo05 from '@/assets/images-web-05.jpg.asset.json';
import photo06 from '@/assets/images-web-06.jpg.asset.json';
import photo07 from '@/assets/images-web-07.jpg.asset.json';
import photo08 from '@/assets/images-web-08.jpg.asset.json';
import photo09 from '@/assets/images-web-09.jpg.asset.json';
import heroVideo from '@/assets/videos-final-compressed.mp4.asset.json';

export type PhotoAspect = 'landscape' | 'portrait' | 'square' | 'wide';

export interface VenuePhoto {
  src: string;
  alt: string;
  aspect: PhotoAspect;
  objectPosition?: string;
}

export const HERO_VIDEO_SRC = heroVideo.url;

export const ABOUT_PHOTO: VenuePhoto = {
  src: photo09.url,
  alt: 'Интерьер АРКА 123 с двумя арочными окнами на задней стене',
  aspect: 'portrait',
  objectPosition: '62% 50%',
};

export const LOCATION_PHOTO: VenuePhoto = {
  src: photo0.url,
  alt: 'Улица Мстиславца с видом на Национальную библиотеку Беларуси',
  aspect: 'landscape',
};

export const ARCHITECTURE_PHOTOS: ReadonlyArray<VenuePhoto & { caption: string; className: string }> = [
  {
    src: photo08.url,
    alt: 'Два арочных окна на задней стене пространства АРКА 123',
    aspect: 'landscape',
    caption: 'Арочные окна задней стены.',
    className: 'lg:col-span-8',
  },
  {
    src: photo04.url,
    alt: 'Интерьер АРКА 123 с линейным светом под потолком',
    aspect: 'portrait',
    caption: 'Линейный свет и фактура потолка.',
    className: 'lg:col-span-4 lg:mt-48',
  },
];

export const GALLERY_PHOTOS: ReadonlyArray<VenuePhoto & { className: string }> = [
  {
    src: photo05.url,
    alt: 'Пространство АРКА 123, общий вид зала',
    aspect: 'wide',
    className: 'md:col-span-12 lg:col-span-8',
  },
  {
    src: photo06.url,
    alt: 'Интерьер АРКА 123, деталь пространства',
    aspect: 'portrait',
    className: 'md:col-span-6 lg:col-span-4 lg:mt-24',
  },
  {
    src: photo07.url,
    alt: 'Интерьер АРКА 123, фактура стен и света',
    aspect: 'landscape',
    className: 'md:col-span-6 lg:col-span-7',
  },
  {
    src: photo09.url,
    alt: 'Арочные окна задней стены АРКА 123',
    aspect: 'square',
    className: 'md:col-span-12 lg:col-span-5 lg:mt-16',
  },
];
