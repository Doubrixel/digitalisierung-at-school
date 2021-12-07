import {Issuer, UserinfoResponse} from 'openid-client';
import {NextFunction, Request, Response} from 'express';
import {deserialize, serialize} from './session';
import {clearSessionCookie, getSessionCookie, setSessionCookie,} from './cookie';
import {iservConnectionError, unauthenticated} from './staticAuthStrings';
import {User} from '../../types/sso';
import {transformGroupToArray} from '../db/user';


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function createUser(pUser: UserinfoResponse<TUserInfo, TAddress>): Promise<User> {
    const userString = JSON.stringify(pUser);
    return JSON.parse(userString);
}

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
         const issuer = await Issuer.discover(process.env.ISERV_DISCOVERY_DOCUMENT_LINK!);
         const client = new issuer.Client({
             client_id: process.env.OAUTH_CLIENT_ID!,
             client_secret: process.env.OAUTH_CLIENT_SECRET!,
             redirect_uris: [process.env.REDIRECT_LINK!],
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
  - storing that session object in req.session for other parts of the app to use
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

export async function requireStudent(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const session = req.session;
    if (!session) {
        return next(new Error(unauthenticated));
    } else {
        let isStudent = false;
        const user = await createUser(session.user);
        const groups = await transformGroupToArray(user.groups);
        groups.forEach(group => {
            if (group.name == 'Schuelerschaft') {
                isStudent = true;
            }
        });
        if (!isStudent) {
            return next(new Error('Student required'));
        }
    }

    next();
}

export async function requireAdmin5PK(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const session = req.session;
    if (!session) {
        return next(new Error(unauthenticated));
    } else {
        let is5PKAdmin = false;
        const user = await createUser(session.user);
        user.roles.forEach(role => {
            if (role.id == 'ROLE_PORTAL5PK') {
                is5PKAdmin = true;
            }
        });
        if (!is5PKAdmin) {
            return next(new Error('5PK-Admin required'));
        }
    }

    next();
}

export async function requireAdminFA(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const session = req.session;
    if (!session) {
        return next(new Error(unauthenticated));
    } else {
        let isAdmin = false;
        const user = await createUser(session.user);
        user.roles.forEach(role => {
            if (role.id == 'ROLE_PORTALFA') {
                isAdmin = true;
            }
        });
        if (!isAdmin) {
            return next(new Error('Admin required'));
        }
    }

    next();
}