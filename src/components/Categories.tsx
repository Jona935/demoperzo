'use client';

import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { name: 'Vestidos', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600', slug: 'vestidos' },
  { name: 'Tops', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600', slug: 'tops' },
  { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600', slug: 'bottoms' },
  { name: 'Accesorios', image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=600', slug: 'accesorios' },
];

export default function Categories() {
  return (
    <section style={{ padding: '40px 0' }}>
      <div className="container">
        <h2 style={{
          fontSize: 'clamp(20px, 5vw, 28px)',
          textAlign: 'center',
          marginBottom: '24px',
          letterSpacing: '0.15em',
        }}>
          COMPRA POR CATEGORÍA
        </h2>
        <div className="categories-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              style={{
                position: 'relative',
                aspectRatio: '3/4',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.25)',
                transition: 'background-color 0.3s ease',
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: 'clamp(14px, 4vw, 20px)',
                  letterSpacing: '0.15em',
                  fontWeight: 400,
                }}>
                  {category.name.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .categories-grid a:hover img {
          transform: scale(1.05);
        }
        .categories-grid a:hover > div:first-of-type {
          background-color: rgba(0,0,0,0.35) !important;
        }
        @media (min-width: 768px) {
          .categories-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
}
