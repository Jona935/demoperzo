'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    outline: 'none',
    fontSize: '14px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '8px',
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 300, margin: 0 }}>Configuración</h1>
          <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 0 0', fontSize: '14px' }}>
            Personaliza tu tienda
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Save size={18} />
          {saved ? '¡GUARDADO!' : 'GUARDAR CAMBIOS'}
        </button>
      </div>

      {/* Store Info */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid var(--border)',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 400, margin: '0 0 20px 0' }}>
          Información de la Tienda
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          <div>
            <label style={labelStyle}>Nombre de la tienda</label>
            <input type="text" defaultValue="One Loved Babe" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email de contacto</label>
            <input type="email" defaultValue="hola@onelovedbabe.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Teléfono</label>
            <input type="tel" defaultValue="+52 (55) 1234-5678" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Moneda</label>
            <select style={inputStyle}>
              <option value="MXN">MXN - Peso Mexicano</option>
              <option value="USD">USD - Dólar Americano</option>
              <option value="EUR">EUR - Euro</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid var(--border)',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 400, margin: '0 0 20px 0' }}>
          Envíos
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          <div>
            <label style={labelStyle}>Monto mínimo para envío gratis</label>
            <input type="number" defaultValue="999" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Costo de envío estándar</label>
            <input type="number" defaultValue="99" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '24px',
        border: '1px solid var(--border)',
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 400, margin: '0 0 20px 0' }}>
          Apariencia
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}>
          <div>
            <label style={labelStyle}>Color primario</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="color"
                defaultValue="#bb8e8e"
                style={{ width: '48px', height: '48px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}
              />
              <input type="text" defaultValue="#bb8e8e" style={{ ...inputStyle, flex: 1 }} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Color secundario</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <input
                type="color"
                defaultValue="#1c1c1c"
                style={{ width: '48px', height: '48px', border: '1px solid var(--border)', borderRadius: '6px', cursor: 'pointer' }}
              />
              <input type="text" defaultValue="#1c1c1c" style={{ ...inputStyle, flex: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
