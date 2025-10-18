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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            🔐 Hacksystem
          </h1>
          <p className="text-xl text-gray-400">Security Testing & Vulnerability Research Platform</p>
          <p className="text-sm text-gray-500 mt-2">Built with Next.js 13 + Express + TypeScript</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">🎯 Features</h2>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>JWT Authentication (access & refresh tokens)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Role-based access control (RBAC)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>IDOR vulnerabilities for testing</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Authorization bypass challenges</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Admin panel with privilege escalation</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">👥 Demo Accounts</h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-400">User Account:</p>
                <p className="text-blue-400 font-mono text-sm">alice@example.com</p>
                <p className="text-gray-300 font-mono text-sm">password123</p>
              </div>
              <div className="p-3 bg-gray-900 rounded-lg">
                <p className="text-sm text-gray-400">User Account:</p>
                <p className="text-blue-400 font-mono text-sm">bob@example.com</p>
                <p className="text-gray-300 font-mono text-sm">password123</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Hacking?</h2>
          <p className="text-blue-100 mb-6">Login and explore the vulnerabilities in this deliberately insecure system</p>
          <div className="flex gap-4 justify-center">
            <a
              href="/login"
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition"
            >
              🚀 Login Now
            </a>
            <button
              onClick={ping}
              className="px-8 py-3 bg-blue-800 hover:bg-blue-900 font-bold rounded-lg transition"
            >
              Test Backend
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a href="/auth" className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400">🔐 Auth Tester</h3>
            <p className="text-gray-400 text-sm">Interactive JWT authentication testing tool</p>
          </a>

          <a href="/users" className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-green-400">👥 User Management</h3>
            <p className="text-gray-400 text-sm">Practice IDOR attacks and enumeration</p>
          </a>

          <a href="/admin" className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-red-400">⚙️ Admin Panel</h3>
            <p className="text-gray-400 text-sm">Test privilege escalation techniques</p>
          </a>
        </div>

        <div className="bg-yellow-900/30 border border-yellow-600 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-yellow-300 mb-3">⚠️ Educational Purpose Only</h3>
          <p className="text-yellow-200 text-sm">
            This system contains deliberate security vulnerabilities for educational and testing purposes.
            Do NOT use these techniques on systems you don't own or have permission to test.
          </p>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>Built for security researchers, pentesters, and ethical hackers</p>
          <p className="mt-2">Backend: Render | Frontend: Vercel | Stack: Next.js + Express + TypeScript</p>
        </footer>
      </div>
    </div>
  );
}
