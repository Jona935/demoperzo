'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { orders } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/utils';

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

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((order) =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, margin: 0 }}>Pedidos</h1>
        <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 0 0', fontSize: '14px' }}>
          Gestiona todos los pedidos de tu tienda
        </p>
      </div>

      {/* Search */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px',
        border: '1px solid var(--border)',
      }}>
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted-foreground)',
          }} />
          <input
            type="text"
            placeholder="Buscar por ID o cliente..."
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

      {/* Orders Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  ID Pedido
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Cliente
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Fecha
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Total
                </th>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const statusStyle = getStatusColor(order.status);
                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: 500 }}>
                      {order.id}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <p style={{ fontSize: '14px', fontWeight: 500, margin: 0 }}>{order.customer}</p>
                      <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>{order.email}</p>
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
