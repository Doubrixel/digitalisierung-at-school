import express, { Express } from 'express';
import { join } from 'path';
import pathExists from './util/filesystem/path-exists';
import setupRouting from './routing/setup';
import { testDBConnection } from './db/dbAccessor';

const main = async (port: number) =>
{
    console.log('NodeJS running with TypeScript.');

    const clientExists = await pathExists(join(__dirname, '../client/index.html'));
    if (!clientExists) console.warn('No client available. Serving only API.');

    const app: Express = express();
    setupRouting(app);

    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

    testDBConnection();
};

main(5000);
