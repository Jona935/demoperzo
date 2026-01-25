'use client';

import CollectionPage from '@/components/CollectionPage';
import { products } from '@/lib/data';

export default function AccesoriosPage() {
  const accesorios = products.filter((p) => p.category === 'accesorios');

  return (
    <CollectionPage
      title="ACCESORIOS"
      breadcrumb="Accesorios"
      products={accesorios}
    />
  );
}
