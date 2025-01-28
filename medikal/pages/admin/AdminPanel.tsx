import { useEffect, useState } from 'react';
import Link from 'next/link';
import Modal from '../../models/Modal'; 
import { useRouter } from 'next/router';
import styles from './admin.module.css';


interface Product {
    _id: string;
    name: string;
    description: string;
    category: string;
    images: string[]; // Tek resim yerine birden fazla resim olacak
}

const AdminPanel = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id: string) => {
        await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
        setProducts(products.filter(product => product._id !== id));
    };

    const openModal = (product: Product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    const updateProduct = async (e: React.FormEvent, productId: string) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const updatedProduct = {
            name: formData.get('name'),
            description: formData.get('description'),
            category: formData.get('category'),
            images: [
                formData.get('image1'),
                formData.get('image2'),
                formData.get('image3'),
            ].filter(Boolean), // Boş olanları filtrele
        };

        // Veritabanına güncelleme isteği gönderme
        const response = await fetch(`/api/products?id=${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });

        if (!response.ok) {
            console.error('Ürün güncellenemedi:', response.statusText);
            return;
        }

        const newProduct = await response.json(); // Güncellenmiş ürünü al

        // Güncellenmiş ürünü listeden bul ve güncelle
        setProducts(products.map(product => product._id === productId ? newProduct : product));
        closeModal();
    };

    return (
        <div className={styles.container}>
            <h1>Admin Panel</h1>
            <Link href="/admin/add-product">
                <button className={styles.button}>Ürün Ekle</button>
            </Link>
            <ul className={styles.productlist}>
                {products.map(product => (
                    <li key={product._id} className={styles.productitem}>
                        <div className={styles.productimage}>
                            <img src={product.images[0]} alt={product.name} />
                        </div>
                        <div className={styles.productinfo}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <span className={styles.productcategory}>Kategori: {product.category}</span>
                        </div>
                        <div className={styles.productactions}>
                            <button className={styles.button} onClick={() => deleteProduct(product._id)}>Sil</button>
                            <button className={styles.button} onClick={() => openModal(product)}>Düzenle</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Modal Bileşeni */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Ürünü Düzenle">
                {currentProduct && (
                    <form onSubmit={(e) => updateProduct(e, currentProduct._id)}>
                        <div className={styles.inputGroup}>
                            <label>Ad:</label>
                            <input type="text" name="name" defaultValue={currentProduct.name} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Açıklama:</label>
                            <input type="text" name="description" defaultValue={currentProduct.description} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Kategori:</label>
                            <input type="text" name="category" defaultValue={currentProduct.category} required />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Resim 1 URL:</label>
                            <input type="text" name="image1" defaultValue={currentProduct?.images?.[0] || ''}  />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Resim 2 URL:</label>
                            <input type="text" name="image2" defaultValue={currentProduct?.images?.[1] || ''} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label>Resim 3 URL:</label>
                            <input type="text" name="image3" defaultValue={currentProduct?.images?.[2] || ''} />
                        </div>
                        <button type="submit" className={styles.button}>Güncelle</button>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default AdminPanel;
