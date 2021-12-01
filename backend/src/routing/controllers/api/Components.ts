import { Request, Response } from 'express';
import {
    defaultGetAllCallback,
    defaultInsertCallback,
    defaultUpdateCallback, getAllResults,
    getFirstResult,
    insertData,
    updateData
} from '../../../db/dbAccessor';
import rejectWhenValidationsFail from '../../validators/rejectWhenValidationsFail';

export default class Components {
    static GETtest(req: Request, res: Response): void {
        res.send('components-test');
    }
    static POSTSetTransitionDates(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;
        const { componentName } = req.params;
        const { transitionDate1, transitionDate2, transitionDate3 } = req.body;
        let sql = 'SELECT id FROM komponenten WHERE name = ?';
        getFirstResult(sql, [componentName], (obj, err) => {
            if (err) {
                res.status(500).send(err.message);
            } else if (!obj) {
                sql = 'INSERT INTO komponenten (name, transitionDate1, transitionDate2, transitionDate3) VALUES (?,?,?,?)';
                insertData(sql, [componentName, transitionDate1, transitionDate2, transitionDate3], defaultInsertCallback(res));
            } else {
                sql = 'UPDATE komponenten SET transitionDate1 = ?, transitionDate2 = ?, transitionDate3 = ? WHERE id = ?';
                updateData(sql, [transitionDate1, transitionDate2, transitionDate3, obj.id], defaultUpdateCallback(res));
            }
        });
    }
    
    static GETGetTransitionDatesOfAll(req: Request, res: Response): void {
        const sql = 'SELECT name, transitionDate1, transitionDate2, transitionDate3 FROM komponenten';
        getAllResults(sql, [], defaultGetAllCallback(res));
    }
}
