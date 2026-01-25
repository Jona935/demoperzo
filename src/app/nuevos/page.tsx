'use client';

import CollectionPage from '@/components/CollectionPage';
import { products } from '@/lib/data';

export default function NuevosPage() {
  const newProducts = products.filter((p) => p.badge === 'new');
  // Si no hay productos nuevos, mostrar los primeros 8
  const displayProducts = newProducts.length > 0 ? newProducts : products.slice(0, 8);

  return (
    <CollectionPage
      title="NUEVOS INGRESOS"
      breadcrumb="Nuevos"
      products={displayProducts}
    />
  );
}
