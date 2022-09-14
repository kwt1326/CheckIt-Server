import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
    const id = payload?.id;

    if (id) return id;
  }
  return null;
}