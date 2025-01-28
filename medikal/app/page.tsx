
import Head from 'next/head';
import Header from '../componenets/Header';
import Footer from '../componenets/Footer';
import ImageSlider from '@/componenets/ImageSlider';
import ProductCard from '@/componenets/ProductCard';

interface Product {
  _id: string; // MongoDB'deki ID
  name: string;
  description: string;
  image: string;
}

// Belirli ürünlerin ID'lerini tanımlayın
const productIds = [
  '6703f32dc3910b201c081c88', // 1. ürün ID
  '67054ea2209883fce5b3fe5a', // 2. ürün ID
  '670427f2b36ed8feceea6668', // 3. ürün ID

];

// Ana sayfa bileşeni
export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const allProducts: Product[] = await res.json();

  // Belirli ID'lere göre ürünleri filtreleyin
  const products = allProducts.filter(product => productIds.includes(product._id));

  return (
    <>
      <Head>
        <title>Medikal Ürün Sayfası</title>
        <meta name="description" content="Medikal ürün sayfası" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <ImageSlider />
      <main className="container mx-auto px-4 py-8">
        <h1 className="ortala">Ürünlerimiz</h1>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
