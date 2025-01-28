// types/next-auth.d.ts
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: any; // Replace 'any' with the specific type of your user data if available
  }
}

export interface NextApiRequestWithFile extends NextApiRequest {
  file?: {
    path: string; // Yüklenen dosyanın yolu
    originalname?: string; // Orijinal dosya adı
    mimetype?: string; // Dosya türü
    size?: number; // Dosya boyutu
  };
}
