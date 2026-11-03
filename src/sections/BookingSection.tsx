import EnquiryForm from '@/components/EnquiryForm';
import VenuePhoto from '@/components/VenuePhoto';
import { SITE } from '@/data/content';
import { LOCATION_PHOTO } from '@/data/photos';

export default function BookingSection() {
  return (
    <section id="booking" aria-labelledby="booking-title" className="bg-stone-100 py-28 text-ink-900 lg:py-40">
      <div className="mx-auto grid max-w-[1440px] gap-20 px-6 lg:grid-cols-12 lg:gap-x-12 lg:px-12">
        <div className="flex flex-col lg:col-span-5">
          <p className="eyebrow text-stone-600">05 / Бронирование</p>
          <h2 id="booking-title" className="mt-6 text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.2] tracking-[-0.015em]">
            Создадим событие вместе.
          </h2>
          <p className="mt-6 text-base leading-[1.5] text-stone-700 lg:text-lg">
            Расскажите нам о вашей идее — обсудим формат и возможности пространства.
          </p>

          <div id="contacts" className="mt-16 scroll-mt-24 border-t border-stone-300 pt-8">
            <p className="eyebrow text-stone-600">Адрес</p>
            <address className="mt-4 text-lg not-italic leading-[1.5]">{SITE.address}</address>
            <p className="mt-4 text-base italic leading-[1.5] text-stone-700">{SITE.brandLine}</p>
            <VenuePhoto photo={LOCATION_PHOTO} sizes="(min-width: 1024px) 40vw, 100vw" className="mt-10" />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
