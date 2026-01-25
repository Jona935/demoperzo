'use client';

import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/lib/data';

export default function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <h2 className="text-3xl md:text-4xl text-center mb-12">
          COMPRA POR CATEGORÍA
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl md:text-2xl tracking-[0.2em] transform group-hover:scale-110 transition-transform">
                  {category.name.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
