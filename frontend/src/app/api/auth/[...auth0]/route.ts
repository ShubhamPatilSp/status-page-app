// src/app/api/auth/[auth0]/route.ts
import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
  secret: process.env.APP_SESSION_SECRET
});

export const POST = handleAuth({
  secret: process.env.APP_SESSION_SECRET
});
