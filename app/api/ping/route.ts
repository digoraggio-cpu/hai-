export const dynamic = 'force-dynamic';

export async function GET() {
  const base = process.env.BACKEND_URL || 'http://localhost:4000';
  try {
    const r = await fetch(`${base}/api/ping`, { cache: 'no-store' });
    const data = await r.json();
    return new Response(JSON.stringify(data), { 
      headers: { 'content-type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Backend unreachable' }), { 
      status: 503,
      headers: { 'content-type': 'application/json' }
    });
  }
}
