declare module "next-auth" {
    interface User {
      id: string; // Burada string olarak tanımlıyoruz
      name: string;
      role?: string;
    }
  
    interface Session {
      user: User;
    }
  }
  