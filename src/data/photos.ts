import photo0 from '@/assets/images-web-0.jpg.asset.json';
import photo3 from '@/assets/images-web-3.jpg.asset.json';
import photo04 from '@/assets/images-web-04.jpg.asset.json';
import photo07 from '@/assets/images-web-07.jpg.asset.json';
import photo08 from '@/assets/images-web-08.jpg.asset.json';
import photo09 from '@/assets/images-web-09.jpg.asset.json';
import heroVideo from '@/assets/videos-final-compressed.mp4.asset.json';

// Only approved, real venue photography. Crops must keep both arched windows intact.
export type PhotoAspect = 'landscape' | 'portrait' | 'square' | 'wide';

export interface VenuePhoto {
  src: string;
  alt: string;
  aspect: PhotoAspect;
  objectPosition?: string;
}

export const HERO_VIDEO_SRC = heroVideo.url;
export const HERO_POSTER_SRC = photo08.url;

export const SPACE_PHOTO: VenuePhoto = {
  src: photo3.url,
  alt: 'Два больших арочных окна на задней стене АРКА 123 с видом на Национальную библиотеку',
  aspect: 'wide',
};

export const LOCATION_PHOTO: VenuePhoto = {
  src: photo0.url,
  alt: 'Улица Мстиславца с видом на Национальную библиотеку Беларуси',
  aspect: 'landscape',
};

export const ARCHITECTURE_MAIN: VenuePhoto & { caption: string } = {
  src: photo09.url,
  alt: 'Зал АРКА 123: арочные окна задней стены, тёмный потолок с линейным светом, дубовый пол ёлочкой',
  aspect: 'wide',
  caption: 'Задняя стена и арочные окна',
};

export const ARCHITECTURE_PORTRAIT: VenuePhoto & { caption: string } = {
  src: photo07.url,
  alt: 'Кремовая стена, стеклянная перегородка и дубовый пол ёлочкой в АРКА 123',
  aspect: 'portrait',
  objectPosition: '50% 60%',
  caption: 'Фактура стен и пола',
};

export const ARCHITECTURE_LANDSCAPE: VenuePhoto & { caption: string } = {
  src: photo04.url,
  alt: 'Колонны и линейный свет под тёмным потолком АРКА 123',
  aspect: 'wide',
  caption: 'Линейный свет и колонны',
};
