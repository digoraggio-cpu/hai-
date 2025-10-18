'use client';

import { useState, useEffect } from 'react';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [action, setAction] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const performAction = (actionName: string) => {
    setAction(actionName);
    setResult(`Executing: ${actionName}... (Demo Mode)`);
    
    setTimeout(() => {
      setResult(`✅ ${actionName} completed successfully (simulated)`);
    }, 1000);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">⚙️ Admin Panel</h1>
          <a href="/dashboard" className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
            ← Back
          </a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-6">
        {!isAdmin && (
          <div className="bg-red-900/30 border border-red-500 rounded-xl p-4 mb-6">
            <h3 className="font-bold text-red-300 mb-2">🚫 Access Denied</h3>
            <p className="text-red-200 text-sm">
              You need admin privileges to access this page. Current role: <strong>{user?.role || 'unknown'}</strong>
            </p>
            <p className="text-red-200 text-sm mt-2">
              💡 <strong>Hint:</strong> Try manipulating your JWT token or session to escalate privileges!
            </p>
          </div>
        )}

        <div className={`bg-gray-800 rounded-xl p-6 border border-gray-700 ${!isAdmin ? 'opacity-50' : ''}`}>
          <h2 className="text-xl font-bold mb-4">Admin Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => performAction('View All Users')}
              disabled={!isAdmin}
              className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed text-left"
            >
              <div className="font-bold mb-1">👥 View All Users</div>
              <div className="text-sm text-blue-200">Access complete user database</div>
            </button>

            <button
              onClick={() => performAction('Delete User')}
              disabled={!isAdmin}
              className="p-4 bg-red-600 hover:bg-red-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed text-left"
            >
              <div className="font-bold mb-1">🗑️ Delete User</div>
              <div className="text-sm text-red-200">Remove users from system</div>
            </button>

            <button
              onClick={() => performAction('Modify Permissions')}
              disabled={!isAdmin}
              className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed text-left"
            >
              <div className="font-bold mb-1">🔐 Modify Permissions</div>
              <div className="text-sm text-purple-200">Change user roles</div>
            </button>

            <button
              onClick={() => performAction('Export Database')}
              disabled={!isAdmin}
              className="p-4 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed text-left"
            >
              <div className="font-bold mb-1">💾 Export Database</div>
              <div className="text-sm text-yellow-200">Download full database</div>
            </button>
          </div>

          {result && (
            <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
              <p className="text-green-400">{result}</p>
            </div>
          )}
        </div>

        <div className="mt-6 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-3">🎓 Authorization Bypass Challenge:</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">1.</span>
              <span><strong>Privilege Escalation:</strong> Try to access admin functions without admin role</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">2.</span>
              <span><strong>JWT Manipulation:</strong> Decode your token, change the role claim, re-encode</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">3.</span>
              <span><strong>Session Hijacking:</strong> Steal an admin's token and use it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">4.</span>
              <span><strong>Direct API Access:</strong> Bypass frontend checks by calling API directly</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 bg-blue-900/30 border border-blue-500 rounded-xl p-4">
          <h3 className="font-bold text-blue-300 mb-2">💡 Tools to Try:</h3>
          <ul className="text-blue-200 text-sm space-y-1">
            <li>• <strong>jwt.io:</strong> Decode and examine your JWT token</li>
            <li>• <strong>Burp Suite:</strong> Intercept and modify requests</li>
            <li>• <strong>Browser DevTools:</strong> Modify localStorage tokens</li>
            <li>• <strong>curl/Postman:</strong> Direct API testing</li>
          </ul>
        </div>

        <div className="mt-6 bg-green-900/30 border border-green-500 rounded-xl p-4">
          <h3 className="font-bold text-green-300 mb-2">🏆 Success Criteria:</h3>
          <p className="text-green-200 text-sm">
            You've successfully completed this challenge when you can execute admin functions
            with a non-admin account. Document your method and the vulnerability exploited!
          </p>
        </div>
      </div>
    </div>
  );
}
