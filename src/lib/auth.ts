import { TokenPayload } from "@/app/api/jwtPayload";
import jwt from "jsonwebtoken";

export function generateAccessToken(userId: string, role: string) {
  return jwt.sign(
    { userId, role },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "15m" }
  );
}

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (token: string, secret: string): TokenPayload | null => {
  try {
    return jwt.verify(token, secret) as TokenPayload;
  } catch (err) {
    return null;
  }
};