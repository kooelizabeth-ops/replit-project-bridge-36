import { createFileRoute } from '@tanstack/react-router';
import SitePreloader from '@/components/SitePreloader';
import SiteHeader from '@/components/SiteHeader';
import AboutSection from '@/sections/AboutSection';
import ArchitectureSection from '@/sections/ArchitectureSection';
import BookingSection from '@/sections/BookingSection';
import FormatsSection from '@/sections/FormatsSection';
import GallerySection from '@/sections/GallerySection';
import HeroSection from '@/sections/HeroSection';
import ScenariosSection from '@/sections/ScenariosSection';
import SiteFooter from '@/sections/SiteFooter';

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
      <SitePreloader />
      <a
        href="#booking"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-stone-100 focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-ink-900"
      >
        Перейти к бронированию
      </a>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ArchitectureSection />
        <GallerySection />
        <ScenariosSection />
        <FormatsSection />
        <BookingSection />
      </main>
      <SiteFooter />
    </>
  );
}
