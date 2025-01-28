import React, { useState, useEffect } from 'react';
import Sidebar from '@/componenets/SideBar'; 
import ProductCard from '@/componenets/ProductCard';
import Header from '@/componenets/Header'; 
import '../app/globals.css';

interface Product {
  _id: string;
  name: string;
  description: string;
  images: string[]; // Resimlerin bir dizi olduğunu belirtelim
  category: string;
}

const ProductPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Seçilen kategori
  const [products, setProducts] = useState<Product[]>([]); // Ürünler
  const [categories, setCategories] = useState<string[]>([]); // Kategoriler
  const [loading, setLoading] = useState<boolean>(true);

  // Kategorileri API'den çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Kategorileri çekerken hata:', error);
      }
    };

    fetchCategories();
  }, []);

  // Ürünleri API'den çek
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${selectedCategory}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Ürünleri çekerken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // Kategori değişince yeniden yükle

  // Ürünlerin resimlerini ayarla
  const productsWithImages = products.map((product) => ({
    ...product,
    image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png', // İlk resmi al, yoksa varsayılan resim
  }));

  return (
    <div>
      {/* Header her zaman en üstte olacak */}
      <Header />

      {/* Main content (Sidebar ve ürünler) */}
      <div className="flex">
        {/* Sidebar sol tarafta */}
        <Sidebar categories={categories} onSelectCategory={setSelectedCategory} /> {/* Kategori seçimi */}

        {/* Product List sağda */}
        <main className="w-3/4 p-4">
          <h1 className="custom-heading">Ürünler</h1>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {productsWithImages.length > 0 ? (
                productsWithImages.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p>Bu kategoriye ait ürün bulunamadı.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
