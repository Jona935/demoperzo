'use client';

import CollectionPage from '@/components/CollectionPage';
import { products } from '@/lib/data';

export default function TopsPage() {
  const tops = products.filter((p) => p.category === 'tops');

  return (
    <CollectionPage
      title="TOPS"
      breadcrumb="Tops"
      products={tops}
    />
  );
}
