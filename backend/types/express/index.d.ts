import { Issuer, Client } from 'openid-client';
import {ISession} from '../../src/auth';

declare global {
    namespace Express {
        interface Application {
            authIssuer?: Issuer;
            authClient?: Client;
        }

        interface Request {
            session?: ISession;
        }
    }
}
