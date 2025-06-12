// src/app/api/auth/[auth0]/route.ts
import { handleAuth } from '@auth0/nextjs-auth0';

// Workaround for Vercel bug where AUTH0_SECRET cannot be set.
if (process.env.APP_SESSION_SECRET && !process.env.AUTH0_SECRET) {
  process.env.AUTH0_SECRET = process.env.APP_SESSION_SECRET;
}

export const GET = handleAuth();
