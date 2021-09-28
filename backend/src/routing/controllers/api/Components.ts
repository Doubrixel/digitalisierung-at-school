import { Request, Response } from 'express';

export default class Components {
    static GETtest(req: Request, res: Response): void {
        res.send('components-test');
    }
}
