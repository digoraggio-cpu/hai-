'use client';

import React from 'react';

export default function Page() {
  const ping = async () => {
    try {
      const res = await fetch('/api/ping');
      const json = await res.json();
      alert(JSON.stringify(json));
    } catch (e) {
      alert('Erro ao conectar com backend: ' + e);
    }
  };

  return (
    <main style={{ padding: 40, fontFamily: 'Inter, system-ui', maxWidth: 900, margin: '0 auto' }}>
      <header>
        <h1 style={{ fontSize: 36, marginBottom: 8 }}>Hacksystem — V0</h1>
        <p style={{ color: '#555' }}>Next.js 13 + TypeScript frontend — interface de teste</p>
      </header>

      <section style={{ marginTop: 28 }}>
        <button onClick={ping} style={{ padding: '10px 16px', fontSize: 16 }}>Ping backend</button>
      </section>

      <section style={{ marginTop: 24 }}>
        <h3>Links rápidos</h3>
        <ul>
          <li>Frontend: / (esta página)</li>
          <li><a href="/auth" style={{ color: '#0070f3', textDecoration: 'underline' }}>🔐 Auth Tester</a> - Test login/refresh/logout</li>
          <li>Backend health: <code>/health</code></li>
          <li>Backend ping: <code>/api/ping</code></li>
          <li>Gov.br OIDC: <code>/api/auth/govbr/login</code> → callback em <code>/api/auth/govbr/callback</code></li>
        </ul>
      </section>
    </main>
  );
}
