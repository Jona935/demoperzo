'use client';

import { formatPrice } from '@/lib/utils';

const customers = [
  { id: '1', name: 'María García', email: 'maria@email.com', orders: 5, totalSpent: 8495 },
  { id: '2', name: 'Ana López', email: 'ana@email.com', orders: 3, totalSpent: 4297 },
  { id: '3', name: 'Laura Martínez', email: 'laura@email.com', orders: 8, totalSpent: 15890 },
  { id: '4', name: 'Carmen Rodríguez', email: 'carmen@email.com', orders: 2, totalSpent: 2398 },
  { id: '5', name: 'Sofia Hernández', email: 'sofia@email.com', orders: 12, totalSpent: 28750 },
];

export default function CustomersPage() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, margin: 0 }}>Clientes</h1>
        <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 0 0', fontSize: '14px' }}>
          Gestiona tu base de clientes
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', margin: '0 0 4px 0' }}>Total Clientes</p>
          <p style={{ fontSize: '28px', fontWeight: 600, margin: 0 }}>{customers.length}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <p style={{ fontSize: '14px', color: 'var(--muted-foreground)', margin: '0 0 4px 0' }}>Valor Promedio</p>
          <p style={{ fontSize: '28px', fontWeight: 600, margin: 0 }}>
            {formatPrice(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length)}
          </p>
        </div>
      </div>

      {/* Customers Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {customers.map((customer) => (
          <div
            key={customer.id}
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'var(--primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 600,
              }}>
                {customer.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, margin: 0 }}>{customer.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted-foreground)', margin: '4px 0 0 0' }}>{customer.email}</p>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border)',
            }}>
              <div>
                <p style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>{customer.orders}</p>
                <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>Pedidos</p>
              </div>
              <div>
                <p style={{ fontSize: '20px', fontWeight: 600, margin: 0, color: 'var(--primary)' }}>
                  {formatPrice(customer.totalSpent)}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--muted-foreground)', margin: '2px 0 0 0' }}>Gastado</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
