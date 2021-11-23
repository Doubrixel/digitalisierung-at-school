import { Request, Response } from 'express';
import { updateData, insertData, defaultInsertCallback, defaultUpdateCallback, getAllResults, defaultGetAllCallback} from '../../../db/dbAccessor';
import rejectWhenValidationsFail from '../../validators/rejectWhenValidationsFail';

export default class Abitur {

    static GETtest(req: Request, res: Response): void {
        res.send('abi-test');
    }

    static POSTapplyForTopic(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const {responsibleTeacherId, art, bezugsfachId, partnerStudentId, referenzfachId, topic} = req.body;
        const sql = 'INSERT INTO abiturpruefungen (betreuendeLehrkraftID, art, bezugsfachID, partnerStudentId, referenzfachID, thema) VALUES (?,?,?,?,?,?)';
        insertData(sql, [responsibleTeacherId, art, bezugsfachId, partnerStudentId, referenzfachId, topic], defaultInsertCallback(res));
    }

    static POSTsetApprovalState(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const { examId, approved } = req.body;
        const reason = approved ? null : req.body.reason;
        const sql = 'UPDATE abiturpruefungen SET genehmigt = ?, ablehnungsgrund = ? WHERE id = ?';
        updateData(sql, [approved, reason, examId], defaultUpdateCallback(res));
    }

    static GETgetAllExams(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const sql = `
            SELECT
                abiturpruefungen.id AS examId,
                studentID AS studentId,
                nutzer.name AS studentName,
                partnerStudentId,
                referenzfachID AS referenzfachId,
                bezugsfachID AS bezugsfachId,
                betreuendeLehrkraftID AS responsibleTeacherId,
                thema AS topic
            FROM abiturpruefungen, nutzer
            WHERE studentID IS nutzer.id;
            `;
        getAllResults(sql, [], defaultGetAllCallback(res));
    }
}
