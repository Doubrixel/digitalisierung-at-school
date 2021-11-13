import {Router} from 'express';
import {generators} from 'openid-client';
import {redirectLink, iservConnectToLoginError} from '../../auth/staticAuthStrings';

const code_verifier = generators.codeVerifier();

export default (): Router => {
    const router = Router();

    router.get('/login', async (req, res, next) => {
        const code_challenge = generators.codeChallenge(code_verifier);

        try {
            const authUrl = req.app.authClient?.authorizationUrl({
                scope: 'openid roles uuid',
                code_challenge,
                code_challenge_method: 'S256',
            });

            if (authUrl != null) {
                res.redirect(authUrl);
            }
        } catch (e) {
            console.log(iservConnectToLoginError, e);
        }

        next();
    });

    router.get('/callback', async (req, res, next) => {
        const client = req.app.authClient;
        const params = client?.callbackParams(req);
        if (params != null) {
            const tokenSet = await client?.callback(redirectLink, params, { code_verifier });
            if (tokenSet != null) {
                const userinfo = await client?.userinfo(tokenSet);
                console.log('userinfo: ', userinfo);
            }
        }
        next();
    });

    return router;
};