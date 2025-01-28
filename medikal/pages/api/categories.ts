// pages/api/categories.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '../../lib/mongodb';
import Category from '../../models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDb(); // Veritabanı bağlantısını başlat

    if (req.method === 'GET') {
        try {
            // Tüm kategorileri al
            const categories = await Category.find({});
            const categoryNames = categories.map(category => category.name);
            return res.status(200).json(categoryNames);
        } catch (error) {
            return res.status(500).json({ error: 'Kategoriler alınamadı' });
        }
    }

    return res.status(405).end(); // Geçersiz HTTP metodu
}
