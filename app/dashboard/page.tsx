'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const storedUser = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');

    if (!storedUser || !accessToken) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(storedUser));

    // Fetch full profile from backend
    try {
      const res = await fetch('/api/users/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      } else if (res.status === 401) {
        // Token expired, try refresh
        await refreshToken();
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        loadUserData();
      } else {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (refreshToken) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
    }

    localStorage.clear();
    router.push('/login');
  };

  const testBackendConnection = async () => {
    setMessage('Testing...');
    try {
      const res = await fetch('/api/ping');
      const data = await res.json();
      setMessage(`✅ Backend connected! ${JSON.stringify(data)}`);
    } catch (err: any) {
      setMessage(`❌ Backend error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🔐 Hacksystem Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* User Info Card */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              👤 User Profile
            </h2>
            {user && (
              <div className="space-y-2 text-gray-300">
                <p><span className="font-semibold">Name:</span> {user.name}</p>
                <p><span className="font-semibold">Email:</span> {user.email}</p>
                <p><span className="font-semibold">ID:</span> {user.id}</p>
              </div>
            )}
            {profile && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">Role: <span className="text-blue-400 font-semibold">{profile.role}</span></p>
              </div>
            )}
          </div>

          {/* Backend Connection Test */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              🔌 Backend Status
            </h2>
            <button
              onClick={testBackendConnection}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition mb-3"
            >
              Test Backend Connection
            </button>
            {message && (
              <div className="p-3 bg-gray-900 rounded-lg text-sm break-all">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
          <h2 className="text-xl font-bold mb-4">🎯 Hacking Lab</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/auth" className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800 transition">
              <div className="text-lg font-semibold mb-1">🔐 Auth Tester</div>
              <div className="text-sm text-purple-200">Test JWT authentication</div>
            </a>
            <a href="/users" className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg hover:from-green-700 hover:to-green-800 transition">
              <div className="text-lg font-semibold mb-1">👥 Users</div>
              <div className="text-sm text-green-200">View all users (IDOR vuln)</div>
            </a>
            <a href="/admin" className="p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition">
              <div className="text-lg font-semibold mb-1">⚙️ Admin Panel</div>
              <div className="text-sm text-red-200">Admin functions (authz vuln)</div>
            </a>
          </div>
        </div>

        {/* Tokens Display (for hacking practice) */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">🔑 Your Tokens (Debug Mode)</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-400 mb-1">Access Token:</p>
              <code className="block p-3 bg-gray-900 rounded-lg text-xs text-green-400 break-all">
                {localStorage.getItem('accessToken')?.substring(0, 80)}...
              </code>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Refresh Token:</p>
              <code className="block p-3 bg-gray-900 rounded-lg text-xs text-blue-400 break-all">
                {localStorage.getItem('refreshToken')?.substring(0, 80)}...
              </code>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">💡 Try manipulating these tokens to test vulnerabilities</p>
        </div>
      </div>
    </div>
  );
}
