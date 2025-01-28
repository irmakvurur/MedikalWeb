import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import {clientPromise} from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { name, password } = req.body;

    try {
        const client = await clientPromise;
        const db = client.db("MedikalDb");

        // Kullanıcıyı veritabanından alın
        const user = await db.collection('users').findOne({ name });

        if (!user) {
            return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Şifreyi doğrulayın
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Geçersiz şifre' });
        }

        // Giriş başarılı
        return res.status(200).json({ message: 'Giriş başarılı', userId: user._id });
    } catch (error) {
        res.status(500).json({ message: 'Giriş işleminde hata oluştu', error });
    }
}
