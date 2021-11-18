import {Issuer} from 'openid-client';
import {NextFunction, Request, Response} from 'express';
import {deserialize, serialize} from './session';
import {clearSessionCookie, getSessionCookie, setSessionCookie,} from './cookie';
import {iservConnectionError, iservLink, redirectLink} from './staticAuthStrings';


/*
Initialize two main things: the OpenId issuer and client,
these will be necessary for session management as
well as for authentication.
 */
export async function initialize(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void>
 {
     if (req.app.authIssuer) {
         return next();
     }

     try {
         const issuer = await Issuer.discover(iservLink);
         const client = new issuer.Client({
             client_id: process.env.OAUTH_CLIENT_ID!,
             client_secret: process.env.OAUTH_CLIENT_SECRET!,
             redirect_uris: [redirectLink],
             response_types: ['code'],
         });

         req.app.authIssuer = issuer;
         req.app.authClient = client;
     } catch (e) {
         console.error(iservConnectionError, e);
     }

     next();
}

/*
  This middleware deals with sessions, which involves
  - turning the auth cookie into a valid session object
  - storing that session object in req.auth.session for other parts of the app to use
  - refreshing the access_token if necessary
 */
export async function session(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const sessionCookie = getSessionCookie(req);
    if (!sessionCookie) {
        return next();
    }

    const client = req.app.authClient;
    const session = deserialize(sessionCookie);

    if (session.tokenSet.expired()) {
        try {
            session.tokenSet = await client!.refresh(session.tokenSet);
            setSessionCookie(res, serialize(session));
        } catch (err) {
            // this can throw when the refresh token has expired, logout completely when that happens
            clearSessionCookie(res);
            return next();
        }
    }

    const validate = req.app.authClient?.validateIdToken as any;
    try {
        await validate.call(client, session.tokenSet);
    } catch (e) {
        console.error('Bad token signature found in auth cookie');
        return next(new Error('Bad Token in Auth Cookie'));
    }

    req.session = session;

    next();
}