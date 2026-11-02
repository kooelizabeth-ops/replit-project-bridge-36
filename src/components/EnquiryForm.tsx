import { useState, type FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { submitEnquiry } from '@/lib/enquiries';
import { COMMENT_MAX, validateEnquiry, type EnquiryErrors, type EnquiryInput } from '@/lib/enquiryValidation';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY_INPUT: EnquiryInput = { name: '', phone: '', comment: '' };

const FIELD_CLASS =
  'w-full border-b border-rule bg-transparent py-3 text-[16px] text-ink placeholder:text-ash/70 transition-colors duration-300 hover:border-ash focus:border-brand focus:outline-none aria-[invalid=true]:border-error';
const LABEL_CLASS = 'label-mono text-ash';
const ERROR_CLASS = 'mt-2 text-[14px] text-error';

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
      <div role="status" className="flex flex-col gap-6">
        <p className="label-mono text-brand">Заявка получена</p>
        <h3 className="display-sub">Спасибо. Мы свяжемся с вами, чтобы обсудить детали.</h3>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="self-start text-[14px] text-brand underline underline-offset-[6px] transition-colors duration-300 hover:text-ink"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Заявка на бронирование" className="flex flex-col gap-9">
      {status === 'error' && (
        <p role="alert" className="border-l-2 border-error pl-4 text-[14px] text-error">
          Не удалось отправить заявку. Проверьте соединение и попробуйте ещё раз.
        </p>
      )}

      <div>
        <label htmlFor="enquiry-name" className={LABEL_CLASS}>
          Ваше имя <span aria-hidden>*</span>
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
          className={`mt-2 ${FIELD_CLASS}`}
        />
        {errors.name && (
          <p id="enquiry-name-error" className={ERROR_CLASS}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="enquiry-phone" className={LABEL_CLASS}>
          Телефон <span aria-hidden>*</span>
        </label>
        <input
          id="enquiry-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+375"
          required
          value={values.phone}
          onChange={(event) => updateField('phone', event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'enquiry-phone-error' : undefined}
          className={`mt-2 ${FIELD_CLASS}`}
        />
        {errors.phone && (
          <p id="enquiry-phone-error" className={ERROR_CLASS}>
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="enquiry-comment" className={LABEL_CLASS}>
          Комментарий <span className="normal-case tracking-normal">(необязательно)</span>
        </label>
        <textarea
          id="enquiry-comment"
          name="comment"
          rows={3}
          maxLength={COMMENT_MAX}
          value={values.comment}
          onChange={(event) => updateField('comment', event.target.value)}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? 'enquiry-comment-error' : undefined}
          className={`mt-2 resize-none ${FIELD_CLASS}`}
        />
        {errors.comment && (
          <p id="enquiry-comment-error" className={ERROR_CLASS}>
            {errors.comment}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-5 pt-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[13px] text-ash">* — обязательные поля</p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group inline-flex h-14 items-center justify-center gap-3 bg-brand px-8 text-[15px] text-paper transition-colors duration-300 hover:bg-ink disabled:cursor-wait disabled:opacity-70"
        >
          {status === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
          <ArrowRight size={16} strokeWidth={1.5} aria-hidden className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
