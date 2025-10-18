'use client';

import { useState } from 'react';

export default function UsersPage() {
  const [userId, setUserId] = useState('1');
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    setError('');
    setUserData(null);

    try {
      const accessToken = localStorage.getItem('accessToken');
      
      // IDOR Vulnerability: Direct access to any user ID
      const res = await fetch(`/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!res.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await res.json();
      setUserData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">👥 User Management</h1>
          <a href="/dashboard" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
            ← Back
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-red-300 mb-2">⚠️ IDOR Vulnerability Practice Zone</h3>
          <p className="text-red-200 text-sm">
            This page demonstrates Insecure Direct Object Reference (IDOR). 
            Try changing user IDs in the request to access other users' data.
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Fetch User Data</h2>
          
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              User ID (Try: 1, 2, 3...)
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder="Enter user ID"
            />
          </div>

          <button
            onClick={fetchUser}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Fetch User Data'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {userData && (
            <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h3 className="font-bold text-green-400 mb-3">✅ User Data Retrieved:</h3>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-3">🎓 Learning Objectives:</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong>IDOR Attack:</strong> Access other users' data by changing the ID parameter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong>Authorization Bypass:</strong> The backend doesn't verify if you own the resource</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">→</span>
              <span><strong>Enumeration:</strong> Try sequential IDs to discover all users</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 bg-yellow-900/30 border border-yellow-600 rounded-xl p-4">
          <h3 className="font-bold text-yellow-300 mb-2">💡 Hint:</h3>
          <p className="text-yellow-200 text-sm">
            Open DevTools → Network tab. Watch the API requests. Try intercepting and modifying
            the request to access user IDs 1, 2, 3. Or use curl to test:
          </p>
          <code className="block mt-2 p-3 bg-gray-900 rounded text-xs text-green-400">
            curl -H "Authorization: Bearer YOUR_TOKEN" https://your-frontend.vercel.app/api/users/me
          </code>
        </div>
      </div>
    </div>
  );
}
