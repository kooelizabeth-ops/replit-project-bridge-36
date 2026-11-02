import BrandLogo from '@/components/BrandLogo';
import { BOOKING_HREF, NAV_ITEMS, SITE } from '@/data/content';

export default function SiteFooter() {
  return (
    <footer className="bg-ink-950 text-stone-200">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <BrandLogo width={240} />
            <p className="max-w-[320px] text-base leading-[1.5] text-stone-300">{SITE.brandLine}</p>
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow text-stone-400">Адрес</p>
            <p className="mt-5 text-base leading-[1.5]">{SITE.address}</p>
            <p className="mt-3 text-base leading-[1.5] text-stone-300">{SITE.area}</p>
          </div>

          <nav aria-label="Футер" className="lg:col-span-3 lg:col-start-10">
            <p className="eyebrow text-stone-400">Навигация</p>
            <ul className="mt-5 flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-base text-stone-200 transition-colors duration-200 hover:text-stone-50 hover:underline hover:underline-offset-4">
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={BOOKING_HREF} className="text-base font-medium text-stone-50 underline underline-offset-4 transition-colors duration-200 hover:text-stone-300">
                  Забронировать
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 border-t border-ink-700 pt-8">
          <p className="text-sm text-stone-400">
            © {new Date().getFullYear()} {SITE.name}. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
