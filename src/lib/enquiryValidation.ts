export interface EnquiryInput {
  name: string;
  phone: string;
  comment: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

export const NAME_MAX = 120;
export const COMMENT_MAX = 2000;

export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};

  const name = input.name.trim();
  if (!name) {
    errors.name = 'Укажите имя.';
  } else if (name.length > NAME_MAX) {
    errors.name = `Имя не должно быть длиннее ${NAME_MAX} символов.`;
  }

  const phone = input.phone.trim();
  if (!phone) {
    errors.phone = 'Укажите телефон.';
  } else if (!PHONE_PATTERN.test(phone) || phone.replace(/\D/g, '').length < 7 || phone.length > 40) {
    errors.phone = 'Проверьте номер телефона.';
  }

  if (input.comment.trim().length > COMMENT_MAX) {
    errors.comment = `Комментарий не должен быть длиннее ${COMMENT_MAX} символов.`;
  }

  return errors;
}
