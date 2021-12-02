import express, { Express } from 'express';
import { join } from 'path';
import pathExists from './util/filesystem/path-exists';
import setupRouting from './routing/setup';
import { testDBConnection } from './db/dbAccessor';
import * as auth from './auth';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config({ path: join(__dirname, '../../data/.env') });

const main = async (port: number) =>
{
    console.log('NodeJS running with TypeScript.');

    const clientExists = await pathExists(join(__dirname, '../client/index.html'));
    if (!clientExists) console.warn('No client available. Serving only API.');

    const app: Express = express();

    app.use(cookieParser());
    app.use(express.json());
    app.use(auth.initialize);
    app.use(auth.session);
    setupRouting(app);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    testDBConnection();
    console.log('Reached end of index.ts');
};

main(5000);
