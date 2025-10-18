import { Router } from 'express';
import { Issuer, generators } from 'openid-client';
import jwt from 'jsonwebtoken';

const router = Router();

const GOVBR_ISSUER_URL = process.env.GOVBR_ISSUER_URL || 'https://sso.acesso.gov.br';
const CLIENT_ID = process.env.GOVBR_CLIENT_ID || '';
const CLIENT_SECRET = process.env.GOVBR_CLIENT_SECRET || '';
const REDIRECT_URI = process.env.GOVBR_REDIRECT_URI || 'http://localhost:4000/api/auth/govbr/callback';
const SCOPES = process.env.GOVBR_SCOPES || 'openid email profile';

let clientPromise: Promise<any> | null = null;
function getClient() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const issuer = await Issuer.discover(GOVBR_ISSUER_URL);
      return new issuer.Client({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uris: [REDIRECT_URI],
        response_types: ['code'],
        token_endpoint_auth_method: 'client_secret_post',
      });
    })();
  }
  return clientPromise;
}

router.get('/login', async (req, res) => {
  const client = await getClient();
  const code_verifier = generators.codeVerifier();
  const code_challenge = generators.codeChallenge(code_verifier);

  // store verifier in cookie (demo) — use a session store in prod
  res.cookie('pkce_verifier', code_verifier, { httpOnly: true, sameSite: 'lax' });

  const authorizationUrl = client.authorizationUrl({
    scope: SCOPES,
    code_challenge,
    code_challenge_method: 'S256',
  });

  res.redirect(authorizationUrl);
});

router.get('/callback', async (req, res) => {
  const client = await getClient();
  const params = client.callbackParams(req);
  const code_verifier = req.cookies?.pkce_verifier;

  try {
    const tokenSet = await client.callback(REDIRECT_URI, params, { code_verifier });
    const userinfo = await client.userinfo(tokenSet);

    // Create your local session/JWT here
    const accessToken = jwt.sign({ sub: userinfo.sub, email: userinfo.email }, process.env.JWT_SECRET || 'dev', { expiresIn: '15m' });

    res.json({ upstream: tokenSet, userinfo, accessToken });
  } catch (e: any) {
    res.status(400).json({ error: 'govbr_callback_failed', detail: e?.message || String(e) });
  }
});

export default router;
