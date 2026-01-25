'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <section style={{
      padding: '50px 20px',
      backgroundColor: 'var(--secondary)',
      color: 'white',
    }}>
      <div className="container" style={{ maxWidth: '500px', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(20px, 5vw, 28px)',
          marginBottom: '12px',
          letterSpacing: '0.15em',
        }}>
          ÚNETE A NOSOTROS
        </h2>
        <p style={{
          opacity: 0.8,
          marginBottom: '24px',
          fontSize: '14px',
        }}>
          Suscríbete y recibe 15% de descuento en tu primera compra
        </p>
        {isSubmitted ? (
          <div style={{
            backgroundColor: 'var(--primary)',
            padding: '16px 24px',
            display: 'inline-block',
          }}>
            <p style={{ fontSize: '13px', letterSpacing: '0.05em' }}>
              ¡Gracias! Revisa tu correo para tu código.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '400px',
              margin: '0 auto',
            }}
            className="newsletter-form"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              style={{
                padding: '14px 16px',
                backgroundColor: 'white',
                color: 'var(--secondary)',
                fontSize: '14px',
                border: 'none',
                outline: 'none',
                width: '100%',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '14px 24px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              SUSCRIBIRSE
            </button>
          </form>
        )}
      </div>

      <style jsx global>{`
        @media (min-width: 640px) {
          .newsletter-form {
            flex-direction: row !important;
          }
          .newsletter-form input {
            flex: 1;
          }
          .newsletter-form button {
            width: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
