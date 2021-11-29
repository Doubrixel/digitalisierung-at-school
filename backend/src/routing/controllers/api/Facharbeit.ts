import { Request, Response } from 'express';
import { getStudentId } from '../../../auth/getRequestCookieData';
import { defaultGetAllCallback, defaultInsertCallback, defaultUpdateCallback, getAllResults, getFirstResult, insertData, updateData } from '../../../db/dbAccessor';
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
    static POSTchooseTopic(req: Request, res: Response): void {
        if (rejectWhenValidationsFail(req, res)) return;

        const sql = 'SELECT id FROM facharbeiten WHERE studentID = ?';
        const studentId = getStudentId();
        getFirstResult(sql, [studentId], (obj, err) => {
            if (err) {
                res.status(500).json(err.name);
            } else {
                if (obj) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateColumns(obj.id);
                } else {
                    insertFirstSubmission();
                }
            }
        });

        const {topic, subject, choosenTeacher, subjectTeacher} = req.body;
        const args: (string|number)[] = [];

        const buildSetString = (): string => {
            let setString = '';
            let first = true;
            const add = (arg: {value: string, name: string}): void => {
                if (!arg.value) return;
                if (first) first = false;
                else setString += ', ';
                setString += arg.name + ' = ?';
                args.push(arg.value);
            };
            for (const arg of [
                {value: topic, name: 'thema'},
                {value: subject, name: 'fach'},
                {value: choosenTeacher, name: 'gewaehlterLehrer'},
                {value: subjectTeacher, name: 'unterrichtenderLehrer'},
            ]) add(arg);

            return setString;
        };

        const updateColumns = (id: number) => {
            const sql = `UPDATE facharbeiten SET ${buildSetString()} WHERE id = ?`;
            args.push(id);
            updateData(sql, args, defaultUpdateCallback(res));
        };

        const insertFirstSubmission = () => {
            if (!topic || !subject || !choosenTeacher || !studentId) {
                res.status(400).send('Thema, Fach, gewählter Lehrer und unterrichtender Lehrer müssen initial angegeben werden.');
                return;
            }
            const sql = 'INSERT INTO facharbeiten (thema, fach, gewaehlterLehrer, unterrichtenderlehrer, studentId) VALUES (?, ?, ?, ?, ?)';
            args.push(topic, subject, choosenTeacher, subjectTeacher, studentId);
            insertData(sql, args, defaultInsertCallback(res));
        };
    }
}
