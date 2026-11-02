import { useState, type FormEvent } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { EVENT_FORMAT_TITLES } from '@/data/content';
import { submitEnquiry } from '@/lib/enquiries';
import {
  localTodayIso,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from '@/lib/enquiryValidation';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_INPUT: EnquiryInput = {
  name: '',
  contact: '',
  eventDate: '',
  eventFormat: '',
};

const FIELD_CLASS =
  'w-full border-b border-stone-400 bg-transparent py-3 text-base text-ink-900 transition-colors duration-200 hover:border-stone-600 focus:border-ink-900 focus:outline-none aria-[invalid=true]:border-signal-dark';

const LABEL_CLASS = 'text-xs font-medium uppercase tracking-eyebrow text-stone-700';

const ERROR_CLASS = 'mt-2 text-sm text-signal-dark';

export default function EnquiryForm() {
  const [values, setValues] = useState<EnquiryInput>(EMPTY_INPUT);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const updateField = (field: keyof EnquiryInput, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validateEnquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    try {
      await submitEnquiry(values);
      setStatus('success');
      setValues(EMPTY_INPUT);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col gap-6 border-t border-ink-900 pt-10">
        <p className="eyebrow text-moss-dark">Заявка получена</p>
        <h3 className="text-2xl font-medium leading-[1.2]">Спасибо. Мы свяжемся с вами, чтобы обсудить детали.</h3>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="self-start text-sm font-medium text-ink-900 underline underline-offset-8 transition-colors duration-200 hover:text-stone-600"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Заявка на бронирование" className="flex flex-col gap-10">
      {status === 'error' && (
        <p role="alert" className="border border-signal-dark/40 px-4 py-3 text-sm text-signal-dark">
          Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.
        </p>
      )}

      <div className="grid gap-10 md:grid-cols-2 md:gap-x-10">
        <div>
          <label htmlFor="enquiry-name" className={LABEL_CLASS}>
            Имя <span aria-hidden className="text-signal-dark">*</span>
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'enquiry-name-error' : undefined}
            className={`mt-3 ${FIELD_CLASS}`}
          />
          {errors.name && (
            <p id="enquiry-name-error" className={ERROR_CLASS}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-contact" className={LABEL_CLASS}>
            Телефон или email <span aria-hidden className="text-signal-dark">*</span>
          </label>
          <input
            id="enquiry-contact"
            name="contact"
            type="text"
            inputMode="email"
            autoComplete="tel"
            required
            value={values.contact}
            onChange={(event) => updateField('contact', event.target.value)}
            aria-invalid={Boolean(errors.contact)}
            aria-describedby={errors.contact ? 'enquiry-contact-error' : undefined}
            className={`mt-3 ${FIELD_CLASS}`}
          />
          {errors.contact && (
            <p id="enquiry-contact-error" className={ERROR_CLASS}>
              {errors.contact}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-date" className={LABEL_CLASS}>
            Дата мероприятия
          </label>
          <input
            id="enquiry-date"
            name="eventDate"
            type="date"
            min={localTodayIso()}
            value={values.eventDate}
            onChange={(event) => updateField('eventDate', event.target.value)}
            aria-invalid={Boolean(errors.eventDate)}
            aria-describedby={errors.eventDate ? 'enquiry-date-error' : undefined}
            className={`mt-3 ${FIELD_CLASS} [color-scheme:light]`}
          />
          {errors.eventDate && (
            <p id="enquiry-date-error" className={ERROR_CLASS}>
              {errors.eventDate}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-format" className={LABEL_CLASS}>
            Формат события <span aria-hidden className="text-signal-dark">*</span>
          </label>
          <div className="relative mt-3">
            <select
              id="enquiry-format"
              name="eventFormat"
              required
              value={values.eventFormat}
              onChange={(event) => updateField('eventFormat', event.target.value)}
              aria-invalid={Boolean(errors.eventFormat)}
              aria-describedby={errors.eventFormat ? 'enquiry-format-error' : undefined}
              className={`cursor-pointer appearance-none pr-8 ${FIELD_CLASS}`}
            >
              <option value="">Выберите формат</option>
              {EVENT_FORMAT_TITLES.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              strokeWidth={1.5}
              aria-hidden
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-stone-700"
            />
          </div>
          {errors.eventFormat && (
            <p id="enquiry-format-error" className={ERROR_CLASS}>
              {errors.eventFormat}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-stone-600">Поля, отмеченные звёздочкой, обязательны.</p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex h-14 items-center justify-center gap-3 bg-ink-900 px-8 text-sm font-medium text-stone-100 transition-colors duration-200 hover:bg-slate-800 active:bg-ink-950 disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
