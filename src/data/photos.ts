import photo0 from '@/assets/images-web-0.jpg.asset.json';
import photo04 from '@/assets/images-web-04.jpg.asset.json';
import photo05 from '@/assets/images-web-05.jpg.asset.json';
import photo06 from '@/assets/images-web-06.jpg.asset.json';
import photo08 from '@/assets/images-web-08.jpg.asset.json';
import photo09 from '@/assets/images-web-09.jpg.asset.json';
import heroVideo from '@/assets/videos-final-compressed.mp4.asset.json';

// Only approved, real venue photography. No generated or altered imagery.
export type PhotoAspect = 'landscape' | 'portrait' | 'square' | 'wide';

export interface VenuePhoto {
  src: string;
  alt: string;
  aspect: PhotoAspect;
  objectPosition?: string;
}

export const HERO_VIDEO_SRC = heroVideo.url;
export const HERO_POSTER_SRC = photo05.url;

export const SPACE_PHOTO: VenuePhoto = {
  src: photo09.url,
  alt: 'Зал АРКА 123: два арочных окна на задней стене, тёмный потолок с линейным светом и дубовый пол ёлочкой',
  aspect: 'portrait',
  objectPosition: '58% 50%',
};

export const LOCATION_PHOTO: VenuePhoto = {
  src: photo0.url,
  alt: 'Улица Мстиславца с видом на Национальную библиотеку Беларуси',
  aspect: 'landscape',
};

export const ARCHITECTURE_MAIN: VenuePhoto & { caption: string } = {
  src: photo05.url,
  alt: 'Общий вид зала АРКА 123 с колонной, линейным светом и стойкой ресепшн',
  aspect: 'landscape',
  caption: 'Общий вид зала',
};

export const ARCHITECTURE_DETAILS: ReadonlyArray<VenuePhoto & { caption: string }> = [
  {
    src: photo08.url,
    alt: 'Два арочных окна на задней стене пространства АРКА 123',
    aspect: 'portrait',
    caption: 'Арочные окна задней стены',
  },
  {
    src: photo04.url,
    alt: 'Интерьер АРКА 123 с линейным светом под потолком',
    aspect: 'portrait',
    caption: 'Линейный свет и фактура потолка',
  },
];

export const DETAIL_PHOTO: VenuePhoto = {
  src: photo06.url,
  alt: 'Стеклянная перегородка и дубовый пол ёлочкой в АРКА 123',
  aspect: 'portrait',
};
