// lib/password.ts
// Secure password hashing utilities using bcrypt

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

/**
 * Hash a password for secure storage
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verify a password against a stored hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Check if a string looks like a bcrypt hash (for migration purposes)
 */
export function isHashedPassword(str: string): boolean {
  // bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 chars
  return /^\$2[aby]\$\d{2}\$.{53}$/.test(str);
}
