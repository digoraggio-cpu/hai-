# Hacksystem Backend

Minimal Express + TypeScript backend with JWT authentication.

## Features

- ✅ JWT access & refresh tokens
- ✅ Login, refresh, logout endpoints
- ✅ Protected `/api/users/me` endpoint
- ✅ CORS with multiple origins
- ✅ Rate limiting
- ✅ Helmet security headers
- ✅ Mock user database (replace with real DB)

## Demo Users

```
Email: alice@example.com
Password: password123

Email: bob@example.com  
Password: password123
```

## Local Development

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your secrets
npm run dev
```

Server runs on `http://localhost:4000`

## Build for Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/ping` - Ping test
- `POST /api/auth/login` - Login (returns access + refresh tokens)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (revoke refresh token)
- `GET /api/users/me` - Get current user (requires Bearer token)

## Deploy to Render

See `../DEPLOY_NOW.md` for complete instructions.

**Environment Variables:**
- `JWT_SECRET` - Access token secret
- `REFRESH_SECRET` - Refresh token secret  
- `COOKIE_SECRET` - Cookie secret
- `CORS_ORIGIN` - Comma-separated allowed origins
- `DATABASE_URL` - (Optional) Postgres connection string
- `REDIS_URL` - (Optional) Redis connection string
