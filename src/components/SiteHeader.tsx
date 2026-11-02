import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import { BOOKING_HREF, NAV_ITEMS } from '@/data/content';
import useScrolled from '@/hooks/useScrolled';

export default function SiteHeader() {
  const scrolled = useScrolled(40);
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
      className={`fixed inset-x-0 top-0 z-50 text-paper transition-colors duration-500 ${
        solid ? 'border-b border-rule-dark bg-graphite/95 backdrop-blur-sm' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 lg:h-20">
        <a href="#top" onClick={closeMenu} aria-label="АРКА 123, в начало страницы" className="shrink-0">
          <BrandLogo width={120} className="lg:hidden" />
          <BrandLogo width={150} className="hidden lg:block" />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-10 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] tracking-[0.02em] text-paper/85 underline-offset-[6px] transition-colors duration-300 hover:text-paper hover:underline"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={BOOKING_HREF}
            onClick={closeMenu}
            className="group inline-flex h-9 items-center gap-2 border border-paper/60 px-4 text-[12px] tracking-[0.02em] text-paper transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink lg:h-10 lg:px-5 lg:text-[13px]"
          >
            Забронировать
            <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden className="hidden transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
          </a>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center text-paper lg:hidden"
          >
            {menuOpen ? <X size={20} strokeWidth={1.25} aria-hidden /> : <Menu size={20} strokeWidth={1.25} aria-hidden />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Мобильное меню"
          className="fixed inset-x-0 bottom-0 top-16 flex flex-col justify-between bg-graphite px-5 pb-10 pt-6 md:px-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item, index) => (
              <li key={item.href} className="border-t border-rule-dark last:border-b">
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-5 py-5 text-paper transition-colors duration-300 hover:text-mist"
                >
                  <span className="label-mono text-mist">0{index + 1}</span>
                  <span className="text-[28px] leading-none tracking-[-0.015em]">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <p className="label-mono text-mist">Минск · Мстиславца, 10</p>
            <a
              href={BOOKING_HREF}
              onClick={closeMenu}
              className="inline-flex h-14 items-center justify-center bg-paper text-[15px] text-ink transition-colors duration-300 hover:bg-ivory"
            >
              Забронировать пространство
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
