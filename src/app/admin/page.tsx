'use client';

import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { dashboardStats, orders } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/utils';

const stats = [
  {
    label: 'Ventas Totales',
    value: formatPrice(dashboardStats.totalSales),
    icon: DollarSign,
    trend: '+12.5%',
    trendUp: true,
  },
  {
    label: 'Pedidos',
    value: dashboardStats.totalOrders.toString(),
    icon: ShoppingCart,
    trend: '+8.2%',
    trendUp: true,
  },
  {
    label: 'Productos',
    value: dashboardStats.totalProducts.toString(),
    icon: Package,
    trend: '+2',
    trendUp: true,
  },
  {
    label: 'Clientes',
    value: dashboardStats.totalCustomers.toString(),
    icon: Users,
    trend: '+15.3%',
    trendUp: true,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return { bg: '#fef3c7', color: '#92400e' };
    case 'processing': return { bg: '#dbeafe', color: '#1e40af' };
    case 'shipped': return { bg: '#e9d5ff', color: '#6b21a8' };
    case 'delivered': return { bg: '#d1fae5', color: '#065f46' };
    case 'cancelled': return { bg: '#fee2e2', color: '#991b1b' };
    default: return { bg: '#f3f4f6', color: '#374151' };
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'Pendiente';
    case 'processing': return 'Procesando';
    case 'shipped': return 'Enviado';
    case 'delivered': return 'Entregado';
    case 'cancelled': return 'Cancelado';
    default: return status;
  }
};

export default function AdminDashboard() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 300,
          letterSpacing: '0.05em',
          margin: 0,
        }}>
          Dashboard
        </h1>
        <p style={{
          color: 'var(--muted-foreground)',
          margin: '8px 0 0 0',
          fontSize: '14px',
        }}>
          Bienvenido al panel de administración
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: 'rgba(187, 142, 142, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={24} style={{ color: 'var(--primary)' }} />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '14px',
                  color: stat.trendUp ? '#059669' : '#dc2626',
                }}>
                  {stat.trendUp ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {stat.trend}
                </div>
              </div>
              <p style={{
                fontSize: '28px',
                fontWeight: 600,
                margin: '0 0 4px 0',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '14px',
                color: 'var(--muted-foreground)',
                margin: 0,
              }}>
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: 400,
            letterSpacing: '0.05em',
            margin: 0,
          }}>
            Pedidos Recientes
          </h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '600px',
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--muted-foreground)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  ID Pedido
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--muted-foreground)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Cliente
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--muted-foreground)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Fecha
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--muted-foreground)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Total
                </th>
                <th style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--muted-foreground)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500 }}>
                      {order.id}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>
                        {order.customer}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>
                        {order.email}
                      </p>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>
                      {formatDate(order.date)}
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600 }}>
                      {formatPrice(order.total)}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 500,
                        backgroundColor: statusStyle.bg,
                        color: statusStyle.color,
                      }}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
