// components/ProductCard.tsx
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  _id: number;
  name: string;
  description: string;
  images: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const router = useRouter();

  const handleViewDetails = () => {
    // Ürünler sayfasına git
    router.push(`/product/${product._id}`);
  };
 
  
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 product-grid product-card ">
      <img src={product.images} alt={product.name} className="product-card " />
     
    <div className='product-info'>
      <h2 className="product-name">{product.name}</h2>
      <p className="text-gray-600">{product.description}</p>
    

      <button
          onClick={handleViewDetails}
          className="button"
        >
          İncele
        </button>
    
    </div>
    </div>
  );
}

export default ProductCard;
