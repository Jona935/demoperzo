'use client';

import { TrendingUp, Users, Eye, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const metrics = [
  { label: 'Visitas Totales', value: '12,847', icon: Eye, trend: '+18.2%' },
  { label: 'Usuarios Únicos', value: '8,234', icon: Users, trend: '+12.5%' },
  { label: 'Tasa de Conversión', value: '3.24%', icon: TrendingUp, trend: '+0.8%' },
  { label: 'Carrito Abandonado', value: '24.5%', icon: ShoppingCart, trend: '-2.1%' },
];

const topProducts = [
  { name: 'Vestido Midi Negro', sales: 45, revenue: 67455 },
  { name: 'Jeans Mom Fit', sales: 38, revenue: 45562 },
  { name: 'Pantalón Wide Leg', sales: 32, revenue: 31968 },
  { name: 'Blusa Elegante Satín', sales: 28, revenue: 22372 },
  { name: 'Vestido Floral Primavera', sales: 25, revenue: 32475 },
];

export default function AnalyticsPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, margin: 0 }}>Analíticas</h1>
        <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 0 0', fontSize: '14px' }}>
          Métricas y rendimiento de tu tienda
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.trend.startsWith('+') || metric.trend.startsWith('-2');
          return (
            <div
              key={metric.label}
              style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: 'rgba(187, 142, 142, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={22} style={{ color: 'var(--primary)' }} />
                </div>
                <span style={{
                  fontSize: '13px',
                  color: isPositive ? '#059669' : '#dc2626',
                  fontWeight: 500,
                }}>
                  {metric.trend}
                </span>
              </div>
              <p style={{ fontSize: '24px', fontWeight: 600, margin: '0 0 4px 0' }}>{metric.value}</p>
              <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', margin: 0 }}>{metric.label}</p>
            </div>
          );
        })}
      </div>

      {/* Top Products */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 400, margin: 0 }}>Productos Más Vendidos</h2>
        </div>
        <div>
          {topProducts.map((product, index) => (
            <div
              key={product.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: index < topProducts.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: 'rgba(187, 142, 142, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--primary)',
                }}>
                  {index + 1}
                </span>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{product.name}</p>
                  <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>
                    {product.sales} ventas
                  </p>
                </div>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--primary)' }}>
                {formatPrice(product.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
