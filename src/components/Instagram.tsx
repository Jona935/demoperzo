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
    <section style={{
      padding: '40px 0',
      backgroundColor: 'var(--muted)',
    }}>
      <div className="container">
        <h2 style={{
          fontSize: 'clamp(18px, 5vw, 24px)',
          textAlign: 'center',
          marginBottom: '8px',
          letterSpacing: '0.15em',
        }}>
          @LUXXBOUTIQUE
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--muted-foreground)',
          marginBottom: '24px',
          fontSize: '13px',
        }}>
          Síguenos en Instagram
        </p>
        <div className="instagram-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '4px',
        }}>
          {instagramImages.map((image, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-item"
              style={{
                position: 'relative',
                aspectRatio: '1',
                overflow: 'hidden',
                display: 'block',
              }}
            >
              <Image
                src={image}
                alt={`Instagram ${index + 1}`}
                fill
                style={{
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                sizes="(max-width: 640px) 33vw, 16vw"
              />
              <div className="instagram-overlay" style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.3s ease',
              }}>
                <InstagramIcon
                  size={24}
                  style={{ color: 'white', opacity: 0, transition: 'opacity 0.3s ease' }}
                  className="instagram-icon"
                />
              </div>
            </a>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }
        @media (min-width: 640px) {
          .instagram-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 8px;
          }
        }
        .instagram-item:hover img {
          transform: scale(1.1);
        }
        .instagram-item:hover .instagram-overlay {
          background-color: rgba(0,0,0,0.4) !important;
        }
        .instagram-item:hover .instagram-icon {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
