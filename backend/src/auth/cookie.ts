import { Request, Response } from 'express';

const SESSION_COOKIE = 'AUTH';

export function setSessionCookie(res: Response, session: string): void {
    res.cookie(SESSION_COOKIE, session, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + 9000000),
    });
}

export function getSessionCookie(req: Request): string | undefined {
    return req.cookies[SESSION_COOKIE];
}

export function clearSessionCookie(res: Response): void {
    res.clearCookie(SESSION_COOKIE);
}