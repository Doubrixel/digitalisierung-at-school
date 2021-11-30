import {NextFunction, Request, Response} from 'express';
import {
    iservConnectToLoginError,
    iservRevokeTokenError,
    iservRetrieveUserDataError, homepage
} from '../../auth/staticAuthStrings';
import {clearSessionCookie, setSessionCookie} from '../../auth/cookie';
import {getAuthStateCookie, serializeAuthState, setAuthStateCookie} from '../../auth/state';
import {createUser, serialize} from '../../auth';
import {User} from '../../../types/sso';
import {addOrUpdateUserInDb} from '../../db/user';

export default class Auth {

    static async GETlogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        {
            try {
                const backToPath = req.query.backTo as string;
                const state = serializeAuthState({ backToPath });
                const authUrl = req.app.authClient?.authorizationUrl({
                    scope: 'openid roles uuid profile groups',
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

            const client = req.app.authClient;

            const params = client!.callbackParams(req);

            const tokenSet = await client!.callback(
                process.env.REDIRECT_LINK,
                params,
                { state }
            );

            const user = await client!.userinfo(tokenSet.access_token!);

            await addOrUpdateUserInDb(await createUser(user));

            const sessionCookie = serialize({ tokenSet, user });
            setSessionCookie(res, sessionCookie);

            res.redirect(homepage);
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
            const user: User = await createUser(session.user);
            res.json(user);
        }
    }

    static GETstudentTest(req: Request, res: Response, next: NextFunction): void {
        res.send('Student angemeldet');
    }

    static GETadminTest(req: Request, res: Response, next: NextFunction): void {
        res.send('Admin angemeldet');
    }
}