import { Issuer,  Client} from "openid-client";
import {Request, NextFunction, Response} from "express";

const iservLink = 'https://kant-gymnasium.de/iserv/public';

export function getDomain(): string {
    return `http://${process.env.HOST}:${process.env.PORT}`;
}

export async function initialize(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void>
 {
     if (req.app.authIssuer) {
         return next();
     }

     const issuer = await Issuer.discover(iservLink);
     const client = new issuer.Client({
         client_id: process.env.OAUTH_CLIENT_ID!,
         client_secret: process.env.OAUTH_CLIENT_SECRET!,
         redirect_uris: ['http://einschreibung.kant-gymnasium.de:5000'],
         response_types: ['code'],
     });

     req.app.authIssuer = issuer;
     req.app.authClient = client;

     next();
}