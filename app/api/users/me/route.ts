import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const base = process.env.BACKEND_URL || 'http://localhost:4000';
  const auth = req.headers.get('authorization') || '';
  const r = await fetch(`${base}/api/users/me`, {
    headers: auth ? { authorization: auth } : {},
    cache: 'no-store'
  });
  const data = await r.text();
  return new Response(data, {
    status: r.status,
    headers: { 'content-type': r.headers.get('content-type') || 'application/json' }
  });
}
