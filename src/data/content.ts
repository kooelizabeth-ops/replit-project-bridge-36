import logo from '@/assets/images-4.png.asset.json';

export const SITE = {
  name: 'АРКА 123',
  brandLine: 'Встречаемся напротив Библиотеки.',
  address: 'Мстиславца, 10, Минск',
  locationMarker: 'Минск · Мстиславца, 10',
  area: '123 м²',
  logoSrc: logo.url,
} as const;

export const NAV_ITEMS = [
  { label: 'Пространство', href: '#space' },
  { label: 'Форматы', href: '#formats' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
] as const;

export const BOOKING_HREF = '#booking';

export const EVENT_FORMATS = [
  { id: 'lectures', title: 'Лекции и презентации' },
  { id: 'masterclasses', title: 'Мастер-классы и воркшопы' },
  { id: 'corporate', title: 'Корпоративные мероприятия' },
  { id: 'private', title: 'Частные и бренд-события' },
] as const;

export const SPACE_FACTS = [
  { label: 'Площадь', value: '123 м²' },
  { label: 'Адрес', value: 'Минск, Мстиславца, 10' },
  { label: 'Свет', value: 'Естественный свет и выразительная архитектура' },
  { label: 'Форматы', value: 'Камерные и корпоративные события' },
] as const;
