import { Request, Response } from 'express';
import { defaultInsertCallback, getFirstResult, insertData } from '../../../db/dbAccessor';
import rejectWhenValidationsFail from '../../validators/rejectWhenValidationsFail';

export default class Components {
    static GETtest(req: Request, res: Response): void {
        res.send('components-test');
    }
    static PUT_componentName_setTransitionDates(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const { componentName } = req.params;
        const sql = 'SELECT id FROM komponenten WHERE name IS ?';
        getFirstResult(sql, [componentName], (obj, err) => {
            if (err) {
                res.status(500).send(err.name);
            } else if (obj) {
                const data = req.body;
                const values: (string|number)[] = [];
                const sql = 'INSERT INTO komponenten () VALUES ()';
                let outp = '';
                for (const status of data) {
                    // mehrere sql statement einfach zusammenklatschen und dann mit einem run ausführen?
                    outp += status.statusName + ' ' + status.whenToTransitionToStatusDate + ';\n';
                }
                insertData(sql, values, defaultInsertCallback(res));
                res.send(outp);
            } else {
                res.status(500).send(`Keine Komponente mit dem Namen ${componentName} vorhanden.`);
            }
        });

    }
}
