import { describe, expect, it } from 'vitest';
import { localTodayIso, validateEnquiry, type EnquiryInput } from '@/lib/enquiryValidation';

const valid: EnquiryInput = {
  name: 'Анна',
  contact: 'anna@example.com',
  eventDate: '',
  eventFormat: 'Лекции и презентации',
};

describe('validateEnquiry', () => {
  it('accepts a complete enquiry', () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it('requires a name of at most 120 characters', () => {
    expect(validateEnquiry({ ...valid, name: '  ' }).name).toBeDefined();
    expect(validateEnquiry({ ...valid, name: 'a'.repeat(121) }).name).toBeDefined();
    expect(validateEnquiry({ ...valid, name: 'a'.repeat(120) }).name).toBeUndefined();
  });

  it('requires a phone with at least 7 digits or a valid email', () => {
    expect(validateEnquiry({ ...valid, contact: '' }).contact).toBeDefined();
    expect(validateEnquiry({ ...valid, contact: 'anna@x' }).contact).toBeDefined();
    expect(validateEnquiry({ ...valid, contact: '+375 29' }).contact).toBeDefined();
    expect(validateEnquiry({ ...valid, contact: '+375 (29) 123-45-67' }).contact).toBeUndefined();
  });

  it('rejects event dates in the past', () => {
    expect(validateEnquiry({ ...valid, eventDate: '2000-01-01' }).eventDate).toBeDefined();
    expect(validateEnquiry({ ...valid, eventDate: localTodayIso() }).eventDate).toBeUndefined();
  });

  it('requires an event format', () => {
    expect(validateEnquiry({ ...valid, eventFormat: '' }).eventFormat).toBeDefined();
  });
});
