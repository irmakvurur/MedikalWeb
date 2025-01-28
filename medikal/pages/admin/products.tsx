// pages/api/products.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../lib/mongodb';
import Product, { IProduct } from '../../models/Product';
import Category from '../../models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb();  // Veritabanına bağlan
    const { method, query } = req;

    if (method === 'GET') {
        try {
            const category = query.category;  // Kategori sorgu parametresinden alınır
            const filter = category ? { category } : {};  // Kategoriye göre filtrele
            const products = await Product.find(filter);
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ error: 'Ürünler alınamadı' });
        }
    }

    if (req.method === 'POST') {
        const { name, description, category, images } = req.body;

        try {
            // Yeni ürünü veritabanına ekle
            const newProduct = new Product({ 
                name,
                description,
                category,
                images,
            });
            await newProduct.save();

            // Kategoriyi veritabanındaki categories dizisine ekle
            const existingCategories = await Category.find({ name: category });
            if (existingCategories.length === 0) {
                const newCategory = new Category({ name: category });
                await newCategory.save();  // Kategori zaten yoksa ekle
            }

            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(500).json({ error: 'Ürün eklenirken hata oluştu' });
        }
    }

    if (req.method === 'PUT') {  // Güncelleme işlemi
        const { id } = req.query;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatedProduct);
    }

    if (req.method === 'DELETE') {
        const { id } = req.query;
        await Product.findByIdAndDelete(id);
        return res.status(204).end();
    }

    return res.status(405).end();  // Geçersiz HTTP metodu
}
