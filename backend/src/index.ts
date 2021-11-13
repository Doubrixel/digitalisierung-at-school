import express, { Express } from 'express';
import { join } from 'path';
import pathExists from './util/filesystem/path-exists';
import setupRouting from './routing/setup';
import * as auth from './auth';
import * as dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '../../../data/.env') });

const main = async (port: number) =>
{
    console.log('NodeJS running with TypeScript.');

    const clientExists = await pathExists(join(__dirname, '../client/index.html'));
    if (!clientExists) console.warn('No client available. Serving only API.');

    const app: Express = express();
    app.use(auth.initialize);
    setupRouting(app);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main(5000);
