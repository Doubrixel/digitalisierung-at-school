import { Request, Response } from 'express';

export default class Abitur {
    static GETtest(req: Request, res: Response): void {
        res.send('abi-test');
    }
}
