import { join } from 'path';
import pathExists from './util/filesystem/path-exists';
import express from 'express';
import cookieParser from 'cookie-parser';
import * as auth from './auth';
import * as dotenv from 'dotenv';

dotenv.config();

const main = async () =>
{
    console.log('NodeJS running with TypeScript.');

    console.log(process.env.OAUTH_CLIENT_SECRET);
    console.log(process.env.OAUTH_CLIENT_ID);


    const app = express();

    app.use(cookieParser());

    app.use(auth.initialize);
    app.use(auth.routesSso());

    const clientExists = await pathExists(join(__dirname, '../client/index.html'));
    if (!clientExists) console.warn('No client available. Serving only API.');

    app.get('/private', (req, res) => {
        res.send('private');
    });

    app.listen(process.env.PORT, () => {
        console.log('Express started on port' + process.env.PORT);
    });
};

main();


