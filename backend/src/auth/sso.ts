import { Issuer } from 'openid-client';
import {Request, NextFunction, Response} from 'express';
import { iservLink, redirectLink, iservConnectionError } from './staticAuthStrings';

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
         console.log(iservConnectionError);
     }

     next();
}