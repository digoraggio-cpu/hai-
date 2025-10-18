import { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const base = process.env.BACKEND_URL || 'http://localhost:4000';
  
  try {
    const body = await req.text();
    console.log('[Login Proxy] Forwarding to:', `${base}/api/auth/login`);
    
    const r = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
      cache: 'no-store'
    });
    
    const data = await r.text();
    console.log('[Login Proxy] Response status:', r.status);
    
    return new Response(data, {
      status: r.status,
      headers: { 'content-type': r.headers.get('content-type') || 'application/json' }
    });
  } catch (error: any) {
    console.error('[Login Proxy] Error:', error.message);
    return new Response(
      JSON.stringify({ error: 'Backend connection failed', details: error.message }),
      { status: 503, headers: { 'content-type': 'application/json' } }
    );
  }
}
