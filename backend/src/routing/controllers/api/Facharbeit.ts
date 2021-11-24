import { Request, Response } from 'express';
import { defaultGetAllCallback, getAllResults } from '../../../db/dbAccessor';
import rejectWhenValidationsFail from '../../validators/rejectWhenValidationsFail';

export default class Facharbeit {
    static GETtest(req: Request, res: Response): void {
        res.send('facharbeit-test');
    }
    static GETgetAll(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const sql = `
            SELECT
                studentId,
                thema AS topic,
                abgabezeitpunkt AS deliveryTime
            FROM facharbeiten;
        `;
        getAllResults(sql, [], defaultGetAllCallback(res));
    }
}
