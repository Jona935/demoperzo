'use client';

import CollectionPage from '@/components/CollectionPage';
import { products } from '@/lib/data';

export default function SalePage() {
  const saleProducts = products.filter((p) => p.badge === 'sale' || p.originalPrice);

  return (
    <CollectionPage
      title="SALE"
      breadcrumb="Sale"
      products={saleProducts}
    />
  );
}
