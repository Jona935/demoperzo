'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BarChart3,
  Tags,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Productos', icon: Package },
  { href: '/admin/orders', label: 'Pedidos', icon: ShoppingCart },
  { href: '/admin/customers', label: 'Clientes', icon: Users },
  { href: '/admin/categories', label: 'Categorías', icon: Tags },
  { href: '/admin/analytics', label: 'Analíticas', icon: BarChart3 },
  { href: '/admin/settings', label: 'Configuración', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
    }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40,
            display: 'block',
          }}
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className="admin-sidebar"
        style={{
          width: '260px',
          backgroundColor: 'var(--secondary)',
          color: 'white',
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : '-260px',
          height: '100vh',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          transition: 'left 0.3s ease',
        }}
      >
        {/* Logo */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <h1 style={{
            fontSize: '18px',
            letterSpacing: '0.15em',
            margin: 0,
            fontWeight: 400,
          }}>
            ADMIN PANEL
          </h1>
          <p style={{
            fontSize: '12px',
            opacity: 0.6,
            margin: '4px 0 0 0',
          }}>
            One Loved Babe
          </p>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: '16px 0',
          overflowY: 'auto',
        }}>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 24px',
                  fontSize: '14px',
                  textDecoration: 'none',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Back to Store */}
        <div style={{
          padding: '20px 24px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}>
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={18} />
            Volver a la tienda
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className="admin-main"
        style={{
          flex: 1,
          marginLeft: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top Bar (Mobile) */}
        <div
          className="admin-topbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            backgroundColor: 'white',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sidebar-toggle"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 style={{
            fontSize: '16px',
            fontWeight: 600,
            margin: 0,
            letterSpacing: '0.1em',
          }}>
            ONE LOVED BABE
          </h2>
          <div style={{ width: '40px' }} />
        </div>

        {/* Page Content */}
        <main style={{
          flex: 1,
          padding: '24px 20px',
        }}>
          {children}
        </main>
      </div>

      {/* Responsive Styles */}
      <style jsx global>{`
        @media (min-width: 1024px) {
          .admin-sidebar {
            left: 0 !important;
          }
          .admin-main {
            margin-left: 260px !important;
          }
          .admin-topbar {
            display: none !important;
          }
          .sidebar-overlay {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
