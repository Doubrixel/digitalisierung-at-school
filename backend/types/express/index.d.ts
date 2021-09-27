import { Issuer, Client } from 'openid-client';

declare global {
    namespace Express {
        interface Application {
            authIssuer?: Issuer;
            authClient?: Client;
        }
    }
}
