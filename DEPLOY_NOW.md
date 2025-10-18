# 🚀 DEPLOY NOW - Step by Step

## ✅ Code is Ready - Commit `64e71bcd` pushed to main

---

## 📋 STEP 1: Deploy Backend on Render (5 minutes)

### A. Create PostgreSQL Database
1. Go to: https://dashboard.render.com
2. Click **New** → **PostgreSQL**
3. Settings:
   - Name: `hacksystem-db`
   - Plan: **Free**
   - Region: **Oregon** (or closest)
4. Click **Create Database**
5. Wait 30 seconds → Go to **Connections** tab
6. **COPY** the **Internal Database URL** (starts with `postgresql://`)
7. **SAVE IT** - you'll need it in Step C

### B. Create Redis (Key-Value Store)
1. Still in Render dashboard
2. Click **New** → **Key-Value Store**
3. Settings:
   - Name: `hacksystem-redis`
   - Plan: **Free**
4. Click **Create Key-Value Store**
5. Go to **Connections** tab
6. **COPY** the **Internal Connection String** (starts with `redis://`)
7. **SAVE IT** - you'll need it in Step C

### C. Create Backend Web Service
1. Click **New** → **Web Service**
2. Connect your GitHub: `digoraggio-cpu/hai-`
3. Settings:
   - **Name**: `hacksystem-backend`
   - **Environment**: `Node` ⚠️ (NOT Docker!)
   - **Region**: Same as DB (Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm ci || npm install && npm run build`
   - **Start Command**: `npx prisma migrate deploy && node dist/index.js`
   - **Plan**: `Free`

4. **Environment Variables** - Click "Add Environment Variable" for each:

```bash
NODE_ENV=production
JWT_SECRET=7a8b5bbbf11d4d23532a85cd35bbda572769b43f185f37c5a9c41e2f8ad7c995
REFRESH_SECRET=54e7b4c80c9b5d85846bada3b2f0a9ca9912a17d2af857a2d7cfeaa76179ea2f
COOKIE_SECRET=da2b0da44870d46e59b35f0f5b6365e6f6c8536353ceecfcf4d7b65b0e51c8e6
ACCESS_TOKEN_TTL=900
REFRESH_TOKEN_TTL=1209600
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
DATABASE_URL=<PASTE_YOUR_POSTGRES_INTERNAL_URL_HERE>
REDIS_URL=<PASTE_YOUR_REDIS_INTERNAL_CONNECTION_STRING_HERE>
CORS_ORIGIN=http://localhost:3000
```

⚠️ **Replace the last two**:
- `DATABASE_URL` = paste from Step A
- `REDIS_URL` = paste from Step B

5. Click **Create Web Service**
6. Wait 2-3 minutes for build to complete
7. **COPY YOUR BACKEND URL** (looks like: `https://hacksystem-backend-xxxx.onrender.com`)
8. Test it: Open `https://YOUR-BACKEND.onrender.com/health` in browser
   - Should show: `{"ok":true,"ts":1234567890}`

---

## 📋 STEP 2: Deploy Frontend on Vercel (2 minutes)

### A. Create Vercel Project
1. Go to: https://vercel.com/new
2. Click **Import Git Repository**
3. Select: `digoraggio-cpu/hai-`
4. Settings:
   - **Framework Preset**: `Next.js` (auto-detected)
   - **Root Directory**: Leave empty (or `.`)
   - **Build Command**: Leave default (`next build`)
   - **Output Directory**: Leave default (`.next`)

5. **Environment Variables** - Click "Add":
   ```bash
   Name: BACKEND_URL
   Value: <PASTE_YOUR_RENDER_BACKEND_URL_HERE>
   ```
   Example: `https://hacksystem-backend-xxxx.onrender.com`

6. Click **Deploy**
7. Wait 1-2 minutes
8. **COPY YOUR FRONTEND URL** (looks like: `https://hai-xxxx.vercel.app`)

---

## 📋 STEP 3: Update Backend CORS (1 minute)

Now that you have your Vercel domain, update the backend to allow it:

1. Go back to Render → Your backend service
2. Click **Environment** tab
3. Find `CORS_ORIGIN` variable
4. Click **Edit**
5. Change value to:
   ```
   https://YOUR-VERCEL-DOMAIN.vercel.app,http://localhost:3000
   ```
   ⚠️ Replace `YOUR-VERCEL-DOMAIN.vercel.app` with your actual Vercel domain (NO trailing slash!)

6. Click **Save Changes**
7. Render will auto-redeploy (wait 30 seconds)

---

## 🧪 STEP 4: Test Everything (1 minute)

### Test in Browser
1. Open your Vercel URL: `https://YOUR-VERCEL.vercel.app`
2. Click the **"Ping backend"** button
3. Should show alert: `{"msg":"pong","ts":1234567890}`

✅ **SUCCESS!** No CORS errors!

### Test Auth API (optional - terminal)
```bash
# Replace with your Vercel domain
VERCEL_URL="https://YOUR-VERCEL.vercel.app"

# Test login
curl -X POST $VERCEL_URL/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"username":"alice","password":"user123"}'

# Should return: {"accessToken":"...","refreshToken":"..."}
```

---

## ✅ DONE! Your app is live

- **Frontend**: https://YOUR-VERCEL.vercel.app
- **Backend**: https://YOUR-BACKEND.onrender.com
- **No CORS issues**: API proxy handles everything

---

## 🔧 Troubleshooting

### "Build failed on Render"
- Check **Environment** is set to `Node` (not Docker)
- Check **Root Directory** is `backend`
- Check logs for missing env vars

### "CORS blocked" error
- Verify `CORS_ORIGIN` in Render matches your EXACT Vercel domain
- No trailing slash in the domain
- Redeploy backend after changing

### "Backend unreachable"
- Check `BACKEND_URL` in Vercel env vars is HTTPS
- Test backend health endpoint directly: `https://YOUR-BACKEND.onrender.com/health`

### "Database error"
- Check `DATABASE_URL` is the **Internal** URL (not External)
- Should start with `postgresql://`

---

## 🎯 Quick Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repo**: https://github.com/digoraggio-cpu/hai-

**Generated Secrets (already in instructions above)**:
- JWT_SECRET: `7a8b5bbbf11d4d23532a85cd35bbda572769b43f185f37c5a9c41e2f8ad7c995`
- REFRESH_SECRET: `54e7b4c80c9b5d85846bada3b2f0a9ca9912a17d2af857a2d7cfeaa76179ea2f`
- COOKIE_SECRET: `da2b0da44870d46e59b35f0f5b6365e6f6c8536353ceecfcf4d7b65b0e51c8e6`
