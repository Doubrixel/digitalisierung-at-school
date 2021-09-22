import express, { Request, Response } from 'express';
import path from 'path';

const client = path.join(__dirname, '/../../../client/');
const clientIndex = path.join(client, 'index.html');

export default class Main {
    static GEThomepage(req: Request, res: Response): void {
        res.sendFile(clientIndex);
    }
    static clientfiles = express.static(client);
}
