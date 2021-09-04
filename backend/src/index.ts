import { join } from 'path';
import pathExists from './util/filesystem/path-exists';

const main = async () =>
{
    console.log('NodeJS running with TypeScript.');

    const clientExists = await pathExists(join(__dirname, '../client/index.html'));
    if (!clientExists) console.warn('No client available. Serving only API.');
};

main();
