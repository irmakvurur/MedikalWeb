import { useRouter } from 'next/router';
import ProductDetails from '../ProductDetails';

const ProductId: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return <p>Yükleniyor...</p>;
  }

  console.log('ID:', id); // ID'yi kontrol edin

  if (typeof id !== 'string') {
    console.error('Geçersiz ID:', id);
    return <p>Geçersiz ID</p>;
  }

  return (
    <div>
      <ProductDetails id={id} />
    </div>
  );
};

export default ProductId;
