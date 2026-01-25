'use client';

import CollectionPage from '@/components/CollectionPage';
import { products } from '@/lib/data';

export default function VestidosPage() {
  const vestidos = products.filter((p) => p.category === 'vestidos');

  return (
    <CollectionPage
      title="VESTIDOS"
      breadcrumb="Vestidos"
      products={vestidos}
    />
  );
}
