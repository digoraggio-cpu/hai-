# 🚀 Hacksystem - Quick Start Guide

## ✅ Everything is Working!

### 🔑 Demo Accounts
- **User**: `alice@example.com` / `password123`
- **Admin**: `bob@example.com` / `password123`

## 🏃 Running Locally

### 1. Start Backend
```bash
cd backend
npm install
npm run build
node dist/index.js
```
Backend runs on `http://localhost:4000`

### 2. Start Frontend
```bash
npm install
npm run dev
```
Frontend runs on `http://localhost:3000`

### 3. Test Everything
1. Open `http://localhost:3000`
2. Click "Test Backend" - should see `{"msg":"pong"...}`
3. Click "Login Now" or go to `/login`
4. Login with alice@example.com / password123
5. You're in the dashboard!

## 🎯 What to Hack

### `/login` - Authentication
- Login with demo accounts
- See JWT tokens stored in localStorage
- Try SQL injection (won't work, but learn why)

### `/dashboard` - User Profile
- See your user info
- Test backend connection
- View your JWT tokens (copy them!)

### `/users` - IDOR Attack
- Try to access other users' data
- Change user IDs in requests
- Practice enumeration

### `/admin` - Privilege Escalation
- Alice (user) gets "Access Denied"
- Bob (admin) can access
- **Challenge**: Make Alice access admin functions!

### `/auth` - JWT Testing Tool
- Interactive auth testing
- Login, refresh, logout, me
- See responses in real-time

## 🛠️ JWT Hacking Tips

### Decode Your Token
1. Login and copy your accessToken
2. Go to https://jwt.io
3. Paste token - see the payload
4. Notice the `role` claim

### Privilege Escalation Challenge
1. Login as Alice (role: "user")
2. Try to access `/admin` - denied!
3. Copy your token
4. Decode it at jwt.io
5. Change `"role":"user"` to `"role":"admin"`
6. Try to encode it back (need the secret!)
7. **Can you figure out the secret?** (Hint: check backend/src/routes/auth.ts)

## 🔧 Troubleshooting

### "Backend unavailable"
- Make sure backend is running on port 4000
- Check `http://localhost:4000/health`
- Should return `{"ok":true,"ts":...}`

### "Login failed"
- Make sure you're using the correct credentials
- alice@example.com / password123
- bob@example.com / password123

### "CORS error"
- Backend CORS is set to allow `http://localhost:3000`
- If you change ports, update backend CORS_ORIGIN

## 📚 Learning Path

1. **Day 1**: Login, explore dashboard, test backend
2. **Day 2**: Try IDOR attacks on `/users`
3. **Day 3**: JWT manipulation, decode tokens
4. **Day 4**: Privilege escalation challenge
5. **Day 5**: Find the JWT secret, forge admin tokens

## 🎓 Educational Goals

- ✅ Understand JWT authentication
- ✅ Practice IDOR vulnerabilities
- ✅ Learn authorization bypass
- ✅ Token manipulation techniques
- ✅ API security testing
- ✅ Role-based access control (RBAC)

## ⚠️ Ethical Hacking Only

This system is for EDUCATIONAL purposes. Only test on systems you own or have permission to test.

## 🆘 Need Help?

Check the browser console for detailed logs:
- Login attempts
- API calls
- Backend responses
- Error messages

## 🎉 Ready to Hack!

Your system is fully functional and ready for security testing!

**Have fun and learn! 🚀**
