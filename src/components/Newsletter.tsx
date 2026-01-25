'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos el envío
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--secondary)] text-white">
      <div className="container" style={{ maxWidth: '42rem', textAlign: 'center' }}>
        <h2 className="text-3xl md:text-4xl mb-4">ÚNETE A NUESTRA COMUNIDAD</h2>
        <p className="mb-8 opacity-80">
          Suscríbete y recibe 15% de descuento en tu primera compra
        </p>
        {isSubmitted ? (
          <div className="bg-[var(--primary)] py-4 px-6 inline-block">
            <p className="text-sm tracking-wider">
              ¡Gracias por suscribirte! Revisa tu correo para tu código de descuento.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              className="flex-1 px-4 py-3 bg-white text-[var(--secondary)] text-sm outline-none"
            />
            <button type="submit" className="btn btn-accent whitespace-nowrap">
              SUSCRIBIRSE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
