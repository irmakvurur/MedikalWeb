import { NextApiRequest, NextApiResponse } from 'next';
import { connectDb } from '@/lib/mongodb';
import Product from '@/models/Product'; // Veritabanı modeli
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  await connectDb(); // MongoDB'ye bağlan

  try {
    // ID'nin geçerli bir ObjectId olduğundan emin olun
    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ message: 'Geçersiz ID formatı' });
    }

    const product = await Product.findById(id); // ID'ye göre ürünü bul
    if (!product) {
      return res.status(404).json({ message: 'Ürün bulunamadı' });
    }
    res.status(200).json(product); // Ürünü geri döndür
  } catch (error) {
    console.error('Hata:', error); // Hata loglama
    res.status(500).json({ message: 'Sunucu hatası' });
  }
}
