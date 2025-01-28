import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import {clientPromise}from '../../../lib/mongodb'; // MongoDB bağlantısı
import {User} from '../../../types/User'; // User arayüzünü içe aktarın

declare module 'next-auth' {
    interface Session {
        user: {
            id: string; // User ID
            name?: string | null;
            image?: string | null;
            role?: string; // Kullanıcı rolü
        };
    }

    interface User {
        id: string; // User ID
        name: string;
        role?: string; // Kullanıcı rolü
    }
}

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Kullanıcı Adı", type: "text" },
                password: { label: "Şifre", type: "password" }
            },
            async authorize(credentials) {
                const client = await clientPromise;
                const db = client.db("MedikalDb"); // Veritabanı adınızı buraya yazın
            
                // Kullanıcıyı username ile bul
                const user = await db.collection('users').findOne({ username: credentials?.username });
            
                if (!user) {
                    throw new Error("Kullanıcı bulunamadı.");
                }
            
                // Şifre kontrolü
                if (!credentials || !credentials.password) {
                    throw new Error("Şifre belirtilmedi."); // Şifre belirtilmedi hatası
                }
            
                // Şifre hash kontrolü
                const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash); // passwordHash kullanın
            
                if (!isPasswordValid) {
                    throw new Error("Şifre hatalı.");
                }
            
                // Kullanıcı bilgileri doğruysa
                return { id: user._id.toString(), name: user.username, role: user.role || '' } as User; // Role'i burada ekleyin
            }
        })
    ],
    pages: {
        signIn: '/login', // Giriş sayfasına yönlendirme
    },
    session: {
        strategy: 'jwt', // JWT kullanıyoruz
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || ''; // Kullanıcı rolünü ekle
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string; // Burada id'nin string olduğunu belirtiyoruz
                session.user.role =  (token.role as string) || ''; // Kullanıcı rolünü ekle
            }
            return session;
        }
    }
};

export default NextAuth(options);
