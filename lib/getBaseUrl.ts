// lib/getBaseUrl.ts
// Returns the base URL for the current environment

export function getBaseUrl(): string {
  // Production: Use the explicitly configured base URL
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }

  // Vercel deployment: Use the Vercel URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Vercel preview deployments
  if (process.env.VERCEL_BRANCH_URL) {
    return `https://${process.env.VERCEL_BRANCH_URL}`;
  }

  // Local development fallback
  return "http://localhost:3000";
}
