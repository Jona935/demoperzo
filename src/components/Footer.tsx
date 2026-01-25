'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--secondary)',
      color: 'white',
      padding: '40px 0 24px',
    }}>
      <div className="container">
        <div className="footer-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          marginBottom: '32px',
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <h3 style={{
              fontSize: '20px',
              marginBottom: '12px',
              letterSpacing: '0.15em',
              fontWeight: 400,
            }}>
              LUXX BOUTIQUE
            </h3>
            <p style={{
              fontSize: '13px',
              opacity: 0.7,
              marginBottom: '16px',
              lineHeight: 1.6,
              maxWidth: '300px',
            }}>
              Tu destino de moda favorito. Piezas únicas seleccionadas con amor para ti.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.3s ease',
                }}
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.3s ease',
                }}
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  transition: 'all 0.3s ease',
                }}
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              marginBottom: '16px',
              fontWeight: 600,
            }}>
              AYUDA
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Contacto', 'Envíos', 'Devoluciones', 'FAQ'].map((item) => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <Link
                    href="#"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 style={{
              fontSize: '12px',
              letterSpacing: '0.15em',
              marginBottom: '16px',
              fontWeight: 600,
            }}>
              INFO
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Sobre Nosotros', 'Términos', 'Privacidad'].map((item) => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <Link
                    href="#"
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '12px', opacity: 0.6 }}>
            © 2025 Luxx Boutique. Todos los derechos reservados.
          </p>
          <div style={{ display: 'flex', gap: '8px', opacity: 0.6 }}>
            <span style={{ fontSize: '20px' }}>💳</span>
            <span style={{ fontSize: '20px' }}>💳</span>
            <span style={{ fontSize: '20px' }}>💳</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1fr !important;
          }
          .footer-grid > div:first-child {
            grid-column: span 1 !important;
          }
        }
        .footer-grid a:hover {
          color: var(--primary) !important;
          border-color: var(--primary) !important;
        }
      `}</style>
    </footer>
  );
}
