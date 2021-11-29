import {NextFunction, Request, Response} from 'express';
import {
    iservConnectToLoginError,
    iservRevokeTokenError,
    iservRetrieveUserDataError
} from '../../auth/staticAuthStrings';
import {clearSessionCookie, setSessionCookie} from '../../auth/cookie';
import {deserializeAuthState, getAuthStateCookie, serializeAuthState, setAuthStateCookie} from '../../auth/state';
import {serialize, User} from '../../auth';

export default class Auth {

    static async GETlogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        {
            try {
                const backToPath = req.query.backTo as string;
                const state = serializeAuthState({ backToPath });
                const authUrl = req.app.authClient?.authorizationUrl({
                    scope: 'openid roles uuid profile',
                    state,
                });

                setAuthStateCookie(res, state);

                if (authUrl != null) {
                    res.redirect(authUrl);
                }
            } catch (e) {
                console.error(iservConnectToLoginError, e);
                res.redirect('/');
            }


        }
    }

    static async GETcallback(req: Request, res: Response, next: NextFunction): Promise<void> {

        try {
            const state = getAuthStateCookie(req);

            const { backToPath } = deserializeAuthState(state);

            const client = req.app.authClient;

            const params = client!.callbackParams(req);

            const tokenSet = await client!.callback(
                process.env.REDIRECT_LINK,
                params,
                { state }
            );

            const user = await client!.userinfo(tokenSet.access_token!);

            console.log(user);

            const sessionCookie = serialize({ tokenSet, user });
            setSessionCookie(res, sessionCookie);

            res.redirect(backToPath);
        } catch (e) {
            console.error(iservRetrieveUserDataError, e);
            return next(e);
        }
    }

    static async GETlogout(req: Request, res: Response, next: NextFunction): Promise<void> {
        const client = req.app.authClient;
        const tokenSet = req.session?.tokenSet;

        try {
            await client!.revoke(tokenSet!.access_token!);
        } catch (err) {
            console.error(iservRevokeTokenError, err);
        }
        clearSessionCookie(res);

        res.redirect('/');
    }

    static async GETuserData(req: Request, res: Response, next: NextFunction): Promise<void> {
        const session = req.session;
        if (!session) {
            return next(new Error('unauthenticated'));
        } else {
            const userString = JSON.stringify(session.user);
            const user: User = JSON.parse(userString);
            res.json(user);
        }
    }

    static GETstudentTest(req: Request, res: Response, next: NextFunction): void {
        res.send('Student angemeldet');
    }
}