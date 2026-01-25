'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 style={{ fontSize: '28px', fontWeight: 300, margin: 0 }}>Productos</h1>
          <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 0 0', fontSize: '14px' }}>
            Administra tu catálogo de productos
          </p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} />
          AGREGAR PRODUCTO
        </button>
      </div>

      {/* Search */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px',
        border: '1px solid var(--border)',
      }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted-foreground)',
          }} />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 10px 10px 40px',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              outline: 'none',
              fontSize: '14px',
            }}
          />
        </div>
      </div>

      {/* Products Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Producto
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Categoría
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Precio
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Stock
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        position: 'relative',
                        width: '50px',
                        height: '50px',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        backgroundColor: 'var(--muted)',
                      }}>
                        <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{product.name}</p>
                        <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', textTransform: 'capitalize' }}>
                    {product.category}
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 600 }}>
                    {formatPrice(product.price)}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: product.stock > 10 ? '#d1fae5' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                      color: product.stock > 10 ? '#065f46' : product.stock > 0 ? '#92400e' : '#991b1b',
                    }}>
                      {product.stock} unidades
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        padding: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '4px',
                      }}>
                        <Edit size={16} />
                      </button>
                      <button style={{
                        padding: '8px',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#dc2626',
                        borderRadius: '4px',
                      }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
