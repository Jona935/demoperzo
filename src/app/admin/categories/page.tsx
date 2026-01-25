'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { categories, products } from '@/lib/data';

export default function CategoriesPage() {
  const getCategoryProductCount = (slug: string) => {
    return products.filter((p) => p.category === slug).length;
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 300, margin: 0 }}>Categorías</h1>
          <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 0 0', fontSize: '14px' }}>
            Organiza tus productos por categorías
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} />
          NUEVA CATEGORÍA
        </button>
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
      }}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{
              position: 'relative',
              height: '160px',
            }}>
              <Image
                src={category.image}
                alt={category.name}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '20px',
                  letterSpacing: '0.15em',
                  margin: 0,
                }}>
                  {category.name.toUpperCase()}
                </h3>
              </div>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <span style={{ fontSize: '14px', color: 'var(--muted-foreground)' }}>
                  {getCategoryProductCount(category.slug)} productos
                </span>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  backgroundColor: '#d1fae5',
                  color: '#065f46',
                }}>
                  Activa
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
