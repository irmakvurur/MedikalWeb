import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export const auth = (req: NextApiRequest, res: NextApiResponse, next: Function) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token'ı al
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    req.user = decoded; // Kullanıcı bilgilerini ekleyin
    next(); // Middleware'den geç
  });
};
