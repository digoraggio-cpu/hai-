# Hacksystem — Fullstack Scaffold (Next.js + Express/TS) + Security Add-ons

This repository contains a production-leaning scaffold with:
- Next.js 13 (app router) frontend
- Node.js + Express (TypeScript) backend
- Docker & docker-compose (dev), plus Redis
- GitHub Actions CI
- Security add-ons: Helmet with advanced CSP, rate limiting with Redis store, JWT auth + refresh tokens, and gov.br OpenID Connect (OIDC) skeleton
- Pentest authorized playbook and helper scripts (OWASP ZAP & nmap)

## Quickstart (dev)

```bash
# 1) copy .env.example to .env and fill values
cp .env.example .env

# 2) run with docker-compose (frontend, backend, redis)
docker-compose up --build
```

Frontend: http://localhost:3000  
Backend:  http://localhost:4000

## Deploy (suggested)
- Frontend on Vercel
- Backend on Render / Fly.io / DO App Platform / Heroku (or as container)
- Configure env vars in your provider (never commit secrets)

## Security checklist (short)
- Configure `CORS_ORIGIN` to your production domain
- Use HTTPS in production
- Set strong `JWT_SECRET` and `REFRESH_SECRET`
- Configure `REDIS_URL` and enable rate limiting
- Keep dependencies updated; enable Dependabot
- Run ZAP baseline and fix findings before launch
- For gov.br OIDC, register your redirect URIs and keep client secrets safe

See `/security/PLAYBOOK.md` for the pentest authorized guide.
