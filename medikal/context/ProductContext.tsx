import { createContext, useState, ReactNode } from 'react';

interface Product {
  id: number;
  name: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
