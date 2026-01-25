'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, User, ShoppingBag, Settings, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import Cart from './Cart';

const navLinks = [
  { href: '/nuevos', label: 'NUEVOS' },
  { href: '/vestidos', label: 'VESTIDOS' },
  { href: '/tops', label: 'TOPS' },
  { href: '/bottoms', label: 'BOTTOMS' },
  { href: '/accesorios', label: 'ACCESORIOS' },
  { href: '/sale', label: 'SALE', highlight: true },
];

const currencies = [
  { code: 'MXN', symbol: '$', label: 'MXN $' },
  { code: 'USD', symbol: '$', label: 'USD $' },
  { code: 'EUR', symbol: '€', label: 'EUR €' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const { toggleCart, getItemCount } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconBtnStyle: React.CSSProperties = {
    padding: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.3s ease',
  };

  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        backgroundColor: 'var(--primary)',
        color: 'white',
        textAlign: 'center',
        padding: '10px 16px',
        fontSize: '11px',
        letterSpacing: '0.05em'
      }}>
        <p style={{ margin: 0 }}>ENVÍO GRATIS en pedidos mayores a $999 MXN | Usa código: BABE10 para 10% de descuento</p>
      </div>

      {/* Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'white',
        boxShadow: isScrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'box-shadow 0.3s ease'
      }}>
        {/* Top Row: Logo + Icons */}
        <div style={{
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            {/* Left: Currency Selector (Desktop) / Menu Button (Mobile) */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              {/* Mobile Menu Button */}
              <button
                className="mobile-only"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ ...iconBtnStyle, display: 'none' }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Currency Selector */}
              <div
                className="desktop-only"
                style={{ position: 'relative', display: 'none' }}
              >
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 12px',
                    background: 'none',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: 'var(--secondary)',
                  }}
                >
                  {selectedCurrency.label}
                  <ChevronDown size={14} />
                </button>
                {showCurrencyDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    backgroundColor: 'white',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    minWidth: '100px',
                  }}>
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setShowCurrencyDropdown(false);
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 16px',
                          background: selectedCurrency.code === currency.code ? 'var(--muted)' : 'none',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: 'var(--secondary)',
                        }}
                      >
                        {currency.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Center: Logo */}
            <Link href="/" style={{
              textDecoration: 'none',
              color: 'var(--secondary)',
            }}>
              <h1 style={{
                fontSize: 'clamp(20px, 5vw, 32px)',
                letterSpacing: '0.2em',
                margin: 0,
                fontWeight: 400,
                whiteSpace: 'nowrap',
              }}>
                LUXX boutique
              </h1>
            </Link>

            {/* Right: Icons */}
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '4px',
            }}>
              {/* Currency for mobile */}
              <div
                className="mobile-only"
                style={{ position: 'relative', display: 'none', marginRight: '8px' }}
              >
                <button
                  onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                    padding: '6px 8px',
                    background: 'none',
                    border: '1px solid var(--border)',
                    cursor: 'pointer',
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'var(--secondary)',
                  }}
                >
                  {selectedCurrency.code}
                  <ChevronDown size={12} />
                </button>
                {showCurrencyDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '4px',
                    backgroundColor: 'white',
                    border: '1px solid var(--border)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    zIndex: 100,
                  }}>
                    {currencies.map((currency) => (
                      <button
                        key={currency.code}
                        onClick={() => {
                          setSelectedCurrency(currency);
                          setShowCurrencyDropdown(false);
                        }}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '10px 16px',
                          background: selectedCurrency.code === currency.code ? 'var(--muted)' : 'none',
                          border: 'none',
                          textAlign: 'left',
                          cursor: 'pointer',
                          fontSize: '11px',
                          color: 'var(--secondary)',
                        }}
                      >
                        {currency.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button style={iconBtnStyle} className="icon-hover desktop-only">
                <Search size={20} />
              </button>
              <button style={iconBtnStyle} className="icon-hover desktop-only">
                <User size={20} />
              </button>
              <button
                onClick={toggleCart}
                style={{ ...iconBtnStyle, position: 'relative' }}
                className="icon-hover"
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    fontSize: '9px',
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                  }}>
                    {itemCount}
                  </span>
                )}
              </button>
              <Link href="/admin" style={iconBtnStyle} className="icon-hover" title="Panel Admin">
                <Settings size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Row: Navigation (Desktop) */}
        <nav className="desktop-nav" style={{
          display: 'none',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 20px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
            padding: '14px 0',
          }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link-hover"
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textDecoration: 'none',
                  color: link.highlight ? 'var(--primary)' : 'var(--secondary)',
                  transition: 'color 0.3s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={{
            backgroundColor: 'white',
            borderTop: '1px solid var(--border)',
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            width: '100%',
            maxWidth: '100vw',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 100,
            overflow: 'hidden',
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: '16px 20px',
                    fontSize: '13px',
                    letterSpacing: '0.15em',
                    textDecoration: 'none',
                    color: link.highlight ? 'var(--primary)' : 'var(--secondary)',
                    borderBottom: '1px solid var(--border)',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Cart Sidebar */}
      <Cart />

      {/* Responsive Styles */}
      <style jsx global>{`
        .mobile-only {
          display: flex !important;
        }
        .desktop-only {
          display: none !important;
        }
        .desktop-nav {
          display: none !important;
        }

        @media (min-width: 768px) {
          .mobile-only {
            display: none !important;
          }
          .desktop-only {
            display: flex !important;
          }
          .desktop-nav {
            display: block !important;
          }
        }

        .nav-link-hover:hover {
          color: var(--primary) !important;
        }

        .icon-hover:hover {
          color: var(--primary) !important;
        }
      `}</style>
    </>
  );
}
