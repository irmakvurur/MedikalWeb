// app/_app.tsx
import { AppProps } from 'next/app';
import { ProductProvider } from '@/context/ProductContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
      
            <ProductProvider>
                <Component {...pageProps} />
            </ProductProvider>
      
    );
};

export default MyApp;
