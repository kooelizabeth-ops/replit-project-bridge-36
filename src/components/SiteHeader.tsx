import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { BOOKING_HREF, NAV_ITEMS } from '@/data/content';
import { HEADER_LOGO_VAR } from '@/hooks/useHeroVideoScrub';
import useScrolled from '@/hooks/useScrolled';

export default function SiteHeader() {
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'border-b border-ink-700 bg-ink-900/95 backdrop-blur-sm' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-6 lg:h-24 lg:px-12">
        <a href="#top" onClick={closeMenu} aria-label="АРКА 123, в начало страницы" className="logo-hover shrink-0">
          {/* Hidden while the hero's centred logo is on screen; the hero scroll loop drives the variable. */}
          <span className="block" style={{ opacity: menuOpen ? 1 : `var(${HEADER_LOGO_VAR}, 1)` }}>
            <BrandLogo width={146} className="lg:hidden" />
            <BrandLogo width={220} className="hidden lg:block" />
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-6 xl:gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium nav-link text-on-media transition-opacity duration-200 hover:opacity-80"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={BOOKING_HREF}
            onClick={closeMenu}
            className="group inline-flex h-10 items-center gap-2 border border-stone-100/80 px-4 text-xs font-medium text-stone-100 transition-colors duration-200 hover:border-stone-100 hover:bg-stone-100 hover:text-ink-900 active:bg-stone-200 lg:h-11 lg:px-5 lg:text-sm"
          >
            Забронировать
            <ArrowUpRight size={16} strokeWidth={1.5} aria-hidden className="hidden transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 lg:block" />
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center text-stone-100 transition-colors duration-200 hover:text-stone-300 lg:hidden"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} aria-hidden /> : <Menu size={22} strokeWidth={1.5} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Мобильное меню"
          className="fixed inset-x-0 bottom-0 top-20 flex flex-col justify-between bg-ink-900 px-6 pb-10 pt-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href} className="border-t border-ink-700 last:border-b">
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between py-5 font-medium text-stone-100 transition-colors duration-200 hover:text-stone-300"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-xs tabular-nums text-stone-500">0{index + 1}</span>
                    <span className="text-2xl">{item.label}</span>
                  </span>
                  <ArrowRight size={18} strokeWidth={1.5} aria-hidden className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
          <a
            href={BOOKING_HREF}
            onClick={closeMenu}
            className="inline-flex h-14 items-center justify-center bg-stone-100 text-base font-medium text-ink-900 transition-colors duration-200 hover:bg-stone-200"
          >
            Забронировать
          </a>
        </nav>
      )}
    </header>
  );
}
