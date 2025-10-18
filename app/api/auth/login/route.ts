import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const base = process.env.BACKEND_URL || 'http://localhost:4000';
  const body = await req.text(); // passa direto sem tocar no JSON
  const r = await fetch(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    cache: 'no-store'
  });
  const data = await r.text();
  return new Response(data, {
    status: r.status,
    headers: { 'content-type': r.headers.get('content-type') || 'application/json' }
  });
}
