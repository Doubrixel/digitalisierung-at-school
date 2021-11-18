import type { Request, Response } from 'express';
import { generators } from 'openid-client';
import { fromBase64, toBase64 } from './encoding';

export const STATE_COOKIE = 'state';

export interface IState {
    backToPath: string;
    bytes: string;
}

export function serializeAuthState(state: Partial<IState>): string {
    return toBase64({
        ...state,
        bytes: generators.state(),
    });
}

export function deserializeAuthState(value: string): IState {
    return fromBase64(value);
}

export function setAuthStateCookie(res: Response, state: string): void {
    res.cookie(STATE_COOKIE, state, {
        maxAge: 15 * 60 * 1000,
        httpOnly: true,
        sameSite: false,
        secure: true
    });
}

export function getAuthStateCookie(req: Request): string {
    return req.cookies[STATE_COOKIE];
}