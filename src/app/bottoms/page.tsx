'use client';

import CollectionPage from '@/components/CollectionPage';
import { products } from '@/lib/data';

export default function BottomsPage() {
  const bottoms = products.filter((p) => p.category === 'bottoms');

  return (
    <CollectionPage
      title="BOTTOMS"
      breadcrumb="Bottoms"
      products={bottoms}
    />
  );
}
