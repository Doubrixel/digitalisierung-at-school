import { Request, Response } from 'express';

export default class Wahlpflichtfach {
    static GETtest(req: Request, res: Response): void {
        res.send('wahlpflichtfach-test');
    }
}
