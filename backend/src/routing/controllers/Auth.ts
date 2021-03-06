import {NextFunction, Request, Response} from 'express';
import {
    iservConnectToLoginError,
    iservRevokeTokenError,
    iservRetrieveUserDataError,
    iservLogoutError
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

        } catch (e) {
            console.error(iservRetrieveUserDataError, e);
        }
        res.redirect('/');
    }

    static async GETlogout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const client = req.app.authClient;
            const tokenSet = req.session?.tokenSet;

            // Make sure the access token we got from the identity provider
            // gets revoked, this is for security reasons
            await client!.revoke(tokenSet!.access_token!);
        } catch (err) {
            console.error(iservRevokeTokenError, err);
        }
        clearSessionCookie(res);

        res.redirect('/');
    }


    // does not work, because IServ does not provide the necessary endpoints in the Discovery Document
    static async GETlogoutSso(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const client = req.app.authClient;

            clearSessionCookie(res);

            const endSessionUrl = client!.endSessionUrl();
            res.redirect(endSessionUrl);
        } catch (err) {
            console.error(iservLogoutError, err);
            res.redirect('/');
        }

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

    static GETadminFATest(req: Request, res: Response, next: NextFunction): void {
        res.send('AdminFA angemeldet');
    }

    static GETadmin5PKTest(req: Request, res: Response, next: NextFunction): void {
        res.send('Admin5PK angemeldet');
    }
}