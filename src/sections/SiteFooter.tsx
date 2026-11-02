import BrandLogo from '@/components/BrandLogo';
import { BOOKING_HREF, EVENT_FORMATS, NAV_ITEMS, SITE } from '@/data/content';

export default function SiteFooter() {
  return (
    <footer id="contacts" className="bg-graphite text-paper">
      <div className="shell py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10">
          <div className="flex flex-col gap-6 lg:col-span-4">
            <BrandLogo width={200} />
            <p className="max-w-[28ch] text-[16px] leading-[1.5] text-mist">{SITE.brandLine}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="label-mono text-mist">Адрес</p>
            <address className="mt-5 text-[16px] not-italic leading-[1.5]">{SITE.address}</address>
            <p className="mt-2 text-[15px] text-mist">{SITE.area}</p>
            <a
              href={BOOKING_HREF}
              className="mt-6 inline-block text-[15px] text-paper underline decoration-rule-dark underline-offset-[6px] transition-colors duration-300 hover:decoration-paper"
            >
              Оставить заявку
            </a>
          </div>

          <div className="lg:col-span-3">
            <p className="label-mono text-mist">Форматы</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-[15px] leading-[1.4]">
              {EVENT_FORMATS.map((format) => (
                <li key={format.id}>{format.title}</li>
              ))}
            </ul>
          </div>

          <nav aria-label="Футер" className="lg:col-span-2">
            <p className="label-mono text-mist">Навигация</p>
            <ul className="mt-5 flex flex-col gap-2.5 text-[15px]">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-paper/85 transition-colors duration-300 hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-rule-dark pt-8 md:flex-row md:justify-between">
          <p className="text-[13px] text-mist">
            © {new Date().getFullYear()} {SITE.name}. Все права защищены.
          </p>
          <p className="label-mono text-mist">{SITE.locationMarker}</p>
        </div>
      </div>
    </footer>
  );
}
