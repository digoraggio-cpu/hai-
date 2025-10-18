export const dynamic = 'force-dynamic';

export async function GET() {
  const base = process.env.BACKEND_URL || 'http://localhost:4000';
  // Redirects browser to backend (which will redirect to gov.br provider)
  return Response.redirect(`${base}/api/auth/govbr/login`, 302);
}
