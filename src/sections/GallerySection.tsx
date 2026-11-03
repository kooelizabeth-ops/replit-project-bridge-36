import VenuePhoto from '@/components/VenuePhoto';
import { GALLERY_PHOTOS } from '@/data/photos';

export default function GallerySection() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-stone-100 py-28 text-ink-900 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-[720px]">
          <p className="eyebrow text-stone-600">03 / Галерея</p>
          <h2 id="gallery-title" className="mt-6 text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.2] tracking-[-0.015em]">
            Пространство в деталях.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-12 lg:mt-24 lg:gap-x-8 lg:gap-y-16">
          {GALLERY_PHOTOS.map((photo) => (
            <VenuePhoto
              key={photo.src}
              photo={photo}
              sizes="(min-width: 1024px) 60vw, (min-width: 768px) 50vw, 100vw"
              className={photo.className}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
