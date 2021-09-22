import { Request, Response } from 'express';

export default class AG {
    static GETtest(req: Request, res: Response): void {
        res.send('ag-test');
    }
}
