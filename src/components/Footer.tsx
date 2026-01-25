'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--secondary)] text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4 tracking-[0.18em]">ONE LOVED BABE</h3>
            <p className="text-sm opacity-70 mb-6 leading-relaxed">
              Tu destino de moda favorito. Piezas únicas seleccionadas con amor para ti.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-white/30 flex items-center justify-center hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-colors"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-sm tracking-[0.18em] mb-4">AYUDA</h4>
            <ul className="space-y-2">
              {['Contacto', 'Envíos', 'Devoluciones', 'FAQ', 'Guía de Tallas'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-sm opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm tracking-[0.18em] mb-4">INFORMACIÓN</h4>
            <ul className="space-y-2">
              {['Sobre Nosotros', 'Términos y Condiciones', 'Política de Privacidad', 'Blog'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm opacity-70 hover:opacity-100 hover:text-[var(--primary)] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-[0.18em] mb-4">CONTACTO</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-center gap-2">
                <span>📧</span> hola@onelovedbabe.com
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +52 (55) 1234-5678
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span> Lun-Vie: 9am - 6pm
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-70">
            © 2025 One Loved Babe. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-2xl opacity-70">
            <span>💳</span>
            <span>💳</span>
            <span>💳</span>
            <span>💳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
