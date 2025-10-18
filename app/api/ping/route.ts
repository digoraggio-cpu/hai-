export const dynamic = 'force-dynamic';

export async function GET() {
  const base = process.env.BACKEND_URL || 'http://localhost:4000';
  
  try {
    console.log('[Ping] Testing backend at:', `${base}/api/ping`);
    const r = await fetch(`${base}/api/ping`, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    const data = await r.text();
    console.log('[Ping] Success:', r.status);
    return new Response(data, {
      status: r.status,
      headers: { 'content-type': r.headers.get('content-type') || 'application/json' }
    });
  } catch (error: any) {
    console.error('[Ping] Failed:', error.message);
    return new Response(
      JSON.stringify({ 
        error: 'Backend unavailable', 
        backend: base,
        details: error.message 
      }),
      { status: 503, headers: { 'content-type': 'application/json' } }
    );
  }
}
