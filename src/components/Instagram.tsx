'use client';

import Image from 'next/image';
import { Instagram as InstagramIcon } from 'lucide-react';

const instagramImages = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
  'https://images.unsplash.com/photo-1485968579169-a6e9dc7ccd5e?w=400',
  'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=400',
];

export default function Instagram() {
  return (
    <section className="py-16 md:py-24 bg-[var(--muted)]">
      <div className="container">
        <h2 className="text-3xl md:text-4xl text-center mb-4">@ONELOVEDBABE</h2>
        <p className="text-center text-[var(--muted-foreground)] mb-12">
          Síguenos en Instagram y comparte tu estilo
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
          {instagramImages.map((image, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={image}
                alt={`Instagram ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <InstagramIcon
                  size={32}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
