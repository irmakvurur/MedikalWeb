import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Header from '@/componenets/Header';
import '../app/globals.css';

interface ProductDetailsProps {
  id: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ id }) => {
  const [mainImage, setMainImage] = useState<string>('');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/${id}`); // API çağrısı
        if (!response.ok) {
          throw new Error('Ağ hatası');
        }
        const data = await response.json();
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]); // İlk resmi büyük resim olarak ayarla
        }
      } catch (error) {
        console.error('Ürün bilgileri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!product) return <p>Ürün bulunamadı</p>;

  const handleImageClick = (image: string) => {
    setMainImage(image); // Tıklanan resmi büyük resim olarak ayarla
  };

  return (
    <div>
      <Header />
      <div className="düzen"> 
        <div className="fimage-container"> 
          <Image
            src={mainImage || '/placeholder.png'} // Eğer mainImage yoksa varsayılan resim
            alt={product.name}
            width={400}
            height={250}
            className="image"
          />
          <div className="thumbnail-container"> 
            {product.images && product.images.map((image: string, index: number) => (
              <Image
                key={index}
                src={image}
                alt={`Ürün resmi ${index + 1}`}
                width={100}
                height={100}
                className="thumbnail"
                onClick={() => handleImageClick(image)} // Resme tıklandığında handleImageClick çağrılır
              />
            ))}
          </div>
        </div>
        <div className="details-container"> 
          <h2 className="name-product">{product.name}</h2> 
          <div className="description-container">
            <p className="description">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
