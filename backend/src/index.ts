import express, { Express } from 'express';
import { join } from 'path';
import pathExists from './util/filesystem/path-exists';
import setupRouting from './routing/setup';
import * as auth from './auth';

const main = async (port: number) =>
{
    console.log('NodeJS running with TypeScript.');

    const clientExists = await pathExists(join(__dirname, '../client/index.html'));
    if (!clientExists) console.warn('No client available. Serving only API.');

    const app: Express = express();
    setupRouting(app);
    app.use(auth.initialize);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

main(5000);
