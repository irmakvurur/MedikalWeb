// types/User.ts
export interface User {
    id: string; // MongoDB ObjectId'si string olarak saklanıyorsa
    name: string;
    role?: string;
}
