import { Request } from "express";

export function extractToken(req: Request): string {
  const header = req.headers?.authorization;
  const token = header?.split(' ')[1]; // remove 'Bearer'
  return token || '';
}