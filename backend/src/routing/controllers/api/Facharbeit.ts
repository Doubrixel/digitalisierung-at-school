import { Request, Response } from 'express';

export default class Facharbeit {
    static GETtest(req: Request, res: Response): void {
        res.send('facharbeit-test');
    }
}
