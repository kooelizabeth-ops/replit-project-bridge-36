import { createFileRoute } from '@tanstack/react-router';
import SiteHeader from '@/components/SiteHeader';
import ArchitectureSection from '@/sections/ArchitectureSection';
import BookingSection from '@/sections/BookingSection';
import FormatsSection from '@/sections/FormatsSection';
import HeroSection from '@/sections/HeroSection';
import SiteFooter from '@/sections/SiteFooter';
import SpaceSection from '@/sections/SpaceSection';
import StatementSection from '@/sections/StatementSection';

const TITLE = 'АРКА 123 — пространство для встреч и событий в Минске';
const DESCRIPTION =
  'АРКА 123 — пространство для встреч и событий в Минске: 123 м² напротив Библиотеки, ул. Мстиславца, 10. Деловые встречи, презентации и частные события.';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#booking"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-paper focus:px-4 focus:py-3 focus:text-sm focus:text-ink"
      >
        Перейти к бронированию
      </a>
      <SiteHeader />
      <main>
        <HeroSection />
        <StatementSection />
        <SpaceSection />
        <FormatsSection />
        <ArchitectureSection />
        <BookingSection />
      </main>
      <SiteFooter />
    </>
  );
}
