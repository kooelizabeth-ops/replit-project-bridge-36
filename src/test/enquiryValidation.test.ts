import { describe, expect, it } from 'vitest';
import { validateEnquiry, type EnquiryInput } from '@/lib/enquiryValidation';

const valid: EnquiryInput = {
  name: 'Анна',
  phone: '+375 (29) 123-45-67',
  comment: '',
};

describe('validateEnquiry', () => {
  it('accepts name and phone with an empty comment', () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it('requires a name of at most 120 characters', () => {
    expect(validateEnquiry({ ...valid, name: '  ' }).name).toBeDefined();
    expect(validateEnquiry({ ...valid, name: 'a'.repeat(121) }).name).toBeDefined();
    expect(validateEnquiry({ ...valid, name: 'a'.repeat(120) }).name).toBeUndefined();
  });

  it('requires a phone with at least 7 digits', () => {
    expect(validateEnquiry({ ...valid, phone: '' }).phone).toBeDefined();
    expect(validateEnquiry({ ...valid, phone: '+375 29' }).phone).toBeDefined();
    expect(validateEnquiry({ ...valid, phone: 'anna@example.com' }).phone).toBeDefined();
    expect(validateEnquiry({ ...valid, phone: '1234567' }).phone).toBeUndefined();
  });

  it('keeps the comment optional, up to 2000 characters', () => {
    expect(validateEnquiry({ ...valid, comment: 'a'.repeat(2000) }).comment).toBeUndefined();
    expect(validateEnquiry({ ...valid, comment: 'a'.repeat(2001) }).comment).toBeDefined();
  });
});
