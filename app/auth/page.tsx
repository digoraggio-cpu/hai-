'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAPI = async (endpoint: string, method: string = 'GET', body?: any) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await fetch(`/api/auth/${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => callAPI('login', 'POST', { email, password });
  const handleRefresh = () => callAPI('refresh', 'POST');
  const handleMe = () => callAPI('me', 'GET');
  const handleLogout = () => callAPI('logout', 'POST');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4">🔐 Auth Tester</h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full border rounded p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-6">
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition"
            disabled={loading}
          >
            Login
          </button>
          <button
            onClick={handleRefresh}
            className="bg-yellow-500 text-white rounded p-2 hover:bg-yellow-600 transition"
            disabled={loading}
          >
            Refresh
          </button>
          <button
            onClick={handleMe}
            className="bg-green-600 text-white rounded p-2 hover:bg-green-700 transition"
            disabled={loading}
          >
            Me
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white rounded p-2 hover:bg-red-700 transition"
            disabled={loading}
          >
            Logout
          </button>
        </div>

        <div className="mt-6 bg-gray-50 border rounded p-3 overflow-auto max-h-64">
          {loading && <p className="text-gray-500 text-sm">Carregando...</p>}
          {error && <p className="text-red-500 text-sm">Erro: {error}</p>}
          {response && (
            <pre className="text-xs text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>
      </div>
      <p className="mt-4 text-gray-400 text-xs">Frontend Auth Test Utility • Vercel Ready 🚀</p>
    </div>
  );
}
