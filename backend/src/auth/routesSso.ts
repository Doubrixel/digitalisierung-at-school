import {Router} from 'express';
import {generators} from 'openid-client';
import {getDomain} from './sso';

const code_verifier = generators.codeVerifier();

export default function authRoutesMiddleware(): Router {
    const router = Router();

    router.get('/auth/login', async (req, res, next) => {
        const code_challenge = generators.codeChallenge(code_verifier);

        const authUrl = req.app.authClient?.authorizationUrl({
            scope: 'openid roles uuid',
            code_challenge,
            code_challenge_method: 'S256',
        });

        if (authUrl != null) {
            res.redirect(authUrl);
        }

        next();
    });

    router.get('/auth/callback', async (req, res, next) => {
        const client = req.app.authClient;
        const params = await client?.callbackParams(req);
        if (params != null) {
            const tokenSet = await client?.callback('http://einschreibung.kant-gymnasium.de:5000', params, { code_verifier });
            if (tokenSet != null) {
                const userinfo = await client?.userinfo(tokenSet);
                console.log('userinfo %j', userinfo);
            }
        }
        next();
    });

    return router;
}