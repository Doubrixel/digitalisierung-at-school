import { Request, Response } from 'express';
import { insertData } from '../../../db/dbAccessor';
import { validationResult } from 'express-validator';

export default class Abitur {
    static GETtest(req: Request, res: Response): void {
        res.send('abi-test');
    }
    static POSTapplyForTopic(req: Request, res: Response): void {

        if (!validationResult(req).isEmpty()) {
            res.status(400).json(validationResult(req).mapped());
            return;
        }

        const {responsibleTeacherId, art, bezugsfachId, partnerStudentId, referenzfachId, topic} = req.body;
        const sql = 'INSERT INTO abiturpruefungen (betreuendeLehrkraftID, art, bezugsfachID, partnerStudentId, referenzfachID, thema) VALUES (?,?,?,?,?,?)';
        insertData(sql, [responsibleTeacherId, art, bezugsfachId, partnerStudentId, referenzfachId, topic], (id, err) => {
            if (err) res.status(500).json(err.name);
            else res.status(200).json({examId: id});
        });
    }
}
