import { Request, Response } from 'express';
import {
    updateData,
    insertData,
    defaultInsertCallback,
    defaultUpdateCallback,
    getAllResults,
    defaultGetAllCallback,
    getFirstResult,
    defaultGetFirstResultCallback
} from '../../../db/dbAccessor';
import rejectWhenValidationsFail from '../../validators/rejectWhenValidationsFail';
import {getStudentId} from '../../../auth/getRequestCookieData';

export default class Abitur {

    static addToSetStringWhenDefined(params:Record<string, string>, args: Array<number|string>):string {
        let first = true;
        let setString = '';
        const keys = Object.keys(params);
        keys.forEach(key => {
            if (first) first = false;
            else setString += ',';
            setString += ' ' + key + ' = ';
            if (params[key] !== undefined) {
                setString += '?';
                args.push(params[key]);
            }
            else setString += null;
        });
        return setString;
    }

    static GETtest(req: Request, res: Response): void {
        res.send('abi-test');
    }

    static async POSTapplyForTopic(req: Request, res: Response): Promise<void> {
        if (rejectWhenValidationsFail(req, res)) return;

        const studentId = await getStudentId(req, res);
        if (studentId === -1) return;

        let sql = 'SELECT id FROM abiturpruefungen WHERE studentID = ?';
        getFirstResult(sql, [studentId], (obj, err) => {
            if (err) {
                res.status(500).json(err.name);
            } else {
                if (obj) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateUpdateColumns(obj.id);
                } else {
                    insertFirstSubmission();
                }
            }
        });

        const buildSetString = (args: (string|number)[]):string => {
            const {updatedExaminer, updatedBezugsfach, updatedPartnerStudentName, updatedReferenzfach, updatedTopicArea, problemQuestion, updatedProblemQuestion, presentationForm, updatedPresentationForm} = req.body;
            let setString = '';
            setString += ' updatedExaminer = ?'; args.push(updatedExaminer ? updatedExaminer : null);
            setString += ', updatedBezugsfach = ?'; args.push(updatedBezugsfach ? updatedBezugsfach : null);
            setString += ', updatedPartnerStudentName = ?'; args.push(updatedPartnerStudentName ? updatedPartnerStudentName : null);
            setString += ', updatedReferenzfach = ?'; args.push(updatedReferenzfach ? updatedReferenzfach : null);
            setString += ', updatedThema = ?'; args.push(updatedTopicArea ? updatedTopicArea : null);
            setString += ', updatedProblemQuestion = ?'; args.push(updatedProblemQuestion ? updatedProblemQuestion : null);
            setString += ', updatedPresentationForm = ?'; args.push(updatedPresentationForm ? updatedPresentationForm : null);
            if (problemQuestion) { setString += ', problemQuestion = ?'; args.push(problemQuestion); }
            if (presentationForm) { setString += ', presentationForm = ?'; args.push(presentationForm); }
            return setString;
        };

        const updateUpdateColumns = (id: number) => {
            const args: (string | number)[] = [];
            const setString = buildSetString(args);
            sql = 'UPDATE abiturpruefungen SET' + setString +' WHERE id = ?';
            args.push(id);
            updateData(sql, args, defaultUpdateCallback(res));
        };

        const insertFirstSubmission = () => {
            const {examiner, examType, bezugsfach, partnerStudentName, referenzfach, topicArea} = req.body;
            sql = 'INSERT INTO abiturpruefungen (examiner, art, bezugsfach, partnerStudentName, referenzfach, thema, studentID) VALUES (?,?,?,?,?,?,?)';
            insertData(sql, [examiner, examType, bezugsfach, partnerStudentName, referenzfach, topicArea, studentId], defaultInsertCallback(res));
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

    static async GETgetExamData(req: Request, res: Response): Promise<void> {
        const studentId = await getStudentId(req, res);
        if (studentId === -1) return;
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
        getFirstResult(sql, [studentId], defaultGetFirstResultCallback(res));
    }

    static POSTeditData(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;
        const examId = req.params.examId;
        const args : Array<number|string> = [];
        const { examType, updatedPartnerStudentName, updatedReferenzfach, updatedBezugsfach, updatedExaminer, updatedTopicArea, updatedProblemQuestion, updatedPresentationForm } = req.body;
        const art = examType;
        const updatedThema = updatedTopicArea;
        const setString = Abitur.addToSetStringWhenDefined({updatedPartnerStudentName, updatedReferenzfach, updatedBezugsfach, updatedExaminer, updatedThema, updatedProblemQuestion, updatedPresentationForm, art }, args);
        const sql = 'UPDATE abiturpruefungen SET' +setString + ' WHERE id = ?';
        args.push(examId);
        updateData(sql, args, defaultUpdateCallback(res));
    }
}
