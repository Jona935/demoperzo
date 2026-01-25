import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import ProductGrid from '@/components/ProductGrid';
import Instagram from '@/components/Instagram';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Categories />
      <ProductGrid title="NUEVAS LLEGADAS" limit={8} showLoadMore />
      <ProductGrid title="MÁS VENDIDOS" filter="bestseller" limit={4} />
      <Instagram />
      <Newsletter />
      <Footer />
    </main>
  );
}
