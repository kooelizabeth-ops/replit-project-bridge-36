export const SITE = {
  name: 'АРКА 123',
  brandLine: 'Встречаемся напротив Библиотеки.',
  address: 'Мстиславца, 10, Минск',
  area: '123 м²',
  logoSrc: '/assets/images/4.png',
} as const;

export const NAV_ITEMS = [
  { label: 'Пространство', href: '#space' },
  { label: 'Архитектура', href: '#architecture' },
  { label: 'Галерея', href: '#gallery' },
  { label: 'Форматы', href: '#formats' },
  { label: 'Контакты', href: '#contacts' },
] as const;

export const BOOKING_HREF = '#booking';

export const EVENT_FORMATS = [
  { id: 'lectures', title: 'Лекции и презентации' },
  { id: 'masterclasses', title: 'Мастер-классы и воркшопы' },
  { id: 'corporate', title: 'Корпоративные мероприятия' },
  { id: 'private', title: 'Частные и бренд-события' },
] as const;

export const EVENT_FORMAT_TITLES = EVENT_FORMATS.map((format) => format.title);
