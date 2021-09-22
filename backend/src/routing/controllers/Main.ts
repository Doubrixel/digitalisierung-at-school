import { Request, Response } from 'express';

export default class Main {
    static GEThomepage(req: Request, res: Response): void {
        res.send('Homepage');
    }
}
