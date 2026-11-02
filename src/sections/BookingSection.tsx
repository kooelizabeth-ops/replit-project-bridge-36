import EnquiryForm from '@/components/EnquiryForm';
import VenuePhoto from '@/components/VenuePhoto';
import { LOCATION_PHOTO } from '@/data/photos';

export default function BookingSection() {
  return (
    <section id="booking" aria-labelledby="booking-title" className="section-y bg-ivory text-ink">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-x-10">
        <div className="flex flex-col lg:col-span-5">
          <p className="label-mono text-brand">05 — Бронирование</p>
          <h2 id="booking-title" className="display-section mt-6 max-w-[12ch]">
            Пространство в деталях.
          </h2>
          <p className="mt-6 max-w-[36ch] text-[16px] leading-[1.6] text-ash lg:text-[17px]">
            Оставьте заявку, и мы поможем организовать ваше мероприятие в АРКА 123.
          </p>
          <figure className="mt-12 hidden lg:block">
            <VenuePhoto photo={LOCATION_PHOTO} sizes="40vw" />
            <figcaption className="mt-4 text-[13px] text-ash">Мстиславца, 10 — напротив Национальной библиотеки</figcaption>
          </figure>
        </div>

        <div className="border-t border-brand bg-paper p-6 md:p-10 lg:col-span-6 lg:col-start-7 lg:self-start lg:p-12">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
