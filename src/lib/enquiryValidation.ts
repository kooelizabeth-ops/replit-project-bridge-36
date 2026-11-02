export interface EnquiryInput {
  name: string;
  contact: string;
  eventDate: string;
  eventFormat: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

export function localTodayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = input.name.trim();
  if (!name) {
    errors.name = 'Укажите имя.';
  } else if (name.length > 120) {
    errors.name = 'Имя не должно быть длиннее 120 символов.';
  }

  const contact = input.contact.trim();
  if (!contact) {
    errors.contact = 'Укажите телефон или email.';
  } else if (contact.includes('@')) {
    if (!EMAIL_PATTERN.test(contact) || contact.length > 200) {
      errors.contact = 'Проверьте адрес email.';
    }
  } else if (!PHONE_PATTERN.test(contact) || contact.replace(/\D/g, '').length < 7 || contact.length > 200) {
    errors.contact = 'Проверьте номер телефона или укажите email.';
  }

  if (input.eventDate && input.eventDate < localTodayIso()) {
    errors.eventDate = 'Дата не может быть в прошлом.';
  }

  if (!input.eventFormat) {
    errors.eventFormat = 'Выберите формат события.';
  }

  return errors;
}
