import { Request, Response } from 'express';
import { updateData, insertData, defaultInsertCallback, defaultUpdateCallback, getAllResults, defaultGetAllCallback} from '../../../db/dbAccessor';
import rejectWhenValidationsFail from '../../validators/rejectWhenValidationsFail';
import {getStudentId} from '../../../auth/getRequestCookieData';

export default class Abitur {

    static GETtest(req: Request, res: Response): void {
        res.send('abi-test');
    }

    static POSTapplyForTopic(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        let sql = 'SELECT id FROM abiturpruefungen WHERE studentID = ?';
        getAllResults(sql, [getStudentId()], (a, err) => {
            if (err) {
                res.status(500).json(err.name);
            } else {
                if (a.length > 0) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateUpdateColumns(a[0].id);
                } else {
                    insertFirstSubmission();
                }
            }
        });

        const updateUpdateColumns = (id: number) => {
            const {updatedExaminer, updatedBezugsfach, updatedPartnerStudentName, updatedReferenzfach, updatedTopicArea, problemQuestion, updatedProblemQuestion, presentationForm, updatedPresentationForm} = req.body;
            let setString = '';
            const args = [];
            setString += ' updatedExaminer = ?'; args.push(updatedExaminer ? updatedExaminer : null);
            setString += ', updatedBezugsfach = ?'; args.push(updatedBezugsfach ? updatedBezugsfach : null);
            setString += ', updatedPartnerStudentName = ?'; args.push(updatedPartnerStudentName ? updatedPartnerStudentName : null);
            setString += ', updatedReferenzfach = ?'; args.push(updatedReferenzfach ? updatedReferenzfach : null);
            setString += ', updatedThema = ?'; args.push(updatedTopicArea ? updatedTopicArea : null);
            setString += ', updatedProblemQuestion = ?'; args.push(updatedProblemQuestion ? updatedProblemQuestion : null);
            setString += ', updatedPresentationForm = ?'; args.push(updatedPresentationForm ? updatedPresentationForm : null);
            if (problemQuestion) { setString += ', problemQuestion = ?'; args.push(problemQuestion); }
            if (presentationForm) { setString += ', presentationForm = ?'; args.push(presentationForm); }
            sql = 'UPDATE abiturpruefungen SET' + setString +' WHERE id = ?';
            args.push(id);
            updateData(sql, args, defaultUpdateCallback(res));
        };

        const insertFirstSubmission = () => {
            const {examiner, examType, bezugsfach, partnerStudentName, referenzfach, topicArea} = req.body;
            sql = 'INSERT INTO abiturpruefungen (examiner, art, bezugsfach, partnerStudentName, referenzfach, thema, studentID) VALUES (?,?,?,?,?,?,?)';
            insertData(sql, [examiner, examType, bezugsfach, partnerStudentName, referenzfach, topicArea, getStudentId()], defaultInsertCallback(res));
        };
    }

    static POSTsetApprovalState(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const { examId, approved } = req.body;
        const reason = approved ? null : req.body.reason;
        const sql = 'UPDATE abiturpruefungen SET genehmigt = ?, ablehnungsgrund = ? WHERE id = ?';
        updateData(sql, [approved, reason, examId], defaultUpdateCallback(res));
    }

    static GETgetAllExams(req: Request, res: Response): void {
        const sql = `
            SELECT
                abiturpruefungen.id AS examId,
                art AS examType,
                partnerStudentName,
                updatedPartnerStudentName,
                referenzfach,
                updatedReferenzfach,
                bezugsfach,
                updatedBezugsfach,
                examiner,
                updatedExaminer,
                thema AS topicArea,
                updatedThema AS updatedTopicArea,
                problemQuestion,
                updatedProblemQuestion,
                presentationForm,
                updatedPresentationForm,
                genehmigt AS approved,
                nutzer.name AS studentName,
                studentID AS studentId
            FROM abiturpruefungen, nutzer
            WHERE studentID IS nutzer.id;
            `;
        getAllResults(sql, [], defaultGetAllCallback(res));
    }

    static GETgetExamData(req: Request, res: Response): void {
        const sql = `
            SELECT
                art AS examType,
                partnerStudentName,
                updatedPartnerStudentName,
                referenzfach,
                updatedReferenzfach,
                bezugsfach,
                updatedBezugsfach,
                examiner,
                updatedExaminer,
                thema AS topicArea,
                updatedThema AS updatedTopicArea,
                problemQuestion,
                updatedProblemQuestion,
                presentationForm,
                updatedPresentationForm,
                genehmigt AS approved,
                ablehnungsgrund AS rejectionReason
            FROM abiturpruefungen, nutzer
            WHERE studentID IS nutzer.id AND studentID = ?;
            `;
        getAllResults(sql, [getStudentId()], (a: unknown[], err: Error|null): void => {
            if (err) res.status(500).json(err.message);
            else res.status(200).json(a[0]);
        });
    }
}
