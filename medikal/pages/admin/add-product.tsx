import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './admin.module.css';

const AddProduct = () => {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        description: '',
        category: '',
        images: Array(3).fill(''), // Başlangıçta 3 boş dizi
    });

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        if (name.startsWith('image')) {
            // Resim alanı ise diziye ekle
            const index = parseInt(name.slice(-1)) - 1; // image1, image2 şeklinde olduğu için son karakterden index al
            const newImages = [...form.images];

            // Eğer index dizinin sınırları içindeyse güncelle
            if (index >= 0 && index < newImages.length) {
                newImages[index] = value; // ilgili index'teki değeri güncelle
            }
            
            setForm({ ...form, images: newImages }); // yeni images dizisi ile formu güncelle
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Boş olanları filtrele
        const productData = {
            name: form.name,
            description: form.description,
            category: form.category,
            images: form.images.filter(image => image !== ''), // yalnızca dolu resimleri gönder
        };
        console.log('Submitting Product Data:', productData); 
        
        await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });
        router.push('/admin');
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <input type="text" name="name" placeholder="Ürün Adı" onChange={handleChange} required  className={styles.textarea}/>
            <textarea name="description" placeholder="Açıklama" onChange={handleChange} required  className={styles.textarea}/>
            <input type="text" name="category" placeholder="Kategori" onChange={handleChange} required className={styles.textarea} />
            <input type="text" name="image1" placeholder="Resim URL 1" onChange={handleChange} className={styles.textarea}/>
            <input type="text" name="image2" placeholder="Resim URL 2" onChange={handleChange} className={styles.textarea} />
            <input type="text" name="image3" placeholder="Resim URL 3" onChange={handleChange} className={styles.textarea}/>
            <button type="submit" className={styles.button}>Ekle</button>
        </form>
    );
};

export default AddProduct;
